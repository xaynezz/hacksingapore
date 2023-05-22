'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import BackButton from '@/components/BackButton';

import Link from 'next/link'


const PlantDetailPage =  ({ params }: { params: { id: string } }) => {
    const plantID = params.id;
    const [commonName, setCommonName] = useState<string | null>(null);
    const [img, setImg] = useState('');
    const [fruits, setFruits] = useState(false);
    const [el, setEL] = useState(false);

    const [plantDetails, setPlantDetails] = useState<PlantDetails>();
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetails>();
    const [sectionData, setSectionData] = useState<{ id:number, type: string, description: string }[]>([]);


    useEffect(() => {
        const fetchPlantDetails = async () => {
          try {
            const response = await axios.post('/api/plant/details', {
              idOfPlant: plantID
            });

            const plantDetails: PlantDetails = response.data;
            
            setPlantDetails(plantDetails);
            setImg(plantDetails.default_image.regular_url)


          } catch (error) {
            console.error('Error fetching plant details:', error);
          }
        };
    
        fetchPlantDetails();
      }, [plantID]);

      // const fetchFAQ = async () => {
      //   console.log('faq page plant name', plantDetails?.scientific_name[0])
      //   try {
      //     const response = await axios.post('/api/plant/faq', {
      //       plantName: plantDetails?.scientific_name[0]
      //     });

      //     const faq = response.data;
      //     console.log('garden page',faq)

      //   } catch (error) {
      //     console.error('Error fetching plant faq:', error);
      //   }
      // };
  
      // fetchFAQ();
      useEffect(() => {
        const fetchGuide = async () => {
          //console.log('plant page guide plantid', plantDetails?.id)
          try {
            const response = await axios.post('/api/plant/guide', {
              plant_id: plantDetails?.id
            });

            //console.log(response)
            const guide = response.data;
            console.log('plant page',guide)
            setSectionData(guide);
          } catch (error) {
            console.error('Error fetching plant guide:', error);
          }
        };
    
        fetchGuide();
        }, [plantDetails?.id]);

      useEffect(() => {
        const fetchRecipe = async () => {
          try {
            const response2 = await axios.post('/api/recipe', {
              plantName: plantDetails?.common_name
            });
            const recipeDetails: RecipeDetails = response2.data;
            setRecipeDetails(recipeDetails);
            //console.log(response2.data);

          } catch (error) {
            console.error('Error fetching recipe:', error);
          }
        };
    
        fetchRecipe();
      }, [plantDetails?.common_name]);

    return (
        <>
            {/* <div className="flex flex-col items-center justify-center p-8">
                <Image src={img} alt="alt" height={500} width={500} />
                <RecipeButton href='/garden/recipes'/>
            </div> */}

            <BackButton route="/user/discover"/>

            <div className="flex flex-col mt-1 p-2">
                <div className="border rounded-xl">
                  <div className="text-center py-4">
                    <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">{plantDetails?.common_name}</h2>
                    <p className=" italic mt-6 text-lg leading-8 text-gray-800">{plantDetails?.scientific_name}</p>
                    {/* <RecipeButton href='/garden/recipes'/> */}
                  </div>
                </div>


                <div className="relative isolate overflow-hidden bg-white px-6 sm:py-16 lg:overflow-visible lg:px-0">
                  {/* <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                      <defs>
                        <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                          <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                      </defs>
                      <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                        <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
                      </svg>
                      <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                    </svg>
                  </div> */}
                  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    
                    <div className="pt-2">
                      {/* <SlidingComponent images={images} /> */}
                      <Image src={img} alt="alt" height={500} width={500} className='rounded-xl'/>
                    </div>
                    
                    <div className="lg:max-w-lg">
                      <p className="text-base font-semibold leading-7 text-indigo-600">{plantDetails?.common_name}</p>
                      <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Plant Details</h1>
                      <p className="mt-1 text-base leading-8 text-gray-700">{plantDetails?.description}</p>
                    </div>
                    
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                      <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                          {/* <p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.</p> */}
                          <ul role="list" className="mt-2 space-y-5 text-gray-600">
                            <li className="flex gap-x-3">
                              {/* <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
                              </svg> */}
                              <svg fill="none" stroke="#5C6AC4" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height={30} width={30}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
                              </svg>

                              <span className="inline"><strong className="font-semibold text-gray-900">Sunlight </strong>
                                 {plantDetails?.sunlight[0]}
                              </span>
                            </li>
                            <li className="flex gap-x-3">
                              <svg fill="none" stroke="#5C6AC4" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height={30} width={30}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"></path>
                              </svg>
                              <span><strong className="font-semibold text-gray-900">Growth Rate</strong> {plantDetails?.growth_rate}</span>
                            </li>
                            <li className="flex gap-x-3">
                              <svg fill="#5C6AC4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height={30} width={30}>
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 013.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 00-4.392-4.392 49.422 49.422 0 00-7.436 0A4.756 4.756 0 003.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 101.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 013.01-3.01c1.19-.09 2.392-.135 3.605-.135zm-6.97 6.22a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 004.392 4.392 49.413 49.413 0 007.436 0 4.756 4.756 0 004.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 00-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 01-3.01 3.01 47.953 47.953 0 01-7.21 0 3.256 3.256 0 01-3.01-3.01 47.759 47.759 0 01-.1-1.759L6.97 15.53a.75.75 0 001.06-1.06l-3-3z"></path>
                              </svg>
                              <span><strong className="font-semibold text-gray-900">Cycle</strong> {plantDetails?.cycle}</span>
                            </li>
                            <li className="flex gap-x-3">
                            <svg fill="#5C6AC4" xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-droplet-fill" viewBox="0 0 16 16"> <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/> </svg>
                              <span><strong className="font-semibold text-gray-900">Watering</strong> {plantDetails?.watering}</span>
                            </li>
                            <li className="flex gap-x-3">
                              <svg fill="#5C6AC4" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M336 128c-32 0-80.02 16.03-112 32.03c-32.01-16-79.1-32.02-111.1-32.03C32 128 .4134 210.5 .0033 288c-.5313 99.97 63.99 224 159.1 224c32 0 48-16 64-16c16 0 32 16 64 16c96 0 160.4-122.8 159.1-224C447.7 211.6 416 128 336 128zM320 32V0h-32C243.8 0 208 35.82 208 80v32h32C284.2 112 320 76.18 320 32z"/></svg>
                              <span><strong className="font-semibold text-gray-900">Fruits</strong> {plantDetails?.fruits?'Bears Fruits':"Fruitless"}</span>
                            </li>
                            {plantDetails?.edible_fruit && (
                              <li className="flex gap-x-3">
                                <svg fill="#5C6AC4" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0H24V24H0z"/> <path d="M21 3v2c0 9.627-5.373 14-12 14H7.098c.212-3.012 1.15-4.835 3.598-7.001 1.204-1.065 1.102-1.68.509-1.327-4.084 2.43-6.112 5.714-6.202 10.958L5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0z"/> </g> </svg>
                                <span>
                                  <strong className="font-semibold text-gray-900">Edible Leaf</strong>
                                </span>
                              </li>
                            )}
                            {/* <li className="flex gap-x-3">
                              <svg fill="#5C6AC4" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0H24V24H0z"/> <path d="M21 3v2c0 9.627-5.373 14-12 14H7.098c.212-3.012 1.15-4.835 3.598-7.001 1.204-1.065 1.102-1.68.509-1.327-4.084 2.43-6.112 5.714-6.202 10.958L5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0z"/> </g> </svg>
                              <span><strong className="font-semibold text-gray-900">{plantDetails?.edible_leaf?'Edible Leaf':""}</strong> </span>
                            </li> */}
                            {plantDetails?.edible_fruit && (
                              <li className="flex gap-x-3">
                                <svg fill="#5C6AC4" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                  <path d="M336 128c-32 0-80.02 16.03-112 32.03c-32.01-16-79.1-32.02-111.1-32.03C32 128 .4134 210.5 .0033 288c-.5313 99.97 63.99 224 159.1 224c32 0 48-16 64-16c16 0 32 16 64 16c96 0 160.4-122.8 159.1-224C447.7 211.6 416 128 336 128zM320 32V0h-32C243.8 0 208 35.82 208 80v32h32C284.2 112 320 76.18 320 32z"/>
                                </svg>
                                <span>
                                  <strong className="font-semibold text-gray-900">Edible Fruit</strong>
                                </span>
                              </li>
                            )}
                            <li className="flex gap-x-3">
                              <svg stroke="#5C6AC4" fill="#5C6AC4" width="30" height="30" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M13 24.1246C9.01253 23.3584 6 19.851 6 15.64C6 10.8683 9.86826 7 14.64 7C15.4066 7 16.1498 7.09983 16.8574 7.2872C18.4398 5.28493 20.8898 4 23.64 4C26.4704 4 28.9829 5.36098 30.5588 7.46422C31.4372 7.16331 32.3795 7 33.36 7C38.1317 7 42 10.8683 42 15.64C42 19.851 38.9875 23.3584 35 24.1246V40C35 41.1046 34.1046 42 33 42H15C13.8954 42 13 41.1046 13 40V24.1246Z" fill="none" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 31L35 31" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 25V31" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 28V34" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 28V34" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>
                              <span className="inline"><strong className=" inline font-semibold text-gray-900">Recipes</strong>
                                {recipeDetails && recipeDetails.hits.length > 0 
                                ? <p className='inline'> {recipeDetails.hits[0].recipe.label}</p> : <p className='inline'> There are no recipes for this plant.</p>}
                              </span>
                            </li>
                            {/* <li className="flex gap-x-3">
                              <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
                              </svg>
                              <span className="inline"><strong className=" inline font-semibold text-gray-900">Harvest Season</strong>
                                {recipeDetails && recipeDetails.hits.length > 0 
                                ? <p className='inline'> {recipeDetails.hits[1].recipe.label}</p> : <p className='inline'> {plantDetails?.harvest_season}</p>}
                              </span>
                            </li>
                            <li className="flex gap-x-3">
                              <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
                              </svg>
                              <span className="inline"><strong className=" inline font-semibold text-gray-900">Harvest Method</strong>
                                {recipeDetails && recipeDetails.hits.length > 0 
                                ? <p className='inline'> {recipeDetails.hits[1].recipe.label}</p> : <p className='inline'> {plantDetails?.harvest_method}</p>}
                              </span>
                            </li> */}
                          </ul>
                          {/* <p className="mt-8">Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.</p>
                          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">No server? No problem.</h2>
                          <p className="mt-6">Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                

                {/* <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">Plant Name:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.common_name}</p> : <p>Loading...</p>}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Growth Rate:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.growth_rate}</p> : <p>Loading...</p>}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Watering:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.watering}</p> : <p>Loading...</p>}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Fruits:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{fruits?'True':"False"}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Edible Leaf:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{el?'True':"False"}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Cycle:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.cycle}</p> : <p>Loading...</p>}</div>                    
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">Details:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">{plantDetails ? <p>{plantDetails.description}</p> : <p>Loading...</p>}</div>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">Recipes:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">
                      { recipeDetails && recipeDetails.hits.length > 0 
                      ? <p>{recipeDetails.hits[1].recipe.label}</p> 
                      : <p>There are no recipes for this plant.</p>}
                    </div>
                </div> */}

                <div className="border rounded-xl mt-4">
                  <div className="text-center py-4">
                    <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">Plant Care Guide</h2>
                    <p className="mt-2 text-base leading-8 text-gray-800">Tips on caring for your new plant.</p>
                  </div>
                </div>

                <div className="">
                  <h1 className="text-center text-3xl font-bold py-2.5">{sectionData[0]? '':<p> Coming Soon!</p>}</h1>
                </div>

                <div className="relative isolate overflow-hidden bg-white px-6 py-4 lg:overflow-visible lg:px-0">
                  {sectionData.map((item) => (
                  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start" key={item.id}>
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                      <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                          <p className="text-base font-semibold leading-7 text-indigo-600">Plant Care</p>
                          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{item.type}</h1>
                          <p className="text-base leading-8 text-gray-700">{item.description}</p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                      <Image className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src={`/images/${item.type}.jpeg`} alt="Watering" width={1920} height={1080} />
                    </div> */}
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    </div>
                  </div>
                  ))}
                </div>
                
            </div>
        </>
    )
};

export default PlantDetailPage;