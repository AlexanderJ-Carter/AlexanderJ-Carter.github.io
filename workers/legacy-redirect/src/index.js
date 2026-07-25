const LINK =
  '</.well-known/api-catalog>; rel="api-catalog", </.well-known/mcp/server-card.json>; rel="service-desc", </.well-known/agent-skills/index.json>; rel="describedby", </llms.txt>; rel="describedby", </auth.md>; rel="describedby"';
const TYPES = {
  '/.well-known/api-catalog': 'application/linkset+json; charset=utf-8',
  '/.well-known/mcp/server-card.json': 'application/json; charset=utf-8',
  '/.well-known/agent-skills/index.json': 'application/json; charset=utf-8',
  '/.well-known/oauth-protected-resource': 'application/json; charset=utf-8',
  '/.well-known/oauth-authorization-server': 'application/json; charset=utf-8',
  '/.well-known/jwks.json': 'application/json; charset=utf-8',
  '/oauth/authorize': 'application/json; charset=utf-8',
  '/oauth/token': 'application/json; charset=utf-8',
  '/auth.md': 'text/markdown; charset=utf-8',
  '/llms.txt': 'text/plain; charset=utf-8',
};
export default {
  async fetch(request) {
    const url = new URL(request.url),
      host = url.hostname.toLowerCase(),
      path = url.pathname;
    if (host === 'time.alexander.xin')
      return Response.redirect('https://alexander.xin/calendar', 301);
    const redirects = {
      '/time.html': 'https://alexander.xin/calendar',
      '/zh-CN/profile.html': 'https://alexander.xin/about/',
      '/en/profile.html': 'https://alexander.xin/en/about/',
      '/zh-CN/calendar.html': 'https://alexander.xin/calendar',
      '/en/calendar-en.html': 'https://alexander.xin/calendar',
      '/jp/calendar-jp.html': 'https://alexander.xin/calendar',
      '/it/calendar-it.html': 'https://alexander.xin/calendar',
    };
    if (redirects[path]) return Response.redirect(redirects[path], 301);
    if (path.startsWith('/en-GB/'))
      return Response.redirect(
        'https://alexander.xin/en' + path.slice(6) + url.search,
        301
      );
    if (path.startsWith('/en/calendar'))
      return Response.redirect('https://alexander.xin/calendar', 301);
    if (path === '/mcp' || path === '/mcp/') {
      if (request.method === 'GET')
        return Response.json({
          protocolVersion: '2025-03-26',
          serverInfo: { name: 'alexander.xin', version: '1.0.0' },
          capabilities: { tools: {} },
        });
      if (request.method === 'OPTIONS')
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers':
              'Content-Type, Accept, MCP-Protocol-Version',
          },
        });
      if (request.method !== 'POST')
        return Response.json({ error: 'method_not_allowed' }, { status: 405 });
      const msg = await request.json(),
        id = msg.id ?? null;
      if (msg.method === 'initialize')
        return Response.json({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2025-03-26',
            capabilities: { tools: {} },
            serverInfo: { name: 'alexander.xin', version: '1.0.0' },
          },
        });
      if (msg.method === 'notifications/initialized' || msg.method === 'ping')
        return Response.json({ jsonrpc: '2.0', id, result: {} });
      if (msg.method === 'tools/list')
        return Response.json({
          jsonrpc: '2.0',
          id,
          result: {
            tools: [
              {
                name: 'get_site_info',
                description: 'Site discovery metadata',
                inputSchema: { type: 'object', properties: {} },
              },
              {
                name: 'get_time_now',
                description: 'Asia/Shanghai time',
                inputSchema: { type: 'object', properties: {} },
              },
            ],
          },
        });
      if (msg.method === 'tools/call' && msg.params?.name === 'get_time_now') {
        const r = await fetch('https://api.alexander.xin/time/now');
        const t = await r.text();
        return Response.json({
          jsonrpc: '2.0',
          id,
          result: { content: [{ type: 'text', text: t }], isError: !r.ok },
        });
      }
      if (msg.method === 'tools/call' && msg.params?.name === 'get_site_info')
        return Response.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    site: 'https://alexander.xin',
                    llmsTxt: 'https://alexander.xin/llms.txt',
                    authMd: 'https://alexander.xin/auth.md',
                    apiCatalog: 'https://alexander.xin/.well-known/api-catalog',
                    mcpServerCard:
                      'https://alexander.xin/.well-known/mcp/server-card.json',
                  },
                  null,
                  2
                ),
              },
            ],
          },
        });
      return Response.json({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: 'Method not found' },
      });
    }
    const accept = request.headers.get('Accept') || '';
    const wantsMd =
      accept.includes('text/markdown') && request.method === 'GET';
    const origin = await fetch(request);
    const pathname =
      path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
    if (
      wantsMd &&
      origin.ok &&
      (origin.headers.get('Content-Type') || '').includes('text/html')
    ) {
      const html = await origin.text();
      const title =
        (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || url.href;
      const main =
        (html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || html;
      const text = main
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      const md =
        '# ' + title.trim() + '\n\nSource: ' + url.href + '\n\n' + text;
      return new Response(md, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': String(Math.ceil(md.length / 4)),
          Vary: 'Accept',
          Link: LINK,
        },
      });
    }
    const headers = new Headers(origin.headers);
    if (TYPES[pathname]) headers.set('Content-Type', TYPES[pathname]);
    if (pathname === '/') headers.set('Link', LINK);
    return new Response(origin.body, {
      status: origin.status,
      statusText: origin.statusText,
      headers,
    });
  },
};
