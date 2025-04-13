// import {NextResponse} from 'next/server';
// import type {NextRequest} from 'next/server';

// export function middleware(request: NextRequest) {
//     // return NextResponse.redirect(new URL("/", request.url)); // Redirect to the home page
//     //conditional redirect

//     const url = request.nextUrl;
//     if (!request.cookies.get('token') && url.pathname !== '/login') {
//         return NextResponse.redirect(new URL('/login', request.url));
//       }
    
//       return NextResponse.next(); // Allow the request to continue
    
// }

// export const config = {
//     matcher: ['/about'],          // Apply middleware to /about route
//     // matcher: ['/about/:path*'], // Apply middleware to /about and all its sub-paths
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher(["/user-profile"]);
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  if (!userId && !isPublicRoute(req)) {
    // Add custom logic to run before redirecting

    return redirectToSignIn();
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