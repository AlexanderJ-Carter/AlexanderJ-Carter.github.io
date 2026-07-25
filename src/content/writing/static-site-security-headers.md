---
title: "静态站安全头实战：_headers、CSP 与取舍"
description: "静态站也能认真做安全头。本文写 Cloudflare / Pages 风格的 _headers、CSP 过严时的痛，以及本站如何取舍。"
category: "技术实践"
pubDate: 2026-07-06
updatedDate: 2026-07-25
lang: zh-CN
tags: ["安全", "CSP", "Cloudflare"]
timeToRead: "13 min"
---

静态站没有服务器里的会话逻辑，不代表浏览器侧可以放飞。点击劫持、MIME 嗅探、失控的第三方脚本，一样能搞砸个人站。好消息是：在 GitHub Pages + Cloudflare 一类架构里，用 `_headers`（或平台等价配置）就能把基线安全头铺到全站。

## 先上基线，再谈完美 CSP

我对几乎所有静态站都建议至少有：

- **`X-Content-Type-Options: nosniff`**
- **`Referrer-Policy`**（按你想暴露的来源信息选择）
- **`X-Frame-Options` 或 CSP 的 `frame-ancestors`**
- **`Permissions-Policy`** 关掉不需要的摄像头、麦克风等

这些头成本低、收益清楚。不要等「研究完完美 CSP」才部署它们。

## `_headers` 怎么理解

Cloudflare Pages 会读取构建产物里的 `_headers`，按路径附加响应头。常见做法是把文件放在 `public/_headers`，构建时复制到输出目录。

写法直觉上像：

```txt
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

路径可以更细：只对 `/admin/*` 更严，对静态资源更松。先全局稳妥，再例外。

## CSP：最有用，也最容易把自己锁死

Content-Security-Policy 用来限制脚本、样式、帧、连接去向。理想状态是：`default-src 'self'`，第三方白名单短而明确。

现实痛点：

- 主题脚本、分析、Turnstile、AdSense、字体 CDN 都要进白名单；
- 内联脚本需要 hash / nonce，否则 `'unsafe-inline'` 会把锐度磨掉；
- 一处遗漏，生产环境「白屏」，本地却因为开发服务器策略不同而没事。

因此我的策略是：

1. **先列清单**：本站真实会加载的源（Google Fonts？pagead？Cloudflare Turnstile？）。
2. **按功能开关放宽**：广告未启用时，不必提前为所有广告域开洞；启用那天再改头与隐私政策。
3. **改 CSP 必做一次真机冒烟**：首页、一篇文章、关于、联系、一个工具页。
4. **用 Report-Only 过渡**（若你有收集端）观察违规，再切 enforce。

安全页与 `security.txt`、PGP、致谢页属于另一层「人可读的安全姿态」；响应头是机器可读的姿态。两者一起才完整。

## 和第三方的诚实关系

想同时做到：

- 严格 CSP；
- 个性化广告；
- 人机验证；
- 外链字体；

就要接受白名单变长。这不是失败，是产品选择。失败的是：**口头说注重安全，头文件却是空的，或复制了一份三年前的示例从未按域名改过。**

## 静态站仍要小心的事

- **依赖供应链**：`npm` 锁文件、少装偶然脚本；
- **XSS**：Markdown 与 `set:html` 类出口；
- **密钥**：永远别把 Token 写进仓库；公开站尤其诱惑人把「暂时试试」的 key 留下；
- **重定向与缓存**：错误的缓存头可能让旧 CSP 粘住用户。

## AdSense 与 CSP 同场时

若计划启用广告，CSP 往往要放行 `pagead2.googlesyndication.com` 等域名，有时还要面对脚本如何加载的现实约束。建议：

- 广告关闭时保持紧策略；
- 打开广告的同一天更新 `_headers`、隐私政策与 `ads.txt`；
- 用无痕窗口确认广告 iframe 与主文档都符合预期，而不是只看首页「好像有个空位」。

安全头与变现不是对立，而是变更管理问题：一起改、一起测、一起写进说明。

## 小结

静态站的安全头是高性价比工程：先基线头，再逐步收紧 CSP，并为真正启用的第三方开最小洞。`_headers` 让策略可进 Git、可审阅、可回滚。安全不是首页徽章，是每次部署后仍愿意打开 Network 面板确认「只加载了我答应加载的东西」。
