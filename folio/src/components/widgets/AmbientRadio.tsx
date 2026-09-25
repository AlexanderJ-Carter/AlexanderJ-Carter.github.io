'use client'

import React, { useRef, useState } from 'react'

const STATIONS = [
  { name: 'Groove Salad', tag: '缓拍', url: 'https://ice2.somafm.com/groovesalad-128-mp3' },
  { name: 'Drone Zone', tag: '氛围', url: 'https://ice2.somafm.com/dronezone-128-mp3' },
  { name: 'Space Station', tag: '电子', url: 'https://ice2.somafm.com/spacestation-128-mp3' },
  { name: 'Lush', tag: '人声', url: 'https://ice2.somafm.com/lush-128-mp3' },
  { name: 'Deep Space One', tag: '深空', url: 'https://ice2.somafm.com/deepspaceone-128-mp3' },
  { name: 'Indie Pop Rocks', tag: '独立', url: 'https://ice2.somafm.com/indiepop-128-mp3' },
] as const

type StationUrl = (typeof STATIONS)[number]['url']

export function AmbientRadio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [station, setStation] = useState<StationUrl>(STATIONS[0]!.url)
  const [playing, setPlaying] = useState(false)

  const current = STATIONS.find((s) => s.url === station) ?? STATIONS[0]!

  const syncSource = (url: string) => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.src !== url) {
      audio.src = url
      audio.load()
    }
  }

  const pick = async (url: StationUrl) => {
    setStation(url)
    const was = playing
    syncSource(url)
    if (was && audioRef.current) {
      await audioRef.current.play()
    }
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (!playing) {
      syncSource(station)
      await audio.play()
      setPlaying(true)
      return
    }
    audio.pause()
    setPlaying(false)
  }

  return (
    <div className="glass-card fun-toy fun-radio p-6">
      <div className="fun-radio__head">
        <div>
          <p className="folio-mark mb-2">Airwave</p>
          <h3 className="text-lg font-semibold mb-1">氛围电台</h3>
          <p className="text-sm text-muted-foreground">SomaFM · 选一个频道当背景音。</p>
        </div>
        <button
          type="button"
          className={`fun-radio__play${playing ? ' is-on' : ''}`}
          onClick={() => void toggle()}
          aria-pressed={playing}
        >
          {playing ? '暂停' : '播放'}
        </button>
      </div>

      <p className="fun-radio__now" aria-live="polite">
        <span className="fun-radio__now-mark">{playing ? 'On air' : 'Standby'}</span>
        <span className="fun-radio__now-name">{current.name}</span>
        <span className="fun-radio__now-tag">{current.tag}</span>
      </p>

      <div className="fun-radio__stations" role="listbox" aria-label="电台频道">
        {STATIONS.map((s) => {
          const active = s.url === station
          return (
            <button
              key={s.url}
              type="button"
              role="option"
              aria-selected={active}
              className={`fun-radio__station${active ? ' is-active' : ''}`}
              onClick={() => void pick(s.url)}
            >
              <span className="fun-radio__station-name">{s.name}</span>
              <span className="fun-radio__station-tag">{s.tag}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">流媒体来自 SomaFM，需联网；尊重 reduced-motion，无额外动画闪烁。</p>
      <audio ref={audioRef} preload="none" onEnded={() => setPlaying(false)} />
    </div>
  )
}
