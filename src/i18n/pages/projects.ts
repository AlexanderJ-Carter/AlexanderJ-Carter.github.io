import type { Lang } from '../types';

export const t: Record<Lang, Record<string, string>> = {
  'zh-CN': {
    title: '个人项目',
    subtitle: '生活向的小项目与站点页面',
    badge: '🛠 Projects',
    intro:
      '这里是偏生活化、好用导向的小项目：记录、工具、页面体验，持续慢慢打磨。',
    filterAll: '全部',
    filterWeb: 'Web',
    filterHardware: '生活',
    filterTools: '工具',
    statusDone: '已完成',
    statusWip: '进行中',
    viewSource: '查看源码',
    viewDemo: '在线演示',
    back: '返回首页',
  },
  'zh-TW': {
    title: '個人專案',
    subtitle: '生活向的小專案與站點頁面',
    badge: '🛠 Projects',
    intro:
      '這裡是偏生活化、好用導向的小專案：記錄、工具、頁面體驗，持續慢慢打磨。',
    filterAll: '全部',
    filterWeb: 'Web',
    filterHardware: '生活',
    filterTools: '工具',
    statusDone: '已完成',
    statusWip: '進行中',
    viewSource: '查看原始碼',
    viewDemo: '線上演示',
    back: '返回首頁',
  },
  'en-GB': {
    title: 'Projects',
    subtitle: 'Lifestyle pages and small projects',
    badge: '🛠 Projects',
    intro:
      'A collection of practical, lifestyle-focused pages and small projects, built for daily use and better UX.',
    filterAll: 'All',
    filterWeb: 'Web',
    filterHardware: 'Lifestyle',
    filterTools: 'Tools',
    statusDone: 'Completed',
    statusWip: 'In Progress',
    viewSource: 'Source',
    viewDemo: 'Demo',
    back: 'Back to home',
  },
  fr: {
    title: 'Projets',
    subtitle: 'Pages lifestyle et petits projets',
    badge: '🛠 Projets',
    intro:
      'Une collection de pages pratiques et de petits projets orientés usage quotidien.',
    filterAll: 'Tous',
    filterWeb: 'Web',
    filterHardware: 'Lifestyle',
    filterTools: 'Outils',
    statusDone: 'Terminé',
    statusWip: 'En cours',
    viewSource: 'Code source',
    viewDemo: 'Démo',
    back: "Retour à l'accueil",
  },
  ru: {
    title: 'Проекты',
    subtitle: 'Лайфстайл-страницы и небольшие проекты',
    badge: '🛠 Проекты',
    intro:
      'Подборка практичных, жизненных страниц и небольших проектов для повседневного использования.',
    filterAll: 'Все',
    filterWeb: 'Web',
    filterHardware: 'Lifestyle',
    filterTools: 'Инструменты',
    statusDone: 'Завершён',
    statusWip: 'В работе',
    viewSource: 'Исходный код',
    viewDemo: 'Демо',
    back: 'На главную',
  },
};

export const projectsData: Record<Lang, any[]> = {
  'zh-CN': [
    {
      title: '个人主页',
      desc: '你现在所在的网站。Astro + Tailwind CSS + TypeScript 构建的静态站点，多语言支持，部署在 GitHub Pages。',
      tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      status: 'wip',
      github:
        'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io',
      demo: 'https://alexander.xin',
    },
    {
      title: 'Now 实时面板',
      desc: '展示本地时间、UTC、时间戳和常用入口，作为访客友好的即时信息页。',
      tags: ['Time', 'UX', 'Now'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/now',
    },
    {
      title: 'QR 码生成器',
      desc: '纯前端 QR 码生成工具，粘贴链接即可生成可下载的二维码，无需后端。',
      tags: ['JavaScript', 'Astro', 'Web API'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/qr',
    },
    {
      title: '阅读清单页面',
      desc: '三条阅读路线、深读笔记与延伸文章：记录一本书如何改写观察与实践。',
      tags: ['Reading', 'Essay', 'Notes'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/reading-list',
    },
    {
      title: '汇率转换小工具',
      desc: '调用开放汇率 API 的前端汇率换算页，支持常用货币，轻量、无追踪。',
      tags: ['JavaScript', 'Fetch API', 'Astro'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/currency',
    },
  ],
  'zh-TW': [
    {
      title: '個人主頁',
      desc: '你現在所在的網站。Astro + Tailwind CSS + TypeScript 構建的靜態站點，多語言支援，部署在 GitHub Pages。',
      tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      status: 'wip',
      github:
        'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io',
      demo: 'https://alexander.xin',
    },
    {
      title: 'Now 即時面板',
      desc: '展示本地時間、UTC、時間戳和常用入口，作為訪客友好的即時資訊頁。',
      tags: ['Time', 'UX', 'Now'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/now',
    },
    {
      title: 'QR 碼生成器',
      desc: '純前端 QR 碼生成工具，貼上連結即可生成可下載的二維碼，無需後端。',
      tags: ['JavaScript', 'Astro', 'Web API'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/qr',
    },
    {
      title: '閱讀清單頁面',
      desc: '三條閱讀路線、深讀筆記與延伸文章：記錄一本書如何改寫觀察與實踐。',
      tags: ['Reading', 'Essay', 'Notes'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/reading-list',
    },
    {
      title: '匯率換算小工具',
      desc: '呼叫開放匯率 API 的前端匯率換算頁，支援常用貨幣，輕量、無追蹤。',
      tags: ['JavaScript', 'Fetch API', 'Astro'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/currency',
    },
  ],
  'en-GB': [
    {
      title: 'Personal Website',
      desc: "The site you're on. A static site built with Astro + Tailwind CSS + TypeScript, multilingual, deployed on GitHub Pages.",
      tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      status: 'wip',
      github:
        'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io',
      demo: 'https://alexander.xin',
    },
    {
      title: 'Now Live Panel',
      desc: 'A visitor-first page with local time, UTC, timestamp and practical quick links.',
      tags: ['Time', 'UX', 'Now'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/now',
    },
    {
      title: 'QR Code Generator',
      desc: 'A zero-backend, client-side QR code generator. Paste a URL, get a downloadable QR code instantly.',
      tags: ['JavaScript', 'Astro', 'Web API'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/qr',
    },
    {
      title: 'Reading List Page',
      desc: 'Three reading routes, reflective notes and essay links — how each book rewrote how I look and work.',
      tags: ['Reading', 'Essay', 'Notes'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/reading-list',
    },
    {
      title: 'Currency Converter',
      desc: 'A lightweight, tracking-free currency converter that calls an open exchange rates API.',
      tags: ['JavaScript', 'Fetch API', 'Astro'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/currency',
    },
  ],
  fr: [
    {
      title: 'Site personnel',
      desc: 'Le site sur lequel vous vous trouvez. Un site statique Astro + Tailwind CSS + TypeScript, multilingue, hébergé sur GitHub Pages.',
      tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      status: 'wip',
      github:
        'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io',
      demo: 'https://alexander.xin',
    },
    {
      title: 'Panneau Now',
      desc: 'Une page orientée visiteur avec heure locale, UTC, timestamp et accès rapides.',
      tags: ['Time', 'UX', 'Now'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/now',
    },
    {
      title: 'Générateur de QR Code',
      desc: 'Générateur de QR code côté client, sans backend. Collez une URL, obtenez un QR code téléchargeable.',
      tags: ['JavaScript', 'Astro', 'Web API'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/qr',
    },
    {
      title: 'Convertisseur de devises',
      desc: 'Convertisseur de devises léger et sans tracking, utilisant une API de taux de change ouverte.',
      tags: ['JavaScript', 'Fetch API', 'Astro'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/currency',
    },
  ],
  ru: [
    {
      title: 'Личный сайт',
      desc: 'Сайт, на котором вы сейчас находитесь. Статический сайт на Astro + Tailwind CSS + TypeScript, многоязычный, развёрнут на GitHub Pages.',
      tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      status: 'wip',
      github:
        'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io',
      demo: 'https://alexander.xin',
    },
    {
      title: 'Now живая панель',
      desc: 'Страница для посетителей с локальным временем, UTC, timestamp и быстрыми ссылками.',
      tags: ['Time', 'UX', 'Now'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/now',
    },
    {
      title: 'Генератор QR-кодов',
      desc: 'Клиентский генератор QR-кодов без бэкенда. Вставьте URL — получите QR-код для скачивания.',
      tags: ['JavaScript', 'Astro', 'Web API'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/qr',
    },
    {
      title: 'Конвертер валют',
      desc: 'Лёгкий конвертер валют без трекинга, использующий открытый API обменных курсов.',
      tags: ['JavaScript', 'Fetch API', 'Astro'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/currency',
    },
  ],
};

export const extraProjectsData: Record<Lang, any[]> = {
  'zh-CN': [
    {
      title: '画廊灯箱与筛选',
      desc: '为摄影页补充分类筛选、来源筛选、图片加载骨架和键盘可操作的灯箱浏览体验。',
      tags: ['Gallery', 'A11y', 'UX'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/gallery',
    },
    {
      title: '彩蛋实验室',
      desc: '把随机语录、翻牌记忆、打字小测和呼吸节奏器组合成轻量的互动角落。',
      tags: ['Interaction', 'Game', 'Vanilla JS'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/fun',
    },
    {
      title: '站点信任页面',
      desc: '整理隐私、条款、许可证、无障碍与安全披露页面，让个人站也有清晰边界。',
      tags: ['Security', 'Policy', 'Docs'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/security/policy',
    },
  ],
  'zh-TW': [
    {
      title: '畫廊燈箱與篩選',
      desc: '為攝影頁補充分類篩選、來源篩選、圖片載入骨架和鍵盤可操作的燈箱瀏覽體驗。',
      tags: ['Gallery', 'A11y', 'UX'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/gallery',
    },
    {
      title: '彩蛋實驗室',
      desc: '把隨機語錄、翻牌記憶、打字小測和呼吸節奏器組合成輕量的互動角落。',
      tags: ['Interaction', 'Game', 'Vanilla JS'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/fun',
    },
    {
      title: '站點信任頁面',
      desc: '整理隱私、條款、許可證、無障礙與安全披露頁面，讓個人站也有清晰邊界。',
      tags: ['Security', 'Policy', 'Docs'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/security/policy',
    },
  ],
  'en-GB': [
    {
      title: 'Gallery Lightbox & Filters',
      desc: 'Category filters, source filters, image skeletons and a keyboard-friendly lightbox for the photography page.',
      tags: ['Gallery', 'A11y', 'UX'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/gallery',
    },
    {
      title: 'Easter Egg Lab',
      desc: 'A lightweight interaction corner with random quotes, memory match, a typing test and a breathing rhythm widget.',
      tags: ['Interaction', 'Game', 'Vanilla JS'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/fun',
    },
    {
      title: 'Trust Pages',
      desc: 'Privacy, terms, licence, accessibility and vulnerability disclosure pages give the personal site clearer boundaries.',
      tags: ['Security', 'Policy', 'Docs'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/security/policy',
    },
  ],
  fr: [
    {
      title: 'Galerie avec lightbox et filtres',
      desc: 'Filtres par catégorie et source, squelettes de chargement et lightbox utilisable au clavier.',
      tags: ['Gallery', 'A11y', 'UX'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/gallery',
    },
    {
      title: 'Laboratoire Easter Egg',
      desc: 'Un coin interactif léger avec citations, jeu de mémoire, test de frappe et rythme respiratoire.',
      tags: ['Interaction', 'Game', 'Vanilla JS'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/fun',
    },
    {
      title: 'Pages de confiance',
      desc: 'Confidentialité, conditions, licence, accessibilité et divulgation de vulnérabilités clarifient le cadre du site.',
      tags: ['Security', 'Policy', 'Docs'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/security/policy',
    },
  ],
  ru: [
    {
      title: 'Галерея: лайтбокс и фильтры',
      desc: 'Фильтры по категориям и источникам, скелетоны загрузки и лайтбокс с поддержкой клавиатуры.',
      tags: ['Gallery', 'A11y', 'UX'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/gallery',
    },
    {
      title: 'Лаборатория пасхалок',
      desc: 'Лёгкий интерактивный уголок: цитаты, игра памяти, тест набора и дыхательный ритм.',
      tags: ['Interaction', 'Game', 'Vanilla JS'],
      category: 'tools',
      status: 'done',
      github: null,
      demo: '/fun',
    },
    {
      title: 'Страницы доверия',
      desc: 'Конфиденциальность, условия, лицензия, доступность и политика уязвимостей задают ясные границы сайта.',
      tags: ['Security', 'Policy', 'Docs'],
      category: 'web',
      status: 'done',
      github: null,
      demo: '/security/policy',
    },
  ],
};

export const projectPrinciplesData: Record<Lang, any> = {
  'zh-CN': {
    title: '我选择项目的方式',
    intro:
      '这个列表会优先收录能被真实使用、能长期维护、能解释清楚取舍的小项目。',
    items: [
      {
        icon: '⚡',
        title: '轻量优先',
        desc: '能静态生成就不引入后端，能用原生能力就不堆依赖。',
      },
      {
        icon: '🔐',
        title: '隐私友好',
        desc: '减少第三方脚本，尽量让工具在浏览器本地完成。',
      },
      {
        icon: '♿',
        title: '可访问',
        desc: '按钮、表单、筛选和弹窗都保留键盘路径与可见焦点。',
      },
    ],
  },
  'zh-TW': {
    title: '我選擇專案的方式',
    intro:
      '這個列表會優先收錄能被真實使用、能長期維護、能解釋清楚取捨的小專案。',
    items: [
      {
        icon: '⚡',
        title: '輕量優先',
        desc: '能靜態生成就不引入後端，能用原生能力就不堆依賴。',
      },
      {
        icon: '🔐',
        title: '隱私友好',
        desc: '減少第三方腳本，盡量讓工具在瀏覽器本地完成。',
      },
      {
        icon: '♿',
        title: '可訪問',
        desc: '按鈕、表單、篩選和彈窗都保留鍵盤路徑與可見焦點。',
      },
    ],
  },
  'en-GB': {
    title: 'How I Pick Projects',
    intro:
      'This list prioritises small projects that can be used for real, maintained over time and explained with clear tradeoffs.',
    items: [
      {
        icon: '⚡',
        title: 'Lightweight first',
        desc: 'Prefer static output over backends, and native browser APIs over extra dependencies.',
      },
      {
        icon: '🔐',
        title: 'Privacy-friendly',
        desc: 'Reduce third-party scripts and keep utility workflows inside the browser where possible.',
      },
      {
        icon: '♿',
        title: 'Accessible by default',
        desc: 'Buttons, forms, filters and dialogs keep keyboard paths and visible focus states.',
      },
    ],
  },
  fr: {
    title: 'Comment je choisis les projets',
    intro:
      'La liste privilégie les petits projets réellement utiles, maintenables et capables d’expliquer leurs compromis.',
    items: [
      {
        icon: '⚡',
        title: 'Léger d’abord',
        desc: 'Préférer le statique aux backends, et les API natives aux dépendances superflues.',
      },
      {
        icon: '🔐',
        title: 'Respect de la vie privée',
        desc: 'Réduire les scripts tiers et garder les outils dans le navigateur quand c’est possible.',
      },
      {
        icon: '♿',
        title: 'Accessible par défaut',
        desc: 'Boutons, formulaires, filtres et dialogues gardent clavier et focus visible.',
      },
    ],
  },
  ru: {
    title: 'Как я выбираю проекты',
    intro:
      'В списке важнее небольшие проекты, которыми можно пользоваться, которые можно поддерживать и понятно объяснять.',
    items: [
      {
        icon: '⚡',
        title: 'Сначала лёгкость',
        desc: 'Статика вместо бэкенда, нативные API браузера вместо лишних зависимостей.',
      },
      {
        icon: '🔐',
        title: 'Приватность',
        desc: 'Меньше сторонних скриптов, больше локальной работы в браузере.',
      },
      {
        icon: '♿',
        title: 'Доступность',
        desc: 'Кнопки, формы, фильтры и окна сохраняют клавиатуру и видимый фокус.',
      },
    ],
  },
};

export const externalProjects = [
  {
    title: 'MyCook',
    github: 'https://github.com/AlexanderJ-Carter/MyCook',
    demo: 'https://cook.alexander.xin',
    tags: ['Recipes', 'Docs', 'Web'],
    desc: {
      'zh-CN':
        '面向日常做饭的菜谱站，把“今天吃什么、步骤怎么做、材料怎么查”整理成更可执行的入口。',
      'zh-TW':
        '面向日常做飯的菜譜站，把「今天吃什麼、步驟怎麼做、材料怎麼查」整理成更可執行的入口。',
      'en-GB':
        'A recipe site shaped around daily cooking: what to eat, how to follow steps, and how to find ingredients quickly.',
      fr: 'Un site de recettes pensé pour le quotidien : choisir, suivre les étapes et retrouver les ingrédients.',
      ru: 'Сайт рецептов для повседневной готовки: что приготовить, как пройти шаги и как найти ингредиенты.',
    },
  },
  {
    title: 'Linux Command',
    github: 'https://github.com/AlexanderJ-Carter/linux-command',
    demo: 'https://linux-command.alexander.xin',
    tags: ['Linux', 'CLI', 'Reference'],
    desc: {
      'zh-CN':
        '把常用 Linux 命令整理成速查型页面，适合在排查、部署和学习时快速回忆参数与用法。',
      'zh-TW':
        '把常用 Linux 命令整理成速查型頁面，適合在排查、部署和學習時快速回憶參數與用法。',
      'en-GB':
        'A quick-reference site for common Linux commands, useful during debugging, deployment and learning.',
      fr: 'Référence rapide pour les commandes Linux courantes, utile en diagnostic, déploiement et apprentissage.',
      ru: 'Быстрый справочник по Linux-командам для диагностики, деплоя и обучения.',
    },
  },
  {
    title: 'NetQ',
    github: 'https://github.com/AlexanderJ-Carter/netq',
    demo: 'https://netq.alexander.xin',
    tags: ['Network', 'CLI', 'Troubleshooting'],
    desc: {
      'zh-CN':
        '交互式网络排查 CLI：把 DNS、连通性、HTTP、路由等检查步骤组织成一条更清晰的排查路径。',
      'zh-TW':
        '互動式網路排查 CLI：把 DNS、連通性、HTTP、路由等檢查步驟組織成一條更清晰的排查路徑。',
      'en-GB':
        'An interactive network troubleshooting CLI that organises DNS, reachability, HTTP and routing checks into a clearer flow.',
      fr: 'CLI de diagnostic réseau qui organise DNS, connectivité, HTTP et routage en flux lisible.',
      ru: 'Интерактивный CLI для сетевой диагностики: DNS, доступность, HTTP и маршруты в понятном потоке.',
    },
  },
];
