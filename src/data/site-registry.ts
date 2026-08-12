/**
 * Single source of truth for the public site fleet.
 * Pages, sitemap, tools, and network.json all derive from this registry.
 */

import type { Lang } from '../i18n/types';
import { afdianUrl } from '../config/site';

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
      'en-GB':
        'Same static site on the VPS via Tunnel for mainland reachability.',
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
    id: 'changelog',
    url: 'https://alexander.xin/changelog',
    path: '/changelog',
    category: 'content',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'Changelog',
    labels: {
      'zh-CN': '更新日志',
      'zh-TW': '更新日誌',
      'en-GB': 'Changelog',
      fr: 'Journal des modifications',
      ru: 'Журнал изменений',
    },
    descriptions: {
      'zh-CN': '公开版本与重要改动，同步仓库 CHANGELOG。',
      'zh-TW': '公開版本與重要改動，同步倉庫 CHANGELOG。',
      'en-GB': 'Public version history synced from the repo CHANGELOG.',
      fr: 'Historique public synchronisé avec le CHANGELOG du dépôt.',
      ru: 'Публичная история версий, синхронизированная с CHANGELOG.',
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
    repo: 'AlexanderJ-Carter/MyCook',
    note: 'GitHub Pages 主站；图片版与远程 MCP 见 mycook / cook-mcp',
    labels: {
      'zh-CN': '菜谱',
      'zh-TW': '食譜',
      'en-GB': 'Recipes',
      fr: 'Recettes',
      ru: 'Рецепты',
    },
    descriptions: {
      'zh-CN':
        '双源菜谱聚合：老乡鸡做法库 × 程序员做饭指南，577+ 道菜，搜索、收藏、PWA（Pages 主站）。',
      'zh-TW':
        '雙源食譜聚合：老鄉雞做法庫 × 程式員做飯指南，577+ 道菜，搜尋、收藏、PWA（Pages 主站）。',
      'en-GB':
        'Dual-source recipe hub on GitHub Pages: CookLikeHOC × HowToCook, 577+ dishes, search, PWA.',
      fr: 'Hub recettes sur GitHub Pages : CookLikeHOC × HowToCook, 577+ plats, recherche, PWA.',
      ru: 'Агрегатор рецептов на GitHub Pages: CookLikeHOC × HowToCook, 577+ блюд.',
    },
  },
  {
    id: 'mycook',
    url: 'https://mycook.alexander.xin',
    category: 'content',
    host: 'server-tunnel',
    visibility: 'public',
    status: 'live',
    label: 'MyCook Full',
    repo: 'AlexanderJ-Carter/MyCook',
    note: 'SSH cloud 完整站（含 howtocook-images），Tunnel → nginx',
    labels: {
      'zh-CN': '菜谱完整站',
      'zh-TW': '食譜完整站',
      'en-GB': 'Recipes (full)',
      fr: 'Recettes (complet)',
      ru: 'Рецепты (полный)',
    },
    descriptions: {
      'zh-CN':
        'MyCook 自托管完整版：与 Pages 同内容，额外提供 HowToCook 高清图片版。',
      'zh-TW':
        'MyCook 自託管完整版：與 Pages 同內容，額外提供 HowToCook 高清圖片版。',
      'en-GB':
        'Self-hosted MyCook full build: same recipes as Pages, plus HowToCook image edition.',
      fr: 'MyCook self-hébergé complet : mêmes recettes que Pages, plus l’édition images.',
      ru: 'Полный self-host MyCook: те же рецепты, плюс издание с фото HowToCook.',
    },
  },
  {
    id: 'cook-mcp',
    url: 'https://cook-mcp.alexander.xin',
    category: 'service',
    host: 'server-tunnel',
    visibility: 'public',
    status: 'live',
    label: 'MyCook MCP',
    repo: 'AlexanderJ-Carter/MyCook',
    note: 'Streamable HTTP MCP；Pocket ID JWT 或 API Key',
    labels: {
      'zh-CN': '菜谱 MCP',
      'zh-TW': '食譜 MCP',
      'en-GB': 'Recipes MCP',
      fr: 'MCP recettes',
      ru: 'MCP рецептов',
    },
    descriptions: {
      'zh-CN':
        'MyCook 远程 MCP（工具调用）。需 Pocket ID 令牌或 API Key，文档见 cook 站 /ai-agents。',
      'zh-TW':
        'MyCook 遠端 MCP（工具呼叫）。需 Pocket ID 令牌或 API Key，文件見 cook 站 /ai-agents。',
      'en-GB':
        'Remote MyCook MCP (tool calls). Pocket ID JWT or API key; see cook /ai-agents.',
      fr: 'MCP MyCook distant. JWT Pocket ID ou clé API ; voir cook /ai-agents.',
      ru: 'Удалённый MCP MyCook. JWT Pocket ID или API-ключ; см. cook /ai-agents.',
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
    repo: 'AlexanderJ-Carter/Git-Workflow-Lab',
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
    repo: 'AlexanderJ-Carter/linux-command',
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
    repo: 'AlexanderJ-Carter/netq',
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
    repo: 'AlexanderJ-Carter/Yearly',
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
    id: 'newyear',
    url: 'https://newyear.alexander.xin',
    category: 'experiment',
    host: 'github-pages',
    visibility: 'public',
    status: 'live',
    label: 'Newyear',
    repo: 'AlexanderJ-Carter/Newyear',
    note: 'Seasonal (Dec–Feb on Network page at build time); Access app for *.newyear-eki.pages.dev deleted — custom domain may stay live year-round',
    labels: {
      'zh-CN': '新年页',
      'zh-TW': '新年頁',
      'en-GB': 'New year',
      fr: 'Nouvel an',
      ru: 'Новый год',
    },
    descriptions: {
      'zh-CN': '季节性互动页（独立仓），非年度回顾 Yearly。',
      'zh-TW': '季節性互動頁（獨立倉），非年度回顧 Yearly。',
      'en-GB': 'Seasonal interactive page — distinct from Yearly review.',
      fr: 'Page interactive saisonnière — distincte de Yearly.',
      ru: 'Сезонная интерактивная страница — отдельно от Yearly.',
    },
  },
  {
    id: 'contact-card',
    url: 'https://contact.alexander.xin',
    category: 'content',
    host: 'github-pages',
    visibility: 'public',
    status: 'retired',
    label: 'Contact card',
    repo: 'AlexanderJ-Carter/Contact',
    note: 'Retired 2026-08-12: Worker redirect-contact 301 → https://alexander.xin/contact/; DNS CNAME may remain until Pages project removed.',
    labels: {
      'zh-CN': '联系卡片（已退役）',
      'zh-TW': '聯繫卡片（已退役）',
      'en-GB': 'Contact card (retired)',
      fr: 'Carte contact (retirée)',
      ru: 'Карточка контакта (снята)',
    },
    descriptions: {
      'zh-CN': '已退役；请用主站 /contact/，勿再维护独立 Contact 站。',
      'zh-TW': '已退役；請用主站 /contact/，勿再維護獨立 Contact 站。',
      'en-GB':
        'Retired; use apex /contact/. Do not redeploy a separate Contact site.',
      fr: 'Retiré ; utiliser /contact/. Ne pas redéployer un site Contact séparé.',
      ru: 'Снят; используйте /contact/. Не разворачивайте отдельный Contact.',
    },
  },
  {
    id: 'tools-hub',
    url: 'https://tools.alexander.xin',
    category: 'tools',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'live',
    label: 'IT-Tools',
    access: true,
    note: 'Tunnel → nginx-ui → it-tools :8080; Cloudflare Access; distinct from public apex /tools index',
    labels: {
      'zh-CN': 'IT-Tools',
      'zh-TW': 'IT-Tools',
      'en-GB': 'IT-Tools',
      fr: 'IT-Tools',
      ru: 'IT-Tools',
    },
    descriptions: {
      'zh-CN': 'VPS 上的 IT-Tools（Access）；与主站公开 /tools 索引不同。',
      'zh-TW': 'VPS 上的 IT-Tools（Access）；與主站公開 /tools 索引不同。',
      'en-GB':
        'IT-Tools on the VPS behind Access — not the public apex /tools index.',
      fr: 'IT-Tools sur le VPS derrière Access — distinct de /tools public.',
      ru: 'IT-Tools на VPS за Access — не публичный индекс /tools.',
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
      'zh-CN':
        'Access 边缘门禁 + 主机 SSH 身份；日常用本机 ssh cloud，浏览器仅应急。',
      'zh-TW':
        'Access 邊緣門禁 + 主機 SSH 身份；日常用本機 ssh cloud，瀏覽器僅應急。',
      'en-GB':
        'Access edge gate + host SSH auth; prefer local `ssh cloud`, browser is emergency-only.',
      fr: 'Porte Access + auth SSH hôte ; préférer `ssh cloud` local, navigateur en secours.',
      ru: 'Access на краю + SSH на хосте; обычно `ssh cloud`, браузер — запасной путь.',
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
    id: 'home',
    url: 'https://home.alexander.xin',
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'live',
    label: 'Home (Glance)',
    access: true,
    note: 'Cloudflare Access → cloud nginx → tencent Glance :3002; personal dashboard (not public apex)',
    labels: {
      'zh-CN': 'Home（Glance）',
      'zh-TW': 'Home（Glance）',
      'en-GB': 'Home (Glance)',
      fr: 'Home (Glance)',
      ru: 'Home (Glance)',
    },
    descriptions: {
      'zh-CN': '个人门户（Glance），经 Access；与公开主站不同。',
      'zh-TW': '個人門戶（Glance），經 Access；與公開主站不同。',
      'en-GB': 'Personal Glance dashboard behind Access — not the public apex.',
      fr: 'Tableau Glance personnel derrière Access — pas le site public.',
      ru: 'Личный Glance за Access — не публичный apex.',
    },
  },
  {
    id: 'hermes',
    url: 'https://hermes.alexander.xin',
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'live',
    label: 'Hermes Agent',
    note: 'Cloud nginx → tencent :9119; app OIDC via Pocket ID',
    labels: {
      'zh-CN': 'Hermes',
      'zh-TW': 'Hermes',
      'en-GB': 'Hermes',
      fr: 'Hermes',
      ru: 'Hermes',
    },
    descriptions: {
      'zh-CN': '自托管 Agent（tencent）；应用侧 Pocket ID 登录。',
      'zh-TW': '自託管 Agent（tencent）；應用側 Pocket ID 登入。',
      'en-GB': 'Self-hosted agent on tencent; Pocket ID app login.',
      fr: 'Agent auto-hébergé sur tencent ; login Pocket ID.',
      ru: 'Self-host агент на tencent; вход Pocket ID.',
    },
  },
  {
    id: 'gateway',
    url: 'https://gateway.alexander.xin',
    category: 'ops',
    host: 'server-tunnel',
    visibility: 'private',
    status: 'live',
    label: 'OmniRoute',
    note: 'Cloud nginx → tencent OmniRoute :8180; LLM gateway for Hermes',
    labels: {
      'zh-CN': 'OmniRoute',
      'zh-TW': 'OmniRoute',
      'en-GB': 'OmniRoute',
      fr: 'OmniRoute',
      ru: 'OmniRoute',
    },
    descriptions: {
      'zh-CN': '模型路由网关（tencent）；供 Hermes 等调用。',
      'zh-TW': '模型路由網關（tencent）；供 Hermes 等呼叫。',
      'en-GB': 'LLM route gateway on tencent for Hermes and related tools.',
      fr: 'Passerelle LLM sur tencent pour Hermes et outils liés.',
      ru: 'Шлюз маршрутизации LLM на tencent для Hermes.',
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
    note: 'Do not start on 1.6GiB; writing stays Git+blog.alexander.xin',
    labels: {
      'zh-CN': '内容后台（计划）',
      'zh-TW': '內容後台（計劃）',
      'en-GB': 'CMS (planned)',
      fr: 'CMS (prévu)',
      ru: 'CMS (план)',
    },
    descriptions: {
      'zh-CN': 'Directus 仅计划；内存不足勿部署；写作用 blog。',
      'zh-TW': 'Directus 僅計劃；記憶體不足勿部署；寫作用 blog。',
      'en-GB':
        'Directus planned only; do not deploy under current RAM; writing uses blog.',
      fr: 'Directus seulement prévu ; ne pas déployer sous RAM actuelle ; écrits via blog.',
      ru: 'Directus только в планах; не деплоить при текущей RAM; тексты через blog.',
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
      'zh-CN':
        '正式阅读与 RSS 在 blog.alexander.xin；与 www 同仓产物，apex /writing 301 过来。',
      'zh-TW':
        '正式閱讀與 RSS 在 blog.alexander.xin；與 www 同倉產物，apex /writing 301 過來。',
      'en-GB':
        'Canonical reading and RSS on blog.alexander.xin; same build as www; apex /writing 301s here.',
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
      s.visibility === 'public' && (s.status === 'live' || s.status === 'beta')
  );
}

export function getOpsSites(): SiteEntry[] {
  return siteRegistry.filter(
    (s) => s.category === 'ops' && s.status !== 'retired'
  );
}

export function getExternalToolSites(): SiteEntry[] {
  return liveSitesFromIds(CHROME_ELSEWHERE_IDS);
}

/** Public fleet nodes for Network page (excludes apex/www duplicates and agent MCP). */
export function getNetworkDirectorySites(): SiteEntry[] {
  return siteRegistry.filter(
    (s) =>
      s.visibility === 'public' &&
      (s.status === 'live' || s.status === 'beta') &&
      !['apex', 'www', 'network', 'identity', 'cook-mcp'].includes(s.id) &&
      isSeasonallyVisible(s)
  );
}

/**
 * Compact visitor elsewhere (Header / Footer / Home / Tools external / Now / Friends).
 * Keep short — mycook / MCP stay on Network or cook docs, not chrome.
 */
export const CHROME_ELSEWHERE_IDS = [
  'cook',
  'linux-command',
  'netq',
  'lab',
] as const;

/** Next hub / Echo outer ring — chrome set plus paste + blog. */
export const NEXT_FLEET_IDS = [
  ...CHROME_ELSEWHERE_IDS,
  'paste',
  'blog',
] as const;

/** Richer elsewhere list for Sitemap (includes blog / paste / yearly). */
export const SITEMAP_ELSEWHERE_IDS = [
  'cook',
  'blog',
  'netq',
  'linux-command',
  'lab',
  'paste',
  'yearly',
] as const;

export type ElsewhereLink = {
  id: string;
  title: string;
  desc: string;
  href: string;
};

/** Dec–Feb (build-time month): seasonal sites stay on the Network page. */
function isSeasonallyVisible(site: SiteEntry): boolean {
  if (site.id !== 'newyear') return true;
  const month = new Date().getUTCMonth();
  return month === 11 || month === 0 || month === 1;
}

function liveSitesFromIds(ids: readonly string[]): SiteEntry[] {
  const out: SiteEntry[] = [];
  for (const id of ids) {
    const site = siteRegistry.find((s) => s.id === id);
    if (!site || site.status !== 'live' || site.visibility !== 'public') {
      continue;
    }
    out.push(site);
  }
  return out;
}

function liveElsewhereFromIds(
  lang: Lang,
  ids: readonly string[]
): ElsewhereLink[] {
  return liveSitesFromIds(ids).map((site) => ({
    id: site.id,
    title: site.labels[lang],
    desc: site.descriptions[lang],
    href: site.url,
  }));
}

export function getChromeElsewhereLinks(lang: Lang): ElsewhereLink[] {
  return liveElsewhereFromIds(lang, CHROME_ELSEWHERE_IDS);
}

export function getNextFleetSites(): SiteEntry[] {
  return liveSitesFromIds(NEXT_FLEET_IDS);
}

export function getSitemapElsewhereLinks(lang: Lang): Array<{
  name: string;
  path: string;
  desc: string;
  external?: boolean;
}> {
  const links: Array<{
    name: string;
    path: string;
    desc: string;
    external?: boolean;
  }> = liveElsewhereFromIds(lang, SITEMAP_ELSEWHERE_IDS).map((l) => ({
    name: l.title,
    path: l.href,
    desc: l.desc,
    external: true,
  }));

  links.push(
    {
      name: 'GitHub',
      path: 'https://github.com/AlexanderJ-Carter',
      desc: '@AlexanderJ-Carter',
      external: true,
    },
    {
      name:
        lang === 'zh-CN' ? '爱发电' : lang === 'zh-TW' ? '愛發電' : 'Afdian',
      path: afdianUrl,
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
