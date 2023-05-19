"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '@/components/BackButton';
import { supabase } from '@/config/dbConnect';
import Image from 'next/image';
const Recipe: React.FC = () => {
  
  const [recipelist, setRecipelist] = useState<{ recipeDetails: RecipeDetails; }[]>([]);
  const fetchGardenRecipes = async () => {
    const { data, error } = await supabase
      .from('plants')
      .select('common_name');
  
    if (data != null) {
      const uniqueCommonNames = data.map((item: any) => item.common_name);
      const commonNamesSet = new Set(uniqueCommonNames);
      const uniqueCommonNamesArray = Array.from(commonNamesSet);
      
      const commonNames = uniqueCommonNamesArray.map((name: string) => {
        fetchRecipe(name);
      });
    }
  };
  
  const fetchRecipe = async (plantName: any) => {
    try {
      await axios.post('/api/recipe', { plantName });
      const response = await axios.post('/api/recipe', { plantName });
      const recipeDetails: RecipeDetails = response.data;
      recipelist.push({ recipeDetails });
      setRecipelist([...recipelist]);
      console.log(recipelist)
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  useEffect(() => {
    fetchGardenRecipes();
  }, []);


// ...

return (
  <div className="flex flex-col bg-gray-50">
    <div className="mx-4 mt-8 text-3xl font-bold text-center text-gray-800">Recipes</div>
    <div className="p-4 sm:p-8">
      <div className="max-w-lg mx-auto">
        {recipelist.map((item) => (
          <div className="bg-gray-50 p-4 mb-4" key={item.recipeDetails.hits[0].recipe.uri}>
            <div className="grid grid-cols-2 gap-4">
              {item.recipeDetails.hits.map((hit, index) => (
                <div key={hit.recipe.uri} className="flex flex-col items-center">
                  <div className="text-	 font-semibold mb-2 text-gray-800">{hit.recipe.label}</div>
                  <Image
                    src={hit.recipe.image}
                    alt="alt"
                    height={300}
                    width={450}
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);




}

export default Recipe;
