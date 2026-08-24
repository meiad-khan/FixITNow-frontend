import { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { getNewAccessToken } from "./service/refreshToken"
import { jwtUtils } from "./utils/jwt"

const AUTH_ROUTES = ["/login", "/register"]

const PUBLIC_ROUTES = ["/", "/service", "/technician"]

const ROLE_DASHBOARDS = {
  CUSTOMER: "/dashboard",
  TECHNICIAN: "/technician-dashboard",
  ADMIN: "/admin-dashboard",
} as const

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const cookieStore = await cookies()

  let accessToken = request.cookies.get("accessToken")?.value
  const refreshToken = request.cookies.get("refreshToken")?.value

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null

  /*
   * -------------------------------------------------------
   * 1. Refresh access token if it is expired/invalid
   * -------------------------------------------------------
   */

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken()

    if (result.success) {
      const newAccessToken = result.data.accessToken

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      })

      accessToken = newAccessToken

      // IMPORTANT:
      // Decode the newly refreshed access token again
      decodedAccessToken = jwtUtils.verifyToken(
        newAccessToken,
        process.env.JWT_ACCESS_SECRET as string
      )
    }
  }

  /*
   * -------------------------------------------------------
   * 2. Get user role
   * -------------------------------------------------------
   */

  let userRole: string | null = null

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role ?? null
  }
  
  // console.log("user role is  ", userRole);

  /*
   * -------------------------------------------------------
   * 3. If access token is invalid and refresh failed,
   *    remove the access token
   * -------------------------------------------------------
   */

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken")
    accessToken = undefined
    userRole = null
  }

  /*
   * -------------------------------------------------------
   * 4. Authenticated user should not visit login/register
   * -------------------------------------------------------
   */

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (isAuthRoute && userRole) {
    const dashboard = ROLE_DASHBOARDS[userRole as keyof typeof ROLE_DASHBOARDS]

    if (dashboard) {
      return NextResponse.redirect(new URL(dashboard, request.url))
    }

    return NextResponse.redirect(new URL("/", request.url))
  }

  /*
   * -------------------------------------------------------
   * 5. Check public routes
   * -------------------------------------------------------
   */

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  /*
   * -------------------------------------------------------
   * 6. Authentication protection
   *
   * If user is not authenticated and route is not public
   * or auth route -> redirect to login
   * -------------------------------------------------------
   */

  if (!userRole && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url)

    loginUrl.searchParams.set("redirectTo", pathname)

    return NextResponse.redirect(loginUrl)
  }

  /*
   * -------------------------------------------------------
   * 7. CUSTOMER dashboard authorization
   * -------------------------------------------------------
   */

  if (pathname.startsWith("/dashboard")) {
    if (userRole !== "CUSTOMER") {
      const dashboard =
        ROLE_DASHBOARDS[userRole as keyof typeof ROLE_DASHBOARDS]

      if (dashboard) {
        return NextResponse.redirect(new URL(dashboard, request.url))
      }

      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  /*
   * -------------------------------------------------------
   * 8. TECHNICIAN dashboard authorization
   * -------------------------------------------------------
   */

  if (pathname.startsWith("/technician-dashboard")) {
    if (userRole !== "TECHNICIAN") {
      const dashboard =
        ROLE_DASHBOARDS[userRole as keyof typeof ROLE_DASHBOARDS]

      if (dashboard) {
        return NextResponse.redirect(new URL(dashboard, request.url))
      }

      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  /*
   * -------------------------------------------------------
   * 9. ADMIN dashboard authorization
   * -------------------------------------------------------
   */

  if (pathname.startsWith("/admin-dashboard")) {
    if (userRole !== "ADMIN") {
      const dashboard =
        ROLE_DASHBOARDS[userRole as keyof typeof ROLE_DASHBOARDS]

      if (dashboard) {
        return NextResponse.redirect(new URL(dashboard, request.url))
      }

      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  /*
   * -------------------------------------------------------
   * 10. Allow request
   * -------------------------------------------------------
   */

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
}
