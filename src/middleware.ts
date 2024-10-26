// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;
  const token: string | undefined = request.cookies.get("token")?.value;

  // Redirect authenticated users from /login to home
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

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
  matcher: ["/login", "/upload", "/admin"],
} as const;
