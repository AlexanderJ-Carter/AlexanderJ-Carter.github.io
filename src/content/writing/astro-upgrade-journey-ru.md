---
title: 'Обновление Astro: ловушки, rollback и что осталось'
description: 'Реальный migration diary — Content Layer, slug→id, render() и Windows build с нулём страниц.'
category: 'Technical Practice'
pubDate: 2026-05-30
updatedDate: 2026-08-07
lang: ru
tags: ['Astro', 'upgrade', 'статический сайт']
timeToRead: '12 min'
---

Написано через три дня после финиша — память свежа. Если переходишь major Astro, может сэкономить weekend.

> Лог описывает Content Layer migration на более ранней major line. Сайт сейчас на **Astro 7**; patterns (typed collections, `render(post)`, cross-platform glob paths) всё ещё актуальны.

## Зачем upgrade

Security fixes даже без vulnerable API surface. Content Layer loaders — лучший typing и build perf; оценил полдня — заняло три.

## Болезненные шаги

### Dependencies

`npx @astrojs/upgrade`, затем reconcile `@astrojs/*` peers.

### Content Layer migration

Старое: `src/content/config.ts` с auto-discovered Markdown.  
Новое: root `src/content.config.ts` с explicit `glob` loader.

Боли:

1. **`z.date()` vs `z.coerce.date()`** — frontmatter dates строки; non-ISO formats ломают coerce silently.
2. **`slug` → `id`** — routes и link generators следовать.
3. **`render()`** — `await post.render()` → `import { render } from 'astro:content'; await render(post)`.

### Windows «0 pages built»

Build success, **zero pages**, no error. Collection `[]` пока glob `base` не cross-platform-safe (`fileURLToPath` на early 6.x). **CI на Linux скрывает Windows path bugs** — push branch, пусть Actions собирает.

### Rollback temptation

Почти revert mid-debug. Остался: maintenance old majors vs future loaders (remote sources). На deadline rollback rational.

## Что улучшилось

- Full Content Layer migration.
- Routes и types green.
- Build times down (~12s → ~9s class — mileage varies).

Deferred: View Transitions breaking; integrations ждут compat.

## Уроки

1. Branch first — не upgrade на `main` в пятницу вечером.
2. Breaking changes **до** правок файлов.
3. CI before victory.
4. Small steps: deps → collections → routes → pages.
5. Comment-out old code before delete при wide renames.

## Итог

Framework upgrade — сбор technical debt. Migration pain one-off; typing и builds compound. Спокойная неделя, branch, guide, small steps — и не борись с glob paths alone в полночь.
