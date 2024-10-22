import jwt from "jsonwebtoken";
import User from "@/models/User";
import { cookies } from "next/headers";
import { jwtPayload } from "@/types/User";

export async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { status: 401, message: "Unauthorized: token missing" };
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwtPayload;

    if (!decodedToken) {
      return { status: 401, message: "Unauthorized: invalid token" };
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return { status: 401, message: "Unauthorized: user not found" };
    }

    if (user.role !== "admin") {
      return { status: 403, message: "Forbidden: only admins can access" };
    }

    return { status: 200, user, message: "Admin verified" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return { status: 500, message: errorMessage };
  }
}
