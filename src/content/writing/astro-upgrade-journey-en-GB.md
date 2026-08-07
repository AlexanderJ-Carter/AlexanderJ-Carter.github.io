---
title: 'Upgrading Astro: Pitfalls, Rollback Thoughts, and What Stuck'
description: 'A real migration diary — Content Layer changes, slug→id, render() API, and the mysterious zero-page Windows build.'
category: 'Technical Practice'
pubDate: 2026-05-30
updatedDate: 2026-08-07
lang: en-GB
tags: ['Astro', 'upgrade', 'static sites']
timeToRead: '12 min'
---

Written three days after the upgrade finished — memory still fresh. If you are moving major Astro versions, this may save you a weekend.

> Note: this log describes a Content Layer migration on an earlier major line. This site now runs **Astro 7**; the patterns (typed collections, `render(post)`, cross-platform glob paths) still apply.

## Why Upgrade

Security fixes matter even when you do not use the vulnerable API surface. New Content Layer loaders also promise better typing and build performance — I estimated half a day; it took three.

## Steps That Hurt

### Dependencies

`npx @astrojs/upgrade`, then reconcile `@astrojs/*` peers with `npm ls`.

### Content Layer migration

Old: `src/content/config.ts` with auto-discovered Markdown.  
New: root `src/content.config.ts` with explicit `glob` loader.

Pain points:

1. **`z.date()` vs `z.coerce.date()`** — frontmatter dates are strings; non-ISO formats break coerce silently until you audit files.
2. **`slug` → `id`** — every route and link generator must follow.
3. **`render()`** — `await post.render()` becomes `import { render } from 'astro:content'; await render(post)`.

### Windows "0 pages built"

Build succeeded with **zero pages**, no error. Collection returned `[]` until glob `base` was made cross-platform-safe (`fileURLToPath` workaround on early 6.x; fixed in later patches). Lesson: **CI on Linux hides Windows path bugs** — push a branch and let Actions build.

### Rollback temptation

I almost reverted mid-debug. Stayed because maintenance mode on old majors and future loaders (remote sources) outweighed sunk cost — but on a deadline, rollback is rational.

## What Improved

- Full Content Layer migration.
- Routes and types green.
- Build times down on my machine (first build ~12s → ~9s class of gain — your mileage varies).

Deferred: View Transitions breaking changes; some integrations waiting on compatibility.

## Lessons

1. Branch first — never upgrade on `main` Friday night.
2. Read breaking changes **before** editing files.
3. CI before declaring victory.
4. Small steps: deps → collections → routes → pages.
5. Comment-out old code before deleting during wide renames.

## Closing

Framework upgrades are technical debt collection. Migration pain is one-off; better typing and faster builds compound. Pick a low-pressure week, branch, read the guide, step small — and do not fight glob paths alone at midnight.
