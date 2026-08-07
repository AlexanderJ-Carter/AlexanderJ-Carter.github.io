export default {
  async fetch(request) {
    const url = new URL(request.url);
    const method = request.method;
    if (
      (method !== 'GET' && method !== 'HEAD') ||
      !url.pathname.startsWith('/time')
    ) {
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const now = new Date();
    const bodyObj = {
      iso: now.toISOString(),
      timestamp: Math.floor(now.getTime() / 1000),
      timezone: 'Asia/Shanghai',
      datetime: now.toLocaleString('en-CA', {
        timeZone: 'Asia/Shanghai',
        hour12: false,
      }),
    };

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, max-age=0',
    };

    if (method === 'HEAD') {
      return new Response(null, { status: 200, headers });
    }

    return new Response(JSON.stringify(bodyObj), { headers });
  },
};
