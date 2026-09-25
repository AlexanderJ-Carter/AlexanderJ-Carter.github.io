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
}
