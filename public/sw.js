/**
 * Service Worker — offline HTML shells + runtime asset cache.
 * Astro hashes CSS/JS into /_astro/*; never precache a fake /css/global.css.
 */

const CACHE_NAME = 'alexander-site-v2';
const RUNTIME_CACHE = 'alexander-runtime-v2';

const PRECACHE_URLS = ['/', '/gallery/', '/projects/', '/about/', '/contact/', '/manifest.json'];

const CACHE_STRATEGIES = {
  image: {
    match: /\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i,
    strategy: 'cacheFirst',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  asset: {
    match: /\/_astro\/|\.(css|js)$/i,
    strategy: 'networkFirst',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  html: {
    match: /\/$|\.html$/i,
    strategy: 'networkFirst',
    maxAge: 24 * 60 * 60 * 1000,
  },
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: 'reload' });
            if (res.ok) await cache.put(url, res);
          } catch {
            /* skip missing routes — never fail whole install */
          }
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  let strategy = 'networkFirst';
  let maxAge = 24 * 60 * 60 * 1000;

  for (const config of Object.values(CACHE_STRATEGIES)) {
    if (config.match.test(url.pathname)) {
      strategy = config.strategy;
      maxAge = config.maxAge;
      break;
    }
  }

  if (strategy === 'cacheFirst') {
    event.respondWith(cacheFirst(request, maxAge));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request, maxAge) {
  const cached = await caches.match(request);
  if (cached) {
    const date = cached.headers.get('date');
    if (date) {
      const age = Date.now() - new Date(date).getTime();
      if (age < maxAge) return cached;
    } else {
      return cached;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return cached || new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}
