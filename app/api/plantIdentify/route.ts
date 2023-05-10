import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
   const {base64String} = await request.json()
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

        console.log(plantIdentifyResponseData);

        return NextResponse.json(plantIdentifyResponseData)
      } catch (error: any) {
        console.error(`Error: ${error.message}`);
      }
}