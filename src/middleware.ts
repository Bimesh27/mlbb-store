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
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protect admin route - check for token and admin role
  if (pathname === "/admin-panel") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const response = await fetch(`${request.nextUrl.origin}/api/checkAdmin`, {
        cache: "no-store",
        headers: {
          Cookie: `token=${token}`,
        },
      });

      const data = await response.json();

      // Debug log
      console.log("Admin check response:", data);

      // If status is 200, allow access
      if (data.status === 200) {
        return NextResponse.next();
      }

      // For any other status, redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("Error during admin check:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/upload", "/admin-panel"],
};
