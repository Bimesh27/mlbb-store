import Diamond from "@/models/Diamond";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request): Promise<NextResponse> {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const diamondId = searchParams.get("id");

    if (!diamondId) {
      return NextResponse.json(
        { message: "Diamond ID is required" },
        { status: 400 }
      );
    }

    const { amount, price, bonus } = await request.json();
    if (amount === undefined && price === undefined && bonus === undefined) {
      return NextResponse.json(
        { message: "At least one field to update is required" },
        { status: 400 }
      );
    }

    const diamond = await Diamond.findById(diamondId);
    if (!diamond) {
      return NextResponse.json(
        { message: "Diamond stock not found" },
        { status: 404 }
      );
    }

    if (amount !== undefined) {
      diamond.amount = amount;
    }
    if (price !== undefined) {
      diamond.price = price;
    }
    if (bonus !== undefined) {
      diamond.bonus = bonus;
    }

    await diamond.save();

    return NextResponse.json(
      { message: "Diamond updated successfully", data: diamond },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    console.error("Failed to update diamond:", errorMessage);
    return NextResponse.json(
      { message: "Failed to update diamond", error: errorMessage },
      { status: 500 }
    );
  }
}
