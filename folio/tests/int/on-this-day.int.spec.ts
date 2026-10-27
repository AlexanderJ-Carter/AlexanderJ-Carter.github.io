import { readFileSync } from 'fs'
import path from 'path'

import { describe, expect, it } from 'vitest'

import { eventsOnThisCalendarDay } from '@/data/on-this-day'

describe('on-this-day', () => {
  it('never returns events for a different calendar day', () => {
    const pool = eventsOnThisCalendarDay(10, 27)
    expect(pool.length).toBeGreaterThan(0)
    for (const event of pool) {
      expect(event.month).toBe(10)
      expect(event.day).toBe(27)
    }
    expect(pool.some((e) => e.month === 10 && e.day === 1)).toBe(false)
  })

  it('keeps network.json elsewhere hosts aligned with alexander preset', () => {
    const presetPath = path.join(process.cwd(), 'instance/presets/alexander.json')
    const networkPath = path.join(process.cwd(), 'public/network.json')
    const preset = JSON.parse(readFileSync(presetPath, 'utf8')) as {
      elsewhere: { href: string; host: string; name: string }[]
    }
    const network = JSON.parse(readFileSync(networkPath, 'utf8')) as {
      elsewhere: { href: string; host: string; name: string }[]
    }

    const presetHosts = preset.elsewhere.map((e) => e.href).sort()
    const networkHosts = network.elsewhere.map((e) => e.href).sort()
    expect(networkHosts).toEqual(presetHosts)
  })
})
