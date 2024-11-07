import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import UserPost from "@/models/UserPost";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  await connectDB();
  try {
    const { id } = params;

    const posts = await UserPost.find({ userId: id });

    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found for this user", success: false },
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
