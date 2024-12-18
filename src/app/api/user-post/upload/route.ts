import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import UserPost from "@/models/UserPost";
import cloudinary from "@/utils/cloudinary";
import { authenticateUser } from "@/utils/authenticateUser";

export async function POST(request: Request): Promise<NextResponse> {
  await connectDB();

  const { user, error } = await authenticateUser();
  if (!user) {
    return NextResponse.json({ message: error }, { status: 401 });
  }

  try {
    const { description, image } = await request.json();

    if (!description || !image) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const uploadedImage = await cloudinary.uploader.upload(image);
    const imageUrl = uploadedImage.secure_url;

    const newUserPost = new UserPost({
      image: imageUrl,
      description,
      createdBy: user._id,
    });

    await newUserPost.save();

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newUserPost,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message + "upload post"
        : "Unknown error when uploading post";
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
