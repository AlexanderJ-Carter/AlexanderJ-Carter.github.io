import type { Lang } from '../types';

export const siteGuideData: Record<Lang, any> = {
  'zh-CN': {
    title: '这里放什么',
    intro:
      '本站不是单纯的作品集，也不是完整博客，更像一个长期维护的个人操作台。',
    sections: [
      {
        title: '作品与照片',
        desc: '画廊承担视觉记录，后续会继续补地点、拍摄意图和系列说明。',
        href: '/gallery',
      },
      {
        title: '小工具',
        desc: '时间、单位、汇率、二维码等工具尽量轻量、本地优先、无需登录。',
        href: '/projects',
      },
      {
        title: '信任与边界',
        desc: '隐私、条款、许可证、无障碍和安全披露用于说明站点怎样运行。',
        href: '/privacy',
      },
    ],
  },
  'zh-TW': {
    title: '這裡放什麼',
    intro:
      '本站不是單純的作品集，也不是完整部落格，更像一個長期維護的個人操作台。',
    sections: [
      {
        title: '作品與照片',
        desc: '畫廊承擔視覺記錄，後續會繼續補地點、拍攝意圖和系列說明。',
        href: '/gallery',
      },
      {
        title: '小工具',
        desc: '時間、單位、匯率、二維碼等工具盡量輕量、本地優先、無需登入。',
        href: '/projects',
      },
      {
        title: '信任與邊界',
        desc: '隱私、條款、許可證、無障礙和安全披露用於說明站點怎樣運行。',
        href: '/privacy',
      },
    ],
  },
  'en-GB': {
    title: 'What Belongs Here',
    intro:
      'This is not only a portfolio and not quite a full blog. It is a maintained personal workbench.',
    sections: [
      {
        title: 'Works & Photos',
        desc: 'The gallery carries visual notes; locations, intent and series notes can grow around it over time.',
        href: '/gallery',
      },
      {
        title: 'Small Tools',
        desc: 'Time, units, currency and QR tools aim to stay lightweight, local-first and login-free.',
        href: '/projects',
      },
      {
        title: 'Trust & Boundaries',
        desc: 'Privacy, terms, licence, accessibility and security disclosure explain how the site operates.',
        href: '/privacy',
      },
    ],
  },
  fr: {
    title: 'Ce qui vit ici',
    intro:
      'Ce n’est pas seulement un portfolio ni un blog complet : c’est un atelier personnel maintenu.',
    sections: [
      {
        title: 'Œuvres et photos',
        desc: 'La galerie porte les notes visuelles ; lieux, intentions et séries pourront s’y ajouter.',
        href: '/gallery',
      },
      {
        title: 'Petits outils',
        desc: 'Heure, unités, devises et QR restent légers, locaux d’abord et sans connexion.',
        href: '/projects',
      },
      {
        title: 'Confiance et cadre',
        desc: 'Confidentialité, conditions, licence, accessibilité et sécurité expliquent le fonctionnement du site.',
        href: '/privacy',
      },
    ],
  },
  ru: {
    title: 'Что здесь находится',
    intro:
      'Это не только портфолио и не полноценный блог, а поддерживаемый личный рабочий стол.',
    sections: [
      {
        title: 'Работы и фото',
        desc: 'Галерея хранит визуальные заметки; позже вокруг них могут появляться места, замыслы и серии.',
        href: '/gallery',
      },
      {
        title: 'Малые инструменты',
        desc: 'Время, единицы, валюты и QR остаются лёгкими, локальными и без входа.',
        href: '/projects',
      },
      {
        title: 'Доверие и границы',
        desc: 'Приватность, условия, лицензия, доступность и безопасность объясняют работу сайта.',
        href: '/privacy',
      },
    ],
  },
};

