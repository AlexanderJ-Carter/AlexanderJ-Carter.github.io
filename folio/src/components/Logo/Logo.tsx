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
        'site-logo text-[1.15rem] font-semibold leading-none tracking-[-0.04em] md:text-[1.25rem]',
        className,
      )}
      style={{ fontFamily: 'var(--font-display), Outfit, system-ui, sans-serif' }}
    >
      {siteName}
    </span>
  )
}
