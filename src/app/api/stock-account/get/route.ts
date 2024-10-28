import MLAccount from "@/models/MLAccount";
import { authenticateUser } from "@/utils/authenticateUser";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectDB();
  try {
    const stockAccounts = await MLAccount.find();
    if (!stockAccounts || stockAccounts.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No stock accounts found",
      });
    }
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Stock accounts found",
      stockAccounts: stockAccounts,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({
      status: 500,
      message: errorMessage,
    });
  }
}
