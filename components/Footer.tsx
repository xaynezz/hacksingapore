import React from "react";
import Link from "next/link";

function Footer() {
    return (
        <ul className="flex h-14 w-full items-center justify-evenly bg-primary-400 text-white">
            <Link
                href="/user/garden"
                className="flex h-full w-1/5 flex-col items-center justify-between p-1"
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Garden</h1>
            </Link>
            <Link
                href="/user/discover"
                className="flex h-full w-1/5 flex-col items-center justify-between p-1"
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Discover</h1>
            </Link>
            <Link
                href="/user/leaderboard"
                className="flex h-full w-1/5 flex-col items-center justify-between p-1"
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Leaderboard</h1>
            </Link>
            <Link
                href="/user/chatbot"
                className="flex h-full w-1/5 flex-col items-center justify-between p-1"
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Chatbot</h1>
            </Link>
            <Link
                href="/"
                className="flex h-full w-1/5 flex-col items-center justify-between p-1"
            >
                <div className="h-10 w-10 bg-white"></div>
                <h1 className="text-xs">Placeholder</h1>
            </Link>
        </ul>
    );
}

export default Footer;
