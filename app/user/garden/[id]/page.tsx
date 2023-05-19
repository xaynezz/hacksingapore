'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import RecipeButton from '@/components/RecipeButton';

const GardenPlantPage =  ({ params }: { params: { id: string } }) => {
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

            setCommonName(plantDetails.common_name);
            setImg(plantDetails.default_image.original_url)
            setFruits(plantDetails.fruits)
            setEL(plantDetails.edible_leaf)

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
              plantName: commonName
            });
            const recipeDetails: RecipeDetails = response2.data;
            setRecipeDetails(recipeDetails);
            //console.log(response2.data);

          } catch (error) {
            console.error('Error fetching recipe:', error);
          }
        };
    
        fetchRecipe();
      }, [commonName]);

    return (
        <>
            {/* <div className="flex flex-col items-center justify-center p-8">
                <Image src={img} alt="alt" height={500} width={500} />
                <RecipeButton href='/garden/recipes'/>
            </div> */}

            <div className="flex flex-col mt-8 p-2">
                <div className="border rounded-xl">
                  <div className="text-center py-32">
                    <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">{plantDetails?.common_name}</h2>
                    <p className=" italic mt-6 text-lg leading-8 text-gray-800">{plantDetails?.scientific_name}</p>
                    {/* <RecipeButton href='/garden/recipes'/> */}
                  </div>
                </div>


                <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
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
                  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                      <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                          <p className="text-base font-semibold leading-7 text-indigo-600">{plantDetails?.common_name}</p>
                          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Plant Details</h1>
                          <p className="mt-6 text-xl leading-8 text-gray-700">{plantDetails?.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                      <Image src={img} alt="alt" height={500} width={500} />
                    </div>
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                      <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                          {/* <p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.</p> */}
                          <ul role="list" className="mt-8 space-y-8 text-gray-600">
                            <li className="flex gap-x-3">
                              <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clip-rule="evenodd" />
                              </svg>
                              <span><strong className="font-semibold text-gray-900">Growth Rate</strong> {plantDetails?.growth_rate}</span>
                            </li>
                            <li className="flex gap-x-3">
                              <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                              </svg>
                              <span><strong className="font-semibold text-gray-900">Cycle</strong> {plantDetails?.cycle}</span>
                            </li>
                            <li className="flex gap-x-3">
                              <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
                              </svg>
                              <span><strong className="font-semibold text-gray-900">Watering</strong> {plantDetails?.watering}</span>
                            </li>
                            <li className="flex gap-x-3">
                              <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
                              </svg>
                              <span><strong className="font-semibold text-gray-900">Fruits</strong> {plantDetails?.fruits?'True':"False"}</span>
                            </li>
                            <li className="flex gap-x-3">
                              <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
                              </svg>
                              <span><strong className="font-semibold text-gray-900">Edible Leaf</strong> {plantDetails?.edible_leaf?'True':"False"}</span>
                            </li>
                            <li className="flex gap-x-3">
                              <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
                              </svg>
                              <span className="inline"><strong className=" inline font-semibold text-gray-900">Recipes</strong>
                                {recipeDetails && recipeDetails.hits.length > 0 
                                ? <p className='inline'> {recipeDetails.hits[1].recipe.label}</p> : <p className='inline'> There are no recipes for this plant.</p>}
                              </span>
                            </li>
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

                <div className="px-6 lg:px-8 border rounded-xl">
                  <div className="text-center py-32">
                    <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">Plant Care Guide</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-800">Tips on caring for your new plant.</p>
                  </div>
                </div>

                <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
                  {sectionData.map((item) => (
                  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10" key={item.id}>
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                      <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                          <p className="text-base font-semibold leading-7 text-indigo-600">Plant Care</p>
                          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{item.type}</h1>
                          <p className="mt-6 text-xl leading-8 text-gray-700">{item? item.description: <p>Coming Soon!</p>}</p>
                        </div>
                      </div>
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                      <Image className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src={`/images/${item.type}.jpeg`} alt="Watering" width={1920} height={1080} />
                    </div>
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    </div>
                  </div>
                  ))}
                </div>
                
            </div>
        </>
    )
};

export default GardenPlantPage;