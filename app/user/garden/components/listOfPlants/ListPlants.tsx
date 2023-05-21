"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    arrayOfUserPLants: UserPlants[];
}

export default function ListPlants({ arrayOfUserPLants }: Props) {
    const router = useRouter();
    const handleImageClick = (plantID: any) => {
        // Navigate to a new route using Next.js router
        router.push('/user/garden/' + plantID)      };
    return (
        <div className="p-4">

            <h1 className="text-xl text-center text-green-500 font-semibold mb-4 pt-40">A Peek into My Plant Collection</h1>
            <div className="grid grid-cols-2 gap-4">
                {arrayOfUserPLants.map((plant, index) => (
                   <div key={index} className="p-4 border border-gray-200 rounded-lg">
                   <img className="object-cover h-48 w-full mb-2 rounded-lg" src={plant.image_url} alt={plant.plant_name} />
                   <h2 className="text-center text-lg mt-2">{plant.plant_name}</h2>
                   <div className="flex justify-center"> 
                     <button onClick={() => handleImageClick(plant.plant_id)} className="py-2 px-4 mt-2 bg-secondarydark-500 text-white font-semibold rounded-lg hover:bg-secondarydark-600 transition-colors duration-300">
                       View More
                     </button>
                   </div>
                 </div>
                 
        

                ))}
            </div>
        </div>

    )
}