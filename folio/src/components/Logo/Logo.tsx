import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /** masthead = 编辑室字标；mark = 小号角标 */
  variant?: 'masthead' | 'mark'
}

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Folio'

export const Logo = (props: Props) => {
  const { className, variant = 'masthead' } = props

  if (variant === 'mark') {
    return <span className={clsx('brand-mark', className)}>{siteName}</span>
  }

  return (
    <span
      className={clsx(
        'text-[1.05rem] md:text-[1.15rem] font-semibold tracking-[-0.03em] leading-none [font-family:var(--font-display),Syne,system-ui,sans-serif]',
        className,
      )}
    >
      {siteName}
    </span>
  )
}
