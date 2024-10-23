import User from "@/models/User";
import { LoginRequestBody } from "@/types/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "@/utils/token";

export async function POST(request: Request) {
  connectDB();

  const { email, password }: LoginRequestBody = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Email and Password are required",
        success: false,
      },
      { status: 404 }
    );
  }

  if (password.length < 6 || password.length > 20) {
    return NextResponse.json(
      {
        message: "Password must be between 6-20 character long",
        success: false,
      },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          message: "Invalid credentials.",
          success: false,
        },
        { status: 401 }
      );
    }

    const tokenPayload = {
      id: user._id,
      username: user.email,
    };

    generateTokenAndSetCookie(tokenPayload);

    return NextResponse.json(
      {
        message: "Login Successful",
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Server error.";

    return NextResponse.json(
      {
        message: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}
