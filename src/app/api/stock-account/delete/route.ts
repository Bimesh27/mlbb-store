import MlAccount from "@/models/MlAccount";
import { checkAdmin } from "@/utils/checkAdmin";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export async function DELETE(request: Request) {
  await connectDB();

  const isAdmin = await checkAdmin();
  if (isAdmin.status !== 200) {
    return isAdmin;
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response("Please provide an ID", { status: 400 });
    }

    const account = await MlAccount.findById(id);
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }

    // Delete associated Cloudinary images
    if (account.images && account.images.length > 0) {
      for (const imageUrl of account.images) {
        try {
          const publicId = "ml_stock_accounts/"+imageUrl.split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (error) {
          console.error(`Error deleting Cloudinary image: ${imageUrl}`, error);
        }
      }
    }

    // Delete the account from the database
    await MlAccount.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Account deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error when deleting account";
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
