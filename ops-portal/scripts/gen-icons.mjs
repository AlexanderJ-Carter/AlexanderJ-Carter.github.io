import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dirs = [
  path.join(root, 'public/img/ops'),
  path.join(root, 'ops-portal/public/icons'),
];

for (const d of dirs) fs.mkdirSync(d, { recursive: true });

function frame(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a2233"/>
      <stop offset="100%" stop-color="#0b0d12"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#g)"/>
  <rect x="1.5" y="1.5" width="125" height="125" rx="26.5" fill="none" stroke="#2a3142" stroke-width="3"/>
  ${inner}
  <line x1="36" y1="104" x2="92" y2="104" stroke="#e8c478" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
</svg>
`;
}

const icons = {
  'ops-portal': frame(`
  <rect x="34" y="34" width="24" height="24" rx="5" fill="none" stroke="#e8e2d4" stroke-width="3"/>
  <rect x="70" y="34" width="24" height="24" rx="5" fill="none" stroke="#e8c478" stroke-width="3"/>
  <rect x="34" y="70" width="24" height="24" rx="5" fill="none" stroke="#e8c478" stroke-width="3"/>
  <rect x="70" y="70" width="24" height="24" rx="5" fill="none" stroke="#e8e2d4" stroke-width="3"/>
`),
  'pocket-id': frame(`
  <circle cx="64" cy="52" r="16" fill="none" stroke="#e8e2d4" stroke-width="3"/>
  <path d="M48 88c4-14 12-20 16-20s12 6 16 20" fill="none" stroke="#e8e2d4" stroke-width="3" stroke-linecap="round"/>
  <circle cx="64" cy="52" r="4" fill="#e8c478"/>
`),
  gitea: frame(`
  <path d="M40 78 V48 L64 34 L88 48 V78 L64 92 Z" fill="none" stroke="#e8e2d4" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="64" cy="58" r="7" fill="none" stroke="#e8c478" stroke-width="3"/>
  <path d="M64 65 V78" stroke="#e8c478" stroke-width="3" stroke-linecap="round"/>
`),
  portainer: frame(`
  <rect x="36" y="40" width="56" height="44" rx="6" fill="none" stroke="#e8e2d4" stroke-width="3"/>
  <path d="M44 52h40M44 64h28M44 76h34" stroke="#e8c478" stroke-width="3" stroke-linecap="round"/>
  <circle cx="84" cy="64" r="3" fill="#e8c478"/>
`),
  'nginx-ui': frame(`
  <path d="M34 78 L52 40 H64 L46 78 Z" fill="none" stroke="#e8e2d4" stroke-width="3" stroke-linejoin="round"/>
  <path d="M54 78 L72 40 H84 L66 78 Z" fill="none" stroke="#e8c478" stroke-width="3" stroke-linejoin="round"/>
  <path d="M74 78 L88 52 H96 L82 78 Z" fill="none" stroke="#e8e2d4" stroke-width="3" stroke-linejoin="round" opacity="0.7"/>
`),
  ssh: frame(`
  <rect x="30" y="36" width="68" height="52" rx="8" fill="none" stroke="#e8e2d4" stroke-width="3"/>
  <path d="M42 54l10 8-10 8" fill="none" stroke="#e8c478" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M58 70h22" stroke="#e8e2d4" stroke-width="3.5" stroke-linecap="round"/>
`),
  access: frame(`
  <circle cx="64" cy="64" r="28" fill="none" stroke="#e8e2d4" stroke-width="3"/>
  <circle cx="64" cy="64" r="10" fill="none" stroke="#e8c478" stroke-width="3"/>
  <path d="M64 36v10M64 82v10M36 64h10M82 64h10" stroke="#e8c478" stroke-width="3" stroke-linecap="round"/>
`),
  network: frame(`
  <circle cx="40" cy="48" r="7" fill="none" stroke="#e8e2d4" stroke-width="3"/>
  <circle cx="88" cy="48" r="7" fill="none" stroke="#e8e2d4" stroke-width="3"/>
  <circle cx="64" cy="84" r="7" fill="none" stroke="#e8c478" stroke-width="3"/>
  <path d="M46 52 L58 76 M82 52 L70 76 M47 48 H81" fill="none" stroke="#e8e2d4" stroke-width="2.5" opacity="0.85"/>
`),
  tools: frame(`
  <path d="M48 42c8-8 18-8 22-4l-12 12 8 8 12-12c4 4 4 14-4 22-6 6-14 8-20 6l10-10-8-8-10 10c-2-6 0-14 6-20z" fill="none" stroke="#e8e2d4" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="78" cy="78" r="10" fill="none" stroke="#e8c478" stroke-width="3"/>
`),
  paste: frame(`
  <rect x="42" y="34" width="44" height="56" rx="6" fill="none" stroke="#e8e2d4" stroke-width="3"/>
  <rect x="52" y="30" width="24" height="10" rx="3" fill="none" stroke="#e8c478" stroke-width="2.5"/>
  <path d="M52 56h24M52 68h18M52 80h22" stroke="#e8e2d4" stroke-width="3" stroke-linecap="round"/>
`),
  www: frame(`
  <circle cx="64" cy="60" r="26" fill="none" stroke="#e8e2d4" stroke-width="3"/>
  <ellipse cx="64" cy="60" rx="12" ry="26" fill="none" stroke="#e8c478" stroke-width="2.5"/>
  <path d="M40 60h48M44 48h40M44 72h40" stroke="#e8e2d4" stroke-width="2" opacity="0.7"/>
`),
};

for (const [name, svg] of Object.entries(icons)) {
  for (const d of dirs) {
    fs.writeFileSync(path.join(d, `${name}.svg`), svg);
  }
}

console.log(`wrote ${Object.keys(icons).length} icons → ${dirs.join(', ')}`);
