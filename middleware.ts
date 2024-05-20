import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const url = request.nextUrl;
  if (
    (token && url.pathname.includes("/login")) ||
    (token && url.pathname.includes("/register")) ||
    (token && url.pathname.includes("/verify")) ||
    (token && url.pathname.includes("/resetPass"))
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  return NextResponse.next();
}
export { default } from "next-auth/middleware";
