import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://alexander.xin',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'zh-CN',
        locales: {
          'zh-CN': 'zh-CN',
          'en-US': 'en-US',
          'en-GB': 'en-GB',
          'fr': 'fr',
          'ru': 'ru',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en-US', 'en-GB', 'fr', 'ru'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
