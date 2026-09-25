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
      <div className="grid grid-cols-4 gap-y-8 gap-x-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-x-16 md:pt-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col
            const aside = size === 'oneThird'

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                  'lg:border-l lg:border-border/70 lg:pl-8': size === 'oneThird' || size === 'half',
                  'studio-aside': aside,
                })}
                key={index}
              >
                {richText && (
                  <RichText
                    className={
                      aside
                        ? '[&_h2]:text-base [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:text-base [&_h3]:font-semibold [&_h3]:tracking-tight [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p+p]:mt-1.5'
                        : '[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:tracking-tight [&_p]:text-muted-foreground [&_p]:leading-relaxed'
                    }
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
