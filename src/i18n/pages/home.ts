import type { Lang } from '../types';

export type HomeFeaturedItem = {
  title: string;
  category: string;
  image: string;
};

export type HomePathItem = {
  title: string;
  href: string;
};

export type HomeElsewhereItem = {
  title: string;
  desc: string;
  href: string;
};

export type HomeCopy = {
  brand: string;
  tagline: string;
  ctaGallery: string;
  ctaWriting: string;
  scrollHint: string;
  featuredTitle: string;
  featuredSubtitle: string;
  featuredViewAll: string;
  featured: HomeFeaturedItem[];
  studioTitle: string;
  studioBody: string;
  studioCta: string;
  pathsLabel: string;
  paths: HomePathItem[];
  researchKicker: string;
  researchTitle: string;
  researchBody: string;
  researchCta: string;
  methodKicker: string;
  methodTitle: string;
  methodLead: string;
  method: { title: string; body: string }[];
  sheetCaption: string;
  elsewhereTitle: string;
  elsewhereSubtitle: string;
  elsewhereTools: string;
  elsewhereProjects: string;
  elsewhereProjectsDesc: string;
  elsewhere: HomeElsewhereItem[];
  writingTitle: string;
  writingSubtitle: string;
  writingViewAll: string;
  writingEmpty: string;
  readingTitle: string;
  readingBody: string;
  readingCta: string;
  connectTitle: string;
  connectSubtitle: string;
  connectCta: string;
  connectBlog: string;
  connectGithub: string;
};

const featuredShared: HomeFeaturedItem[] = [
  {
    title: '山间晨雾',
    category: '风景',
    image: '/img/gallery-optimized/landscape-01-md.webp',
  },
  {
    title: '雨后花瓣',
    category: '自然',
    image: '/img/gallery-optimized/nature-flower-01-md.webp',
  },
  {
    title: '精致甜点',
    category: '美食',
    image: '/img/gallery-optimized/food-01-md.webp',
  },
];

const elsewhereShared: HomeElsewhereItem[] = [
  {
    title: 'MyCook',
    desc: '做饭菜谱',
    href: 'https://cook.alexander.xin',
  },
  {
    title: 'Linux Command',
    desc: '常用 Linux 指令速查',
    href: 'https://linux-command.alexander.xin',
  },
  {
    title: 'NetQ',
    desc: '网络排查小实验室',
    href: 'https://netq.alexander.xin',
  },
  {
    title: 'Git Lab',
    desc: 'Git 协作练习',
    href: 'https://lab.alexander.xin',
  },
];

export const homeCopy: Record<Lang, HomeCopy> = {
  'zh-CN': {
    brand: 'Alexander Carter',
    tagline: '用镜头记录光线，用文字整理思绪。',
    ctaGallery: '进入画廊',
    ctaWriting: '阅读写作',
    scrollHint: '向下浏览',
    featuredTitle: '精选作品',
    featuredSubtitle: '几张值得先看的影像。',
    featuredViewAll: '查看全部作品',
    featured: featuredShared,
    studioTitle: '这是一间慢慢长出来的工作室',
    studioBody:
      '摄影记录光线的温度，写作整理实践里的取舍，小工具解决日常小摩擦。页面保持静态、隐私友好，并尽量让键盘与屏幕阅读器也能顺利走完路径。',
    studioCta: '关于我',
    pathsLabel: '正在打磨',
    paths: [
      { title: '影像整理', href: '/gallery' },
      { title: '写作与深读', href: '/writing' },
      { title: '小工具索引', href: '/tools' },
    ],
    researchKicker: 'Research',
    researchTitle: 'AgentSociety',
    researchBody:
      '清华 FIB Lab 协作：LLM 社会智能体与可执行社会科学。扩展、CI、文档与社会人仿真技能。',
    researchCta: '研究档案',
    methodKicker: 'Method',
    methodTitle: '暗房三法则',
    methodLead: '站点如何取舍的工作隐喻——曝光、对焦、冲印。',
    method: [
      {
        title: 'Expose · 曝光',
        body: '只放真实可访问的内容与链接；坏链不进索引。',
      },
      {
        title: 'Focus · 对焦',
        body: '一页一件事。导航分组，正文不堆看板。',
      },
      {
        title: 'Print · 冲印',
        body: '静态生成、可离线翻阅；隐私默认，键盘可达。',
      },
    ],
    sheetCaption: 'Contact sheet · 3 frames',
    elsewhereTitle: '站外角落',
    elsewhereSubtitle: '独立子站与仓库——只放目前可访问的入口。',
    elsewhereTools: '工具索引',
    elsewhereProjects: '全部项目',
    elsewhereProjectsDesc: '开源与自研一览（含演示链接）',
    elsewhere: elsewhereShared,
    writingTitle: '近期写作',
    writingSubtitle: '不会很快过期的思考。',
    writingViewAll: '全部文章',
    writingEmpty: '暂无文章',
    readingTitle: '读读看看',
    readingBody: '值得反复翻阅的书与文章——深读笔记与实践 takeaway。',
    readingCta: '打开阅读清单',
    connectTitle: '想聊聊？',
    connectSubtitle: '技术讨论、项目合作或随便聊聊，都欢迎。',
    connectCta: '联系我',
    connectBlog: '博客',
    connectGithub: 'GitHub',
  },
  'zh-TW': {
    brand: 'Alexander Carter',
    tagline: '用鏡頭記錄光線，用文字整理思緒。',
    ctaGallery: '進入畫廊',
    ctaWriting: '閱讀寫作',
    scrollHint: '向下瀏覽',
    featuredTitle: '精選作品',
    featuredSubtitle: '幾張值得先看的影像。',
    featuredViewAll: '查看全部作品',
    featured: [
      {
        title: '山間晨霧',
        category: '風景',
        image: '/img/gallery-optimized/landscape-01-md.webp',
      },
      {
        title: '雨後花瓣',
        category: '自然',
        image: '/img/gallery-optimized/nature-flower-01-md.webp',
      },
      {
        title: '精緻甜點',
        category: '美食',
        image: '/img/gallery-optimized/food-01-md.webp',
      },
    ],
    studioTitle: '這是一間慢慢長出來的工作室',
    studioBody:
      '攝影記錄光線的溫度，寫作整理實踐裡的取捨，小工具解決日常小摩擦。頁面保持靜態、隱私友好，並盡量讓鍵盤與螢幕閱讀器也能順利走完路徑。',
    studioCta: '關於我',
    pathsLabel: '正在打磨',
    paths: [
      { title: '影像整理', href: '/gallery' },
      { title: '寫作與深讀', href: '/writing' },
      { title: '小工具索引', href: '/tools' },
    ],
    researchKicker: 'Research',
    researchTitle: 'AgentSociety',
    researchBody:
      '清華 FIB Lab 協作：LLM 社會智能體與可執行社會科學。擴展、CI、文件與社會人仿真技能。',
    researchCta: '研究檔案',
    methodKicker: 'Method',
    methodTitle: '暗房三法則',
    methodLead: '站點如何取捨的工作隱喻——曝光、對焦、沖印。',
    method: [
      {
        title: 'Expose · 曝光',
        body: '只放真實可訪問的內容與連結；壞鏈不進索引。',
      },
      {
        title: 'Focus · 對焦',
        body: '一頁一件事。導航分組，正文不堆看板。',
      },
      {
        title: 'Print · 沖印',
        body: '靜態生成、可離線翻閱；隱私預設，鍵盤可達。',
      },
    ],
    sheetCaption: 'Contact sheet · 3 frames',
    elsewhereTitle: '站外角落',
    elsewhereSubtitle: '獨立子站與倉庫——只放目前可訪問的入口。',
    elsewhereTools: '工具索引',
    elsewhereProjects: '全部專案',
    elsewhereProjectsDesc: '開源與自研一覽（含演示連結）',
    elsewhere: [
      {
        title: 'MyCook',
        desc: '做飯菜譜',
        href: 'https://cook.alexander.xin',
      },
      {
        title: 'Linux Command',
        desc: '常用 Linux 指令速查',
        href: 'https://linux-command.alexander.xin',
      },
      {
        title: 'NetQ',
        desc: '網路排查小實驗室',
        href: 'https://netq.alexander.xin',
      },
      {
        title: 'Git Lab',
        desc: 'Git 協作練習',
        href: 'https://lab.alexander.xin',
      },
    ],
    writingTitle: '近期寫作',
    writingSubtitle: '不會很快過期的思考。',
    writingViewAll: '全部文章',
    writingEmpty: '暫無文章',
    readingTitle: '讀讀看看',
    readingBody: '值得反覆翻閱的書與文章——深讀筆記與實踐 takeaway。',
    readingCta: '打開閱讀清單',
    connectTitle: '想聊聊？',
    connectSubtitle: '技術討論、專案合作或隨便聊聊，都歡迎。',
    connectCta: '聯繫我',
    connectBlog: '部落格',
    connectGithub: 'GitHub',
  },
  'en-GB': {
    brand: 'Alexander Carter',
    tagline: 'Light through a lens. Thought through words.',
    ctaGallery: 'Enter gallery',
    ctaWriting: 'Read writing',
    scrollHint: 'Scroll',
    featuredTitle: 'Selected work',
    featuredSubtitle: 'A few images worth seeing first.',
    featuredViewAll: 'View all work',
    featured: [
      {
        title: 'Morning Mist',
        category: 'Landscape',
        image: '/img/gallery-optimized/landscape-01-md.webp',
      },
      {
        title: 'Rain Petals',
        category: 'Nature',
        image: '/img/gallery-optimized/nature-flower-01-md.webp',
      },
      {
        title: 'Fine Dessert',
        category: 'Food',
        image: '/img/gallery-optimized/food-01-md.webp',
      },
    ],
    studioTitle: 'A studio that grows slowly',
    studioBody:
      'Photographs keep the warmth of light. Writing keeps the trade-offs of practice. Small tools remove everyday friction. The site stays static and privacy-friendly, with keyboard and screen-reader paths intact.',
    studioCta: 'About me',
    pathsLabel: 'Currently shaping',
    paths: [
      { title: 'Image curation', href: '/gallery' },
      { title: 'Writing & deep reading', href: '/writing' },
      { title: 'Tool index', href: '/tools' },
    ],
    researchKicker: 'Research',
    researchTitle: 'AgentSociety',
    researchBody:
      'Tsinghua FIB Lab collaboration: LLM social agents and executable social science — extensions, CI, docs, and socially grounded agent skills.',
    researchCta: 'Research dossier',
    methodKicker: 'Method',
    methodTitle: 'Darkroom rules',
    methodLead: 'How this folio decides what to keep — expose, focus, print.',
    method: [
      {
        title: 'Expose',
        body: 'Only live content and working links. Broken URLs stay out.',
      },
      {
        title: 'Focus',
        body: 'One job per page. Grouped navigation — no dashboard clutter.',
      },
      {
        title: 'Print',
        body: 'Static generation you can revisit offline. Privacy by default.',
      },
    ],
    sheetCaption: 'Contact sheet · 3 frames',
    elsewhereTitle: 'Elsewhere',
    elsewhereSubtitle: 'Independent sites — live links only.',
    elsewhereTools: 'Tool index',
    elsewhereProjects: 'All projects',
    elsewhereProjectsDesc: 'Open-source and personal demos in one place',
    elsewhere: [
      {
        title: 'MyCook',
        desc: 'Cooking recipes',
        href: 'https://cook.alexander.xin',
      },
      {
        title: 'Linux Command',
        desc: 'Quick Linux command reference',
        href: 'https://linux-command.alexander.xin',
      },
      {
        title: 'NetQ',
        desc: 'Network troubleshooting lab',
        href: 'https://netq.alexander.xin',
      },
      {
        title: 'Git Lab',
        desc: 'Git collaboration practice',
        href: 'https://lab.alexander.xin',
      },
    ],
    writingTitle: 'Recent writing',
    writingSubtitle: 'Thoughts that should age slowly.',
    writingViewAll: 'All articles',
    writingEmpty: 'No posts yet',
    readingTitle: 'Reading list',
    readingBody:
      'Books and essays worth revisiting — deep notes and practical takeaways.',
    readingCta: 'Open reading list',
    connectTitle: 'Want to chat?',
    connectSubtitle: 'Tech talk, collaboration, or a casual note — welcome.',
    connectCta: 'Get in touch',
    connectBlog: 'Blog',
    connectGithub: 'GitHub',
  },
  fr: {
    brand: 'Alexander Carter',
    tagline: 'La lumière par l’objectif. La pensée par les mots.',
    ctaGallery: 'Voir la galerie',
    ctaWriting: 'Lire les écrits',
    scrollHint: 'Défiler',
    featuredTitle: 'Sélection',
    featuredSubtitle: 'Quelques images à voir en premier.',
    featuredViewAll: 'Voir tout',
    featured: [
      {
        title: 'Brume matinale',
        category: 'Paysage',
        image: '/img/gallery-optimized/landscape-01-md.webp',
      },
      {
        title: 'Pétales de pluie',
        category: 'Nature',
        image: '/img/gallery-optimized/nature-flower-01-md.webp',
      },
      {
        title: 'Dessert fin',
        category: 'Nourriture',
        image: '/img/gallery-optimized/food-01-md.webp',
      },
    ],
    studioTitle: 'Un atelier qui grandit lentement',
    studioBody:
      'La photo garde la chaleur de la lumière. L’écriture garde les compromis de la pratique. Les petits outils retirent les frottements du quotidien. Le site reste statique, respectueux de la vie privée, et praticable au clavier.',
    studioCta: 'À propos',
    pathsLabel: 'En cours',
    paths: [
      { title: 'Curation photo', href: '/gallery' },
      { title: 'Écrits et lectures', href: '/writing' },
      { title: 'Index des outils', href: '/tools' },
    ],
    researchKicker: 'Research',
    researchTitle: 'AgentSociety',
    researchBody:
      'Collaboration FIB Lab (Tsinghua) : agents sociaux LLM et sciences sociales exécutables — extensions, CI, docs et compétences d’agents.',
    researchCta: 'Dossier recherche',
    methodKicker: 'Method',
    methodTitle: 'Règles de chambre noire',
    methodLead: 'Comment ce folio décide — exposer, faire le point, tirer.',
    method: [
      {
        title: 'Expose',
        body: 'Uniquement du contenu vivant et des liens qui marchent.',
      },
      {
        title: 'Focus',
        body: 'Une tâche par page. Navigation groupée, sans tableau de bord.',
      },
      {
        title: 'Print',
        body: 'Génération statique, relisible hors ligne. Vie privée par défaut.',
      },
    ],
    sheetCaption: 'Planche-contact · 3 frames',
    elsewhereTitle: 'Ailleurs',
    elsewhereSubtitle: 'Sites indépendants — liens actifs seulement.',
    elsewhereTools: 'Index des outils',
    elsewhereProjects: 'Tous les projets',
    elsewhereProjectsDesc: 'Open source et démos personnelles',
    elsewhere: [
      {
        title: 'MyCook',
        desc: 'Recettes',
        href: 'https://cook.alexander.xin',
      },
      {
        title: 'Linux Command',
        desc: 'Référence des commandes Linux',
        href: 'https://linux-command.alexander.xin',
      },
      {
        title: 'NetQ',
        desc: 'Labo réseau',
        href: 'https://netq.alexander.xin',
      },
      {
        title: 'Git Lab',
        desc: 'Pratique Git collaborative',
        href: 'https://lab.alexander.xin',
      },
    ],
    writingTitle: 'Écrits récents',
    writingSubtitle: 'Des idées qui vieillissent lentement.',
    writingViewAll: 'Tous les articles',
    writingEmpty: 'Pas encore d’articles',
    readingTitle: 'Liste de lecture',
    readingBody:
      'Livres et essais à relire — notes profondes et takeaways pratiques.',
    readingCta: 'Ouvrir la liste',
    connectTitle: 'Envie d’échanger ?',
    connectSubtitle: 'Tech, collaboration ou message simple — bienvenu.',
    connectCta: 'Me contacter',
    connectBlog: 'Blog',
    connectGithub: 'GitHub',
  },
  ru: {
    brand: 'Alexander Carter',
    tagline: 'Свет через объектив. Мысль через слова.',
    ctaGallery: 'В галерею',
    ctaWriting: 'К статьям',
    scrollHint: 'Дальше',
    featuredTitle: 'Избранное',
    featuredSubtitle: 'Несколько кадров, с которых стоит начать.',
    featuredViewAll: 'Смотреть всё',
    featured: [
      {
        title: 'Утренний туман',
        category: 'Пейзаж',
        image: '/img/gallery-optimized/landscape-01-md.webp',
      },
      {
        title: 'Лепестки дождя',
        category: 'Природа',
        image: '/img/gallery-optimized/nature-flower-01-md.webp',
      },
      {
        title: 'Десерт',
        category: 'Еда',
        image: '/img/gallery-optimized/food-01-md.webp',
      },
    ],
    studioTitle: 'Студия, которая растёт медленно',
    studioBody:
      'Фотографии хранят тепло света. Тексты — компромиссы практики. Маленькие инструменты снимают повседневное трение. Сайт остаётся статичным и бережным к приватности, с удобными путями для клавиатуры.',
    studioCta: 'Обо мне',
    pathsLabel: 'Сейчас в работе',
    paths: [
      { title: 'Кураторство', href: '/gallery' },
      { title: 'Статьи и чтение', href: '/writing' },
      { title: 'Индекс утилит', href: '/tools' },
    ],
    researchKicker: 'Research',
    researchTitle: 'AgentSociety',
    researchBody:
      'Сотрудничество с FIB Lab (Tsinghua): LLM-агенты и исполнимая социальная наука — расширения, CI, документация и навыки агентов.',
    researchCta: 'Досье исследований',
    methodKicker: 'Method',
    methodTitle: 'Правила тёмной комнаты',
    methodLead: 'Как folio решает, что оставить — экспозиция, фокус, печать.',
    method: [
      {
        title: 'Expose',
        body: 'Только живой контент и рабочие ссылки. Битые URL — вне индекса.',
      },
      {
        title: 'Focus',
        body: 'Одна задача на страницу. Навигация по группам, без дашборда.',
      },
      {
        title: 'Print',
        body: 'Статическая сборка, можно читать офлайн. Приватность по умолчанию.',
      },
    ],
    sheetCaption: 'Контактный лист · 3 кадра',
    elsewhereTitle: 'Снаружи',
    elsewhereSubtitle: 'Независимые сайты — только рабочие ссылки.',
    elsewhereTools: 'Индекс утилит',
    elsewhereProjects: 'Все проекты',
    elsewhereProjectsDesc: 'Open source и личные демо',
    elsewhere: [
      {
        title: 'MyCook',
        desc: 'Рецепты',
        href: 'https://cook.alexander.xin',
      },
      {
        title: 'Linux Command',
        desc: 'Справочник команд Linux',
        href: 'https://linux-command.alexander.xin',
      },
      {
        title: 'NetQ',
        desc: 'Сетевая лаборатория',
        href: 'https://netq.alexander.xin',
      },
      {
        title: 'Git Lab',
        desc: 'Практика Git',
        href: 'https://lab.alexander.xin',
      },
    ],
    writingTitle: 'Недавние статьи',
    writingSubtitle: 'Мысли, которые стареют медленно.',
    writingViewAll: 'Все статьи',
    writingEmpty: 'Пока нет статей',
    readingTitle: 'Список чтения',
    readingBody:
      'Книги и эссе, к которым возвращаешься — глубокие заметки и takeaway.',
    readingCta: 'Открыть список',
    connectTitle: 'Написать?',
    connectSubtitle: 'Техника, совместная работа или просто сообщение.',
    connectCta: 'Связаться',
    connectBlog: 'Блог',
    connectGithub: 'GitHub',
  },
};
