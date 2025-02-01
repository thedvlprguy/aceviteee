import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/sign-in",
    "/sign-up",
    "/api/webhook/clerk",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
  ]
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

