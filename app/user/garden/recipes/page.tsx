"use client";

import React, { use, useEffect, useState, useRef } from "react";
import axios from "axios";
import BackButton from "@/components/BackButton";
import { supabase } from "@/config/dbConnect";
import { useGardenContext } from "@/app/context/gardenContext";
import Image from "next/image";
import Loading from "@/components/Loadingscreen";

interface Recipe {
    label: string;
    image: string;
    instructions: string;
}

interface RecipeDetails {
    hits: { recipe: Recipe }[];
}

const Recipe: React.FC = () => {
    // check if got recipes
    const [norecipe, setnorecipe] = useState(true);
    //const [nofood, setnofood] = useState(false);

    // making it user unique to get the recipes
    const { userUUID }: any = useGardenContext();
    const [recipelist, setRecipelist] = useState<
        { recipeDetails: RecipeDetails }[]
    >([]);
    const [recipeInstructions, setRecipeInstructions] = useState<{
        [label: string]: string;
    }>({});

    // for loading screen:
    const [isLoading, setIsLoading] = useState(true);
    //for image:

    const [isimgLoading, setImgIsLoading] = useState(true);

    const fetchGardenRecipes = async () => {
        setRecipelist([]); // Clear the recipelist state
        setRecipeInstructions({});
        const { data, error } = await supabase
            .from("plants")
            .select("common_name")
            .eq("uuid", userUUID);

        if (data != null) {
            const uniqueCommonNames = data.map((item: any) => item.common_name);
            if (uniqueCommonNames.length === 0) {
                setnorecipe(false);
            }

            const commonNamesSet = new Set(uniqueCommonNames);
            const uniqueCommonNamesArray = Array.from(commonNamesSet);
            const slicedNamesArray: any[] = [];

            // to check by substrings
            /* uniqueCommonNamesArray.forEach((name: string) => {
                if (name.includes(' ')) {
                  const spaceIndex = name.indexOf(' '); // Find the index of the first space
                  const slicedName = name.slice(spaceIndex + 1); // Extract the substring after the first space
                  slicedNamesArray.push(slicedName); // Add the sliced name to the new array
                } else {
                  slicedNamesArray.push(name); // Add the name without modification to the new array
                }
});*/

            for (let i = 0; i < uniqueCommonNamesArray.length; i++) {
                const slicedName = uniqueCommonNamesArray[i];
                await fetchRecipe(slicedName);
            }
        }
    };

    const fetchRecipe = async (plantName: string) => {
        try {
            const response = await axios.post("/api/recipe", { plantName });
            const recipeDetails: RecipeDetails = response.data;
            console.log(response.data);
            // debug here if the fruits have no recipe fetched.
            if (recipeDetails.hits.length === 0) {
                //setnorecipe(false);
                //setnofood(true);
            } else {
                setnorecipe(true);

                const limitedHits = recipeDetails.hits.slice(0, 4); // Limit hits to 4 elements
                setRecipelist((prevList) => [
                    ...prevList,
                    { recipeDetails: { hits: limitedHits } },
                ]);
            }
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };
    // loads the page after all the react component is loaded

    useEffect(() => {
        fetchGardenRecipes().then(() => {
            requestAnimationFrame(() => {
                setIsLoading(false);
            });
        });
    }, []);

    const askrecipe = async (label: string) => {
        const prompt1 = `Can you tell me how to cook ${label} step by step?`;
        const prompt2 =
            " without any other replies, I only want the steps in number.";

        try {
            console.log(label);
            const response = await supabase
                .from("recipe")
                .select("instructions")
                .eq("label", label)
                .single();
            console.log("supabase response", response);
            if (response.data && response.data.instructions) {
                // Instructions exist in the database, update recipeInstructions state
                setRecipeInstructions((prevInstructions) => ({
                    ...prevInstructions,
                    [label]: response.data.instructions,
                }));
            } else {
                console.log("passing plant into chatbot: ", label);
                // Instructions not found in the database, fetch from the API
                const apiResponse = await axios.post("/api/chatbot", {
                    data: prompt1 + prompt2,
                });
                const botmessage = apiResponse.data.choices[0].message.content;
                setRecipeInstructions((prevInstructions) => ({
                    ...prevInstructions,
                    [label]: botmessage,
                }));

                // Store the recipe instructions in Supabase
                await supabase.from("recipe").upsert([
                    {
                        label: label,
                        instructions: botmessage,
                    },
                ]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchedLabels = useRef(new Set());
    // Track fetched labels
    useEffect(() => {
        const fetchInstructions = async () => {
            for (const item of recipelist) {
                for (const hit of item.recipeDetails.hits) {
                    const label = hit.recipe.label;
                    if (
                        !recipeInstructions[label] ||
                        recipeInstructions[label] === ""
                    ) {
                        if (!fetchedLabels.current.has(label)) {
                            fetchedLabels.current.add(label); // Mark label as fetched
                            try {
                                await askrecipe(label);
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }
                }
            }
        };

        fetchInstructions();
    }, [recipelist]);

    return (

        <>
            <BackButton route="/user/garden" />
            <div className="flex flex-col bg-gray-50">
                {/* Render loading spinner when isLoading is true */}
                {isLoading && <Loading></Loading>}

                {!norecipe && !isLoading && (
                    <div>
                        <div className="text-l text-grey-500 mx-4 mb-2 mt-8 text-center font-bold">
                            There are no{" "}
                            <span className="text-green-500">plants</span> in
                            your <span className="text-green-500">garden</span>.
                        </div>
                        <div className="text-l text-grey-500 mx-4 mb-8 mt-4 text-center">
                            Try adding some plants before checking out recipes!
                        </div>
                        <img
                            src="/images/plantlogo.png"
                            alt="Plant Logo"
                            height={200}
                            width={300}
                            className="mx-auto rounded-md"
                        />
                    </div>
                )}
                {!isLoading && (
                    <div className="p-4 sm:p-8">
                        <div className="mx-auto max-w-lg">
                            {recipelist.map((item) => (
                                <div
                                    className="mb-4 overflow-hidden rounded-lg bg-white shadow-md"
                                    key={
                                        item.recipeDetails.hits[0].recipe.label
                                    }
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        {item.recipeDetails.hits.map(
                                            (hit, index) => (
                                                <div
                                                    key={hit.recipe.label}
                                                    className="flex flex-col items-center border border-gray-300 p-4"
                                                >
                                                    <div
                                                        className="mb-2 truncate p-4 text-base text-sm font-semibold text-gray-800"
                                                        style={{
                                                            maxWidth: "12rem",
                                                        }}
                                                    >
                                                        {hit.recipe.label}
                                                    </div>
                                                    <Image
                                                        priority={true}
                                                        src={hit.recipe.image}
                                                        alt="alt"
                                                        height={300}
                                                        width={450}
                                                        className="rounded-md"
                                                    />
                                                    <div className="mt-2 text-xs text-gray-600">
                                                        <ol className="list-decimal pl-4">
                                                            {recipeInstructions[
                                                                hit.recipe.label
                                                            ]
                                                                ?.split("\n")
                                                                .map(
                                                                    (
                                                                        instruction
                                                                    ) => (
                                                                        <>
                                                                            {
                                                                                instruction
                                                                            }
                                                                            <br />
                                                                        </>
                                                                    )
                                                                )}
                                                        </ol>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );

};

export default Recipe;
