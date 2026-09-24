import type { Lang } from './types';
import { resolveLang } from './types';

/** URL segment under `/[lang]/…`. zh-CN lives at `/`. Retired locales redirect. */
export type LangRouteParam = 'en';

const ROUTE_PARAMS: LangRouteParam[] = ['en'];

/**
 * Static paths for `src/pages/[lang]/**`.
 * Avoids duplicate `/zh-CN/*` and `/en-GB/*` trees.
 */
export function getLangStaticPaths() {
  return ROUTE_PARAMS.map((lang) => ({ params: { lang } }));
}

/** Map a `[lang]` URL param to canonical Lang. */
export function resolveRouteLang(urlLang: string | undefined): Lang {
  if (urlLang === 'en' || urlLang === 'en-GB') return 'en-GB';
  return resolveLang(urlLang);
}
