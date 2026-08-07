import type { Lang } from '../types';
import { getLangPath } from '../types';

export type WritingCopy = {
  title: string;
  description: string;
  intro: string;
  readMore: string;
  categories: string;
  tags: string;
  noPosts: string;
  emptyHint: string;
  backToHome: string;
  backToList: string;
  countLabel: string;
  subscribe: string;
  subscribeShort: string;
  archive: string;
  archiveTitle: string;
  archiveDescription: string;
  archiveIntro: string;
  yearLabel: string;
  postsInYear: string;
  allTags: string;
  allCategories: string;
  tagTitle: (name: string) => string;
  categoryTitle: (name: string) => string;
  tagDescription: (name: string) => string;
  categoryDescription: (name: string) => string;
  related: string;
  publishedOn: string;
  updatedOn: string;
  shareText: string;
  subscribePageTitle: string;
  subscribePageDescription: string;
  subscribeLead: string;
  subscribeRssTitle: string;
  subscribeRssBody: string;
  subscribeFeedLabel: string;
  subscribeNoAccount: string;
  subscribeEmailLater: string;
  subscribeBack: string;
  rssCta: string;
  browseBy: string;
};

export const writingCopy: Record<Lang, WritingCopy> = {
  'zh-CN': {
    title: '写作',
    description: '关于个人网站、工程学习、性能优化和设计思考的长期文章。',
    intro:
      '这里记录不会很快过期的思考：站点工程、性能与安全、摄影与光线、设计取舍，以及学生开发者如何把项目活过下一个学期。',
    readMore: '继续阅读',
    categories: '分类',
    tags: '标签',
    noPosts: '暂无文章',
    emptyHint: '这一栏还空着——可以先回写作列表看看其他篇。',
    backToHome: '返回首页',
    backToList: '返回写作',
    countLabel: '篇长文',
    subscribe: '订阅',
    subscribeShort: 'RSS',
    archive: '归档',
    archiveTitle: '按年归档',
    archiveDescription: '按年份浏览全部写作。',
    archiveIntro: '按发表年份翻阅。博客正文与订阅都在本站写作区。',
    yearLabel: '年',
    postsInYear: '篇',
    allTags: '全部标签',
    allCategories: '全部分类',
    tagTitle: (name) => `标签：${name}`,
    categoryTitle: (name) => `分类：${name}`,
    tagDescription: (name) => `带有「${name}」标签的文章。`,
    categoryDescription: (name) => `分类「${name}」下的文章。`,
    related: '相关文章',
    publishedOn: '发布于',
    updatedOn: '更新于',
    shareText: '分享',
    subscribePageTitle: '订阅写作',
    subscribePageDescription: '通过 RSS 订阅本站写作；无需注册账号。',
    subscribeLead:
      '正式阅读在本站 /writing。blog.alexander.xin 只是入口别名，会转到写作列表。',
    subscribeRssTitle: 'RSS 订阅',
    subscribeRssBody:
      '用任意 RSS 阅读器订阅对应语言的 feed。更新随静态站点发布，没有访客登录。',
    subscribeFeedLabel: '当前语言 feed',
    subscribeNoAccount: '不做访客账号，也不要求登录阅读。',
    subscribeEmailLater: '邮件订阅以后再说；眼下以 RSS 为准。',
    subscribeBack: '返回写作列表',
    rssCta: '订阅 RSS',
    browseBy: '浏览',
  },
  'zh-TW': {
    title: '寫作',
    description: '關於個人網站、工程學習、效能優化和設計思考的長期文章。',
    intro:
      '這裡記錄不會很快過期的思考：站點工程、效能與安全、攝影與光線、設計取捨，以及學生開發者如何把專案活過下一個學期。',
    readMore: '繼續閱讀',
    categories: '分類',
    tags: '標籤',
    noPosts: '暫無文章',
    emptyHint: '這一欄還空著——可以先回寫作列表看看其他篇。',
    backToHome: '返回首頁',
    backToList: '返回寫作',
    countLabel: '篇長文',
    subscribe: '訂閱',
    subscribeShort: 'RSS',
    archive: '歸檔',
    archiveTitle: '按年歸檔',
    archiveDescription: '按年份瀏覽全部寫作。',
    archiveIntro: '按發表年份翻閱。部落格正文與訂閱都在本站寫作區。',
    yearLabel: '年',
    postsInYear: '篇',
    allTags: '全部標籤',
    allCategories: '全部分類',
    tagTitle: (name) => `標籤：${name}`,
    categoryTitle: (name) => `分類：${name}`,
    tagDescription: (name) => `帶有「${name}」標籤的文章。`,
    categoryDescription: (name) => `分類「${name}」下的文章。`,
    related: '相關文章',
    publishedOn: '發布於',
    updatedOn: '更新於',
    shareText: '分享',
    subscribePageTitle: '訂閱寫作',
    subscribePageDescription: '透過 RSS 訂閱本站寫作；無需註冊帳號。',
    subscribeLead:
      '正式閱讀在本站 /writing。blog.alexander.xin 只是入口別名，會轉到寫作列表。',
    subscribeRssTitle: 'RSS 訂閱',
    subscribeRssBody:
      '用任意 RSS 閱讀器訂閱對應語言的 feed。更新隨靜態站點發布，沒有訪客登入。',
    subscribeFeedLabel: '目前語言 feed',
    subscribeNoAccount: '不做訪客帳號，也不要求登入閱讀。',
    subscribeEmailLater: '郵件訂閱以後再說；眼下以 RSS 為準。',
    subscribeBack: '返回寫作列表',
    rssCta: '訂閱 RSS',
    browseBy: '瀏覽',
  },
  'en-GB': {
    title: 'Writing',
    description:
      'Long-form articles about personal websites, engineering, performance and design.',
    intro:
      'Notes that should age slowly: site engineering, performance and security, light and photography, design trade-offs — and keeping a project alive past the next term.',
    readMore: 'Continue reading',
    categories: 'Topics',
    tags: 'Tags',
    noPosts: 'No posts yet',
    emptyHint: 'Nothing here yet — head back to the writing index.',
    backToHome: 'Back to Home',
    backToList: 'Back to Writing',
    countLabel: 'essays',
    subscribe: 'Subscribe',
    subscribeShort: 'RSS',
    archive: 'Archive',
    archiveTitle: 'Archive by year',
    archiveDescription: 'Browse all writing by year.',
    archiveIntro:
      'Flip by publication year. The blog lives in this writing section.',
    yearLabel: '',
    postsInYear: 'posts',
    allTags: 'All tags',
    allCategories: 'All topics',
    tagTitle: (name) => `Tag: ${name}`,
    categoryTitle: (name) => `Topic: ${name}`,
    tagDescription: (name) => `Posts tagged “${name}”.`,
    categoryDescription: (name) => `Posts in “${name}”.`,
    related: 'Related',
    publishedOn: 'Published',
    updatedOn: 'Updated',
    shareText: 'Share',
    subscribePageTitle: 'Subscribe',
    subscribePageDescription:
      'Follow this writing via RSS. No visitor accounts.',
    subscribeLead:
      'Canonical reading is on /writing. blog.alexander.xin is only an entry alias that redirects here.',
    subscribeRssTitle: 'RSS feeds',
    subscribeRssBody:
      'Add the feed for your language in any RSS reader. Updates ship with the static site — no login.',
    subscribeFeedLabel: 'Feed for this language',
    subscribeNoAccount: 'No visitor accounts; reading stays open.',
    subscribeEmailLater: 'Email newsletter later; RSS is the path today.',
    subscribeBack: 'Back to writing',
    rssCta: 'RSS feed',
    browseBy: 'Browse',
  },
  fr: {
    title: 'Écrits',
    description:
      "Articles sur les sites personnels, l'ingénierie et le design.",
    intro:
      'Des notes qui vieillissent lentement : ingénierie, performance, lumière et photographie, arbitrages de design.',
    readMore: 'Lire la suite',
    categories: 'Sujets',
    tags: 'Étiquettes',
    noPosts: "Pas encore d'articles",
    emptyHint: 'Rien ici pour l’instant — retournez à la liste.',
    backToHome: "Retour à l'accueil",
    backToList: 'Retour aux écrits',
    countLabel: 'essais',
    subscribe: 'S’abonner',
    subscribeShort: 'RSS',
    archive: 'Archives',
    archiveTitle: 'Archives par année',
    archiveDescription: 'Parcourir les écrits par année.',
    archiveIntro:
      'Feuilleter par année. Le blog vit dans cette section d’écrits.',
    yearLabel: '',
    postsInYear: 'articles',
    allTags: 'Toutes les étiquettes',
    allCategories: 'Tous les sujets',
    tagTitle: (name) => `Étiquette : ${name}`,
    categoryTitle: (name) => `Sujet : ${name}`,
    tagDescription: (name) => `Articles étiquetés « ${name} ».`,
    categoryDescription: (name) => `Articles dans « ${name} ».`,
    related: 'À lire aussi',
    publishedOn: 'Publié',
    updatedOn: 'Mis à jour',
    shareText: 'Partager',
    subscribePageTitle: 'S’abonner',
    subscribePageDescription:
      'Suivre les écrits via RSS. Pas de compte visiteur.',
    subscribeLead:
      'La lecture canonique est sur /writing. blog.alexander.xin n’est qu’un alias d’entrée.',
    subscribeRssTitle: 'Flux RSS',
    subscribeRssBody:
      'Ajoutez le flux de votre langue dans un lecteur RSS. Pas de connexion.',
    subscribeFeedLabel: 'Flux pour cette langue',
    subscribeNoAccount: 'Pas de compte visiteur ; lecture ouverte.',
    subscribeEmailLater: 'Newsletter plus tard ; RSS pour l’instant.',
    subscribeBack: 'Retour aux écrits',
    rssCta: 'Flux RSS',
    browseBy: 'Parcourir',
  },
  ru: {
    title: 'Статьи',
    description: 'Статьи о личных сайтах, инженерии и дизайне.',
    intro:
      'Заметки, которые стареют медленно: инженерия, производительность, свет и фотография, дизайнерские компромиссы.',
    readMore: 'Читать дальше',
    categories: 'Темы',
    tags: 'Теги',
    noPosts: 'Пока нет статей',
    emptyHint: 'Пока пусто — вернитесь к списку статей.',
    backToHome: 'На главную',
    backToList: 'К статьям',
    countLabel: 'эссе',
    subscribe: 'Подписка',
    subscribeShort: 'RSS',
    archive: 'Архив',
    archiveTitle: 'Архив по годам',
    archiveDescription: 'Статьи по годам публикации.',
    archiveIntro: 'Листайте по годам. Блог живёт в этом разделе.',
    yearLabel: '',
    postsInYear: 'записей',
    allTags: 'Все теги',
    allCategories: 'Все темы',
    tagTitle: (name) => `Тег: ${name}`,
    categoryTitle: (name) => `Тема: ${name}`,
    tagDescription: (name) => `Записи с тегом «${name}».`,
    categoryDescription: (name) => `Записи в теме «${name}».`,
    related: 'Похожие',
    publishedOn: 'Опубликовано',
    updatedOn: 'Обновлено',
    shareText: 'Поделиться',
    subscribePageTitle: 'Подписка',
    subscribePageDescription:
      'Читайте через RSS. Без учётных записей посетителей.',
    subscribeLead:
      'Каноническое чтение — /writing. blog.alexander.xin лишь вход-алиас.',
    subscribeRssTitle: 'RSS-ленты',
    subscribeRssBody:
      'Добавьте ленту своего языка в любой RSS-читатель. Без входа.',
    subscribeFeedLabel: 'Лента для этого языка',
    subscribeNoAccount: 'Без аккаунтов посетителей; чтение открыто.',
    subscribeEmailLater: 'Рассылка позже; сейчас — RSS.',
    subscribeBack: 'К списку статей',
    rssCta: 'RSS',
    browseBy: 'Обзор',
  },
};

export function writingRssPath(lang: Lang): string {
  return getLangPath(lang, '/rss.xml');
}

export function writingRssAbsolute(
  lang: Lang,
  site = 'https://alexander.xin'
): string {
  return new URL(writingRssPath(lang), site).href;
}

export const writingFeedIndex: Array<{ lang: Lang; path: string }> = [
  { lang: 'zh-CN', path: '/rss.xml' },
  { lang: 'zh-TW', path: '/zh-TW/rss.xml' },
  { lang: 'en-GB', path: '/en/rss.xml' },
  { lang: 'fr', path: '/fr/rss.xml' },
  { lang: 'ru', path: '/ru/rss.xml' },
];
