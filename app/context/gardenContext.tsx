"use client";

import { createContext, useContext, useState } from "react";

const GardenContext = createContext({})

export const GardenContextProvider = ({ children }: any) => {
    const [showAddPlantModal, setAddPlantModal] = useState(false)

    return (
        <GardenContext.Provider value={{ showAddPlantModal, setAddPlantModal }}>
            {children}
        </GardenContext.Provider>
    )
};

export const useGardenContext = () => useContext(GardenContext);