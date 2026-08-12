/**
 * Sync fleet changelog JSON for Ops Portal only (not public apex).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const tsPath = path.join(root, 'src', 'data', 'fleet-changelog.ts');
const outs = [
  path.join(root, 'ops-portal', 'public', 'fleet-changelog.json'),
  path.join(root, 'public', 'ops', 'fleet-changelog.json'),
];
const legacyPublic = path.join(root, 'public', 'fleet-changelog.json');

const mod = await import(pathToFileURL(tsPath).href);
const json = mod.toFleetChangelogJson();
const body = JSON.stringify(json, null, 2) + '\n';
for (const outFile of outs) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, body, 'utf8');
  console.log('[generate-fleet-changelog] wrote', path.relative(root, outFile));
}
if (fs.existsSync(legacyPublic)) {
  fs.unlinkSync(legacyPublic);
  console.log(
    '[generate-fleet-changelog] removed',
    path.relative(root, legacyPublic)
  );
}
