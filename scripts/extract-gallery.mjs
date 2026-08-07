import fs from 'node:fs';
import vm from 'node:vm';

const src = fs.readFileSync('src/components/templates/GalleryTemplate.astro', 'utf8');
const start = src.indexOf('const categoriesData');
const end = src.indexOf('\nconst categories = categoriesData');
const block = src.slice(start, end);
const sourceStart = src.indexOf('const sourceText:');
const sourceEnd = src.indexOf('\nconst sourceUi = sourceText');
const sourceBlock = src.slice(sourceStart, sourceEnd);

const sandbox = {};
const wrapped = block
  .replace(/const categoriesData:[\s\S]*?= \{/, 'var categoriesData = {')
  .replace(/const galleryItemsData:[\s\S]*?= \{/, 'var galleryItemsData = {');
const sourceWrapped = sourceBlock.replace(
  /const sourceText:[\s\S]*?= \{/,
  'var sourceText = {'
);
vm.runInNewContext(
  wrapped +
    '; ' +
    sourceWrapped +
    '; categoriesData=categoriesData; galleryItemsData=galleryItemsData; sourceText=sourceText;',
  sandbox
);

const { categoriesData, galleryItemsData, sourceText } = sandbox;
const langs = ['zh-CN', 'zh-TW', 'en-GB', 'fr', 'ru'];
const base = galleryItemsData['zh-CN'];
const merged = base.map((item, i) => {
  const copy = {};
  for (const lang of langs) {
    const row = galleryItemsData[lang][i];
    if (!row || row.id !== item.id) {
      throw new Error(`mismatch at ${i} ${lang}`);
    }
    copy[lang] = { title: row.title, description: row.description };
  }
  return { id: item.id, category: item.category, image: item.image, copy };
});

const header = `import type { Lang } from '../i18n/types';

export type GalleryCategory = { id: string; label: string };

export type GalleryItem = {
  id: number;
  category: string;
  image: string;
  copy: Record<Lang, { title: string; description: string }>;
};

export const galleryCategories: Record<Lang, GalleryCategory[]> = ${JSON.stringify(categoriesData, null, 2)};

export const galleryItems: GalleryItem[] = ${JSON.stringify(merged, null, 2)};

export const gallerySourceUi: Record<
  Lang,
  {
    title: string;
    all: string;
    local: string;
    remote: string;
    localTag: string;
    remoteTag: string;
    note: string;
  }
> = ${JSON.stringify(sourceText, null, 2)};

export function getGalleryCategories(lang: Lang): GalleryCategory[] {
  return galleryCategories[lang] ?? galleryCategories['en-GB'];
}

export function getGalleryItems(lang: Lang) {
  return galleryItems.map((item) => ({
    id: item.id,
    category: item.category,
    image: item.image,
    title: item.copy[lang]?.title ?? item.copy['en-GB'].title,
    description: item.copy[lang]?.description ?? item.copy['en-GB'].description,
  }));
}

export function getGallerySourceUi(lang: Lang) {
  return gallerySourceUi[lang] ?? gallerySourceUi['en-GB'];
}
`;

fs.writeFileSync('src/data/gallery.ts', header);
console.log('gallery.ts written', merged.length, 'items');
