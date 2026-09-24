import type { NextConfig } from 'next'

/** 旧 Astro / 博客路径 → Folio；CMS「重定向」集合可继续补细粒度规则。 */
export const redirects: NextConfig['redirects'] = async () => {
  const legacy = [
    { source: '/writing', destination: '/posts', permanent: true },
    { source: '/writing/:path*', destination: '/posts/:path*', permanent: true },
    { source: '/blog', destination: '/posts', permanent: true },
    { source: '/blog/:path*', destination: '/posts/:path*', permanent: true },
    { source: '/subscribe', destination: '/posts', permanent: true },
    { source: '/subscribe/', destination: '/posts', permanent: true },
    // 多语言前缀：主站 Folio 目前以中文为主，统一收到中文路由
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
