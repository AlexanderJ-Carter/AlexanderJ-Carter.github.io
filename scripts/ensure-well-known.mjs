/**
 * Copy public/.well-known into dist/well-known (no leading dot).
 * GitHub Pages Actions artifacts sometimes drop hidden directories.
 */
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'public', '.well-known');
const destHidden = join(root, 'dist', '.well-known');
const destVisible = join(root, 'dist', 'well-known');

if (!existsSync(src)) {
  console.warn('[ensure-well-known] public/.well-known missing');
  process.exit(0);
}

mkdirSync(dirname(destHidden), { recursive: true });
cpSync(src, destHidden, { recursive: true });
cpSync(src, destVisible, { recursive: true });
console.log(
  '[ensure-well-known] synced to dist/.well-known and dist/well-known'
);
