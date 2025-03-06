import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get("next-auth.session-token");
  const isPublicPath = [
    "/",
    "/signin",
    "/signup",
    "/password/forget",
  ].includes(path);
  const isProtectedPath = ["/dashboard", "/profile", "/edit","/password/change",
  ].includes(path);

  if (authToken && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!authToken && isProtectedPath) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/dashboard", "/signin", "/signup", "/profile", "/edit","/password/change","/password/forget"],
};