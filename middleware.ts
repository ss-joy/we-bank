/**
 * helpful links:
 * https://github.com/vercel/next.js/discussions/47933
 */

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  //handle cors for preflight requests
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, {
      status: 204,
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Content-Type", "application/json");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT"
    );

    return response;
  }
  //handle cors for all requests
  const responseHeaders = new Headers();
  responseHeaders.append("Access-Control-Allow-Origin", "*");
  responseHeaders.append("Content-Type", "application/json");
  responseHeaders.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  responseHeaders.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  return NextResponse.next({
    headers: responseHeaders,
  });
}
export const config = {
  matcher: "/api/:path*",
};
