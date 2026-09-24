import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-10 lg:gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                  'lg:border-l lg:border-border/70 lg:pl-8': size === 'oneThird' || size === 'half',
                })}
                key={index}
              >
                {richText && (
                  <RichText
                    className="[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:tracking-tight [&_p]:text-muted-foreground [&_p]:leading-relaxed"
                    data={richText}
                    enableGutter={false}
                  />
                )}

                {enableLink && <CMSLink className="mt-4 inline-flex" {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
