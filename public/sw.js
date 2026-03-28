/**
 * Service Worker - 缓存策略
 * 提供离线支持和性能优化
 */

const CACHE_NAME = 'alexander-portfolio-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';

// 需要预缓存的静态资源
const PRECACHE_URLS = [
  '/',
  '/gallery/',
  '/projects/',
  '/about/',
  '/contact/',
  '/css/global.css',
  '/manifest.json',
];

// 缓存策略配置
const CACHE_STRATEGIES = {
  // 图片：缓存优先，过期时间 30 天
  image: {
    match: /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i,
    strategy: 'cacheFirst',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 天
  },
  // CSS/JS：网络优先，回退到缓存
  asset: {
    match: /\.(css|js)$/i,
    strategy: 'networkFirst',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天
  },
  // HTML：网络优先
  html: {
    match: /\.html$/i,
    strategy: 'networkFirst',
    maxAge: 24 * 60 * 60 * 1000, // 1 天
  },
};

// 安装事件 - 预缓存关键资源
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker 安装中...');

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ 预缓存静态资源');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker 激活中...');

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map((name) => {
              console.log('🗑️ 删除旧缓存:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 请求拦截 - 应用缓存策略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== location.origin) {
    return;
  }

  // 确定缓存策略
  let strategy = 'networkFirst';
  let maxAge = 24 * 60 * 60 * 1000;

  for (const [type, config] of Object.entries(CACHE_STRATEGIES)) {
    if (config.match.test(url.pathname)) {
      strategy = config.strategy;
      maxAge = config.maxAge;
      break;
    }
  }

  // 应用策略
  if (strategy === 'cacheFirst') {
    event.respondWith(cacheFirst(request, maxAge));
  } else {
    event.respondWith(networkFirst(request, maxAge));
  }
});

/**
 * 缓存优先策略
 * 适用于不常变化的资源（如图片）
 */
async function cacheFirst(request, maxAge) {
  const cached = await caches.match(request);

  if (cached) {
    // 检查是否过期
    const date = cached.headers.get('date');
    if (date) {
      const age = Date.now() - new Date(date).getTime();
      if (age < maxAge) {
        return cached;
      }
    }
  }

  // 缓存不存在或已过期，从网络获取
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // 网络失败，返回缓存（即使过期）
    return cached || new Response('离线', { status: 503 });
  }
}

/**
 * 网络优先策略
 * 适用于需要更新的资源（如 HTML、API）
 */
async function networkFirst(request, maxAge) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // 网络失败，返回缓存
    const cached = await caches.match(request);
    return cached || new Response('离线', { status: 503 });
  }
}
