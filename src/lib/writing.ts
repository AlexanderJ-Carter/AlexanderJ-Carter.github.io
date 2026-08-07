import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/types';

export type WritingPost = CollectionEntry<'writing'>;

/** URL segment for a tag or category label. */
export function taxonomySlug(input: string): string {
  return input
    .trim()
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s_/]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function matchesLang(post: WritingPost, lang: Lang): boolean {
  return post.data.lang === lang || (lang === 'zh-CN' && !post.data.lang);
}

export function postsForLang(posts: WritingPost[], lang: Lang): WritingPost[] {
  return posts
    .filter((post) => matchesLang(post, lang))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function uniqueTaxonomy(
  posts: WritingPost[],
  field: 'category' | 'tags'
): Array<{ name: string; slug: string; count: number }> {
  const counts = new Map<string, { name: string; count: number }>();

  for (const post of posts) {
    const values = field === 'category' ? [post.data.category] : post.data.tags;
    for (const raw of values) {
      const name = raw.trim();
      if (!name) continue;
      const slug = taxonomySlug(name);
      const prev = counts.get(slug);
      if (prev) {
        prev.count += 1;
      } else {
        counts.set(slug, { name, count: 1 });
      }
    }
  }

  return [...counts.entries()]
    .map(([slug, { name, count }]) => ({ slug, name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

export function postsByCategorySlug(
  posts: WritingPost[],
  slug: string
): WritingPost[] {
  return posts.filter((p) => taxonomySlug(p.data.category) === slug);
}

export function postsByTagSlug(
  posts: WritingPost[],
  slug: string
): WritingPost[] {
  return posts.filter((p) =>
    p.data.tags.some((tag) => taxonomySlug(tag) === slug)
  );
}

export function postsByYear(posts: WritingPost[], year: number): WritingPost[] {
  return posts.filter((p) => p.data.pubDate.getFullYear() === year);
}

export function archiveYears(
  posts: WritingPost[]
): Array<{ year: number; count: number; latest: Date }> {
  const buckets = new Map<number, { count: number; latest: Date }>();
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    const prev = buckets.get(year);
    if (!prev) {
      buckets.set(year, { count: 1, latest: post.data.pubDate });
      continue;
    }
    prev.count += 1;
    if (post.data.pubDate.valueOf() > prev.latest.valueOf()) {
      prev.latest = post.data.pubDate;
    }
  }
  return [...buckets.entries()]
    .map(([year, { count, latest }]) => ({ year, count, latest }))
    .sort((a, b) => b.year - a.year);
}

/** Group posts by calendar month (newest month first). */
export function groupPostsByMonth(
  posts: WritingPost[]
): Array<{ month: number; posts: WritingPost[] }> {
  const buckets = new Map<number, WritingPost[]>();
  for (const post of posts) {
    const month = post.data.pubDate.getMonth();
    const list = buckets.get(month);
    if (list) list.push(post);
    else buckets.set(month, [post]);
  }
  return [...buckets.entries()]
    .map(([month, monthPosts]) => ({
      month,
      posts: monthPosts.sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
      ),
    }))
    .sort((a, b) => b.month - a.month);
}

export function relatedPosts(
  posts: WritingPost[],
  current: {
    id: string;
    category: string;
    tags: string[];
    lang: Lang;
  },
  limit = 3
): WritingPost[] {
  const pool = postsForLang(posts, current.lang).filter(
    (p) => p.id !== current.id
  );
  const tagSet = new Set(current.tags.map(taxonomySlug));

  const scored = pool.map((post) => {
    let score = 0;
    if (taxonomySlug(post.data.category) === taxonomySlug(current.category)) {
      score += 3;
    }
    for (const tag of post.data.tags) {
      if (tagSet.has(taxonomySlug(tag))) score += 1;
    }
    return { post, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf()
    )
    .slice(0, limit)
    .map((s) => s.post);
}

export function dateLocaleFor(lang: Lang): string {
  if (lang === 'zh-CN') return 'zh-CN';
  if (lang === 'zh-TW') return 'zh-TW';
  if (lang === 'fr') return 'fr-FR';
  if (lang === 'ru') return 'ru-RU';
  return 'en-GB';
}
