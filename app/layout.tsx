"use client";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <SessionProvider>
                    <body className={inter.className}>{children}</body>
                </SessionProvider>
            </MantineProvider>
        </html>
    );
}
