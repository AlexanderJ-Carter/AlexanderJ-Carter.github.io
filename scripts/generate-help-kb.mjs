/**
 * Write public/help/kb.json from src/data/help-kb.ts via dynamic import.
 * Run as: node --experimental-strip-types scripts/generate-help-kb.mjs
 * Fallback: evaluate a duplicated JSON write if strip-types unavailable.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'help');
const outFile = path.join(outDir, 'kb.json');

async function loadKb() {
  const tsPath = path.join(root, 'src', 'data', 'help-kb.ts');
  try {
    const mod = await import(pathToFileURL(tsPath).href);
    return mod.helpKb;
  } catch {
    // Node without strip-types: read and eval export object
    const raw = fs.readFileSync(tsPath, 'utf8');
    const match = raw.match(/export const helpKb = (\{[\s\S]*\});\s*$/);
    if (!match) throw new Error('Cannot parse help-kb.ts');
    return Function(`"use strict"; return (${match[1]})`)();
  }
}

const kb = await loadKb();
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(kb, null, 2) + '\n', 'utf8');
console.log('[generate-help-kb] wrote', path.relative(root, outFile));
