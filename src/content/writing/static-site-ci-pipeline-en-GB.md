---
title: "CI for Static Sites: Every Push Proves It Still Builds"
description: "Personal sites deserve a short pipeline: install, check, build. How automation reduces 'only my machine passes'."
category: "Engineering"
pubDate: 2026-07-21
updatedDate: 2026-07-25
lang: en-GB
tags: ["CI", "GitHub Actions", "quality"]
timeToRead: "11 min"
---

The most common personal-project accident is not architecture collapse but: tweak i18n locally, forget build, push, Pages broken, you are on the tube. CI will not make you more creative; it makes you fail earlier — before merge.

## Minimum Useful Pipeline

For an Astro static site I want three steps:

1. **Clean dependency install** (lockfile, reproducible);
2. **`astro check` / type and template diagnostics**;
3. **`npm run build`** (actual static output).

If capacity allows: link check, Lighthouse CI, preview deploy. Do not stack ten badges before a green build exists.

## Why Local Green Is Not Enough

- Different Node version;
- Case-sensitive paths explode on Linux CI (Windows/macOS often forgive);
- Forgotten generated files or env vars;
- Template errors only on one language path.

CI on clean Linux is insurance for future-you and collaborators. Site constraints put build and check in pre-commit habit; CI automates the habit.

## Decouple From Deploy

Check pipeline and deploy pipeline can split:

- PR: prove build only;
- `main`: publish after green, clear CDN cache if needed.

On failure, logs should say which page, which collection entry. No on-call team on a personal site — logs are the colleague.

## Do Not Let CI Become Costume

- Culture of skipping hooks rots quality fast;
- Secrets in workflow logs equal public;
- Meaningless daily full scans waste minutes and teach ignoring red lights.

Short, stable, aligned with real risk — good CI.

## Extra Benefit Under Student Schedules

Exam weeks, less brain: push, wait for green tick, close laptop. Red — read summary, no remembering "last manual build incantation". Automation is kind to fragmented time.

## What I Do Not Automate Yet

Perfect is enemy of useful. I skip nightly Lighthouse on every commit — noise. I skip deploy on every feature branch — cost. The bar is "broken build cannot merge", not "enterprise maturity score".

When CI fails, fix or revert same day if possible. Red main branch on a public personal site is embarrassing in a way only you notice at first — then everyone does.

## Branch Protection Without Bureaucracy

Even solo, I treat `main` as protected: PR or at least CI on push. It sounds corporate for one person, but future-you during a tired evening is a different person from morning-you who wrote the template. The pipeline is the sober second opinion.

## Caching in CI

Dependency cache speeds installs; do not cache yourself into stale lockfile surprises. When `package-lock.json` changes, accept a slower run once. A green build on fresh install matters more than saving ninety seconds.

## Notifications Without Noise

I enable failure email on CI for `main` only. Every green build ping trains ignore. One red email on a site you care about is enough to fix before visitors notice.

## Local Parity

Node version in `.nvmrc` or `engines` in `package.json` should match CI. Document it in README one line. "Works on my Node" is the bug CI exists to kill.

## When CI Is Overkill

A throwaway experiment repo does not need Actions on day one. alexander.xin is public, long-lived, and multi-language — CI pays rent immediately. Match pipeline weight to project lifespan.

## Closing Thoughts

CI goal for static sites is not enterprise maturity rating but one sentence: **what you push should build by default.** Make install, check, build mandatory first; fancier gates later. Failing before merge is responsibility to visitors.
