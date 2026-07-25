import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const script = readFileSync(
  join(root, 'workers/legacy-redirect/src/index.js'),
  'utf8'
);
const b64 = Buffer.from(script).toString('base64');

const code = `async () => {
  const b64 = ${JSON.stringify(b64)};
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const script = new TextDecoder().decode(bytes);
  const b = "--F" + Date.now();
  const metadata = JSON.stringify({
    main_module: "index.js",
    compatibility_date: "2025-07-25",
  });
  const body = [
    "--" + b,
    'Content-Disposition: form-data; name="metadata"',
    "Content-Type: application/json",
    "",
    metadata,
    "--" + b,
    'Content-Disposition: form-data; name="index.js"; filename="index.js"',
    "Content-Type: application/javascript+module",
    "",
    script,
    "--" + b + "--",
  ].join("\\r\\n");
  return cloudflare.request({
    method: "PUT",
    path: "/accounts/" + accountId + "/workers/scripts/legacy-redirect",
    body,
    contentType: "multipart/form-data; boundary=" + b,
    rawBody: true,
  });
}`;

writeFileSync(join(root, 'scripts/_mcp_deploy_code.txt'), code);
console.log('wrote', code.length, 'chars');
