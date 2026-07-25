---
title: 'Theme Toggle Without Flash: Small Detail, Large Experience'
description: 'Dark mode that flashes white then black feels unfinished. How this site decides theme before the first paint.'
category: 'Engineering'
pubDate: 2026-07-23
updatedDate: 2026-07-25
lang: en-GB
tags: ['theming', 'dark mode', 'UX']
timeToRead: '11 min'
---

Dark mode is standard on personal sites, but implementation quality varies: some switch smoothly; others flash white on every refresh then snap dark, like a fluorescent tube warming up. The latter is often script timing; to visitors it feels like unfinished work.

## Where the Flash Comes From

Typical wrong order:

1. HTML renders with light default;
2. CSS and body paint;
3. Client JS reads `localStorage` / `prefers-color-scheme`;
4. `dark` class on `<html>` — sudden invert.

Users see a layout-level flash (cousin of FOUC). Slower Wi-Fi means longer white, worse harm.

## Right Posture: Decide Before Paint

Goal: **first frame should be final theme.**

Common pattern: tiny synchronous script early in `<head>` — read storage and system preference, set `html` class or `data-theme` immediately. It must:

- Block before body paint (deliberate small cost);
- Not depend on large framework hydration;
- Fail with clear fallback (e.g. follow system).

This site uses `html.dark` convention and a dedicated theme script component. Worst mistake when editing theme logic: "clean up" by moving inline script to bundle end — clean, and flash returns.

## What to Store, What Not to

- Store: user explicitly chose light / dark / system.
- Be careful: writing every system change as a fixed value locks old choice when user changes OS preference.

If user chose system, refresh should re-read media query, not forever remember yesterday's resolved theme as gospel.

## With Tailwind / CSS Variables

Dark is not simple invert. Neutral ramps, borders, code backgrounds need paired design. Script only toggles class; feel lives in design tokens. Perfect script with weak contrast still fails dark mode.

## Accessibility and Motion

Theme switch should not animate whole-page flash. Respect `prefers-reduced-motion`. Toggle needs accessible name ("Switch dark mode"), not icon-only mystery.

## Regression Checklist

After Header or layout changes:

1. Hard refresh with system dark — first screen already dark?;
2. Manual light choice — persists on refresh?;
3. Cleared storage — sensible fallback?;
4. No JS (extreme) — at least one readable default theme?.

## Why This Matters on a Content Site

Readers on articles at night are exactly the audience dark mode serves. A flash on every navigation says "client app" when you wanted "document". For a statically generated personal site, that mismatch is especially noticeable.

## Coordination With Colour Tokens

When I add a new component, I check it in both themes before merge — not only screenshot light mode. Borders that disappear in dark, code blocks that glow too bright, and link colours that fail contrast are all theme bugs, not "dark mode polish later".

## System Preference Changes

If a visitor sets OS to dark while the tab stays open, behaviour depends on whether they chose "system" or a fixed theme in the site toggle. I document this in the UI label: "System" means re-evaluate on load, not live-sync every OS change — live sync adds listeners and edge cases for little gain on a reading site.

## Testing in Slow Conditions

Throttle CPU and network in devtools when validating theme script. Flash that lasts fifty milliseconds on a fast laptop can last half a second on an old phone — the same bug, different severity. If flash only appears under throttle, it still ships to real users.

## Print and PDF Edge Cases

Some visitors print articles or save PDF. Theme flash is a screen problem, but hard-coded light backgrounds in print stylesheets are a related footgun. If you add print CSS, test one long article in print preview in both saved theme preferences.

## FOUC Family

Theme flash sits beside font flash and layout shift. Fixing theme does not fix web fonts loading late — but visitors blame "the site flickers" as one experience. Ship theme script first; font strategy (`font-display`, subsetting) is the next layer.

## Closing Thoughts

Flash-free theme is a signal the site owner finishes edges. It does not appear on a feature list, but speaks on every visit. Move decision before paint, get tokens right, separate explicit user choice from system preference — three steps usually enough.
