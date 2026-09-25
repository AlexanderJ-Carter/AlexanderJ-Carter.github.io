export type SiteUpdate = {
  date: string
  title: string
  body: string
  href?: string
  hrefLabel?: string
}

/**
 * 公开更新日志（模板默认几条示例）。
 * 实例可改此文件，或日后改为 CMS / instance 配置。
 */
export const siteUpdates: SiteUpdate[] = [
  {
    date: '2026-09-25',
    title: '迁站与访客体验',
    body: '主站迁至 Folio；关于/联系门禁、Cookie 偏好、可选 Web Analytics；写作暂缓，长文仍在博客。',
    href: '/subscribe',
    hrefLabel: '订阅更新 →',
  },
  {
    date: '2026-09',
    title: '研究与项目入口',
    body: '公开论文见 /research；生活向工具与实验见 /projects。',
    href: '/research',
    hrefLabel: '研究页 →',
  },
]

export function latestUpdate(): SiteUpdate | undefined {
  return siteUpdates[0]
}
