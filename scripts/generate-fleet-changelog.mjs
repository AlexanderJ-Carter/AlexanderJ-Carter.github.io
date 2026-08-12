/**
 * Sync public/fleet-changelog.json from src/data/fleet-changelog.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const tsPath = path.join(root, 'src', 'data', 'fleet-changelog.ts');
const outFile = path.join(root, 'public', 'fleet-changelog.json');

const mod = await import(pathToFileURL(tsPath).href);
const json = mod.toFleetChangelogJson();
fs.writeFileSync(outFile, JSON.stringify(json, null, 2) + '\n', 'utf8');
console.log('[generate-fleet-changelog] wrote', path.relative(root, outFile));
