import type { Lang } from '../types';

export type AboutLink = {
  label: string;
  href: string;
  note: string;
  external?: boolean;
};

export type AboutProject = {
  name: string;
  role: string;
  desc: string;
  href: string;
};

export type AboutCopy = {
  kicker: string;
  title: string;
  motto: string;
  subtitle: string;
  meta: string[];
  introTitle: string;
  paragraphs: string[];
  researchTitle: string;
  researchLead: string;
  researchBody: string;
  collabLabel: string;
  collabHref: string;
  platformLabel: string;
  platformHref: string;
  pubTitle: string;
  pubYear: string;
  pubName: string;
  pubVenue: string;
  pubAbs: string;
  pubPdf: string;
  nowTitle: string;
  nowItems: string[];
  workTitle: string;
  workIntro: string;
  projects: AboutProject[];
  stackTitle: string;
  stackGroups: { title: string; items: string[] }[];
  langsTitle: string;
  langs: { name: string; level: string }[];
  connectTitle: string;
  connectIntro: string;
  links: AboutLink[];
  back: string;
};

const projectsShared = {
  agentsociety: {
    href: 'https://github.com/tsinghua-fib-lab/AgentSociety',
  },
  skills: {
    href: 'https://github.com/AlexanderJ-Carter/AgentSociety2-Agent-Skills',
  },
  site: {
    href: 'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io',
  },
  mips: {
    href: 'https://github.com/AlexanderJ-Carter/MIPS-Pipeline-Verilog',
  },
  netq: {
    href: 'https://github.com/AlexanderJ-Carter/netq',
  },
  cook: {
    href: 'https://cook.alexander.xin',
  },
};

export const aboutCopy: Record<Lang, AboutCopy> = {
  'zh-CN': {
    kicker: 'About',
    title: '关于',
    motto: '日子不必很耀眼，但要很喜欢。',
    subtitle: '学生开发者 · LLM 智能体与可执行社会科学',
    meta: ['北京', '在校生', '开发者'],
    introTitle: '个人简介',
    paragraphs: [
      '你好，我是 Alexander James Carter。北京在读本科生，专业方向电子信息科学与技术；平时把软件、电子、Linux 与 Verilog 放在同一条实践线上。',
      '我更在意把研究想法做成可运行、可审计的系统：从社会智能体仿真，到静态站点与小工具。技术之外，摄影与写作帮我训练观察——记录光影，也整理取舍。',
      '这个站点是长期维护的个人角落：公开笔记、开源工程与一点点生活实验。清爽、稳定、长期主义。',
    ],
    researchTitle: '研究',
    researchLead: 'LLM 驱动的社会智能体 · 可执行社会科学',
    researchBody:
      '主线协作清华 FIB Lab 的 AgentSociety / AgentSociety 2：扩展与配置、CI 与安全、文档、Windows 兼容，以及面向「社会人」仿真的技能库——让假设变成可跑的工作流，而不是只停留在幻灯片里。',
    collabLabel: 'AgentSociety 仓库',
    collabHref: 'https://github.com/tsinghua-fib-lab/AgentSociety',
    platformLabel: 'AgentSociety 2 平台',
    platformHref: 'https://agentsociety2.fiblab.net/',
    pubTitle: '论文',
    pubYear: '2026',
    pubName:
      'AgentSociety 2: An Integrated Research Environment for Executable Social Science',
    pubVenue: 'arXiv preprint',
    pubAbs: 'https://arxiv.org/abs/2607.11895',
    pubPdf: 'https://arxiv.org/pdf/2607.11895',
    nowTitle: '此刻',
    nowItems: [
      'AgentSociety 2 工程与社会人仿真技能',
      '软件、电子、Linux、Verilog 笔记与实践',
      '慢一点，但一直向前',
    ],
    workTitle: '精选项目',
    workIntro: '与 GitHub 主页对齐的几条主线；完整列表见仓库与项目页。',
    projects: [
      {
        name: 'AgentSociety',
        role: '贡献者 / 合作作者',
        desc: '面向可执行社会科学的 LLM 原生集成研究环境。',
        href: projectsShared.agentsociety.href,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: '作者',
        desc: '为「真实社会人」仿真准备的技能库：节律、关系、规范与经济约束。',
        href: projectsShared.skills.href,
      },
      {
        name: '本站 alexander.xin',
        role: '作者',
        desc: '多语言个人站：摄影、写作、工具与长期记录。',
        href: projectsShared.site.href,
      },
      {
        name: 'MIPS-Pipeline-Verilog',
        role: '作者',
        desc: '可综合的 MIPS 五级流水线，含转发与冒险检测。',
        href: projectsShared.mips.href,
      },
      {
        name: 'NetQ',
        role: '作者',
        desc: '选单式网络排查 CLI，把常用操作收成可读结果页。',
        href: projectsShared.netq.href,
      },
      {
        name: 'MyCook',
        role: '作者',
        desc: '菜谱静态站：烹饪方式与食材双索引，VitePress 构建。',
        href: projectsShared.cook.href,
      },
    ],
    stackTitle: '技术栈',
    stackGroups: [
      {
        title: '语言与系统',
        items: ['C/C++', 'Python', 'JavaScript / TypeScript', 'Go', 'Bash'],
      },
      {
        title: '硬件与工具',
        items: ['Verilog', 'Linux', 'Git', 'LaTeX', 'MATLAB'],
      },
      {
        title: 'Web 与创意',
        items: ['Astro', 'HTML / CSS', '摄影', 'UI / UX'],
      },
    ],
    langsTitle: '语言',
    langs: [
      { name: '汉语', level: '母语' },
      { name: '英语', level: '流利' },
      { name: '意大利语', level: '初级' },
    ],
    connectTitle: '联系',
    connectIntro: '欢迎交流研究、项目或有趣想法。',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/AlexanderJ-Carter',
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: 'https://orcid.org/0009-0007-0343-4129',
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Email',
        href: 'mailto:contact-us@alexander.xin',
        note: 'contact-us@alexander.xin',
      },
      {
        label: '联系页',
        href: '/contact',
        note: '表单与更多方式',
      },
    ],
    back: '返回首页',
  },
  'zh-TW': {
    kicker: 'About',
    title: '關於',
    motto: '日子不必很耀眼，但要很喜歡。',
    subtitle: '學生開發者 · LLM 智能體與可執行社會科學',
    meta: ['北京', '在校生', '開發者'],
    introTitle: '個人簡介',
    paragraphs: [
      '你好，我是 Alexander James Carter。北京在讀本科生，專業方向電子信息科學與技術；平時把軟體、電子、Linux 與 Verilog 放在同一條實踐線上。',
      '我更在意把研究想法做成可運行、可稽核的系統：從社會智能體仿真，到靜態站點與小工具。技術之外，攝影與寫作幫我訓練觀察。',
      '這個站點是長期維護的個人角落：公開筆記、開源工程與一點生活實驗。清爽、穩定、長期主義。',
    ],
    researchTitle: '研究',
    researchLead: 'LLM 驅動的社會智能體 · 可執行社會科學',
    researchBody:
      '主線協作清華 FIB Lab 的 AgentSociety / AgentSociety 2：擴展與配置、CI 與安全、文件、Windows 相容，以及面向「社會人」仿真的技能庫。',
    collabLabel: 'AgentSociety 倉庫',
    collabHref: 'https://github.com/tsinghua-fib-lab/AgentSociety',
    platformLabel: 'AgentSociety 2 平台',
    platformHref: 'https://agentsociety2.fiblab.net/',
    pubTitle: '論文',
    pubYear: '2026',
    pubName:
      'AgentSociety 2: An Integrated Research Environment for Executable Social Science',
    pubVenue: 'arXiv preprint',
    pubAbs: 'https://arxiv.org/abs/2607.11895',
    pubPdf: 'https://arxiv.org/pdf/2607.11895',
    nowTitle: '此刻',
    nowItems: [
      'AgentSociety 2 工程與社會人仿真技能',
      '軟體、電子、Linux、Verilog 筆記與實踐',
      '慢一點，但一直向前',
    ],
    workTitle: '精選專案',
    workIntro: '與 GitHub 主頁對齊的幾條主線；完整列表見倉庫與專案頁。',
    projects: [
      {
        name: 'AgentSociety',
        role: '貢獻者 / 合作作者',
        desc: '面向可執行社會科學的 LLM 原生整合研究環境。',
        href: projectsShared.agentsociety.href,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: '作者',
        desc: '為「真實社會人」仿真準備的技能庫。',
        href: projectsShared.skills.href,
      },
      {
        name: '本站 alexander.xin',
        role: '作者',
        desc: '多語言個人站：攝影、寫作、工具與長期記錄。',
        href: projectsShared.site.href,
      },
      {
        name: 'MIPS-Pipeline-Verilog',
        role: '作者',
        desc: '可綜合的 MIPS 五級流水線，含轉發與冒險檢測。',
        href: projectsShared.mips.href,
      },
      {
        name: 'NetQ',
        role: '作者',
        desc: '選單式網路排查 CLI。',
        href: projectsShared.netq.href,
      },
      {
        name: 'MyCook',
        role: '作者',
        desc: '菜譜靜態站，VitePress 構建。',
        href: projectsShared.cook.href,
      },
    ],
    stackTitle: '技術棧',
    stackGroups: [
      {
        title: '語言與系統',
        items: ['C/C++', 'Python', 'JavaScript / TypeScript', 'Go', 'Bash'],
      },
      {
        title: '硬體與工具',
        items: ['Verilog', 'Linux', 'Git', 'LaTeX', 'MATLAB'],
      },
      {
        title: 'Web 與創意',
        items: ['Astro', 'HTML / CSS', '攝影', 'UI / UX'],
      },
    ],
    langsTitle: '語言',
    langs: [
      { name: '漢語', level: '母語' },
      { name: '英語', level: '流利' },
      { name: '義大利語', level: '初級' },
    ],
    connectTitle: '聯繫',
    connectIntro: '歡迎交流研究、專案或有趣想法。',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/AlexanderJ-Carter',
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: 'https://orcid.org/0009-0007-0343-4129',
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Email',
        href: 'mailto:contact-us@alexander.xin',
        note: 'contact-us@alexander.xin',
      },
      {
        label: '聯繫頁',
        href: '/contact',
        note: '表單與更多方式',
      },
    ],
    back: '返回首頁',
  },
  'en-GB': {
    kicker: 'About',
    title: 'About',
    motto: 'Warm, not perfect.',
    subtitle: 'Student developer · LLM agents & executable social science',
    meta: ['Beijing', 'Student', 'Developer'],
    introTitle: 'Profile',
    paragraphs: [
      'I am Alexander James Carter, an undergraduate in Beijing studying Electronic Information Science and Technology. Software, electronics, Linux and Verilog sit on the same practice line.',
      'I care about turning research ideas into runnable, auditable systems — from socially grounded agent simulations to static sites and small tools. Photography and writing train how I look and explain.',
      'This site is a long-running corner for public notes, open-source engineering and small life experiments. Neat, steady, long-term.',
    ],
    researchTitle: 'Research',
    researchLead: 'LLM-driven social agents · executable social science',
    researchBody:
      'Primary collaboration: Tsinghua FIB Lab’s AgentSociety / AgentSociety 2 — extensions & config, CI / security, docs, Windows compatibility, and skills for socially grounded agents. Hypotheses should become runnable workflows, not slide decks.',
    collabLabel: 'AgentSociety repo',
    collabHref: 'https://github.com/tsinghua-fib-lab/AgentSociety',
    platformLabel: 'AgentSociety 2 platform',
    platformHref: 'https://agentsociety2.fiblab.net/',
    pubTitle: 'Publication',
    pubYear: '2026',
    pubName:
      'AgentSociety 2: An Integrated Research Environment for Executable Social Science',
    pubVenue: 'arXiv preprint',
    pubAbs: 'https://arxiv.org/abs/2607.11895',
    pubPdf: 'https://arxiv.org/pdf/2607.11895',
    nowTitle: 'Now',
    nowItems: [
      'AgentSociety 2 engineering and social-agent skills',
      'Notes on software, electronics, Linux and Verilog',
      'Learning in public — slowly, but consistently',
    ],
    workTitle: 'Selected work',
    workIntro:
      'Aligned with the GitHub profile; full lists live in the repos and Projects page.',
    projects: [
      {
        name: 'AgentSociety',
        role: 'Contributor & co-author',
        desc: 'LLM-native integrated research environment for executable social science.',
        href: projectsShared.agentsociety.href,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: 'Author',
        desc: 'Theory-grounded skills for socially grounded agents.',
        href: projectsShared.skills.href,
      },
      {
        name: 'alexander.xin',
        role: 'Author',
        desc: 'Multilingual personal site for photography, writing and tools.',
        href: projectsShared.site.href,
      },
      {
        name: 'MIPS-Pipeline-Verilog',
        role: 'Author',
        desc: 'Synthesizable five-stage MIPS pipeline with forwarding and hazard detection.',
        href: projectsShared.mips.href,
      },
      {
        name: 'NetQ',
        role: 'Author',
        desc: 'Menu-driven network troubleshooting CLI with readable result pages.',
        href: projectsShared.netq.href,
      },
      {
        name: 'MyCook',
        role: 'Author',
        desc: 'Static recipe site indexed by method and ingredient.',
        href: projectsShared.cook.href,
      },
    ],
    stackTitle: 'Stack',
    stackGroups: [
      {
        title: 'Languages & systems',
        items: ['C/C++', 'Python', 'JavaScript / TypeScript', 'Go', 'Bash'],
      },
      {
        title: 'Hardware & tools',
        items: ['Verilog', 'Linux', 'Git', 'LaTeX', 'MATLAB'],
      },
      {
        title: 'Web & craft',
        items: ['Astro', 'HTML / CSS', 'Photography', 'UI / UX'],
      },
    ],
    langsTitle: 'Languages',
    langs: [
      { name: 'Chinese', level: 'Native' },
      { name: 'English', level: 'Fluent' },
      { name: 'Italian', level: 'Beginner' },
    ],
    connectTitle: 'Connect',
    connectIntro: 'Happy to talk about research, projects or ideas.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/AlexanderJ-Carter',
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: 'https://orcid.org/0009-0007-0343-4129',
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Email',
        href: 'mailto:contact-us@alexander.xin',
        note: 'contact-us@alexander.xin',
      },
      {
        label: 'Contact page',
        href: '/contact',
        note: 'Form and more',
      },
    ],
    back: 'Back to home',
  },
  fr: {
    kicker: 'About',
    title: 'À propos',
    motto: 'Chaleureux, pas parfait.',
    subtitle:
      'Étudiant développeur · agents LLM & sciences sociales exécutables',
    meta: ['Pékin', 'Étudiant', 'Développeur'],
    introTitle: 'Profil',
    paragraphs: [
      'Je suis Alexander James Carter, étudiant à Pékin en sciences et technologies de l’information électronique. Logiciel, électronique, Linux et Verilog forment une même ligne de pratique.',
      'Je cherche à transformer des idées de recherche en systèmes exécutables et auditables — des simulations d’agents sociaux aux sites statiques et petits outils.',
      'Ce site est un coin personnel durable : notes publiques, ingénierie open source et petites expériences de vie.',
    ],
    researchTitle: 'Recherche',
    researchLead:
      'Agents sociaux pilotés par LLM · sciences sociales exécutables',
    researchBody:
      'Collaboration principale : AgentSociety / AgentSociety 2 au FIB Lab de Tsinghua — extensions, CI / sécurité, docs, compatibilité Windows, et compétences pour agents socialement ancrés.',
    collabLabel: 'Dépôt AgentSociety',
    collabHref: 'https://github.com/tsinghua-fib-lab/AgentSociety',
    platformLabel: 'Plateforme AgentSociety 2',
    platformHref: 'https://agentsociety2.fiblab.net/',
    pubTitle: 'Publication',
    pubYear: '2026',
    pubName:
      'AgentSociety 2: An Integrated Research Environment for Executable Social Science',
    pubVenue: 'arXiv preprint',
    pubAbs: 'https://arxiv.org/abs/2607.11895',
    pubPdf: 'https://arxiv.org/pdf/2607.11895',
    nowTitle: 'Maintenant',
    nowItems: [
      'Ingénierie AgentSociety 2 et compétences d’agents sociaux',
      'Notes sur logiciel, électronique, Linux et Verilog',
      'Apprendre en public — lentement, mais constamment',
    ],
    workTitle: 'Travaux sélectionnés',
    workIntro:
      'Aligné sur le profil GitHub ; listes complètes dans les dépôts.',
    projects: [
      {
        name: 'AgentSociety',
        role: 'Contributeur & co-auteur',
        desc: 'Environnement de recherche intégré natif LLM pour les sciences sociales exécutables.',
        href: projectsShared.agentsociety.href,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: 'Auteur',
        desc: 'Compétences théoriques pour agents socialement ancrés.',
        href: projectsShared.skills.href,
      },
      {
        name: 'alexander.xin',
        role: 'Auteur',
        desc: 'Site personnel multilingue : photo, écriture et outils.',
        href: projectsShared.site.href,
      },
      {
        name: 'MIPS-Pipeline-Verilog',
        role: 'Auteur',
        desc: 'Pipeline MIPS à cinq étages synthétisable.',
        href: projectsShared.mips.href,
      },
      {
        name: 'NetQ',
        role: 'Auteur',
        desc: 'CLI de diagnostic réseau à menus.',
        href: projectsShared.netq.href,
      },
      {
        name: 'MyCook',
        role: 'Auteur',
        desc: 'Site de recettes statique.',
        href: projectsShared.cook.href,
      },
    ],
    stackTitle: 'Stack',
    stackGroups: [
      {
        title: 'Langages & systèmes',
        items: ['C/C++', 'Python', 'JavaScript / TypeScript', 'Go', 'Bash'],
      },
      {
        title: 'Matériel & outils',
        items: ['Verilog', 'Linux', 'Git', 'LaTeX', 'MATLAB'],
      },
      {
        title: 'Web & craft',
        items: ['Astro', 'HTML / CSS', 'Photographie', 'UI / UX'],
      },
    ],
    langsTitle: 'Langues',
    langs: [
      { name: 'Chinois', level: 'Natif' },
      { name: 'Anglais', level: 'Courant' },
      { name: 'Italien', level: 'Débutant' },
    ],
    connectTitle: 'Contact',
    connectIntro:
      'Ouvert aux échanges sur la recherche, les projets ou les idées.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/AlexanderJ-Carter',
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: 'https://orcid.org/0009-0007-0343-4129',
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Email',
        href: 'mailto:contact-us@alexander.xin',
        note: 'contact-us@alexander.xin',
      },
      {
        label: 'Page contact',
        href: '/contact',
        note: 'Formulaire et plus',
      },
    ],
    back: "Retour à l'accueil",
  },
  ru: {
    kicker: 'About',
    title: 'Обо мне',
    motto: 'Тёпло, не идеально.',
    subtitle: 'Студент-разработчик · LLM-агенты и исполнимая социальная наука',
    meta: ['Пекин', 'Студент', 'Разработчик'],
    introTitle: 'Профиль',
    paragraphs: [
      'Я Alexander James Carter, студент в Пекине по направлению электронных информационных наук и технологий. ПО, электроника, Linux и Verilog — одна линия практики.',
      'Мне важно превращать исследовательские идеи в исполняемые и проверяемые системы — от симуляций социальных агентов до статических сайтов и небольших инструментов.',
      'Этот сайт — долгоживущий угол: публичные заметки, open-source инженерия и небольшие жизненные эксперименты.',
    ],
    researchTitle: 'Исследования',
    researchLead: 'Социальные агенты на LLM · исполнимая социальная наука',
    researchBody:
      'Основное сотрудничество: AgentSociety / AgentSociety 2 в FIB Lab (Tsinghua) — расширения, CI / безопасность, документация, совместимость с Windows и навыки для социально укоренённых агентов.',
    collabLabel: 'Репозиторий AgentSociety',
    collabHref: 'https://github.com/tsinghua-fib-lab/AgentSociety',
    platformLabel: 'Платформа AgentSociety 2',
    platformHref: 'https://agentsociety2.fiblab.net/',
    pubTitle: 'Публикация',
    pubYear: '2026',
    pubName:
      'AgentSociety 2: An Integrated Research Environment for Executable Social Science',
    pubVenue: 'arXiv preprint',
    pubAbs: 'https://arxiv.org/abs/2607.11895',
    pubPdf: 'https://arxiv.org/pdf/2607.11895',
    nowTitle: 'Сейчас',
    nowItems: [
      'Инженерия AgentSociety 2 и навыки социальных агентов',
      'Заметки по ПО, электронике, Linux и Verilog',
      'Учиться публично — медленно, но постоянно',
    ],
    workTitle: 'Избранные проекты',
    workIntro: 'Согласовано с GitHub-профилем; полные списки — в репозиториях.',
    projects: [
      {
        name: 'AgentSociety',
        role: 'Участник и соавтор',
        desc: 'LLM-нативная среда для исполнимой социальной науки.',
        href: projectsShared.agentsociety.href,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: 'Автор',
        desc: 'Навыки для социально укоренённых агентов.',
        href: projectsShared.skills.href,
      },
      {
        name: 'alexander.xin',
        role: 'Автор',
        desc: 'Многоязычный личный сайт: фото, тексты и инструменты.',
        href: projectsShared.site.href,
      },
      {
        name: 'MIPS-Pipeline-Verilog',
        role: 'Автор',
        desc: 'Синтезируемый пятиступенчатый конвейер MIPS.',
        href: projectsShared.mips.href,
      },
      {
        name: 'NetQ',
        role: 'Автор',
        desc: 'Меню-ориентированный CLI для сетевой диагностики.',
        href: projectsShared.netq.href,
      },
      {
        name: 'MyCook',
        role: 'Автор',
        desc: 'Статический сайт рецептов.',
        href: projectsShared.cook.href,
      },
    ],
    stackTitle: 'Стек',
    stackGroups: [
      {
        title: 'Языки и системы',
        items: ['C/C++', 'Python', 'JavaScript / TypeScript', 'Go', 'Bash'],
      },
      {
        title: 'Железо и инструменты',
        items: ['Verilog', 'Linux', 'Git', 'LaTeX', 'MATLAB'],
      },
      {
        title: 'Web и творчество',
        items: ['Astro', 'HTML / CSS', 'Фотография', 'UI / UX'],
      },
    ],
    langsTitle: 'Языки',
    langs: [
      { name: 'Китайский', level: 'Родной' },
      { name: 'Английский', level: 'Свободный' },
      { name: 'Итальянский', level: 'Начальный' },
    ],
    connectTitle: 'Связь',
    connectIntro: 'Открыт к разговору об исследованиях, проектах и идеях.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/AlexanderJ-Carter',
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: 'https://orcid.org/0009-0007-0343-4129',
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Email',
        href: 'mailto:contact-us@alexander.xin',
        note: 'contact-us@alexander.xin',
      },
      {
        label: 'Страница контакта',
        href: '/contact',
        note: 'Форма и другое',
      },
    ],
    back: 'На главную',
  },
};
