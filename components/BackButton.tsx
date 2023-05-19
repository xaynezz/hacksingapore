import React from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";



function BackButton(props: { route: string }) {
    const { route } = props;
    return (
        <Link className="absolute left-0 h-12 w-12 flex items-center justify-center" href={route}>
            <IoMdArrowRoundBack className="h-9 w-9 text-white" />
        </Link>
    );
}

export default BackButton;
