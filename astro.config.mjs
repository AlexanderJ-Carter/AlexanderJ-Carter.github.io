import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://alexander.xin',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh-CN',
        locales: {
          'zh-CN': 'zh-CN',
          'zh-TW': 'zh-TW',
          'en-GB': 'en-GB',
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
