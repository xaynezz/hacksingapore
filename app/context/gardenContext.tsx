"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/config/supaClient";

const GardenContext = createContext({});

export const GardenContextProvider = ({ children }: any) => {
    const [showAddPlantModal, setAddPlantModal] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        "server action";
        async function fetchUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        }
        fetchUser();
    }, []);

    return (
        <GardenContext.Provider
            value={{ showAddPlantModal, setAddPlantModal, user }}
        >
            {children}
        </GardenContext.Provider>
    );
};

export const useGardenContext = () => useContext(GardenContext);
