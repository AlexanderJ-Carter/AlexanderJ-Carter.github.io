# AlexanderJ-Carter.github.io

This repository contains the source files for a static website.

## CSS & JS Cleanup (2024)

- Unused styles and scripts were removed:
  - `css/styles.min.css`
  - `css/loading.css`
  - `js/404-detector.js`
  - `js/device-detector.js`
  - `js/main.min.js`
  - `js/bootstrap.bundle.min.js` (switched pages to CDN)
- Several HTML pages were updated to load Bootstrap from a CDN instead of the
  removed local copy.

Feel free to extend the site by adding content under the language folders
(`en`, `it`, `jp`, `zh-CN`). CSS and JS assets reside in the top-level `css`
and `js` directories.
