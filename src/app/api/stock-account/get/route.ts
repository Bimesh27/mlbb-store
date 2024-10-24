import MlAccount from "@/models/MlAccount";
import { authenticateUser } from "@/utils/authenticateUser";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectDB();

  const { user, error } = await authenticateUser();
  if (!user) {
    return NextResponse.json({ message: error }, { status: 401 });
  }
  try {
    const stockAccounts = await MlAccount.find();
    if (!stockAccounts || stockAccounts.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No stock accounts found",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Stock accounts found",
      data: stockAccounts,
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
