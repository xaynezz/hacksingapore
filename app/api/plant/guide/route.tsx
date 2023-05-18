
import axios from "axios";
const util = require('util');

import { NextResponse } from "next/server";

/* Sends a GET request to PERENUAL to get details of the plant based on ID */
/* Returns a response data which contains details of the plant */
export async function POST(request: Request) {
    const { plant_id } = await request.json();
    console.log('guide route',plant_id)
    await axios.get(
        `https://perenual.com/api/species-care-guide-list?key=${process.env.PERENUAL}&species_id=${plant_id}`
    ).then(response => {
        const circularStructure = response.data;
        const flatObject = util.inspect(circularStructure);
        //console.log(flatObject)

        // currently cannot return json object, need to fix it so can access section data[0].section[0]
        return flatObject;
        // You can now return or render this flatObject to your Next.js page
    })
    .catch(error => {
        console.error(error);
    });
}
