export type Lang = 'zh-CN' | 'zh-TW' | 'en-GB' | 'fr' | 'ru';

export const SUPPORTED_LANGS: Lang[] = ['zh-CN', 'zh-TW', 'en-GB', 'fr', 'ru'];
export const DEFAULT_LANG: Lang = 'zh-CN';

export function getLangPath(lang: Lang, path: string): string {
  if (lang === 'zh-CN') return path.startsWith('/') ? path : `/${path}`;
  const prefix = lang === 'en-GB' ? 'en' : lang;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return `/${prefix}/`;
  return `/${prefix}${normalized}`;
}

export function resolveLang(lang: string | undefined): Lang {
  if (!lang) return DEFAULT_LANG;
  return SUPPORTED_LANGS.includes(lang as Lang) ? (lang as Lang) : DEFAULT_LANG;
}

/** Strip /en|/zh-TW|/fr|/ru|/zh-CN|/en-GB prefix from a pathname. */
export function stripLangPrefix(pathname: string): string {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  const match = cleaned.match(
    /^\/(en|en-GB|zh-TW|zh-CN|fr|ru)(?=\/|$)/i
  );
  if (!match) return cleaned === '' ? '/' : cleaned;
  const rest = cleaned.slice(match[0].length) || '/';
  return rest.startsWith('/') ? rest : `/${rest}`;
}

/** Open Graph locale tags (underscore form). */
export function toOgLocale(lang: Lang): string {
  const map: Record<Lang, string> = {
    'zh-CN': 'zh_CN',
    'zh-TW': 'zh_TW',
    'en-GB': 'en_GB',
    fr: 'fr_FR',
    ru: 'ru_RU',
  };
  return map[lang];
}

/** Build absolute hreflang alternate URLs for the current path. */
export function getHreflangAlternates(
  pathname: string,
  site: string | URL
): Array<{ hreflang: string; href: string }> {
  const bare = stripLangPrefix(pathname);
  const path = bare === '/' ? '/' : bare.endsWith('/') ? bare : `${bare}/`;
  const siteBase = typeof site === 'string' ? site : site.href;
  const alternates: Array<{ hreflang: string; href: string }> =
    SUPPORTED_LANGS.map((lang) => ({
      hreflang: lang,
      href: new URL(getLangPath(lang, path), siteBase).href,
    }));
  alternates.push({
    hreflang: 'x-default',
    href: new URL(getLangPath('zh-CN', path), siteBase).href,
  });
  return alternates;
}

/** Responsive srcset for gallery-optimized assets (*-{sm,md,lg,xl}.webp). */
export function gallerySrcSet(basePath: string): string | undefined {
  if (!basePath.includes('/gallery-optimized/')) return undefined;
  if (basePath.includes('-sm.') || basePath.includes('-md.') || basePath.includes('-lg.') || basePath.includes('-xl.')) {
    // Already a sized variant — derive stem
  }
  const match = basePath.match(
    /^(.*\/gallery-optimized\/.+?)(?:-(?:sm|md|lg|xl))?(\.webp)$/i
  );
  if (!match) return undefined;
  const stem = match[1];
  const ext = match[2];
  return [
    `${stem}-sm${ext} 480w`,
    `${stem}-md${ext} 800w`,
    `${stem}-lg${ext} 1200w`,
    `${stem}-xl${ext} 1920w`,
  ].join(', ');
}

export function gallerySrcFallback(basePath: string): string {
  const match = basePath.match(
    /^(.*\/gallery-optimized\/.+?)(?:-(?:sm|md|lg|xl))?(\.webp)$/i
  );
  if (!match) return basePath;
  return `${match[1]}-md${match[2]}`;
}
