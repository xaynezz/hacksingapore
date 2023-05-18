"use client";

import Link from "next/link";
import { supabase } from "@/config/supaClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    async function handleRegister(e: any) {
        e.preventDefault();
        const firstName = e.target.firstname.value;
        const lastName = e.target.lastname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const cfmpassword = e.target.cfmpassword.value;
        if (password !== cfmpassword) {
            alert("Passwords do not match");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (!error) {
            const { error } = await supabase.from("user").insert([
                {
                    uuid: data.user?.id,
                    first_name: firstName,
                    last_name: lastName,
                },
            ]);
            if (!error) {
                router.push("/firsttime");
            }
        } else {
            alert(error);
        }
    }

    return (
        <main className="flex h-full w-full flex-col items-center justify-center bg-green-500">
            <h1 className="mb-10 text-3xl font-bold text-white">GardenApp</h1>
            <form
                id="register-form"
                onSubmit={handleRegister}
                className="flex flex-col items-center justify-center gap-5"
            >
                <div className="flex flex-col">
                    <h1 className="font-semibold text-white">First Name</h1>
                    <input
                        className="h-8 w-64 px-1"
                        type="text"
                        name="firstname"
                        id="firstname"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-white">Last Name</h1>
                    <input
                        className="h-8 w-64 px-1"
                        type="text"
                        name="lastname"
                        id="lastname"
                    />
                </div>
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
                <div className="flex flex-col">
                    <h1 className="font-semibold text-white">
                        Confirm Password
                    </h1>
                    <input
                        className="h-8 w-64 px-1"
                        type="password"
                        name="cfmpassword"
                        id="cfmpassword"
                    />
                </div>
                <button
                    className="mt-5 h-8 w-64 rounded-xl bg-secondarydark-500 font-semibold text-white"
                    type="submit"
                    form="register-form"
                >
                    Register
                </button>
                <div className="flex items-center justify-center gap-1 ">
                    <p className="text-white">Already have an account?</p>
                    <Link
                        href="/"
                        className="font-semibold text-secondarydark-400"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </main>
    );
}
