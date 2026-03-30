import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function proxy(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/workspace") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/login") && isLoggedIn) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/workspace/:path*", "/login"],
};
