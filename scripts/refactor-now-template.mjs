import fs from 'node:fs';

const path = 'src/components/templates/NowTemplate.astro';
const content = fs.readFileSync(path, 'utf8');
const marker = '---\n\n<BaseLayout title={text.title}';
const idx = content.indexOf(marker);
if (idx < 0) throw new Error('marker not found');
const tail = content.slice(idx + 4);
const head = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PageHero from '../chrome/PageHero.astro';
import RelatedTools from '../chrome/RelatedTools.astro';
import WeatherWidget from '../widgets/WeatherWidget.astro';
import { t as nowCopy } from '../../i18n/pages/now';

const { lang } = Astro.props;
type Lang = 'zh-CN' | 'zh-TW' | 'en-GB' | 'fr' | 'ru';

const text = nowCopy[lang as Lang] || nowCopy['zh-CN'];

function getLangPath(path: string): string {
  if (lang === 'zh-CN') return path;
  const prefix = (lang as string) === 'en-GB' ? 'en' : lang;
  return \`/\${prefix}\${path}\`;
}
---
`;
fs.writeFileSync(path, head + tail);
console.log('NowTemplate refactored');
