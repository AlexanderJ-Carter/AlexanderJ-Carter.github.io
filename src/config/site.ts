/**
 * Site runtime flags. Use PUBLIC_* env vars (see `.env.example`).
 * Dev server always skips human verification unless PUBLIC_FORCE_VERIFY=true.
 */

import { stripLangPrefix } from '../i18n/types';

const truthy = (v: string | undefined) =>
  v === '1' || v === 'true' || v === 'yes';

/** Apex / portfolio origin (GitHub Pages). */
export const SITE_ORIGIN = 'https://alexander.xin';

/** Canonical writing / RSS host (Tunnel → nginx, same dist as www). */
export const BLOG_ORIGIN = 'https://blog.alexander.xin';

/** Paths whose canonical URL lives on blog.alexander.xin. */
export function isWritingCanonicalPath(pathname: string): boolean {
  const bare = stripLangPrefix(pathname);
  return (
    bare === '/writing' ||
    bare.startsWith('/writing/') ||
    bare === '/rss.xml'
  );
}

export function originForPath(pathname: string): string {
  return isWritingCanonicalPath(pathname) ? BLOG_ORIGIN : SITE_ORIGIN;
}

export const isDev = Boolean(import.meta.env.DEV);

/** Skip Turnstile gate on protected pages (About / Contact). */
export const skipVerify =
  truthy(import.meta.env.PUBLIC_SKIP_VERIFY) ||
  (isDev && !truthy(import.meta.env.PUBLIC_FORCE_VERIFY));

/** Cloudflare Turnstile site key. Empty in skip mode. */
export const turnstileSiteKey: string =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
  (isDev
    ? '1x00000000000000000000AA' // Cloudflare always-pass test key
    : '0x4AAAAAABdh_m4Oroh5Egsy');

/** Public publisher identity used for site ownership verification. */
export const ADSENSE_ACCOUNT = 'ca-pub-2583424294154083';

/** Google AdSense runtime client id. Empty = ads off. */
export const adsenseClient: string =
  import.meta.env.PUBLIC_ADSENSE_CLIENT?.trim() || '';

export const adsEnabled = adsenseClient.length > 0;

export const adSlots = {
  home: import.meta.env.PUBLIC_ADSENSE_SLOT_HOME?.trim() || '',
  article: import.meta.env.PUBLIC_ADSENSE_SLOT_ARTICLE?.trim() || '',
} as const;

export type AdSlotId = keyof typeof adSlots;

/**
 * Mainland China filings — leave empty to hide completely.
 * Example ICP: 京ICP备xxxxxxxx号
 * Example police: 京公网安备xxxxxxxxxxxx号
 */
export const icpFiling = {
  number: import.meta.env.PUBLIC_ICP_NUMBER?.trim() || '',
  href:
    import.meta.env.PUBLIC_ICP_URL?.trim() || 'https://beian.miit.gov.cn/',
};

export const policeFiling = {
  number: import.meta.env.PUBLIC_POLICE_BEIAN_NUMBER?.trim() || '',
  href: import.meta.env.PUBLIC_POLICE_BEIAN_URL?.trim() || '',
};

export const hasFilings = Boolean(icpFiling.number || policeFiling.number);

/** Afdian / sponsorship — override with PUBLIC_AFDIAN_URL if needed */
export const afdianUrl: string =
  import.meta.env.PUBLIC_AFDIAN_URL?.trim() ||
  'https://afdian.com/a/alexanderjc';

export const githubRepoUrl =
  'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io';
