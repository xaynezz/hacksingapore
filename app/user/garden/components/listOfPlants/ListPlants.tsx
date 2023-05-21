"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/config/dbConnect';
type Props = {
    arrayOfUserPLants: UserPlants[];
}

export default function ListPlants({ arrayOfUserPLants }: Props) {
    const [confirmDelete, isConfirmDelete] = useState<boolean>(false);
    const [deletePlantID, setDeletePlantID] = useState<number>();
    const router = useRouter();
    const handleImageClick = (plantID: string | number, supaID: any) => {
        // Navigate to a new route using Next.js router
        router.push('/user/garden/' + plantID + '/' + supaID)
    };

    const handleDeleteClick = (supaID: number) => {
        /* Open Model */
        isConfirmDelete(true);
        setDeletePlantID(supaID);
        /* Logic to Delete plant */

    }

    const handleConfirmDelete = async () => {
        console.log(deletePlantID)
        const { error } = await supabase
            .from('plants')
            .delete()
            .eq('id', deletePlantID)
        console.log(error)
        if (!error) {
            isConfirmDelete(false);
        }
    }
    return (
        <div className="p-4">

            <h1 className="text-xl text-center text-green-500 font-semibold mb-4">A Peek into My Plant Collection</h1>
            <div className="grid grid-cols-2 gap-4">
                {arrayOfUserPLants.map((plant, index) => {
                    console.log(plant)
                    return (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                        <button
                            className="absolute right-2 top-2 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                            onClick={() => handleDeleteClick(plant.supabase_id)}
                        >
                            x
                        </button>
                        <img className="object-cover h-48 w-full mb-2 rounded-lg" src={plant.image_url} alt={plant.plant_name} />
                        <h2 className="text-center text-s mt-2">{plant.plant_name}</h2>
                        <div className="flex justify-center">
                            <button onClick={() => handleImageClick(plant.plant_id, plant.supabase_id)} className="py-1 px-2 mt-2 bg-secondarydark-500 text-white font-semibold rounded-lg hover:bg-secondarydark-600 transition-colors duration-300">
                                View More
                            </button>
                        </div>
                    </div>
                )})}

            </div>

            {confirmDelete && <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-xl">Confirm delete</h2>
                    <p>Are you sure you want to delete this plant?</p>
                    <div className="mt-4">
                        <button
                            onClick={handleConfirmDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Yes, delete it
                        </button>
                        <button
                            onClick={() => {
                                isConfirmDelete(false)
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>}
        </div>

    )
}