'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    // Homepage hero owns header contrast via [data-site-hero] observer.
    if (pathname === '/') return
    setHeaderTheme('light')
  }, [pathname, setHeaderTheme])

  return <React.Fragment />
}

export default PageClient
