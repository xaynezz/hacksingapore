"use client";

import React from "react";
import Link from "next/link";
import { supabase } from "@/config/dbConnect";
import { usePathname, useRouter } from "next/navigation";

function Footer() {
    const router = useRouter();
    const pathname = usePathname();
    console.log(pathname);

    const logoutHandle = async () => {
        console.log("Logout clciked!");
        const { error } = await supabase.auth.signOut();
        if (!error) {
            console.log("Logout successfully!");
            router.push("/");
        } else {
            console.log(error);
        }
    };
    return (
        <ul className="flex h-14 w-full items-center justify-evenly bg-primary-400 text-white">
            <Link
                href="/user/garden"
                className={
                    "flex h-full w-1/5 flex-col items-center justify-between p-1" +
                    (pathname.includes("/user/garden") ? " bg-primary-300" : "")
                }
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Garden</h1>
            </Link>
            <Link
                href="/user/discover"
                className={
                    "flex h-full w-1/5 flex-col items-center justify-between p-1" +
                    (pathname.includes("/user/discover")
                        ? " bg-primary-300"
                        : "")
                }
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Discover</h1>
            </Link>
            <Link
                href="/user/leaderboard"
                className={
                    "flex h-full w-1/5 flex-col items-center justify-between p-1" +
                    (pathname === "/user/leaderboard" ? " bg-primary-300" : "")
                }
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Leaderboard</h1>
            </Link>
            <Link
                href="/user/chatbot"
                className={
                    "flex h-full w-1/5 flex-col items-center justify-between p-1" +
                    (pathname === "/user/chatbot" ? " bg-primary-300" : "")
                }
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Chatbot</h1>
            </Link>
            <button
                onClick={logoutHandle}
                className="flex h-full w-1/5 flex-col items-center justify-between p-1"
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Logout</h1>
            </button>
        </ul>
    );
}

export default Footer;
