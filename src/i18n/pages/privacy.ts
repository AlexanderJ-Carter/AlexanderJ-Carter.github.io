import type { Lang } from '../types';

interface PrivacyListItem {
  title: string;
  desc: string;
}

interface PrivacySection {
  title: string;
  content: string;
  list?: PrivacyListItem[];
}

interface PrivacyPageData {
  title: string;
  back: string;
  headerTitle: string;
  lastUpdated: string;
  sections: PrivacySection[];
}

export const privacyData: Record<Lang, PrivacyPageData> = {
  'zh-CN': {
    title: '隐私政策',
    back: '返回首页',
    headerTitle: '隐私政策',
    lastUpdated: '最后更新：2026年6月1日',
    sections: [
      {
        title: '1. 信息收集',
        content: '本网站致力于保护您的隐私。我们收集的信息类型包括:',
        list: [
          {
            title: '访问数据',
            desc: '我们可能会收集您的浏览器类型、IP地址、访问时间和浏览的页面',
          },
          {
            title: 'Cookie',
            desc: '我们使用Cookie来改善您的浏览体验,如记住您的主题偏好和语言选择',
          },
          {
            title: '本地存储',
            desc: '某些设置(如主题和语言偏好)会保存在您的浏览器本地存储中',
          },
        ],
      },
      {
        title: '2. 信息使用',
        content: '收集的信息仅用于:',
        list: [
          { title: '网站优化', desc: '分析访问数据以改进网站性能和用户体验' },
          { title: '个性化', desc: '保存您的偏好设置' },
          { title: '安全', desc: '检测和防止恶意访问' },
        ],
      },
      {
        title: '3. 第三方服务',
        content: '本网站使用以下第三方服务:',
        list: [
          {
            title: 'Cloudflare Web Analytics',
            desc: '用于网站流量分析。该服务不使用 Cookie，不收集个人身份信息，符合隐私友好原则',
          },
          {
            title: 'Cloudflare CDN',
            desc: '用于全球加速和安全防护（DDoS 防护、SSL 加密）',
          },
          {
            title: 'Google AdSense',
            desc: '用于展示广告。Google 可能会使用 Cookie 和类似技术来展示基于您过往访问本站或其他网站的个性化广告。您可以通过 Google 广告设置管理您的广告偏好',
          },
        ],
      },
      {
        title: '4. 广告与 Cookie',
        content:
          '本网站部分页面可能展示由 Google AdSense 提供的广告。这些广告可能使用 Cookie 来根据用户的访问历史提供个性化内容。您可以选择停用个性化广告，方法如下：',
        list: [
          {
            title: 'Google 广告设置',
            desc: '访问 https://adssettings.google.com 管理您的广告个性化偏好',
          },
          {
            title: '网络广告倡议（NAI）',
            desc: '访问 https://optout.networkadvertising.org 选择退出参与公司的个性化广告',
          },
          {
            title: '浏览器设置',
            desc: '在浏览器设置中禁用第三方 Cookie 或使用广告拦截器',
          },
        ],
      },
      {
        title: '5. 联系方式',
        content:
          '如果您对本隐私政策有任何疑问，请通过联系页面与我联系。本政策最后更新于 2026 年 6 月 1 日。',
      },
      {
        title: '6. 第三方与商标说明',
        content:
          '上述第三方服务各有其隐私政策与条款，本网站不控制其数据收集与处理行为，请参阅各服务提供方的官方说明。本网站提及的产品或服务名称（如 Google、Cloudflare 等）可能为各自权利人的商标或注册商标，仅用于说明用途，不构成授权或背书。',
      },
    ],
  },
  'zh-TW': {
    title: '隱私權政策',
    back: '返回首頁',
    headerTitle: '隱私權政策',
    lastUpdated: '最後更新：2026年6月1日',
    sections: [
      {
        title: '1. 資訊收集',
        content: '本網站致力於保護您的隱私。我們收集的資訊類型包括:',
        list: [
          {
            title: '訪問數據',
            desc: '我們可能會收集您的瀏覽器類型、IP位址、訪問時間和瀏覽的頁面',
          },
          {
            title: 'Cookie',
            desc: '我們使用Cookie來改善您的瀏覽體驗,如記住您的主題偏好和語言選擇',
          },
          {
            title: '本地存儲',
            desc: '某些設置(如主題和語言偏好)會保存在您的瀏覽器本地存儲中',
          },
        ],
      },
      {
        title: '2. 資訊使用',
        content: '收集的資訊僅用於:',
        list: [
          { title: '網站優化', desc: '分析訪問數據以改進網站性能和用戶體驗' },
          { title: '個性化', desc: '保存您的偏好設置' },
          { title: '安全', desc: '檢測和防止惡意訪問' },
        ],
      },
      {
        title: '3. 第三方服務',
        content: '本網站使用以下第三方服務:',
        list: [
          {
            title: 'Cloudflare Web Analytics',
            desc: '用於網站流量分析。該服務不使用 Cookie，不收集個人身份資訊，符合隱私友好原則',
          },
          {
            title: 'Cloudflare CDN',
            desc: '用於全球加速和安全防護（DDoS 防護、SSL 加密）',
          },
          {
            title: 'Google AdSense',
            desc: '用於展示廣告。Google 可能會使用 Cookie 和類似技術來展示基於您過往訪問本站或其他網站的個人化廣告。您可以透過 Google 廣告設定管理您的廣告偏好',
          },
        ],
      },
      {
        title: '4. 廣告與 Cookie',
        content:
          '本網站部分頁面可能展示由 Google AdSense 提供的廣告。這些廣告可能使用 Cookie 來根據用戶的訪問歷史提供個人化內容。您可以選擇停用個人化廣告，方法如下：',
        list: [
          {
            title: 'Google 廣告設定',
            desc: '訪問 https://adssettings.google.com 管理您的廣告個人化偏好',
          },
          {
            title: '網絡廣告倡議（NAI）',
            desc: '訪問 https://optout.networkadvertising.org 選擇退出參與公司的個人化廣告',
          },
          {
            title: '瀏覽器設定',
            desc: '在瀏覽器設定中禁用第三方 Cookie 或使用廣告攔截器',
          },
        ],
      },
      {
        title: '5. 聯絡方式',
        content:
          '如果您對本隱私權政策有任何疑問，請透過聯絡頁面與我聯繫。本政策最後更新於 2026 年 6 月 1 日。',
      },
      {
        title: '6. 第三方與商標說明',
        content:
          '上述第三方服務各有其隱私政策與條款，本網站不控制其資料收集與處理行為，請參閱各服務提供方的官方說明。本網站提及的產品或服務名稱（如 Google、Cloudflare 等）可能為各自權利人的商標或註冊商標，僅用於說明用途，不構成授權或背書。',
      },
    ],
  },
  'en-GB': {
    title: 'Privacy Policy',
    back: 'Back to Home',
    headerTitle: 'Privacy Policy',
    lastUpdated: 'Last Updated: 1 June 2026',
    sections: [
      {
        title: '1. Information Collection',
        content:
          'This website is committed to protecting your privacy. The types of information we collect include:',
        list: [
          {
            title: 'Access Data',
            desc: 'We may collect your browser type, IP address, access times, and pages viewed',
          },
          {
            title: 'Cookies',
            desc: 'We use Cookies to improve your browsing experience, such as remembering your theme preference and language selection',
          },
          {
            title: 'Local Storage',
            desc: "Certain settings (such as theme and language preferences) are saved in your browser's local storage",
          },
        ],
      },
      {
        title: '2. Information Usage',
        content: 'The collected information is used only for:',
        list: [
          {
            title: 'Website Optimisation',
            desc: 'Analysing access data to improve website performance and user experience',
          },
          { title: 'Personalisation', desc: 'Saving your preference settings' },
          {
            title: 'Security',
            desc: 'Detecting and preventing malicious access',
          },
        ],
      },
      {
        title: '3. Third-Party Services',
        content: 'This website uses the following third-party services:',
        list: [
          {
            title: 'Cloudflare Web Analytics',
            desc: 'For website traffic analysis. This service does not use cookies and does not collect personally identifiable information',
          },
          {
            title: 'Cloudflare CDN',
            desc: 'For global acceleration and security protection (DDoS protection, SSL encryption)',
          },
          {
            title: 'Google AdSense',
            desc: 'For displaying advertisements. Google may use cookies and similar technologies to show personalised ads based on your past visits to this site or other websites. You can manage your ad preferences through Google Ad Settings',
          },
        ],
      },
      {
        title: '4. Advertising & Cookies',
        content:
          'Some pages on this website may display advertisements provided by Google AdSense. These advertisements may use cookies to deliver personalised content based on your browsing history. You can opt out of personalised advertising by:',
        list: [
          {
            title: 'Google Ad Settings',
            desc: 'Visit https://adssettings.google.com to manage your ad personalisation preferences',
          },
          {
            title: 'Network Advertising Initiative (NAI)',
            desc: 'Visit https://optout.networkadvertising.org to opt out of personalised ads from participating companies',
          },
          {
            title: 'Browser Settings',
            desc: 'Disable third-party cookies in your browser settings or use an ad blocker',
          },
        ],
      },
      {
        title: '5. Contact Information',
        content:
          'If you have any questions about this privacy policy, please contact me via the contact page. This policy was last updated on 1 June 2026.',
      },
      {
        title: '6. Third-Party and Trademark Notice',
        content:
          "The above third-party services have their own privacy policies and terms; this website does not control their data practices. Please refer to each provider's official documentation. Product or service names mentioned (e.g. Google, Cloudflare) may be trademarks or registered trademarks of their respective owners; use here is for reference only and does not imply endorsement.",
      },
    ],
  },
  fr: {
    title: 'Politique de Confidentialité',
    back: "Retour à l'accueil",
    headerTitle: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : 1 juin 2026',
    sections: [
      {
        title: "1. Collecte d'informations",
        content:
          "Ce site web s'engage à protéger votre vie privée. Les types d'informations que nous recueillons comprennent :",
        list: [
          {
            title: "Données d'accès",
            desc: "Nous pouvons collecter votre type de navigateur, votre adresse IP, les heures d'accès et les pages consultées",
          },
          {
            title: 'Cookies',
            desc: 'Nous utilisons des cookies pour améliorer votre expérience de navigation, comme la mémorisation de vos préférences de thème et de langue',
          },
          {
            title: 'Stockage local',
            desc: 'Certains paramètres (tels que les préférences de thème et de langue) sont enregistrés dans le stockage local de votre navigateur',
          },
        ],
      },
      {
        title: '2. Utilisation des informations',
        content: 'Les informations collectées sont utilisées uniquement pour :',
        list: [
          {
            title: 'Optimisation du site web',
            desc: "Analyser les données d'accès pour améliorer les performances du site web et l'expérience utilisateur",
          },
          {
            title: 'Personnalisation',
            desc: 'Enregistrer vos paramètres de préférence',
          },
          {
            title: 'Sécurité',
            desc: 'Détecter et prévenir les accès malveillants',
          },
        ],
      },
      {
        title: '3. Services tiers',
        content: 'Ce site web utilise les services tiers suivants :',
        list: [
          {
            title: 'Cloudflare Web Analytics',
            desc: "Pour l'analyse du trafic du site web. Ce service n'utilise pas de cookies et ne collecte pas d'informations personnellement identifiables",
          },
          {
            title: 'Cloudflare CDN',
            desc: "Pour l'accélération mondiale et la protection de sécurité (protection DDoS, cryptage SSL)",
          },
          {
            title: 'Google AdSense',
            desc: "Pour l'affichage de publicités. Google peut utiliser des cookies et des technologies similaires pour afficher des publicités personnalisées basées sur vos visites passées sur ce site ou d'autres sites web",
          },
        ],
      },
      {
        title: '4. Publicité et Cookies',
        content:
          'Certaines pages de ce site web peuvent afficher des publicités fournies par Google AdSense. Ces publicités peuvent utiliser des cookies pour diffuser du contenu personnalisé basé sur votre historique de navigation. Vous pouvez désactiver la publicité personnalisée en :',
        list: [
          {
            title: 'Paramètres de publicité Google',
            desc: 'Visitez https://adssettings.google.com pour gérer vos préférences de personnalisation des annonces',
          },
          {
            title: 'Network Advertising Initiative (NAI)',
            desc: 'Visitez https://optout.networkadvertising.org pour refuser les publicités personnalisées des entreprises participantes',
          },
          {
            title: 'Paramètres du navigateur',
            desc: 'Désactivez les cookies tiers dans les paramètres de votre navigateur ou utilisez un bloqueur de publicités',
          },
        ],
      },
      {
        title: '5. Coordonnées',
        content:
          'Si vous avez des questions concernant cette politique de confidentialité, veuillez me contacter via la page de contact. Dernière mise à jour : 1 juin 2026.',
      },
      {
        title: '6. Services tiers et marques',
        content:
          "Les services tiers mentionnés ci-dessus ont leurs propres politiques de confidentialité et conditions ; ce site ne contrôle pas leurs pratiques en matière de données. Veuillez consulter la documentation officielle de chaque fournisseur. Les noms de produits ou de services mentionnés (ex. Google, Cloudflare) peuvent être des marques déposées de leurs propriétaires respectifs ; leur utilisation ici est à titre de référence uniquement et n'implique aucune approbation.",
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности',
    back: 'На главную',
    headerTitle: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление: 1 июня 2026 г.',
    sections: [
      {
        title: '1. Сбор информации',
        content:
          'Этот веб-сайт обязуется защищать вашу конфиденциальность. Типы информации, которую мы собираем, включают:',
        list: [
          {
            title: 'Данные доступа',
            desc: 'Мы можем собирать тип вашего браузера, IP-адрес, время доступа и просмотренные страницы',
          },
          {
            title: 'Cookies',
            desc: 'Мы используем файлы cookie для улучшения вашего опыта просмотра, например, для запоминания ваших предпочтений темы и выбора языка',
          },
          {
            title: 'Локальное хранилище',
            desc: 'Некоторые настройки (такие как предпочтения темы и языка) сохраняются в локальном хранилище вашего браузера',
          },
        ],
      },
      {
        title: '2. Использование информации',
        content: 'Собранная информация используется только для:',
        list: [
          {
            title: 'Оптимизация веб-сайта',
            desc: 'Анализ данных доступа для улучшения производительности веб-сайта и пользовательского опыта',
          },
          {
            title: 'Персонализация',
            desc: 'Сохранение ваших настроек предпочтений',
          },
          {
            title: 'Безопасность',
            desc: 'Обнаружение и предотвращение вредоносного доступа',
          },
        ],
      },
      {
        title: '3. Сторонние сервисы',
        content: 'Этот веб-сайт использует следующие сторонние сервисы:',
        list: [
          {
            title: 'Cloudflare Web Analytics',
            desc: 'Для анализа трафика веб-сайта. Этот сервис не использует файлы cookie и не собирает личную информацию',
          },
          {
            title: 'Cloudflare CDN',
            desc: 'Для глобального ускорения и защиты безопасности (защита от DDoS, шифрование SSL)',
          },
          {
            title: 'Google AdSense',
            desc: 'Для отображения рекламы. Google может использовать файлы cookie и аналогичные технологии для показа персонализированной рекламы на основе ваших предыдущих посещений этого или других сайтов',
          },
        ],
      },
      {
        title: '4. Реклама и файлы cookie',
        content:
          'Некоторые страницы этого сайта могут отображать рекламу, предоставляемую Google AdSense. Эта реклама может использовать файлы cookie для доставки персонализированного контента на основе вашей истории посещений. Вы можете отказаться от персонализированной рекламы:',
        list: [
          {
            title: 'Настройки рекламы Google',
            desc: 'Посетите https://adssettings.google.com для управления настройками персонализации рекламы',
          },
          {
            title: 'Network Advertising Initiative (NAI)',
            desc: 'Посетите https://optout.networkadvertising.org, чтобы отказаться от персонализированной рекламы от участвующих компаний',
          },
          {
            title: 'Настройки браузера',
            desc: 'Отключите сторонние файлы cookie в настройках браузера или используйте блокировщик рекламы',
          },
        ],
      },
      {
        title: '5. Контактная информация',
        content:
          'Если у вас есть какие-либо вопросы по поводу этой политики конфиденциальности, пожалуйста, свяжитесь со мной через страницу контактов. Последнее обновление: 1 июня 2026 г.',
      },
      {
        title: '6. Сторонние сервисы и товарные знаки',
        content:
          'Указанные сторонние сервисы имеют собственные политики конфиденциальности и условия; данный веб-сайт не контролирует их практику обработки данных. Обращайтесь к официальной документации каждого поставщика. Упоминаемые названия продуктов или сервисов (напр. Google, Cloudflare) могут быть товарными знаками их соответствующих владельцев; использование здесь только в справочных целях и не подразумевает одобрения.',
      },
    ],
  },
};

export default privacyData;
