import Diamond from "@/models/Diamond";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  await connectDB();

  try {
    const diamonds = await Diamond.find();
    if (diamonds.length === 0) {
      return NextResponse.json(
        { message: "No diamonds stock found", data: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Diamonds retrieved successfully", success: true, diamonds },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    console.error("Failed to retrieve diamonds:", errorMessage);
    return NextResponse.json(
      { message: "Failed to retrieve diamonds", error: errorMessage },
      { status: 500 }
    );
  }
}
