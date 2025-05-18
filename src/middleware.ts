import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('todo-app-token')?.value

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret)
      
      // Check if token is expired based on payload.exp which is in seconds
      const currentTime = Math.floor(Date.now() / 1000) // current time in seconds
      if (payload.exp && currentTime >= payload.exp) {
        // Token expired, redirect to signin
        if (request.nextUrl.pathname.startsWith('/profile')) {
          return NextResponse.redirect(new URL('/signin', request.url))
        }
        // If expired token hits signin/signup page, allow it to proceed
        return NextResponse.next()
      }
      
      // If token valid and not expired:
      if (['/signin', '/signup'].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
      }
      return NextResponse.next()

    } catch (err) {
      // Invalid token or verification failed
      if (request.nextUrl.pathname.startsWith('/profile')) {
        return NextResponse.redirect(new URL('/signin', request.url))
      }
      return NextResponse.next()
    }
  } else {
    // No token
    if (request.nextUrl.pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/signup' , '/signin' , '/profile/:path*'],
}