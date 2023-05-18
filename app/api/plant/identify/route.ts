

import axios from "axios";
import { NextResponse } from "next/server";

/* Sends a POST request to PLANTAI to identify Plant */
/* Returns a response data which contains name, description, probability */
export async function POST(request: Request) {

  const { base64String } = await request.json()
  console.log(base64String)
  try {
    const response = await axios.post(
      'https://api.plant.id/v2/identify',
      {
        images: [base64String],
      },
      {
        headers: {
          'Api-Key': process.env.PLANTAI,
          'Content-Type': 'application/json',
        },
      }
    );

    const plantIdentifyResponseData: PlantIdentifyApiResponse = response.data;
    return NextResponse.json(plantIdentifyResponseData)
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
