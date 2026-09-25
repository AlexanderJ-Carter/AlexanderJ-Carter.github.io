import Link from 'next/link'
import React from 'react'

const frames = [
  { src: '/img/gallery-optimized/landscape-01-md.webp', title: '山间晨雾', category: '风景' },
  { src: '/img/gallery-optimized/landscape-03-md.webp', title: '远岸', category: '风景' },
  { src: '/img/gallery-optimized/landscape-05-md.webp', title: '薄暮', category: '风景' },
  { src: '/img/gallery-optimized/nature-flower-01-md.webp', title: '雨后花瓣', category: '自然' },
  { src: '/img/gallery-optimized/nature-flower-02-md.webp', title: '枝头', category: '自然' },
  { src: '/img/gallery-optimized/landscape-08-md.webp', title: '雾谷', category: '风景' },
  { src: '/img/gallery-optimized/food-01-md.webp', title: '桌上的光', category: '美食' },
  { src: '/img/gallery-optimized/food-02-md.webp', title: '一碗', category: '美食' },
  { src: '/img/gallery-optimized/landscape-12-md.webp', title: '夜色', category: '风景' },
]

export function FeaturedStrip() {
  return (
    <section className="container py-4" id="featured" aria-labelledby="featured-heading">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="folio-mark mb-2">Plate 01 · Contact sheet</p>
          <h2 id="featured-heading" className="text-2xl md:text-3xl tracking-tight font-semibold">
            精选作品
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            先看这几张。完整联系单在画廊。
          </p>
        </div>
        <Link
          href="/gallery"
          className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          全部画廊 →
        </Link>
      </div>
      <ul className="contact-sheet grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
        {frames.map((frame, i) => (
          <li key={frame.src} className="contact-sheet__frame group relative overflow-hidden">
            <Link href="/gallery" className="block focus-visible:outline-none">
              <span className="contact-sheet__no" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={frame.src}
                alt={frame.title}
                width={640}
                height={640}
                className="aspect-square h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="contact-sheet__meta">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70">
                  {frame.category}
                </p>
                <p className="text-sm font-medium text-white">{frame.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
