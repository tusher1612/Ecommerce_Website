// Exporting authentication middleware from the auth module
// This ensures that authentication logic is applied globally as middleware
export { auth as middleware } from "@/auth/auth";

/**
 * Configuration for Next.js middleware matcher
 * This defines the routes where the middleware should be triggered.
 */
export const config = {
  matcher: [
    "/sign-in", // Apply middleware on the sign-in page
    "/((?!api|_next/static|_next/image|.*\\.png$).*)", 
    // Apply middleware to all routes EXCEPT:
    // - API routes (/api/*)
    // - Static assets (_next/static/*)
    // - Next.js images (_next/image/*)
    // - Image files (e.g., .png files)
  ],
};

