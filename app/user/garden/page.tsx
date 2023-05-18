"use client";

import React, { useState } from "react";
import Garden from "./components/Garden";
import AddPlant from "./components/model/AddPlant";
import { useGardenContext } from "@/app/context/gardenContext";

const treePositions: TreePosition[] = [
    ["tree_four", 1, 2], // A tile of type 'tree_four' at position 1,2
    ["tree_one", 4, 5], // A tile of type 'tree_one' at position 2,2
];

export default function Page({}) {
    const { showAddPlantModal }: any = useGardenContext();

    const [treePositions, setTreePositions] = useState<TreePosition[][]>([]);
    return (
        <>
            {showAddPlantModal ? (
                <AddPlant setTreePositions={setTreePositions} />
            ) : (
                <Garden itemPositions={treePositions} />
            )}
        </>
    );
}
