const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'dist');
const ops = fs.readFileSync(path.join(root, 'ops.b64'), 'utf8');
const help = fs.readFileSync(path.join(root, 'help.b64'), 'utf8');

function make(name, b64, bindings) {
  return `async () => {
  const bin = atob(${JSON.stringify(b64)});
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const script = new TextDecoder().decode(bytes);
  const b = 'F' + Date.now();
  const metadata = ${JSON.stringify({
    main_module: 'worker.js',
    compatibility_date: '2026-08-01',
    bindings,
  })};
  const body = [
    '--' + b,
    'Content-Disposition: form-data; name="metadata"',
    'Content-Type: application/json',
    '',
    JSON.stringify(metadata),
    '--' + b,
    'Content-Disposition: form-data; name="worker.js"; filename="worker.js"',
    'Content-Type: application/javascript+module',
    '',
    script,
    '--' + b + '--',
  ].join('\\r\\n');
  return cloudflare.request({
    method: 'PUT',
    path: '/accounts/' + accountId + '/workers/scripts/${name}',
    body,
    contentType: 'multipart/form-data; boundary=' + b,
    rawBody: true,
  });
}`;
}

fs.writeFileSync(
  path.join(root, 'mcp-ops-only.txt'),
  make('ops-portal', ops, [
    {
      type: 'kv_namespace',
      name: 'OPS_STATE',
      namespace_id: 'bcf41fb0cfc4474988c90ae2bf31de23',
    },
  ])
);
fs.writeFileSync(
  path.join(root, 'mcp-help-only.txt'),
  make('site-help', help, [
    {
      type: 'kv_namespace',
      name: 'HELP_RATE',
      namespace_id: '751919123ae14c818d74100a6f385931',
    },
  ])
);
console.log('wrote split deploy scripts');
