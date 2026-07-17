import type { Lang } from '../types';

export const t: Record<Lang, Record<string, string>> = {
  'zh-CN': {
    title: '参考链接',
    subtitle: '常用工具、AI 产品与基础设施入口',
    badge: 'Reference Links',
    intro:
      '这里不再放陌生人的友链，也不做广告位。保留的是我会实际使用、查文档或做项目时经常打开的官方入口。',
    ai: 'AI 与写作',
    infra: '工程与部署',
    mine: '我的外部站点',
    visit: '打开',
    noteTitle: '为什么这样放',
    note: '个人网站的外链应该帮访客理解“我使用什么、信任什么、项目在哪里”，而不是把页面变成随机交换链接的集合。',
    back: '返回首页',
  },
  'zh-TW': {
    title: '參考連結',
    subtitle: '常用工具、AI 產品與基礎設施入口',
    badge: 'Reference Links',
    intro:
      '這裡不再放陌生人的友鏈，也不做廣告位。保留的是我會實際使用、查文件或做專案時經常打開的官方入口。',
    ai: 'AI 與寫作',
    infra: '工程與部署',
    mine: '我的外部站點',
    visit: '打開',
    noteTitle: '為什麼這樣放',
    note: '個人網站的外鏈應該幫訪客理解「我使用什麼、信任什麼、專案在哪裡」，而不是把頁面變成隨機交換連結的集合。',
    back: '返回首頁',
  },
  'en-GB': {
    title: 'Reference Links',
    subtitle: 'Tools, AI products and infrastructure I actually use',
    badge: 'Reference Links',
    intro:
      'This is no longer a generic link-exchange page. It keeps official resources I use when writing, building, debugging and deploying.',
    ai: 'AI & Writing',
    infra: 'Engineering & Deploy',
    mine: 'My External Sites',
    visit: 'Open',
    noteTitle: 'Why This Shape',
    note: 'External links on a personal site should explain what I use, what I trust and where the related projects live. They should not become a random directory.',
    back: 'Back to home',
  },
  fr: {
    title: 'Références',
    subtitle: 'Outils, IA et infrastructure que j’utilise réellement',
    badge: 'Reference Links',
    intro:
      'Cette page n’est plus un échange de liens. Elle garde les ressources officielles que j’ouvre pour écrire, construire, déboguer et déployer.',
    ai: 'IA et écriture',
    infra: 'Ingénierie et déploiement',
    mine: 'Mes sites externes',
    visit: 'Ouvrir',
    noteTitle: 'Pourquoi cette forme',
    note: 'Les liens externes d’un site personnel doivent expliquer ce que j’utilise, ce en quoi j’ai confiance et où vivent les projets associés.',
    back: "Retour à l'accueil",
  },
  ru: {
    title: 'Ссылки',
    subtitle: 'Инструменты, AI-продукты и инфраструктура, которыми я пользуюсь',
    badge: 'Reference Links',
    intro:
      'Это больше не страница случайного обмена ссылками. Здесь официальные ресурсы, которые я открываю для письма, разработки, отладки и деплоя.',
    ai: 'AI и письмо',
    infra: 'Инженерия и деплой',
    mine: 'Мои внешние сайты',
    visit: 'Открыть',
    noteTitle: 'Почему так',
    note: 'Внешние ссылки на личном сайте должны объяснять, чем я пользуюсь, чему доверяю и где живут связанные проекты.',
    back: 'На главную',
  },
};
