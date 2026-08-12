const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ops = fs.readFileSync(path.join(root, 'dist', 'ops.b64'), 'utf8');
const help = fs.readFileSync(path.join(root, 'dist', 'help.b64'), 'utf8');

const code = `async () => {
  const dec = (b64) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  };
  const opsScript = dec(${JSON.stringify(ops)});
  const helpScript = dec(${JSON.stringify(help)});
  const upload = async (name, script, metadata) => {
    const b = 'F' + Date.now();
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
      path: '/accounts/' + accountId + '/workers/scripts/' + name,
      body,
      contentType: 'multipart/form-data; boundary=' + b,
      rawBody: true,
    });
  };
  const opsPut = await upload('ops-portal', opsScript, {
    main_module: 'worker.js',
    bindings: [
      {
        type: 'kv_namespace',
        name: 'OPS_STATE',
        namespace_id: 'bcf41fb0cfc4474988c90ae2bf31de23',
      },
    ],
  });
  const helpPut = await upload('site-help', helpScript, {
    main_module: 'worker.js',
    bindings: [
      {
        type: 'kv_namespace',
        name: 'HELP_RATE',
        namespace_id: '751919123ae14c818d74100a6f385931',
      },
    ],
  });
  const schedules = await cloudflare.request({
    method: 'PUT',
    path: '/accounts/' + accountId + '/workers/scripts/ops-portal/schedules',
    body: [{ cron: '*/10 * * * *' }],
  });
  const zoneId = '575d1a9fc4f734e113e44a5d9edc0f8a';
  const routes = await cloudflare.request({
    method: 'GET',
    path: '/zones/' + zoneId + '/workers/routes',
  });
  const existing = (routes.result || []).map((r) => r.pattern);
  const ensureRoute = async (pattern) => {
    if (existing.includes(pattern)) return { ok: true, existed: true, pattern };
    const r = await cloudflare.request({
      method: 'POST',
      path: '/zones/' + zoneId + '/workers/routes',
      body: { pattern, script: 'site-help' },
    });
    return { ok: r.success, err: r.errors, result: r.result, pattern };
  };
  const r1 = await ensureRoute('alexander.xin/api/help');
  const r2 = await ensureRoute('alexander.xin/api/help/*');
  return {
    opsOk: opsPut.success,
    opsErr: opsPut.errors,
    helpOk: helpPut.success,
    helpErr: helpPut.errors,
    schedules: { ok: schedules.success, err: schedules.errors, result: schedules.result },
    r1,
    r2,
  };
}`;

fs.writeFileSync(path.join(root, 'dist', 'mcp-code.txt'), code);
console.log('ok', code.length);
