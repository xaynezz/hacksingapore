import { NextResponse } from 'next/server'
import axios from 'axios'

/* Sends a POST request to PLANTAI to identify Plant */ 
/* Returns a response data which contains name, description, probability */
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
        return NextResponse.json(plantIdentifyResponseData)
      } catch (error: any) {
        console.error(`Error: ${error.message}`);
      }
}

/* Sends a GET request to PERENUAL to get the ID of the plant based on name */
/* Returns a response data which contains ID of the plant */

export async function GET(request: Request){
  try {
    const response = await axios.get(
      `https://perenual.com/api/species-list?key=${process.env.PERENUAL}&q=Solanum%20lycopersicum`
    );
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching species:', error);
  }
}