"use client";

interface Props {}
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios, { all } from "axios";
import { useGardenContext } from "@/app/context/gardenContext";
import { supabase } from "@/config/dbConnect";

const Discover = (props: Props) => {
    const {} = props;

    const examplePlantId = [3013, 5022, 2251, 1595]
    const edibleList = [843, 926, 961, 278, 1482]
    const [allObj, setAllObj] = useState<any>([])
    const {userUUID }: any = useGardenContext();

    // retrieve plant data
    useEffect(() => {
    // return an array of plant_id users already have
        const fetchPlantsFromUser = async () => {
            const { data, error } = await supabase
                .from("plants")
                .select(
                    "plant_id"
                )
                .eq("uuid", userUUID);
            const plantsList = data.map( item => item.plant_id);
        };

        // retrieve the plant details 
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
                    family: plantDetails.family,
                    edibleLeaf: plantDetails.edible_leaf,
                };
                console.log("Final Fetching:", requiredData)
                setAllObj((prevAllObj: any) => [...prevAllObj, requiredData]);
            } catch (error) {
                console.error("Error fetching plant details:", error);
            }
        };

        // retrieve a similar plant id to that user already have
        const fetchSimilarPlant = async (plantId: number) => {
            // FIRSTLY: Retrieve scientific name of plant (DONE)
            //console.log("fetchSimilarPlant() is called ")
            try {
                const response = await axios.post("/api/plant/details", {
                    idOfPlant: plantId,
                });
                const plantDetails = response.data;
                const requiredData = plantDetails.scientific_name;
                const firstPart = requiredData[0].split(" ")[0];
                
        
            // SECONDLY: Retrieve similar plants based on that scientific name
            try {
                const response = await axios.post("/api/plant/discover", {
                    nameOfPlant: firstPart,
                });
                //console.log("responseDATA:",response.data)
                const similarPlantId = response.data[0].PlantID;
                //console.log("similarPlantId:",response.data[0].PlantID)
                if (similarPlantId == plantId){
                    try{
                        return response.data[response.data.length - 1].PlantID;
                    } catch(error){
                        console.log("===No second similar plant===")
                        return edibleList[Math.floor(Math.random() * edibleList.length)];
                    }
                }
                else{
                    // ie. same common
                    //console.log("response.data[0].common_name: ", response.data[0].PlantCommonName)
                    //console.log("plantDetails.common_name", plantDetails.common_name)
                    if(response.data[0].PlantCommonName == plantDetails.common_name){
                        console.log("###################")
                        // MAYBE return a random fruit?
                        return edibleList[Math.floor(Math.random() * edibleList.length)];

                    }
                }
                return response.data[0].PlantID;               
                
            } catch (error) {
                console.error("Error fetching similar plant:", error);
            }
            } catch (error) {
                console.error("Error fetching plant scientific name:", error);
            }
        };



        // Calls the above 2 functions
        const fetchAllPlantDetails = async () => {
            try {
              //const userPlantList = await fetchPlantsFromUser();
              const userPlantList = [3013, 5022, 2251, 1595]
              console.log("userPlantList:",  userPlantList)
              
              const removedEntries = examplePlantId.filter((plantId) => {
                if (userPlantList.includes(plantId)) {
                  return true; // Include the plantId in the removedEntries array
                }
                return false; // Exclude the plantId from the removedEntries array
              });

              // Remove plants from examplePlantId that's already in userPlantList
              const filteredPlantIds = examplePlantId.filter(
                (id) => !userPlantList.includes(id)
              );

              //Find similar plant to the removed plant and add on to filteredPlantIds
                for (const plantId of removedEntries){
                    // Get scientific name 
                    const newPlant = await fetchSimilarPlant(plantId)
                    filteredPlantIds.push(newPlant)
                    console.log("newPlant", newPlant)
                }

                // TODO: Add if newPlant same as original ID, reject it. Retrieve anotheone (Can do it in fetchsimilarplant)

              // Fetch plant details for each finalised plant ID
              console.log(filteredPlantIds)
              for (const plantId of filteredPlantIds) {
                await fetchPlantDetails(plantId);
              }
              
            } catch (error) {
              console.error("Error fetching all plant details:", error);
            }
          };
        
          if (userUUID) {
            fetchAllPlantDetails();
          }
    }, [userUUID]);

    return (
        <div className="bg-FFFBEF-300 h-[1000px]">

            <div className="flex justify-center font-bold text-lg pt-5">
                <h3>We recommend you these plants</h3>
            </div>

            
            <div className="flex justify-center  text-xs italic text-gray-500">
                Click on the rescpective images to find out more!
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
                                    width={170}
                                    height={170}
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
