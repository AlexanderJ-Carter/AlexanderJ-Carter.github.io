import type { Lang } from '../types';

export type SupportCopy = {
  title: string;
  description: string;
  kicker: string;
  headerTitle: string;
  headerDesc: string;
  back: string;
  whyTitle: string;
  whyBody: string;
  paidTitle: string;
  paidLead: string;
  paidNote: string;
  paidCta: string;
  freeTitle: string;
  freeLead: string;
  freeStar: string;
  freeShare: string;
  freeFeedback: string;
  honesty: string;
};

export const supportCopy: Record<Lang, SupportCopy> = {
  'zh-CN': {
    title: '支持本站',
    description: '用一杯咖啡的方式支持站点维护，或免费帮忙扩散',
    kicker: 'Support',
    headerTitle: '支持本站',
    headerDesc:
      '这个小站靠写作、摄影与工具慢慢堆起来。若它对你有用，欢迎以你舒服的方式支持一下。',
    back: '返回首页',
    whyTitle: '钱会用在哪',
    whyBody:
      '域名、托管周边、以及持续把页面写清楚、修到位。没有广告墙，也不卖会员课。',
    paidTitle: '爱发电',
    paidLead: '微信 / 支付宝都可以。最低档大约一杯咖啡，完全自愿，随时可停。',
    paidNote: '跳转到爱发电完成发电；本站不收集支付信息。',
    paidCta: '去爱发电支持',
    freeTitle: '不用花钱也可以',
    freeLead: '这些同样很有帮助。',
    freeStar: '给仓库点个 Star',
    freeShare: '把站点分享给可能用得上的人',
    freeFeedback: '写信告诉我哪里好用、哪里别扭',
    honesty: '赞助不附带独家内容或实体回礼，只是谢谢你愿意让这个角落多活一阵。',
  },
  'zh-TW': {
    title: '支持本站',
    description: '用一杯咖啡的方式支持站點維護，或免費幫忙擴散',
    kicker: 'Support',
    headerTitle: '支持本站',
    headerDesc:
      '這個小站靠寫作、攝影與工具慢慢堆起來。若它對你有用，歡迎以你舒服的方式支持一下。',
    back: '返回首頁',
    whyTitle: '錢會用在哪',
    whyBody:
      '域名、託管周邊、以及持續把頁面寫清楚、修到位。沒有廣告牆，也不賣會員課。',
    paidTitle: '愛發電',
    paidLead: '微信 / 支付寶都可以。最低檔大約一杯咖啡，完全自願，隨時可停。',
    paidNote: '跳轉到愛發電完成發電；本站不收集支付資訊。',
    paidCta: '去愛發電支持',
    freeTitle: '不用花錢也可以',
    freeLead: '這些同樣很有幫助。',
    freeStar: '給倉庫點個 Star',
    freeShare: '把站點分享給可能用得上的人',
    freeFeedback: '寫信告訴我哪裡好用、哪裡彆扭',
    honesty: '贊助不附帶獨家內容或實體回禮，只是謝謝你願意讓這個角落多活一陣。',
  },
  'en-GB': {
    title: 'Support',
    description: 'Buy a coffee toward site upkeep — or help for free',
    kicker: 'Support',
    headerTitle: 'Support this site',
    headerDesc:
      'This corner grows from writing, photographs and small tools. If it helps you, support it in whatever way feels right.',
    back: 'Back to home',
    whyTitle: 'Where it goes',
    whyBody:
      'Domain, hosting edges, and keeping pages clear and maintained. No ad wall, no course upsell.',
    paidTitle: 'Afdian',
    paidLead:
      'WeChat and Alipay work well. The lowest tier is roughly a coffee — voluntary, cancel anytime.',
    paidNote:
      'You will leave this site to pay on Afdian; we never collect card details here.',
    paidCta: 'Support on Afdian',
    freeTitle: 'Free ways to help',
    freeLead: 'These matter just as much.',
    freeStar: 'Star the repository',
    freeShare: 'Share the site with someone who might need it',
    freeFeedback: 'Write and tell me what works or what feels off',
    honesty:
      'Sponsorships do not unlock exclusive content or physical gifts — just thanks for helping this corner last.',
  },
  fr: {
    title: 'Soutenir',
    description:
      'Un café pour l’entretien du site — ou un coup de main gratuit',
    kicker: 'Support',
    headerTitle: 'Soutenir ce site',
    headerDesc:
      'Ce coin grandit avec l’écriture, la photo et de petits outils. Si cela vous aide, soutenez-le à votre façon.',
    back: "Retour à l'accueil",
    whyTitle: 'À quoi ça sert',
    whyBody:
      'Domaine, hébergement, et pages tenues à jour. Pas de mur publicitaire, pas de cours à vendre.',
    paidTitle: 'Afdian',
    paidLead:
      'WeChat et Alipay conviennent. Le palier le plus bas vaut à peu près un café — volontaire, annulable.',
    paidNote:
      'Le paiement se fait sur Afdian ; ce site ne collecte aucune donnée de paiement.',
    paidCta: 'Soutenir sur Afdian',
    freeTitle: 'Sans payer',
    freeLead: 'Ces gestes aident aussi.',
    freeStar: 'Mettre une étoile au dépôt',
    freeShare: 'Partager le site',
    freeFeedback: 'Écrire ce qui marche ou ce qui gêne',
    honesty:
      'Le soutien n’ouvre pas de contenu exclusif ni de cadeau — seulement un merci.',
  },
  ru: {
    title: 'Поддержать',
    description: 'Кофе на поддержку сайта — или бесплатная помощь',
    kicker: 'Support',
    headerTitle: 'Поддержать сайт',
    headerDesc:
      'Этот уголок растёт из текстов, фото и небольших инструментов. Если он полезен — поддержите как вам удобно.',
    back: 'На главную',
    whyTitle: 'Куда уходят средства',
    whyBody:
      'Домен, хостинг и аккуратная поддержка страниц. Без рекламной стены и без курсов.',
    paidTitle: 'Afdian',
    paidLead:
      'Удобны WeChat и Alipay. Нижний уровень — примерно чашка кофе; добровольно, можно отменить.',
    paidNote: 'Оплата на Afdian; этот сайт не собирает платёжные данные.',
    paidCta: 'Поддержать на Afdian',
    freeTitle: 'Бесплатно',
    freeLead: 'Это тоже помогает.',
    freeStar: 'Поставить звезду репозиторию',
    freeShare: 'Поделиться сайтом',
    freeFeedback: 'Написать, что удобно, а что мешает',
    honesty:
      'Поддержка не открывает эксклюзив и не даёт подарков — только спасибо.',
  },
};
