import UserPost from "@/models/UserPost";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  // Ensure database connection
  await connectDB();
  try {
    const { id } = params;
    // Fetch posts created by the user and populate the createdBy field
    const posts = await UserPost.find({ createdBy: id }).populate("createdBy");

    if (posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Posts found",
        success: true,
        posts,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Posts not found";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
