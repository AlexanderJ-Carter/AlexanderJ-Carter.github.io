import type { NextConfig } from 'next'

/** Astro/多语言时代遗留路径 → Folio；语言前缀剥落后仍落到这些规则。 */
const retiredPages = [
  { source: '/support', destination: '/contact', permanent: true },
  { source: '/uses', destination: '/posts/uses-page-as-self-description', permanent: true },
  { source: '/reading-list', destination: '/posts/reading-list-as-site-page', permanent: true },
  { source: '/login', destination: '/admin/login', permanent: true },
  // 旧 /next/* 作品集；勿误伤 Payload 的 /next/preview|seed|exit-preview
  { source: '/next', destination: '/projects', permanent: true },
  {
    source: '/next/:path((?!preview(?:/|$)|seed(?:/|$)|exit-preview(?:/|$)).*)',
    destination: '/projects',
    permanent: true,
  },
] as const

/** 语言前缀、IE；旧 /writing /blog 收束到站内写作。 */
export const redirects: NextConfig['redirects'] = async () => {
  const legacy = [
    ...retiredPages,
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
    // 旧 i18n 前缀永久收束，便于 GSC 合并 URL
    { source: '/en', destination: '/', permanent: true },
    { source: '/en/:path*', destination: '/:path*', permanent: true },
    { source: '/zh-TW', destination: '/', permanent: true },
    { source: '/zh-TW/:path*', destination: '/:path*', permanent: true },
    { source: '/fr', destination: '/', permanent: true },
    { source: '/fr/:path*', destination: '/:path*', permanent: true },
    { source: '/ru', destination: '/', permanent: true },
    { source: '/ru/:path*', destination: '/:path*', permanent: true },
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
