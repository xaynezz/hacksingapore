import "./globals.css";
import { Inter } from "next/font/google";
import { GardenContextProvider } from "./context/gardenContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <GardenContextProvider>{children}</GardenContextProvider>
            </body>
        </html>
    );
}
