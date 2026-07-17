/**
 * Curated “on this day” notes — used when network APIs are unavailable.
 * Prefer exact month/day match; otherwise any event in the same month.
 */
export type OnThisDayEvent = {
  month: number;
  day: number;
  year: string;
  zh: string;
  en: string;
};

export const onThisDayEvents: OnThisDayEvent[] = [
  {
    month: 1,
    day: 1,
    year: '1912',
    zh: '中华民国成立，孙中山在南京就任临时大总统。',
    en: 'The Republic of China is proclaimed; Sun Yat-sen becomes provisional president in Nanjing.',
  },
  {
    month: 1,
    day: 15,
    year: '1919',
    zh: '波士顿糖蜜洪水：大量糖蜜罐破裂，造成严重伤亡。',
    en: 'The Great Molasses Flood devastates Boston’s North End.',
  },
  {
    month: 2,
    day: 11,
    year: '1990',
    zh: '纳尔逊·曼德拉获释，开启南非民主转型的重要一页。',
    en: 'Nelson Mandela is released from prison after 27 years.',
  },
  {
    month: 3,
    day: 14,
    year: '1879',
    zh: '阿尔伯特·爱因斯坦出生于乌尔姆。',
    en: 'Albert Einstein is born in Ulm, Germany.',
  },
  {
    month: 4,
    day: 12,
    year: '1961',
    zh: '尤里·加加林成为首位进入太空的人类。',
    en: 'Yuri Gagarin becomes the first human in space.',
  },
  {
    month: 5,
    day: 4,
    year: '1919',
    zh: '五四运动在北京爆发，深刻影响中国近现代思想与政治。',
    en: 'The May Fourth Movement begins in Beijing.',
  },
  {
    month: 6,
    day: 4,
    year: '1989',
    zh: '波兰举行部分自由选举，东欧剧变加速。',
    en: 'Poland holds partly free elections, accelerating change in Eastern Europe.',
  },
  {
    month: 7,
    day: 1,
    year: '1997',
    zh: '香港回归中国，中华人民共和国对香港恢复行使主权。',
    en: 'Hong Kong is returned to Chinese sovereignty.',
  },
  {
    month: 7,
    day: 16,
    year: '1969',
    zh: '阿波罗11号发射，人类即将首次登月。',
    en: 'Apollo 11 launches, beginning the first crewed Moon landing mission.',
  },
  {
    month: 7,
    day: 17,
    year: '1918',
    zh: '末代沙皇尼古拉二世一家在叶卡捷琳堡遇害。',
    en: 'Tsar Nicholas II and his family are executed in Yekaterinburg.',
  },
  {
    month: 7,
    day: 17,
    year: '1975',
    zh: '阿波罗—联盟测试计划：美苏飞船在轨对接，冷战中的太空合作象征。',
    en: 'Apollo–Soyuz: US and Soviet spacecraft dock in orbit.',
  },
  {
    month: 7,
    day: 20,
    year: '1969',
    zh: '阿姆斯特朗与奥尔德林登上月球。',
    en: 'Armstrong and Aldrin walk on the Moon.',
  },
  {
    month: 8,
    day: 6,
    year: '1945',
    zh: '美国在广岛投下原子弹。',
    en: 'An atomic bomb is dropped on Hiroshima.',
  },
  {
    month: 9,
    day: 1,
    year: '1939',
    zh: '德国入侵波兰，第二次世界大战全面爆发。',
    en: 'Germany invades Poland; World War II begins in Europe.',
  },
  {
    month: 10,
    day: 1,
    year: '1949',
    zh: '中华人民共和国成立，开国大典在北京天安门举行。',
    en: 'The People’s Republic of China is founded in Beijing.',
  },
  {
    month: 10,
    day: 24,
    year: '1945',
    zh: '联合国宪章生效，联合国正式成立。',
    en: 'The United Nations Charter comes into force.',
  },
  {
    month: 11,
    day: 9,
    year: '1989',
    zh: '柏林墙开放，冷战格局开始瓦解。',
    en: 'The Berlin Wall is opened.',
  },
  {
    month: 12,
    day: 17,
    year: '1903',
    zh: '莱特兄弟完成首次受控动力飞行。',
    en: 'The Wright brothers achieve the first powered, controlled flight.',
  },
  {
    month: 12,
    day: 25,
    year: '1991',
    zh: '苏联国旗降下，苏联正式解体。',
    en: 'The Soviet Union is dissolved.',
  },
];

export function pickOnThisDay(
  month: number,
  day: number
): OnThisDayEvent | null {
  const exact = onThisDayEvents.filter(
    (e) => e.month === month && e.day === day
  );
  if (exact.length > 0) {
    return exact[Math.floor(Math.random() * exact.length)]!;
  }
  const sameMonth = onThisDayEvents.filter((e) => e.month === month);
  if (sameMonth.length > 0) {
    return sameMonth[Math.floor(Math.random() * sameMonth.length)]!;
  }
  if (onThisDayEvents.length === 0) return null;
  return onThisDayEvents[Math.floor(Math.random() * onThisDayEvents.length)]!;
}
