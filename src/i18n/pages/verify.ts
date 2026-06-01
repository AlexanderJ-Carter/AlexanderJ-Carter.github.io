import type { Lang } from '../types';

export const verifyData: Record<Lang, any> = {
  'zh-CN': {
    title: '安全验证',
    headerTitle: '🔐 安全验证',
    headerDesc: '请完成以下验证以访问受保护的内容',
    verifying: '正在验证您的访问权限...',
    verifyDesc: '请稍候，我们正在确认您的身份。这通常只需要几秒钟。',
    manualVerify: '如果验证没有自动开始，请点击下方按钮：',
    verifyButton: '开始验证',
    helpTitle: '为什么需要验证？',
    helpDesc:
      '为了保护网站内容的安全，防止恶意爬虫和攻击，我们需要确认您是真实用户。感谢您的理解与配合。',
    footer: '安全验证由 Cloudflare Turnstile 提供支持',
  },
  'zh-TW': {
    title: '安全驗證',
    headerTitle: '🔐 安全驗證',
    headerDesc: '請完成以下驗證以存取受保護的內容',
    verifying: '正在驗證您的存取權限...',
    verifyDesc: '請稍候，我們正在確認您的身分。這通常只需要幾秒鐘。',
    manualVerify: '如果驗證沒有自動開始，請點擊下方按鈕：',
    verifyButton: '開始驗證',
    helpTitle: '為什麼需要驗證？',
    helpDesc:
      '為了保護網站內容的安全，防止惡意爬蟲和攻擊，我們需要確認您是真實用戶。感謝您的理解與配合。',
    footer: '安全驗證由 Cloudflare Turnstile 提供支援',
  },
  'en-GB': {
    title: 'Security Verification',
    headerTitle: '🔐 Security Verification',
    headerDesc:
      'Please complete the verification below to access protected content',
    verifying: 'Verifying your access...',
    verifyDesc:
      'Please wait while we confirm your identity. This usually takes just a few seconds.',
    manualVerify:
      'If verification does not start automatically, please click the button below:',
    verifyButton: 'Start Verification',
    helpTitle: 'Why is verification needed?',
    helpDesc:
      'To protect website content and prevent malicious crawlers and attacks, we need to confirm you are a real user. Thank you for your understanding and cooperation.',
    footer: 'Security verification powered by Cloudflare Turnstile',
  },
  fr: {
    title: 'Vérification de sécurité',
    headerTitle: '🔐 Vérification de sécurité',
    headerDesc:
      'Veuillez compléter la vérification ci-dessous pour accéder au contenu protégé',
    verifying: 'Vérification de votre accès...',
    verifyDesc:
      'Veuillez patienter pendant que nous confirmons votre identité. Cela ne prend généralement que quelques secondes.',
    manualVerify:
      'Si la vérification ne démarre pas automatiquement, veuillez cliquer sur le bouton ci-dessous :',
    verifyButton: 'Démarrer la vérification',
    helpTitle: 'Pourquoi la vérification est-elle nécessaire ?',
    helpDesc:
      'Pour protéger le contenu du site web et empêcher les robots malveillants et les attaques, nous devons confirmer que vous êtes un utilisateur réel. Merci de votre compréhension et de votre coopération.',
    footer: 'Vérification de sécurité propulsée par Cloudflare Turnstile',
  },
  ru: {
    title: 'Проверка безопасности',
    headerTitle: '🔐 Проверка безопасности',
    headerDesc:
      'Пожалуйста, пройдите проверку ниже, чтобы получить доступ к защищенному контенту',
    verifying: 'Проверка вашего доступа...',
    verifyDesc:
      'Пожалуйста, подождите, пока мы подтвердим вашу личность. Обычно это занимает всего несколько секунд.',
    manualVerify:
      'Если проверка не начинается автоматически, нажмите кнопку ниже:',
    verifyButton: 'Начать проверку',
    helpTitle: 'Зачем нужна проверка?',
    helpDesc:
      'Для защиты контента сайта и предотвращения вредоносных сканеров и атак нам необходимо подтвердить, что вы реальный пользователь. Спасибо за понимание и сотрудничество.',
    footer: 'Проверка безопасности при поддержке Cloudflare Turnstile',
  },
};

