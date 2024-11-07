// app/api/users/[id]/route.ts
import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const { id } = params;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User found",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "User not found";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
