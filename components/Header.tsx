import AddPlant from "@/app/user/garden/components/model/AddPlant";
import React, { useState } from "react";
import { useGardenContext } from "@/app/context/gardenContext";
import { usePathname } from "next/navigation";

const map = [
    ["/user/garden", "Garden"],
    ["/user/discover", "Discover"],
    ["/user/leaderboard", "Leaderboard"],
    ["/user/chatbot", "Chatbot"],
];
function Header() {
    let titletoDisplay = null;
    const pathname = usePathname();

    map.forEach((item) => {
        if (pathname.includes(item[0])) {
            titletoDisplay = item[1];
        }
    });

    return (
        <>
            <div className="flex h-12 w-full items-center justify-center bg-primary-400">
                <h1 className="text-2xl font-semibold text-white">
                    {titletoDisplay}
                </h1>
            </div>
        </>
    );
}

export default Header;
