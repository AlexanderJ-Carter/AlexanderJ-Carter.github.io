import type { RequiredDataFromCollectionSlug } from 'payload'

/**
 * Unseeded fallback homepage — high-impact composition without CMS media.
 * HighImpactHero falls back to a public gallery still when `media` is empty.
 */
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'highImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Alexander Carter',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '用镜头记录光线，用文字整理思绪。',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: '进入画廊',
          url: '/gallery',
        },
      },
      {
        link: {
          type: 'custom',
          appearance: 'outline',
          label: '阅读写作',
          url: '/posts',
        },
      },
    ],
  },
  meta: {
    description: '摄影与写作。影像、研究与工具都在这里。',
    title: 'Alexander Carter',
  },
  title: '首页',
  layout: [],
}
