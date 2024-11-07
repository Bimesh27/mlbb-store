import UserPost from "@/models/UserPost";
import connectDB from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const { id } = params;

    const posts = await UserPost.find({ createdBy: id }).populate("createdBy");

    if (posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Posts found", success: true, posts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error); // Log the error for debugging

    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
