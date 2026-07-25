---
title: 'Why Content Sites Suit Astro: Zero JS and Core Web Vitals'
description: 'A personal site is for reading first. Astro ships no framework runtime by default — which matches content-site performance goals.'
category: 'Technical Practice'
pubDate: 2026-06-22
updatedDate: 2026-07-25
lang: en-GB
tags: ['Astro', 'performance', 'Core Web Vitals']
timeToRead: '12 min'
---

The core deliverable of a content site is words and images in HTML, not a client-side state tree. Many frameworks assume "the app must run in the browser"; Astro assumes "the page is a document first, interactivity islands on demand". For personal writing, galleries, and documentation, the second assumption is usually less work — and makes green Core Web Vitals easier.

## What Content Sites Actually Fear

Reader experience maps roughly to:

- **LCP**: how soon the largest content (often headline or hero image) is readable;
- **CLS**: whether fonts and images shove the layout around;
- **INP / legacy interaction delay**: how long after a tap before something responds.

SPAs can be fast, but you still fight hydration cost, router weight, and "import a full UI runtime for a few accordions". On content sites that cost often exceeds the benefit.

## Astro's Default Answer

**Zero JS on the happy path.** Components become HTML at build time. Only islands with explicit `client:*` send scripts to the browser.

That means:

- Writing lists, about pages, privacy policies can be almost pure documents;
- Theme toggle, music player, small tools become islands — if they fail, the page stays readable;
- Total Blocking Time can approach "nothing much to block" in lab conditions.

I will not mythologise framework scores — real networks, fonts, large images, and third-party scripts can puncture a perfect score. But **architecturally shipping less JS** is steadier than shaving bytes after the fact.

## Islands: Pay for Interaction, Not Sitewide Hydration

This site has some interactivity: theme, verification gates, tool pages, occasional players. Islands fit; "whole site React" does not.

In practice I follow:

1. **If CSS or native HTML suffices, no framework component.**
2. **`client:load` is expensive default — prefer `visible` or `idle` when possible.**
3. **Fewer islands per page.** Five small islands can still jam like archipelago traffic.

## Static Output and Edge Caching

`output: 'static'` (or equivalent prerender) lets GitHub Pages / Cloudflare CDNs serve files directly. No "query database on every request" path — TTFB becomes more predictable.

Content sites usually update "one post, one deploy". SSG fits. Dynamic forms can use third parties or edge functions without turning the whole site into SSR.

## Potholes Astro Does Not Fix

Astro will not automatically solve:

- **Unconstrained large images** — LCP killers;
- **Web font flash and reflow** — CLS killers;
- **Casual analytics / chat / ad scripts** — INP and main-thread killers;
- **Client-side route transitions** — pretty, but worth the complexity?

This site already has a performance practice article; that one is "how to fix slow"; this one is "why this foundation is less likely to be slow".

## When Not to Force Astro

- Heavy real-time collaboration, complex dashboards, strong client state;
- Team already invested in Next/Nuxt component ecosystem with content as side dish;
- Interaction density approaches "application", not "document plus a few controls".

Tools serve goals. My goal: a long-maintained personal studio site, text and images first, scripts restrained. Astro stands on that side.

## What I Actually Save vs "All React"

Not "whether I know React", but:

- Mental load of hydration consistency for static copy;
- Regression work when router and state libraries upgrade;
- Runtime downloaded on low-end phones to open one blog post.

I still use framework components inside islands when needed. Default path is HTML. **Documents cheap, interaction explicitly paid for** — a good deal for personal sites.

If eighty per cent of pages are articles and explanations and twenty per cent are small tools, Astro's defaults are on your side. Reverse the ratio and reassess.

## Markdown and MDX in the Pipeline

Content collections, frontmatter, and build-time validation pair well with Astro. Broken frontmatter fails at build — which CI catches — rather than at runtime on one language path. That matters when you maintain five route trees.

## Preview and Author Experience

Local dev should feel instant enough that writing is pleasant. If dev server lags, you write less. Astro's dev experience is part of why I keep long-form in-repo rather than in a CMS — friction shows up in word count.

## Closing Thoughts

Content sites suit Astro not because of buzzwords but because default delivery aligns with readers: full HTML first, islands woken on demand. Core Web Vitals will not auto-max; you simply avoid one war between framework runtime and document. Choosing the right defaults beats choosing the right plugin market.
