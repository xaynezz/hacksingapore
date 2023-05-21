"use client";
import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex h-full w-full flex-col items-center justify-center bg-green-500">
            <Link href="/login">Go to Login</Link>
        </main>
    );
}
