import axios from 'axios';
import { NextResponse } from 'next/server';

const APP_ID = 'ace12d1d';
const APP_KEY = '8936c2c5d43e05fb4e06ccc4bb6ac212';
const API_URL = 'https://api.edamam.com/api/recipes/v2';

export async function POST(request: Request) {
  const { plantName } = await request.json();
  console.log('reached recipe api')
    console.log('recipe route plantName:',plantName)
  try {
    const response = await axios.get(`https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=${plantName}&type=any`);
    const recipes = response.data;
    console.log(recipes)
    return NextResponse.json(recipes);
  } catch (error: any) {
    console.error('Error searching recipes:', error.message);
  }
}
