/**
 * blog.alexander.xin → Folio 写作页。
 * 收束旧 Astro blog，二级域名继续有用但不挂第二套站。
 */
const TARGET = 'https://alexander.xin/posts'

export default {
  async fetch(request) {
    const url = new URL(request.url)
    // Keep query string; drop legacy /writing path noise.
    const dest = new URL(TARGET)
    dest.search = url.search
    return Response.redirect(dest.toString(), 301)
  },
}
