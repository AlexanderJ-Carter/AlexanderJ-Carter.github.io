'use client'

import React, { useRef, useState } from 'react'

const STATIONS = [
  { name: 'SomaFM Groove Salad', url: 'https://ice2.somafm.com/groovesalad-128-mp3' },
  { name: 'SomaFM Drone Zone', url: 'https://ice2.somafm.com/dronezone-128-mp3' },
  { name: 'SomaFM Space Station', url: 'https://ice2.somafm.com/spacestation-128-mp3' },
  { name: 'SomaFM Lush', url: 'https://ice2.somafm.com/lush-128-mp3' },
  { name: 'SomaFM Deep Space One', url: 'https://ice2.somafm.com/deepspaceone-128-mp3' },
  { name: 'SomaFM Indie Pop Rocks', url: 'https://ice2.somafm.com/indiepop-128-mp3' },
]

export function AmbientRadio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [station, setStation] = useState(STATIONS[0]!.url)
  const [playing, setPlaying] = useState(false)

  const syncSource = (url: string) => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.src !== url) {
      audio.src = url
      audio.load()
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
    <div className="glass-card p-6 md:col-span-2">
      <h3 className="text-lg font-semibold mb-1">氛围电台</h3>
      <p className="text-sm text-muted-foreground mb-4">挑一个频道，放点背景音乐。</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="ambient-station">
          选择电台
        </label>
        <select
          id="ambient-station"
          className="flex-1 border border-border bg-transparent px-3 py-2.5 text-sm"
          value={station}
          onChange={async (e) => {
            const url = e.target.value
            setStation(url)
            const was = playing
            syncSource(url)
            if (was && audioRef.current) {
              await audioRef.current.play()
            }
          }}
        >
          {STATIONS.map((s) => (
            <option key={s.url} value={s.url}>
              {s.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="px-5 py-2.5 text-sm border border-foreground bg-foreground text-background"
          onClick={() => void toggle()}
        >
          {playing ? '暂停' : '播放'}
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">点一下播放即可开始收听。</p>
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => setPlaying(false)}
      />
    </div>
  )
}
