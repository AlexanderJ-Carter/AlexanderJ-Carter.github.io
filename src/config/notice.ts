import type { Lang } from '../i18n/types';

export type NoticeVariant = 'banner' | 'modal';

export type NoticeCopy = {
  title: string;
  body: string;
  cta?: string;
  dismiss?: string;
};

/**
 * Site-wide announcement. Keep `enabled: false` until you have something to say.
 * Bump `id` whenever you publish a new notice so dismissed users see it again.
 */
export type SiteNoticeConfig = {
  enabled: boolean;
  id: string;
  variant: NoticeVariant;
  /** Optional link for the CTA button */
  href?: string;
  dismissible?: boolean;
  copy: Record<Lang, NoticeCopy>;
};

export const siteNotice: SiteNoticeConfig = {
  enabled: true,
  id: '2026-07-editorial-refresh-v2',
  variant: 'modal',
  href: '/about',
  dismissible: true,
  copy: {
    'zh-CN': {
      title: '站点焕新',
      body: '摄影编辑室质感、深读书单，以及音乐与彩蛋小工具都回来了。慢慢逛。',
      cta: '关于本站',
      dismiss: '稍后再说',
    },
    'zh-TW': {
      title: '站點煥新',
      body: '攝影編輯室質感、深讀書單，以及音樂與彩蛋小工具都回來了。慢慢逛。',
      cta: '關於本站',
      dismiss: '稍後再說',
    },
    'en-GB': {
      title: 'A quiet refresh',
      body: 'Editorial craft, deeper reading notes, music and small tools are back. Take a look around.',
      cta: 'About',
      dismiss: 'Not now',
    },
    fr: {
      title: 'Une mise à jour discrète',
      body: 'Esthétique éditoriale, notes de lecture, musique et petits outils sont de retour.',
      cta: 'À propos',
      dismiss: 'Plus tard',
    },
    ru: {
      title: 'Тихое обновление',
      body: 'Редакционный стиль, более глубокие заметки, музыка и мини-инструменты снова здесь.',
      cta: 'Обо мне',
      dismiss: 'Позже',
    },
  },
};

export function resolveNotice(lang: Lang): NoticeCopy {
  return siteNotice.copy[lang] || siteNotice.copy['zh-CN'];
}
