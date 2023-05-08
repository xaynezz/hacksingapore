import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const { email, password } = credentials;
                // Connect to DB to find and return user here

                return null;
            },
        }),
    ],
    secret: process.env.NEXT_AUTH_SECRET,
});

export { handler as GET, handler as POST };
