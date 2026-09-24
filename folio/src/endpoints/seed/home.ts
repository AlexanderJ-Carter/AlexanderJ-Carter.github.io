import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

function richText(heading: string, body: string) {
  return {
    root: {
      type: 'root' as const,
      children: [
        {
          type: 'heading' as const,
          children: [
            {
              type: 'text' as const,
              detail: 0,
              format: 0,
              mode: 'normal' as const,
              style: '',
              text: heading,
              version: 1 as const,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          tag: 'h1' as const,
          version: 1 as const,
        },
        {
          type: 'paragraph' as const,
          children: [
            {
              type: 'text' as const,
              detail: 0,
              format: 0,
              mode: 'normal' as const,
              style: '',
              text: body,
              version: 1 as const,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1 as const,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1 as const,
    },
  }
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: '阅读文章',
            url: '/posts',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: '关于',
            url: '/about',
          },
        },
      ],
      media: heroImage.id,
      richText: richText('Alexander Carter', '摄影与写作之外，也在做 LLM Agent 研究。'),
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    tag: 'h2',
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '最近在做',
                        version: 1,
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '写作与摄影之外，也在做 LLM Agent 相关公开研究。站外还有 MyCook、Gitea 与 IT-Tools，本站只做入口。',
                        version: 1,
                      },
                    ],
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
      {
        blockType: 'cta',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h2',
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: '写信过来',
                    version: 1,
                  },
                ],
              },
              {
                type: 'paragraph',
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: '合作、反馈或打个招呼都可以。',
                    version: 1,
                  },
                ],
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
              label: '联系',
              url: '/contact',
            },
          },
          {
            link: {
              type: 'custom',
              appearance: 'outline',
              label: 'GitHub',
              url: 'https://github.com/AlexanderJ-Carter',
              newTab: true,
            },
          },
        ],
      },
    ],
    meta: {
      description: '摄影与写作之外，也在做 LLM Agent 研究。',
      image: metaImage.id,
      title: 'Alexander Carter',
    },
    title: '首页',
  }
}
