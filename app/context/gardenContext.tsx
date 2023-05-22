"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/config/dbConnect";
import { User } from "@supabase/supabase-js";

const GardenContext = createContext({});

export const GardenContextProvider = ({ children }: any) => {
    const [showAddPlantModal, setAddPlantModal] = useState(false);
    const [user, setUser] = useState<User>(null);
    const [userUUID, setUserUUID] = useState<string>();

    useEffect(() => {
        "server action";
        async function fetchUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
            setUserUUID(user?.id);
        }
        fetchUser();
    }, []);

    return (
        <GardenContext.Provider
            value={{ showAddPlantModal, setAddPlantModal, user, userUUID }}
        >
            {children}
        </GardenContext.Provider>
    );
};

export const useGardenContext = () => useContext(GardenContext);
