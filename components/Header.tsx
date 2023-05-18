import AddPlant from "@/app/user/garden/components/model/AddPlant";
import React, { useState } from "react";
import { useGardenContext } from "@/app/context/gardenContext";

interface HeaderProps {
    title: String;
    icon?: React.JSX.Element;
}

function Header({ title, icon }: HeaderProps) {
    const { setAddPlantModal }: any = useGardenContext();
    return (
        <div className="flex h-12 w-full items-center justify-center bg-primary-400">
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            <button onClick={() => setAddPlantModal(true)} className="pl-2 text-2xl font-semibold text-black">{icon}</button>
        </div>
    );
}

export default Header;
