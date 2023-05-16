'use client';

import axios from 'axios';
const samplePlant = require('./samplePlant.jpg')
import { GetServerSideProps, GetServerSidePropsContext } from 'next';


const GardenPlantPage = (plantDetails:PlantDetails) => {

    console.log('Plant Details from Perenual is ' + plantDetails.description);

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8">
                <img src='./samplePlant.jpg' alt="Image" />
            </div>

            <div className="flex flex-col mt-8 p-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">Plant Name:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">Bo Hua</div>                    
                </div>
                <div className="flex flex-row items-center justify-between text-xl font-bold">
                    <div className="mr-5 px-2 text-xl font-bold">Duration:</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">Bryan</div>                    
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="mr-5 px-2 text-xl font-bold">{plantDetails.description}</div>
                    <div className="text-gray-800 font-bold mx-10 flex-1 text-center">John Doe</div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const id = context.params?.id as string;
    console.log('retrieved id',id)
    if (!id) {
      return {
        notFound: true,
      };
    }
  
    const response = await axios.post('/api/plant/details', {
      idOfPlant: id,
    });
  
    const plantDetails: PlantDetails = response.data;
  
    return { props: { plantDetails } };
  };
  

export default GardenPlantPage
