"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-svh flex flex-col items-center justify-between">
            <Header />
            <div className="max-h-[calc(100svh-6.5rem)] w-full overflow-auto">
                {children}
            </div>
            <Footer />
        </main>
    );
}
