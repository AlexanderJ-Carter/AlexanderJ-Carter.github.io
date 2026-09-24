import type { Metadata } from 'next'

import { GalleryGrid } from '@/components/GalleryGrid'

export const metadata: Metadata = {
  title: '画廊',
  description: '冲印衬纸上的联系单——点开任一相框放大观片。',
}

export default function GalleryPage() {
  return (
    <article className="pt-28 pb-24">
      <section className="container mb-10">
        <div className="max-w-2xl">
          <p className="folio-mark mb-3">Contact Sheet</p>
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Gallery</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4">
            画廊
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            冲印衬纸上的联系单——点开任一相框放大观片。
          </p>
        </div>
      </section>
      <section className="container">
        <GalleryGrid />
      </section>
    </article>
  )
}
