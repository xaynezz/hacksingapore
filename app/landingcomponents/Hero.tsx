import React from "react";
import Image from "next/image";
const Hero = ({appType, tagLine, description, mainActionText, extraActionText}: any) => {
  return (
    <div id="product">
      <div style={{textShadow:'0px 1px 1px gray'}} className="flex flex-col items-center justify-start font-sans min-h-50 bg-gray-50 lg:pt-10 lg:pb-20 lg:bg-hero lg:bg-cover">
        <div>


          <p className="p-3 pt-12 text-lg font-bold text-gray-500 lg:text-gray-300">
          <Image
                className="mb-10 w-72 text-3xl font-bold text-white"
                src="/ediplants.png"
                width={1000}
                height={1000}
                alt="logo"
            ></Image>
          </p>
        </div>
        <div>

          <p className=" text-4xl font-bold text-center text-green-600 lg:mx-auto lg:w-4/6 lg:text-5xl lg:text-gray-100">
            {tagLine}
          </p>
        </div>
        <div>
          <p className="p-2 pt-6 font-sans text-xl leading-10 text-center text-gray-500 lg:text-gray-200">
            {description}
          </p>
        </div>
        <div className="relative z-50 flex flex-col items-center justify-between h-48 lg:space-x-8 pt-7 lg:pt-0 lg:flex-row lg:justify-between lg:w-90">
          <button
            className="pt-3 pb-3 pl-12 pr-12 text-2xl font-semibold text-center text-white transition-all bg-orange-600 rounded-full shadow-2xl lg:ml-5 hover:bg-orange-700 focus:outline-none ring-4 ring-orange-600 lg:ring-2 lg:font-medium "
          >
            {mainActionText}
          </button>
        </div>
        
      </div>
      
    </div>
  );
};

export default Hero;