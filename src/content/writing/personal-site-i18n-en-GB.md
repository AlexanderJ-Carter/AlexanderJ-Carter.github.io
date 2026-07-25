---
title: 'Multilingual Personal Sites: Routes, hreflang, and Copy Layers'
description: 'Five languages are not five copy-pastes. How this site layers URLs, templates, and translation files.'
category: 'Engineering'
pubDate: 2026-06-28
updatedDate: 2026-07-25
lang: en-GB
tags: ['i18n', 'multilingual', 'Astro']
timeToRead: '13 min'
---

The default language here is Simplified Chinese at `/`; there is also Traditional Chinese, British English (`/en/`), French, and Russian. Multilingual work is tempting at first — "international" — then quickly becomes: the same nav string in five files, long articles existing in only one language, and search engines unsure which duplicate is canonical.

This records the layering I actually use, and what I deliberately do not do.

## URLs: Subdirectories, Default Language Unprefixed

The strategy is ordinary but works:

- `zh-CN` → `/about/`
- Others → `/zh-TW/about/`, `/en/about/`, `/fr/about/`, `/ru/about/`

Subdirectories share main-domain weight; certificates and deployment stay simple. No prefix on the default language keeps share links shorter for Chinese readers and matches "this is primarily a Chinese site".

British English maps to `/en/` not `/en-GB/` — readability and habit over literal locale in the path; `hreflang` still declares the correct language tag.

## Three Copy Types, Three Homes

Dumping every string into one giant `ui.ts` feels fine until it hurts. This site roughly splits:

1. **Global UI**: nav, footer, theme toggle — `src/i18n/ui.ts`.
2. **Page copy**: home, about, privacy — `src/i18n/pages/*.ts`, or `Record<Lang, …>` at the top of templates.
3. **Long-form content**: `src/content/writing/*.md`, mostly `lang: zh-CN` for now.

Principle: **change nav without touching articles; change articles without touching five button strings.** Translation proceeds by layer, not "every change must ship in five languages".

For incomplete language pages, an honest short note (e.g. no articles in this language yet) beats machine-translated thin duplicates — bad for readers and for AdSense perception.

## hreflang and canonical

Each important page should have:

- A **canonical** pointing to itself;
- **alternate hreflang** links in `<head>` for each language, plus `x-default` (here pointing at the Chinese root).

This is not decoration. Without it, search engines struggle to see five URLs as language variants of one document. Layout should generate these from the current path in bulk — not by hand per page.

## Thin Routes, Thick Templates

`src/pages/` should only wrap: pick `lang`, render the Template. Structure and copy selection live in `src/components/templates/`.

Benefit: adding a language is mostly translations plus route wrappers, not duplicating page logic. Cost: templates can grow long — page-level i18n files should keep absorbing strings.

## Translation Quality Over Coverage

Common failure modes:

- UI fully translated, body still original — switching language feels broken;
- Or five machine-translated bodies, grammatically fine, voiceless, competing for indexation.

I accept: **nav and legal pages complete in five languages; depth articles thick in Chinese first.** English and others as incremental work, not padding before ads.

Dates, numbers, plural rules matter: French and Russian inflection is harder than string replacement. On a personal site, avoid dynamic sentence shapes where possible.

## Language Switcher Product Details

- After switch, stay on the "same page intent" (about → about), not always home.
- Do not silently hard-redirect by `Accept-Language` and break shared links; hint maybe, respect the URL.
- Fixed entry in header or footer — not buried three levels deep.

## Communicating When Content Is Out of Sync

Full five-language long-form sync is unrealistic. Honest product behaviour:

- UI language follows the switch;
- If no body in that language, say so and link "read Chinese version";
- Do not pretend auto-translation is human translation.

Search engines and users hate "looks five-language, opens thin duplicate". Missing translation beats fake translation.

## Engineering Pitfalls

- Missing nav key in one language — runtime falls back to English or blank;
- Only default language gets `og:locale` — share cards wrong language;
- Static generation forgets a language path — 404 in production;
- User content mixed with UI strings — translators break code.

Short checklist for a new language: open home, about, article list, privacy; click around.

## Content Collections and `lang`

Long-form lives in content collections with a `lang` field. Listing pages filter by current route language — not by filename alone. When adding `.en-GB.md` siblings, ensure the collection schema and filters know the field exists and defaults sensibly.

## RSS and Sitemaps

Feeds and sitemaps should respect language boundaries or declare alternates consistently. Half-localised RSS confuses readers who subscribed in one language and receive another.

## Closing Thoughts

Multilingual is an information system, not a skin. Fix URL and hreflang, then copy layers, then "add another language". This site chooses Chinese root, prefixed others, long-form filtered by language field — trading maintainability, not flag icon count.
