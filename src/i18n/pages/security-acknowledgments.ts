import type { Lang } from '../types';

export const securityAcknowledgmentsData: Record<Lang, any> = {
  'zh-CN': {
    title: '安全致谢',
    description: '感谢为网站安全做出贡献的安全研究者',
    lastUpdated: '2026年3月19日',
    headerDesc:
      '感谢以下安全研究者负责任地报告安全漏洞，帮助我们改善网站安全性',
    lastUpdatedLabel: '最后更新日期：',
    sidebarTitle: '安全目录',
    nav: {
      overview: '1. 致谢说明',
      reports: '2. 安全报告',
      contact: '3. 报告漏洞',
      policy: '4. 安全政策',
    },
    sections: {
      overview: {
        title: '致谢说明',
        content:
          '我们深深感谢所有关注网站安全的研究者。通过负责任的漏洞披露，您帮助我们：',
        list: [
          '提升网站整体安全水平',
          '保护用户数据和隐私',
          '建立更好的安全防护机制',
          '完善安全响应流程',
        ],
        note: '每一个安全报告都是对我们网站安全的宝贵贡献！',
      },
      reports: {
        title: '安全报告',
        emptyTitle: '暂无安全报告',
        emptyDesc:
          '目前还没有收到安全漏洞报告。我们感谢所有关注网站安全的研究者。',
      },
      contact: {
        title: '发现安全问题？',
        content: '如果您发现了安全漏洞，请通过以下方式负责任地报告：',
        emailTitle: '邮件报告',
        emailDesc: '发送详细报告到：',
        encryptedTitle: '加密通信',
        encryptedDesc: '敏感信息请使用PGP加密：',
        downloadKey: '下载PGP公钥',
        commitment:
          '我们承诺在收到报告后24小时内回复，并在合理时间内修复问题。',
      },
      policy: {
        title: '相关政策',
        content: '了解更多安全相关信息：',
        securityPolicy: '安全政策',
        securityTxt: 'Security.txt',
      },
    },
  },
  'zh-TW': {
    title: '安全致謝',
    description: '感謝為網站安全做出貢獻的安全研究者',
    lastUpdated: '2026年3月19日',
    headerDesc:
      '感謝以下安全研究者負責任地報告安全漏洞，幫助我們改善網站安全性',
    lastUpdatedLabel: '最後更新日期：',
    sidebarTitle: '安全目錄',
    nav: {
      overview: '1. 致謝說明',
      reports: '2. 安全報告',
      contact: '3. 報告漏洞',
      policy: '4. 安全政策',
    },
    sections: {
      overview: {
        title: '致謝說明',
        content:
          '我們深深感謝所有關注網站安全的研究者。通過負責任的漏洞披露，您幫助我們：',
        list: [
          '提升網站整體安全水平',
          '保護用戶數據和隱私',
          '建立更好的安全防護機制',
          '完善安全響應流程',
        ],
        note: '每一個安全報告都是對我們網站安全的寶貴貢獻！',
      },
      reports: {
        title: '安全報告',
        emptyTitle: '暫無安全報告',
        emptyDesc:
          '目前還沒有收到安全漏洞報告。我們感謝所有關注網站安全的研究者。',
      },
      contact: {
        title: '發現安全問題？',
        content: '如果您發現了安全漏洞，請通過以下方式負責任地報告：',
        emailTitle: '郵件報告',
        emailDesc: '發送詳細報告到：',
        encryptedTitle: '加密通信',
        encryptedDesc: '敏感資訊請使用PGP加密：',
        downloadKey: '下載PGP公鑰',
        commitment:
          '我們承諾在收到報告後24小時內回覆，並在合理時間內修復問題。',
      },
      policy: {
        title: '相關政策',
        content: '了解更多安全相關資訊：',
        securityPolicy: '安全政策',
        securityTxt: 'Security.txt',
      },
    },
  },
  'en-GB': {
    title: 'Security Acknowledgements',
    description:
      'Thank you to security researchers who contribute to website security',
    lastUpdated: 'March 19, 2026',
    headerDesc:
      'We thank the following security researchers for responsibly reporting security vulnerabilities and helping us improve website security.',
    lastUpdatedLabel: 'Last Updated: ',
    sidebarTitle: 'Security Contents',
    nav: {
      overview: '1. Overview',
      reports: '2. Security Reports',
      contact: '3. Report Vulnerability',
      policy: '4. Security Policy',
    },
    sections: {
      overview: {
        title: 'Overview',
        content:
          'We deeply appreciate all researchers who care about website security. Through responsible vulnerability disclosure, you help us:',
        list: [
          'Improve overall website security level',
          'Protect user data and privacy',
          'Establish better security protection mechanisms',
          'Improve security response processes',
        ],
        note: 'Every security report is a valuable contribution to our website security!',
      },
      reports: {
        title: 'Security Reports',
        emptyTitle: 'No Security Reports Yet',
        emptyDesc:
          'No security vulnerability reports have been received yet. We thank all researchers who care about website security.',
      },
      contact: {
        title: 'Found a Security Issue?',
        content:
          'If you have discovered a security vulnerability, please report it responsibly via the following methods:',
        emailTitle: 'Email Report',
        emailDesc: 'Send detailed report to:',
        encryptedTitle: 'Encrypted Communication',
        encryptedDesc: 'Please use PGP encryption for sensitive information:',
        downloadKey: 'Download PGP Public Key',
        commitment:
          'We commit to replying within 24 hours of receiving the report and fixing the issue within a reasonable time.',
      },
      policy: {
        title: 'Related Policies',
        content: 'Learn more about security related information:',
        securityPolicy: 'Security Policy',
        securityTxt: 'Security.txt',
      },
    },
  },
  fr: {
    title: 'Remerciements de Sécurité',
    description:
      'Merci aux chercheurs en sécurité qui contribuent à la sécurité du site web',
    lastUpdated: '19 Mars 2026',
    headerDesc:
      'Nous remercions les chercheurs en sécurité suivants pour avoir signalé de manière responsable les vulnérabilités de sécurité et nous avoir aidés à améliorer la sécurité du site web.',
    lastUpdatedLabel: 'Dernière mise à jour : ',
    sidebarTitle: 'Contenu de sécurité',
    nav: {
      overview: "1. Vue d'ensemble",
      reports: '2. Rapports de sécurité',
      contact: '3. Signaler une vulnérabilité',
      policy: '4. Politique de sécurité',
    },
    sections: {
      overview: {
        title: "Vue d'ensemble",
        content:
          'Nous apprécions profondément tous les chercheurs qui se soucient de la sécurité du site web. Grâce à la divulgation responsable des vulnérabilités, vous nous aidez à :',
        list: [
          'Améliorer le niveau global de sécurité du site web',
          'Protéger les données et la vie privée des utilisateurs',
          'Établir de meilleurs mécanismes de protection de sécurité',
          'Améliorer les processus de réponse aux incidents de sécurité',
        ],
        note: 'Chaque rapport de sécurité est une contribution précieuse à la sécurité de notre site web !',
      },
      reports: {
        title: 'Rapports de sécurité',
        emptyTitle: 'Aucun rapport de sécurité pour le moment',
        emptyDesc:
          "Aucun rapport de vulnérabilité de sécurité n'a encore été reçu. Nous remercions tous les chercheurs qui se soucient de la sécurité du site web.",
      },
      contact: {
        title: 'Vous avez trouvé un problème de sécurité ?',
        content:
          'Si vous avez découvert une vulnérabilité de sécurité, veuillez la signaler de manière responsable via les méthodes suivantes :',
        emailTitle: 'Rapport par e-mail',
        emailDesc: 'Envoyer un rapport détaillé à :',
        encryptedTitle: 'Communication chiffrée',
        encryptedDesc:
          'Veuillez utiliser le chiffrement PGP pour les informations sensibles :',
        downloadKey: 'Télécharger la clé publique PGP',
        commitment:
          'Nous nous engageons à répondre dans les 24 heures suivant la réception du rapport et à résoudre le problème dans un délai raisonnable.',
      },
      policy: {
        title: 'Politiques connexes',
        content: 'En savoir plus sur les informations liées à la sécurité :',
        securityPolicy: 'Politique de sécurité',
        securityTxt: 'Security.txt',
      },
    },
  },
  ru: {
    title: 'Благодарности за безопасность',
    description:
      'Спасибо исследователям безопасности, которые вносят вклад в безопасность веб-сайта',
    lastUpdated: '19 марта 2026 г.',
    headerDesc:
      'Мы благодарим следующих исследователей безопасности за ответственное сообщение об уязвимостях безопасности и помощь в улучшении безопасности веб-сайта.',
    lastUpdatedLabel: 'Последнее обновление: ',
    sidebarTitle: 'Содержание безопасности',
    nav: {
      overview: '1. Обзор',
      reports: '2. Отчеты о безопасности',
      contact: '3. Сообщить об уязвимости',
      policy: '4. Политика безопасности',
    },
    sections: {
      overview: {
        title: 'Обзор',
        content:
          'Мы глубоко ценим всех исследователей, которые заботятся о безопасности веб-сайта. Благодаря ответственному раскрытию уязвимостей вы помогаете нам:',
        list: [
          'Повысить общий уровень безопасности веб-сайта',
          'Защитить данные и конфиденциальность пользователей',
          'Создать лучшие механизмы защиты безопасности',
          'Улучшить процессы реагирования на инциденты безопасности',
        ],
        note: 'Каждый отчет о безопасности является ценным вкладом в безопасность нашего веб-сайта!',
      },
      reports: {
        title: 'Отчеты о безопасности',
        emptyTitle: 'Пока нет отчетов о безопасности',
        emptyDesc:
          'Отчетов об уязвимостях безопасности пока не поступало. Мы благодарим всех исследователей, которые заботятся о безопасности веб-сайта.',
      },
      contact: {
        title: 'Нашли проблему безопасности?',
        content:
          'Если вы обнаружили уязвимость безопасности, пожалуйста, сообщите о ней ответственно следующими способами:',
        emailTitle: 'Отчет по электронной почте',
        emailDesc: 'Отправить подробный отчет на:',
        encryptedTitle: 'Зашифрованная связь',
        encryptedDesc:
          'Пожалуйста, используйте шифрование PGP для конфиденциальной информации:',
        downloadKey: 'Скачать открытый ключ PGP',
        commitment:
          'Мы обязуемся ответить в течение 24 часов после получения отчета и устранить проблему в разумные сроки.',
      },
      policy: {
        title: 'Связанные политики',
        content: 'Узнайте больше информации, связанной с безопасностью:',
        securityPolicy: 'Политика безопасности',
        securityTxt: 'Security.txt',
      },
    },
  },
};
