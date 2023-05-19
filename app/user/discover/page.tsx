'use client';

interface Props {}
import React, { useState, useEffect } from 'react'
import BackButton from '@/components/BackButton';
import Image from 'next/image';
import axios from 'axios';


const Discover = (props: Props) => {
    const {} = props;
    console.log("props below")
    console.log(props)

    const examplePlantId = [791, 5022, 2251, 1595]

    const [img, setImg] = useState<string[]>([]);
    const [commonName, setCommonName] = useState<string[]>([]);


    useEffect(() => {
        const fetchPlantDetails = async (plantId: number) => {
          try {
            const response = await axios.post('/api/plant/details', {
              idOfPlant: plantId
            });
            const plantDetails = response.data;
      
            // Create a new array with the current image added
            setImg((prevImages) => [...prevImages, plantDetails.default_image.regular_url]);
            setCommonName((prevcommonName) => [...prevcommonName, plantDetails.common_name]);
          } catch (error) {
            console.error('Error fetching plant details:', error);
          }
        };
      
        const fetchAllPlantDetails = async () => {
          for (const plantId of examplePlantId) {
            await fetchPlantDetails(plantId);
          }
        };
      
        fetchAllPlantDetails();
      }, []);

      const generatePlantImg = (order:number, size = 150) => {
        return(
            <div className="w-36 h-36 squared-full flex items-center justify-center">
                <a href={`/user/discover/${examplePlantId[order]}`}>
                    <Image src={img[order]} width={size} height={size} alt={`Image ${order}`} />
                </a>
            </div>
        )
      }
    

    return(
    <div className="h-[1000px] bg-FFFBEF-300">
        <BackButton route="hi"/>
        <div className = "pt-10 flex justify-center">
            <h2>Hi Oak Soe Khant, </h2>
        </div>
        <div className = "flex justify-center">
            <h3>we recommend you those plants!</h3>
        </div>
        
        

                
        <div className="py-4 px-7 flex justify-between ">
            <div className="relative flex flex-col items-center">
                <div className="text-gray-800 font-bold mx-auto flex-1 text-center ">
                    {commonName[0]}
                </div>
                {generatePlantImg(0)}
                {/* <div className="text-gray-400  mx-auto flex-1 text-center text-xs">
                    Difficulty: *****
                </div> */}
            </div>

            <div className="relative flex flex-col items-center">
                <div className="text-gray-800 font-bold mx-auto flex-1 text-center ">{commonName[1]}</div>
                {generatePlantImg(1)}
            </div>
        </div>
        <div className="py-4 px-7 flex justify-between ">
            <div className="relative flex flex-col items-center">
                <div className="text-gray-800 font-bold mx-auto flex-1 text-center ">{commonName[2]}</div>
                {generatePlantImg(2)}
            </div>

            <div className="relative flex flex-col items-center">
                <div className="text-gray-800 font-bold mx-auto flex-1 text-center ">{commonName[3]}</div>
                {generatePlantImg(3)}
            </div>
        </div>
        

    
    
    
    
    </div>
    )
}

export default Discover;
