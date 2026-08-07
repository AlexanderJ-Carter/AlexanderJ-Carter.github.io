import fs from 'node:fs';

const path = 'src/components/templates/TimelineTemplate.astro';
const content = fs.readFileSync(path, 'utf8');
const marker = '<BaseLayout title={content.title}';
const idx = content.indexOf(marker);
if (idx < 0) throw new Error('marker not found');
const tail = content.slice(idx);
const head = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PageHero from '../chrome/PageHero.astro';
import { timelineData } from '../../i18n/pages/timeline';

const { lang } = Astro.props;
type Lang = 'zh-CN' | 'zh-TW' | 'en-GB' | 'fr' | 'ru';

function getLangPath(path: string) {
  if (lang === 'zh-CN') return path;
  const prefix = lang === 'en-GB' ? 'en' : lang;
  return \`/\${prefix}\${path}\`;
}

const content = timelineData[lang as Lang] || timelineData['en-GB'];
---
`;
fs.writeFileSync(path, head + tail);
console.log('TimelineTemplate refactored');
