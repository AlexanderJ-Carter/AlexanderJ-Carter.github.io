'use client'

import dynamic from 'next/dynamic'

/** 问站不参与首屏 SSR 体积；空闲后再挂客户端包。 */
export const SiteAssistantLazy = dynamic(
  () => import('./index').then((m) => m.SiteAssistant),
  { ssr: false, loading: () => null },
)
