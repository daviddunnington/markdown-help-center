import { NextResponse } from "next/server";
import { siteConfig } from "./lib/config";

/**
 * BASIC MIDDLEWARE (NO AUTHENTICATION)
 *
 * This middleware is used when authentication is disabled.
 * It simply passes through all requests without any protection.
 *
 * TO ENABLE AUTHENTICATION:
 * 1. Set siteConfig.auth.enabled = true in lib/config.ts
 * 2. Add your Clerk environment variables to .env.local
 * 3. Rename this file to 'basicMiddleware.ts' (as backup)
 * 4. Rename 'exampleAuthMiddleware.ts' to 'middleware.ts'
 *
 * This file-swapping approach avoids Vercel build issues with
 * conditional Clerk imports in the middleware.
 */

export default function middleware() {
  // If auth is disabled, just pass through all requests
  if (!siteConfig.auth.enabled) {
    return NextResponse.next();
  }

  // This code should never run when auth is disabled
  // But if it does, just pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
