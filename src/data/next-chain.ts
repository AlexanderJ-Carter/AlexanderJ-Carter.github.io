import type { Lang } from '../i18n/types';

export type NextRoomId = 'signal' | 'exposure' | 'atlas' | 'echo';

export type NextRoomCopy = {
  id: NextRoomId;
  path: string;
  title: string;
  tease: string;
  continueHint: string;
};

export type NextChromeCopy = {
  brand: string;
  beta: string;
  hub: string;
  prev: string;
  next: string;
  roomsLabel: string;
};

const order: NextRoomId[] = ['signal', 'exposure', 'atlas', 'echo'];

const roomsByLang: Record<Lang, NextRoomCopy[]> = {
  'zh-CN': [
    {
      id: 'signal',
      path: '/next/signal',
      title: '信号场',
      tease: '磷光残影，光标即曝光。',
      continueHint: '光线还在等——去曝光笔记',
    },
    {
      id: 'exposure',
      path: '/next/exposure',
      title: '曝光笔记',
      tease: '等待光线时，世界会慢下来。',
      continueHint: '把它钉在坐标上——打开星图',
    },
    {
      id: 'atlas',
      path: '/next/atlas',
      title: '坐标图',
      tease: '把站点主题摊成一张蓝图。',
      continueHint: '对终端说句话——进入回声',
    },
    {
      id: 'echo',
      path: '/next/echo',
      title: '回声台',
      tease: '输入暗号，站点会回话。',
      continueHint: '信号重新点亮——回到信号场',
    },
  ],
  'zh-TW': [
    {
      id: 'signal',
      path: '/next/signal',
      title: '信號場',
      tease: '磷光殘影，游標即曝光。',
      continueHint: '光線還在等——去曝光筆記',
    },
    {
      id: 'exposure',
      path: '/next/exposure',
      title: '曝光筆記',
      tease: '等待光線時，世界會慢下來。',
      continueHint: '把它釘在座標上——打開星圖',
    },
    {
      id: 'atlas',
      path: '/next/atlas',
      title: '座標圖',
      tease: '把站點主題攤成一張藍圖。',
      continueHint: '對終端說句話——進入回聲',
    },
    {
      id: 'echo',
      path: '/next/echo',
      title: '回聲台',
      tease: '輸入暗號，站點會回話。',
      continueHint: '信號重新點亮——回到信號場',
    },
  ],
  'en-GB': [
    {
      id: 'signal',
      path: '/next/signal',
      title: 'Signal',
      tease: 'Phosphor trails — the cursor is the shutter.',
      continueHint: 'Light is still waiting — open Exposure',
    },
    {
      id: 'exposure',
      path: '/next/exposure',
      title: 'Exposure',
      tease: 'While you wait for light, the world slows.',
      continueHint: 'Pin it on a map — open Atlas',
    },
    {
      id: 'atlas',
      path: '/next/atlas',
      title: 'Atlas',
      tease: 'Site themes laid out as a blueprint.',
      continueHint: 'Speak to the terminal — enter Echo',
    },
    {
      id: 'echo',
      path: '/next/echo',
      title: 'Echo',
      tease: 'Type a passphrase; the site answers.',
      continueHint: 'Relight the phosphor — back to Signal',
    },
  ],
  fr: [
    {
      id: 'signal',
      path: '/next/signal',
      title: 'Signal',
      tease: 'Traînées phosphore — le curseur est l’obturateur.',
      continueHint: 'La lumière attend encore — ouvrir Exposition',
    },
    {
      id: 'exposure',
      path: '/next/exposure',
      title: 'Exposition',
      tease: 'En attendant la lumière, le monde ralentit.',
      continueHint: 'L’épingler sur la carte — ouvrir Atlas',
    },
    {
      id: 'atlas',
      path: '/next/atlas',
      title: 'Atlas',
      tease: 'Les thèmes du site en plan bleu.',
      continueHint: 'Parler au terminal — entrer Écho',
    },
    {
      id: 'echo',
      path: '/next/echo',
      title: 'Écho',
      tease: 'Tapez un mot de passe ; le site répond.',
      continueHint: 'Rallumer le phosphore — retour Signal',
    },
  ],
  ru: [
    {
      id: 'signal',
      path: '/next/signal',
      title: 'Сигнал',
      tease: 'Фосфорный след — курсор как затвор.',
      continueHint: 'Свет всё ещё ждёт — к Экспозиции',
    },
    {
      id: 'exposure',
      path: '/next/exposure',
      title: 'Экспозиция',
      tease: 'Пока ждёшь свет, мир замедляется.',
      continueHint: 'Закрепить на карте — открыть Атлас',
    },
    {
      id: 'atlas',
      path: '/next/atlas',
      title: 'Атлас',
      tease: 'Темы сайта как чертёж.',
      continueHint: 'Скажи терминалу — войди в Эхо',
    },
    {
      id: 'echo',
      path: '/next/echo',
      title: 'Эхо',
      tease: 'Введи пароль — сайт ответит.',
      continueHint: 'Снова зажечь фосфор — к Сигналу',
    },
  ],
};

const chromeByLang: Record<Lang, NextChromeCopy> = {
  'zh-CN': {
    brand: 'NEXT',
    beta: 'BETA',
    hub: '实验大厅',
    prev: '上一站',
    next: '下一站',
    roomsLabel: '房间',
  },
  'zh-TW': {
    brand: 'NEXT',
    beta: 'BETA',
    hub: '實驗大廳',
    prev: '上一站',
    next: '下一站',
    roomsLabel: '房間',
  },
  'en-GB': {
    brand: 'NEXT',
    beta: 'BETA',
    hub: 'Lobby',
    prev: 'Previous',
    next: 'Next',
    roomsLabel: 'Rooms',
  },
  fr: {
    brand: 'NEXT',
    beta: 'BETA',
    hub: 'Hall',
    prev: 'Précédent',
    next: 'Suivant',
    roomsLabel: 'Salles',
  },
  ru: {
    brand: 'NEXT',
    beta: 'BETA',
    hub: 'Холл',
    prev: 'Назад',
    next: 'Далее',
    roomsLabel: 'Комнаты',
  },
};

export function getNextRooms(lang: Lang): NextRoomCopy[] {
  return roomsByLang[lang];
}

export function getNextChrome(lang: Lang): NextChromeCopy {
  return chromeByLang[lang];
}

export function getNextRoom(
  lang: Lang,
  id: NextRoomId
): NextRoomCopy | undefined {
  return roomsByLang[lang].find((r) => r.id === id);
}

export function getAdjacentRooms(
  lang: Lang,
  id: NextRoomId
): { prev: NextRoomCopy; next: NextRoomCopy; index: number; total: number } {
  const rooms = roomsByLang[lang];
  const index = order.indexOf(id);
  const total = order.length;
  const prev = rooms[(index - 1 + total) % total];
  const next = rooms[(index + 1) % total];
  return { prev, next, index, total };
}

export const NEXT_ROOM_ORDER = order;

export type AtlasNode = {
  id: string;
  x: number;
  y: number;
  href: string;
  external?: boolean;
};

/** Geometry shared across languages; labels live in the template / registry. */
export const atlasNodes: AtlasNode[] = [
  { id: 'signal', x: 18, y: 26, href: '/next/signal' },
  { id: 'exposure', x: 42, y: 16, href: '/next/exposure' },
  { id: 'echo', x: 68, y: 24, href: '/next/echo' },
  { id: 'network', x: 88, y: 38, href: '/network' },
  { id: 'gallery', x: 24, y: 52, href: '/gallery' },
  { id: 'writing', x: 48, y: 48, href: '/writing' },
  { id: 'fun', x: 72, y: 56, href: '/fun' },
  { id: 'tools', x: 36, y: 74, href: '/tools' },
  {
    id: 'lab',
    x: 58,
    y: 78,
    href: 'https://lab.alexander.xin',
    external: true,
  },
  {
    id: 'cook',
    x: 80,
    y: 72,
    href: 'https://cook.alexander.xin',
    external: true,
  },
  {
    id: 'paste',
    x: 14,
    y: 82,
    href: 'https://paste.alexander.xin',
    external: true,
  },
];
