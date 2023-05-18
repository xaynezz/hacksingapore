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
                .select('plant_id, y_coor, x_coor, tree_number')
            const treePositions = data.map(({ tree_number, y_coor, x_coor, plant_id }) => [tree_number + '/' + plant_id, x_coor, y_coor]);
            console.log(treePositions)
            setTreePositions(treePositions)
        }
        fetchPlantsFromUser();
    }, [])

    const { showAddPlantModal }: any = useGardenContext();
    const [treePositions, setTreePositions] = useState<TreePosition[][]>([]);
    return (
        <>
            {showAddPlantModal ? <AddPlant setTreePositions={setTreePositions} /> : <Garden itemPositions={treePositions} />}
            {/* <ListPlants/> */}
        </>
    )
}


