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

export type AboutTimelineItem = {
  when: string;
  what: string;
};

/**
 * Personal dossier fields. Leave strings/arrays empty to show reserved blanks.
 * Fill later in each locale — template renders content only when non-empty.
 */
export type AboutPersonal = {
  sectionTitle: string;
  sectionLead: string;
  reservedNote: string;
  portraitLabel: string;
  /** Public image path; empty = reserved frame */
  portraitSrc: string;
  portraitAlt: string;
  bioLabel: string;
  bio: string;
  backgroundLabel: string;
  background: string;
  educationLabel: string;
  education: string[];
  interestsLabel: string;
  interests: string[];
  timelineLabel: string;
  timeline: AboutTimelineItem[];
};

export type AboutCopy = {
  kicker: string;
  title: string;
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
  email: 'mailto:contact-us@alexander.xin',
};

const pubName =
  'AgentSociety 2: An Integrated Research Environment for Executable Social Science';

/** Shared empty personal dossier — fill per locale later. */
function personalSlots(
  labels: Omit<
    AboutPersonal,
    | 'portraitSrc'
    | 'bio'
    | 'background'
    | 'education'
    | 'interests'
    | 'timeline'
  >
): AboutPersonal {
  return {
    ...labels,
    portraitSrc: '',
    bio: '',
    background: '',
    education: [],
    interests: [],
    timeline: [],
  };
}

export const aboutCopy: Record<Lang, AboutCopy> = {
  'zh-CN': {
    kicker: 'About',
    title: '关于',
    motto: '日子不必很耀眼，但要很喜欢。',
    subtitle: '学生开发者 · LLM Agent 与可执行社会科学',
    meta: ['北京', 'AgentSociety'],
    introTitle: '主线',
    paragraphs: [
      'Alexander James Carter。北京。主线协作清华 FIB Lab 的 AgentSociety / AgentSociety 2：把 LLM 驱动的社会智能体与可执行社会科学做成可运行、可审计的研究工作流。',
    ],
    personal: personalSlots({
      sectionTitle: '个人介绍',
      sectionLead:
        '个人档案栏位预留中。研究线与项目见下方；此处不急于一次写满，会随时间慢慢补。',
      reservedNote: '待写入',
      portraitLabel: '肖像',
      portraitAlt: '个人肖像（预留）',
      bioLabel: '简介',
      backgroundLabel: '背景',
      educationLabel: '教育',
      interestsLabel: '关注',
      timelineLabel: '经历',
    }),
    researchTitle: '研究',
    researchLead: 'LLM 驱动的社会智能体 · 可执行社会科学',
    researchBody:
      '协作内容包括扩展与配置、CI / 安全、文档、Windows 兼容，以及面向「社会人」仿真的技能——让假设进入可复查的仿真与研究流程。',
    collabLabel: 'AgentSociety 仓库',
    collabHref: urls.agentsociety,
    platformLabel: 'AgentSociety 2 平台',
    platformHref: urls.platform,
    relatedPaperLabel: '相关平台论文 (arXiv:2502.08691)',
    relatedPaperHref: urls.relatedPaper,
    pubTitle: '论文',
    pubYear: '2026',
    pubName,
    pubVenue: 'arXiv preprint',
    pubAbs: urls.pubAbs,
    pubPdf: urls.pubPdf,
    nowTitle: '此刻',
    nowItems: [
      'AgentSociety 2 工程与社会人仿真技能',
      '把假设变成可审计仿真与研究工作流',
    ],
    workTitle: 'AgentSociety 相关',
    workIntro: '与 GitHub 主页 Featured 一致，只列 AgentSociety 主线。',
    projects: [
      {
        name: 'AgentSociety',
        role: '贡献者 / 合作作者',
        desc: '面向可执行社会科学的 LLM 原生集成研究环境。',
        href: urls.agentsociety,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: '作者',
        desc: '社会人仿真技能库：节律、关系、规范与经济约束。',
        href: urls.skills,
      },
    ],
    connectTitle: '联系',
    connectIntro: '研究与协作相关，优先邮件或 GitHub。',
    links: [
      {
        label: 'GitHub',
        href: urls.github,
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'Profile README',
        href: urls.profile,
        note: 'github.com/…/AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
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
    motto: '日子不必很耀眼，但要很喜歡。',
    subtitle: '學生開發者 · LLM Agent 與可執行社會科學',
    meta: ['北京', 'AgentSociety'],
    introTitle: '主線',
    paragraphs: [
      'Alexander James Carter。北京。主線協作清華 FIB Lab 的 AgentSociety / AgentSociety 2：把 LLM 驅動的社會智能體與可執行社會科學做成可運行、可稽核的研究工作流。',
    ],
    personal: personalSlots({
      sectionTitle: '個人介紹',
      sectionLead:
        '個人檔案欄位預留中。研究線與專案見下方；此處不急於一次寫滿，會隨時間慢慢補。',
      reservedNote: '待寫入',
      portraitLabel: '肖像',
      portraitAlt: '個人肖像（預留）',
      bioLabel: '簡介',
      backgroundLabel: '背景',
      educationLabel: '教育',
      interestsLabel: '關注',
      timelineLabel: '經歷',
    }),
    researchTitle: '研究',
    researchLead: 'LLM 驅動的社會智能體 · 可執行社會科學',
    researchBody:
      '協作內容包括擴展與配置、CI / 安全、文件、Windows 相容，以及面向「社會人」仿真的技能——讓假設進入可複查的仿真與研究流程。',
    collabLabel: 'AgentSociety 倉庫',
    collabHref: urls.agentsociety,
    platformLabel: 'AgentSociety 2 平台',
    platformHref: urls.platform,
    relatedPaperLabel: '相關平台論文 (arXiv:2502.08691)',
    relatedPaperHref: urls.relatedPaper,
    pubTitle: '論文',
    pubYear: '2026',
    pubName,
    pubVenue: 'arXiv preprint',
    pubAbs: urls.pubAbs,
    pubPdf: urls.pubPdf,
    nowTitle: '此刻',
    nowItems: [
      'AgentSociety 2 工程與社會人仿真技能',
      '把假設變成可稽核仿真與研究工作流',
    ],
    workTitle: 'AgentSociety 相關',
    workIntro: '與 GitHub 主頁 Featured 一致，只列 AgentSociety 主線。',
    projects: [
      {
        name: 'AgentSociety',
        role: '貢獻者 / 合作作者',
        desc: '面向可執行社會科學的 LLM 原生整合研究環境。',
        href: urls.agentsociety,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: '作者',
        desc: '社會人仿真技能庫：節律、關係、規範與經濟約束。',
        href: urls.skills,
      },
    ],
    connectTitle: '聯繫',
    connectIntro: '研究與協作相關，優先郵件或 GitHub。',
    links: [
      {
        label: 'GitHub',
        href: urls.github,
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'Profile README',
        href: urls.profile,
        note: 'github.com/…/AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
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
    motto: 'Warm, not perfect.',
    subtitle: 'Student developer · LLM agents & executable social science',
    meta: ['Beijing', 'AgentSociety'],
    introTitle: 'Line of work',
    paragraphs: [
      'Alexander James Carter. Beijing. Primary collaboration: Tsinghua FIB Lab’s AgentSociety / AgentSociety 2 — LLM-driven social agents and executable social science as runnable, auditable research workflows.',
    ],
    personal: personalSlots({
      sectionTitle: 'Personal',
      sectionLead:
        'Personal dossier slots reserved. Research and projects below; these fields will fill in gradually, not all at once.',
      reservedNote: 'Reserved',
      portraitLabel: 'Portrait',
      portraitAlt: 'Portrait (reserved)',
      bioLabel: 'Bio',
      backgroundLabel: 'Background',
      educationLabel: 'Education',
      interestsLabel: 'Interests',
      timelineLabel: 'Timeline',
    }),
    researchTitle: 'Research',
    researchLead: 'LLM-driven social agents · executable social science',
    researchBody:
      'Work covers extensions and config, CI / security, docs, Windows compatibility, and skills for socially grounded agents — turning hypotheses into auditable simulations and research workflows.',
    collabLabel: 'AgentSociety repo',
    collabHref: urls.agentsociety,
    platformLabel: 'AgentSociety 2 platform',
    platformHref: urls.platform,
    relatedPaperLabel: 'Related platform paper (arXiv:2502.08691)',
    relatedPaperHref: urls.relatedPaper,
    pubTitle: 'Publication',
    pubYear: '2026',
    pubName,
    pubVenue: 'arXiv preprint',
    pubAbs: urls.pubAbs,
    pubPdf: urls.pubPdf,
    nowTitle: 'Now',
    nowItems: [
      'AgentSociety 2 engineering and social-agent skills',
      'Hypotheses → auditable simulations and research workflows',
    ],
    workTitle: 'AgentSociety',
    workIntro:
      'Matches the Featured section on the GitHub profile — AgentSociety only.',
    projects: [
      {
        name: 'AgentSociety',
        role: 'Contributor & co-author',
        desc: 'LLM-native integrated research environment for executable social science.',
        href: urls.agentsociety,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: 'Author',
        desc: 'Theory-grounded skills for socially grounded agents.',
        href: urls.skills,
      },
    ],
    connectTitle: 'Contact',
    connectIntro: 'For research and collaboration — email or GitHub first.',
    links: [
      {
        label: 'GitHub',
        href: urls.github,
        note: '@AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'Profile README',
        href: urls.profile,
        note: 'github.com/…/AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
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
    motto: 'Chaleureux, pas parfait.',
    subtitle:
      'Étudiant développeur · agents LLM & sciences sociales exécutables',
    meta: ['Pékin', 'AgentSociety'],
    introTitle: 'Ligne de travail',
    paragraphs: [
      'Alexander James Carter. Pékin. Collaboration principale : AgentSociety / AgentSociety 2 (FIB Lab, Tsinghua) — agents sociaux LLM et sciences sociales exécutables en workflows auditables.',
    ],
    personal: personalSlots({
      sectionTitle: 'Personnel',
      sectionLead:
        'Emplacements réservés pour le dossier personnel. Recherche et projets ci-dessous ; remplissage progressif, sans précipitation.',
      reservedNote: 'Réservé',
      portraitLabel: 'Portrait',
      portraitAlt: 'Portrait (réservé)',
      bioLabel: 'Bio',
      backgroundLabel: 'Parcours',
      educationLabel: 'Formation',
      interestsLabel: 'Intérêts',
      timelineLabel: 'Chronologie',
    }),
    researchTitle: 'Recherche',
    researchLead:
      'Agents sociaux pilotés par LLM · sciences sociales exécutables',
    researchBody:
      'Extensions et config, CI / sécurité, docs, Windows, et compétences pour agents socialement ancrés — des hypothèses aux simulations auditables.',
    collabLabel: 'Dépôt AgentSociety',
    collabHref: urls.agentsociety,
    platformLabel: 'Plateforme AgentSociety 2',
    platformHref: urls.platform,
    relatedPaperLabel: 'Article plateforme (arXiv:2502.08691)',
    relatedPaperHref: urls.relatedPaper,
    pubTitle: 'Publication',
    pubYear: '2026',
    pubName,
    pubVenue: 'arXiv preprint',
    pubAbs: urls.pubAbs,
    pubPdf: urls.pubPdf,
    nowTitle: 'Maintenant',
    nowItems: [
      'Ingénierie AgentSociety 2 et compétences d’agents sociaux',
      'Hypothèses → simulations auditables et workflows de recherche',
    ],
    workTitle: 'AgentSociety',
    workIntro:
      'Aligné sur Featured du profil GitHub — AgentSociety uniquement.',
    projects: [
      {
        name: 'AgentSociety',
        role: 'Contributeur & co-auteur',
        desc: 'Environnement de recherche intégré natif LLM.',
        href: urls.agentsociety,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: 'Auteur',
        desc: 'Compétences pour agents socialement ancrés.',
        href: urls.skills,
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
        label: 'Profile README',
        href: urls.profile,
        note: 'github.com/…/AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
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
    motto: 'Тёпло, не идеально.',
    subtitle: 'Студент-разработчик · LLM-агенты и исполнимая социальная наука',
    meta: ['Пекин', 'AgentSociety'],
    introTitle: 'Основная линия',
    paragraphs: [
      'Alexander James Carter. Пекин. Основное сотрудничество: AgentSociety / AgentSociety 2 (FIB Lab, Tsinghua) — LLM-агенты и исполнимая социальная наука как исполняемые, проверяемые рабочие процессы.',
    ],
    personal: personalSlots({
      sectionTitle: 'Личное',
      sectionLead:
        'Слоты личного досье зарезервированы. Исследования и проекты ниже; заполнение постепенное, без спешки.',
      reservedNote: 'Зарезервировано',
      portraitLabel: 'Портрет',
      portraitAlt: 'Портрет (зарезервировано)',
      bioLabel: 'Био',
      backgroundLabel: 'Фон',
      educationLabel: 'Образование',
      interestsLabel: 'Интересы',
      timelineLabel: 'Хронология',
    }),
    researchTitle: 'Исследования',
    researchLead: 'Социальные агенты на LLM · исполнимая социальная наука',
    researchBody:
      'Расширения и config, CI / безопасность, документация, Windows и навыки для социально укоренённых агентов — от гипотез к аудируемым симуляциям.',
    collabLabel: 'Репозиторий AgentSociety',
    collabHref: urls.agentsociety,
    platformLabel: 'Платформа AgentSociety 2',
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
      'Инженерия AgentSociety 2 и навыки социальных агентов',
      'Гипотезы → аудируемые симуляции и исследовательские workflow',
    ],
    workTitle: 'AgentSociety',
    workIntro: 'Как Featured в GitHub-профиле — только AgentSociety.',
    projects: [
      {
        name: 'AgentSociety',
        role: 'Участник и соавтор',
        desc: 'LLM-нативная среда для исполнимой социальной науки.',
        href: urls.agentsociety,
      },
      {
        name: 'AgentSociety2-Agent-Skills',
        role: 'Автор',
        desc: 'Навыки для социально укоренённых агентов.',
        href: urls.skills,
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
        label: 'Profile README',
        href: urls.profile,
        note: 'github.com/…/AlexanderJ-Carter',
        external: true,
      },
      {
        label: 'ORCID',
        href: urls.orcid,
        note: '0009-0007-0343-4129',
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
