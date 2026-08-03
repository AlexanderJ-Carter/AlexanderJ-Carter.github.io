/**
 * Ops portal Worker — fleet ops home + read-only status behind Access.
 * UI HTML is fetched from the www mirror so cards/icons can update without redeploy.
 */

type Probe = {
  id: string;
  url: string;
  ok: boolean;
  status: number;
  ms: number;
};

const PROBES: Array<{ id: string; url: string }> = [
  { id: 'apex', url: 'https://alexander.xin/' },
  { id: 'www', url: 'https://www.alexander.xin/' },
  { id: 'identity', url: 'https://id.alexander.xin/healthz' },
  { id: 'time-api', url: 'https://api.alexander.xin/time/now' },
  { id: 'tools-hub', url: 'https://tools.alexander.xin/' },
  { id: 'paste', url: 'https://paste.alexander.xin/' },
  // Apex GitHub Pages may lag deploys; www mirror is the live server copy.
  { id: 'network-json', url: 'https://www.alexander.xin/network.json' },
];

const UI_URL = 'https://www.alexander.xin/ops/index.html';

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

async function statusJson(): Promise<Response> {
  const results = await Promise.all(
    PROBES.map((p) =>
      probeOne(p.id, p.url).catch(
        (): Probe => ({
          id: p.id,
          url: p.url,
          ok: false,
          status: 0,
          ms: 0,
        })
      )
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

async function homeHtml(): Promise<Response> {
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

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/status') return statusJson();
    return homeHtml();
  },
};
