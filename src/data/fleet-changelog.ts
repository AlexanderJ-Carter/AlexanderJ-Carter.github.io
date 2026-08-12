/**
 * Cross-site fleet timeline — distinct from apex CHANGELOG.md (main site releases).
 * Keep entries short; prefer linking site ids that exist in site-registry.
 */

import type { Lang } from '../i18n/types';

export type FleetChangeKind =
  | 'added'
  | 'changed'
  | 'retired'
  | 'ops'
  | 'security';

export type FleetChangeEntry = {
  id: string;
  date: string;
  kind: FleetChangeKind;
  /** Registry site ids touched by this change */
  sites: string[];
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
};

export const fleetChangelog: FleetChangeEntry[] = [
  {
    id: '2026-08-12-fleet-curation',
    date: '2026-08-12',
    kind: 'changed',
    sites: ['network', 'tools-hub', 'newyear', 'cook-mcp', 'lab'],
    title: {
      'zh-CN': '访客策展与 Network 密度',
      'zh-TW': '訪客策展與 Network 密度',
      'en-GB': 'Visitor curation and Network density',
      fr: 'Curation visiteurs et densité Network',
      ru: 'Курация для гостей и плотность Network',
    },
    summary: {
      'zh-CN':
        'Chrome / Tools / Next 共用站外 ID；Network 淡季隐藏 newyear，目录不再列 cook-mcp。',
      'zh-TW':
        'Chrome / Tools / Next 共用站外 ID；Network 淡季隱藏 newyear，目錄不再列 cook-mcp。',
      'en-GB':
        'Shared elsewhere IDs for Chrome / Tools / Next; Network hides off-season newyear and omits cook-mcp.',
      fr: 'IDs elsewhere partagés ; Network masque newyear hors saison et omet cook-mcp.',
      ru: 'Общие elsewhere ID; Network скрывает newyear вне сезона и не показывает cook-mcp.',
    },
  },
  {
    id: '2026-08-12-contact-301',
    date: '2026-08-12',
    kind: 'retired',
    sites: ['contact-card'],
    title: {
      'zh-CN': 'contact 子域退役',
      'zh-TW': 'contact 子域退役',
      'en-GB': 'contact subdomain retired',
      fr: 'Sous-domaine contact retiré',
      ru: 'Поддомен contact снят',
    },
    summary: {
      'zh-CN':
        'Worker redirect-contact：contact.alexander.xin 301 → apex /contact/。',
      'zh-TW':
        'Worker redirect-contact：contact.alexander.xin 301 → apex /contact/。',
      'en-GB':
        'Worker redirect-contact: contact.alexander.xin 301 → apex /contact/.',
      fr: 'Worker redirect-contact : contact.alexander.xin 301 → /contact/.',
      ru: 'Worker redirect-contact: contact.alexander.xin 301 → /contact/.',
    },
  },
  {
    id: '2026-08-12-home-hermes-gateway',
    date: '2026-08-12',
    kind: 'added',
    sites: ['home', 'hermes', 'gateway'],
    title: {
      'zh-CN': '登记 Glance / Hermes / OmniRoute',
      'zh-TW': '登記 Glance / Hermes / OmniRoute',
      'en-GB': 'Registered Glance / Hermes / OmniRoute',
      fr: 'Enregistrement Glance / Hermes / OmniRoute',
      ru: 'Зарегистрированы Glance / Hermes / OmniRoute',
    },
    summary: {
      'zh-CN':
        'home（Access Glance）、hermes、gateway 写入 registry；与公开 apex 分离。',
      'zh-TW':
        'home（Access Glance）、hermes、gateway 寫入 registry；與公開 apex 分離。',
      'en-GB':
        'home (Access Glance), hermes, and gateway added to the registry — separate from public apex.',
      fr: 'home (Glance Access), hermes et gateway ajoutés au registre — hors apex public.',
      ru: 'home (Glance Access), hermes и gateway в registry — отдельно от публичного apex.',
    },
  },
  {
    id: '2026-08-07-mycook-split',
    date: '2026-08-07',
    kind: 'changed',
    sites: ['cook', 'mycook', 'cook-mcp'],
    title: {
      'zh-CN': 'MyCook 双轨与远程 MCP',
      'zh-TW': 'MyCook 雙軌與遠端 MCP',
      'en-GB': 'MyCook dual track and remote MCP',
      fr: 'MyCook double voie et MCP distant',
      ru: 'Двухпутный MyCook и удалённый MCP',
    },
    summary: {
      'zh-CN':
        'cook=Pages 主站；mycook=完整站；cook-mcp=鉴权 MCP。三者互补，非重复站点。',
      'zh-TW':
        'cook=Pages 主站；mycook=完整站；cook-mcp=鑑權 MCP。三者互補，非重複站點。',
      'en-GB':
        'cook = Pages front; mycook = full site; cook-mcp = authenticated MCP — complementary, not duplicates.',
      fr: 'cook = Pages ; mycook = site complet ; cook-mcp = MCP authentifié — complémentaires.',
      ru: 'cook = Pages; mycook = полный сайт; cook-mcp = MCP с auth — дополняют, не дублируют.',
    },
  },
  {
    id: '2026-08-03-identity-layers',
    date: '2026-08-03',
    kind: 'ops',
    sites: ['identity', 'ops', 'git', 'docker', 'nginxui'],
    title: {
      'zh-CN': 'Access + Pocket ID 分层',
      'zh-TW': 'Access + Pocket ID 分層',
      'en-GB': 'Access + Pocket ID layering',
      fr: 'Couches Access + Pocket ID',
      ru: 'Слои Access + Pocket ID',
    },
    summary: {
      'zh-CN':
        '边缘 Access、Pocket ID 作 IdP、应用本地登录并存；Ops Portal 为维护者首页。',
      'zh-TW':
        '邊緣 Access、Pocket ID 作 IdP、應用本地登入並存；Ops Portal 為維護者首頁。',
      'en-GB':
        'Edge Access, Pocket ID as IdP, and app-local login coexist; Ops Portal is the maintainer home.',
      fr: 'Access en bordure, Pocket ID comme IdP et login applicatif coexistent ; Ops Portal = accueil mainteneur.',
      ru: 'Access на краю, Pocket ID как IdP и локальный логин приложений; Ops Portal — дом сопровождающего.',
    },
  },
];

export function getFleetChangelog(limit?: number): FleetChangeEntry[] {
  const sorted = [...fleetChangelog].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

export function toFleetChangelogJson() {
  return {
    generated: new Date().toISOString().slice(0, 10),
    source: 'src/data/fleet-changelog.ts',
    note: 'Fleet-wide timeline; apex release notes remain in CHANGELOG.md / /changelog',
    entries: fleetChangelog.map((e) => ({
      id: e.id,
      date: e.date,
      kind: e.kind,
      sites: e.sites,
      title: e.title,
      summary: e.summary,
    })),
  };
}
