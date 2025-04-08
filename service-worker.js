// 网站缓存版本，更新网站时需要更改此版本号
const CACHE_VERSION = "v1.0.0";
const CACHE_NAME = `alex-hwang-site-${CACHE_VERSION}`;

// 需要缓存的核心静态资源
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/css/style.default.css",
  "/css/custom.css",
  "/js/bootstrap.bundle.min.js",
  "/js/poem.js",
  "/js/music-player.js",
  "/img/logo.png",
  "/img/AboutMe.jpg",
  "/404.html",
];

// 安装服务工作线程
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("缓存核心资源中...");
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// 激活服务工作线程，清理旧缓存
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return (
                cacheName.startsWith("alex-hwang-site-") &&
                cacheName !== CACHE_NAME
              );
            })
            .map((cacheName) => {
              console.log(`删除旧缓存: ${cacheName}`);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// 处理资源请求
self.addEventListener("fetch", (event) => {
  // 对API请求使用网络优先策略
  if (
    event.request.url.includes("/api/") ||
    event.request.url.includes("oick.cn")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 如果成功从网络获取，则复制响应并存储到缓存
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // 如果网络请求失败，尝试从缓存获取
          return caches.match(event.request);
        })
    );
  } else {
    // 对静态资源使用缓存优先策略
    event.respondWith(
      caches.match(event.request).then((response) => {
        // 如果在缓存中找到资源，则返回缓存版本
        if (response) {
          return response;
        }

        // 否则通过网络获取
        return fetch(event.request)
          .then((fetchResponse) => {
            // 如果获取成功且是GET请求，缓存该资源
            if (fetchResponse.ok && event.request.method === "GET") {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return fetchResponse;
          })
          .catch(() => {
            // 如果是HTML请求，返回404页面
            if (event.request.headers.get("accept").includes("text/html")) {
              return caches.match("/404.html");
            }
            return new Response("网络错误，资源暂时无法获取", {
              status: 408,
              headers: { "Content-Type": "text/plain" },
            });
          });
      })
    );
  }
});
