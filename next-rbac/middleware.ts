import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  // Only run this for /admin/* (see matcher below)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Not signed in → send to sign in
  if (!token) {
    const signInUrl = new URL("/auth/signin", req.url)
    // Optional: after sign-in, go back to the originally requested page
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(signInUrl)
  }

  // Signed in but not ADMIN
  
  if (token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

// Apply to all /admin routes
export const config = {
  matcher: ["/admin/:path*"],
}
