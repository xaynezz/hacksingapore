import { NextResponse } from 'next/server'
import axios from 'axios'

/* Sends a GET request to PERENUAL to get the ID of the plant based on name */
/* Returns a response data which contains ID of the plant */

export async function POST(request: Request) {
  const { nameOfPlant } = await request.json()
  console.log(nameOfPlant)
  try {
    const response = await axios.get(
        "https://perenual.com/api/species-list?key=" + process.env.PERENUAL + "&q=" + nameOfPlant
      );
    const PerenualDataResponse: PerenualDataResponse = response.data;

    // Map every entry into processedData[]
    //console.log("PerenualDataResponse", PerenualDataResponse.data)
    const processedData = []
    PerenualDataResponse.data.forEach((item: any) => {
      const PlantID = item.id;
      const PlantImage = item.default_image.thumbnail;
      const PlantCommonName = item.common_name;
    
      // Create an object for each item and add it to the processedData array
      const processedItem = {
        PlantID,
        PlantImage,
        PlantCommonName,
      };
      processedData.push(processedItem);
    });
    return (NextResponse.json(processedData))
  } catch (error) {
    console.error('Error fetching species:', error);
  }
}