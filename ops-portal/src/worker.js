const PROBES = [
  { id: 'apex', url: 'https://alexander.xin/' },
  { id: 'www', url: 'https://www.alexander.xin/' },
  { id: 'blog', url: 'https://blog.alexander.xin/writing/' },
  { id: 'identity', url: 'https://id.alexander.xin/healthz' },
  { id: 'time-api', url: 'https://api.alexander.xin/time/now' },
  { id: 'tools-hub', url: 'https://tools.alexander.xin/' },
  { id: 'paste', url: 'https://paste.alexander.xin/' },
  { id: 'network-json', url: 'https://www.alexander.xin/network.json' },
];

const UI_URL = 'https://www.alexander.xin/ops/index.html';
const FLEET_LOG_URL = 'https://www.alexander.xin/ops/fleet-changelog.json';

async function probeOne(id, url) {
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

async function statusJson() {
  const results = await Promise.all(
    PROBES.map((p) =>
      probeOne(p.id, p.url).catch(() => ({
        id: p.id,
        url: p.url,
        ok: false,
        status: 0,
        ms: 0,
      }))
    )
  );
  return Response.json(
    {
      generatedAt: new Date().toISOString(),
      probes: results,
      launcher: 'https://alexanderjcarter.cloudflareaccess.com',
      identity: 'https://id.alexander.xin',
    },
    { headers: { 'Cache-Control': 'private, max-age=30' } }
  );
}

async function homeHtml() {
  const res = await fetch(UI_URL, {
    headers: { 'User-Agent': 'ops-portal-ui/1.0' },
  });
  if (!res.ok) {
    return new Response('Ops UI unavailable', { status: 502 });
  }
  const html = await res.text();
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, max-age=60',
    },
  });
}

async function fleetChangelogJson() {
  const res = await fetch(FLEET_LOG_URL, {
    headers: { 'User-Agent': 'ops-portal-ui/1.0' },
  });
  if (!res.ok) {
    return new Response('Fleet changelog unavailable', { status: 502 });
  }
  return new Response(await res.text(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, max-age=60',
    },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/api/status') return statusJson();
    if (url.pathname === '/fleet-changelog.json') return fleetChangelogJson();
    return homeHtml();
  },
};
