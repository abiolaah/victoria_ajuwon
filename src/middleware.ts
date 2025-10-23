import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  // Get session from BetterAuth
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Redirect to sign-in if accessing admin routes without admin access
  if (isAdminRoute && (!session || !session.user.isAdmin)) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Redirect authenticated admin users away from auth pages
  if (isAuthRoute && session?.user?.isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
