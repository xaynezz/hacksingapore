"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '@/components/BackButton';
import { supabase } from '@/config/dbConnect';

const Recipe: React.FC = () => {
  const [recipelist, setRecipelist] = useState<{ recipeDetails: RecipeDetails; }[]>([]);

  const fetchGardenRecipes = async () => {
    const { data, error } = await supabase
      .from('plants')
      .select('common_name');
      
    if (data != null) {
      const uniqueNamesSet = new Set(data);
      console.log('recipe page unique', uniqueNamesSet)
      const commonnames = Array.from(uniqueNamesSet).map((name: any) => {
        fetchRecipe(name.common_name);
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
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  useEffect(() => {
    fetchGardenRecipes();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <BackButton route="/test" />
      <div className="mr-5 px-2 text-xl font-bold">Recipes:</div>
      <div className="text-gray-800 font-bold mx-10 flex-1 text-center">
        {recipelist.length ? <p>{recipelist[1].recipeDetails}</p> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Recipe;