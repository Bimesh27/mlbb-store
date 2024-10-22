import { authenticateUser } from "@/utils/authenticateUser";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const { user, message, error } = await authenticateUser();

  if (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json(
      { message: message || "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "User found", data: user },
    { status: 200 }
  );
}
