import Link from 'next/link'
import React from 'react'

const frames = [
  {
    src: '/img/featured/landscape-01.webp',
    title: '山间晨雾',
    category: '风景',
  },
  {
    src: '/img/featured/nature-flower-01.webp',
    title: '雨后花瓣',
    category: '自然',
  },
  {
    src: '/img/featured/food-01.webp',
    title: '桌上的光',
    category: '美食',
  },
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
          <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-xl">
            几张值得先看的影像。完整联系单见画廊。
          </p>
        </div>
        <Link
          href="/gallery"
          className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          全部画廊 →
        </Link>
      </div>
      <ul className="contact-sheet grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {frames.map((frame, i) => (
          <li key={frame.src} className="contact-sheet__frame group relative overflow-hidden">
            <span className="contact-sheet__no" aria-hidden>
              {String(i + 1).padStart(2, '0')}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frame.src}
              alt=""
              width={800}
              height={1000}
              className="h-full w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.03]"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="contact-sheet__meta">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70">
                {frame.category}
              </p>
              <p className="text-sm font-medium text-white">{frame.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
