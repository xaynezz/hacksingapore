import { BsTreeFill } from 'react-icons/bs';
import axios from 'axios';

const LeaderboardPage = () => {

    // axios.get('/test')
    // .then(response => {
    //     const gardens = response.data;

    //     const sortedGardens = null;
    //     const top6Gardens = null;
    //     const top6Names = null;
    // })

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8">
                
            <div className="flex flex-row items-end justify-center">
                    <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                            image
                        </div>
                        <div className="text-gray-800 font-bold mx-10 text-center text-xs">Jeff</div>
                        <div className="text-gray-500 px-2 text-xs">19 plants</div>
                        <BsTreeFill size={50} style={{ color: 'green' }} />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/5 w-12 h-12 flex items-center justify-center text-white font-bold text-2xl z-10 pointer-events-none">
                        3
                        </div>
                    </div>
                    <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">image</div>
                        <div className="text-gray-800 font-bold mx-10 text-center text-xs">Han</div>
                        <div className="text-gray-500 px-2 text-xs">28 plants</div>
                        <BsTreeFill size={75} style={{ color: 'green' }} />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-12 h-12 flex items-center justify-center text-white font-bold text-2xl z-10 pointer-events-none">
                        2
                        </div>
                    </div>
                    <div className="relative flex flex-col items-center justify-between">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">image</div>
                        <div className="text-gray-800 font-bold mx-10 text-center text-xs">Andrew</div>
                        <div className="text-gray-500 px-2 text-xs">32 plants</div>
                        <BsTreeFill size={100} style={{ color: 'green' }} />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white font-bold text-2xl z-10 pointer-events-none">
                        1
                        </div>
                    </div>
                </div>


                <div className="flex flex-col mt-8 p-2">
                    <div className="row flex flex-row items-center justify-between">
                        <div className="mr-5 px-2">
                            <h1 className="text-3xl font-bold">4</h1>
                        </div>
                        <div className="text-gray-800 font-bold mx-10 flex-1 text-center">Bryan</div>
                        <div className="text-gray-500 px-2">15 plants</div>
                    </div>
                    <div className="row flex flex-row items-center justify-between">
                        <div className="mr-5 px-2">
                            <h1 className="text-3xl font-bold">5</h1>
                        </div>
                        <div className="text-gray-800 font-bold mx-10 flex-1 text-center">Bo Hua</div>
                        <div className="text-gray-500 px-2">6 plants</div>
                    </div>
                    <div className="row flex flex-row items-center justify-between">
                        <div className="mr-5 px-2">
                            <h1 className="text-3xl font-bold">6</h1>
                        </div>
                        <div className="text-gray-800 font-bold mx-10 flex-1 text-center">John Doe</div>
                        <div className="text-gray-500 px-2">4 plants</div>
                    </div>
                </div>

            </div>
        </>
        
    )
}

export default LeaderboardPage
