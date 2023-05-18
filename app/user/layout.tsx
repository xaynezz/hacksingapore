"use client"
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AiFillCamera } from 'react-icons/ai';
import { GardenContextProvider } from "../context/gardenContext";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GardenContextProvider>
            <main className="flex min-h-screen flex-col items-center justify-between">
                <Header title={"Garden"} icon={<AiFillCamera />} />
                <div className="h-[calc(100vh-6.5rem)] w-full overflow-auto">
                    {children}
                </div>
                <Footer />
            </main>
        </GardenContextProvider>
    );
}
