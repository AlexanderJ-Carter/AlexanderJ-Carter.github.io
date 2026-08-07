const LINK =
  '</.well-known/api-catalog>; rel="api-catalog", </.well-known/mcp/server-card.json>; rel="service-desc", </.well-known/agent-skills/index.json>; rel="describedby", </llms.txt>; rel="describedby", </auth.md>; rel="describedby"';

const RAW =
  'https://raw.githubusercontent.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/main/public';

const DISCOVERY_TYPES = {
  '/.well-known/api-catalog': 'application/linkset+json; charset=utf-8',
  '/.well-known/oauth-authorization-server': 'application/json; charset=utf-8',
  '/.well-known/openid-configuration': 'application/json; charset=utf-8',
  '/.well-known/oauth-protected-resource': 'application/json; charset=utf-8',
  '/.well-known/jwks.json': 'application/json; charset=utf-8',
  '/.well-known/mcp/server-card.json': 'application/json; charset=utf-8',
  '/.well-known/agent-skills/index.json': 'application/json; charset=utf-8',
  '/.well-known/agent-skills/site-overview/SKILL.md':
    'text/markdown; charset=utf-8',
  '/.well-known/security.txt': 'text/plain; charset=utf-8',
  '/oauth/authorize': 'application/json; charset=utf-8',
  '/oauth/token': 'application/json; charset=utf-8',
};

/** Map request path to raw.githubusercontent path under public/. */
function rawPath(pathname) {
  if (pathname === '/.well-known/openid-configuration') {
    return '/.well-known/oauth-authorization-server';
  }
  return pathname;
}

/** Apex writing → blog host (www keeps content; no www↔apex bounce). */
function writingToBlog(path, search) {
  const prefixes = [
    '/writing',
    '/en/writing',
    '/zh-TW/writing',
    '/fr/writing',
    '/ru/writing',
  ];
  const matches = prefixes.some(
    (p) => path === p || path === `${p}/` || path.startsWith(`${p}/`)
  );
  if (!matches) return null;
  const normalized =
    path.endsWith('/') || path.includes('.') ? path : `${path}/`;
  return `https://blog.alexander.xin${normalized}${search}`;
}

/** Ghost-era and short aliases → blog writing paths. */
function legacyBlogAlias(path) {
  if (path === '/blog' || path === '/blog/') return '/writing/';
  if (path === '/subscribe' || path === '/subscribe/') {
    return '/writing/subscribe/';
  }
  const lang = path.match(/^\/(en|zh-TW|fr|ru)\/(blog|subscribe)\/?$/);
  if (!lang) return null;
  const prefix = `/${lang[1]}`;
  return lang[2] === 'blog'
    ? `${prefix}/writing/`
    : `${prefix}/writing/subscribe/`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const path = url.pathname;

    if (host === 'time.alexander.xin') {
      return Response.redirect('https://alexander.xin/calendar/', 301);
    }

    if (host === 'alexander.xin') {
      const blogTarget = writingToBlog(path, url.search);
      if (blogTarget) return Response.redirect(blogTarget, 301);
      const alias = legacyBlogAlias(path);
      if (alias) {
        return Response.redirect(
          `https://blog.alexander.xin${alias}${url.search}`,
          301
        );
      }
    }

    const redirects = {
      '/time.html': 'https://alexander.xin/calendar/',
      '/zh-CN/profile.html': 'https://alexander.xin/about/',
      '/en/profile.html': 'https://alexander.xin/en/about/',
      '/zh-CN/calendar.html': 'https://alexander.xin/calendar/',
      '/en/calendar-en.html': 'https://alexander.xin/calendar/',
      '/jp/calendar-jp.html': 'https://alexander.xin/calendar/',
      '/it/calendar-it.html': 'https://alexander.xin/calendar/',
    };
    if (redirects[path]) return Response.redirect(redirects[path], 301);
    if (path.startsWith('/en-GB/')) {
      return Response.redirect(
        'https://alexander.xin/en' + path.slice(6) + url.search,
        301
      );
    }
    if (path.startsWith('/en/calendar')) {
      return Response.redirect('https://alexander.xin/calendar/', 301);
    }

    const pathname =
      path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
    const contentType = DISCOVERY_TYPES[pathname];
    if (
      contentType &&
      (request.method === 'GET' || request.method === 'HEAD')
    ) {
      const upstream = await fetch(RAW + rawPath(pathname));
      if (!upstream.ok) {
        return new Response('discovery document missing upstream', {
          status: 502,
        });
      }
      const body = request.method === 'HEAD' ? null : await upstream.text();
      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=300',
        },
      });
    }

    if (path === '/mcp' || path === '/mcp/') {
      return handleMcp(request);
    }

    const accept = request.headers.get('Accept') || '';
    const wantsMd =
      accept.includes('text/markdown') && request.method === 'GET';
    const origin = await fetch(request);

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
    if (pathname === '/') headers.set('Link', LINK);
    return new Response(origin.body, {
      status: origin.status,
      statusText: origin.statusText,
      headers,
    });
  },
};

async function handleMcp(request) {
  if (request.method === 'GET') {
    return Response.json({
      protocolVersion: '2025-03-26',
      serverInfo: { name: 'alexander.xin', version: '1.0.0' },
      capabilities: { tools: {} },
    });
  }
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Accept, MCP-Protocol-Version',
      },
    });
  }
  if (request.method !== 'POST') {
    return Response.json({ error: 'method_not_allowed' }, { status: 405 });
  }

  const msg = await request.json();
  const id = msg.id ?? null;
  if (msg.method === 'initialize') {
    return Response.json({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2025-03-26',
        capabilities: { tools: {} },
        serverInfo: { name: 'alexander.xin', version: '1.0.0' },
      },
    });
  }
  if (msg.method === 'notifications/initialized' || msg.method === 'ping') {
    return Response.json({ jsonrpc: '2.0', id, result: {} });
  }
  if (msg.method === 'tools/list') {
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
  }
  if (msg.method === 'tools/call' && msg.params?.name === 'get_time_now') {
    const r = await fetch('https://api.alexander.xin/time/now');
    const t = await r.text();
    return Response.json({
      jsonrpc: '2.0',
      id,
      result: { content: [{ type: 'text', text: t }], isError: !r.ok },
    });
  }
  if (msg.method === 'tools/call' && msg.params?.name === 'get_site_info') {
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
  }
  return Response.json({
    jsonrpc: '2.0',
    id,
    error: { code: -32601, message: 'Method not found' },
  });
}
