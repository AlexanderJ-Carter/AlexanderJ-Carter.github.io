---
title: 'From Five Seconds to One: A Real Performance Log'
description: 'Not a tutorial — an honest optimisation diary from slow homepage to sub-second loads, with trade-offs included.'
category: 'Engineering'
pubDate: 2026-03-01
updatedDate: 2026-08-07
lang: en-GB
tags: ['performance', 'optimisation', 'Web']
timeToRead: '11 min'
---

This site once needed five seconds for the homepage. Not a heavy app — a static personal site — but slow. This article records how I got under one second: what broke, what I measured, and what I chose not to fix.

## Where Was It Slow?

Slow is vague until you quantify it.

### Lighthouse

First run: Performance **47**. Main pain:

- **LCP**: 4.8s — hero image too large.
- **CLS**: 0.18 — fonts shifting layout.
- **FCP**: 2.1s — CSS/JS blocking paint.
- **TBT**: 380ms — third-party scripts.

### Network panel

Forty-seven requests; ~3.2MB of uncompressed PNGs; six Google Font files; ~180KB CSS; one analytics script blocking render.

Clear targets: images, fonts, CSS, third parties.

## Round 1: Images

Biggest win.

Converted PNG/JPG to AVIF with WebP fallback. Static files in `public/` were preprocessed at build time with Sharp — hero went from 2.4MB to ~186KB AVIF.

Responsive `srcset`: ~640 / 1024 / 1920 widths. Most mobile users dropped from multi-megabyte heroes to ~80KB.

Below-the-fold: `loading="lazy"`. Above-the-fold: `fetchpriority="high"`.

**Result**: LCP 4.8s → 2.3s; total transfer ~5.1MB → ~1.2MB.

## Round 2: Fonts

Google Fonts defaults cost FOIT, CLS, and extra connections.

Self-hosted WOFF2; cut weights from four to two (400/700); subset CJK with `unicode-range`; `font-display: swap`; preload body face.

**Result**: CLS 0.18 → 0.02; FCP 2.1s → 1.4s.

## Round 3: CSS

Tailwind purge misconfigured once bloated CSS to 180KB. Fixed `content` paths → ~23KB. Prism theme only on pages with code. Critical above-the-fold rules inlined.

**Result**: FCP → ~0.9s.

## Round 4: JavaScript

Astro defaults to zero JS — but I had overused `client:load`. Audited islands: theme toggle stays early; copy buttons → `client:visible`; decorative motion → CSS only.

**Result**: TBT 380ms → ~45ms.

## Round 5: HTTP Layer

Cloudflare `_headers`: long cache for hashed assets; shorter HTML revalidation. Added security headers while there. `preconnect` only where cross-origin is unavoidable.

## Final Numbers

| Metric         | Before | After |
| -------------- | ------ | ----- |
| Performance    | 47     | 97    |
| LCP            | 4.8s   | 0.95s |
| FCP            | 2.1s   | 0.8s  |
| CLS            | 0.18   | 0.01  |
| TBT            | 380ms  | 45ms  |
| Total transfer | 5.1MB  | 680KB |
| Requests       | 47     | 18    |

## Trade-offs

- **FOUT over FOIT** — brief system font, then custom.
- **AVIF + WebP fallback** — old Safari still covered.
- **CJK subsetting** — rare glyphs may fallback.
- **Deferred analytics** — early visits under-counted; acceptable here.

## Core Lesson

Performance is not something you bolt on at the end — it is a **budget you set at design time**. Image weight, font count, CSS surface, third parties: decide before you decorate. I spent more time fixing than I would have spent doing it right first.

Next project, checklist item one is not "which framework" but "what is the performance budget?"
