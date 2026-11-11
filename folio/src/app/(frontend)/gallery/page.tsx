import type { Metadata } from 'next'
import Link from 'next/link'

import { GalleryGrid } from '@/components/GalleryGrid'
import { PageChrome } from '@/components/PageChrome'
import { getFeatures } from '@/instance'

export const metadata: Metadata = {
  title: '画廊',
  description: '冲印衬纸上的联系单——点开任一相框放大观片。',
}

export default function GalleryPage() {
  const features = getFeatures()

  return (
    <PageChrome
      mark="Contact Sheet"
      kicker="Gallery"
      title="画廊"
      related={[
        ...(features.fun ? [{ href: '/fun', label: '暗房玩具' }] : []),
        { href: '/posts', label: '写作' },
        ...(features.network ? [{ href: '/network', label: '站群地图' }] : []),
      ]}
      description="冲印衬纸上的联系单——点开任一相框放大观片。比例交错，像在翻一叠还没裁好的样张。"
    >
      <section className="container max-w-6xl">
        <GalleryGrid />
      </section>
      {features.fun ? (
        <p className="container mt-12 max-w-6xl text-[0.95rem] text-muted-foreground">
          想玩曝光与一帧？去{' '}
          <Link href="/fun" className="region-link">
            玩乐
          </Link>
        </p>
      ) : null}
    </PageChrome>
  )
}
