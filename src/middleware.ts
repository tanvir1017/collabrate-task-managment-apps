import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log("hello", request);
  // const checkAuth = localStorage.getItem("auth");
  // if (request.nextUrl.pathname.startsWith("/auth")) {
  //   if (checkAuth) {
  //     return NextResponse.rewrite(new URL("/", request.url));
  //   }
  // }
  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
