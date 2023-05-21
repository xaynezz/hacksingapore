

import axios from "axios";
import { NextResponse } from "next/server";
import { AiOutlineConsoleSql } from "react-icons/ai";

/* Sends a POST request to PLANTAI to access the health of the Plant */
/*  */
export async function POST(request: Request) {
    const { base64String } = await request.json()
    console.log(base64String)
    try {
      const response = await axios.post(
        'https://api.plant.id/v2/health_assessment',
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
    
      const plantHealth: PlantHealthAssessment = response.data.health_assessment;
      console.log('plant health route response:',plantHealth.diseases);
        //   console.log("Finished identifying image. The plant identified in the image is " + plantIdentifyResponseData.suggestions[0].plant_name)
      return NextResponse.json(plantHealth)
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }
  
  