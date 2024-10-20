import UserPost from "@/models/UserPost";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectDB();

  try {
    const usersPosts = await UserPost.find().populate("createdBy");

    return NextResponse.json(usersPosts, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    // Return error response
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
