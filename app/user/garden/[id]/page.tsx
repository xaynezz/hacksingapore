'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const GardenPlantPage =  ({ params }: { params: { id: string } }) => {
    const plantID = params.id;
    const [commonName, setCommonName] = useState<string | null>(null);
    const [desc, setDesc] = useState<string | null>(null);
    const [img, setImg] = useState('');
    const [gr, setGr] = useState('');
    const [cycle, setCycle] = useState('');
    const [fruits, setFruits] = useState(false);
    const [el, setEL] = useState(false);
    const [taste, setTaste] = useState('');
    const [watering, setWatering] = useState('');
    const [cuisine, setCuisine] = useState(false);
    const [cuisine_list, setCuisineList] = useState('');

    const [plantDetails, setPlantDetails] = useState<PlantDetails>();



    useEffect(() => {
        const fetchPlantDetails = async () => {
          try {
            const response = await axios.post('/api/plant/details', {
              idOfPlant: plantID
            });
            const plantDetails: PlantDetails = response.data;
            
            setPlantDetails(plantDetails);

            setCommonName(plantDetails.common_name);
            setDesc(plantDetails.description)
            setImg(plantDetails.default_image.regular_url)
            setGr(plantDetails.growth_rate)
            setCycle(plantDetails.cycle)
            setFruits(plantDetails.fruits)
            setEL(plantDetails.edible_leaf)
            setTaste(plantDetails.edible_fruit_taste_profile)
            setWatering(plantDetails.watering)
            setCuisine(plantDetails.cuisine)
            setCuisineList(plantDetails.cuisine_list)

          } catch (error) {
            console.error('Error fetching plant details:', error);
          }
        };
    
        fetchPlantDetails();
      }, [plantID]);
    
      console.log(img)
    // console.log('Plant Details from Perenual is ' + plantDetails.description);

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8">
                <Image src={img} alt="alt" height={500} width={500} />
            </div>

            <div className="flex flex-col mt-8 p-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">Plant Name:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{commonName}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Growth Rate:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{gr}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Watering:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{watering}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Fruits:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{fruits?'True':"False"}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Edible Leaf:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{el?'True':"False"}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Edible Fruit Taste:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{taste}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Cuisine:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{cuisine?'True':'False'}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Cuisine List:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{cuisine_list}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Cycle:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{cycle}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">Details:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{desc}</div>
                </div>
            </div>
        </>
    )
};

export default GardenPlantPage;