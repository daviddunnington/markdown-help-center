import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { siteConfig } from "./lib/config";

// Define which routes should be protected

// No need for unused middleware variable or assignment
const isProtectedRoute = createRouteMatcher(["/editor(.*)"]);

// Define content routes that might be protected based on config
const isContentRoute = createRouteMatcher([
  "/",
  "/category(.*)",
  "/categories(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // If auth is disabled, allow everything
  if (!siteConfig.auth.enabled) {
    return NextResponse.next();
  }

  // Always protect editor if configured
  if (siteConfig.auth.protect.editor && isProtectedRoute(req)) {
    await auth.protect();
  }

  // Protect content routes if configured
  if (siteConfig.auth.protect.content && isContentRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
