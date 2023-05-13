"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <SessionProvider>
                <body className={inter.className}>{children}</body>
            </SessionProvider>
        </html>
    );
}
