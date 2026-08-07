import fs from 'node:fs';

const path = 'src/components/templates/GalleryTemplate.astro';
const content = fs.readFileSync(path, 'utf8');
const marker = "<BaseLayout title={t('gallery.title')}>";
const idx = content.indexOf(marker);
if (idx < 0) throw new Error('marker not found');
const tail = content.slice(idx);
const head = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { useTranslations } from '../../i18n/ui';
import {
  gallerySrcFallback,
  gallerySrcSet,
  galleryLightboxSrc,
} from '../../i18n/types';
import {
  getGalleryCategories,
  getGalleryItems,
  getGallerySourceUi,
} from '../../data/gallery';

const { lang } = Astro.props;
const t = useTranslations(lang);
type Lang = 'zh-CN' | 'zh-TW' | 'en-GB' | 'fr' | 'ru';

const categories = getGalleryCategories(lang as Lang);
const galleryItems = getGalleryItems(lang as Lang);
const sourceUi = getGallerySourceUi(lang as Lang);
---
`;
fs.writeFileSync(path, head + tail);
console.log('GalleryTemplate refactored');
