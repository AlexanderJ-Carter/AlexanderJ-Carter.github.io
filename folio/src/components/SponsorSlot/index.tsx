'use client'

import { useEffect } from 'react'

type Props = {
  publisher?: string
  className?: string
}

/**
 * 可选 EthicalAds 文字赞助位。未配置 publisher 时不渲染。
 * 比 AdSense 克制，需先在 ethicalads.io 申请通过。
 */
export function SponsorSlot({
  publisher = process.env.NEXT_PUBLIC_ETHICALADS_PUBLISHER?.trim(),
  className = '',
}: Props) {
  useEffect(() => {
    if (!publisher) return
    if (document.querySelector('script[data-folio-ethicalads]')) return
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
    script.dataset.folioEthicalads = '1'
    document.body.appendChild(script)
  }, [publisher])

  if (!publisher) return null

  return (
    <aside
      className={`sponsor-slot container max-w-3xl py-8 ${className}`.trim()}
      aria-label="赞助"
    >
      <p className="folio-mark mb-3">赞助</p>
      <div className="dark raised" data-ea-publisher={publisher} data-ea-type="text" />
    </aside>
  )
}
