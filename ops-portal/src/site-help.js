/**
 * Retired edge Q&A worker.
 * Visitor help is the on-site「问站」FAB → Folio POST /api/ask.
 * Keep this script so old CF routes to /api/help do not fall through oddly.
 */

export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': 'https://alexander.xin',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    if (url.pathname === '/api/help' || url.pathname.startsWith('/api/help/')) {
      return Response.json(
        {
          error: 'gone',
          mode: 'none',
          answer: '站内帮助已并入右下角「问站」。请打开 alexander.xin 使用对话，接口改为 POST /api/ask。',
        },
        {
          status: 410,
          headers: {
            'Access-Control-Allow-Origin': 'https://alexander.xin',
            'Cache-Control': 'no-store',
          },
        },
      )
    }

    return Response.json({ error: 'Not found' }, { status: 404 })
  },
}
