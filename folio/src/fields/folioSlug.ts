import type { RowField } from 'payload'
import { slugField } from 'payload'

type Kind = 'pages' | 'posts'

/** 带中文说明的自定义地址（slug） */
export function folioSlugField(kind: Kind) {
  return slugField({
    overrides: (field: RowField) => {
      const next = { ...field, fields: [...field.fields] }
      next.fields = next.fields.map((f) => {
        if ('name' in f && f.name === 'slug' && f.type === 'text') {
          return {
            ...f,
            label: '自定义地址',
            admin: {
              ...f.admin,
              description:
                kind === 'posts'
                  ? '对应前台 /posts/你的地址。保存后稳定，勿随意改线上已分享链接。'
                  : '对应前台 /你的地址；home 为首页 /。可用「重定向」保留旧链接。',
            },
          }
        }
        return f
      })
      return next
    },
  })
}

export function pathPreviewField(kind: Kind) {
  return {
    name: 'pathPreview',
    type: 'ui' as const,
    admin: {
      position: 'sidebar' as const,
      components: {
        Field: {
          path: '@/components/admin/PathPreview#PathPreview',
          clientProps: { kind },
        },
      },
    },
  }
}

export function viewCountField() {
  return {
    name: 'viewCount',
    type: 'number' as const,
    label: '访问量',
    defaultValue: 0,
    admin: {
      position: 'sidebar' as const,
      readOnly: true,
      description: '前台累计浏览（近似，不含预览/后台）。',
    },
  }
}
