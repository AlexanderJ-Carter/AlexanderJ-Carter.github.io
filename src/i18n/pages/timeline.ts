import type { Lang } from '../types';

export const timelineData: Record<
  Lang,
  {
    title: string;
    description: string;
    tag: string;
    headerTitle: string;
    headerDesc: string;
    back: string;
    presentLabel: string;
    events: Array<{
      year: number | string;
      title: string;
      description: string;
      icon: string;
      color: string;
      tags?: string[];
    }>;
  }
> = {
  'zh-CN': {
    title: '时间轴',
    description: '我的学习与成长历程',
    tag: '成长足迹',
    headerTitle: '成长历程',
    headerDesc: '记录每一个重要的里程碑与转折点',
    back: '返回首页',
    presentLabel: '现在',
    events: [
      {
        year: '现在',
        title: '持续学习与探索',
        description:
          '在电子信息专业继续深造，维护个人网站，在摄影和开发之间寻找平衡。',
        icon: '🚀',
        color: 'from-primary-600 to-primary-400',
        tags: ['在读', '开发', '摄影'],
      },
      {
        year: 2025,
        title: '网站全面重设计',
        description:
          '使用 Astro 框架与 Tailwind CSS 完全重构个人网站，引入多语言支持与无障碍优化。',
        icon: '🎨',
        color: 'from-primary-700 to-primary-500',
        tags: ['Astro', 'Tailwind', 'i18n'],
      },
      {
        year: 2024,
        title: '深入 Web 开发',
        description:
          '系统学习前端框架、数据库与后端基础，完成多个个人项目并开始写技术博客。',
        icon: '📚',
        color: 'from-green-500 to-blue-500',
        tags: ['React', 'Node.js', '博客'],
      },
      {
        year: 2023,
        title: '摄影与创作',
        description:
          '认真拍摄并整理作品集，开始在网站发布摄影作品，在图像与代码之间找到共鸣。',
        icon: '📷',
        color: 'from-amber-500 to-orange-500',
        tags: ['摄影', '创作', '画廊'],
      },
      {
        year: 2022,
        title: '编程之旅起步',
        description:
          '第一次真正接触编程，从 HTML/CSS 入手，创建了人生中第一个网页。',
        icon: '💻',
        color: 'from-orange-500 to-red-500',
        tags: ['HTML', 'CSS', '起点'],
      },
    ],
  },
  'zh-TW': {
    title: '時間軸',
    description: '我的學習與成長歷程',
    tag: '成長足跡',
    headerTitle: '成長歷程',
    headerDesc: '記錄每一個重要的里程碑與轉折點',
    back: '返回首頁',
    presentLabel: '現在',
    events: [
      {
        year: '現在',
        title: '持續學習與探索',
        description:
          '在電子資訊專業繼續深造，維護個人網站，在攝影和開發之間尋找平衡。',
        icon: '🚀',
        color: 'from-primary-600 to-primary-400',
        tags: ['在讀', '開發', '攝影'],
      },
      {
        year: 2025,
        title: '網站全面重設計',
        description:
          '使用 Astro 框架與 Tailwind CSS 完全重構個人網站，引入多語言支援與無障礙優化。',
        icon: '🎨',
        color: 'from-primary-700 to-primary-500',
        tags: ['Astro', 'Tailwind', 'i18n'],
      },
      {
        year: 2024,
        title: '深入 Web 開發',
        description:
          '系統學習前端框架、資料庫與後端基礎，完成多個個人專案並開始寫技術部落格。',
        icon: '📚',
        color: 'from-green-500 to-blue-500',
        tags: ['React', 'Node.js', '部落格'],
      },
      {
        year: 2023,
        title: '攝影與創作',
        description:
          '認真拍攝並整理作品集，開始在網站發布攝影作品，在圖像與程式碼之間找到共鳴。',
        icon: '📷',
        color: 'from-amber-500 to-orange-500',
        tags: ['攝影', '創作', '畫廊'],
      },
      {
        year: 2022,
        title: '程式設計之旅起步',
        description:
          '第一次真正接觸程式設計，從 HTML/CSS 入手，創建了人生中第一個網頁。',
        icon: '💻',
        color: 'from-orange-500 to-red-500',
        tags: ['HTML', 'CSS', '起點'],
      },
    ],
  },
  'en-GB': {
    title: 'Timeline',
    description: 'My learning and growth journey',
    tag: 'My journey',
    headerTitle: 'Journey',
    headerDesc: 'Every milestone and turning point along the way',
    back: 'Back to home',
    presentLabel: 'Now',
    events: [
      {
        year: 'Now',
        title: 'Continuous learning & exploration',
        description:
          'Studying electronics at university, maintaining this site, finding balance between photography and development.',
        icon: '🚀',
        color: 'from-primary-600 to-primary-400',
        tags: ['Studying', 'Dev', 'Photography'],
      },
      {
        year: 2025,
        title: 'Full website redesign',
        description:
          'Completely rebuilt the site with Astro and Tailwind CSS, adding multilingual support and accessibility improvements.',
        icon: '🎨',
        color: 'from-primary-700 to-primary-500',
        tags: ['Astro', 'Tailwind', 'i18n'],
      },
      {
        year: 2024,
        title: 'Deep dive into web dev',
        description:
          'Systematically learned frontend frameworks, databases, and backend fundamentals; shipped several personal projects and started a tech blog.',
        icon: '📚',
        color: 'from-green-500 to-blue-500',
        tags: ['React', 'Node.js', 'Blog'],
      },
      {
        year: 2023,
        title: 'Photography & creative work',
        description:
          'Took photography seriously, built a portfolio, and started publishing work online — finding a bridge between images and code.',
        icon: '📷',
        color: 'from-amber-500 to-orange-500',
        tags: ['Photography', 'Creative', 'Gallery'],
      },
      {
        year: 2022,
        title: 'First steps in programming',
        description:
          'First real contact with programming — started with HTML and CSS, and built my very first webpage.',
        icon: '💻',
        color: 'from-orange-500 to-red-500',
        tags: ['HTML', 'CSS', 'Beginning'],
      },
    ],
  },
  fr: {
    title: 'Chronologie',
    description: "Mon parcours d'apprentissage et de croissance",
    tag: 'Mon parcours',
    headerTitle: 'Parcours',
    headerDesc: 'Chaque étape importante et tournant décisif',
    back: "Retour à l'accueil",
    presentLabel: 'Maintenant',
    events: [
      {
        year: 'Maintenant',
        title: 'Apprentissage continu',
        description:
          'Études en électronique, maintenance du site, équilibre entre photographie et développement.',
        icon: '🚀',
        color: 'from-primary-600 to-primary-400',
        tags: ['Études', 'Dev', 'Photo'],
      },
      {
        year: 2025,
        title: 'Refonte complète du site',
        description:
          "Site entièrement reconstruit avec Astro et Tailwind CSS, support multilingue et améliorations d'accessibilité.",
        icon: '🎨',
        color: 'from-primary-700 to-primary-500',
        tags: ['Astro', 'Tailwind', 'i18n'],
      },
      {
        year: 2024,
        title: 'Plongée dans le dev web',
        description:
          "Apprentissage des frameworks frontend, bases de données et backend ; plusieurs projets et début d'un blog tech.",
        icon: '📚',
        color: 'from-green-500 to-blue-500',
        tags: ['React', 'Node.js', 'Blog'],
      },
      {
        year: 2023,
        title: 'Photographie et création',
        description:
          'Prise de vue sérieuse, portfolio constitué, publication de travaux en ligne — pont entre image et code.',
        icon: '📷',
        color: 'from-amber-500 to-orange-500',
        tags: ['Photo', 'Créatif', 'Galerie'],
      },
      {
        year: 2022,
        title: 'Premiers pas en programmation',
        description:
          'Premier vrai contact avec la programmation — HTML et CSS, puis première page web.',
        icon: '💻',
        color: 'from-orange-500 to-red-500',
        tags: ['HTML', 'CSS', 'Début'],
      },
    ],
  },
  ru: {
    title: 'Хронология',
    description: 'Мой путь обучения и роста',
    tag: 'Мой путь',
    headerTitle: 'Путь',
    headerDesc: 'Каждый важный этап и поворотный момент',
    back: 'На главную',
    presentLabel: 'Сейчас',
    events: [
      {
        year: 'Сейчас',
        title: 'Непрерывное обучение',
        description:
          'Учёба по направлению электроники, поддержка сайта, баланс между фотографией и разработкой.',
        icon: '🚀',
        color: 'from-primary-600 to-primary-400',
        tags: ['Учёба', 'Разработка', 'Фото'],
      },
      {
        year: 2025,
        title: 'Полный редизайн сайта',
        description:
          'Сайт полностью пересобран на Astro и Tailwind CSS, добавлена мультиязычность и улучшена доступность.',
        icon: '🎨',
        color: 'from-primary-700 to-primary-500',
        tags: ['Astro', 'Tailwind', 'i18n'],
      },
      {
        year: 2024,
        title: 'Погружение в веб-разработку',
        description:
          'Систематически изучил фреймворки, базы данных и бэкенд; сделал несколько проектов и завёл технический блог.',
        icon: '📚',
        color: 'from-green-500 to-blue-500',
        tags: ['React', 'Node.js', 'Блог'],
      },
      {
        year: 2023,
        title: 'Фотография и творчество',
        description:
          'Серьёзно занялся фотографией, собрал портфолио и начал публиковать работы — мост между изображением и кодом.',
        icon: '📷',
        color: 'from-amber-500 to-orange-500',
        tags: ['Фото', 'Творчество', 'Галерея'],
      },
      {
        year: 2022,
        title: 'Первые шаги в программировании',
        description:
          'Первый настоящий контакт с программированием — HTML и CSS, затем первая веб-страница.',
        icon: '💻',
        color: 'from-orange-500 to-red-500',
        tags: ['HTML', 'CSS', 'Начало'],
      },
    ],
  },
};
