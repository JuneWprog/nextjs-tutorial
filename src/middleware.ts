import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL("/", request.url)); // Redirect to the home page
    //conditional redirect

    const url = request.nextUrl;
    if (!request.cookies.get('token') && url.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    
      return NextResponse.next(); // Allow the request to continue
    
}

export const config = {
    matcher: ['/about'],          // Apply middleware to /about route
    // matcher: ['/about/:path*'], // Apply middleware to /about and all its sub-paths
};