"use client" //use client
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TypingAnimation from '@/components/TypingAnimation';
import BackButton from '@/components/BackButton';
const OPENAI = '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'
interface Message {
  type: string;
  message: string;
}


const Chatbot: React.FC = () => {
  // User inputs
  const [inputValue, setInputValue] = useState<string>('');
  // Chatlog
  const [chatLog, setChatLog] = useState<Message[]>([]);
  // Loading waiting for API response
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle the event when the user sends a message to prevent reload
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: 'user', message: inputValue },
    ]);
    // When user sends a message, it calls the API
    sendMessage(inputValue);
    setInputValue('');
  };

  //default message by chatbot
  useEffect(() => {
    const initialMessage = {
      type: 'bot',
      message: 'Hello, how can I assist you today?',
    };
    setChatLog((prevChatLog) => [...prevChatLog, initialMessage]);
  }, []);

  // To get response from OPENAI
  const sendMessage = async (message: string) => {
      //const url = '/api/chatbot';

      setIsLoading(true);
      /*testing
      const res = await axios.post('/api/chatbot', {data:message});
      console.log(res);*/
      
    
      axios.post('/api/chatbot', {data: message}).then((response) => {
      console.log(response);
       
      const botmessage = response.data.choices[0].message.content;
      const formattedResponse = botmessage.split('\n\n');
      
      //console.log(formattedResponse);
      setChatLog((prevChatLog) => [
          ...prevChatLog,
          {
            type: 'bot',
            message: formattedResponse.map((line: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined) => (
              <React.Fragment>
                {line}
                <br />
                <br />
              </React.Fragment>
            )),
          },
          
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      }); 
      
  };

  return (

    <div className = "flex flex-col h-screen bg-gray-50">
        <BackButton route = '/test'/> 

      <h1 className = "bg-gradient-to-r from-green-500 to-green-800 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">GardenGPT</h1>
      <div className = "flex-grow p-6">
        <div className = "flex flex-col space-y-4">
        {chatLog.map((message, index) => (
        <div key={index} className = {`flex ${message.type === 'user'? 'justify-end' :'justify-start'
        }`}>
        <ul className = {`${message.type === 'user'? 'bg-gray-400': 'bg-secondarydark-500'} rounded-lg p-4 text-white max-w-sm
         `}>

        {message.message}</ul>
        
        </div>
          ))}
        
          {
            isLoading &&
            <div key= {chatLog.length} className = "flex justify-start">  
              <div className = "bg-secondarydark-500 rounded-lg p-4 text-black max-w-sm">
                <TypingAnimation/>
                </div>
              </div>
          }
          
        </div>
      </div>
 
      <form onSubmit={handleSubmit} className="flex-none p-6">
  <div className="flex rounded-lg border border-white-700 bg-white-800">
    <input
      type="text"
      className="flex-grow px-4 py-2 bg-transparent text-black focus:outline-none"
      placeholder="Type your message..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
    <button type="submit" className="bg-primary-400 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-primary-500 transition-colors duration-300">
      Send
    </button>
  </div>
</form>

    </div>

  );
};

export default Chatbot;
