/**
 * Site runtime flags. Use PUBLIC_* env vars (see `.env.example`).
 * Dev server always skips human verification unless PUBLIC_FORCE_VERIFY=true.
 */

import { stripLangPrefix } from '../i18n/types';

const truthy = (v: string | undefined) =>
  v === '1' || v === 'true' || v === 'yes';

/** Astro / Vite injects these at build time */
const env = import.meta.env;

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

export const isDev = Boolean(env.DEV);

/** Skip Turnstile gate on protected pages (About / Contact). */
export const skipVerify =
  truthy(env.PUBLIC_SKIP_VERIFY) || (isDev && !truthy(env.PUBLIC_FORCE_VERIFY));

/** Cloudflare Turnstile site key. Empty in skip mode. */
export const turnstileSiteKey: string =
  (env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined)?.trim() ||
  (isDev
    ? '1x00000000000000000000AA' // Cloudflare always-pass test key
    : '0x4AAAAAABdh_m4Oroh5Egsy');

/** Google AdSense publisher id, e.g. ca-pub-xxxxxxxx. Empty = ads off. */
export const adsenseClient: string =
  (env.PUBLIC_ADSENSE_CLIENT as string | undefined)?.trim() || '';

export const adsEnabled = adsenseClient.length > 0;

export const adSlots = {
  home: (env.PUBLIC_ADSENSE_SLOT_HOME as string | undefined)?.trim() || '',
  article:
    (env.PUBLIC_ADSENSE_SLOT_ARTICLE as string | undefined)?.trim() || '',
  sidebar:
    (env.PUBLIC_ADSENSE_SLOT_SIDEBAR as string | undefined)?.trim() || '',
} as const;

export type AdSlotId = keyof typeof adSlots;

/**
 * Mainland China filings — leave empty to hide completely.
 * Example ICP: 京ICP备xxxxxxxx号
 * Example police: 京公网安备xxxxxxxxxxxx号
 */
export const icpFiling = {
  number: (env.PUBLIC_ICP_NUMBER as string | undefined)?.trim() || '',
  href:
    (env.PUBLIC_ICP_URL as string | undefined)?.trim() ||
    'https://beian.miit.gov.cn/',
};

export const policeFiling = {
  number: (env.PUBLIC_POLICE_BEIAN_NUMBER as string | undefined)?.trim() || '',
  href: (env.PUBLIC_POLICE_BEIAN_URL as string | undefined)?.trim() || '',
};

export const hasFilings = Boolean(icpFiling.number || policeFiling.number);

/** Afdian / sponsorship — override with PUBLIC_AFDIAN_URL if needed */
export const afdianUrl: string =
  (env.PUBLIC_AFDIAN_URL as string | undefined)?.trim() ||
  'https://afdian.com/a/alexanderjc';

export const githubRepoUrl =
  'https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io';
