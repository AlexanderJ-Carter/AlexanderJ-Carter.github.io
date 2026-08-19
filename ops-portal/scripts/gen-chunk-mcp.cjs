const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'dist');
const chunks = JSON.parse(fs.readFileSync(path.join(root, 'help-chunks.json'), 'utf8'));
const ns = '751919123ae14c818d74100a6f385931';

for (let i = 0; i < chunks.length; i++) {
  const code = `async () => {
  return cloudflare.request({
    method: 'PUT',
    path: '/accounts/' + accountId + '/storage/kv/namespaces/${ns}/values/__deploy_help_${i}',
    body: ${JSON.stringify(chunks[i])},
    contentType: 'text/plain',
    rawBody: true,
  });
}`;
  fs.writeFileSync(path.join(root, `mcp-chunk-${i}.txt`), code);
  console.log('wrote', i, code.length);
}

const assemble = `async () => {
  const ns = '${ns}';
  const parts = [];
  for (let i = 0; i < ${chunks.length}; i++) {
    const res = await cloudflare.request({
      method: 'GET',
      path: '/accounts/' + accountId + '/storage/kv/namespaces/' + ns + '/values/__deploy_help_' + i,
    });
    const text = typeof res.result === 'string' ? res.result : String(res.result || '');
    if (!text) throw new Error('missing_chunk_' + i);
    parts.push(text);
  }
  const b64 = parts.join('');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const script = new TextDecoder().decode(bytes);
  const b = 'F' + Date.now();
  const metadata = {
    main_module: 'worker.js',
    compatibility_date: '2026-08-01',
    bindings: [{ type: 'kv_namespace', name: 'HELP_RATE', namespace_id: ns }],
  };
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
  const put = await cloudflare.request({
    method: 'PUT',
    path: '/accounts/' + accountId + '/workers/scripts/site-help',
    body,
    contentType: 'multipart/form-data; boundary=' + b,
    rawBody: true,
  });
  for (let i = 0; i < ${chunks.length}; i++) {
    await cloudflare.request({
      method: 'DELETE',
      path: '/accounts/' + accountId + '/storage/kv/namespaces/' + ns + '/values/__deploy_help_' + i,
    });
  }
  return {
    putOk: !!(put && put.success),
    status: put && put.status,
    errors: put && put.errors,
    b64len: b64.length,
    scriptLen: script.length,
    has8: script.includes('perMinute: 8'),
    has40: script.includes('perHour: 40'),
  };
}`;
fs.writeFileSync(path.join(root, 'mcp-assemble-deploy.txt'), assemble);
console.log('assemble_len', assemble.length);
