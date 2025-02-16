export { auth as middleware } from "@/utilities/config/auth";

export const config = {
  matcher: [
    "/sign-in", // Apply middleware on the sign-in page
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
