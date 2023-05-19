"use client"
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AiFillCamera } from 'react-icons/ai';


export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        
            <main className="flex min-h-screen flex-col items-center justify-between">
                <Header title={"Garden"} icon={<AiFillCamera />} />
                <div className="h-[calc(100vh-6.5rem)] w-full overflow-auto">
                    {children}
                </div>
                <Footer />
            </main>
    );
}
