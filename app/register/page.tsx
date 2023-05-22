"use client";

import Link from "next/link";
import { supabase } from "@/config/dbConnect";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

        const { error, data } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        // If there is no error //
        if (!error) {
            const { error } = await supabase.from("user").insert([
                {
                    uuid: data.user?.id,
                    first_name: firstName,
                    last_name: lastName,
                },
            ]);
            // If we can add user to the database //
            if (!error) {
                router.push("/firsttime");
            } else {
                alert(error.message);
            }
        } else {
            alert(error.message);
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
                    className="mt-5 h-8 w-64 rounded-xl bg-secondarydark-500 font-semibold text-white active:bg-secondarydark-400"
                    type="submit"
                    form="register-form"
                >
                    Register
                </button>
                <div className="flex items-center justify-center gap-1 ">
                    <p className="text-white">Already have an account?</p>
                    <Link
                        href="/login"
                        className="font-semibold text-secondarydark-400 "
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </main>
    );
}
