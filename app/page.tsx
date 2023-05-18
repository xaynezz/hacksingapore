"use client";
import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex h-full w-full flex-col items-center justify-center bg-green-500">
            <h1 className="mb-10 text-3xl font-bold text-white">GardenApp</h1>
            <form
                id="login-form"
                className="flex flex-col items-center justify-center gap-5"
            >
                <div className="flex flex-col">
                    <h1 className="font-semibold text-white">Email</h1>
                    <input
                        className="h-8 w-64 px-1"
                        type="email"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-white">Password</h1>
                    <input
                        className="h-8 w-64 px-1"
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <button
                    className="mt-5 h-8 w-64 rounded-xl bg-secondarydark-500 font-semibold text-white"
                    type="submit"
                    form="login-form"
                >
                    Login
                </button>
                <div className="flex items-center justify-center gap-1">
                    <p className="text-white">New user?</p>
                    <Link
                        href="/register"
                        className="font-semibold text-secondarydark-400"
                    >
                        Register here
                    </Link>
                </div>
            </form>
        </main>
    );
}
