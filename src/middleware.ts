// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuthToken } from './lib/auth'

export async function middleware(request: NextRequest) {  
  const token = request.cookies.get('auth_token')?.value
  console.log('meu token -> ', token)
  const user = token ? verifyAuthToken(token) : null
  console.log('user verificado -> ', user)
  if (!user && request.nextUrl.pathname.startsWith('/store')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/store/:path*'],
}
