import Diamond from "@/models/Diamond";
import connectDB from "@/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { jwtPayload } from "@/types/User";
import { checkAdmin } from "@/utils/checkAdmin";

export async function POST(request: Request): Promise<NextResponse> {
  await connectDB();

  const isAdmin = await checkAdmin();
  if (isAdmin.status !== 200) {
    return NextResponse.json(
      { message: isAdmin.message },
      { status: isAdmin.status }
    );
  }

  const { amount, price, bonus } = await request.json();
  if (!amount || !price) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const newDiamond = new Diamond({
      amount,
      price,
      bonus,
    });

    await newDiamond.save();

    return NextResponse.json(
      { message: "Diamond entry added Successfully", data: newDiamond },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json(
      { message: "Failed to add diamond entry", error: errorMessage },
      { status: 500 }
    );
  }
}
