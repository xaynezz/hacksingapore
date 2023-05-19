
import axios from "axios";
const util = require('util');

import { NextResponse } from "next/server";

/* Sends a GET request to PERENUAL to get details of the plant based on ID */
/* Returns a response data which contains details of the plant */
export async function POST(request: Request) {
    const { plantName } = await request.json();
    //console.log('faq route',plantName)
    await axios.get(
        `https://perenual.com/api/article-faq-list?key=${process.env.PERENUAL}&p=1`
    ).then(response => {
        const circularStructure = response.data;
        const flatObject = util.inspect(circularStructure);
        //console.log(flatObject)
        return flatObject;
        // You can now return or render this flatObject to your Next.js page
    })
    .catch(error => {
        console.error(error);
    });
}
