---
title: "Security Headers on Static Sites: _headers, CSP, and Trade-offs"
description: "Static sites can take security headers seriously. Cloudflare/Pages-style _headers, the pain of strict CSP, and how this site balances them."
category: "Technical Practice"
pubDate: 2026-07-06
updatedDate: 2026-07-25
lang: en-GB
tags: ["security", "CSP", "Cloudflare"]
timeToRead: "13 min"
---

No server-side session logic on a static site does not mean the browser side can be ignored. Clickjacking, MIME sniffing, and runaway third-party scripts can still wreck a personal site. Good news: on GitHub Pages plus Cloudflare-style setups, `_headers` (or platform equivalents) can spread baseline security headers sitewide.

## Baseline First, Perfect CSP Later

For almost any static site I recommend at least:

- **`X-Content-Type-Options: nosniff`**
- **`Referrer-Policy`** (chosen to match how much referrer you expose)
- **`X-Frame-Options` or CSP `frame-ancestors`**
- **`Permissions-Policy`** disabling camera, microphone, etc. you do not need

These are low cost, clear benefit. Do not wait until "perfect CSP is researched" to deploy them.

## How to Think About `_headers`

Cloudflare Pages reads `_headers` from build output and attaches response headers by path. Common pattern: file in `public/_headers`, copied to output on build.

Intuitive shape:

```txt
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

Paths can be finer: stricter on `/admin/*`, looser on static assets. Global safe first, exceptions second.

## CSP: Most Useful, Easiest to Lock Yourself Out

Content-Security-Policy limits script, style, frame, and connect targets. Ideal: `default-src 'self'`, short explicit third-party allowlist.

Real pain:

- Theme scripts, analytics, Turnstile, AdSense, font CDNs all need entries;
- Inline scripts need hash/nonce or `'unsafe-inline'` dulls the policy;
- One omission — white screen in production while local dev server policy differs.

My strategy:

1. **Inventory real sources** — Google Fonts? pagead? Cloudflare Turnstile?
2. **Widen by feature flag** — if ads disabled, do not pre-open all ad domains; change headers and privacy policy the day ads go live.
3. **Smoke test on real devices after CSP changes** — home, one article, about, contact, one tool page.
4. **Report-Only transition** if you have a collector — observe violations, then enforce.

Security pages, `security.txt`, PGP, acknowledgements are human-readable posture; response headers are machine-readable. Both together.

## Honest Relationship With Third Parties

Want simultaneously:

- Strict CSP;
- Personalised ads;
- Bot challenges;
- External fonts;

Accept a longer allowlist. That is product choice, not failure. Failure is **claiming security focus while headers are empty or a three-year-old example never updated for your domain.**

## Static Sites Still Need Care

- **Supply chain**: lockfiles, avoid casual script installs;
- **XSS**: Markdown and `set:html` escape hatches;
- **Secrets**: never commit tokens; public repos tempt "temporary" keys;
- **Redirects and cache**: wrong cache headers can stick old CSP on users.

## AdSense and CSP Together

Enabling ads often requires `pagead2.googlesyndication.com` and friends, sometimes awkward script loading. Suggestions:

- Keep policy tight while ads off;
- Same day: update `_headers`, privacy policy, `ads.txt`;
- Confirm ad iframe and main document in a private window — not only "empty slot on homepage".

Security headers and monetisation are change management: change together, test together, document together.

## HSTS and TLS (Briefly)

If Cloudflare terminates TLS, ensure HTTPS redirects and HSTS match your comfort level. HSTS with wrong cert configuration hurts more than it helps — enable when the chain is stable. Personal sites rarely need exotic TLS settings; they do need no mixed content and no accidental HTTP assets.

## Documenting Header Changes

I keep header changes in Git with a one-line commit reason: "CSP: allow Turnstile on contact" beats "update headers". Six months later you will not remember which third party forced which directive.

## Subresource Integrity

When loading third-party scripts you cannot avoid, SRI where supported reduces supply-chain tamper risk. Not every ad or analytics script allows fixed hashes — another reason to keep the third-party list short.

## Security.txt and Human Path

`/.well-known/security.txt` tells researchers how to reach you. Headers protect users in the browser; security.txt protects you when someone finds a real issue. alexander.xin keeps both — headers without contact path is half a posture.

## Closing Thoughts

Security headers on static sites are high-leverage engineering: baseline headers first, tighten CSP gradually, smallest holes for third parties you actually enable. `_headers` keeps policy in Git, reviewable, revertible. Security is not a homepage badge — it is still opening Network after deploy and confirming only what you promised loaded.
