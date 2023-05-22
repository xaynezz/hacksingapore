"use client";

import Link from "next/link";
import { supabase } from "@/config/dbConnect";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
    const router = useRouter();
    async function handleLogin(e: any) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (!error) {
            router.push("/user/garden");
        } else {
            alert(error);
        }
    }
    return (
        <main className="flex h-full w-full flex-col items-center justify-center bg-green-500">
            <Image
                className="mb-10 w-72 text-3xl font-bold text-white"
                src="/ediplants.png"
                width={1000}
                height={1000}
                alt="logo"
            ></Image>
            <form
                id="login-form"
                onSubmit={handleLogin}
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
                    className="mt-5 h-8 w-64 rounded-xl bg-secondarydark-500 font-semibold text-white active:bg-secondarydark-400"
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
