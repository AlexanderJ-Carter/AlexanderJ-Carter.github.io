import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const sitemapExcluded = (page) => {
  const pathname = new URL(page).pathname
    .replace(/^\/(?:zh-TW|en|fr|ru)(?=\/|$)/, '')
    .replace(/\/+$/, '');

  return (
    ['/verify', '/login', '/next'].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    ) ||
    ['/writing/tags', '/writing/categories', '/writing/archive'].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    )
  );
};

// https://astro.build/config
export default defineConfig({
  site: 'https://alexander.xin',
  integrations: [
    sitemap({
      filter: (page) => !sitemapExcluded(page),
      i18n: {
        defaultLocale: 'zh-CN',
        locales: {
          'zh-CN': 'zh-CN',
          'zh-TW': 'zh-TW',
          'en-GB': 'en',
          fr: 'fr',
          ru: 'ru',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'zh-TW', 'en-GB', 'fr', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  output: 'static',
  session: false,
  // Prefer previous HTML whitespace behavior after Astro 6+/7 compressHTML changes.
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: [],
    remotePatterns: [{ protocol: 'https' }],
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[hash][extname]',
          chunkFileNames: 'chunks/[hash].js',
          manualChunks: (id) => {
            if (id.includes('tailwindcss')) {
              return 'vendor-tailwind';
            }
          },
        },
      },
    },
  },
  server: {
    host: true,
    port: 4321,
  },
});
