'use client'

import React, { useCallback, useEffect, useState } from 'react'

const DEFAULT = { lat: 39.9042, lon: 116.4074, label: '北京' }

const CODE_MAP: Record<number, string> = {
  0: '晴朗',
  1: '晴间多云',
  2: '多云',
  3: '阴天',
  45: '雾',
  48: '雾凇',
  51: '小雨',
  53: '中雨',
  55: '大雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  80: '阵雨',
  95: '雷暴',
}

type ForecastDay = { date: string; code: number; max: number; min: number }

type WeatherState = {
  temp: number
  humidity: number
  wind: number
  code: number
  location: string
  source: string
  days: ForecastDay[]
}

export function WeatherWidget() {
  const [data, setData] = useState<WeatherState | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const pos = await new Promise<{ lat: number; lon: number; label: string | null } | null>(
        (resolve) => {
          if (!navigator.geolocation) {
            resolve(null)
            return
          }
          navigator.geolocation.getCurrentPosition(
            (p) =>
              resolve({
                lat: p.coords.latitude,
                lon: p.coords.longitude,
                label: null,
              }),
            () => resolve(null),
            { timeout: 8000, maximumAge: 600_000 },
          )
        },
      )
      const place = pos ?? DEFAULT
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}` +
        `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
      const res = await fetch(url)
      if (!res.ok) throw new Error('weather http')
      const json = await res.json()
      const days: ForecastDay[] = (json.daily?.time || []).map((date: string, i: number) => ({
        date,
        code: json.daily.weather_code[i],
        max: Math.round(json.daily.temperature_2m_max[i]),
        min: Math.round(json.daily.temperature_2m_min[i]),
      }))
      setData({
        temp: Math.round(json.current.temperature_2m),
        humidity: Math.round(json.current.relative_humidity_2m),
        wind: Math.round(json.current.wind_speed_10m * 10) / 10,
        code: json.current.weather_code,
        location: place.label ?? '当前位置',
        source: place.label ? '默认 · 北京' : '定位',
        days,
      })
    } catch {
      setError(true)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const weekday = (iso: string) =>
    new Date(iso + 'T12:00:00').toLocaleDateString('zh-CN', { weekday: 'short' })

  return (
    <div className="glass-card fun-toy p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="folio-mark mb-2">Outside</p>
          <h3 className="text-lg font-semibold">天气</h3>
          <p className="text-sm text-muted-foreground">
            {loading ? '读取中…' : error ? '暂时读不到天气' : data?.source}
          </p>
        </div>
        <button
          type="button"
          className="px-2 py-1 text-xs uppercase tracking-wider border border-border text-muted-foreground hover:text-foreground"
          onClick={() => void load()}
        >
          刷新
        </button>
      </div>

      {data && !error ? (
        <>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-5xl font-semibold tabular-nums tracking-tight">{data.temp}°</p>
              <p className="mt-2 text-lg">{CODE_MAP[data.code] ?? '—'}</p>
              <p className="mt-1 text-sm text-muted-foreground">{data.location}</p>
            </div>
            <dl className="grid min-w-[10rem] grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">湿度</dt>
                <dd className="font-semibold tabular-nums">{data.humidity}%</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">风速</dt>
                <dd className="font-semibold tabular-nums">{data.wind} m/s</dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-border pt-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">七日</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {data.days.map((day) => (
                <div key={day.date} className="border border-border px-2 py-2 text-center text-xs">
                  <p className="text-muted-foreground">{weekday(day.date)}</p>
                  <p className="mt-1 font-medium tabular-nums">
                    {day.max}° / {day.min}°
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">{loading ? '读取中…' : '暂时读不到天气'}</p>
      )}
    </div>
  )
}
