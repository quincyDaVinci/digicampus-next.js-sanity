import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  
  // Create response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // Remove X-Frame-Options to allow embedding in Sanity Studio
  response.headers.delete('X-Frame-Options')
  
  // Set CSP to control frame ancestors (more modern approach)
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://*.sanity.io https://*.sanity.studio https://*.vercel.app"
  )
  
  return response
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
}

