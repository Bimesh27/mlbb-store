import connectDB from "@/utils/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { jwtPayload } from "@/types/User";
import User from "@/models/User";
import { NextResponse } from "next/server";
import UserPost from "@/models/UserPost";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request): Promise<NextResponse> {
  await connectDB();

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized: token missing",
      },
      { status: 401 }
    );
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwtPayload;
    if (!decodedToken) {
      return NextResponse.json(
        {
          message: "Unauthorized: invalid token",
        },
        { status: 401 }
      );
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized: user not found",
        },
        { status: 401 }
      );
    }

    const { title, description,image } = await request.json();
    
    if (!title || !description || !image) {
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
      title,
      image : imageUrl,
      description,
      user: user._id,
    });

    await newUserPost.save();

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newUserPost,
      },
      { status: 201 }
    );

  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message +"upload post" : "Unknown error when uploading post";
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
