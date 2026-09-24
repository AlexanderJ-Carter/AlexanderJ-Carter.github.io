import type { GlobalConfig } from 'payload'

import { revalidateAnnouncement } from './hooks/revalidateAnnouncement'

export const Announcement: GlobalConfig = {
  slug: 'announcement',
  label: '站点公告',
  admin: {
    group: '全局',
    description: '前台顶部横幅。关掉 enabled 即全站不显示；换文案时请改 noticeId，已关闭的访客会再看到。',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: '启用公告',
      defaultValue: false,
    },
    {
      name: 'noticeId',
      type: 'text',
      label: '公告 ID',
      required: true,
      defaultValue: 'notice-default',
      admin: {
        description: '换一批公告时改这个字符串（例如 2026-ny）。',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '标题',
      required: true,
      defaultValue: '公告',
    },
    {
      name: 'body',
      type: 'textarea',
      label: '正文',
      required: true,
      defaultValue: '这里写一句临时说明或祝福。',
    },
    {
      name: 'href',
      type: 'text',
      label: '链接（可选）',
      admin: {
        description: '站内路径或完整 URL。',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: '按钮文案',
      defaultValue: '了解更多',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.href),
      },
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      label: '允许关闭',
      defaultValue: true,
    },
  ],
  hooks: {
    afterChange: [revalidateAnnouncement],
  },
}
