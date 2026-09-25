import React from 'react'

import { getInstance } from '@/instance'
import type { InstanceTimelineItem } from '@/instance/types'

const KIND_LABEL: Record<NonNullable<InstanceTimelineItem['kind']>, string> = {
  education: '教育',
  research: '研究',
  work: '工作',
  other: '经历',
}

export function AboutTimeline() {
  const items = getInstance().about?.timeline ?? []
  if (items.length === 0) return null

  return (
    <section className="mt-12 md:mt-16" aria-labelledby="about-timeline-heading">
      <p className="folio-mark mb-3">履历</p>
      <h2
        id="about-timeline-heading"
        className="mb-6 text-2xl font-semibold tracking-tight md:mb-8 md:text-3xl"
      >
        经历
      </h2>
      <ol className="about-timeline list-none p-0 m-0">
        {items.map((item) => (
          <li key={`${item.period}-${item.title}`} className="about-timeline__item">
            <div className="about-timeline__rail" aria-hidden />
            <div className="about-timeline__body">
              <p className="about-timeline__meta">
                <span className="meta-mono tabular-nums">{item.period}</span>
                {item.kind ? (
                  <span className="about-timeline__kind">{KIND_LABEL[item.kind]}</span>
                ) : null}
              </p>
              <h3 className="about-timeline__title">{item.title}</h3>
              {item.detail ? <p className="about-timeline__detail">{item.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
