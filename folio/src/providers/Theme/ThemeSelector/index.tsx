'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { cn } from '@/utilities/ui'

type Preference = 'auto' | 'light' | 'dark'

const CYCLE: Preference[] = ['auto', 'light', 'dark']

const META: Record<
  Preference,
  { label: string; next: string; Icon: typeof Sun }
> = {
  auto: { label: '跟随系统', next: '切换到浅色', Icon: Monitor },
  light: { label: '浅色', next: '切换到深色', Icon: Sun },
  dark: { label: '深色', next: '切换为跟随系统', Icon: Moon },
}

export const ThemeSelector: React.FC<{ className?: string; overHero?: boolean }> = ({
  className,
  overHero,
}) => {
  const { setTheme } = useTheme()
  const [preference, setPreference] = useState<Preference>('auto')

  useEffect(() => {
    const stored = window.localStorage.getItem(themeLocalStorageKey)
    if (stored === 'light' || stored === 'dark') {
      setPreference(stored)
    } else {
      setPreference('auto')
    }
  }, [])

  const cycle = () => {
    const i = CYCLE.indexOf(preference)
    const next = CYCLE[(i + 1) % CYCLE.length] as Preference
    setPreference(next)
    if (next === 'auto') {
      setTheme(null)
    } else {
      setTheme(next)
    }
  }

  const { label, next, Icon } = META[preference]

  return (
    <button
      type="button"
      onClick={cycle}
      className={cn(
        'theme-toggle inline-flex size-8 items-center justify-center rounded-full transition-colors',
        overHero
          ? 'text-white/80 hover:bg-white/10 hover:text-white'
          : 'text-foreground/65 hover:bg-muted hover:text-foreground',
        className,
      )}
      aria-label={`外观：${label}。${next}`}
      title={`外观：${label}`}
    >
      <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
    </button>
  )
}
