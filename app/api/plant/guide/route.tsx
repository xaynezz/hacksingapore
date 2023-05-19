
import axios from "axios";
import { NextResponse } from "next/server";

/* Sends a GET request to PERENUAL to get details of the plant based on ID */
/* Returns a response data which contains details of the plant */
export async function POST(request: Request) {
    const { plant_id } = await request.json();
    console.log('guide route',plant_id)
    const response = await axios.get(
        `https://perenual.com/api/species-care-guide-list?key=${process.env.PERENUAL}&species_id=${plant_id}`
    )
    const res = response.data;
    console.log('guide route reponse:',res)
    const section = res.data[0].section;
    console.log('guide route reponse:',section)

    return NextResponse.json(section)
    // if (section)  
    //     return NextResponse.json(section)
    // else 
    //     return undefined

}
