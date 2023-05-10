

import axios from "axios";
import { NextResponse } from "next/server";

/* Sends a GET request to PERENUAL to get diseases of ALL plant (based on name of disease optional) */
/* Returns a response data which contains diseases of ALL plant */
export async function POST(request: Request) {
    try {
        const response = await axios.get(
            "https://perenual.com/api/pest-disease-list?key=" + process.env.PERENUAL
        );
        const DiseaseList = response.data;
        return NextResponse.json(DiseaseList)

    } catch (error) {
        console.error('Error fetching species:', error);
    }
}