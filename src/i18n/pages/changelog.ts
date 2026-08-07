import type { Lang } from '../types';

export type ChangelogCopy = {
  title: string;
  description: string;
  kicker: string;
  headerTitle: string;
  headerDesc: string;
  back: string;
  repoNote: string;
  repoLabel: string;
  repoHref: string;
  sectionLabels: Record<string, string>;
  unreleased: string;
};

const sectionLabels = {
  'zh-CN': {
    Added: '新增',
    Changed: '变更',
    Fixed: '修复',
    Removed: '移除',
    Deprecated: '弃用',
    Security: '安全',
  },
  'zh-TW': {
    Added: '新增',
    Changed: '變更',
    Fixed: '修復',
    Removed: '移除',
    Deprecated: '棄用',
    Security: '安全',
  },
  'en-GB': {
    Added: 'Added',
    Changed: 'Changed',
    Fixed: 'Fixed',
    Removed: 'Removed',
    Deprecated: 'Deprecated',
    Security: 'Security',
  },
  fr: {
    Added: 'Ajouts',
    Changed: 'Modifications',
    Fixed: 'Corrections',
    Removed: 'Suppressions',
    Deprecated: 'Dépréciations',
    Security: 'Sécurité',
  },
  ru: {
    Added: 'Добавлено',
    Changed: 'Изменено',
    Fixed: 'Исправлено',
    Removed: 'Удалено',
    Deprecated: 'Устарело',
    Security: 'Безопасность',
  },
};

export const changelogCopy: Record<Lang, ChangelogCopy> = {
  'zh-CN': {
    title: '更新日志',
    description: '站点版本与重要变更记录',
    kicker: 'Changelog',
    headerTitle: '更新日志',
    headerDesc: '公开记录本站的重要版本与改动，与仓库 CHANGELOG 同步。',
    back: '返回首页',
    repoNote: '完整历史见 GitHub 仓库。',
    repoLabel: '查看 CHANGELOG.md',
    repoHref:
      'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/blob/main/CHANGELOG.md',
    sectionLabels: sectionLabels['zh-CN'],
    unreleased: '未发布',
  },
  'zh-TW': {
    title: '更新日誌',
    description: '站點版本與重要變更記錄',
    kicker: 'Changelog',
    headerTitle: '更新日誌',
    headerDesc: '公開記錄本站的重要版本與改動，與倉庫 CHANGELOG 同步。',
    back: '返回首頁',
    repoNote: '完整歷史見 GitHub 倉庫。',
    repoLabel: '查看 CHANGELOG.md',
    repoHref:
      'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/blob/main/CHANGELOG.md',
    sectionLabels: sectionLabels['zh-TW'],
    unreleased: '未發布',
  },
  'en-GB': {
    title: 'Changelog',
    description: 'Site version history and notable changes',
    kicker: 'Changelog',
    headerTitle: 'Changelog',
    headerDesc:
      'Public record of notable releases and changes, synced from the repo CHANGELOG.',
    back: 'Back to home',
    repoNote: 'Full history lives in the GitHub repository.',
    repoLabel: 'View CHANGELOG.md',
    repoHref:
      'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/blob/main/CHANGELOG.md',
    sectionLabels: sectionLabels['en-GB'],
    unreleased: 'Unreleased',
  },
  fr: {
    title: 'Journal des modifications',
    description: 'Historique des versions et changements notables',
    kicker: 'Changelog',
    headerTitle: 'Journal des modifications',
    headerDesc:
      'Historique public des versions et changements, synchronisé avec le CHANGELOG du dépôt.',
    back: "Retour à l'accueil",
    repoNote: 'Historique complet sur le dépôt GitHub.',
    repoLabel: 'Voir CHANGELOG.md',
    repoHref:
      'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/blob/main/CHANGELOG.md',
    sectionLabels: sectionLabels.fr,
    unreleased: 'Non publié',
  },
  ru: {
    title: 'Журнал изменений',
    description: 'История версий и заметных изменений',
    kicker: 'Changelog',
    headerTitle: 'Журнал изменений',
    headerDesc:
      'Публичная история релизов и изменений, синхронизированная с CHANGELOG репозитория.',
    back: 'На главную',
    repoNote: 'Полная история — в репозитории GitHub.',
    repoLabel: 'Открыть CHANGELOG.md',
    repoHref:
      'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/blob/main/CHANGELOG.md',
    sectionLabels: sectionLabels.ru,
    unreleased: 'Не выпущено',
  },
};
