'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const GardenPlantPage =  ({ params }: { params: { id: string } }) => {
    const plantID = params.id;
    const [commonName, setCommonName] = useState<string | null>(null);
    const [img, setImg] = useState('');
    const [fruits, setFruits] = useState(false);
    const [el, setEL] = useState(false);

    const [plantDetails, setPlantDetails] = useState<PlantDetails>();
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetails>();


    useEffect(() => {
        const fetchPlantDetails = async () => {
          try {
            const response = await axios.post('/api/plant/details', {
              idOfPlant: plantID
            });
            const plantDetails: PlantDetails = response.data;
            
            setPlantDetails(plantDetails);

            setCommonName(plantDetails.common_name);
            setImg(plantDetails.default_image.regular_url)
            setFruits(plantDetails.fruits)
            setEL(plantDetails.edible_leaf)

          } catch (error) {
            console.error('Error fetching plant details:', error);
          }
        };
    
        fetchPlantDetails();
      }, [plantID]);

      useEffect(() => {
        const fetchRecipe = async () => {
          try {
            const response2 = await axios.post('/api/recipe', {
              plantName: commonName
            });
            const recipeDetails: RecipeDetails = response2.data;
            setRecipeDetails(recipeDetails);
            console.log(response2.data);

          } catch (error) {
            console.error('Error fetching recipe:', error);
          }
        };
    
        fetchRecipe();
      }, [commonName]);
    
      console.log({plantDetails})
    // console.log('Plant Details from Perenual is ' + plantDetails.description);

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8">
                <Image src={img} alt="alt" height={500} width={500} />
            </div>

            <div className="flex flex-col mt-8 p-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">Plant Name:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.common_name}</p> : <p>Loading...</p>}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Growth Rate:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.growth_rate}</p> : <p>Loading...</p>}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Watering:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.watering}</p> : <p>Loading...</p>}</div>                    
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
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.edible_fruit_taste_profile}</p> : <p>Loading...</p>}</div>                    
                </div>

                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Cycle:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.cycle}</p> : <p>Loading...</p>}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">Details:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.description}</p> : <p>Loading...</p>}</div>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">Recipes:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{recipeDetails ? <p>{recipeDetails.hits[1].recipe.label}</p> : <p>Loading...</p>}</div>
                </div>
            </div>
        </>
    )
};

export default GardenPlantPage;