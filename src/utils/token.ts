import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JWTPayload {
  id: string;
  username: string;
}

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
}

const JWT_SECRET = process.env.JWT_SECRET;

export const generateTokenAndSetCookie = async (payload: JWTPayload) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined");
  }

  const cookieStore = await cookies();
  const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: "3d" });

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3 * 24 * 60 * 60,
  };

  cookieStore.set("token", token, {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    maxAge: cookieOptions.maxAge,
  });
};
