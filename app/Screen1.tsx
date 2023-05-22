import React from "react";
import { Link } from "react-router-dom";
import Image from "next/image";

const Screen1Component = () => (
    <div
        className="screen"
        style={{
            backgroundImage: "url(/backgroundmainblur.jpg)",
        }}
    >
        <Image
            className="mb-10 w-72 text-3xl font-bold text-white"
            src="/ediplants.png"
            width={1000}
            height={1000}
            alt="logo"
        ></Image>

        <a
            href="/login"
            className="mt-5 flex h-12 w-64 items-center justify-center rounded-xl bg-secondarydark-500 font-semibold text-white active:bg-secondarydark-400"
        >
            Let's get started!
        </a>
    </div>
);

export default Screen1Component;
