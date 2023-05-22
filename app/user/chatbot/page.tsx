"use client"; //use client
import React, { useEffect, useState } from "react";
import axios from "axios";
import TypingAnimation from "@/components/TypingAnimation";

interface Message {
    type: string;
    message: string;
}

const Chatbot: React.FC = () => {
    // User inputs
    const [inputValue, setInputValue] = useState<string>("");
    // Chatlog
    const [chatLog, setChatLog] = useState<Message[]>([]);
    // Loading waiting for API response
    const [isLoading, setIsLoading] = useState<boolean>(false);
    //prompt for OPENAI
    var prompt =
        "You will be acting as  gardey , the AI chatbot for a mobile application focused on gardening and plants. Your purpose is to assist users in their gardening journey, providing helpful information, tips, and answering questions. You should engage in a helpful and informative dialogue, offering suggestions, troubleshooting techniques, and relevant plant care instructions to ensure a successful gardening experience.";

    //default message by chatbot
    useEffect(() => {
        setChatLog([]);
        const initialMessage = {
            type: "bot",
            message: "Hello, how can I assist you today?",
        };
        setChatLog((prevChatLog) => [...prevChatLog, initialMessage]);
    }, []);

    // Handle the event when the user sends a message to prevent reload
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setChatLog((prevChatLog) => [
            ...prevChatLog,
            { type: "user", message: inputValue },
        ]);

        // When user sends a message, it calls the API
        sendMessage(inputValue);
        setInputValue("");
    };

    /*To pre-prompt OPENAI
    const train = async (message: string) => {
    axios.post('/api/chatbot', {data: message}).then((response) => {
    console.log(response);})} */

    // To get response from OPENAI
    const sendMessage = async (message: string) => {
        //train(prompt);
        //const url = '/api/chatbot';
        setIsLoading(true);
        /*testing
      const res = await axios.post('/api/chatbot', {data:message});
      console.log(res);*/

        axios
            .post("/api/chatbot", { data: message })
            .then((response) => {
                const botmessage = response.data.choices[0].message.content;
                console.log(botmessage);

                const formattedResponse = botmessage.split("\n\n");

                console.log(formattedResponse);
                setChatLog((prevChatLog) => [
                    ...prevChatLog,
                    {
                        type: "bot",
                        message: formattedResponse.map(
                            (
                                line:
                                    | string
                                    | number
                                    | boolean
                                    | React.ReactElement<
                                          any,
                                          | string
                                          | React.JSXElementConstructor<any>
                                      >
                                    | React.ReactFragment
                                    | React.ReactPortal
                                    | React.PromiseLikeOfReactNode
                                    | null
                                    | undefined,
                                index: any
                            ) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                    <br />
                                </React.Fragment>
                            )
                        ),
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
        <div className="item-center flex h-full flex-col justify-between border-none">
            <div className="flex h-[85%] flex-col">
                <div className="flex h-full flex-col space-y-4 overflow-auto p-6">
                    {chatLog.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message.type === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <ul
                                className={`${
                                    message.type === "user"
                                        ? "bg-gray-400"
                                        : "bg-secondarydark-500"
                                } max-w-sm rounded-lg p-4 text-white`}
                            >
                                {message.message}
                            </ul>
                        </div>
                    ))}
                    {isLoading && (
                        <div
                            key={chatLog.length}
                            className="flex justify-start"
                        >
                            <div className="max-w-sm rounded-lg bg-secondarydark-500 p-4 text-black">
                                <TypingAnimation />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex min-h-[15%] flex-col items-center justify-center ">
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center justify-center gap-2"
                >
                    <input
                        type="text"
                        className=" rounded-xl border border-green-600 bg-transparent px-4 py-2 text-black focus:outline-none"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-primary-400 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-primary-500 focus:outline-none"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
