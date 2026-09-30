import type { FolioInstance, InstanceNavItem } from './types'

/** 开源模板默认值：无个人身份、无真实域名。 */
export const defaultInstance: FolioInstance = {
  siteName: 'Folio',
  siteMark: 'FO',
  siteUrl: 'http://127.0.0.1:3000',
  tagline: 'A darkroom-styled personal site powered by Payload.',
  twitterCreator: undefined,
  elsewhere: [
    {
      name: 'GitHub',
      host: 'github.com',
      href: 'https://github.com',
      desc: 'Source and experiments',
    },
  ],
  about: {
    timeline: [],
  },
  research: {
    intro:
      'List public papers and research links here. Personal CV stays behind the visitor gate.',
    profiles: [],
    publications: [],
    project: undefined,
  },
  projects: {
    intro: 'Small tools and personal builds. Research collaborations live on /research.',
    items: [],
  },
  security: {
    domains: ['example.com', '*.example.com'],
    contactEmail: 'security@example.com',
  },
  contact: {
    email: 'hello@example.com',
    location: 'Your city',
  },
  oidcDisplayHost: 'id.example.com',
  seedEmailHint: 'admin@example.com',
  compliance: {
    icp: '',
    icpUrl: 'https://beian.miit.gov.cn/',
    gongan: '',
    gonganUrl: '',
  },
  features: {
    fun: true,
    network: true,
    subscribe: true,
    assistant: true,
  },
}

/** 模板默认站内链接（页脚 / 地图共用；实例 `nav` 可整表覆盖） */
export const defaultSiteNav: InstanceNavItem[] = [
  { label: '画廊', href: '/gallery' },
  { label: '写作', href: '/posts' },
  { label: '研究', href: '/research' },
  { label: '项目', href: '/projects' },
  { label: '工具', href: '/tools' },
  { label: '玩乐', href: '/fun' },
  { label: '关于', href: '/about' },
  { label: '联系', href: '/contact' },
  { label: '订阅', href: '/subscribe' },
  { label: '更新', href: '/updates' },
  { label: '地图', href: '/network' },
]
