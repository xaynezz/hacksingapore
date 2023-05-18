"use client"
import React from 'react'

type Props = {
    arrayOfUserPLants: UserPlants[];
}

export default function ListPlants({ arrayOfUserPLants }: Props) {

    return (
        <div className="absolute right-0 bottom-20 w-48"> {/* Decreased width of the container */}
            <h1 className="text-lg font-bold text-center">Available Plants</h1>
            <div>
                {arrayOfUserPLants.map((plant, index) => (
                    <div key={index} className="bg-white rounded shadow-lg p-3">
                        <img className="w-full h-16 object-cover mb-3 rounded" src={plant.image_url} alt={plant.plant_name} /> {/* Decreased height of the image */}
                        <p className="text-gray-800 font-semibold text-xs">{plant.plant_name}</p> {/* Decreased font size */}
                    </div>
                ))}
            </div>
        </div>
    )
}