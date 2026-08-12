import type { Lang } from '../types';

interface PrivacyListItem {
  title: string;
  desc: string;
  href?: string;
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

const GOOGLE_PARTNER_DATA =
  'https://policies.google.com/technologies/partner-sites';
const GOOGLE_AD_SETTINGS = 'https://adssettings.google.com/';
const AFDIAN_PRIVACY = 'https://afdian.com/p/privacy';

export const privacyData: Record<Lang, PrivacyPageData> = {
  'zh-CN': {
    title: '隐私政策',
    back: '返回首页',
    headerTitle: '隐私政策',
    lastUpdated: '最后更新：2026年8月8日',
    sections: [
      {
        title: '1. 我们处理的信息',
        content:
          '本站无需注册账号，也不在站内处理付款。为提供页面、安全防护和用户主动使用的功能，可能处理以下有限信息：',
        list: [
          {
            title: '请求与安全日志',
            desc: '托管和安全服务可能处理 IP 地址、浏览器类型、请求时间、访问路径及安全事件。',
          },
          {
            title: '本地偏好',
            desc: '主题、快捷键提示、通知关闭状态等保存在浏览器 localStorage；音乐状态和人机验证状态可能保存在 sessionStorage。',
          },
          {
            title: '主动联系',
            desc: '联系表单只在浏览器中生成邮件，不向本站后端提交；邮件由您选择的邮件服务处理。',
          },
        ],
      },
      {
        title: '2. Cookie 与本地存储',
        content:
          '本站自身的界面偏好主要使用浏览器本地存储，而不是广告 Cookie。启用 Google AdSense 后，Google 及其广告合作伙伴可能放置或读取 Cookie，并使用 Web Beacon、IP 地址或其他设备标识来投放、限制频次、衡量和防止滥用。',
      },
      {
        title: '3. 第三方服务',
        content:
          '页面仅在功能需要时连接第三方。第三方按照各自政策处理其收到的数据。',
        list: [
          {
            title: 'Cloudflare',
            desc: '提供 CDN、安全防护和可选的无 Cookie 汇总分析，可能处理请求元数据与安全日志。',
          },
          {
            title: 'Google AdSense',
            desc: '在启用广告的内容页投放广告，并可能处理 Cookie、IP、设备和广告交互数据。',
          },
          {
            title: 'Google Fonts 与页面功能服务',
            desc: '字体、天气、汇率、二维码、诗词和音频流等功能可能向对应服务发送网络请求。',
          },
          {
            title: '爱发电',
            desc: '只有点击支持链接后才会离开本站；付款和账户数据由爱发电处理，本站不接收银行卡信息。',
            href: AFDIAN_PRIVACY,
          },
        ],
      },
      {
        title: '4. 广告同意与选择',
        content:
          '对于欧洲经济区、英国和瑞士等适用地区，本站使用 Google 认证的三按钮同意管理平台，提供“同意”“不同意”和“管理选项”。您可通过页脚的“隐私与 Cookie 设置”重新选择。拒绝个性化并不一定关闭所有广告，仍可能显示基于页面内容的受限或非个性化广告。',
        list: [
          {
            title: 'Google 如何使用合作伙伴网站的数据',
            desc: '查看 Google 对广告相关数据处理的官方说明。',
            href: GOOGLE_PARTNER_DATA,
          },
          {
            title: 'Google 广告设置',
            desc: '管理 Google 账户层面的广告个性化设置。',
            href: GOOGLE_AD_SETTINGS,
          },
        ],
      },
      {
        title: '5. 用途、保留与权利',
        content:
          '必要的请求数据用于交付页面、维护安全和排查故障；广告相关存储在适用地区依据您的选择。本地偏好保留到您清除浏览器数据；第三方日志和广告数据按其政策保留。您可以清除本地存储、调整广告选择，或联系我们查询、更正或删除本站实际持有的相关信息。',
      },
      {
        title: '6. 创收、国际传输与联系',
        content:
          '本站可能通过 AdSense、自愿赞助、商业授权或明确标注的联盟链接获得收入。商业关系不会改变编辑判断；联盟链接会在附近标注。第三方可能在您所在地区之外处理数据并采用其适用的保护机制。如有隐私问题，请发送邮件至 contact-us@alexander.xin。',
      },
    ],
  },
  'zh-TW': {
    title: '隱私權政策',
    back: '返回首頁',
    headerTitle: '隱私權政策',
    lastUpdated: '最後更新：2026年8月8日',
    sections: [
      {
        title: '1. 我們處理的資訊',
        content:
          '本站無需註冊帳號，也不在站內處理付款。為提供頁面、安全防護與使用者主動使用的功能，可能處理以下有限資訊：',
        list: [
          {
            title: '請求與安全日誌',
            desc: '託管與安全服務可能處理 IP 位址、瀏覽器類型、請求時間、存取路徑及安全事件。',
          },
          {
            title: '本機偏好',
            desc: '主題、快捷鍵提示與通知關閉狀態等存於 localStorage；音樂與真人驗證狀態可能存於 sessionStorage。',
          },
          {
            title: '主動聯絡',
            desc: '聯絡表單只在瀏覽器產生郵件，不提交至本站後端；郵件由您選擇的郵件服務處理。',
          },
        ],
      },
      {
        title: '2. Cookie 與本機儲存',
        content:
          '本站自身的介面偏好主要使用瀏覽器本機儲存，而不是廣告 Cookie。啟用 Google AdSense 後，Google 及其廣告合作夥伴可能放置或讀取 Cookie，並使用 Web Beacon、IP 位址或其他裝置識別碼進行投放、頻次控制、衡量與防止濫用。',
      },
      {
        title: '3. 第三方服務',
        content: '頁面只在功能需要時連接第三方；第三方依各自政策處理資料。',
        list: [
          {
            title: 'Cloudflare',
            desc: '提供 CDN、安全防護與可選的無 Cookie 彙總分析，可能處理請求中繼資料與安全日誌。',
          },
          {
            title: 'Google AdSense',
            desc: '在啟用廣告的內容頁投放廣告，並可能處理 Cookie、IP、裝置及廣告互動資料。',
          },
          {
            title: 'Google Fonts 與頁面功能服務',
            desc: '字型、天氣、匯率、QR Code、詩詞與音訊串流等功能可能向對應服務送出網路請求。',
          },
          {
            title: '愛發電',
            desc: '只有點擊支持連結後才會離開本站；付款與帳戶資料由愛發電處理，本站不接收銀行卡資訊。',
            href: AFDIAN_PRIVACY,
          },
        ],
      },
      {
        title: '4. 廣告同意與選擇',
        content:
          '對歐洲經濟區、英國與瑞士等適用地區，本站使用 Google 認證的三按鈕同意管理平台，提供「同意」「不同意」與「管理選項」。您可透過頁尾的「隱私與 Cookie 設定」重新選擇。拒絕個人化不一定關閉所有廣告，仍可能顯示依頁面內容投放的受限或非個人化廣告。',
        list: [
          {
            title: 'Google 如何使用合作夥伴網站的資料',
            desc: '查看 Google 對廣告相關資料處理的官方說明。',
            href: GOOGLE_PARTNER_DATA,
          },
          {
            title: 'Google 廣告設定',
            desc: '管理 Google 帳戶層級的廣告個人化設定。',
            href: GOOGLE_AD_SETTINGS,
          },
        ],
      },
      {
        title: '5. 用途、保留與權利',
        content:
          '必要的請求資料用於傳送頁面、維護安全與排查故障；廣告相關儲存在適用地區依據您的選擇。本機偏好保留至您清除瀏覽器資料；第三方日誌及廣告資料依其政策保留。您可清除本機儲存、調整廣告選擇，或聯絡我們查詢、更正或刪除本站實際持有的相關資訊。',
      },
      {
        title: '6. 創收、國際傳輸與聯絡',
        content:
          '本站可能透過 AdSense、自願贊助、商業授權或明確標示的聯盟連結獲得收入。商業關係不會改變編輯判斷；聯盟連結會在附近標示。第三方可能在您所在地區之外處理資料並採用其適用的保護機制。如有隱私問題，請寄信至 contact-us@alexander.xin。',
      },
    ],
  },
  'en-GB': {
    title: 'Privacy Policy',
    back: 'Back to Home',
    headerTitle: 'Privacy Policy',
    lastUpdated: 'Last updated: 8 August 2026',
    sections: [
      {
        title: '1. Information we process',
        content:
          'This site requires no visitor account and processes no payments on-site. To deliver pages, protect the service and provide features you choose to use, limited information may be processed:',
        list: [
          {
            title: 'Request and security logs',
            desc: 'Hosting and security providers may process IP address, browser type, request time, path and security events.',
          },
          {
            title: 'Local preferences',
            desc: 'Theme, shortcut hints and dismissed notices use localStorage; music and human-verification state may use sessionStorage.',
          },
          {
            title: 'Contact you initiate',
            desc: 'The contact form creates an email in your browser and does not submit to a site backend; your chosen mail provider handles the message.',
          },
        ],
      },
      {
        title: '2. Cookies and local storage',
        content:
          'The site interface mainly uses browser storage rather than advertising cookies. When Google AdSense is enabled, Google and its advertising partners may place or read cookies and use web beacons, IP addresses or other device identifiers for delivery, frequency control, measurement and abuse prevention.',
      },
      {
        title: '3. Third-party services',
        content:
          'Pages connect to third parties only where a feature needs them. Each provider processes received data under its own policy.',
        list: [
          {
            title: 'Cloudflare',
            desc: 'Provides CDN and security services plus optional cookie-free aggregate analytics, and may process request metadata and security logs.',
          },
          {
            title: 'Google AdSense',
            desc: 'Serves advertising on enabled content pages and may process cookies, IP, device and ad-interaction data.',
          },
          {
            title: 'Google Fonts and page feature providers',
            desc: 'Fonts, weather, exchange rates, QR codes, poetry and audio streams may make network requests to their respective providers.',
          },
          {
            title: 'Afdian',
            desc: 'You leave this site only after choosing the support link; Afdian handles payment and account data, and this site receives no card details.',
            href: AFDIAN_PRIVACY,
          },
        ],
      },
      {
        title: '4. Advertising consent and choices',
        content:
          'For visitors in the EEA, UK, Switzerland and other applicable regions, this site uses Google’s certified three-button consent management platform: Consent, Do not consent and Manage options. You can revisit your choice through “Privacy & cookie settings” in the footer. Declining personalised advertising does not necessarily remove all ads; limited or contextual ads may still appear.',
        list: [
          {
            title: 'How Google uses data on partner sites',
            desc: 'Read Google’s official explanation of advertising-related data processing.',
            href: GOOGLE_PARTNER_DATA,
          },
          {
            title: 'Google Ad Settings',
            desc: 'Manage account-level advertising personalisation.',
            href: GOOGLE_AD_SETTINGS,
          },
        ],
      },
      {
        title: '5. Purposes, retention and rights',
        content:
          'Necessary request data supports page delivery, security and troubleshooting; advertising storage in applicable regions follows your choice. Local preferences remain until you clear browser data. Providers retain logs and advertising data under their policies. You may clear local storage, change advertising choices, or contact us to request access, correction or deletion of relevant information actually held by this site.',
      },
      {
        title: '6. Monetisation, transfers and contact',
        content:
          'The site may earn through AdSense, voluntary support, commercial licensing or clearly labelled affiliate links. Commercial relationships do not determine editorial conclusions; affiliate links are labelled nearby. Providers may process data outside your region using their applicable safeguards. Privacy questions may be sent to contact-us@alexander.xin.',
      },
    ],
  },
  fr: {
    title: 'Politique de confidentialité',
    back: "Retour à l'accueil",
    headerTitle: 'Politique de confidentialité',
    lastUpdated: 'Dernière mise à jour : 8 août 2026',
    sections: [
      {
        title: '1. Informations traitées',
        content:
          'Le site ne demande aucun compte visiteur et ne traite aucun paiement sur place. Pour livrer les pages, protéger le service et fournir les fonctions choisies, des informations limitées peuvent être traitées :',
        list: [
          {
            title: 'Journaux de requête et de sécurité',
            desc: 'L’hébergement et la sécurité peuvent traiter l’adresse IP, le navigateur, l’heure, le chemin demandé et les événements de sécurité.',
          },
          {
            title: 'Préférences locales',
            desc: 'Le thème, les astuces et les avis fermés utilisent localStorage ; la musique et la vérification humaine peuvent utiliser sessionStorage.',
          },
          {
            title: 'Contact initié par vous',
            desc: 'Le formulaire crée un e-mail dans votre navigateur sans l’envoyer à un serveur du site ; votre service de messagerie traite le message.',
          },
        ],
      },
      {
        title: '2. Cookies et stockage local',
        content:
          'L’interface utilise surtout le stockage du navigateur. Lorsque Google AdSense est activé, Google et ses partenaires publicitaires peuvent placer ou lire des cookies et utiliser des balises web, adresses IP ou identifiants d’appareil pour la diffusion, la mesure, la limitation de fréquence et la prévention des abus.',
      },
      {
        title: '3. Services tiers',
        content:
          'Les pages contactent des tiers uniquement lorsqu’une fonction l’exige. Chaque fournisseur applique sa propre politique.',
        list: [
          {
            title: 'Cloudflare',
            desc: 'Fournit le CDN, la sécurité et éventuellement des statistiques agrégées sans cookie ; il peut traiter les métadonnées des requêtes et journaux de sécurité.',
          },
          {
            title: 'Google AdSense',
            desc: 'Diffuse des annonces sur les pages activées et peut traiter cookies, IP, appareil et interactions publicitaires.',
          },
          {
            title: 'Google Fonts et services fonctionnels',
            desc: 'Polices, météo, taux de change, QR codes, poésie et flux audio peuvent envoyer des requêtes à leurs fournisseurs.',
          },
          {
            title: 'Afdian',
            desc: 'Vous quittez ce site après avoir choisi le lien de soutien ; Afdian traite le paiement et le compte, sans transmettre de carte bancaire au site.',
            href: AFDIAN_PRIVACY,
          },
        ],
      },
      {
        title: '4. Consentement publicitaire',
        content:
          'Dans l’EEE, au Royaume-Uni, en Suisse et dans les régions concernées, le site utilise la CMP Google certifiée à trois choix : Consentir, Refuser et Gérer les options. Le lien « Confidentialité et cookies » du pied de page permet de modifier ce choix. Refuser la personnalisation n’exclut pas nécessairement les annonces limitées ou contextuelles.',
        list: [
          {
            title:
              'Utilisation des données par Google sur les sites partenaires',
            desc: 'Explication officielle du traitement publicitaire par Google.',
            href: GOOGLE_PARTNER_DATA,
          },
          {
            title: 'Paramètres des annonces Google',
            desc: 'Gérer la personnalisation publicitaire du compte.',
            href: GOOGLE_AD_SETTINGS,
          },
        ],
      },
      {
        title: '5. Finalités, conservation et droits',
        content:
          'Les données nécessaires servent à livrer les pages, assurer la sécurité et diagnostiquer les erreurs ; le stockage publicitaire suit votre choix lorsqu’il s’applique. Les préférences locales restent jusqu’à l’effacement du navigateur. Les fournisseurs conservent leurs données selon leurs politiques. Vous pouvez effacer le stockage local, modifier vos choix publicitaires ou demander l’accès, la correction ou la suppression des informations effectivement détenues par le site.',
      },
      {
        title: '6. Revenus, transferts et contact',
        content:
          'Le site peut être financé par AdSense, les soutiens volontaires, les licences commerciales ou des liens affiliés clairement signalés. Ces relations ne dictent pas les conclusions éditoriales. Des fournisseurs peuvent traiter des données hors de votre région avec leurs garanties applicables. Contact : contact-us@alexander.xin.',
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности',
    back: 'На главную',
    headerTitle: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление: 8 августа 2026 г.',
    sections: [
      {
        title: '1. Какие данные обрабатываются',
        content:
          'Сайт не требует учётной записи посетителя и не принимает платежи на своих страницах. Для доставки страниц, защиты сервиса и выбранных функций могут обрабатываться ограниченные данные:',
        list: [
          {
            title: 'Журналы запросов и безопасности',
            desc: 'Хостинг и защита могут обрабатывать IP-адрес, тип браузера, время, путь запроса и события безопасности.',
          },
          {
            title: 'Локальные настройки',
            desc: 'Тема, подсказки и закрытые уведомления используют localStorage; музыка и проверка человека могут использовать sessionStorage.',
          },
          {
            title: 'Инициированный вами контакт',
            desc: 'Форма создаёт письмо в браузере и не отправляет его на сервер сайта; сообщение обрабатывает выбранная вами почтовая служба.',
          },
        ],
      },
      {
        title: '2. Cookie и локальное хранилище',
        content:
          'Интерфейс в основном использует хранилище браузера. Когда включён Google AdSense, Google и рекламные партнёры могут размещать или читать cookie и использовать веб-маяки, IP-адреса или идентификаторы устройств для показа, ограничения частоты, измерения и предотвращения злоупотреблений.',
      },
      {
        title: '3. Сторонние сервисы',
        content:
          'Страницы обращаются к третьим сторонам только для необходимых функций. Каждый поставщик применяет собственную политику.',
        list: [
          {
            title: 'Cloudflare',
            desc: 'Предоставляет CDN, защиту и опциональную агрегированную аналитику без cookie; может обрабатывать метаданные запросов и журналы безопасности.',
          },
          {
            title: 'Google AdSense',
            desc: 'Показывает рекламу на включённых страницах и может обрабатывать cookie, IP, устройство и взаимодействия с рекламой.',
          },
          {
            title: 'Google Fonts и поставщики функций',
            desc: 'Шрифты, погода, курсы валют, QR-коды, поэзия и аудиопотоки могут отправлять запросы соответствующим поставщикам.',
          },
          {
            title: 'Afdian',
            desc: 'После выбора ссылки поддержки вы покидаете сайт; Afdian обрабатывает платёж и аккаунт, а сайт не получает данные карты.',
            href: AFDIAN_PRIVACY,
          },
        ],
      },
      {
        title: '4. Согласие на рекламу',
        content:
          'Для ЕЭЗ, Великобритании, Швейцарии и других применимых регионов используется сертифицированная Google CMP с тремя вариантами: согласие, отказ и управление настройками. Ссылку для повторного выбора можно найти в подвале. Отказ от персонализации не обязательно убирает ограниченную или контекстную рекламу.',
        list: [
          {
            title: 'Как Google использует данные на сайтах партнёров',
            desc: 'Официальное описание обработки рекламных данных.',
            href: GOOGLE_PARTNER_DATA,
          },
          {
            title: 'Настройки рекламы Google',
            desc: 'Управление персонализацией рекламы аккаунта.',
            href: GOOGLE_AD_SETTINGS,
          },
        ],
      },
      {
        title: '5. Цели, хранение и права',
        content:
          'Необходимые данные используются для доставки страниц, безопасности и диагностики; рекламное хранение в применимых регионах следует вашему выбору. Локальные настройки остаются до очистки браузера. Поставщики хранят журналы и рекламные данные по своим политикам. Вы можете очистить локальное хранилище, изменить рекламные настройки или запросить доступ, исправление либо удаление информации, которой фактически располагает сайт.',
      },
      {
        title: '6. Монетизация, передача и контакт',
        content:
          'Сайт может получать доход от AdSense, добровольной поддержки, коммерческих лицензий или явно отмеченных партнёрских ссылок. Коммерческие отношения не определяют редакционные выводы. Поставщики могут обрабатывать данные за пределами вашего региона с применимыми мерами защиты. Контакт: contact-us@alexander.xin.',
      },
    ],
  },
};

export default privacyData;
