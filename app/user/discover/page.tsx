"use client";

interface Props {}
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Discover = (props: Props) => {
    const {} = props;

    const examplePlantId = [791, 5022, 2251, 1595]
    const [allObj, setAllObj] = useState<any>([])

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
            setAllObj((prevAllObj:any) => [...prevAllObj, requiredData])
          } catch (error) {
            console.error('Error fetching plant details:', error);
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
            {/* <div className="flex justify-center pt-10">
                <h2>Hi Oak Soe Khant, </h2>
            </div> */}
            <div className="flex justify-center pt-7">
                <h3>We recommend you those plants!</h3>
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
                                    style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                     }}
                                />
                            </a>
                        </div>

                        {
                            e.edibleLeaf ? (                        
                                <div className="flex gap-x-2">
                                    <svg fill="#5C6AC4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0H24V24H0z"/> <path d="M21 3v2c0 9.627-5.373 14-12 14H7.098c.212-3.012 1.15-4.835 3.598-7.001 1.204-1.065 1.102-1.68.509-1.327-4.084 2.43-6.112 5.714-6.202 10.958L5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0z"/> </g> </svg>
                                    <span>
                                        <strong className="font-semibold text-gray-900">Edible Leaf</strong>
                                    </span>
                                </div>) : 
                                <div className="flex gap-x-2" style={{ visibility: "hidden"  }}>a</div>
                                

                        }

                        {
                            e.fruits ? (
                                <div className="flex gap-x-2">
                                    <svg fill="#5C6AC4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M336 128c-32 0-80.02 16.03-112 32.03c-32.01-16-79.1-32.02-111.1-32.03C32 128 .4134 210.5 .0033 288c-.5313 99.97 63.99 224 159.1 224c32 0 48-16 64-16c16 0 32 16 64 16c96 0 160.4-122.8 159.1-224C447.7 211.6 416 128 336 128zM320 32V0h-32C243.8 0 208 35.82 208 80v32h32C284.2 112 320 76.18 320 32z"/>
                                    </svg>
                                    <span>
                                        <strong className="font-semibold text-gray-900">Edible Fruit</strong>
                                    </span>
                                </div>

                            ) : <div className="flex gap-x-2" style={{ visibility: "hidden"  }}>a</div>
                        }

                        {/* <div>fruit: {e.fruits ? "yes" : "no"}</div>
                        <div>edible leaf: {e.edibleLeaf ? "yes" : "no"}</div> */}
                    </div>
                ))}
            </div>
        </div>
        
        
    )
}

export default Discover;
