import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignupRequestBody } from "@/types/User";
import { generateTokenAndSetCookie } from "@/utils/token";

export async function POST(request: Request) {
  await connectDB();

  const { username, email, password }: SignupRequestBody = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      {
        message: "All fields are required",
        success: false,
      },
      { status: 400 }
    );
  }

  if (username.length < 3 || username.length > 16) {
    return NextResponse.json(
      {
        message: "Username must be between 3 to 16 character long",
        success: false,
      },
      { status: 400 }
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
          success: false,
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const tokenPayload = {
      id: newUser._id,
      username: newUser.username,
    };

    generateTokenAndSetCookie(tokenPayload);

    return NextResponse.json(
      {
        message: "User registered Successfully",
        success: true,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
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
