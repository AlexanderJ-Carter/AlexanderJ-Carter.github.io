# 架构速览

## 目录

```
src/
  components/
    chrome/      # 页头页脚、主题、通知、音乐等全站壳
    widgets/     # 工具小部件（天气、番茄钟、曝光三角…）
    templates/   # 页面主体（被 pages 薄包装）
  pages/         # 路由；zh-CN 在根，其他语言在 [lang]/
  i18n/          # ui.ts + pages/* 文案；routing.ts 管多语言路径
  config/        # 站点开关（广告、备案、通知）
  data/          # 结构化数据（历史上的今天等）
  content/       # Astro Content（写作）
scripts/         # 构建辅助（音乐清单、图片优化）
public/          # 静态资源；画廊请用 gallery-optimized
```

## 路由约定

- 默认语言 `zh-CN` → `/about`
- 其他语言 → `/en/about`、`/zh-TW/about`…（**不要**生成 `/zh-CN/*` 或 `/en-GB/*`）
- 路径助手：`src/i18n/routing.ts` 的 `getLangStaticPaths` / `resolveRouteLang`

## 已落地的体验增强

- View Transitions（`ClientRouter`）
- RSS：`/rss.xml` 与各语言 `/en/rss.xml` 等
- hreflang 按当前路径生成等价 URL

## 站群与运维

控制面、Access / Pocket ID / SMTP（Resend）、登录分层见 [architecture/site-fleet.md](./architecture/site-fleet.md)。公开站无访客账户；维护者日常入口为 `ops.alexander.xin`。

## 下一步可研究（未做）

- 本地 Canvas/WASM 生成 QR（去掉第三方 `api.qrserver.com`）
- Gallery 图集抽到 `src/data/gallery.ts`，文案与资源分离
- 逐步把模板内嵌文案迁入 `src/i18n/pages/*`
- 原片 `public/img/gallery/` 可移到本地 `assets/gallery-source/`（已 gitignore），仓库只保留 optimized
