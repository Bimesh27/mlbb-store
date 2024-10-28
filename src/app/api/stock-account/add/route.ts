import MLAccount from "@/models/MLAccount";
import { checkAdmin } from "@/utils/checkAdmin";
import cloudinary from "@/utils/cloudinary";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();

  const isAdmin = await checkAdmin();
  if (isAdmin.status !== 200) {
    return new Response(isAdmin.message, { status: isAdmin.status });
  }

  try {
    const { price, description, images } = await request.json();
    if (!price || !description || !images || images.length === 0) {
      return NextResponse.json(
        { message: "Please provide all fields", success: false },
        { status: 400 }
      );
    }

    if (images.length > 4) {
      return NextResponse.json(
        {
          message: "You can only upload a maximum of 4 images",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const imageUrls = [];
    for (const image of images) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "ml_stock_accounts",
      });
      imageUrls.push(uploadedImage.secure_url);
    }

    const newAccount = new MLAccount({
      price,
      description,
      images: imageUrls,
    });

    await newAccount.save();

    return NextResponse.json(
      {
        message: "Account added successfully",
        success: true,
        data: newAccount,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error when adding account";
    return NextResponse.json(
      {
        message: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}
