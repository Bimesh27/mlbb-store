import Diamond from "@/models/Diamond";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request): Promise<NextResponse> {
  await connectDB();
  try {
    const {searchParams} = new URL(request.url);
    const diamondId = searchParams.get("id");

    if (!diamondId) {
      return NextResponse.json(
        { message: "Diamond ID is required" },
        { status: 400 }
      );
    }

    const deletedDiamond = await Diamond.findByIdAndDelete(diamondId);

    if (!deletedDiamond) {
      return NextResponse.json(
        { message: "Diamond stock not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Diamond deleted successfully", data: deletedDiamond },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    console.error("Failed to delete diamond:", errorMessage);
    return NextResponse.json(
      { message: "Failed to delete diamond", error: errorMessage },
      { status: 500 }
    );
  }
}
