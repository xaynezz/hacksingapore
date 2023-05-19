import React from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

const map = {
    "/user/garden/recipes": "/user/garden",
    "/user/chatbot": "/user/garden",
    "/user/discover/": "/user/discover",
};

function BackButton(props: { route: string }) {
    const { route } = props;
    return (
        <Link
            className="fixed left-0 top-0 flex h-12 w-12 items-center justify-center"
            href={route}
        >
            <IoMdArrowRoundBack className="h-9 w-9 text-white" />
        </Link>
    );
}

export default BackButton;
