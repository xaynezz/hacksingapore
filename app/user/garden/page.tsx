"use client";

import React, { useEffect, useState } from 'react'
import Garden from './components/Garden';
import AddPlant from './components/model/AddPlant';
import { useGardenContext } from '@/app/context/gardenContext';
import { supabase } from '@/config/dbConnect';
import ListPlants from './components/listOfPlants/ListPlants';

export default function page({ }) {

    useEffect(() => {
        const fetchPlantsFromUser = async () => {
            const { data, error } = await supabase
                .from('plants')
                .select('plant_id, y_coor, x_coor, tree_number, image_url, plant_name')
            console.log(data)
            const treePositions = data.map(({ tree_number, y_coor, x_coor, plant_id }) => [tree_number + '/' + plant_id, x_coor, y_coor]);
            console.log(treePositions)
            setTreePositions(treePositions)

            const plantsList = data.map((item) => ({
                image_url: item.image_url,
                plant_name: item.plant_name,
            }));
            setArrayOfUserPLants(plantsList);
        }
        fetchPlantsFromUser();
    }, [])

    const { showAddPlantModal }: any = useGardenContext();
    const [treePositions, setTreePositions] = useState<TreePosition[][]>([]);
    const [arrayOfUserPLants, setArrayOfUserPLants] = useState<UserPlants[]>([]);
    console.log(arrayOfUserPLants);
    return (
        <>
            {showAddPlantModal ? <AddPlant setTreePositions={setTreePositions} /> :
                <>
                    <Garden itemPositions={treePositions} />                
                    <ListPlants arrayOfUserPLants={arrayOfUserPLants} />
                </>}



        </>
    )
}


