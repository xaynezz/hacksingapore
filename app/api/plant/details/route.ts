
import axios from "axios";
import { NextResponse } from "next/server";

/* Sends a GET request to PERENUAL to get details of the plant based on ID */
/* Returns a response data which contains details of the plant */
export async function POST(request: Request) {

    const { idOfPlant } = await request.json()
    console.log(idOfPlant)
    try {
        const response = await axios.get(
            " https://perenual.com/api/species/details/" + idOfPlant + "?key=" + process.env.PERENUAL
        );
        const PlantDetails: PlantDetails= response.data;
        console.log("Finished getting details from plantID. The details is as followed: " + PlantDetails.description)
        return NextResponse.json(PlantDetails)

    } catch (error) {
        console.error('Error fetching species:', error);
    }
}
