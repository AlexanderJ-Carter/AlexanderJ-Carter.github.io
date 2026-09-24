import type { NextConfig } from 'next'

/** 语言前缀与 IE；/writing* /blog* 由边缘 Worker `legacy-redirect` 管。 */
export const redirects: NextConfig['redirects'] = async () => {
  const legacy = [
    { source: '/en', destination: '/', permanent: false },
    { source: '/en/:path*', destination: '/:path*', permanent: false },
    { source: '/zh-TW', destination: '/', permanent: false },
    { source: '/zh-TW/:path*', destination: '/:path*', permanent: false },
    { source: '/fr', destination: '/', permanent: false },
    { source: '/fr/:path*', destination: '/:path*', permanent: false },
    { source: '/ru', destination: '/', permanent: false },
    { source: '/ru/:path*', destination: '/:path*', permanent: false },
  ]

  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)',
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)',
  }

  return [...legacy, internetExplorerRedirect]
}
