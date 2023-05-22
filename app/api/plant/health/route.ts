import axios from "axios";
import { NextResponse } from "next/server";

/* Sends a POST request to PLANTAI to access the health of the Plant */
/*  */
export async function POST(request: Request) {
    const { base64String } = await request.json()
    console.log("Getting health response...");
    try {
      const response = await axios.post(
        'https://api.plant.id/v2/health_assessment',
        {
          images: [base64String],
          disease_details: ["cause","common_names", "description", "treatment"]
        },
        {
          headers: {
            'Api-Key': process.env.PLANTAI,
            'Content-Type': 'application/json',
          },
        }
      );
    
      const plantHealth: PlantHealthAssessment = response.data.health_assessment;
      return NextResponse.json(plantHealth)
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }
  
  