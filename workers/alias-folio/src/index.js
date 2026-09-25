/**
 * folio.alexander.xin → apex.
 * 旧别名主机统一进主站，避免空壳 502。
 */
const TARGET = 'https://alexander.xin/'

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const dest = new URL(TARGET)
    dest.pathname = url.pathname === '/' ? '/' : url.pathname
    dest.search = url.search
    return Response.redirect(dest.toString(), 301)
  },
}
