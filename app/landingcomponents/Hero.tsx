import React from "react";
import Image from "next/image";
const Hero = ({
    appType,
    tagLine,
    description,
    mainActionText,
    extraActionText,
}: any) => {
    return (
        <div id="product">
            <div
                style={{ textShadow: "0px 1px 1px gray" }}
                className="min-h-50 lg:bg-hero flex h-screen flex-col items-center justify-center bg-green-600 font-sans lg:bg-cover lg:pb-20 lg:pt-10"
            >
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
                    <p className=" text-center text-4xl font-bold text-gray-50 lg:mx-auto lg:w-4/6 lg:text-5xl lg:text-gray-100">
                        {tagLine}
                    </p>
                </div>
                <div>
                    <p className="p-2 pt-6 text-center font-sans text-xl leading-10 text-gray-50 ">
                        {description}
                    </p>
                </div>
                <div className="lg:w-90 relative z-50 flex h-48 flex-col items-center justify-between pt-7 lg:flex-row lg:justify-between lg:space-x-8 lg:pt-0">
                    <a
                        href="/login"
                        className="rounded-xl bg-secondarydark-500 pb-3 pl-12 pr-12 pt-3 text-center text-2xl font-semibold text-white shadow-2xl ring-4 ring-secondarydark-600 transition-all hover:bg-secondarydark-600 focus:outline-none active:bg-secondarydark-600 lg:ml-5 lg:font-medium lg:ring-2 "
                    >
                        {mainActionText}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Hero;
