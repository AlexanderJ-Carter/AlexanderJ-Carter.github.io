import fs from 'node:fs';
import vm from 'node:vm';

const src = fs.readFileSync('src/components/templates/TimelineTemplate.astro', 'utf8');
const start = src.indexOf('const timelineData:');
const end = src.indexOf('const content = timelineData');
const block = src.slice(start, end).replace(
  /const timelineData:[\s\S]*?= \{/,
  'var timelineData = {'
);

const sandbox = {};
vm.runInNewContext(block + '; timelineData=timelineData;', sandbox);

const header = `import type { Lang } from '../types';

export type TimelineEvent = {
  year: number | string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tags?: string[];
};

export type TimelineCopy = {
  title: string;
  description: string;
  tag: string;
  headerTitle: string;
  headerDesc: string;
  back: string;
  presentLabel: string;
  events: TimelineEvent[];
};

export const timelineData: Record<Lang, TimelineCopy> = ${JSON.stringify(sandbox.timelineData, null, 2)};
`;

fs.writeFileSync('src/i18n/pages/timeline.ts', header);
console.log('timeline.ts synced');
