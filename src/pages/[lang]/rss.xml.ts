import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getLangStaticPaths, resolveRouteLang } from '../../i18n/routing';
import type { Lang } from '../../i18n/types';
import { getLangPath } from '../../i18n/types';

export function getStaticPaths() {
  return getLangStaticPaths();
}

const meta: Record<
  Lang,
  { title: string; description: string; language: string }
> = {
  'zh-CN': {
    title: 'Alexander James Carter — Writing',
    description: '工程、设计与摄影观察',
    language: 'zh-CN',
  },
  'zh-TW': {
    title: 'Alexander James Carter — 寫作',
    description: '工程、設計與攝影觀察',
    language: 'zh-TW',
  },
  'en-GB': {
    title: 'Alexander James Carter — Writing',
    description: 'Notes on engineering, design and photography',
    language: 'en-GB',
  },
  fr: {
    title: 'Alexander James Carter — Écrits',
    description: 'Notes sur l’ingénierie, le design et la photo',
    language: 'fr',
  },
  ru: {
    title: 'Alexander James Carter — Статьи',
    description: 'Заметки об инженерии, дизайне и фото',
    language: 'ru',
  },
};

export async function GET(context: APIContext) {
  const lang = resolveRouteLang(context.params.lang);
  const info = meta[lang];
  const posts = (await getCollection('writing'))
    .filter((post) => post.data.lang === lang)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: info.title,
    description: info.description,
    site: context.site ?? 'https://alexander.xin',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getLangPath(lang, `/writing/${post.id}/`),
    })),
    customData: `<language>${info.language}</language>`,
  });
}
