import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { siteConfig } from "./lib/config";

/**
 * AUTHENTICATION MIDDLEWARE
 *
 * This file contains the full middleware implementation with Clerk authentication.
 *
 * TO ENABLE AUTHENTICATION:
 * 1. Set siteConfig.auth.enabled = true in lib/config.ts
 * 2. Add your Clerk environment variables to .env.local:
 *    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
 *    - CLERK_SECRET_KEY=sk_test_...
 * 3. Rename this file from 'exampleAuthMiddleware.ts' to 'middleware.ts'
 * 4. Rename the current 'middleware.ts' to 'basicMiddleware.ts' (as backup)
 *
 * TO DISABLE AUTHENTICATION:
 * 1. Set siteConfig.auth.enabled = false in lib/config.ts
 * 2. Rename 'middleware.ts' to 'exampleAuthMiddleware.ts'
 * 3. Rename 'basicMiddleware.ts' back to 'middleware.ts'
 *
 * This approach avoids Vercel build issues with conditional Clerk imports.
 */

// Define which routes should be protected
const isProtectedRoute = createRouteMatcher(["/editor(.*)"]);

// Define content routes that might be protected based on config
const isContentRoute = createRouteMatcher([
  "/",
  "/[category]",
  "/[...category]",
]);

export default clerkMiddleware(async (auth, req) => {
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
