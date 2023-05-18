import { useGardenContext } from '@/app/context/gardenContext';
import axios from 'axios';
import React, { useState } from 'react'
import { supabase } from "../../../../../config/dbConnect"
import { RiPlantFill } from "react-icons/ri";

interface Props {
    setTreePositions: React.Dispatch<React.SetStateAction<TreePosition[][]>>
}

const toBase64 = (file: File | null) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });



export default function AddPlant({ setTreePositions }: Props) {
    const { setAddPlantModal }: any = useGardenContext();
    const [image, setImage] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        } else {
            setImage(null);
        }
    }

    const handleSubmit = async () => {
        console.log("Clicked submit button!")
        try {
            const base64File = await toBase64(image);

            /* Send POST request to backend to identify image => returns a name */
            const response = await axios.post('/api/plant/identify', {
                base64String: base64File,
            });

            const PlantIdentifyData: PlantIdentifyApiResponse = response.data;

            /* Send POST request to backend to identify image => returns an ID */
            const response1 = await axios.post('/api/plant', {
                nameOfPlant: PlantIdentifyData.suggestions[0].plant_name,
            });

            const plantID: number = response1.data;

            /* Calculate a random 10*10 coordinates & image string */
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const options = ["tree_one", "tree_two", "tree_three", "tree_four"];
            const randomIndex = Math.floor(Math.random() * options.length);

            /* Add the coordinate to the useState */
            setTreePositions((prevArray) => {
                const newArray = [...prevArray]
                newArray.push([options[randomIndex], x, y])
                return newArray
            })

            /* Send to database */
            let plantObjectAddToDatabase: plantObjectForSupaBase = { userid: 1, x_coor: x, y_coor: y, plant_name: PlantIdentifyData.suggestions[0].plant_name, plant_id: plantID, tree_number: options[randomIndex] };

            const { error } = await supabase
                .from('plants')
                .insert(plantObjectAddToDatabase)
            if (!error) {
                console.log("Added successfully!");
            } else {
                console.log(error)
            }

            /* Close the modal */
            setAddPlantModal(false);
        } catch (error) {

        }

    }
    return (
        <>
            <div className="relative z-5" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-13 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-20 sm:w-10">
                                        {<RiPlantFill size={"S"} />}
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Add a Plant</h3>
                                        <div className="mt-2">
                                        </div>
                                        <label className="p-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload your plant here!</label>
                                        <input type="file"
                                            onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"></input>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="submit" onClick={handleSubmit} className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">Add Plant</button>
                                <button type="button" onClick={() => setAddPlantModal(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}