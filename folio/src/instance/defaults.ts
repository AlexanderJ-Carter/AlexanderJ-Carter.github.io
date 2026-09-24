import type { FolioInstance } from './types'

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
  research: {
    intro:
      'List public papers and research links here. Personal CV stays behind the visitor gate.',
    profiles: [],
    publications: [],
    project: undefined,
  },
  security: {
    domains: ['example.com', '*.example.com'],
    contactEmail: 'security@example.com',
  },
  oidcDisplayHost: 'id.example.com',
  seedEmailHint: 'admin@example.com',
}
