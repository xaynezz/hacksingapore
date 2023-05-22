"use client";

import React, { useEffect, useState } from "react";
import Garden from "./components/Garden";
import AddPlant from "./components/model/AddPlant";
import { useGardenContext } from "@/app/context/gardenContext";
import { supabase } from "@/config/dbConnect";
import ListPlants from "./components/listOfPlants/ListPlants";
import RecipeButton from "@/components/RecipeButton";
import { AiFillCamera } from "react-icons/ai";

export default function page({}) {
    const { showAddPlantModal, setAddPlantModal }: any = useGardenContext();
    const [arrayOfUserPLants, setArrayOfUserPLants] = useState<UserPlants[]>(
        []
    );
    const [userPlantCount, setUserPlantCount] = useState<Number>();
    const [name, setName] = useState("");
    const [deleteFlag, setisDeleteFlag] = useState<boolean>(false);

    useEffect(() => {
        const fetchPlantsFromUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            const userUUID = user?.id;
            console.log("user " + userUUID);

            fetchNameFromUser(userUUID);

            const { data, error } = await supabase
                .from("plants")
                .select(
                    "id, plant_id, y_coor, x_coor, tree_number, image_url, plant_name, created_at, common_name"
                )
                .eq("uuid", userUUID);

            const { data: emptyArrData, error: emptyArrError } = await supabase
                .from("empty")
                .select("uuid, empty_plots")
                .eq("uuid", userUUID);

            const treePositions = data.map(
                ({ tree_number, y_coor, x_coor, plant_id, id }) => [
                    tree_number + "/" + plant_id + "/" + id,
                    x_coor,
                    y_coor,
                ]
            );

            const emptyPlots = emptyArrData[0]?.empty_plots;

            emptyPlots?.map((item) => {
                treePositions.push(["empty", item.x_coor, item.y_coor]);
            });
            console.log(treePositions);
            setTreePositions(treePositions);
            setUserPlantCount(data?.length);

            const plantsList = data.map((item) => ({
                image_url: item.image_url,
                plant_name: item.common_name,
                plant_id: item.plant_id,
                supabase_id: item.id,
                date_added: item.created_at,
            }));
            setArrayOfUserPLants(plantsList);
        };

        const fetchNameFromUser = async (userUUID: any) => {
            const { data, error } = await supabase
                .from("user")
                .select("first_name")
                .eq("uuid", userUUID);
            console.log(data);

            const firstname = data[0]?.first_name;
            setName(firstname);
            console.log(firstname);
        };

        fetchPlantsFromUser();
    }, [showAddPlantModal, deleteFlag]);

    const [treePositions, setTreePositions] = useState<TreePosition[][]>([]);

    const dateString = arrayOfUserPLants[0]?.date_added;
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    console.log(formattedDate); // Output: "20 May 2023"

    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return (
        <>
            <div className="flex items-center justify-between">
                <RecipeButton href="/user/garden/recipes" />
                <button
                    onClick={() => setAddPlantModal(true)}
                    className="m-2 rounded-md border-b-4 border-secondarydark-700 bg-secondarydark-400 p-2 hover:border-secondarydark-500 hover:bg-secondarydark-300"
                >
                    <AiFillCamera size={20} />
                </button>
            </div>
            {showAddPlantModal ? (
                <AddPlant treePositions={treePositions} />
            ) : (
                <>
                    <div className="overflow-hidden bg-white pt-3 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                                <div className="lg:pr-8 lg:pt-2">
                                    <div className="lg:max-w-lg">
                                        <div className="mt-1 text-center text-xl font-bold tracking-tight text-gray-900">
                                            <span>Welcome to the </span>
                                            <span className="font-bold text-primary-400">
                                                green life,{" "}
                                            </span>
                                            <span className="">{name}!</span>
                                        </div>
                                        <div className="mb-10 mt-2 flex items-center justify-center text-gray-600">
                                            <p className="pr-2 text-center text-sm font-bold tracking-tight text-gray-900">
                                                Let's grow together.
                                            </p>
                                            <svg
                                                className="pr-1"
                                                height={17}
                                                width={17}
                                                fill="#33844C"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z" />
                                            </svg>
                                            <span className="inline">
                                                <strong className="font-semibold text-gray-900">
                                                    {userPlantCount}
                                                </strong>
                                            </span>
                                        </div>

                                        {/* <p className="mt-1 text-lg leading-8 text-gray-600">Started</p> */}
                                        <Garden itemPositions={treePositions} />

                                        <div className="mt-1 flex justify-center pt-32 text-xs tracking-tight text-gray-900 sm:text-4xl">
                                            <p className="font-bold text-black">
                                                {isNaN(daysDifference) || daysDifference < 0 ? 0 : daysDifference}&nbsp;
                                            </p>
                                            <p>
                                                day(s) since you started
                                                your&nbsp;
                                            </p>
                                            <p className="font-bold text-primary-400">
                                                sustainable food journey.
                                            </p>
                                        </div>

                                        <ListPlants
                                            isDeleteFlag={setisDeleteFlag}
                                            arrayOfUserPLants={
                                                arrayOfUserPLants
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
