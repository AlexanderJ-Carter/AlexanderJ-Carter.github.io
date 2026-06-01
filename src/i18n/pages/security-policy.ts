import type { Lang } from '../types';

export const securityPolicyData: Record<Lang, any> = {
  'zh-CN': {
    title: '安全政策',
    description: '网站安全漏洞披露政策和报告指南',
    lastUpdated: '2026年3月19日',
    headerDesc: '我们重视网站安全，欢迎安全研究者负责任地报告发现的安全漏洞',
    lastUpdatedLabel: '最后更新日期：',
    sidebarTitle: '政策目录',
    nav: {
      overview: '1. 政策概述',
      scope: '2. 适用范围',
      guidelines: '3. 报告指南',
      process: '4. 处理流程',
      legal: '5. 法律保护',
      restrictions: '6. 测试限制',
      contact: '7. 联系方式',
    },
    sections: {
      overview: {
        title: '政策概述',
        content:
          '我们致力于保护用户数据和网站安全。如果您发现了我们网站的安全漏洞，我们鼓励您通过负责任的方式向我们披露，以便我们能够及时修复问题。',
        commitmentTitle: '我们承诺',
        commitments: [
          '认真对待每一个安全报告',
          '在收到报告后24小时内确认回复',
          '保护报告者的身份和提供的信息',
          '在修复后公开感谢贡献者（如您同意）',
        ],
      },
      scope: {
        title: '适用范围',
        content: '本政策适用于以下域名和服务：',
        domains: [
          { label: '主域名：', value: 'alexander.xin' },
          { label: '子域名：', value: '*.alexander.xin' },
          { label: 'GitHub Pages：', value: 'alexanderj-carter.github.io' },
        ],
        excludeTitle: '不包括',
        excludes: [
          '第三方服务和外部链接',
          '社交媒体账户',
          '其他不属于我们直接控制的服务',
        ],
      },
      guidelines: {
        title: '报告指南',
        content: '为了帮助我们快速理解和修复问题，请在报告中包含以下信息：',
        basicInfoTitle: '基本信息',
        basicInfo: [
          '漏洞类型和严重程度评估',
          '受影响的URL或功能',
          '详细的重现步骤',
          '潜在的影响描述',
        ],
        techDetailsTitle: '技术细节',
        techDetails: [
          '请求和响应示例',
          '截图或视频演示',
          '使用的工具和技术',
          '建议的修复方案（可选）',
        ],
      },
      process: {
        title: '处理流程',
        steps: [
          { step: 1, title: '报告接收', desc: '24小时内确认收到报告' },
          { step: 2, title: '初步评估', desc: '3-5天内完成初步分析' },
          { step: 3, title: '漏洞修复', desc: '根据严重程度制定修复计划' },
          { step: 4, title: '公开致谢', desc: '修复完成后更新致谢页面' },
        ],
      },
      legal: {
        title: '法律保护',
        content: '对于遵循本政策的安全研究活动，我们承诺：',
        commitments: [
          '不会对研究者采取法律行动',
          '不会向执法部门报告研究活动',
          '与研究者合作解决发现的问题',
        ],
        note: '研究者必须遵循负责任的披露原则，不恶意利用漏洞，不访问或修改他人数据。',
      },
      restrictions: {
        title: '测试限制',
        allowedTitle: '允许的测试',
        allowed: [
          '自动化漏洞扫描（合理频率）',
          '手动安全测试',
          '社会工程学测试（仅限技术层面）',
        ],
        forbiddenTitle: '禁止的行为',
        forbidden: [
          '拒绝服务攻击（DoS/DDoS）',
          '访问、修改或删除他人数据',
          '恶意破坏网站功能',
          '进行物理攻击或社会工程',
          '公开披露未修复的漏洞',
        ],
      },
      contact: {
        title: '联系方式',
        mainContactTitle: '主要联系方式',
        emailLabel: '邮箱：',
        backupEmailLabel: '备用邮箱：',
        encryptedContactTitle: '加密通信',
        pgpKeyLabel: 'PGP密钥：',
        downloadKey: '下载公钥',
        keyStatusLabel: '密钥状态：',
        keyStatus: '永不过期',
        preferredLangLabel: '首选语言：',
        preferredLang: '中文、英文',
        note: '对于敏感漏洞，建议使用PGP加密邮件。我们会在收到报告后优先处理高危漏洞。',
      },
    },
  },
  'zh-TW': {
    title: '安全政策',
    description: '網站安全漏洞披露政策和報告指南',
    lastUpdated: '2026年3月19日',
    headerDesc: '我們重視網站安全，歡迎安全研究者負責任地報告發現的安全漏洞',
    lastUpdatedLabel: '最後更新日期：',
    sidebarTitle: '政策目錄',
    nav: {
      overview: '1. 政策概述',
      scope: '2. 適用範圍',
      guidelines: '3. 報告指南',
      process: '4. 處理流程',
      legal: '5. 法律保護',
      restrictions: '6. 測試限制',
      contact: '7. 聯絡方式',
    },
    sections: {
      overview: {
        title: '政策概述',
        content:
          '我們致力於保護用戶數據和網站安全。如果您發現了我們網站的安全漏洞，我們鼓勵您通過負責任的方式向我們披露，以便我們能夠及時修復問題。',
        commitmentTitle: '我們承諾',
        commitments: [
          '認真對待每一個安全報告',
          '在收到報告後24小時內確認回覆',
          '保護報告者的身份和提供的資訊',
          '在修復後公開感謝貢獻者（如您同意）',
        ],
      },
      scope: {
        title: '適用範圍',
        content: '本政策適用於以下域名和服務：',
        domains: [
          { label: '主域名：', value: 'alexander.xin' },
          { label: '子域名：', value: '*.alexander.xin' },
          { label: 'GitHub Pages：', value: 'alexanderj-carter.github.io' },
        ],
        excludeTitle: '不包括',
        excludes: [
          '第三方服務和外部連結',
          '社交媒體帳戶',
          '其他不屬於我們直接控制的服務',
        ],
      },
      guidelines: {
        title: '報告指南',
        content: '為了幫助我們快速理解和修復問題，請在報告中包含以下資訊：',
        basicInfoTitle: '基本資訊',
        basicInfo: [
          '漏洞類型和嚴重程度評估',
          '受影響的URL或功能',
          '詳細的重現步驟',
          '潛在的影響描述',
        ],
        techDetailsTitle: '技術細節',
        techDetails: [
          '請求和響應示例',
          '截圖或視頻演示',
          '使用的工具和技術',
          '建議的修復方案（可選）',
        ],
      },
      process: {
        title: '處理流程',
        steps: [
          { step: 1, title: '報告接收', desc: '24小時內確認收到報告' },
          { step: 2, title: '初步評估', desc: '3-5天內完成初步分析' },
          { step: 3, title: '漏洞修復', desc: '根據嚴重程度制定修復計劃' },
          { step: 4, title: '公開致謝', desc: '修復完成後更新致謝頁面' },
        ],
      },
      legal: {
        title: '法律保護',
        content: '對於遵循本政策的安全研究活動，我們承諾：',
        commitments: [
          '不會對研究者採取法律行動',
          '不會向執法部門報告研究活動',
          '與研究者合作解決發現的問題',
        ],
        note: '研究者必須遵循負責任的披露原則，不惡意利用漏洞，不訪問或修改他人數據。',
      },
      restrictions: {
        title: '測試限制',
        allowedTitle: '允許的測試',
        allowed: [
          '自動化漏洞掃描（合理頻率）',
          '手動安全測試',
          '社會工程學測試（僅限技術層面）',
        ],
        forbiddenTitle: '禁止的行為',
        forbidden: [
          '拒絕服務攻擊（DoS/DDoS）',
          '訪問、修改或刪除他人數據',
          '惡意破壞網站功能',
          '進行物理攻擊或社會工程',
          '公開披露未修復的漏洞',
        ],
      },
      contact: {
        title: '聯絡方式',
        mainContactTitle: '主要聯絡方式',
        emailLabel: '郵箱：',
        backupEmailLabel: '備用郵箱：',
        encryptedContactTitle: '加密通信',
        pgpKeyLabel: 'PGP密鑰：',
        downloadKey: '下載公鑰',
        keyStatusLabel: '密鑰狀態：',
        keyStatus: '永不過期',
        preferredLangLabel: '首選語言：',
        preferredLang: '中文、英文',
        note: '對於敏感漏洞，建議使用PGP加密郵件。我們會在收到報告後優先處理高危漏洞。',
      },
    },
  },
  'en-GB': {
    title: 'Security Policy',
    description:
      'Website Security Vulnerability Disclosure Policy and Reporting Guidelines',
    lastUpdated: 'March 19, 2026',
    headerDesc:
      'We value website security and welcome security researchers to responsibly report discovered security vulnerabilities.',
    lastUpdatedLabel: 'Last Updated: ',
    sidebarTitle: 'Policy Contents',
    nav: {
      overview: '1. Overview',
      scope: '2. Scope',
      guidelines: '3. Guidelines',
      process: '4. Process',
      legal: '5. Legal',
      restrictions: '6. Restrictions',
      contact: '7. Contact',
    },
    sections: {
      overview: {
        title: 'Overview',
        content:
          'We are committed to protecting user data and website security. If you discover a security vulnerability on our website, we encourage you to disclose it to us responsibly so that we can fix the issue promptly.',
        commitmentTitle: 'Our Commitment',
        commitments: [
          'Take every security report seriously',
          'Acknowledge receipt within 24 hours',
          'Protect the identity of the reporter and the information provided',
          'Publicly thank contributors after the fix (with your consent)',
        ],
      },
      scope: {
        title: 'Scope',
        content: 'This policy applies to the following domains and services:',
        domains: [
          { label: 'Main Domain:', value: 'alexander.xin' },
          { label: 'Subdomains:', value: '*.alexander.xin' },
          { label: 'GitHub Pages:', value: 'alexanderj-carter.github.io' },
        ],
        excludeTitle: 'Exclusions',
        excludes: [
          'Third-party services and external links',
          'Social media accounts',
          'Other services not directly controlled by us',
        ],
      },
      guidelines: {
        title: 'Reporting Guidelines',
        content:
          'To help us quickly understand and fix the issue, please include the following information in your report:',
        basicInfoTitle: 'Basic Information',
        basicInfo: [
          'Vulnerability type and severity assessment',
          'Affected URL or function',
          'Detailed reproduction steps',
          'Potential impact description',
        ],
        techDetailsTitle: 'Technical Details',
        techDetails: [
          'Request and response examples',
          'Screenshots or video demonstration',
          'Tools and technologies used',
          'Suggested fix (optional)',
        ],
      },
      process: {
        title: 'Handling Process',
        steps: [
          {
            step: 1,
            title: 'Report Receipt',
            desc: 'Acknowledge receipt within 24 hours',
          },
          {
            step: 2,
            title: 'Initial Assessment',
            desc: 'Complete initial analysis within 3-5 days',
          },
          {
            step: 3,
            title: 'Vulnerability Fix',
            desc: 'Develop a fix plan based on severity',
          },
          {
            step: 4,
            title: 'Public Acknowledgement',
            desc: 'Update acknowledgement page after fix',
          },
        ],
      },
      legal: {
        title: 'Legal Protection',
        content:
          'For security research activities following this policy, we commit to:',
        commitments: [
          'Not taking legal action against researchers',
          'Not reporting research activities to law enforcement',
          'Working with researchers to resolve discovered issues',
        ],
        note: 'Researchers must follow responsible disclosure principles, not maliciously exploit vulnerabilities, and not access or modify others data.',
      },
      restrictions: {
        title: 'Testing Restrictions',
        allowedTitle: 'Allowed Testing',
        allowed: [
          'Automated vulnerability scanning (reasonable frequency)',
          'Manual security testing',
          'Social engineering testing (technical level only)',
        ],
        forbiddenTitle: 'Forbidden Actions',
        forbidden: [
          'Denial of Service attacks (DoS/DDoS)',
          'Accessing, modifying, or deleting others data',
          'Maliciously destroying website functionality',
          'Physical attacks or social engineering',
          'Publicly disclosing unpatched vulnerabilities',
        ],
      },
      contact: {
        title: 'Contact Information',
        mainContactTitle: 'Main Contact',
        emailLabel: 'Email:',
        backupEmailLabel: 'Backup Email:',
        encryptedContactTitle: 'Encrypted Communication',
        pgpKeyLabel: 'PGP Key:',
        downloadKey: 'Download Public Key',
        keyStatusLabel: 'Key Status:',
        keyStatus: 'Never Expires',
        preferredLangLabel: 'Preferred Languages:',
        preferredLang: 'Chinese, English',
        note: 'For sensitive vulnerabilities, it is recommended to use PGP encrypted email. We will prioritize high-risk vulnerabilities upon receipt.',
      },
    },
  },
  fr: {
    title: 'Politique de Sécurité',
    description:
      'Politique de divulgation des vulnérabilités de sécurité du site web et directives de signalement',
    lastUpdated: '19 Mars 2026',
    headerDesc:
      'Nous accordons une grande importance à la sécurité du site web et invitons les chercheurs en sécurité à signaler de manière responsable les vulnérabilités de sécurité découvertes.',
    lastUpdatedLabel: 'Dernière mise à jour : ',
    sidebarTitle: 'Contenu de la politique',
    nav: {
      overview: "1. Vue d'ensemble",
      scope: '2. Portée',
      guidelines: '3. Directives',
      process: '4. Processus',
      legal: '5. Juridique',
      restrictions: '6. Restrictions',
      contact: '7. Contact',
    },
    sections: {
      overview: {
        title: "Vue d'ensemble",
        content:
          'Nous nous engageons à protéger les données des utilisateurs et la sécurité du site web. Si vous découvrez une vulnérabilité de sécurité sur notre site web, nous vous encourageons à nous la divulguer de manière responsable afin que nous puissions résoudre le problème rapidement.',
        commitmentTitle: 'Notre engagement',
        commitments: [
          'Prendre chaque rapport de sécurité au sérieux',
          'Accuser réception dans les 24 heures',
          "Protéger l'identité du rapporteur et les informations fournies",
          'Remercier publiquement les contributeurs après la correction (avec votre consentement)',
        ],
      },
      scope: {
        title: 'Portée',
        content:
          "Cette politique s'applique aux domaines et services suivants :",
        domains: [
          { label: 'Domaine principal :', value: 'alexander.xin' },
          { label: 'Sous-domaines :', value: '*.alexander.xin' },
          { label: 'GitHub Pages :', value: 'alexanderj-carter.github.io' },
        ],
        excludeTitle: 'Exclusions',
        excludes: [
          'Services tiers et liens externes',
          'Comptes de réseaux sociaux',
          'Autres services non directement contrôlés par nous',
        ],
      },
      guidelines: {
        title: 'Directives de signalement',
        content:
          'Pour nous aider à comprendre et à résoudre rapidement le problème, veuillez inclure les informations suivantes dans votre rapport :',
        basicInfoTitle: 'Informations de base',
        basicInfo: [
          'Type de vulnérabilité et évaluation de la gravité',
          'URL ou fonction affectée',
          'Étapes de reproduction détaillées',
          "Description de l'impact potentiel",
        ],
        techDetailsTitle: 'Détails techniques',
        techDetails: [
          'Exemples de requête et de réponse',
          "Captures d'écran ou démonstration vidéo",
          'Outils et technologies utilisés',
          'Correctif suggéré (facultatif)',
        ],
      },
      process: {
        title: 'Processus de traitement',
        steps: [
          {
            step: 1,
            title: 'Réception du rapport',
            desc: 'Accuser réception dans les 24 heures',
          },
          {
            step: 2,
            title: 'Évaluation initiale',
            desc: 'Analyse initiale terminée dans les 3-5 jours',
          },
          {
            step: 3,
            title: 'Correction de la vulnérabilité',
            desc: 'Élaborer un plan de correction basé sur la gravité',
          },
          {
            step: 4,
            title: 'Remerciement public',
            desc: 'Mettre à jour la page de remerciement après la correction',
          },
        ],
      },
      legal: {
        title: 'Protection juridique',
        content:
          'Pour les activités de recherche en sécurité conformes à cette politique, nous nous engageons à :',
        commitments: [
          'Ne pas engager de poursuites judiciaires contre les chercheurs',
          "Ne pas signaler les activités de recherche aux forces de l'ordre",
          'Travailler avec les chercheurs pour résoudre les problèmes découverts',
        ],
        note: "Les chercheurs doivent suivre les principes de divulgation responsable, ne pas exploiter malveillamment les vulnérabilités et ne pas accéder ou modifier les données d'autrui.",
      },
      restrictions: {
        title: 'Restrictions de test',
        allowedTitle: 'Tests autorisés',
        allowed: [
          'Analyse automatisée des vulnérabilités (fréquence raisonnable)',
          'Tests de sécurité manuels',
          "Tests d'ingénierie sociale (niveau technique uniquement)",
        ],
        forbiddenTitle: 'Actions interdites',
        forbidden: [
          'Attaques par déni de service (DoS/DDoS)',
          "Accéder, modifier ou supprimer les données d'autrui",
          'Détruire malveillamment la fonctionnalité du site web',
          'Attaques physiques ou ingénierie sociale',
          'Divulguer publiquement des vulnérabilités non corrigées',
        ],
      },
      contact: {
        title: 'Coordonnées',
        mainContactTitle: 'Contact principal',
        emailLabel: 'E-mail :',
        backupEmailLabel: 'E-mail de secours :',
        encryptedContactTitle: 'Communication chiffrée',
        pgpKeyLabel: 'Clé PGP :',
        downloadKey: 'Télécharger la clé publique',
        keyStatusLabel: 'État de la clé :',
        keyStatus: "N'expire jamais",
        preferredLangLabel: 'Langues préférées :',
        preferredLang: 'Chinois, Anglais',
        note: "Pour les vulnérabilités sensibles, il est recommandé d'utiliser un e-mail chiffré PGP. Nous traiterons en priorité les vulnérabilités à haut risque dès réception.",
      },
    },
  },
  ru: {
    title: 'Политика безопасности',
    description:
      'Политика раскрытия уязвимостей безопасности веб-сайта и рекомендации по отчетности',
    lastUpdated: '19 марта 2026 г.',
    headerDesc:
      'Мы ценим безопасность веб-сайта и приветствуем исследователей безопасности, которые ответственно сообщают об обнаруженных уязвимостях безопасности.',
    lastUpdatedLabel: 'Последнее обновление: ',
    sidebarTitle: 'Содержание политики',
    nav: {
      overview: '1. Обзор',
      scope: '2. Область действия',
      guidelines: '3. Рекомендации',
      process: '4. Процесс',
      legal: '5. Правовые вопросы',
      restrictions: '6. Ограничения',
      contact: '7. Контакты',
    },
    sections: {
      overview: {
        title: 'Обзор',
        content:
          'Мы стремимся защищать данные пользователей и безопасность веб-сайта. Если вы обнаружите уязвимость безопасности на нашем веб-сайте, мы призываем вас ответственно сообщить нам об этом, чтобы мы могли оперативно устранить проблему.',
        commitmentTitle: 'Наши обязательства',
        commitments: [
          'Серьезно относиться к каждому отчету о безопасности',
          'Подтверждать получение в течение 24 часов',
          'Защищать личность сообщившего и предоставленную информацию',
          'Публично благодарить участников после исправления (с вашего согласия)',
        ],
      },
      scope: {
        title: 'Область действия',
        content: 'Эта политика применяется к следующим доменам и сервисам:',
        domains: [
          { label: 'Основной домен:', value: 'alexander.xin' },
          { label: 'Поддомены:', value: '*.alexander.xin' },
          { label: 'GitHub Pages:', value: 'alexanderj-carter.github.io' },
        ],
        excludeTitle: 'Исключения',
        excludes: [
          'Сторонние сервисы и внешние ссылки',
          'Аккаунты в социальных сетях',
          'Другие сервисы, не контролируемые нами напрямую',
        ],
      },
      guidelines: {
        title: 'Рекомендации по отчетности',
        content:
          'Чтобы помочь нам быстро понять и устранить проблему, пожалуйста, включите в свой отчет следующую информацию:',
        basicInfoTitle: 'Основная информация',
        basicInfo: [
          'Тип уязвимости и оценка серьезности',
          'Затронутый URL или функция',
          'Подробные шаги воспроизведения',
          'Описание потенциального воздействия',
        ],
        techDetailsTitle: 'Технические детали',
        techDetails: [
          'Примеры запросов и ответов',
          'Скриншоты или видео демонстрация',
          'Используемые инструменты и технологии',
          'Предлагаемое исправление (необязательно)',
        ],
      },
      process: {
        title: 'Процесс обработки',
        steps: [
          {
            step: 1,
            title: 'Получение отчета',
            desc: 'Подтверждение получения в течение 24 часов',
          },
          {
            step: 2,
            title: 'Первоначальная оценка',
            desc: 'Завершение первоначального анализа в течение 3-5 дней',
          },
          {
            step: 3,
            title: 'Исправление уязвимости',
            desc: 'Разработка плана исправления в зависимости от серьезности',
          },
          {
            step: 4,
            title: 'Публичная благодарность',
            desc: 'Обновление страницы благодарности после исправления',
          },
        ],
      },
      legal: {
        title: 'Правовая защита',
        content:
          'В отношении деятельности по исследованию безопасности, соответствующей этой политике, мы обязуемся:',
        commitments: [
          'Не предпринимать юридических действий против исследователей',
          'Не сообщать о деятельности по исследованию в правоохранительные органы',
          'Сотрудничать с исследователями для решения обнаруженных проблем',
        ],
        note: 'Исследователи должны следовать принципам ответственного раскрытия, не использовать уязвимости злонамеренно и не получать доступ к данным других лиц и не изменять их.',
      },
      restrictions: {
        title: 'Ограничения тестирования',
        allowedTitle: 'Разрешенное тестирование',
        allowed: [
          'Автоматическое сканирование уязвимостей (разумная частота)',
          'Ручное тестирование безопасности',
          'Тестирование социальной инженерии (только технический уровень)',
        ],
        forbiddenTitle: 'Запрещенные действия',
        forbidden: [
          'Атаки типа "отказ в обслуживании" (DoS/DDoS)',
          'Доступ, изменение или удаление данных других лиц',
          'Злонамеренное нарушение функциональности веб-сайта',
          'Физические атаки или социальная инженерия',
          'Публичное раскрытие неисправленных уязвимостей',
        ],
      },
      contact: {
        title: 'Контактная информация',
        mainContactTitle: 'Основной контакт',
        emailLabel: 'Email:',
        backupEmailLabel: 'Резервный Email:',
        encryptedContactTitle: 'Зашифрованная связь',
        pgpKeyLabel: 'PGP ключ:',
        downloadKey: 'Скачать открытый ключ',
        keyStatusLabel: 'Статус ключа:',
        keyStatus: 'Бессрочный',
        preferredLangLabel: 'Предпочтительные языки:',
        preferredLang: 'Китайский, Английский',
        note: 'Для чувствительных уязвимостей рекомендуется использовать PGP зашифрованную электронную почту. Мы будем уделять приоритетное внимание уязвимостям высокого риска после получения.',
      },
    },
  },
};

