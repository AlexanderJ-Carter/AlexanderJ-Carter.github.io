import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      label: '表单',
      relationTo: 'forms',
      required: true,
      admin: {
        description: '选择「运营 → 表单」里建好的表单（如联系表单）。',
      },
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: '显示引言',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
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
      label: '引言内容',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: '表单区块',
    singular: '表单区块',
  },
}
