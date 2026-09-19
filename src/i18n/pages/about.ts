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
  desc?: string;
  href: string;
};

export type AboutPersonal = {
  sectionTitle: string;
  sectionLead: string;
  educationLabel: string;
  education: string[];
  interestsLabel: string;
  interests: string[];
};

export type AboutCopy = {
  kicker: string;
  title: string;
  displayName: string;
  motto: string;
  subtitle: string;
  meta: string[];
  introTitle: string;
  paragraphs: string[];
  personal: AboutPersonal;
  researchTitle: string;
  researchLead: string;
  researchBody: string;
  collabLabel: string;
  collabHref: string;
  platformLabel: string;
  platformHref: string;
  relatedPaperLabel: string;
  relatedPaperHref: string;
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
  connectTitle: string;
  connectIntro: string;
  links: AboutLink[];
  ctaContact: string;
  ctaGithub: string;
  profileLabel: string;
  profileHref: string;
  back: string;
};

const urls = {
  agentsociety: 'https://github.com/tsinghua-fib-lab/AgentSociety',
  skills: 'https://github.com/AlexanderJ-Carter/AgentSociety2-Agent-Skills',
  platform: 'https://agentsociety2.fiblab.net/',
  relatedPaper: 'https://arxiv.org/abs/2502.08691',
  pubAbs: 'https://arxiv.org/abs/2607.11895',
  pubPdf: 'https://arxiv.org/pdf/2607.11895',
  github: 'https://github.com/AlexanderJ-Carter',
  profile: 'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter',
  orcid: 'https://orcid.org/0009-0007-0343-4129',
  scholar: 'https://scholar.google.com/citations?user=DJ43CTcAAAAJ&hl=zh-CN',
  email: 'mailto:contact-us@alexander.xin',
};

const pubName =
  'AgentSociety 2: An Integrated Research Environment for Executable Social Science';

function personalSlots(
  labels: Pick<
    AboutPersonal,
    'sectionTitle' | 'sectionLead' | 'educationLabel' | 'interestsLabel'
  > &
    Record<string, unknown>,
  content: Pick<AboutPersonal, 'education' | 'interests'> &
    Record<string, unknown>
): AboutPersonal {
  return {
    sectionTitle: labels.sectionTitle,
    sectionLead: labels.sectionLead,
    educationLabel: labels.educationLabel,
    education: content.education,
    interestsLabel: labels.interestsLabel,
    interests: content.interests,
  };
}

export const aboutCopy: Record<Lang, AboutCopy> = {
  'zh-CN': {
    kicker: 'About',
    title: '关于',
    displayName: '黄皓宇',
    motto: '日子不必很耀眼，但要很喜欢。',
    subtitle: '清华大学电子工程系本科生，关注 LLM Agent 与可执行社会科学。',
    meta: ['Haoyu Huang', '北京'],
    introTitle: '你好',
    paragraphs: [
      '我是黄皓宇，目前就读于清华大学电子工程系。学习和研究之外，我喜欢摄影、音乐和游泳，也在持续维护这个个人网站。',
      '我的研究兴趣主要是 LLM Agent、多智能体系统，以及 AI 如何用于社会科学研究。',
    ],
    personal: {
      sectionTitle: '学习与兴趣',
      sectionLead: '一些基本信息，点到为止。',
      educationLabel: '教育',
      education: [
        '清华大学电子工程系 · 电子信息科学与技术 · 2023–2027（在读）',
      ],
      interestsLabel: '兴趣与关注',
      interests: [
        'LLM Agent',
        '多智能体系统',
        'AI for Social Science',
        '摄影',
        '音乐',
        '游泳',
      ],
    },
    researchTitle: '研究',
    researchLead: 'LLM 驱动的社会智能体 · 可执行社会科学',
    researchBody:
      '参与多智能体社会模拟相关系统的设计与实现，希望把社会科学问题转化为可运行、可复查的研究流程。',
    collabLabel: 'AgentSociety 仓库',
    collabHref: urls.agentsociety,
    platformLabel: 'AgentSociety2 平台',
    platformHref: urls.platform,
    relatedPaperLabel: '相关平台论文 (arXiv:2502.08691)',
    relatedPaperHref: urls.relatedPaper,
    pubTitle: '论文',
    pubYear: '2026',
    pubName,
    pubVenue: 'arXiv preprint',
    pubAbs: urls.pubAbs,
    pubPdf: urls.pubPdf,
    nowTitle: '最近在做',
    nowItems: [
      'AgentSociety2',
      '北京三快在线科技有限公司（美团）实习 · 2026.06 – 至今',
    ],
    workTitle: '代表工作',
    workIntro: '目前主要参与的研究与实习。',
    projects: [
      {
        name: 'AgentSociety2',
        role: '项目成员 / 论文共同作者 · 2025.10 – 至今',
        desc: '面向可执行社会科学的 LLM 原生集成研究环境。',
        href: urls.agentsociety,
      },
      {
        name: '北京三快在线科技有限公司（美团）',
        role: '实习 · 2026.06 – 至今',
        href: '',
      },
    ],
    connectTitle: '联系',
    connectIntro:
      '如果想交流研究、项目或开源协作，欢迎通过邮件或 GitHub 联系。',
    links: [
      {
        label: 'GitHub',
        href: urls.github,
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Google Scholar',
        href: urls.scholar,
        note: '黄皓宇 · Haoyu Huang',
        external: true,
      },
      {
        label: 'Email',
        href: urls.email,
        note: 'contact-us@alexander.xin',
      },
    ],
    ctaContact: '联系',
    ctaGithub: 'GitHub',
    profileLabel: 'GitHub 主页',
    profileHref: urls.profile,
    back: '返回首页',
  },
  'zh-TW': {
    kicker: 'About',
    title: '關於',
    displayName: '黃皓宇',
    motto: '日子不必很耀眼，但要很喜歡。',
    subtitle: '清華大學電子工程系本科生，關注 LLM Agent 與可執行社會科學。',
    meta: ['Haoyu Huang', '北京'],
    introTitle: '你好',
    paragraphs: [
      '我是黃皓宇，目前就讀於清華大學電子工程系。學習和研究之外，我喜歡攝影、音樂和游泳，也在持續維護這個個人網站。',
      '我的研究興趣主要是 LLM Agent、多智能體系統，以及 AI 如何用於社會科學研究。',
    ],
    personal: personalSlots(
      {
        sectionTitle: '學習與興趣',
        sectionLead: '一些基本資訊，點到為止。',
        reservedNote: '待補',
        portraitLabel: '肖像',
        portraitAlt: '個人肖像（預留）',
        bioLabel: '簡介',
        backgroundLabel: '背景',
        educationLabel: '教育',
        interestsLabel: '興趣與關注',
        timelineLabel: '經歷',
      },
      {
        bio: '黃皓宇，英文名 Alexander James Carter。在北京讀書與做研究，也拍照、維護這個站點。',
        background:
          '清華電子工程系在讀；研究側主要在 LLM Agent 與可執行社會科學。',
        education: [
          '清華大學電子工程系 · 電子信息科學與技術 · 2023–2027（在讀）',
        ],
        interests: [
          'LLM Agent',
          '多智能體系統',
          'AI for Social Science',
          '攝影',
          '音樂',
          '游泳',
        ],
        timeline: [
          { when: '現在', what: '清華在讀；協作 AgentSociety2' },
          { when: '2023', what: '進入清華大學電子工程系' },
        ],
      }
    ),
    researchTitle: '研究',
    researchLead: 'LLM 驅動的社會智能體 · 可執行社會科學',
    researchBody:
      '參與多智能體社會模擬相關系統的設計與實現，希望把社會科學問題轉化為可運行、可複查的研究流程。',
    collabLabel: 'AgentSociety 倉庫',
    collabHref: urls.agentsociety,
    platformLabel: 'AgentSociety2 平台',
    platformHref: urls.platform,
    relatedPaperLabel: '相關平台論文 (arXiv:2502.08691)',
    relatedPaperHref: urls.relatedPaper,
    pubTitle: '論文',
    pubYear: '2026',
    pubName,
    pubVenue: 'arXiv preprint',
    pubAbs: urls.pubAbs,
    pubPdf: urls.pubPdf,
    nowTitle: '最近在做',
    nowItems: [
      'AgentSociety2',
      '北京三快在線科技有限公司（美團）實習 · 2026.06 – 至今',
    ],
    workTitle: '代表工作',
    workIntro: '目前主要參與的研究與實習。',
    projects: [
      {
        name: 'AgentSociety2',
        role: '專案成員 / 論文共同作者 · 2025.10 – 至今',
        desc: '面向可執行社會科學的 LLM 原生整合研究環境。',
        href: urls.agentsociety,
      },
      {
        name: '北京三快在線科技有限公司（美團）',
        role: '實習 · 2026.06 – 至今',
        href: '',
      },
    ],
    connectTitle: '聯繫',
    connectIntro:
      '如果想交流研究、專案或開源協作，歡迎透過郵件或 GitHub 聯繫。',
    links: [
      {
        label: 'GitHub',
        href: urls.github,
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Google Scholar',
        href: urls.scholar,
        note: '黄皓宇 · Haoyu Huang',
        external: true,
      },
      {
        label: 'Email',
        href: urls.email,
        note: 'contact-us@alexander.xin',
      },
    ],
    ctaContact: '聯繫',
    ctaGithub: 'GitHub',
    profileLabel: 'GitHub 主頁',
    profileHref: urls.profile,
    back: '返回首頁',
  },
  'en-GB': {
    kicker: 'About',
    title: 'About',
    displayName: 'Haoyu Huang',
    motto: 'Warm, not perfect.',
    subtitle:
      'Electronic Engineering undergraduate at Tsinghua, interested in LLM agents and executable social science.',
    meta: ['黄皓宇', 'Beijing'],
    introTitle: 'Hello',
    paragraphs: [
      'I’m Haoyu Huang, an undergraduate in Electronic Engineering at Tsinghua University. Outside study and research, I enjoy photography, music and swimming, and I maintain this personal site.',
      'My research interests centre on LLM agents, multi-agent systems and AI for social science.',
    ],
    personal: personalSlots(
      {
        sectionTitle: 'Study & interests',
        sectionLead: 'A few details, kept brief.',
        reservedNote: 'TBD',
        portraitLabel: 'Portrait',
        portraitAlt: 'Portrait (reserved)',
        bioLabel: 'Bio',
        backgroundLabel: 'Background',
        educationLabel: 'Education',
        interestsLabel: 'Interests & focus',
        timelineLabel: 'Timeline',
      },
      {
        bio: 'Haoyu Huang (黄皓宇); English name Alexander James Carter. Studying and researching in Beijing; photography and this site on the side.',
        background:
          'Undergraduate in Electronic Engineering at Tsinghua; research focus on LLM agents and executable social science.',
        education: [
          'Tsinghua University · Department of Electronic Engineering · 2023–2027 (in progress)',
        ],
        interests: [
          'LLM agents',
          'Multi-agent systems',
          'AI for Social Science',
          'Photography',
          'Music',
          'Swimming',
        ],
        timeline: [
          { when: 'Now', what: 'At Tsinghua; collaborating on AgentSociety2' },
          { when: '2023', what: 'Joined Tsinghua EE' },
        ],
      }
    ),
    researchTitle: 'Research',
    researchLead: 'LLM-driven social agents · executable social science',
    researchBody:
      'I work on systems for multi-agent social simulation — turning social-science questions into runnable, reviewable research workflows.',
    collabLabel: 'AgentSociety repo',
    collabHref: urls.agentsociety,
    platformLabel: 'AgentSociety2 platform',
    platformHref: urls.platform,
    relatedPaperLabel: 'Related platform paper (arXiv:2502.08691)',
    relatedPaperHref: urls.relatedPaper,
    pubTitle: 'Publication',
    pubYear: '2026',
    pubName,
    pubVenue: 'arXiv preprint',
    pubAbs: urls.pubAbs,
    pubPdf: urls.pubPdf,
    nowTitle: 'Currently',
    nowItems: [
      'AgentSociety2',
      'Beijing Sankuai Online Technology Co., Ltd. (Meituan) internship · Jun 2026 – present',
    ],
    workTitle: 'Selected work',
    workIntro: 'Research and internship work I am currently involved in.',
    projects: [
      {
        name: 'AgentSociety2',
        role: 'Project member & co-author · Oct 2025 – present',
        desc: 'LLM-native integrated research environment for executable social science.',
        href: urls.agentsociety,
      },
      {
        name: 'Beijing Sankuai Online Technology Co., Ltd. (Meituan)',
        role: 'Internship · Jun 2026 – present',
        href: '',
      },
    ],
    connectTitle: 'Contact',
    connectIntro:
      'For research, projects or open-source collaboration, email and GitHub are the best ways to reach me.',
    links: [
      {
        label: 'GitHub',
        href: urls.github,
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Google Scholar',
        href: urls.scholar,
        note: 'Haoyu Huang',
        external: true,
      },
      {
        label: 'Email',
        href: urls.email,
        note: 'contact-us@alexander.xin',
      },
    ],
    ctaContact: 'Contact',
    ctaGithub: 'GitHub',
    profileLabel: 'GitHub profile',
    profileHref: urls.profile,
    back: 'Back to home',
  },
  fr: {
    kicker: 'About',
    title: 'À propos',
    displayName: 'Haoyu Huang',
    motto: 'Chaleureux, pas parfait.',
    subtitle:
      'Étudiant en génie électronique à Tsinghua, intéressé par les agents LLM et les sciences sociales exécutables.',
    meta: ['黄皓宇', 'Pékin'],
    introTitle: 'Bonjour',
    paragraphs: [
      'Je suis Haoyu Huang, étudiant en génie électronique à l’université Tsinghua. En dehors des études et de la recherche, j’aime la photographie, la musique et la natation, et je maintiens ce site personnel.',
      'Mes recherches portent sur les agents LLM, les systèmes multi-agents et l’IA pour les sciences sociales.',
    ],
    personal: personalSlots(
      {
        sectionTitle: 'Études et intérêts',
        sectionLead: 'Quelques informations, simplement.',
        reservedNote: 'À venir',
        portraitLabel: 'Portrait',
        portraitAlt: 'Portrait (réservé)',
        bioLabel: 'Bio',
        backgroundLabel: 'Parcours',
        educationLabel: 'Formation',
        interestsLabel: 'Intérêts et sujets',
        timelineLabel: 'Chronologie',
      },
      {
        bio: 'Haoyu Huang (黄皓宇) ; nom anglais Alexander James Carter. Études et recherche à Pékin ; photo et ce site en parallèle.',
        background:
          'Licence en génie électronique à Tsinghua ; agents LLM et sciences sociales exécutables.',
        education: [
          'Université Tsinghua · Génie électronique · Science et tech. de l’information électronique (2023–2027, en cours)',
        ],
        interests: [
          'Agents LLM',
          'Systèmes multi-agents',
          'Sciences sociales computationnelles',
          'Photo',
          'Musique',
          'Natation',
        ],
        timeline: [
          {
            when: 'Maintenant',
            what: 'À Tsinghua ; collaboration AgentSociety2',
          },
          { when: '2023', what: 'Entrée à Tsinghua EE' },
        ],
      }
    ),
    researchTitle: 'Recherche',
    researchLead:
      'Agents sociaux pilotés par LLM · sciences sociales exécutables',
    researchBody:
      'Je contribue à des systèmes de simulation sociale multi-agents — transformer des questions de sciences sociales en flux de recherche exécutables et vérifiables.',
    collabLabel: 'Dépôt AgentSociety',
    collabHref: urls.agentsociety,
    platformLabel: 'Plateforme AgentSociety2',
    platformHref: urls.platform,
    relatedPaperLabel: 'Article plateforme (arXiv:2502.08691)',
    relatedPaperHref: urls.relatedPaper,
    pubTitle: 'Publication',
    pubYear: '2026',
    pubName,
    pubVenue: 'arXiv preprint',
    pubAbs: urls.pubAbs,
    pubPdf: urls.pubPdf,
    nowTitle: 'En ce moment',
    nowItems: [
      'AgentSociety2',
      'Beijing Sankuai Online Technology Co., Ltd. (Meituan) · stage · juin 2026 – présent',
    ],
    workTitle: 'Travaux sélectionnés',
    workIntro: 'Recherche et stage en cours.',
    projects: [
      {
        name: 'AgentSociety2',
        role: 'Contributeur & co-auteur · oct. 2025 – présent',
        desc: 'Environnement de recherche intégré natif LLM.',
        href: urls.agentsociety,
      },
      {
        name: 'Beijing Sankuai Online Technology Co., Ltd. (Meituan)',
        role: 'Stage · juin 2026 – présent',
        href: '',
      },
    ],
    connectTitle: 'Contact',
    connectIntro: 'Recherche et collaboration — email ou GitHub en premier.',
    links: [
      {
        label: 'GitHub',
        href: urls.github,
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Google Scholar',
        href: urls.scholar,
        note: 'Haoyu Huang',
        external: true,
      },
      {
        label: 'Email',
        href: urls.email,
        note: 'contact-us@alexander.xin',
      },
    ],
    ctaContact: 'Contact',
    ctaGithub: 'GitHub',
    profileLabel: 'Profil GitHub',
    profileHref: urls.profile,
    back: "Retour à l'accueil",
  },
  ru: {
    kicker: 'About',
    title: 'Обо мне',
    displayName: 'Haoyu Huang',
    motto: 'Тёпло, не идеально.',
    subtitle:
      'Студент кафедры электроники Цинхуа; LLM-агенты и исполнимая социальная наука.',
    meta: ['黄皓宇', 'Пекин'],
    introTitle: 'Привет',
    paragraphs: [
      'Я Haoyu Huang, студент кафедры электроники Университета Цинхуа. Помимо учёбы и исследований, я занимаюсь фотографией, слушаю музыку, плаваю и поддерживаю этот сайт.',
      'Мои исследовательские интересы — LLM-агенты, мультиагентные системы и ИИ для социальных наук.',
    ],
    personal: personalSlots(
      {
        sectionTitle: 'Учёба и интересы',
        sectionLead: 'Коротко о главном.',
        reservedNote: 'Позже',
        portraitLabel: 'Портрет',
        portraitAlt: 'Портрет (зарезервировано)',
        bioLabel: 'Био',
        backgroundLabel: 'Фон',
        educationLabel: 'Образование',
        interestsLabel: 'Интересы',
        timelineLabel: 'Хронология',
      },
      {
        bio: 'Haoyu Huang (黄皓宇); английское имя Alexander James Carter. Учёба и исследования в Пекине; фото и этот сайт — рядом.',
        background:
          'Бакалавриат по электронике в Цинхуа; фокус — LLM-агенты и исполнимая социальная наука.',
        education: [
          'Университет Цинхуа · кафедра электроники · электронная информатика (2023–2027, учёба)',
        ],
        interests: [
          'LLM-агенты',
          'Мультиагентные системы',
          'Вычислительная социология',
          'Фото',
          'Музыка',
          'Плавание',
        ],
        timeline: [
          { when: 'Сейчас', what: 'В Цинхуа; сотрудничество по AgentSociety2' },
          { when: '2023', what: 'Поступление на EE в Цинхуа' },
        ],
      }
    ),
    researchTitle: 'Исследования',
    researchLead: 'Социальные агенты на LLM · исполнимая социальная наука',
    researchBody:
      'Участвую в системах мультиагентной социальной симуляции — перевожу вопросы социальных наук в исполняемые и проверяемые исследовательские процессы.',
    collabLabel: 'Репозиторий AgentSociety',
    collabHref: urls.agentsociety,
    platformLabel: 'Платформа AgentSociety2',
    platformHref: urls.platform,
    relatedPaperLabel: 'Статья о платформе (arXiv:2502.08691)',
    relatedPaperHref: urls.relatedPaper,
    pubTitle: 'Публикация',
    pubYear: '2026',
    pubName,
    pubVenue: 'arXiv preprint',
    pubAbs: urls.pubAbs,
    pubPdf: urls.pubPdf,
    nowTitle: 'Сейчас',
    nowItems: [
      'AgentSociety2',
      'Beijing Sankuai Online Technology Co., Ltd. (Meituan) · стажировка · июнь 2026 – н.в.',
    ],
    workTitle: 'Избранные проекты',
    workIntro: 'Текущие исследования и стажировка.',
    projects: [
      {
        name: 'AgentSociety2',
        role: 'Участник и соавтор · окт. 2025 – н.в.',
        desc: 'LLM-нативная среда для исполнимой социальной науки.',
        href: urls.agentsociety,
      },
      {
        name: 'Beijing Sankuai Online Technology Co., Ltd. (Meituan)',
        role: 'Стажировка · июнь 2026 – н.в.',
        href: '',
      },
    ],
    connectTitle: 'Связь',
    connectIntro: 'Исследования и сотрудничество — сначала email или GitHub.',
    links: [
      {
        label: 'GitHub',
        href: urls.github,
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
        external: true,
      },
      {
        label: 'Google Scholar',
        href: urls.scholar,
        note: 'Haoyu Huang',
        external: true,
      },
      {
        label: 'Email',
        href: urls.email,
        note: 'contact-us@alexander.xin',
      },
    ],
    ctaContact: 'Связаться',
    ctaGithub: 'GitHub',
    profileLabel: 'Профиль GitHub',
    profileHref: urls.profile,
    back: 'На главную',
  },
};
