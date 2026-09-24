import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { getInstance } from '@/instance'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  const name = getInstance().siteName
  return doc?.title ? `${doc.title} · ${name}` : name
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      labels: {
        singular: '重定向',
        plural: '重定向',
      },
      admin: {
        group: '运营',
        useAsTitle: 'from',
        defaultColumns: ['from', 'to', 'updatedAt'],
        description: '旧路径跳到新地址。改完后前台路由会按此表重定向。',
      },
      // @ts-expect-error - mapped fields typing
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              label: '来源路径',
              admin: {
                ...('admin' in field ? field.admin : {}),
                description: '例如 /old-path。修改后通常无需整站重建。',
              },
            }
          }
          if ('name' in field && field.name === 'to') {
            return {
              ...field,
              label: '目标',
            }
          }
          if ('name' in field && field.name === 'type') {
            return {
              ...field,
              label: '类型',
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      labels: {
        singular: '表单',
        plural: '表单',
      },
      admin: {
        group: '运营',
        useAsTitle: 'title',
        description: '联系页等前台表单。在「页面」布局里用「表单」区块挂上即可。',
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'title') {
            return { ...field, label: '标题' }
          }
          if ('name' in field && field.name === 'submitButtonLabel') {
            return { ...field, label: '提交按钮文案' }
          }
          if ('name' in field && field.name === 'confirmationType') {
            return { ...field, label: '提交后行为' }
          }
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              label: '确认消息',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      labels: {
        singular: '表单提交',
        plural: '表单提交',
      },
      admin: {
        group: '运营',
        description: '访客提交的表单记录。',
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      labels: {
        singular: '搜索条目',
        plural: '搜索结果',
      },
      admin: {
        group: '运营',
        description: '文章搜索索引，一般随文章发布自动同步。',
      },
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
