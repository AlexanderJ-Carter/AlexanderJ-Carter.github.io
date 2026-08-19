/**
 * Ops portal Worker — fleet home, probes, cron alerts.
 * UI HTML from www mirror; state in OPS_STATE KV; email via Resend when configured.
 */

type Env = {
  OPS_STATE?: KVNamespace;
  RESEND_API_KEY?: string;
  ALERT_FROM?: string;
  ALERT_TO?: string;
};

type Probe = {
  id: string;
  url: string;
  ok: boolean;
  status: number;
  ms: number;
};

type ProbeSnapshot = Record<string, boolean>;

const PROBES: Array<{ id: string; url: string }> = [
  { id: 'apex', url: 'https://alexander.xin/' },
  { id: 'www', url: 'https://www.alexander.xin/' },
  { id: 'blog', url: 'https://blog.alexander.xin/writing/' },
  { id: 'identity', url: 'https://id.alexander.xin/healthz' },
  { id: 'time-api', url: 'https://api.alexander.xin/time/now' },
  { id: 'tools-hub', url: 'https://tools.alexander.xin/' },
  { id: 'paste', url: 'https://paste.alexander.xin/' },
  { id: 'cook', url: 'https://cook.alexander.xin/' },
  { id: 'lab', url: 'https://lab.alexander.xin/' },
  { id: 'network-json', url: 'https://www.alexander.xin/network.json' },
];

const UI_URL = 'https://www.alexander.xin/ops/index.html';
const FLEET_LOG_URL = 'https://www.alexander.xin/ops/fleet-changelog.json';
const STATE_KEY = 'probe-ok-v1';

function securityHeaders(extra: HeadersInit = {}): Headers {
  const headers = new Headers(extra);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  return headers;
}

async function probeOne(id: string, url: string): Promise<Probe> {
  const started = Date.now();
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: { 'User-Agent': 'ops-portal-status/1.0' },
  });
  return {
    id,
    url,
    ok: res.ok,
    status: res.status,
    ms: Date.now() - started,
  };
}

async function runProbes(): Promise<Probe[]> {
  return Promise.all(
    PROBES.map((p) =>
      probeOne(p.id, p.url).catch((): Probe => ({
        id: p.id,
        url: p.url,
        ok: false,
        status: 0,
        ms: 0,
      }))
    )
  );
}

function snapshotOf(probes: Probe[]): ProbeSnapshot {
  const snap: ProbeSnapshot = {};
  for (const p of probes) snap[p.id] = p.ok;
  return snap;
}

async function sendAlertEmail(
  env: Env,
  subject: string,
  text: string
): Promise<{ sent: boolean; reason?: string }> {
  const key = env.RESEND_API_KEY?.trim();
  const to = (env.ALERT_TO || '2253940186@qq.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const from = env.ALERT_FROM?.trim() || 'Ops Portal <noreply@alexander.xin>';
  if (!key) return { sent: false, reason: 'RESEND_API_KEY missing' };
  if (!to.length) return { sent: false, reason: 'ALERT_TO empty' };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) {
    const body = await res.text();
    return {
      sent: false,
      reason: `Resend ${res.status}: ${body.slice(0, 200)}`,
    };
  }
  return { sent: true };
}

async function diffAndAlert(
  env: Env,
  probes: Probe[]
): Promise<{
  changes: Array<{ id: string; from: boolean | null; to: boolean }>;
  notify?: { sent: boolean; reason?: string };
}> {
  const next = snapshotOf(probes);
  const prevRaw = env.OPS_STATE
    ? await env.OPS_STATE.get(STATE_KEY, 'json')
    : null;
  const prev = (prevRaw || null) as ProbeSnapshot | null;

  const changes: Array<{ id: string; from: boolean | null; to: boolean }> = [];
  for (const id of Object.keys(next)) {
    const before = prev ? Boolean(prev[id]) : null;
    const after = next[id];
    if (before === null) continue;
    if (before !== after) changes.push({ id, from: before, to: after });
  }

  if (env.OPS_STATE) {
    await env.OPS_STATE.put(STATE_KEY, JSON.stringify(next), {
      metadata: { updatedAt: new Date().toISOString() },
    });
  }

  if (!changes.length) return { changes };

  const lines = [
    `Fleet probe changes @ ${new Date().toISOString()}`,
    '',
    ...changes.map((c) => {
      const probe = probes.find((p) => p.id === c.id);
      const arrow = c.to ? 'RECOVERED' : 'DOWN';
      return `- ${c.id}: ${arrow} (was ${c.from ? 'ok' : 'down'}) ${probe?.status ?? ''} ${probe?.url ?? ''}`;
    }),
    '',
    'Ops: https://ops.alexander.xin',
    'Network: https://alexander.xin/network/',
  ];
  const down = changes.filter((c) => !c.to).length;
  const subject =
    down > 0
      ? `[ops] ${down} probe(s) DOWN — alexander.xin fleet`
      : `[ops] probes recovered — alexander.xin fleet`;
  const notify = await sendAlertEmail(env, subject, lines.join('\n'));
  return { changes, notify };
}

async function statusJson(env: Env): Promise<Response> {
  const results = await runProbes();
  return Response.json(
    {
      generatedAt: new Date().toISOString(),
      probes: results,
      launcher: 'https://alexanderjcarter.cloudflareaccess.com',
      identity: 'https://id.alexander.xin',
      alerting: {
        kv: Boolean(env.OPS_STATE),
        resend: Boolean(env.RESEND_API_KEY?.trim()),
      },
    },
    { headers: securityHeaders({ 'Cache-Control': 'private, max-age=30' }) }
  );
}

async function homeHtml(): Promise<Response> {
  const res = await fetch(UI_URL, {
    headers: { 'User-Agent': 'ops-portal-ui/1.0' },
  });
  if (!res.ok) {
    return new Response('Ops UI unavailable', {
      status: 502,
      headers: securityHeaders(),
    });
  }
  const html = await res.text();
  return new Response(html, {
    headers: securityHeaders({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, max-age=60',
    }),
  });
}

async function fleetChangelogJson(): Promise<Response> {
  const res = await fetch(FLEET_LOG_URL, {
    headers: { 'User-Agent': 'ops-portal-ui/1.0' },
  });
  if (!res.ok) {
    return new Response('Fleet changelog unavailable', {
      status: 502,
      headers: securityHeaders(),
    });
  }
  return new Response(await res.text(), {
    headers: securityHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, max-age=60',
    }),
  });
}

async function runCheck(env: Env): Promise<Response> {
  const probes = await runProbes();
  const diff = await diffAndAlert(env, probes);
  return Response.json(
    {
      generatedAt: new Date().toISOString(),
      probes,
      ...diff,
    },
    { headers: securityHeaders() }
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/status') return statusJson(env);
    if (url.pathname === '/api/check' && request.method === 'POST') {
      return runCheck(env);
    }
    if (url.pathname === '/fleet-changelog.json') {
      return fleetChangelogJson();
    }
    return homeHtml();
  },

  async scheduled(
    _controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil(
      (async () => {
        const probes = await runProbes();
        await diffAndAlert(env, probes);
      })()
    );
  },
};
