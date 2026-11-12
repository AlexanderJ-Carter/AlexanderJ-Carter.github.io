import {
  applyApiSecurityHeaders,
  applyPageSecurityHeaders,
  isHtmlContentType,
} from './security-headers.js'

/**
 * Folio 时代：apex 已走 Tunnel→Nginx→Folio。
 * 本 Worker：旧写作路径收束到 /posts；其余透传并补安全头。
 * blog.alexander.xin 由独立 Worker `blog-alias` 整域跳到 /posts。
 */

const POSTS = 'https://alexander.xin/posts'

function toPosts(search) {
  return `${POSTS}${search || ''}`
}

function isWritingPath(path) {
  const prefixes = [
    '/writing',
    '/blog',
    '/en/writing',
    '/zh-TW/writing',
    '/fr/writing',
    '/ru/writing',
    '/en/blog',
    '/zh-TW/blog',
    '/fr/blog',
    '/ru/blog',
  ]
  return prefixes.some(
    (p) => path === p || path === `${p}/` || path.startsWith(`${p}/`),
  )
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const path = url.pathname

    if (isWritingPath(path)) {
      return Response.redirect(toPosts(url.search), 301)
    }

    const redirects = {
      '/time.html': 'https://alexander.xin/time',
      '/zh-CN/profile.html': 'https://alexander.xin/about',
      '/en/profile.html': 'https://alexander.xin/about',
      '/zh-CN/calendar.html': 'https://alexander.xin/time',
      '/en/calendar-en.html': 'https://alexander.xin/time',
      '/jp/calendar-jp.html': 'https://alexander.xin/time',
      '/it/calendar-it.html': 'https://alexander.xin/time',
      '/support': 'https://alexander.xin/contact',
      '/support/': 'https://alexander.xin/contact',
      '/uses': 'https://alexander.xin/posts/uses-page-as-self-description',
      '/uses/': 'https://alexander.xin/posts/uses-page-as-self-description',
      '/reading-list': 'https://alexander.xin/posts/reading-list-as-site-page',
      '/reading-list/': 'https://alexander.xin/posts/reading-list-as-site-page',
      '/login': 'https://alexander.xin/admin/login',
      '/login/': 'https://alexander.xin/admin/login',
      '/next': 'https://alexander.xin/projects',
      '/next/': 'https://alexander.xin/projects',
    }
    if (redirects[path]) return Response.redirect(redirects[path], 301)

    // 旧 Astro /next/* 作品集；保留 Payload preview/seed/exit-preview
    if (path.startsWith('/next/')) {
      const rest = path.slice('/next/'.length)
      if (
        rest &&
        !rest.startsWith('preview') &&
        !rest.startsWith('seed') &&
        !rest.startsWith('exit-preview')
      ) {
        return Response.redirect('https://alexander.xin/projects', 301)
      }
    }

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
