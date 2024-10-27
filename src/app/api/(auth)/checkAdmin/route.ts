import { checkAdmin } from "@/utils/checkAdmin";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const result = await checkAdmin();

    // Make sure we're returning the status in the response
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
