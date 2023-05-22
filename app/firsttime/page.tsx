"use client";

import React, { use, useEffect, useState } from "react";
import { useGardenContext } from "@/app/context/gardenContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/config/dbConnect";

const climateOptions = [
    "Tropical",
    "Dry",
    "Temperate",
    "Continental",
    "Polar",
    "Mountain",
    "Mediterranean",
    "Maritime",
    "Desert",
];
const spaceOptions = ["0-10", "10-20", "20-30", "30-40", "40-50", "50+"];
const experienceOptions = ["Beginner", "Intermediate", "Advanced"];
const typeOptions = ["Vegetables", "Fruits", "Herbs", "Flowers"];

function Page() {
    const router = useRouter();
    const [grid, setGrid] = useState<Array<Array<boolean>>>(
        Array.from({ length: 10 }, () => Array(10).fill(true))
    );

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

    async function handleSubmit(e: any) {
        e.preventDefault();
        const climate = e.target.climate.value;
        const space = e.target.space.value;
        const experience = e.target.experience.value;
        const type = e.target.type.value;
        const emptyGridArray: any[] = [];

        grid.map((row, rowIndex) => {
            row.map((col, colIndex) => {
                if (!grid[rowIndex][colIndex]) {
                    emptyGridArray.push({ y_coor: rowIndex, x_coor: colIndex });
                }
            });
        });

        const { data: accData, error: accError } = await supabase
            .from("user")
            .update([
                {
                    returning_user: true,
                    climate: climate,
                    space: space,
                    experience: experience,
                    type: type,
                },
            ])
            .eq("uuid", userUUID)
            .then();

        const { data: emptyData, error: emptyError } = await supabase
            .from("empty")
            .insert({
                uuid: userUUID,
                empty_plots: emptyGridArray,
            });

        if (!accError && !emptyError) {
            router.push("/user/garden");
        }
    }

    return (
        <main className="flex h-full w-full flex-col items-center justify-center bg-green-500 py-2">
            <h1 className=" text-xl font-semibold text-white">
                Choose your plot
            </h1>
            <p className="mb-3 text-xs  text-white font-semibold">
                {"(click to add/remove tile)"}
            </p>

            <div
                className="flex h-[250px] w-[250px] items-center justify-center border-b-4 border-r-4 border-b-[#c59065] border-r-[#764d27] bg-[#764d27]"
                style={{
                    transform: "rotateX(45deg) rotateZ(45deg)",
                }}
            >
                {grid.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="flex h-full w-[10%] flex-col"
                    >
                        {row.map((col, colIndex) => (
                            <div
                                key={colIndex}
                                className={`h-[10%] w-full text-xs ${
                                    grid[rowIndex][colIndex]
                                        ? "bg-[#00ff66] "
                                        : "bg-[#764d27] "
                                }`}
                                onClick={() => {
                                    const newGrid = [...grid];
                                    newGrid[rowIndex][colIndex] =
                                        !newGrid[rowIndex][colIndex];
                                    setGrid(newGrid);
                                }}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* <h1 className="mt-2 text-xs font-semibold text-white">
                Click to set/unset land
            </h1> */}
            <form
                id="details-form"
                onSubmit={handleSubmit}
                className="mt-3 flex flex-col items-center justify-center gap-3"
            >
                <div className="flex flex-col">
                    <label
                        htmlFor="climate"
                        className="font-semibold text-white"
                    >
                        Climate
                    </label>
                    <select
                        className="h-8 w-64 px-1"
                        id="climate"
                        defaultValue="test"
                    >
                        <option value="test" disabled hidden />
                        {climateOptions.map((climate) => (
                            <option key={climate} value={climate}>
                                {climate}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="space" className="font-semibold text-white">
                        Available Space (meters)
                    </label>
                    <select
                        className="h-8 w-64 px-1"
                        id="space"
                        defaultValue="test"
                    >
                        <option value="test" disabled hidden />
                        {spaceOptions.map((space) => (
                            <option key={space} value={space}>
                                {space}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="experience"
                        className="font-semibold text-white"
                    >
                        Gardening Experience
                    </label>
                    <select
                        className="h-8 w-64 px-1"
                        id="experience"
                        defaultValue="test"
                    >
                        <option value="test" disabled hidden />
                        {experienceOptions.map((experience) => (
                            <option key={experience} value={experience}>
                                {experience}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="type" className="font-semibold text-white">
                        Preferred Plant Type
                    </label>
                    <select
                        className="h-8 w-64 px-1"
                        id="type"
                        defaultValue="test"
                    >
                        <option value="test" disabled hidden />
                        {typeOptions.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="mt-3 h-8 w-64 rounded-xl bg-secondarydark-500 font-semibold text-white active:bg-secondarydark-400"
                    type="submit"
                    form="details-form"
                >
                    Lets Garden!
                </button>
            </form>
        </main>
    );
}

export default Page;
