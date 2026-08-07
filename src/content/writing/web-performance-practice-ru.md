---
title: 'От пяти секунд к одной: честный perf-лог'
description: 'Не туториал — diary оптимизации главной, с компромиссами.'
category: 'Engineering'
pubDate: 2026-03-01
updatedDate: 2026-08-07
lang: ru
tags: ['производительность', 'оптимизация', 'Web']
timeToRead: '11 min'
---

Главная грузилась пять секунд. Не тяжёлое приложение — статический личный сайт — но медленно. Как уложился в секунду: что сломалось, что измерил, что не трогал.

## Где тормозило?

Lighthouse: Performance **47**. Боль:

- **LCP** 4,8s — hero слишком тяжёлый;
- **CLS** 0,18 — шрифты сдвигают layout;
- **FCP** 2,1s — CSS/JS блокируют paint;
- **TBT** 380ms — сторонние скрипты.

47 запросов, ~3,2 МБ PNG, шесть Google Fonts, ~180 КБ CSS, analytics блокирует render. Цели: изображения, шрифты, CSS, third-party.

## Изображения

PNG/JPG → AVIF + WebP fallback. Hero 2,4 МБ → ~186 КБ AVIF. `srcset` 640 / 1024 / 1920. Lazy ниже fold; `fetchpriority="high"` выше.

**Итог**: LCP 4,8s → 2,3s; transfer ~5,1 МБ → ~1,2 МБ.

## Шрифты

Self-hosted WOFF2; два веса (400/700); subset CJK; `font-display: swap`; preload.

**Итог**: CLS 0,18 → 0,02; FCP 2,1s → 1,4s.

## CSS

Tailwind purge misconfigured → 180 КБ. Исправил `content` paths → ~23 КБ. Prism только на страницах с кодом. Critical CSS inline.

**Итог**: FCP → ~0,9s.

## JavaScript

Слишком много `client:load`. Theme toggle рано; copy → `client:visible`; декоративная motion → CSS.

**Итог**: TBT 380ms → ~45ms.

## HTTP

Cloudflare `_headers`: длинный cache для hashed assets; короче для HTML. `preconnect` только где нужно.

## Финальные цифры

| Метрика     | До    | После |
| ----------- | ----- | ----- |
| Performance | 47    | 97    |
| LCP         | 4,8s  | 0,95s |
| FCP         | 2,1s  | 0,8s  |
| CLS         | 0,18  | 0,01  |
| TBT         | 380ms | 45ms  |
| Transfer    | 5,1MB | 680KB |

## Чего не делал

Платный image CDN для личного сайта. SPA. Не оптимизировал каждую статью до hero — сначала LCP.

## Итог

Perf = измерить, одна цель за раз, принять компромиссы. Sub-second на статическом личном сайте реалистичен — если images и fonts как продукт, не декор.
