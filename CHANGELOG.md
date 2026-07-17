# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Editorial redesign: photography-first homepage, Syne + Source Serif 4 / Noto Serif SC type system, cooler paper palette, teal accent (replacing purple).
- Header navigation without emoji; quieter glass surfaces and editorial buttons.
- Gallery / Writing / About / Projects page headers aligned to the new visual language.
- Homepage content extracted to `src/i18n/pages/home.ts`; removed decorative particle / orbit / stats clutter from the home path.
- Pinned Astro to `~5.18.2` to avoid Astro 6 “0 pages built” regression.
- Full-site template pass: shared `PageHero`, content/tools/legal pages strip mesh badges and heavy cards; `/tools` becomes an editorial index; RelatedTools without emoji.
- Chrome polish: flattened Header (Gallery/Writing/Projects/About/More), quieter Footer/BackToTop/Cookie/QuickActions/Share/Shortcuts FABs; editorial 404; nested nav active states.
- Local verify skip (`import.meta.env.DEV` / `PUBLIC_SKIP_VERIFY`), AdSense reserved slots (`AdSlot` + `.env.example`), micro-interactions, content enrichment; removed unused widget components and stale `docs/archive` reports.
- Reading list rewritten as deep notes: three reading routes, longer reflective `thought` + practice `takeaway` per book, and curated essay links (Hara / Barnbaum / Sontag / CSAPP / Meadows et al.).
- About page rebuilt from GitHub profile: readable bio (fixed prose bold contrast), research / AgentSociety 2 publication, selected work, stack chips; removed skill-radar and percent bars.
- Restored playful utilities: sitewide MusicPlayer + holiday greeting, homepage daily poem / on-this-day, `/fun` corner with pomodoro & weather; entry in More / Tools.
- Studio craft pass: paper/film grain + vignette, warmer ink dark mode, premium hero (viewfinder, grain, light sweep), slim footer; `/fun` adds calculator, password, color picker, countdown, ambient radio.
- AdSense slots stay mounted as code reservations only — no visible placeholder when client/slot env is empty.
- Legal chrome: footer/More link licence + accessibility; reserved ICP/公安备案 via env (hidden when empty); site notice banner/modal via `src/config/notice.ts` (`enabled: false` by default).
- Cyanotype studio palette, magazine sitemap index, support page (Afdian), Now weather with Beijing fallback, blank-frame 404; removed stale docs (`archive` / design / performance / superpowers) and unused widget components.
- Service Worker no longer precaches non-existent `/css/global.css` (Astro hashed `/_astro` assets).

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
