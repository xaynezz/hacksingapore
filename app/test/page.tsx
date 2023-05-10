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
      
    /* Send POST request to backend */
    try {
      const base64File = await toBase64(file);
      console.log('Base64 File:', base64File);
  
      const response = await axios.post('/api/plantIdentify', {
        base64String: base64File,
      });

      const PlantIdentifyApiResponse: PlantIdentifyApiResponse = response.data;

      console.log('Image uploaded successfully:', PlantIdentifyApiResponse.suggestions[0].plant_name);
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