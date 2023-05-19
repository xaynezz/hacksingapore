"use client";

interface Props {}
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Discover = (props: Props) => {
    const {} = props;

    const examplePlantId = [791, 5022, 2251, 1595, 500];
    const [allObj, setAllObj] = useState<any>([]);

    useEffect(() => {
        const fetchPlantDetails = async (plantId: number) => {
            try {
                const response = await axios.post("/api/plant/details", {
                    idOfPlant: plantId,
                });
                const plantDetails = response.data;
                const requiredData = {
                    id: plantDetails.id,
                    regular_url: plantDetails.default_image.regular_url,
                    common_name: plantDetails.common_name,
                    fruits: plantDetails.fruits,
                    edibleLeaf: plantDetails.edible_leaf,
                };
                setAllObj((prevAllObj: any) => [...prevAllObj, requiredData]);
            } catch (error) {
                console.error("Error fetching plant details:", error);
            }
        };

        const fetchAllPlantDetails = async () => {
            for (const plantId of examplePlantId) {
                await fetchPlantDetails(plantId);
            }
        };

        fetchAllPlantDetails();
    }, []);

    return (
        <div className="bg-FFFBEF-300 h-[1000px]">
            <div className="flex justify-center pt-10">
                <h2>Hi Oak Soe Khant, </h2>
            </div>
            <div className="flex justify-center">
                <h3>we recommend you those plants!</h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-5 px-7 py-4">
                {allObj.map((e: any) => (
                    <div
                        className="flex flex-col items-center justify-center"
                        key={e.id}
                    >
                        <div className="mx-auto flex-1 text-center font-bold text-gray-800 ">
                            {e.common_name}
                        </div>
                        <div className="squared-full flex h-36 w-36 items-center justify-center">
                            <a href={`/user/discover/${e.id}`}>
                                <Image
                                    src={e.regular_url}
                                    width={150}
                                    height={150}
                                    alt={`Image`}
                                />
                            </a>
                        </div>
                        <div>fruit: {e.fruits ? "yes" : "no"}</div>
                        <div>edible leaf: {e.edibleLeaf ? "yes" : "no"}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Discover;
