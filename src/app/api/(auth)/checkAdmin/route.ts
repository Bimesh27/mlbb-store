import { NextResponse } from "next/server";
import { checkAdmin } from "@/utils/checkAdmin";

export async function GET() {
  try {
    const result = await checkAdmin();

    if (result.status !== 200) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({ message: "Admin verified" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
