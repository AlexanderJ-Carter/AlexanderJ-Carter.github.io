export type Lang = 'zh-CN' | 'zh-TW' | 'en-GB' | 'fr' | 'ru';

export const SUPPORTED_LANGS: Lang[] = ['zh-CN', 'zh-TW', 'en-GB', 'fr', 'ru'];
export const DEFAULT_LANG: Lang = 'zh-CN';

export function getLangPath(lang: Lang, path: string): string {
  if (lang === 'zh-CN') return path;
  const prefix = lang === 'en-GB' ? 'en' : lang;
  return `/${prefix}${path}`;
}

export function resolveLang(lang: string | undefined): Lang {
  if (!lang) return DEFAULT_LANG;
  return SUPPORTED_LANGS.includes(lang as Lang) ? (lang as Lang) : DEFAULT_LANG;
}
