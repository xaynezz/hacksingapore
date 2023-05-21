import React from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

function BackButton(props: { route: string }) {
    const { route } = props;
    return (
        <div>
            <Link
                className="fixed left-0 top-0 flex h-12 w-12 items-center justify-center"
                href={route}
            >
                <IoMdArrowRoundBack className="h-9 w-9 text-white" />
            </Link>
        </div>
    );
}

export default BackButton;
