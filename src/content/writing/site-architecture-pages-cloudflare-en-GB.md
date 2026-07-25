---
title: "Site Architecture: How GitHub Pages and Cloudflare Run Together"
description: "A path from Markdown to the global edge. Why this site is statically generated, how it deploys, and where the boundaries lie."
category: "Technical Practice"
pubDate: 2026-07-10
updatedDate: 2026-07-25
lang: en-GB
tags: ["architecture", "GitHub Pages", "Cloudflare"]
timeToRead: "12 min"
---

People ask what backend powers alexander.xin. Short answer: usually no traditional backend. Long answer is this piece — from content to build to how GitHub Pages and Cloudflare stack.

## Target Shape

I want a personal site that is:

- **Cheap and durable** — should not die easily if I neglect it over a holiday;
- **Fast** — document pages should not pay framework hydration tax;
- **Auditable** — config in Git, security headers and redirects reviewable;
- **Evolvable** — Workers, forms, ads later without throwing everything away.

That narrows to: Astro SSG + Git-hosted build output or Pages build + Cloudflare in front for DNS, cache, and protection.

## What Happens at Build Time

On local or CI build, Astro compiles:

- `src/pages` routes;
- layouts in `templates`;
- `content/writing` Markdown;
- `i18n` strings;

into a static tree: HTML, CSS, little JS, images, and raw `public/` assets (`ads.txt`, `_headers`, `.well-known`).

No "request arrives, query database, render about page". About page is HTML at build time.

## Role of GitHub Pages

The repository is source of truth. GitHub Pages (or equivalent static host) serves build output. For personal projects: familiar permissions, PR workflow, controllable cost.

Watch for:

- Custom domain and HTTPS correct;
- `404` and trailing-slash behaviour as expected;
- No secrets in Actions logs or public variables.

## Role of Cloudflare

In front of the domain Cloudflare typically handles:

- **DNS and proxy**;
- **Edge cache and compression**;
- **WAF / basic bot management** (per plan and rules);
- **Platform features**: `_headers` semantics, redirects, Workers (legacy redirect logic here when needed).

Know your cache policy: HTML vs hashed assets differ; if an article looks stale after publish, check cache and deploy before suspecting build.

## Dynamic Capability at the Edge, Not Forced Into SSG

Contact forms, bot challenges, special redirects need not mean sitewide SSR. Common pattern:

- Pages stay static;
- Submissions hit third party or Worker;
- Verification gates use client session markers (About/Contact protection on this site is that kind of product choice).

Ad scripts are build-time gated: no publisher id in env — no injection, no hollow requests.

## What I Explicitly Gave Up

- **Runtime CMS dependency** — writing is Markdown + Git; edit anywhere, offline too.
- **Heavy TMS for multilingual** — five-language UI is enough complexity; long-form thick in Chinese first.
- **Personal site as microservices demo** — if static files suffice, no always-on processes.

## How to Think When Something Breaks

1. Did build go green? (`build` / `astro check`)
2. Deployed to correct branch/environment?
3. Cloudflare cache or rules holding old assets?
4. Only one language path 404?

Layered debugging beats "restart something".

## Cost and Complexity Bill

Monthly cash cost can approach zero (traffic and plan dependent), but mental cost is not zero:

- You must understand DNS, cache, Pages build logs;
- No admin UI to edit copy — change Markdown, open PR, wait for deploy;
- You own security headers and dependency upgrades.

The bill works for me: control and portability. Static files stay static if you change host. If non-technical editors need frequent copy changes, add a Git-based CMS on SSG rather than jumping to a database.

## Mapping to This Repo (Sketch)

- `src/content/writing`: long-form;
- `src/components/templates`: page shape;
- `src/pages`: thin routes;
- `public/`: raw assets, `_headers`, `ads.txt`;
- Workers / verification: only seams that truly need dynamism.

Reading directories beats architecture diagrams. New you (or a collaborator) should find "where to change homepage copy" within an hour.

## Deploy Timing and Expectations

Static deploy is not instant globally. After merge, I expect minutes before HTML updates everywhere — DNS, build queue, cache purge. Writing that in your head prevents panic-refreshing and duplicate "fix cache" commits.

## Migration Path

Because output is files, migration is copy the `dist` folder or point DNS elsewhere. I keep the architecture boring partly so vendor lock-in stays low. Your content in Git is the real asset; the host is interchangeable plumbing.

## Closing Thoughts

This architecture is deliberately boring: generate static files, put on reliable hosting, Cloudflare for edge and shield. Boring buys time for writing, photography, and interaction worth having. If you are building a personal site, get this path working first — then decide on Workers, databases, push notifications. Most of the time HTML is enough.
