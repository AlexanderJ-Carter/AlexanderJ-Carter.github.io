import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('writing'))
    .filter((post) => post.data.lang === 'zh-CN')
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Alexander James Carter — Writing',
    description: '工程、设计与摄影观察',
    site: context.site ?? 'https://alexander.xin',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/writing/${post.id}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
