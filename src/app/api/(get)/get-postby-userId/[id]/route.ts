// src/app/api/(get)/get-postby-userId/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import UserPost from "@/models/UserPost";
import connectDB from "@/utils/db";


export async function GET(request: NextRequest, { params }: {params: {id: string}}) {
  await connectDB();
  try {
    const { id } = params;

    const posts = await UserPost.find({ createdBy: id }).populate("createdBy");

    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found for this user", success: false, posts },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Posts found",
      success: true,
      posts,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch posts";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
