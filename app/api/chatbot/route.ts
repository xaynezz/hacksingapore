import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
const OPENAI = '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'
import { NextResponse } from "next/server";


/* Sends a POST request to OPENAI to answer the user's question */
/* Returns the response data as the answer */

export async function POST(request: Request) {
      const body  = await request.json()
      console.log(body);
      const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ "role": "user", "content": body.data }], };

      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${OPENAI}`,
      };
    try {
      const response: AxiosResponse = await axios.post(url, data, { headers:headers });
      console.log(response.data);
      return NextResponse.json(response.data)

      ;
    }  catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }
  