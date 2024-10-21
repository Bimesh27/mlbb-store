import cloudinary from "@/utils/cloudinary";
import UserPost from "@/models/UserPost";
import { authencateUser } from "@/utils/checkAuth";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
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

    const post = await UserPost.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.createdBy.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "You are not authorized to delete this post" },
        { status: 403 }
      );
    }

    const publicId = post.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    await UserPost.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
