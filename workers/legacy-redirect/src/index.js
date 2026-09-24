import {
  applyApiSecurityHeaders,
  applyPageSecurityHeaders,
  isHtmlContentType,
} from './security-headers.js'

/**
 * Folio 时代：apex 已走 Tunnel→Nginx→Folio。
 * 本 Worker 只保留旧路径跳转；其余透传到源站并补安全头。
 * 主机别名（about/bio/contact/time/www）由 Cloudflare Redirect Rules 处理。
 */

function writingToBlog(path, search) {
  const prefixes = [
    '/writing',
    '/en/writing',
    '/zh-TW/writing',
    '/fr/writing',
    '/ru/writing',
  ]
  const matches = prefixes.some(
    (p) => path === p || path === `${p}/` || path.startsWith(`${p}/`),
  )
  if (!matches) return null
  const normalized =
    path.endsWith('/') || path.includes('.') ? path : `${path}/`
  return `https://blog.alexander.xin${normalized}${search}`
}

function legacyBlogAlias(path) {
  if (path === '/blog' || path === '/blog/') return '/writing/'
  const lang = path.match(/^\/(en|zh-TW|fr|ru)\/blog\/?$/)
  if (!lang) return null
  return `/${lang[1]}/writing/`
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const path = url.pathname

    const blogTarget = writingToBlog(path, url.search)
    if (blogTarget) return Response.redirect(blogTarget, 301)

    const alias = legacyBlogAlias(path)
    if (alias) {
      return Response.redirect(
        `https://blog.alexander.xin${alias}${url.search}`,
        301,
      )
    }

    const redirects = {
      '/time.html': 'https://alexander.xin/time',
      '/zh-CN/profile.html': 'https://alexander.xin/about',
      '/en/profile.html': 'https://alexander.xin/about',
      '/zh-CN/calendar.html': 'https://alexander.xin/time',
      '/en/calendar-en.html': 'https://alexander.xin/time',
      '/jp/calendar-jp.html': 'https://alexander.xin/time',
      '/it/calendar-it.html': 'https://alexander.xin/time',
    }
    if (redirects[path]) return Response.redirect(redirects[path], 301)
    if (path.startsWith('/en-GB/')) {
      return Response.redirect(
        'https://alexander.xin' + path.slice(6) + url.search,
        301,
      )
    }
    if (path.startsWith('/en/calendar')) {
      return Response.redirect('https://alexander.xin/time', 301)
    }

    const origin = await fetch(request)
    const headers = new Headers(origin.headers)
    if (isHtmlContentType(headers.get('Content-Type'))) {
      applyPageSecurityHeaders(headers)
    } else {
      applyApiSecurityHeaders(headers)
    }
    return new Response(origin.body, {
      status: origin.status,
      statusText: origin.statusText,
      headers,
    })
  },
}
