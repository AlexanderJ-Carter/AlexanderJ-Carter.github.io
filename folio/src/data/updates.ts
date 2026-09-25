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
    title: '问站与站群地图',
    body: '取消独立帮助页；右下角对话导览，可简答天气/汇率等。新增 /network 分区总览；/updates 按静态→Astro→Folio 讲述发展史。',
    href: '/network',
    hrefLabel: '站群地图 →',
  },
  {
    date: '2026-09-25',
    title: '写作与访客体验',
    body: '站内写作恢复精选列表；Cookie 选择后不再常驻提示；右下角可问站内栏目。',
    href: '/posts',
    hrefLabel: '写作 →',
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
