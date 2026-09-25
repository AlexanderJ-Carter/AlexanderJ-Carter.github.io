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
        description: '换一批公告时改这个字符串（例如 notice-2026-home）。',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '标题',
      required: true,
      defaultValue: '站有更新',
    },
    {
      name: 'body',
      type: 'textarea',
      label: '正文',
      required: true,
      defaultValue: '公开变更见更新日志；想跟后续可以订阅。',
    },
    {
      name: 'href',
      type: 'text',
      label: '链接（可选）',
      admin: {
        description: '站内路径或完整 URL。',
      },
      defaultValue: '/updates',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: '按钮文案',
      defaultValue: '更新日志 →',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.href),
      },
    },
    {
      name: 'startsAt',
      type: 'date',
      label: '开始（可选）',
      admin: {
        description: '留空表示立即生效。节日提示可写例如 2027-01-01。',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'endsAt',
      type: 'date',
      label: '结束（可选）',
      admin: {
        description: '留空表示不自动过期。过节小提示用短窗口即可。',
        date: { pickerAppearance: 'dayAndTime' },
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
