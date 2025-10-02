import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // expects cookie-based auth
  const protectedRoutes = ["/dashboard", "/settings"];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Allow the auth page with mode=sign-in
  if (
    req.nextUrl.pathname === "/auth" &&
    req.nextUrl.searchParams.get("mode") === "sign-in"
  ) {
    return NextResponse.next();
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

