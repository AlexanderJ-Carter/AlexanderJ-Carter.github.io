import type { Lang } from '../types';

export type SitemapLink = {
  name: string;
  /** Site path starting with `/`, or absolute https URL */
  path: string;
  desc: string;
  external?: boolean;
};

export type SitemapSection = {
  id: string;
  index: string;
  title: string;
  lead: string;
  links: SitemapLink[];
};

export type SitemapCopy = {
  title: string;
  description: string;
  kicker: string;
  headerTitle: string;
  headerDesc: string;
  back: string;
  tocLabel: string;
  sections: SitemapSection[];
  languagesTitle: string;
  languagesLead: string;
  languages: { code: string; name: string; path: string }[];
};

const external = {
  blog: 'https://blog.alexander.xin',
  github: 'https://github.com/AlexanderJ-Carter',
  cook: 'https://cook.alexander.xin',
  netq: 'https://netq.alexander.xin',
  tools: 'https://tools.alexander.xin',
  linux: 'https://linux-command.alexander.xin',
  lab: 'https://lab.alexander.xin',
  afdian: 'https://afdian.com/a/alexanderjc',
};

export const sitemapCopy: Record<Lang, SitemapCopy> = {
  'zh-CN': {
    title: '网站地图',
    description: '本站全部入口的目录索引',
    kicker: 'Index',
    headerTitle: '目录',
    headerDesc: '像翻开一本小册——按版块找到要去的地方。',
    back: '返回首页',
    tocLabel: '版块',
    sections: [
      {
        id: 'studio',
        index: '01',
        title: '工作室',
        lead: '摄影、写作与关于我。',
        links: [
          { name: '首页', path: '/', desc: '摄影首屏与精选入口' },
          { name: '画廊', path: '/gallery', desc: '摄影作品' },
          { name: '写作', path: '/writing', desc: '工程、设计与观察' },
          { name: '读读看看', path: '/reading-list', desc: '深读笔记与路线' },
          { name: '项目', path: '/projects', desc: '开源与自研' },
          { name: '关于', path: '/about', desc: '简介、研究与联系' },
          { name: '时间轴', path: '/timeline', desc: '学习与成长节点' },
          { name: '参考', path: '/friends', desc: '友链与资料' },
          { name: '支持本站', path: '/support', desc: '爱发电与免费支持' },
        ],
      },
      {
        id: 'workbench',
        index: '02',
        title: '工作台',
        lead: '轻量工具与一点好玩的。',
        links: [
          { name: '工具索引', path: '/tools', desc: '站内与外部工具' },
          { name: 'Now', path: '/now', desc: '时间、天气与快捷入口' },
          { name: '世界时间', path: '/time', desc: '多时区对照' },
          { name: '日历', path: '/calendar', desc: '月视图' },
          { name: '汇率', path: '/currency', desc: '主要货币换算' },
          { name: '单位', path: '/units', desc: '温度、长度、重量' },
          { name: '二维码', path: '/qr', desc: '链接转 QR' },
          { name: '彩蛋', path: '/fun', desc: '诗词灵感与小工具' },
          { name: '本站说明', path: '/uses', desc: '技术栈与边界' },
        ],
      },
      {
        id: 'trust',
        index: '03',
        title: '信任与边界',
        lead: '版权、隐私与安全披露。',
        links: [
          { name: '隐私', path: '/privacy', desc: '数据与 Cookie' },
          { name: '条款', path: '/terms', desc: '使用规则' },
          { name: '许可证', path: '/license', desc: 'CC 内容与 BSD 源码' },
          { name: '无障碍', path: '/accessibility', desc: '键盘与辅助功能' },
          { name: '安全政策', path: '/security/policy', desc: '漏洞披露' },
          {
            name: '安全致谢',
            path: '/security/acknowledgments',
            desc: '研究人员致谢',
          },
          { name: '联系', path: '/contact', desc: '写信给我' },
          { name: '网站地图', path: '/sitemap', desc: '你正在这里' },
        ],
      },
      {
        id: 'elsewhere',
        index: '04',
        title: '站外',
        lead: '独立站点与仓库。',
        links: [
          {
            name: '博客',
            path: external.blog,
            desc: 'blog.alexander.xin',
            external: true,
          },
          {
            name: 'GitHub',
            path: external.github,
            desc: '@AlexanderJ-Carter',
            external: true,
          },
          {
            name: '爱发电',
            path: external.afdian,
            desc: '支持本站',
            external: true,
          },
          {
            name: 'MyCook',
            path: external.cook,
            desc: '菜谱站',
            external: true,
          },
          {
            name: 'NetQ',
            path: external.netq,
            desc: '网络排查',
            external: true,
          },
          {
            name: 'Tool Hub',
            path: external.tools,
            desc: '更多工具',
            external: true,
          },
          {
            name: 'Linux Command',
            path: external.linux,
            desc: '指令速查',
            external: true,
          },
          {
            name: 'Git Lab',
            path: external.lab,
            desc: 'Git 协作练习',
            external: true,
          },
        ],
      },
    ],
    languagesTitle: '语言',
    languagesLead: '同一站点的五种阅读方式。',
    languages: [
      { code: 'zh-CN', name: '简体中文', path: '/' },
      { code: 'zh-TW', name: '繁體中文', path: '/zh-TW/' },
      { code: 'en-GB', name: 'English', path: '/en/' },
      { code: 'fr', name: 'Français', path: '/fr/' },
      { code: 'ru', name: 'Русский', path: '/ru/' },
    ],
  },
  'zh-TW': {
    title: '網站地圖',
    description: '本站全部入口的目錄索引',
    kicker: 'Index',
    headerTitle: '目錄',
    headerDesc: '像翻開一本小冊——按版塊找到要去的地方。',
    back: '返回首頁',
    tocLabel: '版塊',
    sections: [
      {
        id: 'studio',
        index: '01',
        title: '工作室',
        lead: '攝影、寫作與關於我。',
        links: [
          { name: '首頁', path: '/', desc: '攝影首屏與精選入口' },
          { name: '畫廊', path: '/gallery', desc: '攝影作品' },
          { name: '寫作', path: '/writing', desc: '工程、設計與觀察' },
          { name: '讀讀看看', path: '/reading-list', desc: '深讀筆記與路線' },
          { name: '專案', path: '/projects', desc: '開源與自研' },
          { name: '關於', path: '/about', desc: '簡介、研究與聯繫' },
          { name: '時間軸', path: '/timeline', desc: '學習與成長節點' },
          { name: '參考', path: '/friends', desc: '友鏈與資料' },
          { name: '支持本站', path: '/support', desc: '愛發電與免費支持' },
        ],
      },
      {
        id: 'workbench',
        index: '02',
        title: '工作台',
        lead: '輕量工具與一點好玩的。',
        links: [
          { name: '工具索引', path: '/tools', desc: '站內與外部工具' },
          { name: 'Now', path: '/now', desc: '時間、天氣與快捷入口' },
          { name: '世界時間', path: '/time', desc: '多時區對照' },
          { name: '日曆', path: '/calendar', desc: '月視圖' },
          { name: '匯率', path: '/currency', desc: '主要貨幣換算' },
          { name: '單位', path: '/units', desc: '溫度、長度、重量' },
          { name: '二維碼', path: '/qr', desc: '連結轉 QR' },
          { name: '彩蛋', path: '/fun', desc: '詩詞靈感與小工具' },
          { name: '本站說明', path: '/uses', desc: '技術棧與邊界' },
        ],
      },
      {
        id: 'trust',
        index: '03',
        title: '信任與邊界',
        lead: '版權、隱私與安全披露。',
        links: [
          { name: '隱私', path: '/privacy', desc: '資料與 Cookie' },
          { name: '條款', path: '/terms', desc: '使用規則' },
          { name: '許可證', path: '/license', desc: 'CC 內容與 BSD 源碼' },
          { name: '無障礙', path: '/accessibility', desc: '鍵盤與輔助功能' },
          { name: '安全政策', path: '/security/policy', desc: '漏洞披露' },
          {
            name: '安全致謝',
            path: '/security/acknowledgments',
            desc: '研究人員致謝',
          },
          { name: '聯繫', path: '/contact', desc: '寫信給我' },
          { name: '網站地圖', path: '/sitemap', desc: '你正在這裡' },
        ],
      },
      {
        id: 'elsewhere',
        index: '04',
        title: '站外',
        lead: '獨立站點與倉庫。',
        links: [
          {
            name: '部落格',
            path: external.blog,
            desc: 'blog.alexander.xin',
            external: true,
          },
          {
            name: 'GitHub',
            path: external.github,
            desc: '@AlexanderJ-Carter',
            external: true,
          },
          {
            name: '愛發電',
            path: external.afdian,
            desc: '支持本站',
            external: true,
          },
          {
            name: 'MyCook',
            path: external.cook,
            desc: '菜譜站',
            external: true,
          },
          {
            name: 'NetQ',
            path: external.netq,
            desc: '網路排查',
            external: true,
          },
          {
            name: 'Tool Hub',
            path: external.tools,
            desc: '更多工具',
            external: true,
          },
          {
            name: 'Linux Command',
            path: external.linux,
            desc: '指令速查',
            external: true,
          },
          {
            name: 'Git Lab',
            path: external.lab,
            desc: 'Git 協作練習',
            external: true,
          },
        ],
      },
    ],
    languagesTitle: '語言',
    languagesLead: '同一站點的五種閱讀方式。',
    languages: [
      { code: 'zh-CN', name: '簡體中文', path: '/' },
      { code: 'zh-TW', name: '繁體中文', path: '/zh-TW/' },
      { code: 'en-GB', name: 'English', path: '/en/' },
      { code: 'fr', name: 'Français', path: '/fr/' },
      { code: 'ru', name: 'Русский', path: '/ru/' },
    ],
  },
  'en-GB': {
    title: 'Sitemap',
    description: 'An index of every entrance on this site',
    kicker: 'Index',
    headerTitle: 'Contents',
    headerDesc:
      'A table of contents for the studio — find the section you need.',
    back: 'Back to home',
    tocLabel: 'Sections',
    sections: [
      {
        id: 'studio',
        index: '01',
        title: 'Studio',
        lead: 'Photography, writing and about.',
        links: [
          { name: 'Home', path: '/', desc: 'Photo hero and featured entries' },
          { name: 'Gallery', path: '/gallery', desc: 'Photographs' },
          { name: 'Writing', path: '/writing', desc: 'Long-form notes' },
          {
            name: 'Reading',
            path: '/reading-list',
            desc: 'Deep notes and routes',
          },
          {
            name: 'Projects',
            path: '/projects',
            desc: 'Open source and tools',
          },
          { name: 'About', path: '/about', desc: 'Profile, research, contact' },
          { name: 'Timeline', path: '/timeline', desc: 'Milestones' },
          { name: 'References', path: '/friends', desc: 'Links and resources' },
          {
            name: 'Support',
            path: '/support',
            desc: 'Afdian and free ways to help',
          },
        ],
      },
      {
        id: 'workbench',
        index: '02',
        title: 'Workbench',
        lead: 'Utilities and a little play.',
        links: [
          { name: 'Tools', path: '/tools', desc: 'On-site and external tools' },
          { name: 'Now', path: '/now', desc: 'Time, weather, shortcuts' },
          { name: 'World time', path: '/time', desc: 'Time zones' },
          { name: 'Calendar', path: '/calendar', desc: 'Month view' },
          { name: 'Currency', path: '/currency', desc: 'FX reference' },
          {
            name: 'Units',
            path: '/units',
            desc: 'Temperature, length, weight',
          },
          { name: 'QR', path: '/qr', desc: 'URL to QR' },
          { name: 'Play', path: '/fun', desc: 'Quotes and mini tools' },
          { name: 'Uses', path: '/uses', desc: 'Stack and boundaries' },
        ],
      },
      {
        id: 'trust',
        index: '03',
        title: 'Trust',
        lead: 'Licence, privacy and security.',
        links: [
          { name: 'Privacy', path: '/privacy', desc: 'Data and cookies' },
          { name: 'Terms', path: '/terms', desc: 'Site terms' },
          { name: 'Licence', path: '/license', desc: 'CC content, BSD code' },
          {
            name: 'Accessibility',
            path: '/accessibility',
            desc: 'Keyboard and assistive use',
          },
          {
            name: 'Security policy',
            path: '/security/policy',
            desc: 'Vulnerability disclosure',
          },
          {
            name: 'Acknowledgments',
            path: '/security/acknowledgments',
            desc: 'Researchers thanked',
          },
          { name: 'Contact', path: '/contact', desc: 'Write to me' },
          { name: 'Sitemap', path: '/sitemap', desc: 'You are here' },
        ],
      },
      {
        id: 'elsewhere',
        index: '04',
        title: 'Elsewhere',
        lead: 'Sister sites and the repo.',
        links: [
          {
            name: 'Blog',
            path: external.blog,
            desc: 'blog.alexander.xin',
            external: true,
          },
          {
            name: 'GitHub',
            path: external.github,
            desc: '@AlexanderJ-Carter',
            external: true,
          },
          {
            name: 'Afdian',
            path: external.afdian,
            desc: 'Support the site',
            external: true,
          },
          {
            name: 'MyCook',
            path: external.cook,
            desc: 'Recipes',
            external: true,
          },
          {
            name: 'NetQ',
            path: external.netq,
            desc: 'Network lab',
            external: true,
          },
          {
            name: 'Tool Hub',
            path: external.tools,
            desc: 'More tools',
            external: true,
          },
          {
            name: 'Linux Command',
            path: external.linux,
            desc: 'Command reference',
            external: true,
          },
          {
            name: 'Git Lab',
            path: external.lab,
            desc: 'Git practice',
            external: true,
          },
        ],
      },
    ],
    languagesTitle: 'Languages',
    languagesLead: 'Five ways to read the same studio.',
    languages: [
      { code: 'zh-CN', name: '简体中文', path: '/' },
      { code: 'zh-TW', name: '繁體中文', path: '/zh-TW/' },
      { code: 'en-GB', name: 'English', path: '/en/' },
      { code: 'fr', name: 'Français', path: '/fr/' },
      { code: 'ru', name: 'Русский', path: '/ru/' },
    ],
  },
  fr: {
    title: 'Plan du site',
    description: 'Index de toutes les entrées du site',
    kicker: 'Index',
    headerTitle: 'Sommaire',
    headerDesc: 'Une table des matières pour l’atelier.',
    back: "Retour à l'accueil",
    tocLabel: 'Sections',
    sections: [
      {
        id: 'studio',
        index: '01',
        title: 'Atelier',
        lead: 'Photo, écrits et à propos.',
        links: [
          { name: 'Accueil', path: '/', desc: 'Héro photo et entrées' },
          { name: 'Galerie', path: '/gallery', desc: 'Photographies' },
          { name: 'Écrits', path: '/writing', desc: 'Notes longues' },
          { name: 'Lecture', path: '/reading-list', desc: 'Notes et parcours' },
          { name: 'Projets', path: '/projects', desc: 'Open source et outils' },
          { name: 'À propos', path: '/about', desc: 'Profil et recherche' },
          { name: 'Chronologie', path: '/timeline', desc: 'Jalons' },
          { name: 'Références', path: '/friends', desc: 'Liens' },
          {
            name: 'Soutenir',
            path: '/support',
            desc: 'Afdian et aides gratuites',
          },
        ],
      },
      {
        id: 'workbench',
        index: '02',
        title: 'Atelier utilitaire',
        lead: 'Outils légers et un peu de jeu.',
        links: [
          { name: 'Outils', path: '/tools', desc: 'Index des outils' },
          { name: 'Now', path: '/now', desc: 'Heure, météo, raccourcis' },
          { name: 'Heure mondiale', path: '/time', desc: 'Fuseaux' },
          { name: 'Calendrier', path: '/calendar', desc: 'Vue mensuelle' },
          { name: 'Devises', path: '/currency', desc: 'Taux' },
          { name: 'Unités', path: '/units', desc: 'Conversions' },
          { name: 'QR', path: '/qr', desc: 'Lien en QR' },
          { name: 'Surprises', path: '/fun', desc: 'Citations et outils' },
          { name: 'Uses', path: '/uses', desc: 'Stack et limites' },
        ],
      },
      {
        id: 'trust',
        index: '03',
        title: 'Confiance',
        lead: 'Licence, confidentialité et sécurité.',
        links: [
          { name: 'Confidentialité', path: '/privacy', desc: 'Données' },
          { name: 'Conditions', path: '/terms', desc: 'Règles' },
          { name: 'Licence', path: '/license', desc: 'CC et BSD' },
          {
            name: 'Accessibilité',
            path: '/accessibility',
            desc: 'Clavier et aides',
          },
          { name: 'Sécurité', path: '/security/policy', desc: 'Divulgation' },
          {
            name: 'Remerciements',
            path: '/security/acknowledgments',
            desc: 'Chercheurs',
          },
          { name: 'Contact', path: '/contact', desc: 'Écrire' },
          { name: 'Plan du site', path: '/sitemap', desc: 'Vous êtes ici' },
        ],
      },
      {
        id: 'elsewhere',
        index: '04',
        title: 'Ailleurs',
        lead: 'Sites sœurs et dépôt.',
        links: [
          {
            name: 'Blog',
            path: external.blog,
            desc: 'blog.alexander.xin',
            external: true,
          },
          {
            name: 'GitHub',
            path: external.github,
            desc: '@AlexanderJ-Carter',
            external: true,
          },
          {
            name: 'Afdian',
            path: external.afdian,
            desc: 'Soutenir',
            external: true,
          },
          {
            name: 'MyCook',
            path: external.cook,
            desc: 'Recettes',
            external: true,
          },
          {
            name: 'NetQ',
            path: external.netq,
            desc: 'Réseau',
            external: true,
          },
          {
            name: 'Tool Hub',
            path: external.tools,
            desc: 'Plus d’outils',
            external: true,
          },
          {
            name: 'Linux Command',
            path: external.linux,
            desc: 'Commandes',
            external: true,
          },
          {
            name: 'Git Lab',
            path: external.lab,
            desc: 'Pratique Git',
            external: true,
          },
        ],
      },
    ],
    languagesTitle: 'Langues',
    languagesLead: 'Cinq façons de lire le même atelier.',
    languages: [
      { code: 'zh-CN', name: '简体中文', path: '/' },
      { code: 'zh-TW', name: '繁體中文', path: '/zh-TW/' },
      { code: 'en-GB', name: 'English', path: '/en/' },
      { code: 'fr', name: 'Français', path: '/fr/' },
      { code: 'ru', name: 'Русский', path: '/ru/' },
    ],
  },
  ru: {
    title: 'Карта сайта',
    description: 'Индекс всех входов на сайт',
    kicker: 'Index',
    headerTitle: 'Оглавление',
    headerDesc: 'Содержание мастерской — найдите нужный раздел.',
    back: 'На главную',
    tocLabel: 'Разделы',
    sections: [
      {
        id: 'studio',
        index: '01',
        title: 'Студия',
        lead: 'Фото, тексты и «обо мне».',
        links: [
          { name: 'Главная', path: '/', desc: 'Фото-герой и входы' },
          { name: 'Галерея', path: '/gallery', desc: 'Фотографии' },
          { name: 'Статьи', path: '/writing', desc: 'Длинные заметки' },
          { name: 'Чтение', path: '/reading-list', desc: 'Заметки и маршруты' },
          { name: 'Проекты', path: '/projects', desc: 'Open source' },
          { name: 'Обо мне', path: '/about', desc: 'Профиль и исследования' },
          { name: 'Хронология', path: '/timeline', desc: 'Вехи' },
          { name: 'Ссылки', path: '/friends', desc: 'Ресурсы' },
          {
            name: 'Поддержка',
            path: '/support',
            desc: 'Afdian и бесплатная помощь',
          },
        ],
      },
      {
        id: 'workbench',
        index: '02',
        title: 'Верстак',
        lead: 'Утилиты и немного игры.',
        links: [
          { name: 'Инструменты', path: '/tools', desc: 'Индекс' },
          { name: 'Now', path: '/now', desc: 'Время, погода, ярлыки' },
          { name: 'Мировое время', path: '/time', desc: 'Часовые пояса' },
          { name: 'Календарь', path: '/calendar', desc: 'Месяц' },
          { name: 'Валюты', path: '/currency', desc: 'Курсы' },
          { name: 'Единицы', path: '/units', desc: 'Конвертация' },
          { name: 'QR', path: '/qr', desc: 'Ссылка в QR' },
          { name: 'Пасхалки', path: '/fun', desc: 'Цитаты и инструменты' },
          { name: 'Uses', path: '/uses', desc: 'Стек и границы' },
        ],
      },
      {
        id: 'trust',
        index: '03',
        title: 'Доверие',
        lead: 'Лицензия, приватность и безопасность.',
        links: [
          { name: 'Приватность', path: '/privacy', desc: 'Данные' },
          { name: 'Условия', path: '/terms', desc: 'Правила' },
          { name: 'Лицензия', path: '/license', desc: 'CC и BSD' },
          {
            name: 'Доступность',
            path: '/accessibility',
            desc: 'Клавиатура',
          },
          {
            name: 'Безопасность',
            path: '/security/policy',
            desc: 'Раскрытие',
          },
          {
            name: 'Благодарности',
            path: '/security/acknowledgments',
            desc: 'Исследователи',
          },
          { name: 'Контакты', path: '/contact', desc: 'Написать' },
          { name: 'Карта сайта', path: '/sitemap', desc: 'Вы здесь' },
        ],
      },
      {
        id: 'elsewhere',
        index: '04',
        title: 'Снаружи',
        lead: 'Другие сайты и репозиторий.',
        links: [
          {
            name: 'Блог',
            path: external.blog,
            desc: 'blog.alexander.xin',
            external: true,
          },
          {
            name: 'GitHub',
            path: external.github,
            desc: '@AlexanderJ-Carter',
            external: true,
          },
          {
            name: 'Afdian',
            path: external.afdian,
            desc: 'Поддержка',
            external: true,
          },
          {
            name: 'MyCook',
            path: external.cook,
            desc: 'Рецепты',
            external: true,
          },
          {
            name: 'NetQ',
            path: external.netq,
            desc: 'Сеть',
            external: true,
          },
          {
            name: 'Tool Hub',
            path: external.tools,
            desc: 'Ещё инструменты',
            external: true,
          },
          {
            name: 'Linux Command',
            path: external.linux,
            desc: 'Команды',
            external: true,
          },
          {
            name: 'Git Lab',
            path: external.lab,
            desc: 'Практика Git',
            external: true,
          },
        ],
      },
    ],
    languagesTitle: 'Языки',
    languagesLead: 'Пять способов читать одну студию.',
    languages: [
      { code: 'zh-CN', name: '简体中文', path: '/' },
      { code: 'zh-TW', name: '繁體中文', path: '/zh-TW/' },
      { code: 'en-GB', name: 'English', path: '/en/' },
      { code: 'fr', name: 'Français', path: '/fr/' },
      { code: 'ru', name: 'Русский', path: '/ru/' },
    ],
  },
};
