"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '@/components/BackButton';
import { supabase } from '@/config/dbConnect';
import Image from 'next/image';

interface Recipe {
  label: string;
  image: string;
  instructions: string;
}

interface RecipeDetails {
  hits: { recipe: Recipe }[];
}

const Recipe: React.FC = () => {
  const [recipelist, setRecipelist] = useState<{ recipeDetails: RecipeDetails }[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<{ [label: string]: string }>({});

  const fetchGardenRecipes = async () => {
    setRecipelist([]); // Clear the recipelist state
    setRecipeInstructions({});
    const { data, error } = await supabase.from('plants').select('common_name');
  
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
      const response = await axios.post('/api/recipe', { plantName });
      const recipeDetails: RecipeDetails = response.data;
      const limitedHits = recipeDetails.hits.slice(0, 4); // Limit hits to 6 elements
      setRecipelist((prevList) => [...prevList, { recipeDetails: { hits: limitedHits } }]);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };
  

  useEffect(() => {
    fetchGardenRecipes();
  }, []);

  const askrecipe = async ( label: string) => {
    const prompt1 = `Can you tell me how to cook ${label} step by step?`;
    const prompt2 = ' without any other replies, I only want the steps in number.';

    try {
      const response = await axios.post('/api/chatbot', {
        data: prompt1 + prompt2,
      });
      const botmessage = response.data.choices[0].message.content;
      setRecipeInstructions((prevInstructions) => ({ ...prevInstructions, [label]: botmessage }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchInstructions = async () => {
      const fetchedLabels = new Set(); // Track fetched labels
  
      for (const item of recipelist) {
        for (const hit of item.recipeDetails.hits) {
          const label = hit.recipe.label;
          if (!recipeInstructions[label] || recipeInstructions[label] === '') {
            if (!fetchedLabels.has(label)) {
              fetchedLabels.add(label); // Mark label as fetched
              await askrecipe(label);
            }
          }
        }
      }
    };
  
    fetchInstructions();
  }, [recipelist]);
  

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="mx-4 mt-8 text-2xl font-bold text-center text-gray-800">Recipes</div>
      <div className="p-4 sm:p-8">
        <div className="max-w-lg mx-auto">
          {recipelist.map((item) => (
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4" key={item.recipeDetails.hits[0].recipe.label}>
              <div className="grid grid-cols-2 gap-4">
                {item.recipeDetails.hits.map((hit, index) => (
                  <div key={hit.recipe.label} className="flex flex-col items-center p-4 border border-gray-300">
                    <div className="text-base font-semibold mb-2 text-gray-800 truncate" style={{ maxWidth: '12rem' }}>
                      {hit.recipe.label}
                    </div>
                    <Image src={hit.recipe.image} alt="alt" height={300} width={450} className="rounded-md" />
                    <div className="text-xs mt-2 text-gray-600">
                    <ol className="list-decimal pl-4">
                    {recipeInstructions[hit.recipe.label]?.split('\n').map((instruction, index) => {
                      const startIndex = instruction.indexOf('1.'); // Find the index of the first occurrence of "1."
                      if (startIndex !== -1) {
                        const trimmedInstruction = instruction.substring(startIndex); // Get the substring starting from the first occurrence of "1."
                        return <li key={index}>{instruction}</li>;
                      }
                      return null;
                    })}
                  </ol>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
