import MLAccount from "@/models/MLAccount";
import { checkAdmin } from "@/utils/checkAdmin";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  await connectDB();

  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { message: "Unauthorized to edit stock account" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("id is required", { status: 400 });
    }

    const { price, description } = await request.json();
    if (!price && !description) {
      return NextResponse.json(
        {
          message:
            "At least one field (price or description) is required for update",
        },
        { status: 400 }
      );
    }

    const stockAccount = await MLAccount.findById(id);
    if (!stockAccount) {
      return NextResponse.json(
        { message: "Stock account not found" },
        { status: 404 }
      );
    }

    if (price) stockAccount.price = price;
    if (description) stockAccount.description = description;

    await stockAccount.save();

    return NextResponse.json(
      {
        message: "Stock account updated successfully",
        stockAccount: stockAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({
      status: 500,
      message: errorMessage,
    });
  }
}
