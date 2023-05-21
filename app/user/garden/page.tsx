"use client";

import React, { useEffect, useState } from "react";
import Garden from "./components/Garden";
import AddPlant from "./components/model/AddPlant";
import { useGardenContext } from "@/app/context/gardenContext";
import { supabase } from "@/config/dbConnect";
import ListPlants from "./components/listOfPlants/ListPlants";
import RecipeButton from "@/components/RecipeButton";

import axios from "axios";

export default function page({}) {
    const { showAddPlantModal, userUUID }: any = useGardenContext();
    const [userPlantCount, setUserPlantCount] = useState<Number>()
    const [name, setName] = useState('')

    const [userPlantImage, setUserPlantImage] = useState('');

    useEffect(() => {
        const fetchPlantsFromUser = async () => {
            const { data, error } = await supabase
                .from("plants")
                .select(
                    "id, plant_id, y_coor, x_coor, tree_number, image_url, plant_name, created_at"
                )
                .eq("uuid", userUUID);

            const treePositions = data.map(
                ({ tree_number, y_coor, x_coor, plant_id, id}) => [
                    tree_number + "/" + plant_id + "/" + id,
                    x_coor,
                    y_coor,
                ]
            );
            console.log(treePositions);
            setTreePositions(treePositions);

            setUserPlantCount(data?.length);

            const plantsList = data.map((item) => ({
                image_url: item.image_url,
                plant_name: item.plant_name,
                date_added: item.created_at,
            }));
            setArrayOfUserPLants(plantsList);
        };

        const fetchNameFromUser = async () => {
            const { data, error } = await supabase
                .from("user")
                .select(
                    "first_name"
                )
                .eq("uuid", userUUID);
            console.log(data);

            const firstname = data[0]?.first_name;
            setName(firstname)
            console.log(firstname)
        };

    //           // fetching user uploaded img, calling plant.id api to identify disease

    //   const toBase64 = (url: string): Promise<string|void> => {
    //     return axios
    //       .get(url, { responseType: 'arraybuffer' })
    //       .then((response) => {
    //         const base64Data = Buffer.from(response.data, 'binary').toString('base64');
    //         const base64Image = `data:${response.headers['content-type']};base64,${base64Data}`;
    //         return base64Image;
    //       })
    //       .catch((error) => {
    //         console.log(`Failed to convert image: ${error.message}`);
    //       });
    //   };

        if (userUUID) {
            fetchPlantsFromUser();
            fetchNameFromUser();
        }
    }, [showAddPlantModal, userUUID]);

    const [treePositions, setTreePositions] = useState<TreePosition[][]>([]);
    const [arrayOfUserPLants, setArrayOfUserPLants] = useState<UserPlants[]>(
        []
    );
    console.log(arrayOfUserPLants);

    const dateString = arrayOfUserPLants[0]?.date_added;
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    console.log(formattedDate); // Output: "20 May 2023"

    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return (
        <>
            {showAddPlantModal ? (
                <AddPlant setTreePositions={setTreePositions} />
            ) : (
                <>

                    <div className="overflow-hidden bg-white pt-3 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-2">
                            <div className="lg:max-w-lg">
                            <div className="mt-1 text-xl font-bold tracking-tight text-gray-900 text-center">
                                <span>Welcome to the </span>
                                <span className="text-primary-400 font-bold">green life, </span>
                                <span className="">{name}!</span>
                            </div>
                                <div className="flex items-center mt-2 text-gray-600 justify-center">
                                    <p className="pr-2 text-sm font-bold tracking-tight text-gray-900 text-center">Let's grow together.</p>
                                    <svg className="pr-1" height={17} width={17} fill="#33844C" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/>
                                    </svg>
                                    <span className="inline"><strong className="font-semibold text-gray-900">{userPlantCount}</strong></span>
                                </div>


                                {/* <p className="mt-1 text-lg leading-8 text-gray-600">Started</p> */}
                                <Garden itemPositions={treePositions} />

                                
                                <div className="pt-32 mt-1 text-xs tracking-tight text-gray-900 sm:text-4xl flex justify-center">
                                    <p className="text-black font-bold">{daysDifference}&nbsp;</p>
                                    <p>day(s) since you started your&nbsp;</p>
                                    <p className="text-primary-400 font-bold">sustainable food journey.</p>
                                </div>

                                <ListPlants arrayOfUserPLants={arrayOfUserPLants} />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            )}
            <RecipeButton href="/user/garden/recipes" />
        </>
    );
}
