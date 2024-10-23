import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { jwtPayload } from "@/types/User";
import User from "@/models/User";

export async function authenticateUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  
  if (!token) {
    return { user: null, message: "Unauthorized: token missing" };
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwtPayload;
    if (!decodedToken) {
      return { user: null, message: "Unauthorized: invalid token" };
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return { user: null, message: "Unauthorized: user not found" };
    }

    return { user };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { user: null, error: `Authentication failed: ${errorMessage}` };
  }
}
