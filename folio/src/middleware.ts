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
    const res = NextResponse.next()
    // 受门禁页面按访客 cookie 分流，禁止 CDN 把 307/200 缓存串台
    res.headers.set('Cache-Control', 'private, no-store')
    return res
  }

  const url = request.nextUrl.clone()
  url.pathname = '/verify'
  url.search = ''
  url.searchParams.set('next', pathname + request.nextUrl.search)
  const res = NextResponse.redirect(url)
  res.headers.set('Cache-Control', 'private, no-store')
  return res
}

export const config = {
  matcher: ['/about', '/about/:path*', '/contact', '/contact/:path*'],
}
