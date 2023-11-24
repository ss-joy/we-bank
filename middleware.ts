/**
 * helpful links:
 * https://github.com/vercel/next.js/discussions/47933
 */
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.method === "OPTIONS") {
    console.log("got options");
    const response = new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
      },
      status: 204,
    });
    return response;
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/api/:path*",
};
