export type SiteEraId = 'static' | 'astro' | 'folio'

export type SiteMilestoneKind = 'genesis' | 'release' | 'migrate' | 'feature' | 'ops'

export type SiteEra = {
  id: SiteEraId
  label: string
  stack: string
  span: string
  summary: string
}

export type SiteMilestone = {
  date: string
  era: SiteEraId
  kind: SiteMilestoneKind
  title: string
  body: string
  href?: string
  hrefLabel?: string
  /** tag / short SHA，仅展示 */
  ref?: string
}

/** 月度提交密度（策展自 git log，非运行时）。用于密度火花线。 */
export const commitDensity: { month: string; count: number }[] = [
  { month: '2024-08', count: 8 },
  { month: '2024-10', count: 110 },
  { month: '2025-01', count: 22 },
  { month: '2025-04', count: 51 },
  { month: '2025-05', count: 36 },
  { month: '2025-06', count: 13 },
  { month: '2025-07', count: 4 },
  { month: '2025-09', count: 7 },
  { month: '2025-10', count: 36 },
  { month: '2025-11', count: 1 },
  { month: '2025-12', count: 14 },
  { month: '2026-01', count: 2 },
  { month: '2026-02', count: 11 },
  { month: '2026-03', count: 26 },
  { month: '2026-04', count: 10 },
  { month: '2026-05', count: 9 },
  { month: '2026-06', count: 9 },
  { month: '2026-07', count: 20 },
  { month: '2026-08', count: 58 },
  { month: '2026-09', count: 65 },
]

export const siteStats = {
  commits: 512,
  tags: 22,
  since: '2024-08',
  stacks: 3,
} as const

/**
 * 三大技术世代（对照 tags / CHANGELOG / 目录结构）。
 * Static HTML → Astro → Folio (Next+Payload)。
 */
export const siteEras: SiteEra[] = [
  {
    id: 'static',
    label: '静态页',
    stack: 'HTML · CSS · JS · Pages',
    span: '2024.08 — 2025.11',
    summary:
      '从一张 index.html 长成多语言 PWA：画廊、音乐、对话、页面地图与工具页，全部手写静态资源，挂在 GitHub Pages。',
  },
  {
    id: 'astro',
    label: 'Astro',
    stack: 'Astro · Tailwind · TypeScript',
    span: '2025.12 — 2026.09',
    summary:
      'v3 整站迁入 Astro：组件化、i18n 路由、暗房 Folio 视觉、玩乐玩具与安全页；Pages 仍是主部署面。',
  },
  {
    id: 'folio',
    label: 'Folio',
    stack: 'Next · Payload · Tencent',
    span: '2026.09 — 今',
    summary:
      'v4 切到 Payload 暗房主站；Astro 卸下，Pages 只留网关名片；问站、订阅与站群地图在此生长。',
  },
]

/**
 * 策展里程碑（自 tags、CHANGELOG 与关键提交整理）。
 * 不是完整 git log；维护时对照 `git tag` / CHANGELOG 增补即可。
 */
export const siteMilestones: SiteMilestone[] = [
  {
    date: '2024-08-08',
    era: 'static',
    kind: 'genesis',
    title: '第一张 index.html',
    body: '仓库落生。GitHub Pages 挂出最早的公开门面，之后几个月都在这一张页上打转。',
    ref: '9613eaf',
  },
  {
    date: '2024-10',
    era: 'static',
    kind: 'feature',
    title: '多语言与留言实验',
    body: '冒出 en / it / jp / zh-CN 目录，并用 Actions 试过留言收集——站点从「名片」变成「可互动的小站」。那个月有上百次提交，是最早的高密度生长期。',
  },
  {
    date: '2025-04 — 05',
    era: 'static',
    kind: 'feature',
    title: '工具页、画廊评论与验证',
    body: '日历、时间页、谷歌分析与广告位陆续挂上；多语言验证与 404 小游戏也在这段成形。手写 CSS/JS 开始显得吃力。',
  },
  {
    date: '2025-06-06',
    era: 'static',
    kind: 'release',
    title: 'v2.1.0：页面地图与对话',
    body: '正式打出 v2：map.html 页面地图、可拖动对话机器人、PWA、音乐播放器与诗词/日历等交互齐活。静态栈的能力顶到一波高点。',
    ref: 'v2.1.0',
    href: '/network',
    hrefLabel: '今日的站群地图 →',
  },
  {
    date: '2025-10-21',
    era: 'static',
    kind: 'release',
    title: 'v2.3.0：玻璃态导航',
    body: '导航全面现代化：backdrop 玻璃态、工具下拉（日历/汇率/时钟/联系）。仍是纯静态，但体验已经接近「产品站」。',
    ref: 'v2.3.0',
  },
  {
    date: '2025-11-24',
    era: 'static',
    kind: 'release',
    title: 'v2.4.0：侧栏重构',
    body: '静态时代的收官版：侧栏与多语言统一打磨。下一跳不再是修修补补，而是换底座。',
    ref: 'v2.4.0',
  },
  {
    date: '2025-12-05',
    era: 'astro',
    kind: 'migrate',
    title: 'v3.0.0：迁入 Astro',
    body: '重大重构：HTML/CSS/JS 整棵树换成 Astro + TypeScript + Tailwind；岛屿架构、组件化 Header/Footer/MusicPlayer，i18n 走动态路由。静态文件时代正式落幕。',
    ref: 'v3.0.0',
  },
  {
    date: '2026-02 — 03',
    era: 'astro',
    kind: 'feature',
    title: '安全页、CI 与多语言加固',
    body: 'security.txt / 政策页、Dependabot 与质量门禁陆续补齐；Astro 站从「能跑」走向「可维护」。',
    ref: 'v3.0.2',
  },
  {
    date: '2026-03-27',
    era: 'astro',
    kind: 'release',
    title: 'v3.1.0：性能与互动组件',
    body: '构建时间大幅下降；画廊 JPG→WebP 多尺寸；懒加载与一批互动小部件落地——暗房视觉的前奏。',
    ref: 'v3.1.0',
  },
  {
    date: '2026-07-30',
    era: 'astro',
    kind: 'release',
    title: 'v3.2：暗房 Folio 视觉与玩乐',
    body: '青晒纸 token、联系单画廊、Studio Dock；曝光三角、今日一帧、氛围电台；杂志风 sitemap、Open-Meteo 天气、写作扩容。Astro 7 运行时。这是 Astro 时代的高峰。',
    ref: 'v3.2.0',
    href: '/fun',
    hrefLabel: '玩乐页 →',
  },
  {
    date: '2026-08',
    era: 'astro',
    kind: 'feature',
    title: '站内帮助、舰队与供应链硬化',
    body: '公开 /help Q&A、KB 与限流；舰队/Elsewhere 统一；Actions SHA 固定与依赖审计。问站的前身已经在 Astro 里试过一轮。',
  },
  {
    date: '2026-09-24',
    era: 'folio',
    kind: 'migrate',
    title: 'v4.0.0：Folio 切主',
    body: 'Next + Payload 暗房站接管 www；Pocket ID 后台、Turnstile 门禁、画廊/玩乐迁入；GitHub Pages 降为网关名片。Astro 主体从仓库卸下。',
    ref: 'v4.0.0',
    href: '/',
    hrefLabel: '回首页 →',
  },
  {
    date: '2026-09-24',
    era: 'folio',
    kind: 'ops',
    title: '模板与实例分离',
    body: '开源 Folio 模板与个人实例配置拆开：域名、履历、密钥不再混进可复用树。',
  },
  {
    date: '2026-09-25',
    era: 'folio',
    kind: 'release',
    title: 'v4.0.3：问站工具、地图与发展史',
    body: '问站可简答天气/汇率/诗词；/network 分区总图；/updates 按三栈讲述从静态页到 Folio 的发展史。',
    ref: 'v4.0.3',
    href: '/updates#chronicle',
    hrefLabel: '发展史 →',
  },
]

export const KIND_LABEL: Record<SiteMilestoneKind, string> = {
  genesis: '起源',
  release: '发布',
  migrate: '迁栈',
  feature: '功能',
  ops: '运维',
}
