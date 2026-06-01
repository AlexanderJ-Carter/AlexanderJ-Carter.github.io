import type { Lang } from '../types';

export const t: Record<Lang, Record<string, string>> = {
  'zh-CN': {
    title: '阅读清单',
    subtitle: '推荐书籍与资源',
    badge: '📚 Reading',
    intro: '这里是一些我读过或正在阅读的好书，希望对你也有所帮助。',
    currentlyReading: '正在阅读',
    recommended: '推荐书单',
    wantToRead: '想读',
    back: '返回首页',
  },
  'zh-TW': {
    title: '閱讀清單',
    subtitle: '推薦書籍與資源',
    badge: '📚 Reading',
    intro: '這裡是一些我讀過或正在閱讀的好書，希望對你也有所幫助。',
    currentlyReading: '正在閱讀',
    recommended: '推薦書單',
    wantToRead: '想讀',
    back: '返回首頁',
  },
  'en-GB': {
    title: 'Reading List',
    subtitle: 'Recommended Books & Resources',
    badge: '📚 Reading',
    intro:
      "Here are some books I've read or am currently reading. Hope they help you too.",
    currentlyReading: 'Currently Reading',
    recommended: 'Recommended',
    wantToRead: 'Want to Read',
    back: 'Back to home',
  },
  fr: {
    title: 'Liste de lecture',
    subtitle: 'Livres et ressources recommandés',
    badge: '📚 Lecture',
    intro:
      "Voici quelques livres que j'ai lus ou que je suis en train de lire. J'espère qu'ils vous aideront aussi.",
    currentlyReading: 'En cours de lecture',
    recommended: 'Recommandés',
    wantToRead: 'À lire',
    back: "Retour à l'accueil",
  },
  ru: {
    title: 'Список чтения',
    subtitle: 'Рекомендуемые книги и ресурсы',
    badge: '📚 Чтение',
    intro:
      'Вот несколько книг, которые я прочитал или читаю сейчас. Надеюсь, они помогут и вам.',
    currentlyReading: 'Читаю сейчас',
    recommended: 'Рекомендую',
    wantToRead: 'Хочу прочитать',
    back: 'На главную',
  },
};

export const readingPathsData: Record<Lang, any> = {
  'zh-CN': {
    title: '阅读路线',
    intro: '我把书单按用途拆开：先建立地基，再补工程手感，最后回到审美和表达。',
    items: [
      {
        icon: '🧠',
        title: '计算机地基',
        desc: '系统、算法、数据结构和编译原理，帮助理解代码背后的机器与抽象。',
        picks: ['CSAPP', '算法导论', '代码大全'],
      },
      {
        icon: '🛠️',
        title: '工程实践',
        desc: '关注可维护性、重构、测试、协作和长期演进，避免只会写一次性代码。',
        picks: ['Clean Code', 'Refactoring', 'Design Patterns'],
      },
      {
        icon: '🎞️',
        title: '创意表达',
        desc: '摄影、设计、系统思维和写作训练观察力，让技术作品更容易被理解。',
        picks: ['摄影构图学', '系统之美', '写作练习'],
      },
    ],
  },
  'zh-TW': {
    title: '閱讀路線',
    intro: '我把書單按用途拆開：先建立地基，再補工程手感，最後回到審美和表達。',
    items: [
      {
        icon: '🧠',
        title: '計算機地基',
        desc: '系統、演算法、資料結構和編譯原理，幫助理解代碼背後的機器與抽象。',
        picks: ['CSAPP', '演算法導論', '代碼大全'],
      },
      {
        icon: '🛠️',
        title: '工程實踐',
        desc: '關注可維護性、重構、測試、協作和長期演進，避免只會寫一次性代碼。',
        picks: ['Clean Code', 'Refactoring', 'Design Patterns'],
      },
      {
        icon: '🎞️',
        title: '創意表達',
        desc: '攝影、設計、系統思維和寫作訓練觀察力，讓技術作品更容易被理解。',
        picks: ['攝影構圖學', '系統之美', '寫作練習'],
      },
    ],
  },
  'en-GB': {
    title: 'Reading Routes',
    intro:
      'I split the list by purpose: build foundations first, add engineering judgement, then return to taste and expression.',
    items: [
      {
        icon: '🧠',
        title: 'Computer Foundations',
        desc: 'Systems, algorithms, data structures and compilers help connect code to machines and abstractions.',
        picks: ['CSAPP', 'Introduction to Algorithms', 'Code Complete'],
      },
      {
        icon: '🛠️',
        title: 'Engineering Practice',
        desc: 'Maintainability, refactoring, testing, collaboration and long-term evolution beyond one-off code.',
        picks: ['Clean Code', 'Refactoring', 'Design Patterns'],
      },
      {
        icon: '🎞️',
        title: 'Creative Expression',
        desc: 'Photography, design, systems thinking and writing train observation so technical work is easier to understand.',
        picks: [
          'Photographic Composition',
          'Thinking in Systems',
          'Writing practice',
        ],
      },
    ],
  },
  fr: {
    title: 'Parcours de lecture',
    intro:
      'Je sépare la liste par usage : fondations, jugement d’ingénierie, puis goût et expression.',
    items: [
      {
        icon: '🧠',
        title: 'Bases informatiques',
        desc: 'Systèmes, algorithmes, structures de données et compilation relient le code aux machines et abstractions.',
        picks: ['CSAPP', 'Introduction to Algorithms', 'Code Complete'],
      },
      {
        icon: '🛠️',
        title: 'Pratique d’ingénierie',
        desc: 'Maintenabilité, refactoring, tests, collaboration et évolution au-delà du code jetable.',
        picks: ['Clean Code', 'Refactoring', 'Design Patterns'],
      },
      {
        icon: '🎞️',
        title: 'Expression créative',
        desc: 'Photo, design, pensée systémique et écriture entraînent l’observation et la clarté.',
        picks: ['Composition photo', 'Thinking in Systems', 'Écriture'],
      },
    ],
  },
  ru: {
    title: 'Маршруты чтения',
    intro:
      'Я делю список по назначению: сначала фундамент, затем инженерное мышление, потом вкус и выражение.',
    items: [
      {
        icon: '🧠',
        title: 'Фундамент CS',
        desc: 'Системы, алгоритмы, структуры данных и компиляторы связывают код с машинами и абстракциями.',
        picks: ['CSAPP', 'Introduction to Algorithms', 'Code Complete'],
      },
      {
        icon: '🛠️',
        title: 'Инженерная практика',
        desc: 'Поддерживаемость, рефакторинг, тесты, сотрудничество и долгосрочное развитие кода.',
        picks: ['Clean Code', 'Refactoring', 'Design Patterns'],
      },
      {
        icon: '🎞️',
        title: 'Творческое выражение',
        desc: 'Фото, дизайн, системное мышление и письмо тренируют наблюдение и ясность.',
        picks: ['Композиция', 'Thinking in Systems', 'Практика письма'],
      },
    ],
  },
};

