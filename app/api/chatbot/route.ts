import axios, { AxiosResponse } from 'axios';
const OPENAI = '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';
import { NextResponse } from "next/server";

// Define a variable to store the conversation history
let conversationHistory = [{ role: 'user', content: 'You will be acting as  gardey , the AI chatbot for a mobile application focused on gardening and plants. Your purpose is to assist users in their gardening journey, providing helpful information, tips, and answering questions. You should engage in a helpful and informative dialogue, offering suggestions, troubleshooting techniques, and relevant plant care instructions to ensure a successful gardening experience.' }];

/* Sends a POST request to OPENAI to answer the user's question */
/* Returns the response data as the answer */
export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  // Add the user's message to the conversation history
  conversationHistory.push({
    role: 'user',
    content: body.data
  });

  // Prepare the data for the API request
  const data = {
    model: 'gpt-3.5-turbo',
    messages: conversationHistory
  };

  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${OPENAI}`,
  };

  try {
    const response: AxiosResponse = await axios.post(url, data, { headers: headers });
    console.log(response.data);
    console.log(conversationHistory);


    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
