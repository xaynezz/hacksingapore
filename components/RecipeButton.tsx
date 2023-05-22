import React from 'react'
import { TbChefHat } from 'react-icons/tb'
import { useRouter } from 'next/navigation';

interface RecipeButtonProps {
    href: string;
  }

const RecipeButton: React.FC<RecipeButtonProps> = ({ href }) => {
    const router = useRouter();

    const handleRecipe = () => {
      // Navigate to /somepage
      router.push(href);
    };

  return (
    <button  onClick={handleRecipe} className='m-2 p-2 bg-secondarydark-400 hover:bg-secondarydark-300 border-b-4 border-secondarydark-700 hover:border-secondarydark-500 rounded-md'>
        <TbChefHat size={20} />
    </button>
  )
}

export default RecipeButton;
