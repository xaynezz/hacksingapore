import axios, { AxiosResponse } from "axios";
const OPENAI = process.env.NEXT_PUBLIC_OPENAI_APIKEY;
import { NextResponse } from "next/server";

// Define a variable to store the conversation history
let conversationHistory = [
    {
        role: "user",
        content:
            "You will be acting as gardey , the AI chatbot for a mobile application focused on gardening and plants. Your purpose is to assist users in their gardening journey, providing helpful information, tips, and answering questions. You should engage in a helpful and informative dialogue, offering suggestions, troubleshooting techniques, and relevant plant care instructions and also cooking instructions for recipes to ensure a successful gardening experience.",
    },
];

/* Sends a POST request to OPENAI to answer the user's question */
/* Returns the response data as the answer */
export async function POST(request: Request) {
    const body = await request.json();
    console.log("body:", body.data);

    // add an empty one to stop the API to answer the last 2 queries (debug the issue with the weird response.)

    conversationHistory.push({
        role: "user",
        content: "",
    });

    // Add the user's message to the conversation history
    conversationHistory.push({
        role: "user",
        content: body.data,
    });

    // Prepare the data for the API request
    const data = {
        model: "gpt-3.5-turbo",
        messages: conversationHistory,
    };

    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${OPENAI}`,
    };

    try {
        const response: AxiosResponse = await axios.post(url, data, {
            headers: headers,
        });
        console.log("response data", response.data);
        //console.log('convo hist', conversationHistory);

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}
