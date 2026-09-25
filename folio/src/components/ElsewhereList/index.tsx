import React from 'react'

import type { InstanceElsewhere } from '@/instance/types'

type ElsewhereListProps = {
  items: InstanceElsewhere[]
  className?: string
}

/** 站外入口：编辑列表，不用卡片瓷砖。 */
export function ElsewhereList({ items, className = '' }: ElsewhereListProps) {
  if (items.length === 0) return null

  return (
    <ul className={`elsewhere-list${className ? ` ${className}` : ''}`}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            className="elsewhere-row"
            href={item.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="elsewhere-row__main">
              <span className="elsewhere-row__name">{item.name}</span>
              {item.desc ? <span className="elsewhere-row__desc">{item.desc}</span> : null}
            </span>
            <span className="elsewhere-row__host">
              {item.host}
              <span className="elsewhere-row__arrow" aria-hidden>
                ↗
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
