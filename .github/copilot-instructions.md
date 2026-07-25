# GitHub Copilot Instructions

## Project Context

This is a personal portfolio website built with **Astro v7**, **Tailwind CSS**, and **TypeScript**. It uses a static site generation (SSG) approach and is deployed via GitHub Pages.

## Architecture & Patterns

### 1. Template Pattern for i18n

The project uses a specific "Template" pattern to handle internationalization without code duplication.

- **Pages** (`src/pages/*.astro` and `src/pages/[lang]/*.astro`) are thin wrappers.
- **Templates** (`src/components/templates/*.astro`) contain the actual UI and logic.
- **Flow**:
  1. `src/pages/index.astro` (Default Lang) -> imports `HomeTemplate` -> passes `lang="zh-CN"`.
  2. `src/pages/[lang]/index.astro` (Other Langs) -> imports `HomeTemplate` -> passes dynamic `lang`.

**Example:**

```astro
// src/pages/about.astro import AboutTemplate from
'../components/templates/AboutTemplate.astro';
<AboutTemplate lang="zh-CN" />
```

### 2. Internationalization (i18n)

- **Config**: Defined in `astro.config.mjs` and `src/i18n/ui.ts`.
- **Translations**: UI strings are stored in `src/i18n/ui.ts` as a dictionary object keyed by language code (e.g., `zh-CN`, `en-GB`).
- **Usage**: Use the `useTranslations` helper in components/templates.

  ```ts
  import { useTranslations } from '../../i18n/ui';
  const t = useTranslations(lang);
  // Usage: {t('nav.home')}
  ```

- **Routing**:
  - Root files (`/`) serve `zh-CN`.
  - `[lang]` directory handles `zh-TW`, `en-GB`, `fr`, `ru`.

### 3. Styling & Theming

- **Tailwind CSS**: Primary styling method.
- **Dark Mode**:
  - Controlled by the `dark` class on the `<html>` element.
  - Logic resides in `src/components/ThemeScript.astro` using an `is:inline` script to prevent FOUC.
  - Use `dark:` prefix in Tailwind classes (e.g., `dark:bg-gray-900`).

### 4. Animation System

The project uses a custom `IntersectionObserver` setup in `src/scripts/scroll-animations.ts`.

- **Reveal Effects**: Add these classes to elements to trigger scroll animations:
  - `.reveal`: Standard fade-in.
  - `.reveal-left`: Slide in from left.
  - `.reveal-right`: Slide in from right.
  - `.stagger`: For staggered child animations.
- **Parallax**: Add `.parallax-layer` and `data-speed="0.5"` for scroll parallax effects.

## Critical Workflows

### Development

- **Start Server**: `npm run dev`
- **Build**: `npm run build` (includes `astro check` for type safety)
- **Type Check**: `npx astro check`

### Key Directories

- `src/components/templates/`: **Core logic lives here.** Edit these files for page content changes.
- `src/i18n/`: Translation definitions.
- `public/`: Static assets (images, music, security keys).
- `src/scripts/`: Client-side TypeScript (e.g., scroll animations).

## Coding Conventions

- **TypeScript**: Enforce strict typing in `.astro` frontmatter and `.ts` files.
- **Astro Props**: Define `Props` interface for all components.

  ```ts
  interface Props {
    lang: string;
    // other props
  }
  const { lang } = Astro.props;
  ```

- **Client Directives**: Use `client:load` or `client:visible` sparingly, only for interactive components (e.g., `MusicPlayer`, `Typewriter`). Default to static HTML.

## Repo Guardrails

- Keep AI instruction files aligned: `AGENT.md` (full rules) and `CLAUDE.md` (concise Claude rules).
- Do not remove or break security disclosure assets:
  - `public/.well-known/security.txt`
  - `public/security/pgp-key.asc`
  - `src/pages/security/policy.astro`
  - `src/pages/security/acknowledgments.astro`
  - `.github/SECURITY.md`
- `public/music/manifest.json` is generated. Prefer `npm run build` (or `npm run generate-music`) instead of manual edits.
