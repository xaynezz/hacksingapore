import React from "react";

const BottomLead = ({
    actionText,
    description,
    mainActionText,
    extraActionText,
}: any) => {
    return (
        <div className="lg:bg-action flex h-screen flex-col justify-center bg-green-600 lg:h-full lg:bg-cover lg:pb-14 lg:pt-24">
            <p className="p-5 text-center text-5xl font-bold leading-normal text-white lg:pt-10 lg:text-4xl">
                {actionText}
            </p>
            <p className="pl-12 pr-12 text-center text-xl leading-8 text-gray-50 lg:font-medium ">
                {description}
            </p>
            <div className="flex h-48 w-full flex-col flex-wrap items-center justify-center lg:flex-row lg:pt-1">
                <a
                    href="/login"
                    className="rounded-xl bg-secondarydark-500 pb-3 pl-8 pr-8 pt-3 text-center text-2xl font-semibold text-white shadow-2xl ring-2 ring-secondarydark-600 transition-all hover:bg-secondarydark-600 focus:outline-none active:bg-secondarydark-500 lg:mt-0 "
                >
                    {mainActionText}
                </a>
            </div>
        </div>
    );
};

export default BottomLead;
