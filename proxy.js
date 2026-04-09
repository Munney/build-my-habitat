import { NextResponse } from "next/server";

const CANONICAL_HOST = "www.buildmyhabitat.com";

export function proxy(request) {
  const host = request.headers.get("host") || "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto || request.nextUrl.protocol.replace(":", "");

  // Keep local development behavior unchanged.
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return NextResponse.next();
  }

  if (host !== CANONICAL_HOST || protocol !== "https") {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
