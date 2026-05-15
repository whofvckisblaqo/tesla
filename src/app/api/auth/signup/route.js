import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await createUser({ name, email, password });

    return NextResponse.json(
      { message: "Account created successfully", user },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "Signup failed" },
      { status: 400 }
    );
  }
}