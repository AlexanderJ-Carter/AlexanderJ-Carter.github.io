import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { isProtectedPath, skipVerify, VERIFY_COOKIE } from '@/lib/site'

export function middleware(request: NextRequest) {
  if (skipVerify) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl
  if (!isProtectedPath(pathname)) {
    return NextResponse.next()
  }

  const verified = request.cookies.get(VERIFY_COOKIE)?.value === '1'
  if (verified) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/verify'
  url.searchParams.set('next', pathname + request.nextUrl.search)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/about', '/about/:path*', '/contact', '/contact/:path*'],
}
