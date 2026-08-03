export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const al = request.headers.get('Accept-Language') || '';
    const langs = al.split(',').map((item) => item.trim().split(';')[0].toLowerCase());

    let langPrefix = '';
    for (const l of langs) {
      if (l === 'zh-tw' || l.startsWith('zh-hk') || l.startsWith('zh-mo')) {
        langPrefix = '/zh-TW';
        break;
      }
      if (l.startsWith('zh')) {
        langPrefix = '';
        break;
      }
      if (l.startsWith('fr')) {
        langPrefix = '/fr';
        break;
      }
      if (l.startsWith('ru')) {
        langPrefix = '/ru';
        break;
      }
      if (l.startsWith('en')) {
        langPrefix = '/en';
        break;
      }
      if (l.startsWith('ja') || l.startsWith('it')) {
        langPrefix = '/en';
        break;
      }
    }

    let page = '/about/';
    let status = 301;
    if (host === 'blog.alexander.xin') {
      status = 302;
      const raw = url.pathname || '/';
      if (raw === '/' || raw === '') {
        page = '/writing/';
      } else if (raw === '/writing' || raw.startsWith('/writing/')) {
        page = raw.endsWith('/') ? raw : `${raw}/`;
      } else {
        page = `/writing${raw.endsWith('/') ? raw : `${raw}/`}`;
      }
    }

    return Response.redirect(`https://alexander.xin${langPrefix}${page}${url.search}`, status);
  },
};
