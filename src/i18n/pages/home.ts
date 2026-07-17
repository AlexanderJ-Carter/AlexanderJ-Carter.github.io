import type { Lang } from '../types';

export type HomeFeaturedItem = {
  title: string;
  category: string;
  image: string;
};

export type HomeFocusItem = {
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
  focusTitle: string;
  focusSubtitle: string;
  focusViewMore: string;
  focus: HomeFocusItem[];
  writingTitle: string;
  writingSubtitle: string;
  writingViewAll: string;
  writingEmpty: string;
  studioTitle: string;
  studioBody: string;
  connectTitle: string;
  connectSubtitle: string;
  connectCta: string;
};

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
    featured: [
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
    ],
    focusTitle: '最近在打磨',
    focusSubtitle: '代码、影像与长文，慢慢长出来。',
    focusViewMore: '继续看看',
    focus: [
      {
        title: '影像整理',
        desc: '给旅行与日常照片补上分类与说明，让画廊可以慢慢翻。',
        href: '/gallery',
      },
      {
        title: '写作',
        desc: '工程实践、设计取舍与摄影观察——质量优先于数量。',
        href: '/writing',
      },
      {
        title: '小工具',
        desc: '时间、单位、汇率与二维码：轻量、隐私友好、键盘可达。',
        href: '/projects',
      },
    ],
    writingTitle: '近期写作',
    writingSubtitle: '不会很快过期的思考。',
    writingViewAll: '全部文章',
    writingEmpty: '暂无文章',
    studioTitle: '这是一间慢慢长出来的工作室',
    studioBody:
      '摄影记录光线的温度，写作整理实践里的取舍，小工具解决日常小摩擦。页面保持静态、隐私友好，并尽量让键盘与屏幕阅读器也能顺利走完路径。',
    connectTitle: '想聊聊？',
    connectSubtitle: '技术讨论、项目合作或随便聊聊，都欢迎。',
    connectCta: '联系我',
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
    focusTitle: '最近在打磨',
    focusSubtitle: '代碼、影像與長文，慢慢長出來。',
    focusViewMore: '繼續看看',
    focus: [
      {
        title: '影像整理',
        desc: '給旅行與日常照片補上分類與說明，讓畫廊可以慢慢翻。',
        href: '/gallery',
      },
      {
        title: '寫作',
        desc: '工程實踐、設計取捨與攝影觀察——質量優先於數量。',
        href: '/writing',
      },
      {
        title: '小工具',
        desc: '時間、單位、匯率與二維碼：輕量、隱私友好、鍵盤可達。',
        href: '/projects',
      },
    ],
    writingTitle: '近期寫作',
    writingSubtitle: '不會很快過期的思考。',
    writingViewAll: '全部文章',
    writingEmpty: '暫無文章',
    studioTitle: '這是一間慢慢長出來的工作室',
    studioBody:
      '攝影記錄光線的溫度，寫作整理實踐裡的取捨，小工具解決日常小摩擦。頁面保持靜態、隱私友好，並盡量讓鍵盤與螢幕閱讀器也能順利走完路徑。',
    connectTitle: '想聊聊？',
    connectSubtitle: '技術討論、專案合作或隨便聊聊，都歡迎。',
    connectCta: '聯繫我',
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
    focusTitle: 'Currently shaping',
    focusSubtitle: 'Code, images and long-form notes, growing slowly.',
    focusViewMore: 'Explore',
    focus: [
      {
        title: 'Image curation',
        desc: 'Travel and daily photos with clearer categories and notes.',
        href: '/gallery',
      },
      {
        title: 'Writing',
        desc: 'Engineering practice, design trade-offs and photography.',
        href: '/writing',
      },
      {
        title: 'Small utilities',
        desc: 'Time, units, currency and QR — light, private, keyboard-first.',
        href: '/projects',
      },
    ],
    writingTitle: 'Recent writing',
    writingSubtitle: 'Thoughts that should age slowly.',
    writingViewAll: 'All articles',
    writingEmpty: 'No posts yet',
    studioTitle: 'A studio that grows slowly',
    studioBody:
      'Photographs keep the warmth of light. Writing keeps the trade-offs of practice. Small tools remove everyday friction. The site stays static and privacy-friendly, with keyboard and screen-reader paths intact.',
    connectTitle: 'Want to chat?',
    connectSubtitle: 'Tech talk, collaboration, or a casual note — welcome.',
    connectCta: 'Get in touch',
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
    focusTitle: 'En cours',
    focusSubtitle: 'Code, images et textes longs, qui grandissent lentement.',
    focusViewMore: 'Explorer',
    focus: [
      {
        title: 'Curation photo',
        desc: 'Voyages et quotidien avec catégories et notes plus claires.',
        href: '/gallery',
      },
      {
        title: 'Écrits',
        desc: 'Ingénierie, design et photographie.',
        href: '/writing',
      },
      {
        title: 'Petits outils',
        desc: 'Heure, unités, devises et QR — légers et accessibles.',
        href: '/projects',
      },
    ],
    writingTitle: 'Écrits récents',
    writingSubtitle: 'Des idées qui vieillissent lentement.',
    writingViewAll: 'Tous les articles',
    writingEmpty: 'Pas encore d’articles',
    studioTitle: 'Un atelier qui grandit lentement',
    studioBody:
      'La photo garde la chaleur de la lumière. L’écriture garde les compromis de la pratique. Les petits outils retirent les frottements du quotidien. Le site reste statique, respectueux de la vie privée, et praticable au clavier.',
    connectTitle: 'Envie d’échanger ?',
    connectSubtitle: 'Tech, collaboration ou message simple — bienvenu.',
    connectCta: 'Me contacter',
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
    focusTitle: 'Сейчас в работе',
    focusSubtitle: 'Код, изображения и длинные тексты — понемногу.',
    focusViewMore: 'Смотреть',
    focus: [
      {
        title: 'Кураторство',
        desc: 'Путешествия и будни с понятными категориями и заметками.',
        href: '/gallery',
      },
      {
        title: 'Статьи',
        desc: 'Инженерия, дизайн и фотография.',
        href: '/writing',
      },
      {
        title: 'Утилиты',
        desc: 'Время, единицы, валюты и QR — легко и с клавиатуры.',
        href: '/projects',
      },
    ],
    writingTitle: 'Недавние статьи',
    writingSubtitle: 'Мысли, которые стареют медленно.',
    writingViewAll: 'Все статьи',
    writingEmpty: 'Пока нет статей',
    studioTitle: 'Студия, которая растёт медленно',
    studioBody:
      'Фотографии хранят тепло света. Тексты — компромиссы практики. Маленькие инструменты снимают повседневное трение. Сайт остаётся статичным и бережным к приватности, с удобными путями для клавиатуры.',
    connectTitle: 'Написать?',
    connectSubtitle: 'Техника, совместная работа или просто сообщение.',
    connectCta: 'Связаться',
  },
};
