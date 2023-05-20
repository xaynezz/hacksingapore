"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BackButton from "@/components/BackButton";
import { supabase } from "@/config/dbConnect";
import Image from "next/image";

interface Recipe {
    label: string;
    image: string;
    instructions: string;
}

interface RecipeDetails {
    hits: { recipe: Recipe }[];
}

const Recipe: React.FC = () => {
    const [recipelist, setRecipelist] = useState<
        { recipeDetails: RecipeDetails }[]
    >([]);
    const [recipeInstructions, setRecipeInstructions] = useState<{
        [label: string]: string;
    }>({});

    const fetchGardenRecipes = async () => {
        setRecipelist([]); // Clear the recipelist state
        setRecipeInstructions({});
        const { data, error } = await supabase
            .from("plants")
            .select("common_name");

        if (data != null) {
            const uniqueCommonNames = data.map((item: any) => item.common_name);
            const commonNamesSet = new Set(uniqueCommonNames);
            const uniqueCommonNamesArray = Array.from(commonNamesSet);

            uniqueCommonNamesArray.forEach((name: string) => {
                fetchRecipe(name);
            });
        }
    };

    const fetchRecipe = async (plantName: string) => {
        try {
            const response = await axios.post("/api/recipe", { plantName });
            const recipeDetails: RecipeDetails = response.data;
            const limitedHits = recipeDetails.hits.slice(0, 4); // Limit hits to 4 elements
            setRecipelist((prevList) => [
                ...prevList,
                { recipeDetails: { hits: limitedHits } },
            ]);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    useEffect(() => {
        fetchGardenRecipes();
    }, []);

    const askrecipe = async (label: string) => {
        const prompt1 = `Can you tell me how to cook ${label} step by step?`;
        const prompt2 =
            " without any other replies, I only want the steps in number.";

        try {
            console.log("passing plant into chatbot: ", label);
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
                await supabase.from("recipes").insert([
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
                <div className="mx-4 mt-8 text-center text-2xl font-bold text-gray-800">
                    Recipes
                </div>
                <div className="p-4 sm:p-8">
                    <div className="mx-auto max-w-lg">
                        {recipelist.map((item) => (
                            <div
                                className="mb-4 overflow-hidden rounded-lg bg-white shadow-md"
                                key={item.recipeDetails.hits[0].recipe.label}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    {item.recipeDetails.hits.map(
                                        (hit, index) => (
                                            <div
                                                key={hit.recipe.label}
                                                className="flex flex-col items-center border border-gray-300 p-4"
                                            >
                                                <div
                                                    className="mb-2 truncate text-base font-semibold text-gray-800"
                                                    style={{
                                                        maxWidth: "12rem",
                                                    }}
                                                >
                                                    {hit.recipe.label}
                                                </div>
                                                <Image
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
            </div>
        </>
    );
};

export default Recipe;
