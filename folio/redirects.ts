import type { NextConfig } from 'next'

/** 语言前缀、IE；旧 /writing /blog 收束到站内写作。 */
export const redirects: NextConfig['redirects'] = async () => {
  const legacy = [
    { source: '/help', destination: '/', permanent: true },
    { source: '/help/:path*', destination: '/', permanent: true },
    { source: '/writing', destination: '/posts', permanent: true },
    { source: '/writing/:path*', destination: '/posts', permanent: true },
    { source: '/blog', destination: '/posts', permanent: true },
    { source: '/blog/:path*', destination: '/posts', permanent: true },
    { source: '/en/writing', destination: '/posts', permanent: true },
    { source: '/en/writing/:path*', destination: '/posts', permanent: true },
    { source: '/en/blog', destination: '/posts', permanent: true },
    { source: '/en/blog/:path*', destination: '/posts', permanent: true },
    { source: '/en', destination: '/', permanent: false },
    { source: '/en/:path*', destination: '/:path*', permanent: false },
    { source: '/zh-TW', destination: '/', permanent: false },
    { source: '/zh-TW/:path*', destination: '/:path*', permanent: false },
    { source: '/fr', destination: '/', permanent: false },
    { source: '/fr/:path*', destination: '/:path*', permanent: false },
    { source: '/ru', destination: '/', permanent: false },
    { source: '/ru/:path*', destination: '/:path*', permanent: false },
    // 实用工具收进 /tools（query 触发锚点滚动；hash 不宜放 next.config redirects）
    { source: '/time', destination: '/tools?t=time', permanent: true },
    { source: '/units', destination: '/tools?t=units', permanent: true },
    { source: '/currency', destination: '/tools?t=currency', permanent: true },
    { source: '/qr', destination: '/tools?t=qr', permanent: true },
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
