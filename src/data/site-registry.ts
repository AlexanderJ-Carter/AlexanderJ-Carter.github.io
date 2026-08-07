/**
 * Single source of truth for the public site fleet.
 * Pages, sitemap, tools, and network.json all derive from this registry.
 */

import type { Lang } from '../i18n/types';

export type SiteCategory =
  | 'primary'
  | 'content'
  | 'tools'
  | 'learning'
  | 'service'
  | 'ops'
  | 'alias'
  | 'experiment';

export type SiteHost =
  | 'github-pages'
  | 'cloudflare-worker'
  | 'server-tunnel'
  | 'external';

export type SiteVisibility = 'public' | 'private' | 'alias';

export type SiteStatus = 'live' | 'beta' | 'retired' | 'planned';

export type SiteEntry = {
  id: string;
  /** Absolute public URL when known */
  url: string;
  /** Optional path on the apex site (zh-CN root) */
  path?: string;
  category: SiteCategory;
  host: SiteHost;
  visibility: SiteVisibility;
  status: SiteStatus;
  /** Short English label used in machine-facing JSON */
  label: string;
  /** Optional GitHub repo path like owner/name */
  repo?: string;
  /** Cloudflare Access / Pocket ID gate */
  access?: boolean;
  /** Delivery notes for ops / network page */
  note?: string;
  labels: {
    'zh-CN': string;
    'zh-TW': string;
    'en-GB': string;
    fr: string;
    ru: string;
  };
  descriptions: {
    'zh-CN': string;
    'zh-TW': string;
    'en-GB': string;
    fr: string;
    ru: string;
  };
};

export const ACCESS_LAUNCHER_URL =
  'https://alexanderjcarter.cloudflareaccess.com';

export const IDENTITY_URL = 'https://id.alexander.xin';

export const siteRegistry: SiteEntry[] = [
  {
    id: 'apex',
    url: 'https://alexander.xin',
    path: '/',
    category: 'primary',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'Apex',
    repo: 'AlexanderJ-Carter/AlexanderJ-Carter.github.io',
    note: 'GitHub Pages + Cloudflare CDN (global)',
    labels: {
      'zh-CN': '主站（全球）',
      'zh-TW': '主站（全球）',
      'en-GB': 'Main site (global)',
      fr: 'Site principal (mondial)',
      ru: 'Основной сайт (глобальный)',
    },
    descriptions: {
      'zh-CN': 'GitHub Pages 源，经 Cloudflare 加速。',
      'zh-TW': 'GitHub Pages 源，經 Cloudflare 加速。',
      'en-GB': 'GitHub Pages origin behind Cloudflare.',
      fr: 'Origine GitHub Pages derrière Cloudflare.',
      ru: 'GitHub Pages за Cloudflare.',
    },
  },
  {
    id: 'www',
    url: 'https://www.alexander.xin',
    path: '/',
    category: 'primary',
    host: 'server-tunnel',
    visibility: 'public',
    status: 'live',
    label: 'WWW',
    repo: 'AlexanderJ-Carter/AlexanderJ-Carter.github.io',
    note: 'SSH Cloud mirror for mainland access; not a redirect to apex',
    labels: {
      'zh-CN': '主站（国内镜像）',
      'zh-TW': '主站（國內鏡像）',
      'en-GB': 'Main site (CN mirror)',
      fr: 'Site principal (miroir CN)',
      ru: 'Основной сайт (зеркало CN)',
    },
    descriptions: {
      'zh-CN': '同一套静态站的服务器镜像，经 Tunnel 暴露，利于国内访问。',
      'zh-TW': '同一套靜態站的伺服器鏡像，經 Tunnel 暴露，利於國內訪問。',
      'en-GB': 'Same static site on the VPS via Tunnel for mainland reachability.',
      fr: 'Même site statique sur le VPS via Tunnel pour la Chine.',
      ru: 'То же статическое зеркало на VPS через Tunnel.',
    },
  },
  {
    id: 'next',
    url: 'https://alexander.xin/next',
    path: '/next',
    category: 'experiment',
    host: 'github-pages',
    visibility: 'public',
    status: 'beta',
    label: 'NEXUS',
    labels: {
      'zh-CN': 'NEXUS 实验区',
      'zh-TW': 'NEXUS 實驗區',
      'en-GB': 'NEXUS lab',
      fr: 'Labo NEXUS',
      ru: 'Лаборатория NEXUS',
    },
    descriptions: {
      'zh-CN': '主站旁的 beta 房间与共享状态实验。',
      'zh-TW': '主站旁的 beta 房間與共享狀態實驗。',
      'en-GB': 'Beta rooms and shared-state experiments beside the main site.',
      fr: 'Salles beta et expériences d’état partagé.',
      ru: 'Beta-комнаты и эксперименты с общим состоянием.',
    },
  },
  {
    id: 'network',
    url: 'https://alexander.xin/network',
    path: '/network',
    category: 'primary',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'Network',
    labels: {
      'zh-CN': '站群目录',
      'zh-TW': '站群目錄',
      'en-GB': 'Network directory',
      fr: 'Annuaire du réseau',
      ru: 'Каталог сети',
    },
    descriptions: {
      'zh-CN': '公开子站与服务的统一目录。',
      'zh-TW': '公開子站與服務的統一目錄。',
      'en-GB': 'Unified directory of public sites and services.',
      fr: 'Annuaire unifié des sites et services publics.',
      ru: 'Единый каталог публичных сайтов и сервисов.',
    },
  },
  {
    id: 'cook',
    url: 'https://cook.alexander.xin',
    category: 'content',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'MyCook',
    labels: {
      'zh-CN': '菜谱',
      'zh-TW': '食譜',
      'en-GB': 'Recipes',
      fr: 'Recettes',
      ru: 'Рецепты',
    },
    descriptions: {
      'zh-CN': '做饭菜谱独立站。',
      'zh-TW': '做飯食譜獨立站。',
      'en-GB': 'Standalone cooking recipes site.',
      fr: 'Site de recettes indépendant.',
      ru: 'Отдельный сайт рецептов.',
    },
  },
  {
    id: 'lab',
    url: 'https://lab.alexander.xin',
    category: 'learning',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'Lab',
    labels: {
      'zh-CN': 'Git / CI 实验室',
      'zh-TW': 'Git / CI 實驗室',
      'en-GB': 'Git / CI lab',
      fr: 'Labo Git / CI',
      ru: 'Лаборатория Git / CI',
    },
    descriptions: {
      'zh-CN': 'Git 与 CI 教学站，与 /next 职责不同。',
      'zh-TW': 'Git 與 CI 教學站，與 /next 職責不同。',
      'en-GB': 'Git/CI teaching site — distinct from /next.',
      fr: 'Site d’enseignement Git/CI — distinct de /next.',
      ru: 'Учебный Git/CI сайт — отдельно от /next.',
    },
  },
  {
    id: 'linux-command',
    url: 'https://linux-command.alexander.xin',
    category: 'learning',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'Linux Command',
    labels: {
      'zh-CN': 'Linux 指令',
      'zh-TW': 'Linux 指令',
      'en-GB': 'Linux commands',
      fr: 'Commandes Linux',
      ru: 'Команды Linux',
    },
    descriptions: {
      'zh-CN': '常用 Linux 指令速查。',
      'zh-TW': '常用 Linux 指令速查。',
      'en-GB': 'Quick reference for common Linux commands.',
      fr: 'Aide-mémoire des commandes Linux courantes.',
      ru: 'Шпаргалка по частым командам Linux.',
    },
  },
  {
    id: 'netq',
    url: 'https://netq.alexander.xin',
    category: 'tools',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'NetQ',
    labels: {
      'zh-CN': 'NetQ',
      'zh-TW': 'NetQ',
      'en-GB': 'NetQ',
      fr: 'NetQ',
      ru: 'NetQ',
    },
    descriptions: {
      'zh-CN': '网络排查小实验室。',
      'zh-TW': '網路排查小實驗室。',
      'en-GB': 'Small network troubleshooting lab.',
      fr: 'Petit labo de dépannage réseau.',
      ru: 'Небольшая лаборатория сетевой диагностики.',
    },
  },
  {
    id: 'yearly',
    url: 'https://yearly.alexander.xin',
    category: 'content',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'Yearly',
    labels: {
      'zh-CN': '年度回顾',
      'zh-TW': '年度回顧',
      'en-GB': 'Yearly review',
      fr: 'Bilan annuel',
      ru: 'Годовой обзор',
    },
    descriptions: {
      'zh-CN': '年度内容独立页。',
      'zh-TW': '年度內容獨立頁。',
      'en-GB': 'Standalone yearly review pages.',
      fr: 'Pages de bilan annuel indépendantes.',
      ru: 'Отдельные страницы годового обзора.',
    },
  },
  {
    id: 'contact-card',
    url: 'https://contact.alexander.xin',
    category: 'content',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'Contact card',
    repo: 'AlexanderJ-Carter/Contact',
    note:
      'Standalone Turnstile card; overlaps apex /contact — candidate to 301-merge or rename (e.g. card.)',
    labels: {
      'zh-CN': '联系卡片',
      'zh-TW': '聯繫卡片',
      'en-GB': 'Contact card',
      fr: 'Carte contact',
      ru: 'Карточка контакта',
    },
    descriptions: {
      'zh-CN': '独立联系页（Turnstile）；与主站 /contact 职责重叠，待确认合并或改名。',
      'zh-TW': '獨立聯繫頁（Turnstile）；與主站 /contact 職責重疊，待確認合併或改名。',
      'en-GB':
        'Standalone contact card (Turnstile); overlaps /contact — merge or rename pending.',
      fr: 'Carte contact indépendante (Turnstile) ; chevauche /contact — fusion ou renommage à confirmer.',
      ru: 'Отдельная карточка контакта (Turnstile); пересекается с /contact — слияние или переименование.',
    },
  },
  {
    id: 'tools-hub',
    url: 'https://tools.alexander.xin',
    category: 'tools',
    host: 'server-tunnel',
    visibility: 'public',
    status: 'live',
    label: 'IT-Tools',
    note:
      'Tunnel → nginx-ui → it-tools :8080; distinct from apex /tools index; rename to it-tools. pending confirmation',
    labels: {
      'zh-CN': 'IT-Tools',
      'zh-TW': 'IT-Tools',
      'en-GB': 'IT-Tools',
      fr: 'IT-Tools',
      ru: 'IT-Tools',
    },
    descriptions: {
      'zh-CN': 'VPS 上的 IT-Tools；与主站 /tools 索引不同。候选子域 it-tools.。',
      'zh-TW': 'VPS 上的 IT-Tools；與主站 /tools 索引不同。候選子域 it-tools.。',
      'en-GB':
        'IT-Tools on the VPS — not the apex /tools index. Candidate host: it-tools.',
      fr: 'IT-Tools sur le VPS — distinct de /tools. Hôte candidat : it-tools.',
      ru: 'IT-Tools на VPS — не индекс /tools. Кандидат: it-tools.',
    },
  },
  {
    id: 'paste',
    url: 'https://paste.alexander.xin',
    category: 'service',
    host: 'server-tunnel',
    visibility: 'public',
    status: 'live',
    label: 'PrivateBin',
    note: 'Tunnel → nginx-ui → privatebin :8081',
    labels: {
      'zh-CN': '加密剪贴板',
      'zh-TW': '加密剪貼簿',
      'en-GB': 'Encrypted paste',
      fr: 'Collage chiffré',
      ru: 'Шифрованный буфер',
    },
    descriptions: {
      'zh-CN': 'PrivateBin 端到端加密粘贴。',
      'zh-TW': 'PrivateBin 端到端加密貼上。',
      'en-GB': 'PrivateBin end-to-end encrypted pastes.',
      fr: 'Collages chiffrés de bout en bout (PrivateBin).',
      ru: 'PrivateBin с шифрованием на стороне клиента.',
    },
  },
  {
    id: 'time-api',
    url: 'https://api.alexander.xin/time',
    category: 'service',
    host: 'cloudflare-worker',
    visibility: 'public',
    status: 'live',
    label: 'Time API',
    note: 'Worker time-api; GET/HEAD /time and /time/now',
    labels: {
      'zh-CN': '时间 API',
      'zh-TW': '時間 API',
      'en-GB': 'Time API',
      fr: 'API temps',
      ru: 'API времени',
    },
    descriptions: {
      'zh-CN': '公开时间 API（Cloudflare Worker）。',
      'zh-TW': '公開時間 API（Cloudflare Worker）。',
      'en-GB': 'Public time API on a Cloudflare Worker.',
      fr: 'API temps publique sur Cloudflare Worker.',
      ru: 'Публичный API времени на Cloudflare Worker.',
    },
  },
  {
    id: 'identity',
    url: IDENTITY_URL,
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'public',
    status: 'live',
    label: 'Pocket ID',
    note: 'Tunnel → nginx-ui → pocket-id :1411; no Access (is the IdP)',
    labels: {
      'zh-CN': '身份（Pocket ID）',
      'zh-TW': '身份（Pocket ID）',
      'en-GB': 'Identity (Pocket ID)',
      fr: 'Identité (Pocket ID)',
      ru: 'Идентичность (Pocket ID)',
    },
    descriptions: {
      'zh-CN': '自托管 Passkey OIDC，运维统一身份源。',
      'zh-TW': '自託管 Passkey OIDC，運維統一身份源。',
      'en-GB': 'Self-hosted Passkey OIDC for ops SSO.',
      fr: 'OIDC Passkey auto-hébergé pour le SSO ops.',
      ru: 'Самохостинг Passkey OIDC для ops SSO.',
    },
  },
  {
    id: 'git',
    url: 'https://git.alexander.xin',
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'live',
    label: 'Gitea',
    access: true,
    labels: {
      'zh-CN': 'Git（Gitea）',
      'zh-TW': 'Git（Gitea）',
      'en-GB': 'Git (Gitea)',
      fr: 'Git (Gitea)',
      ru: 'Git (Gitea)',
    },
    descriptions: {
      'zh-CN': '私有 Git，经 Cloudflare Access。',
      'zh-TW': '私有 Git，經 Cloudflare Access。',
      'en-GB': 'Private Git behind Cloudflare Access.',
      fr: 'Git privé derrière Cloudflare Access.',
      ru: 'Приватный Git за Cloudflare Access.',
    },
  },
  {
    id: 'docker',
    url: 'https://docker.alexander.xin',
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'live',
    label: 'Portainer',
    access: true,
    labels: {
      'zh-CN': '容器（Portainer）',
      'zh-TW': '容器（Portainer）',
      'en-GB': 'Containers (Portainer)',
      fr: 'Conteneurs (Portainer)',
      ru: 'Контейнеры (Portainer)',
    },
    descriptions: {
      'zh-CN': 'Docker 管理面，经 Access。',
      'zh-TW': 'Docker 管理面，經 Access。',
      'en-GB': 'Docker admin UI behind Access.',
      fr: 'UI Docker derrière Access.',
      ru: 'Админка Docker за Access.',
    },
  },
  {
    id: 'nginxui',
    url: 'https://nginxui.alexander.xin',
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'live',
    label: 'Nginx UI',
    access: true,
    labels: {
      'zh-CN': 'Nginx UI',
      'zh-TW': 'Nginx UI',
      'en-GB': 'Nginx UI',
      fr: 'Nginx UI',
      ru: 'Nginx UI',
    },
    descriptions: {
      'zh-CN': '边缘 Nginx 管理，经 Access。',
      'zh-TW': '邊緣 Nginx 管理，經 Access。',
      'en-GB': 'Edge Nginx admin behind Access.',
      fr: 'Admin Nginx edge derrière Access.',
      ru: 'Админка Nginx за Access.',
    },
  },
  {
    id: 'ssh',
    url: 'https://ssh.alexander.xin',
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'live',
    label: 'SSH',
    access: true,
    labels: {
      'zh-CN': 'SSH',
      'zh-TW': 'SSH',
      'en-GB': 'SSH',
      fr: 'SSH',
      ru: 'SSH',
    },
    note: 'Browser SSH is emergency-only; daily use local `ssh cloud`',
    descriptions: {
      'zh-CN': 'Access 边缘门禁 + 主机 SSH 身份；日常用本机 ssh cloud，浏览器仅应急。',
      'zh-TW': 'Access 邊緣門禁 + 主機 SSH 身份；日常用本機 ssh cloud，瀏覽器僅應急。',
      'en-GB': 'Access edge gate + host SSH auth; prefer local `ssh cloud`, browser is emergency-only.',
      fr: 'Porte Access + auth SSH hôte ; préférer `ssh cloud` local, navigateur en secours.',
      ru: 'Access на краю + SSH на хосте; обычно `ssh cloud`, браузер — запасной путь.',
    },
  },
  {
    id: 'remote',
    url: 'https://remote.alexander.xin',
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'live',
    label: 'RustDesk',
    access: true,
    note:
      'HTTP info + optional /ws behind Access; native clients use Tailscale 100.126.166.111',
    labels: {
      'zh-CN': '远程（RustDesk）',
      'zh-TW': '遠端（RustDesk）',
      'en-GB': 'Remote (RustDesk)',
      fr: 'Distant (RustDesk)',
      ru: 'Удалённо (RustDesk)',
    },
    descriptions: {
      'zh-CN': '自建 RustDesk；网页入口经 Access，客户端走 Tailscale ID/Relay。',
      'zh-TW': '自建 RustDesk；網頁入口經 Access，客戶端走 Tailscale ID/Relay。',
      'en-GB': 'Self-hosted RustDesk; HTTP behind Access, clients via Tailscale ID/Relay.',
      fr: 'RustDesk auto-hébergé ; HTTP derrière Access, clients via Tailscale.',
      ru: 'Свой RustDesk; HTTP за Access, клиенты через Tailscale ID/Relay.',
    },
  },
  {
    id: 'ops',
    url: 'https://ops.alexander.xin',
    category: 'ops',
    host: 'cloudflare-worker',
    visibility: 'private',
    status: 'live',
    label: 'Ops Portal',
    access: true,
    note: 'Read-only fleet status Worker behind Access',
    labels: {
      'zh-CN': '运维状态台',
      'zh-TW': '運維狀態台',
      'en-GB': 'Ops portal',
      fr: 'Portail ops',
      ru: 'Ops-портал',
    },
    descriptions: {
      'zh-CN': '只读站群健康检查，经 Access。',
      'zh-TW': '只讀站群健康檢查，經 Access。',
      'en-GB': 'Read-only fleet health behind Access.',
      fr: 'Santé de flotte en lecture seule derrière Access.',
      ru: 'Только чтение статуса флота за Access.',
    },
  },
  {
    id: 'cms',
    url: 'https://cms.alexander.xin',
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'planned',
    label: 'Directus',
    access: true,
    note: 'Replaces Ghost; deploy when memory allows',
    labels: {
      'zh-CN': '内容后台（计划）',
      'zh-TW': '內容後台（計劃）',
      'en-GB': 'CMS (planned)',
      fr: 'CMS (prévu)',
      ru: 'CMS (план)',
    },
    descriptions: {
      'zh-CN': 'Directus 将替代 Ghost；暂未部署。',
      'zh-TW': 'Directus 將替代 Ghost；暫未部署。',
      'en-GB': 'Directus will replace Ghost; not deployed yet.',
      fr: 'Directus remplacera Ghost ; pas encore déployé.',
      ru: 'Directus заменит Ghost; пока не развёрнут.',
    },
  },
  {
    id: 'blog',
    url: 'https://blog.alexander.xin',
    path: '/writing',
    category: 'content',
    host: 'server-tunnel',
    visibility: 'public',
    status: 'live',
    label: 'Blog (Writing)',
    repo: 'AlexanderJ-Carter/AlexanderJ-Carter.github.io',
    note: 'B2: Tunnel → nginx-ui, same dist as www; canonical writing host; no Access; Ghost retired; author via Git',
    labels: {
      'zh-CN': '博客（写作主场）',
      'zh-TW': '部落格（寫作主場）',
      'en-GB': 'Blog (writing home)',
      fr: 'Blog (écrits)',
      ru: 'Блог (writing)',
    },
    descriptions: {
      'zh-CN': '正式阅读与 RSS 在 blog.alexander.xin；与 www 同仓产物，apex /writing 301 过来。',
      'zh-TW': '正式閱讀與 RSS 在 blog.alexander.xin；與 www 同倉產物，apex /writing 301 過來。',
      'en-GB': 'Canonical reading and RSS on blog.alexander.xin; same build as www; apex /writing 301s here.',
      fr: 'Lecture et RSS canoniques sur blog.alexander.xin ; même build que www ; apex /writing en 301.',
      ru: 'Каноническое чтение и RSS на blog.alexander.xin; тот же билд, что www; apex /writing → 301.',
    },
  },
  {
    id: 'about-alias',
    url: 'https://about.alexander.xin',
    path: '/about',
    category: 'alias',
    host: 'cloudflare-worker',
    visibility: 'alias',
    status: 'live',
    label: 'about → /about',
    labels: {
      'zh-CN': 'about 别名',
      'zh-TW': 'about 別名',
      'en-GB': 'about alias',
      fr: 'alias about',
      ru: 'алиас about',
    },
    descriptions: {
      'zh-CN': '子域重定向到 /about/。',
      'zh-TW': '子域重定向到 /about/。',
      'en-GB': 'Subdomain redirect to /about/.',
      fr: 'Redirection sous-domaine vers /about/.',
      ru: 'Редирект поддомена на /about/.',
    },
  },
  {
    id: 'bio-alias',
    url: 'https://bio.alexander.xin',
    path: '/about',
    category: 'alias',
    host: 'cloudflare-worker',
    visibility: 'alias',
    status: 'live',
    label: 'bio → /about',
    labels: {
      'zh-CN': 'bio 别名',
      'zh-TW': 'bio 別名',
      'en-GB': 'bio alias',
      fr: 'alias bio',
      ru: 'алиас bio',
    },
    descriptions: {
      'zh-CN': '子域重定向到 /about/。',
      'zh-TW': '子域重定向到 /about/。',
      'en-GB': 'Subdomain redirect to /about/.',
      fr: 'Redirection sous-domaine vers /about/.',
      ru: 'Редирект поддомена на /about/.',
    },
  },
  {
    id: 'time-alias',
    url: 'https://time.alexander.xin',
    path: '/calendar',
    category: 'alias',
    host: 'cloudflare-worker',
    visibility: 'alias',
    status: 'live',
    label: 'time → /calendar',
    labels: {
      'zh-CN': 'time 别名',
      'zh-TW': 'time 別名',
      'en-GB': 'time alias',
      fr: 'alias time',
      ru: 'алиас time',
    },
    descriptions: {
      'zh-CN': '子域重定向到 /calendar/。',
      'zh-TW': '子域重定向到 /calendar/。',
      'en-GB': 'Subdomain redirect to /calendar/.',
      fr: 'Redirection sous-domaine vers /calendar/.',
      ru: 'Редирект поддомена на /calendar/.',
    },
  },
];

export function getPublicSites(): SiteEntry[] {
  return siteRegistry.filter(
    (s) =>
      s.visibility === 'public' &&
      (s.status === 'live' || s.status === 'beta')
  );
}

export function getOpsSites(): SiteEntry[] {
  return siteRegistry.filter(
    (s) => s.category === 'ops' && s.status !== 'retired'
  );
}

export function getExternalToolSites(): SiteEntry[] {
  return siteRegistry.filter(
    (s) =>
      ['tools-hub', 'linux-command', 'netq', 'cook'].includes(s.id) &&
      s.status === 'live'
  );
}

/** Public fleet nodes for Network page and Atlas (excludes apex/www duplicates). */
export function getNetworkDirectorySites(): SiteEntry[] {
  return siteRegistry.filter(
    (s) =>
      s.visibility === 'public' &&
      (s.status === 'live' || s.status === 'beta') &&
      !['apex', 'www', 'network', 'identity'].includes(s.id)
  );
}

export function getSitemapElsewhereLinks(lang: Lang): Array<{
  name: string;
  path: string;
  desc: string;
  external?: boolean;
}> {
  const fleetIds = [
    'cook',
    'netq',
    'tools-hub',
    'linux-command',
    'lab',
    'paste',
    'link',
    'yearly',
  ] as const;
  const links: Array<{
    name: string;
    path: string;
    desc: string;
    external?: boolean;
  }> = [];

  for (const id of fleetIds) {
    const site = siteRegistry.find((s) => s.id === id);
    if (!site || site.status !== 'live') continue;
    links.push({
      name: site.labels[lang],
      path: site.url,
      desc: site.descriptions[lang],
      external: true,
    });
  }

  links.push(
    {
      name: 'GitHub',
      path: 'https://github.com/AlexanderJ-Carter',
      desc: '@AlexanderJ-Carter',
      external: true,
    },
    {
      name:
        lang === 'zh-CN'
          ? '爱发电'
          : lang === 'zh-TW'
            ? '愛發電'
            : 'Afdian',
      path: 'https://afdian.com/a/alexanderjc',
      desc:
        lang === 'en-GB'
          ? 'Support'
          : lang === 'fr'
            ? 'Soutenir'
            : lang === 'ru'
              ? 'Поддержать'
              : lang === 'zh-TW'
                ? '支持本站'
                : '支持本站',
      external: true,
    },
    {
      name:
        lang === 'zh-CN'
          ? '站群目录'
          : lang === 'zh-TW'
            ? '站群目錄'
            : lang === 'fr'
              ? 'Réseau'
              : lang === 'ru'
                ? 'Сеть'
                : 'Network',
      path: '/network',
      desc:
        lang === 'en-GB'
          ? 'Unified directory'
          : lang === 'fr'
            ? 'Annuaire unifié'
            : lang === 'ru'
              ? 'Единый каталог'
              : lang === 'zh-TW'
                ? '統一目錄'
                : '统一目录',
    }
  );

  return links;
}

export function toNetworkJson() {
  return {
    generated: new Date().toISOString().slice(0, 10),
    identity: IDENTITY_URL,
    accessLauncher: ACCESS_LAUNCHER_URL,
    sites: siteRegistry.map((s) => ({
      id: s.id,
      url: s.url,
      path: s.path,
      category: s.category,
      host: s.host,
      visibility: s.visibility,
      status: s.status,
      label: s.label,
      access: Boolean(s.access),
      repo: s.repo,
      note: s.note,
    })),
  };
}
