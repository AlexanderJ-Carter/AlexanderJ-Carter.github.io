import { RequiredDataFromCollectionSlug } from 'payload'

import { contactNotifyAddress, emailFromHeader } from '@/utilities/mail'

function lexicalParagraph(text: string) {
  return {
    type: 'paragraph' as const,
    children: [
      {
        type: 'text' as const,
        detail: 0,
        format: 0,
        mode: 'normal' as const,
        style: '',
        text,
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

export const contactForm: RequiredDataFromCollectionSlug<'forms'> = {
  confirmationMessage: {
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
              text: '已收到，谢谢留言。',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h2',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  confirmationType: 'message',
  createdAt: '2023-01-12T21:47:41.374Z',
  emails: [
    {
      emailFrom: emailFromHeader(),
      emailTo: contactNotifyAddress(),
      replyTo: '{{email}}',
      subject: '站点联系表单：{{full-name}}',
      message: {
        root: {
          type: 'root',
          children: [
            lexicalParagraph('姓名：{{full-name}}'),
            lexicalParagraph('邮箱：{{email}}'),
            lexicalParagraph('电话：{{phone}}'),
            lexicalParagraph('留言：'),
            lexicalParagraph('{{message}}'),
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  ],
  fields: [
    {
      name: 'full-name',
      blockName: 'full-name',
      blockType: 'text',
      label: '姓名',
      required: true,
      width: 100,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: '邮箱',
      required: true,
      width: 100,
    },
    {
      name: 'phone',
      blockName: 'phone',
      blockType: 'number',
      label: '电话（可选）',
      required: false,
      width: 100,
    },
    {
      name: 'message',
      blockName: 'message',
      blockType: 'textarea',
      label: '留言',
      required: true,
      width: 100,
    },
  ],
  redirect: undefined,
  submitButtonLabel: '发送',
  title: 'Contact Form',
  updatedAt: '2023-01-12T21:47:41.374Z',
}
