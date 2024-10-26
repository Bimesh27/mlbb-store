// types/auth.ts
export interface AdminCheckResponse {
  status: number;
  message: string;
  user?: {
    _id: string;
    email: string;
    role: string;
    username: string;
  };
}

// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;
  const token: string | undefined = request.cookies.get("token")?.value;

  // Protect upload route - redirect to login if no token
  if (pathname === "/upload" && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Protect admin route - check for token and admin role
  if (pathname === "/admin") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const response = await fetch(
        `${request.nextUrl.origin}/api/auth/checkAdmin`,
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );

      if (!response.ok) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/upload", "/admin"],
} as const;
