import { NextResponse } from "next/server";
import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export async function POST(request) {
    dbConnect();

    const { email, password } = await request.json();
    const user = await User.create({ email, password });

    return NextResponse.json(user);
}
