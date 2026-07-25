/**
 * Minimal upload helper. Requires CLOUDFLARE_API_TOKEN.
 * Usage: node scripts/upload-legacy-redirect.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID =
  process.env.CLOUDFLARE_ACCOUNT_ID || '863301424d2b2a32561bb2c5cdb640ed';

if (!TOKEN) {
  console.error('Missing CLOUDFLARE_API_TOKEN');
  process.exit(1);
}

const root = dirname(fileURLToPath(import.meta.url));
const script = readFileSync(
  join(root, '../workers/legacy-redirect/src/index.js'),
  'utf8'
);

const boundary = `----CFWorker${Date.now()}`;
const metadata = JSON.stringify({
  main_module: 'index.js',
  compatibility_date: '2025-07-25',
});

const body = [
  `--${boundary}`,
  'Content-Disposition: form-data; name="metadata"',
  'Content-Type: application/json',
  '',
  metadata,
  `--${boundary}`,
  'Content-Disposition: form-data; name="index.js"; filename="index.js"',
  'Content-Type: application/javascript+module',
  '',
  script,
  `--${boundary}--`,
  '',
].join('\r\n');

const res = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/legacy-redirect`,
  {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
    },
    body,
  }
);

const json = await res.json();
if (!json.success) {
  console.error(JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log('Uploaded legacy-redirect', json.result?.id || 'ok');
