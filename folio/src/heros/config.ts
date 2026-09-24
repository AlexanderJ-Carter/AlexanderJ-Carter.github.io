import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: '首屏样式',
      options: [
        {
          label: '无',
          value: 'none',
        },
        {
          label: '高冲击（全屏图）',
          value: 'highImpact',
        },
        {
          label: '中冲击',
          value: 'mediumImpact',
        },
        {
          label: '低冲击',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: '首屏文案',
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        label: '按钮',
      },
    }),
    {
      name: 'media',
      type: 'upload',
      label: '主图',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: '首屏',
}
