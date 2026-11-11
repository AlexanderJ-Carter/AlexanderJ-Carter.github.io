import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LEAD_SIZES = '(max-width: 768px) 100vw, 58vw'
const SIDE_SIZES = '(max-width: 768px) 100vw, 38vw'
const RAIL_SIZES = '(max-width: 640px) 50vw, 22vw'

const frames = [
  { src: '/img/gallery-optimized/landscape-01-md.webp', title: '山间晨雾', category: '风景' },
  { src: '/img/gallery-optimized/landscape-03-md.webp', title: '远岸', category: '风景' },
  { src: '/img/gallery-optimized/nature-flower-01-md.webp', title: '雨后花瓣', category: '自然' },
  { src: '/img/gallery-optimized/landscape-05-md.webp', title: '薄暮', category: '风景' },
  { src: '/img/gallery-optimized/nature-flower-02-md.webp', title: '枝头', category: '自然' },
  { src: '/img/gallery-optimized/food-01-md.webp', title: '桌上的光', category: '美食' },
]

function FrameLink({
  frame,
  index,
  sizes,
  priority = false,
  className = '',
  aspectClass = 'aspect-square',
}: {
  frame: (typeof frames)[number]
  index: number
  sizes: string
  priority?: boolean
  className?: string
  aspectClass?: string
}) {
  return (
    <li className={`contact-sheet__frame group relative overflow-hidden ${className}`}>
      <Link href="/gallery" prefetch={index < 3} className="block focus-visible:outline-none h-full">
        <span className="contact-sheet__no" aria-hidden>
          {String(index + 1).padStart(2, '0')}
        </span>
        <Image
          src={frame.src}
          alt={`${frame.title}，${frame.category}摄影`}
          width={960}
          height={1200}
          sizes={sizes}
          quality={78}
          priority={priority}
          className={`${aspectClass} h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]`}
          loading={priority ? undefined : index < 3 ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : index < 3 ? 'low' : 'auto'}
          decoding="async"
        />
        <div className="contact-sheet__meta">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70">{frame.category}</p>
          <p className="featured-title text-sm font-medium text-white md:text-[0.95rem]">{frame.title}</p>
        </div>
      </Link>
    </li>
  )
}

export function FeaturedStrip() {
  const [lead, sideA, sideB, ...rail] = frames

  return (
    <section
      className="container folio-defer-paint py-4 md:py-6"
      id="featured"
      aria-labelledby="featured-heading"
    >
      <div className="region-head region-head--row">
        <div>
          <p className="folio-mark mb-2">Plate 01 · Contact sheet</p>
          <h2 id="featured-heading" className="region-title">
            精选作品
          </h2>
          <p className="region-lead mt-2.5">先看这几张。完整联系单在画廊。</p>
        </div>
        <Link href="/gallery" prefetch className="region-link shrink-0">
          全部画廊
        </Link>
      </div>

      <ul className="featured-mosaic">
        <FrameLink
          frame={lead}
          index={0}
          sizes={LEAD_SIZES}
          priority
          className="featured-mosaic__lead"
          aspectClass="aspect-[4/5] md:aspect-auto"
        />
        <FrameLink
          frame={sideA}
          index={1}
          sizes={SIDE_SIZES}
          aspectClass="aspect-[4/3] md:aspect-auto"
        />
        <FrameLink
          frame={sideB}
          index={2}
          sizes={SIDE_SIZES}
          aspectClass="aspect-[4/3] md:aspect-auto"
        />
      </ul>

      {rail.length > 0 ? (
        <ul className="featured-rail" aria-label="更多精选">
          {rail.map((frame, i) => (
            <FrameLink
              key={frame.src}
              frame={frame}
              index={i + 3}
              sizes={RAIL_SIZES}
              aspectClass="aspect-square"
            />
          ))}
        </ul>
      ) : null}
    </section>
  )
}
