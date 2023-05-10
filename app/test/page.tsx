/* Test Page for API */
"use client"

import { FileInput } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

type Props = {}

export default function test({ }: Props) {
  const [plantName, setPlantName] = useState<string | null>(null);
  const handleFileChange = async (file: File) => {
    console.log(file);

    /* Convert image to base 64 */
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    /***************************/

    try {
      const base64File = await toBase64(file);
      
      /* Send POST request to backend to identify image => returns a name */
      const response = await axios.post('/api/plant/identify', {
        base64String: base64File,
      });

      const PlantIdentifyData: PlantIdentifyApiResponse = response.data;

      console.log('Image uploaded successfully');
      console.log('Plant name is ', PlantIdentifyData.suggestions[0].plant_name);
      /******************************************************************************************* */



      /* Send POST request to backend to identify image => returns an ID */
      const response1 = await axios.post('/api/plant', {
        nameOfPlant: PlantIdentifyData.suggestions[0].plant_name,
      });

      const plantID: number = response1.data;
      console.log('Plant ID from Perenual is ', plantID);
      /******************************************************************************************* */



      /* Send POST request to backend to get more details about the plants => returns Plantdetails */
      const response2 = await axios.post('/api/plant/details', {
        idOfPlant: plantID
      });

      const plantDetails:PlantDetails = response2.data;
      console.log('Plant Details from Perenual is ' + plantDetails.description);
      /******************************************************************************************* */

      /* Send POST request to backend to identify image => returns a name */
      const healthIdentification = await axios.post('/api/plant/health', {
        base64String: base64File,
      });

      const healthAssessment: PlantHealthAssessment = healthIdentification.data;
      console.log('Plant (is_healthy) = ' + healthAssessment.is_healthy)
      console.log('List of diseases')
      console.log(healthAssessment.diseases);
      // console.log('Plant name is ', PlantIdentifyData.suggestions[0].plant_name);
      /******************************************************************************************* */



    } catch (error: any) {
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <FileInput
      placeholder="Pick file"
      label="Your resume"
      withAsterisk
      accept="image/png,image/jpeg"
      onChange={handleFileChange}
    />
  )
}