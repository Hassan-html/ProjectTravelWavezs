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
  } else if (
    !token &&
    (url.pathname.includes("/pages/user") || url.pathname.includes("/pages/admin"))
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  // checking if admin
  else if (!token?.isAdmin && url.pathname.includes("/pages/admin")) {
    console.log("user: " + token);

    return NextResponse.rewrite(new URL("/pages/user/Home", request.url));
  } else if (token?.isAdmin && url.pathname.includes("/user/Home")) {
    console.log("Admin: " + token);
    return NextResponse.rewrite(new URL("/pages/admin/Home", request.url));
  }

  return NextResponse.next();
}
export { default } from "next-auth/middleware";
