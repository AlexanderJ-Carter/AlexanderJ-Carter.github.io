---
title: 'Static Sites Still Need Numbers: Choosing Privacy-Friendly Analytics'
description: "A personal site does not need GA4's full portrait. This piece records how I balance seeing traffic and not tracking visitors."
category: 'Technical Practice'
pubDate: 2026-06-08
updatedDate: 2026-07-25
lang: en-GB
tags: ['privacy', 'analytics', 'static sites']
timeToRead: '12 min'
---

Every personal site reaches the same question sooner or later: where do visitors come from? Which posts actually get read? Is anyone here besides me refreshing the homepage?

The default answer for many people is Google Analytics. It is capable, well documented, and the dashboards look polished — but the trade-offs are obvious: cookies, cross-site identifiers, consent banners, and a privacy policy that keeps growing. For a static site that values clarity, stability, and minimal tracking, that stack often feels too heavy.

This is not a vendor leaderboard. It is the decision framework I use when choosing, and the principles that ended up on alexander.xin.

## You Need Very Little Data

Start by writing down the goal. For me, site analytics only need to answer four questions:

1. **Which pages get opened** — rough proportions across home, writing, gallery, and tools.
2. **Where traffic comes from** — search, referrals, direct visits; coarse granularity is enough.
3. **Broad device and browser distribution** — enough to spot mobile layout problems.
4. **Whether anything spikes unusually** — for example when a post gets shared and traffic jumps.

I do not need: cross-site profiling, funnel journeys, remarketing audiences, or year-long session replay at individual level. Those tools are powerful, but they are not core to a personal digital studio.

**Data minimisation is not a slogan; it is a selection criterion.** If a tool collects fields by default that you cannot act on, it does not belong near your footer.

## "Cookie-Free" Is Not Enough — Check Whether Identity Persists

Many products advertise "no cookies" or "GDPR friendly". Ask two more layers:

- **Does anything persistent get written on the device?** Cookies, `localStorage`, fingerprinting scripts — all are ways to "remember this person".
- **Does the server stitch IP and user agent into a hash that can be linked across days?** If the salt never rotates and retention is long, regulators may not consider it cleaner than cookies.

A safer posture:

- Do not build long-term visitor profiles;
- Aggregate statistics by day where possible;
- Do not store raw IPs, or hash and discard immediately;
- Keep the field whitelist short enough to fit in one or two paragraphs of your privacy policy.

My privacy page mentions AdSense and cookies because advertising compliance requires it. **Analytics should follow a separate, more restrained set of rules** — add numbers when needed, not default sitewide tracking.

## Three Common Routes

### 1. Hosted privacy-oriented products

Tools like Plausible, Fathom, or Simple Analytics. Pros: quick setup, adequate dashboards, often no consent banner. Cons: still third-party — you hand traffic summaries to someone else and must trust their data residency and business model.

Best for: personal sites that want trends quickly without running infrastructure.

### 2. Self-hosted open source (Umami, Matomo in lean mode, etc.)

Data lives on your server or cloud account; audit boundaries are clearer. Cost: upgrades, backups, domain and HTTPS, and ensuring the analytics service itself does not become an attack surface.

Best for: people who already run a stable VPS or containers and actually open the dashboard.

### 3. Minimal self-built pixel

A single server endpoint recording URL, referrer, coarse country/device bucket, written to logs or a small database. No dashboard is fine — occasional script summaries are enough.

Best for: very low traffic when you only need to confirm the site is alive. alexander.xin could have stayed here for a long time.

## Living Alongside Ads and Consent Banners

Analytics and advertising are different things:

- **Privacy-friendly reach statistics** can often work without ad-grade cookies.
- **Personalised advertising** (such as AdSense) typically introduces third-party cookies or similar technologies; the privacy policy must say so clearly and offer a path to opt out of personalisation.

Do not write "we use cookie-free analytics" and imply "this site tracks nothing". Honesty beats slogans. Visitors can tell the difference between aggregated operational data and advertising network behaviour.

## Principles I Apply to This Site

1. **No heavy analytics scripts by default.** Pages stay statically cacheable with low main-thread cost.
2. **If I add analytics, prefer short scripts, no persistent identifiers, minimal fields.** Self-host when ops cost is acceptable; otherwise choose a host with explicit data-minimisation commitments.
3. **Keep the privacy policy aligned with behaviour.** Update copy the same day scripts change; do not leave stale statements online.
4. **Do not collect fields for a pretty dashboard.** If I would not change the site based on a metric, I should not collect it.

## When It Is Fine to Install Nothing

- The site just launched and content matters more than curves;
- I have no bandwidth to interpret data — another third party would only add weight;
- I am tightening performance and CSP and do not want extra holes.

"Not yet" is a complete decision. Install later when publishing rhythm stabilises. Do not pile trackers temporarily to satisfy a platform — that helps neither content nor trust.

## Closing Thoughts

Static sites deserve a basic sense of traffic without becoming tracking terminals. When choosing analytics, write down the four questions first, then pick the layer that is just enough — hosted, self-hosted, or a home-grown pixel. What matters is: **collect little, explain clearly, and use what you collect.**

When I eventually attach a specific analytics stack to alexander.xin, the vendor and configuration will go in the privacy policy — not hidden in footer fine print.
