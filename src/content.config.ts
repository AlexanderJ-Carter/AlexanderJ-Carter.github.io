import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['zh-CN', 'zh-TW', 'en-GB', 'fr', 'ru']).default('zh-CN'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    timeToRead: z.string().optional(),
  }),
});

export const collections = { writing };
