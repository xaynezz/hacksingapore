"use client";
import axios from "axios";

export default function Home() {
    async function handleRegister(e: any) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const { data } = await axios.post("/api/register", {
                email,
                password,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <form id="register-form" onSubmit={handleRegister}>
                <input type="email" name="email" id="email" />
                <input type="password" name="password" id="password" />
                <input type="password" name="cfmpassword" id="cfmpassword" />
            </form>
            <button type="submit" form="register-form">
                Register
            </button>
            <form id="login-form">
                <input type="email" name="email" id="email" />
                <input type="password" name="password" id="password" />
            </form>
            <button className="flex" type="submit" form="login-form">
                Login
            </button>
        </main>
    );
}
