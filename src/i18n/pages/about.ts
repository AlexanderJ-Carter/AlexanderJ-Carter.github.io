import type { Lang } from '../types';

export interface SkillItem {
  name: string;
  level: number;
  icon: string;
  category: string;
}

export interface EducationItem {
  year: string;
  title: string;
  institution: string;
  degree: string;
  description: string;
  icon: string;
  highlights: string[];
}

export interface InterestItem {
  name: string;
  icon: string;
  description: string;
}

export interface LanguageItem {
  name: string;
  level: number;
  proficiency: string;
}

export interface FocusData {
  title: string;
  subtitle: string;
  items: { icon: string; title: string; desc: string }[];
  principlesTitle: string;
  principles: string[];
}

export const skillsData: Record<Lang, SkillItem[]> = {
  'zh-CN': [
    { name: 'C/C++', level: 95, icon: '⚙️', category: '编程' },
    { name: 'Python', level: 90, icon: '🐍', category: '编程' },
    { name: 'Java', level: 70, icon: '☕', category: '编程' },
    { name: 'HTML/CSS/JS', level: 85, icon: '🌐', category: 'Web开发' },
    { name: 'Verilog', level: 80, icon: '🔌', category: '硬件' },
    { name: 'MATLAB', level: 80, icon: '📊', category: '工具' },
    { name: '摄影', level: 88, icon: '📷', category: '创意' },
    { name: 'UI/UX设计', level: 75, icon: '🎨', category: '创意' },
  ],
  'zh-TW': [
    { name: 'C/C++', level: 95, icon: '⚙️', category: '程式設計' },
    { name: 'Python', level: 90, icon: '🐍', category: '程式設計' },
    { name: 'Java', level: 70, icon: '☕', category: '程式設計' },
    { name: 'HTML/CSS/JS', level: 85, icon: '🌐', category: 'Web開發' },
    { name: 'Verilog', level: 80, icon: '🔌', category: '硬體' },
    { name: 'MATLAB', level: 80, icon: '📊', category: '工具' },
    { name: '攝影', level: 88, icon: '📷', category: '創意' },
    { name: 'UI/UX設計', level: 75, icon: '🎨', category: '創意' },
  ],
  'en-GB': [
    { name: 'C/C++', level: 95, icon: '⚙️', category: 'Programming' },
    { name: 'Python', level: 90, icon: '🐍', category: 'Programming' },
    { name: 'Java', level: 70, icon: '☕', category: 'Programming' },
    { name: 'HTML/CSS/JS', level: 85, icon: '🌐', category: 'Web Dev' },
    { name: 'Verilog', level: 80, icon: '🔌', category: 'Hardware' },
    { name: 'MATLAB', level: 80, icon: '📊', category: 'Tools' },
    { name: 'Photography', level: 88, icon: '📷', category: 'Creative' },
    { name: 'UI/UX Design', level: 75, icon: '🎨', category: 'Creative' },
  ],
  fr: [
    { name: 'C/C++', level: 95, icon: '⚙️', category: 'Programmation' },
    { name: 'Python', level: 90, icon: '🐍', category: 'Programmation' },
    { name: 'Java', level: 70, icon: '☕', category: 'Programmation' },
    { name: 'HTML/CSS/JS', level: 85, icon: '🌐', category: 'Dév Web' },
    { name: 'Verilog', level: 80, icon: '🔌', category: 'Matériel' },
    { name: 'MATLAB', level: 80, icon: '📊', category: 'Outils' },
    { name: 'Photographie', level: 88, icon: '📷', category: 'Créatif' },
    { name: 'Design UI/UX', level: 75, icon: '🎨', category: 'Créatif' },
  ],
  ru: [
    { name: 'C/C++', level: 95, icon: '⚙️', category: 'Программирование' },
    { name: 'Python', level: 90, icon: '🐍', category: 'Программирование' },
    { name: 'Java', level: 70, icon: '☕', category: 'Программирование' },
    { name: 'HTML/CSS/JS', level: 85, icon: '🌐', category: 'Веб-разработка' },
    {
      name: 'Verilog',
      level: 80,
      icon: '🔌',
      category: 'Аппаратное обеспечение',
    },
    { name: 'MATLAB', level: 80, icon: '📊', category: 'Инструменты' },
    { name: 'Фотография', level: 88, icon: '📷', category: 'Творчество' },
    { name: 'UI/UX Дизайн', level: 75, icon: '🎨', category: 'Творчество' },
  ],
};

export const educationData: Record<Lang, EducationItem[]> = {
  'zh-CN': [
    {
      year: '2023 - 至今',
      title: '本科在读',
      institution: '重点大学',
      degree: '电子信息相关专业',
      description:
        '学习电子信息、计算机科学相关知识，培养工程实践能力，探索技术与艺术的结合。',
      icon: '🎓',
      highlights: ['专业学习', '实践项目', '技能提升'],
    },
    {
      year: '2017 - 2023',
      title: '中学教育',
      institution: '重点中学',
      degree: '高中毕业',
      description:
        '打下坚实的理科基础，培养了对科技和创意的兴趣，为后续学习奠定基础。',
      icon: '📚',
      highlights: ['理科学习', '综合发展', '兴趣培养'],
    },
  ],
  'zh-TW': [
    {
      year: '2023 - 至今',
      title: '本科在讀',
      institution: '重點大學',
      degree: '電子資訊相關專業',
      description:
        '學習電子資訊、計算機科學相關知識，培養工程實踐能力，探索技術與藝術的結合。',
      icon: '🎓',
      highlights: ['專業學習', '實踐項目', '技能提升'],
    },
    {
      year: '2017 - 2023',
      title: '中學教育',
      institution: '重點中學',
      degree: '高中畢業',
      description:
        '打下堅實的理科基礎，培養了對科技和創意的興趣，為後續學習奠定基礎。',
      icon: '📚',
      highlights: ['理科學習', '綜合發展', '興趣培養'],
    },
  ],
  'en-GB': [
    {
      year: '2023 - Present',
      title: 'Undergraduate Studies',
      institution: 'Key University',
      degree: 'Electronics & Information Technology',
      description:
        'Studying electronic information technology and computer science, developing engineering and practical skills, exploring the intersection of technology and art.',
      icon: '🎓',
      highlights: [
        'Professional Learning',
        'Practical Projects',
        'Skill Development',
      ],
    },
    {
      year: '2017 - 2023',
      title: 'High School Education',
      institution: 'Key High School',
      degree: 'High School Diploma',
      description:
        'Built strong foundation in science and mathematics, developed passion for technology and creativity, laying groundwork for future studies.',
      icon: '📚',
      highlights: [
        'Science Studies',
        'Comprehensive Development',
        'Interest Cultivation',
      ],
    },
  ],
  fr: [
    {
      year: '2023 - Présent',
      title: 'Études de Premier Cycle',
      institution: 'Université Clé',
      degree: "Électronique et Technologie de l'Information",
      description:
        "Étude de la technologie de l'information électronique et de l'informatique, développement des compétences en ingénierie et pratiques, exploration de l'intersection de la technologie et de l'art.",
      icon: '🎓',
      highlights: [
        'Apprentissage Professionnel',
        'Projets Pratiques',
        'Développement des Compétences',
      ],
    },
    {
      year: '2017 - 2023',
      title: 'Enseignement Secondaire',
      institution: 'Lycée Clé',
      degree: "Diplôme d'Études Secondaires",
      description:
        'Solide base en sciences et mathématiques, passion développée pour la technologie et la créativité, posant les bases pour les études futures.',
      icon: '📚',
      highlights: [
        'Études Scientifiques',
        'Développement Global',
        'Culture des Intérêts',
      ],
    },
  ],
  ru: [
    {
      year: '2023 - Настоящее время',
      title: 'Бакалавриат',
      institution: 'Ключевой Университет',
      degree: 'Электроника и Информационные Технологии',
      description:
        'Изучение электронных информационных технологий и компьютерных наук, развитие инженерных и практических навыков, исследование пересечения технологий и искусства.',
      icon: '🎓',
      highlights: [
        'Профессиональное Обучение',
        'Практические Проекты',
        'Развитие Навыков',
      ],
    },
    {
      year: '2017 - 2023',
      title: 'Среднее Образование',
      institution: 'Ключевая Средняя Школа',
      degree: 'Аттестат о Среднем Образовании',
      description:
        'Прочный фундамент в науке и математике, развитая страсть к технологиям и творчеству, закладывающая основу для будущих исследований.',
      icon: '📚',
      highlights: [
        'Научные Исследования',
        'Всестороннее Развитие',
        'Развитие Интересов',
      ],
    },
  ],
};

export const interestsData: Record<Lang, InterestItem[]> = {
  'zh-CN': [
    { name: '摄影创作', icon: '📸', description: '风景、人像、美食摄影' },
    { name: '阅读写作', icon: '📖', description: '技术博客、文学作品' },
    { name: '音乐欣赏', icon: '🎵', description: '古典音乐、钢琴曲' },
    { name: '户外运动', icon: '🏃', description: '徒步、骑行、探索' },
    { name: '开源贡献', icon: '💻', description: '参与开源项目' },
    { name: '创意设计', icon: '🎨', description: 'UI/UX、平面设计' },
  ],
  'zh-TW': [
    { name: '攝影創作', icon: '📸', description: '風景、人像、美食攝影' },
    { name: '閱讀寫作', icon: '📖', description: '技術部落格、文學作品' },
    { name: '音樂欣賞', icon: '🎵', description: '古典音樂、鋼琴曲' },
    { name: '戶外運動', icon: '🏃', description: '徒步、騎行、探索' },
    { name: '開源貢獻', icon: '💻', description: '參與開源項目' },
    { name: '創意設計', icon: '🎨', description: 'UI/UX、平面設計' },
  ],
  'en-GB': [
    {
      name: 'Photography',
      icon: '📸',
      description: 'Landscape, portrait, food photography',
    },
    {
      name: 'Reading & Writing',
      icon: '📖',
      description: 'Tech blogs, literature',
    },
    { name: 'Music', icon: '🎵', description: 'Classical music, piano' },
    {
      name: 'Outdoor Activities',
      icon: '🏃',
      description: 'Hiking, cycling, exploring',
    },
    {
      name: 'Open Source',
      icon: '💻',
      description: 'Contributing to open source',
    },
    {
      name: 'Creative Design',
      icon: '🎨',
      description: 'UI/UX, graphic design',
    },
  ],
  fr: [
    {
      name: 'Photographie',
      icon: '📸',
      description: 'Paysage, portrait, photographie culinaire',
    },
    {
      name: 'Lecture et Écriture',
      icon: '📖',
      description: 'Blogs techniques, littérature',
    },
    { name: 'Musique', icon: '🎵', description: 'Musique classique, piano' },
    {
      name: 'Activités de Plein Air',
      icon: '🏃',
      description: 'Randonnée, cyclisme, exploration',
    },
    {
      name: 'Open Source',
      icon: '💻',
      description: "Contribution à l'open source",
    },
    {
      name: 'Design Créatif',
      icon: '🎨',
      description: 'UI/UX, design graphique',
    },
  ],
  ru: [
    {
      name: 'Фотография',
      icon: '📸',
      description: 'Пейзаж, портрет, фуд-фотография',
    },
    {
      name: 'Чтение и Письмо',
      icon: '📖',
      description: 'Технические блоги, литература',
    },
    {
      name: 'Музыка',
      icon: '🎵',
      description: 'Классическая музыка, фортепиано',
    },
    {
      name: 'Активный Отдых',
      icon: '🏃',
      description: 'Пешие прогулки, велоспорт, исследования',
    },
    {
      name: 'Open Source',
      icon: '💻',
      description: 'Вклад в открытый исходный код',
    },
    {
      name: 'Креативный Дизайн',
      icon: '🎨',
      description: 'UI/UX, графический дизайн',
    },
  ],
};

export const languagesData: Record<Lang, LanguageItem[]> = {
  'zh-CN': [
    { name: '汉语', level: 100, proficiency: '母语' },
    { name: '英语', level: 85, proficiency: '流利' },
    { name: '意大利语', level: 30, proficiency: '初级学习中' },
  ],
  'zh-TW': [
    { name: '漢語', level: 100, proficiency: '母語' },
    { name: '英語', level: 85, proficiency: '流利' },
    { name: '義大利語', level: 30, proficiency: '初級學習中' },
  ],
  'en-GB': [
    { name: 'Chinese', level: 100, proficiency: 'Native' },
    { name: 'English', level: 85, proficiency: 'Fluent' },
    { name: 'Italian', level: 30, proficiency: 'Beginner' },
  ],
  fr: [
    { name: 'Chinois', level: 100, proficiency: 'Langue maternelle' },
    { name: 'Anglais', level: 85, proficiency: 'Courant' },
    { name: 'Italien', level: 30, proficiency: 'Débutant' },
  ],
  ru: [
    { name: 'Китайский', level: 100, proficiency: 'Родной' },
    { name: 'Английский', level: 85, proficiency: 'Свободный' },
    { name: 'Итальянский', level: 30, proficiency: 'Начинающий' },
  ],
};

export const focusData: Record<Lang, FocusData> = {
  'zh-CN': {
    title: '当前关注',
    subtitle: '我会把学习拆成可交付的小块：做出来、写清楚、再迭代。',
    items: [
      {
        icon: '🧭',
        title: '工程基础',
        desc: '持续补强计算机系统、算法、数字电路和工程实践，把课堂知识落到可运行的项目里。',
      },
      {
        icon: '🧱',
        title: '静态站体验',
        desc: '用 Astro 做轻量页面，关注加载性能、无障碍、多语言和无客户端 JS 的默认体验。',
      },
      {
        icon: '🔍',
        title: '观察与表达',
        desc: '通过摄影、阅读和写作训练观察力，让技术内容也能有清晰的叙事和审美秩序。',
      },
    ],
    principlesTitle: '做事原则',
    principles: [
      '先可用，再漂亮',
      '少收集数据，多保护隐私',
      '复杂问题写清楚再动手',
    ],
  },
  'zh-TW': {
    title: '目前關注',
    subtitle: '我會把學習拆成可交付的小塊：做出來、寫清楚、再迭代。',
    items: [
      {
        icon: '🧭',
        title: '工程基礎',
        desc: '持續補強計算機系統、演算法、數位電路和工程實踐，把課堂知識落到可運行的專案裡。',
      },
      {
        icon: '🧱',
        title: '靜態站體驗',
        desc: '用 Astro 做輕量頁面，關注載入效能、無障礙、多語言和無客戶端 JS 的預設體驗。',
      },
      {
        icon: '🔍',
        title: '觀察與表達',
        desc: '通過攝影、閱讀和寫作訓練觀察力，讓技術內容也能有清晰的敘事和審美秩序。',
      },
    ],
    principlesTitle: '做事原則',
    principles: [
      '先可用，再漂亮',
      '少收集資料，多保護隱私',
      '複雜問題寫清楚再動手',
    ],
  },
  'en-GB': {
    title: 'Current Focus',
    subtitle:
      'I break learning into shippable pieces: make it work, explain it clearly, then iterate.',
    items: [
      {
        icon: '🧭',
        title: 'Engineering Foundations',
        desc: 'Strengthening systems, algorithms, digital circuits and practical engineering by turning coursework into runnable projects.',
      },
      {
        icon: '🧱',
        title: 'Static Site UX',
        desc: 'Building lightweight Astro pages with performance, accessibility, multilingual content and zero-client-JS defaults in mind.',
      },
      {
        icon: '🔍',
        title: 'Observation & Expression',
        desc: 'Using photography, reading and writing to train observation, so technical work can also carry clear narrative and visual order.',
      },
    ],
    principlesTitle: 'Working Principles',
    principles: [
      'Usable first, polished second',
      'Collect less data, protect more privacy',
      'Write complex problems down before touching code',
    ],
  },
  fr: {
    title: 'Priorités actuelles',
    subtitle:
      "Je découpe l'apprentissage en petits livrables : faire fonctionner, expliquer clairement, puis itérer.",
    items: [
      {
        icon: '🧭',
        title: "Bases d'ingénierie",
        desc: 'Renforcer systèmes, algorithmes, circuits numériques et pratique en transformant les cours en projets exécutables.',
      },
      {
        icon: '🧱',
        title: 'UX de site statique',
        desc: 'Créer des pages Astro légères avec performance, accessibilité, multilingue et zéro JS client par défaut.',
      },
      {
        icon: '🔍',
        title: 'Observation et expression',
        desc: 'Photographie, lecture et écriture entraînent le regard, pour donner aussi aux sujets techniques une narration claire.',
      },
    ],
    principlesTitle: 'Principes de travail',
    principles: [
      "Utilisable d'abord, élégant ensuite",
      'Moins de collecte, plus de confidentialité',
      'Écrire le problème avant de coder',
    ],
  },
  ru: {
    title: 'Текущий фокус',
    subtitle:
      'Я делю обучение на небольшие результаты: сделать, ясно объяснить и затем улучшить.',
    items: [
      {
        icon: '🧭',
        title: 'Инженерная база',
        desc: 'Укрепляю системы, алгоритмы, цифровые схемы и практику, превращая учебные темы в запускаемые проекты.',
      },
      {
        icon: '🧱',
        title: 'UX статического сайта',
        desc: 'Делаю лёгкие страницы на Astro с упором на скорость, доступность, многоязычность и минимум клиентского JS.',
      },
      {
        icon: '🔍',
        title: 'Наблюдение и выражение',
        desc: 'Фотография, чтение и письмо помогают тренировать взгляд, чтобы технические материалы были ясными и выразительными.',
      },
    ],
    principlesTitle: 'Принципы работы',
    principles: [
      'Сначала полезно, затем красиво',
      'Меньше сбора данных, больше приватности',
      'Сначала описать сложность, потом писать код',
    ],
  },
};
