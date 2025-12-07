# Changelog

All notable changes to this project will be documented in this file.

## [3.0.0] - 2025-12-05

### Refactor (Major)

- **Architecture Migration**: Completely migrated the project from a static HTML/CSS/JS structure to the **Astro** framework.
- **Component-Based Design**: Replaced monolithic HTML files with reusable `.astro` components (Header, Footer, MusicPlayer, etc.).
- **Styling**: Migrated custom CSS to **Tailwind CSS** for better maintainability and responsive design.
- **TypeScript**: Adopted TypeScript for improved type safety and developer experience.
- **Internationalization (i18n)**: Implemented a robust routing-based i18n system supporting multiple languages (en, zh-CN, etc.) via dynamic routes `[lang]`.
- **Directory Structure**:
  - Moved source code to `src/`.
  - Organized assets in `public/`.
  - structured pages in `src/pages/`.
- **Performance**: Leveraged Astro's island architecture for better performance and smaller bundle sizes.

### Removed

- Legacy HTML files in root and language subdirectories (e.g., `index.html`, `en/index.html`, `zh-CN/index.html`).
- Legacy CSS files in `css/` folder.
- Legacy JS files in `js/` folder.
- Deprecated beta features and unused assets.

## [2.4.0] - 2025-11-24

- Navigation bar modernization refactor.

## [2.3.0] - 2025-10-21

- UI/UX comprehensive optimization.
