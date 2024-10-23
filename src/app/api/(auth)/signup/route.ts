import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignupRequestBody } from "@/types/User";
import { generateTokenAndSetCookie } from "@/utils/token";

export async function POST(request: Request) {
  const pictures = [
    "https://i.pinimg.com/564x/6e/cc/0b/6ecc0b98cb00db741ce2316fe40f78fc.jpg",
    "https://i.pinimg.com/564x/b7/d9/d6/b7d9d6cce20fd726dc8a6e2fbddbffb5.jpg",
    "https://i.pinimg.com/564x/11/e8/fd/11e8fd42de7a3f8b91c868b024b19c4d.jpg",
    "https://i.pinimg.com/564x/ac/19/30/ac19304890f098c266c830cc16e49745.jpg",
    "https://i.pinimg.com/564x/0a/ad/5b/0aad5b39e58688d59267569833cba98e.jpg",
    "https://i.pinimg.com/564x/9c/0b/67/9c0b67f8712e15ea4b01484e4830c6f9.jpg",
    "https://i.pinimg.com/564x/30/b4/78/30b4786b5a0eab31490d57cdf8f23655.jpg",
    "https://i.pinimg.com/564x/83/dd/27/83dd27fc821e0df1ec06c3ff4e39a318.jpg",
    "https://i.pinimg.com/564x/b4/91/fb/b491fbdce9f52c9a72a6380c829ef2db.jpg",
  ];

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

    const randomProfile = Math.floor(Math.random() * pictures.length);
    const profilePicture = pictures[randomProfile];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture,
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
          profilePicture: newUser.profilePicture,
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
