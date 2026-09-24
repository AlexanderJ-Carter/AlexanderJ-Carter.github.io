import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container">
      <div className="film-edge folio-section-tint rounded-sm px-5 py-8 md:px-8 md:py-10 flex flex-col gap-6 md:flex-row md:justify-between md:items-end">
        <div className="max-w-[40rem]">
          <p className="folio-mark mb-3">Plate · Connect</p>
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
