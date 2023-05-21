"use client";

import React, { useEffect, useState } from "react";
import Garden from "./components/Garden";
import AddPlant from "./components/model/AddPlant";
import { useGardenContext } from "@/app/context/gardenContext";
import { supabase } from "@/config/dbConnect";
import ListPlants from "./components/listOfPlants/ListPlants";
import RecipeButton from "@/components/RecipeButton";
import { useRouter } from "next/navigation";
import { AiFillCamera } from "react-icons/ai";

export default function page({}) {
    const router = useRouter();
    const { showAddPlantModal, setAddPlantModal }: any = useGardenContext();
    const [arrayOfUserPLants, setArrayOfUserPLants] = useState<UserPlants[]>(
        []
    );
    useEffect(() => {
        const fetchPlantsFromUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            const userUUID = user?.id;

            const { data, error } = await supabase
                .from("plants")
                .select(
                    "plant_id, y_coor, x_coor, tree_number, image_url, common_name , id"
                )
                .eq("uuid", userUUID);
            console.log(data);
            const treePositions = data.map(
                ({ tree_number, y_coor, x_coor, plant_id }) => [
                    tree_number + "/" + plant_id,
                    x_coor,
                    y_coor,
                ]
            );
            console.log(treePositions);
            setTreePositions(treePositions);

            const plantsList = data.map((item) => ({
                image_url: item.image_url,
                plant_name: item.common_name,
                plant_id: item.plant_id,
                supabase_id: item.id
            }));
            setArrayOfUserPLants(plantsList);
        };

        fetchPlantsFromUser();
    }, [showAddPlantModal, arrayOfUserPLants]);

    const [treePositions, setTreePositions] = useState<TreePosition[][]>([]);

    console.log(arrayOfUserPLants);
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
                <AddPlant setTreePositions={setTreePositions} />
            ) : (
                <>
                    <Garden itemPositions={treePositions} />
                    <ListPlants arrayOfUserPLants={arrayOfUserPLants} />
                </>
            )}
        </>
    );
}
