"use client";
import { useGardenContext } from "@/app/context/gardenContext";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../config/dbConnect";
import { RiPlantFill } from "react-icons/ri";

const toBase64 = (file: File | null) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default function AddPlant(prop: any) {
    const { setAddPlantModal }: any = useGardenContext();

    const [userUUID, setUserUUID] = useState<string>();

    useEffect(() => {
        async function fetchUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUserUUID(user?.id);
        }
        fetchUser();
    }, []);
    console.log("AddPlant UUID " + userUUID);
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        } else {
            setImage(null);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const base64File = await toBase64(image);

            /* Send POST request to backend to identify image => returns a name */
            const response = await axios.post("/api/plant/identify", {
                base64String: base64File,
            });

            const PlantIdentifyData: PlantIdentifyApiResponse = response.data;

            /* Send POST request to backend to identify image => returns an ID */
            const response1 = await axios.post("/api/plant", {
                nameOfPlant: PlantIdentifyData.suggestions[0].plant_name,
            });

            const { PlantID, PlantCommonName } = response1.data;

            const response2 = await axios.post("/api/plant/health", {
                base64String: base64File,
            });

            const PlantHealthAssessment: PlantHealthAssessment = response2.data;
            console.log("plant health assessment:", PlantHealthAssessment);

            /* Calculate a random 10*10 coordinates & image string */
            const illegal = prop.treePositions.map((sublist: any) => {
                return sublist.slice(1);
            });
            const options = ["tree_one", "tree_two", "tree_three", "tree_four"];
            const randomIndex = Math.floor(Math.random() * options.length);

            let x: number;
            let y: number;
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                console.log({ illegal: illegal });
                console.log({ test: [x, y] });
            } while (illegal.some((arr: any) => arr[0] === x && arr[1] === y));

            /* Send to database */
            let plantObjectAddToDatabase: plantObjectForSupaBase = {
                uuid: userUUID,
                x_coor: x,
                y_coor: y,
                plant_name: PlantIdentifyData.suggestions[0].plant_name,
                plant_id: PlantID,
                tree_number: options[randomIndex],
                image_url: PlantIdentifyData.images[0].url,
                common_name: PlantCommonName,
                health: PlantHealthAssessment,
            };

            const { error } = await supabase
                .from("plants")
                .insert(plantObjectAddToDatabase);
            if (!error) {
                console.log("Added successfully!");
            } else {
                console.log(error);
            }

            /* Close the modal */
            setLoading(false);
            setAddPlantModal(false);
        } catch (error) {
            console.log("error finding disease:", error);
        }
    };
    return (
        <>
            <div
                className="z-5 relative"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="h-13 mx-auto flex w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-20 sm:w-10">
                                        {<RiPlantFill size={"S"} />}
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3
                                            className="text-base font-semibold leading-6 text-gray-900"
                                            id="modal-title"
                                        >
                                            Add a Plant
                                        </h3>
                                        <div className="mt-2"></div>
                                        <label
                                            className="text-black-900 mb-2 block p-4 text-sm font-medium"
                                            for="file_input"
                                        >
                                            Upload your plant here!
                                        </label>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                                            id="file_input"
                                            type="file"
                                        ></input>
                                        <p
                                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                            id="file_input_help"
                                        >
                                            SVG, PNG, JPG or GIF.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto ${
                                        isLoading
                                            ? "cursor-not-allowed bg-gray-500 text-white"
                                            : "bg-green-600 text-white hover:bg-green-500"
                                    }`}
                                >
                                    {isLoading ? "Loading..." : "Add Plant"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAddPlantModal(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
