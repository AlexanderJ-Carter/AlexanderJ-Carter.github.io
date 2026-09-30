export type InstanceLink = {
  label: string
  href: string
}

export type InstancePublication = {
  title: string
  year: string
  venue: string
  links: InstanceLink[]
}

export type InstanceElsewhere = {
  name: string
  host: string
  href: string
  desc: string
}

export type InstanceProject = {
  title: string
  description: string
  href: string
  hrefLabel: string
}

export type InstanceLifestyleProject = {
  title: string
  description: string
  /** 状态文案，如「进行中」「已完成」 */
  status: string
  tags?: string[]
  href?: string
  hrefLabel?: string
  demoHref?: string
  demoLabel?: string
}

/** 门禁关于页履历条目（教育 / 研究 / 工作等） */
export type InstanceTimelineItem = {
  /** 时段，如 `2022 — 今` */
  period: string
  /** 标题，如 `清华大学 · 电子工程` */
  title: string
  /** 一句说明，可选 */
  detail?: string
  kind?: 'education' | 'research' | 'work' | 'other'
}

/** 页脚/地图用的站内栏目（模板默认；实例可覆盖） */
export type InstanceNavItem = {
  label: string
  href: string
}

/**
 * 合规展示（实例填写；空则页脚不渲染）。
 * 备案号等为中国大陆合规预留，未备案保持空字符串即可。
 */
export type InstanceCompliance = {
  /** ICP 备案号，如 `京ICP备xxxxxxxx号` */
  icp?: string
  /** 备案查询页，默认工信部 */
  icpUrl?: string
  /** 公安备案号文案 */
  gongan?: string
  /** 公安备案公示链接 */
  gonganUrl?: string
}

/** 功能开关：关掉则相关入口从导航/地图弱化（页仍可直达） */
export type InstanceFeatures = {
  /** 玩乐页与相关入口，默认 true */
  fun?: boolean
  /** 站群地图，默认 true */
  network?: boolean
  /** 订阅，默认 true */
  subscribe?: boolean
  /** 问站助手，默认 true */
  assistant?: boolean
}

/** 开源模板可覆盖的实例配置（不含密钥）。密钥只放服务器 .env。 */
export type FolioInstance = {
  /** 站点显示名 */
  siteName: string
  /** 短代号，如登录页角标 */
  siteMark: string
  /** 公网根 URL，无尾斜杠 */
  siteUrl: string
  /** 页脚/元数据标语 */
  tagline: string
  /** Twitter / X creator，可空 */
  twitterCreator?: string
  /** 页脚 Elsewhere */
  elsewhere: InstanceElsewhere[]
  /** 门禁关于页：履历时间线（完整论文仍在 research） */
  about?: {
    timeline?: InstanceTimelineItem[]
  }
  /** 公开研究页 */
  research: {
    intro: string
    profiles: InstanceLink[]
    publications: InstancePublication[]
    project?: InstanceProject
  }
  /** 生活/个人项目（/projects） */
  projects?: {
    intro?: string
    items: InstanceLifestyleProject[]
  }
  /** 安全披露 */
  security: {
    domains: string[]
    contactEmail: string
  }
  /** 联系页展示（可选） */
  contact?: {
    email?: string
    location?: string
  }
  /** OIDC 登录页展示用主机名（非密钥） */
  oidcDisplayHost?: string
  /** 默认管理员种子邮箱（仅本地脚本提示） */
  seedEmailHint?: string
  /** 合规文案（备案等）；未办则留空 */
  compliance?: InstanceCompliance
  /** 功能开关 */
  features?: InstanceFeatures
  /** 覆盖默认站内导航 */
  nav?: InstanceNavItem[]
}
