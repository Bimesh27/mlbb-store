import UserPost from "@/models/UserPost";
import { authencateUser } from "@/utils/checkAuth";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  await connectDB();
  const { user, error } = await authencateUser();
  if (!user) {
    return NextResponse.json({ message: error }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("id is required", { status: 400 });
    }

    const { title, description } = await request.json();
    if (!title && !description) {
      return NextResponse.json(
        {
          message:
            "At least one field (title or description) is required for update",
        },
        { status: 400 }
      );
    }

    const post = await UserPost.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.createdBy.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "Unauthorized to edit this post" },
        { status: 403 }
      );
    }

    if (title) post.title = title;
    if (description) post.description = description;

    await post.save();

    return NextResponse.json(
      {
        message: "Post updated successfully",
        post: post,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
