# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security

- Apex `legacy-redirect` Worker now attaches page security headers (CSP, COOP, nosniff, frame deny) on HTML; discovery/MCP responses get a slimmer API header set.
- Removed deprecated `X-XSS-Protection`; CSP allowlists `sdk.jinrishici.com` / `v2.jinrishici.com`.
- Replaced `tj-actions/changed-files` (CVE-2025-30066 class) with full-repo `npm run format:check`; `npm audit --audit-level=high` now fails CI.
- Third-party GitHub Actions pinned to commit SHAs (`action-gh-release`, `lighthouse-ci-action`).
- Poem/weather/search/toast/holiday/calendar DOM output no longer interpolates untrusted text into `innerHTML`.

### Changed

- Astro 7.1.3 → 7.2.3; GitHub Actions majors (`checkout`/`setup-node` v7, Pages deploy v5/v6).
- Explicit `session: false` for this static site; Node engine documented as `>=22.12.0`.
- Build scripts import TypeScript data with `node --experimental-strip-types` so Node 22.12+ matches CI.

### Added

- AdSense ownership metadata, Google CMP privacy-settings entry point, and low-density manual ad deployment variables.
- Commercial licensing, commissioned work, brand partnership, and open-source sponsorship options on Support and Contact.
- Registry entries for `home` / `hermes` / `gateway` / `newyear`; `contact.alexander.xin` Worker 301 → `/contact/`.
- Fleet timeline (`src/data/fleet-changelog.ts`) for maintainers only: Ops Portal `/fleet-changelog.json` (proxied from www `/ops/fleet-changelog.json`); not shown on public Network.
- Ops Portal cron (10m) probe diffs with optional Resend email; public `/help` + Worker `/api/help` with `help/kb.json`, IP rate limits, and OmniRoute (dedicated limited key).
- Mini site-help ask on Network, Contact, and 404 (same `/api/help`).
- Public `/changelog` page (five locales) synced from `CHANGELOG.md`.
- Writing: Darkroom Folio design-system essay (zh-CN, zh-TW, en-GB, fr, ru).
- `src/data/gallery.ts`: deduplicated gallery catalog (29 items × 5 locales).
- en-GB translations for six previously zh-CN-only posts (performance, Astro upgrade, tools, design resources, minimalism, composition).
- fr/ru translations: theme toggle, personal-site i18n, static-site CI, reading-list page.
- fr/ru translations: security headers, site architecture, Uses page, minimal design, street photography ethics.
- fr/ru translations: performance log, minimalist design, composition, design resources, dev tools, Astro upgrade (completes writing i18n for en-GB set).

### Changed

- Privacy and terms copy now covers AdSense consent, third-party data use, sponsorships, affiliate disclosure, and commercial licensing in all locales.
- Ads are limited to one home placement and one post-content placement; taxonomy, archive, legal, support, tool, gate, and experimental pages remain ad-free.
- Login, verification, experimental, and writing taxonomy/archive pages are excluded from indexing and the generated sitemap while About and Contact retain Turnstile protection.
- Header / Footer / Home / Now / Friends / QuickActions / Sitemap elsewhere links share `site-registry` helpers; Tools / Next / Atlas use the same curated ID sets; Network hides off-season `newyear` and `cook-mcp`.
- Public surfaces no longer promote Access IT-Tools.
- About: clearer reserved personal dossier copy; slots remain empty.
- Projects: main site marked completed; fr/ru writing channel entries added.
- Changelog linked from header, footer, tools index, Now quick links and RelatedTools.
- Uses page: site guide wired to i18n; tools link fixed; changelog noted in features.
- Projects data consolidated into `src/i18n/pages/projects.ts` (single source).
- Timeline: 2026 changelog milestone; data moved to `src/i18n/pages/timeline.ts`.
- Now page copy moved to `src/i18n/pages/now.ts`.
- Gallery template slimmed; categories, items and source UI from `src/data/gallery.ts`.
- Site registry: changelog entry for fleet discovery.

## [3.2.1] - 2026-07-30

### Added

- `ExposureMeter` chrome widget (live Asia/Shanghai clock → `/now`) and `CopyPermalink` on writing pages.
- Home: Darkroom method principles (Expose / Focus / Print) and AgentSociety research strip.
- About: reserved personal dossier slots (portrait / bio / background / education / interests / timeline).

### Changed

- Film-edge header nav with indexed items, progress rail, and quieter brand mark.
- Gallery contact-sheet / lightbox mat polish; writing list & post templates aligned to folio chrome.
- Footer / PageHero micro-polish for the same visual language.

## [3.2.0] - 2026-07-30

### Added

- Free-tier agent discovery: Link / catalog / MCP / DNS-AID / WebMCP, served via Worker with hardened `.well-known` publish.
- Magazine-style `/sitemap`, Afdian `/support`, and Now-page weather (Open-Meteo, Beijing fallback).
- Expanded original writing posts with locale versions; deeper reading-list notes and curated essay links.
- Fun studio toys: Exposure Triangle, Daily Frame; SomaFM stations in MusicPlayer / AmbientRadio.
- Sitewide MusicPlayer, holiday greeting, homepage poem / on-this-day; multilingual `/tools`, RSS feeds, View Transitions.
- Legal chrome: licence + accessibility links; optional ICP/备案 via env; site notice config; AdSense reserved slots.

### Changed

- Upgraded runtime to Astro 7; cleared npm audit / CI quality issues; Cloudflare cache purge after GitHub Pages deploy.
- Darkroom Folio visual system: cyanotype paper tokens, contact-sheet / folio-mark language, Studio Dock rail.
- Structure pass: `components/{chrome,widgets,templates}`, shared `i18n/routing` (no duplicate `/zh-CN`/`/en-GB` trees).
- About page focused on AgentSociety research and selected work; homepage / chrome editorial polish.
- Gallery contact-sheet grid; music covers as cyanotype sleeves; quieter header/footer and blank-frame 404.
- Source license set to BSD-3-Clause; gallery source JPGs untracked (optimized assets remain).

### Fixed

- Service Worker no longer precaches missing `/css/global.css`.
- Prettier Code Quality gate failures after template moves; MusicPlayer layout / positioning bugs.
- Real AdSense publisher id in `ads.txt`; dependency audit and CI Action deprecations.

### Removed

- Unused aurora / glitch / particle / liquid-glass CSS and dead widget components.
- Stale docs under archive / design / performance / superpowers.

## [3.0.1] - 2026-03-19

### Added

- Added `CLAUDE.md` as a concise AI collaboration guide.
- Added image skeleton placeholders and progressive reveal behavior on gallery cards.
- Added a functional contact form section with client-side validation feedback and mailto handoff.
- Added quick access links on security policy page (security.txt, PGP key, GitHub SECURITY.md).
- Added a license quick-map block linking source-code and content-license boundaries.

### Changed

- Updated security pages' "last updated" metadata to keep policy timestamps consistent.
- Refined Dependabot configuration with grouped update strategy and labels.
- Updated README with AI collaboration section and refreshed documentation index.
- Synchronized AI instruction files (`AGENT.md`, `.github/copilot-instructions.md`, `CLAUDE.md`).

### Fixed

- Fixed malformed brace structure in `src/styles/global.css` appended animation blocks.

### Removed

- Removed duplicate phase summary document to reduce documentation redundancy.

## [3.0.0] - 2026-03-19

### Added

- Enhanced CI/CD pipeline with multiple quality checks (lint, type check, audit)
- Comprehensive .gitignore with better coverage for IDE, OS, and editor files
- Strengthened Markdown linting configuration with consistent rules
- Improved security audit automation in GitHub Actions
- Prettier code formatting validation in CI/CD pipeline

### Changed

- Migrated to Astro v5 with improved performance and features
- Upgraded Node.js compatibility to v20 LTS
- Enhanced type checking with Astro's strict TypeScript config
- Improved workflow permissions management for better security

### Fixed

- Fixed ajv ReDoS vulnerability in dependencies via npm audit fix
- Updated dependency versions for security and compatibility

### Security

- Added npm audit --audit-level=moderate check in CI/CD
- Improved .gitignore to protect local environment variables
- Enhanced build pipeline with type checker before deployment

---

## [2.0.0] - 2024-Q4

### Added

- Multi-language support (zh-CN, zh-TW, en-GB, fr, ru)
- i18n routing with proper locale prefix handling
- Security policy pages (/security/policy, /security/acknowledgments)
- RFC 9116 compliant security.txt at /.well-known/security.txt
- PGP key support for encrypted security reports
- Accessibility improvements (WCAG 2.1 compliance)
- Dark mode theme switching with persistent preference
- Custom scroll animation system with intersection observer

### Changed

- Restructured project with template pattern for i18n
- Updated styling with Tailwind CSS v3
- Improved component organization with proper TypeScript interfaces

---

## [1.0.0] - 2024-Q1

### Added

- Initial personal portfolio website launch
- Astro-based static site generation
- Tailwind CSS styling framework
- GitHub Pages deployment pipeline
- Multi-page layout with home, about, projects, gallery
- Music player component
- Interactive tools (time, currency, calendar, QR code)
- SEO optimization with sitemap generation
- Open Graph and structured data support
- Cookie consent banner
- Reading progress indicator
- Site-wide search functionality

### Security

- BSD 3-Clause license for source code
- CC BY-NC-ND 4.0 license for content
- Initial security policy framework

---

## Types of Changes

- **Added** for new features.
- **Changed** for changes in existing functionality.
- **Deprecated** for soon-to-be removed features.
- **Removed** for now removed features.
- **Fixed** for any bug fixes.
- **Security** for vulnerability fixes and security improvements.
