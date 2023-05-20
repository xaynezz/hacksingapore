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
                        <button  onClick={() => handleImageClick(plant.plant_id)}>
                        <img  className="object-cover h-48 w-full mb-2 rounded-lg" src={plant.image_url} alt={plant.plant_name} /></button>
                        <h2 className="text-center text-lg mt-2">{plant.plant_name}</h2>

                    </div>
                ))}
            </div>
        </div>

    )
}