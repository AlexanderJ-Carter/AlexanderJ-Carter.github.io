import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div className="folio-writing-list border-t border-border/70">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <Card
                key={result.slug || index}
                className="h-auto"
                doc={result}
                index={index}
                relationTo="posts"
                showCategories
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
