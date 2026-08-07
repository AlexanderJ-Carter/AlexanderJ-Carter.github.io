/** Apex /writing* → blog.alexander.xin (same path). www is untouched. */
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const normalized =
      path.endsWith('/') || path.includes('.') ? path : `${path}/`;
    return Response.redirect(
      `https://blog.alexander.xin${normalized}${url.search}`,
      301
    );
  },
};
