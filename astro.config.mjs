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
  build: {
    inlineStylesheets: 'auto',
  },
  // 图片优化配置
  image: {
    // 优先使用 AVIF 格式（比 WebP 小 50%，比 JPEG 小 70%）
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
          // 模块预加载优化
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
    host: true, // 允许通过局域网 / Tailscale IP 访问（如 http://100.x.x.x:4321）
    port: 4321,
  },
});
