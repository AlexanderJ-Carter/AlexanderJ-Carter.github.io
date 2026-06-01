---
title: "从 5 秒到 1 秒：个人网站性能优化的真实记录"
description: "不是教程，是一份真实的优化日志。记录了从发现慢到诊断原因到逐项修复的全过程。"
category: "工程实践"
pubDate: 2026-03-01
updatedDate: 2026-06-01
lang: zh-CN
tags: ["性能", "优化", "Web"]
timeToRead: "11 min"
---

这个网站曾经首页加载需要 5 秒。不是什么大型应用，只是一个静态的个人站——但就是慢。这篇文章是我把它优化到 1 秒以内的完整记录，包括踩过的坑、做过的取舍、以及最终的方案。

## 问题：慢在哪？

慢是一个模糊的感受。在动手优化之前，需要先量化它。

### Lighthouse 诊断

第一次跑 Lighthouse 的时候，Performance 分数是 47 分。主要问题：

- **LCP (Largest Contentful Paint)**：4.8 秒。首页的 hero 图片太大，加载慢。
- **CLS (Cumulative Layout Shift)**：0.18。字体加载导致文字重排。
- **FCP (First Contentful Paint)**：2.1 秒。CSS 和 JS 阻塞渲染。
- **TBT (Total Blocking Time)**：380ms。第三方脚本执行时间过长。

### Network 面板分析

打开 Chrome DevTools 的 Network 面板，发现：

1. 首页总共请求了 47 个资源
2. 未压缩的 PNG 图片占了 3.2MB
3. Google Fonts 加载了 6 个字体文件（4 种字重 x Regular + Italic）
4. CSS 文件 2 个，总计 180KB（未压缩）
5. 有一个 analytics 脚本在阻塞渲染

问题很清晰了：图片太大、字体太多、CSS 未优化、第三方脚本在捣乱。

## 第一轮：图片优化

这是收益最大的一步。

### 格式转换

把所有图片从 PNG/JPG 转换为 AVIF（优先）和 WebP（回退）。Astro 的 `<Image />` 组件原生支持自动格式转换，但我的图片有的是直接放在 `public/` 目录下的静态引用，没有经过 Astro 的处理。

解决方案：使用 Sharp 在构建时预处理所有图片。

```
原始: hero-photo.png — 2.4MB
AVIF: hero-photo.avif — 186KB (压缩 92%)
WebP: hero-photo.webp — 342KB (压缩 86%)
```

### 响应式图片

不同屏幕尺寸不应该加载同一张图片。使用 `<picture>` 元素配合 `srcset`：

- 移动端加载 640px 宽的版本
- 平板加载 1024px
- 桌面端加载 1920px

大部分用户（移动端占比约 60%）实际下载的图片从 2.4MB 降到了约 80KB。

### 懒加载

首屏以下的图片全部加上 `loading="lazy"`。首屏图片保持即时加载，但添加 `fetchpriority="high"` 让浏览器优先处理。

**这一轮的效果**：LCP 从 4.8s 降到 2.3s。页面总传输量从 5.1MB 降到 1.2MB。

## 第二轮：字体策略

Google Fonts 方便，但代价不小。

### 问题

默认的 Google Fonts 加载方式会：

1. 阻塞渲染（FOIT — Flash of Invisible Text）
2. 加载完成后文字跳动（CLS 的主要来源）
3. 额外的 DNS 查询和 TCP 连接（fonts.googleapis.com → fonts.gstatic.com）

### 方案

把字体文件下载到本地，使用 `@font-face` 自托管。具体策略：

1. **减少字重**：从 4 种（300/400/500/700）减少到 2 种（400/700）。大部分页面只需要正文和加粗两种。
2. **子集化**：中文字体文件巨大（一个完整的 Noto Sans SC Woff2 约 7MB）。使用 `pyftsubset` 按常用字子集化，加上 Unicode 范围分段——基础拉丁、CJK 常用汉字、扩展汉字各自独立。用户只会下载实际需要的段落。
3. **font-display: swap**：先用系统字体渲染，字体加载完成后替换。有短暂的 FOUT（Flash of Unstyled Text），但消除了 FOIT 和 CLS。
4. **preload 关键字体**：首屏需要的正文字体用 `<link rel="preload">` 提前加载。

```css
@font-face {
  font-family: 'Noto Sans SC';
  src: url('/fonts/noto-sans-sc-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
  unicode-range: U+4E00-9FFF;
}
```

**这一轮的效果**：CLS 从 0.18 降到 0.02。FCP 从 2.1s 降到 1.4s（减少了 Google Fonts 的网络开销）。

## 第三轮：CSS 优化

### 问题

Astro 默认会做 CSS 作用域隔离和代码分割，但我之前在 `global.css` 里塞了太多东西：

- Tailwind 的完整输出（未做 purge）
- 手写的动画关键帧（大部分页面用不到）
- 第三方库的样式（Prism.js 的代码高亮主题）

### 方案

1. **确认 Tailwind purge 正常工作**：检查 `astro.config.mjs` 里的 Tailwind 配置，确保 `content` 路径覆盖所有组件文件。修正后，CSS 从 180KB 降到了 23KB。
2. **按需加载代码高亮样式**：只在有代码块的页面引入 Prism 主题。
3. **内联关键 CSS**：首屏渲染需要的样式（布局、字体、颜色变量）直接内联到 `<head>` 中，消除 CSS 阻塞渲染的等待。

**这一轮的效果**：CSS 传输量从 180KB 降到 23KB + 约 4KB 内联。FCP 进一步降到 0.9s。

## 第四轮：JavaScript 清理

Astro 的默认策略是"零 JS"——组件的 JS 只在需要时发送到客户端。但我之前给一些组件加了 `client:load`，实际上它们不需要客户端交互。

### 审计 client 指令

逐一检查所有 Astro 组件的 `client:*` 指令：

- 主题切换按钮：需要 `client:load`（首屏交互）
- 代码复制按钮：改为 `client:visible`（滚动到才加载）
- 分析脚本：改为 `client:only="js"` + `defer`（不阻塞渲染）
- 其他装饰性动画：移除 JS，改用纯 CSS `@keyframes`

**这一轮的效果**：TBT 从 380ms 降到 45ms。页面 hydration 几乎零感知。

## 第五轮：HTTP 层优化

### 缓存策略

在 `_headers` 文件（Cloudflare Pages）中配置缓存：

```
/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600, must-revalidate
```

带哈希的静态资源（字体、CSS、JS）缓存一年，HTML 每小时检查更新。

### 安全头

顺手在 `_headers` 里加了安全相关的 HTTP 头：`X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy`。这些不影响性能，但影响安全——优化的时候顺便做了。

### 预连接

在 `<head>` 中添加 `<link rel="preconnect">` 给需要跨域请求的资源（目前只有 Cloudflare Analytics）。减少 DNS 查询和 TLS 握手时间。

## 最终结果

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| Performance | 47 | 97 |
| LCP | 4.8s | 0.95s |
| FCP | 2.1s | 0.8s |
| CLS | 0.18 | 0.01 |
| TBT | 380ms | 45ms |
| 总传输量 | 5.1MB | 680KB |
| 请求数 | 47 | 18 |

## 做了什么取舍

优化不是免费的。这些是我做出的选择：

- **FOUT 而不是 FOIT**：用户会短暂看到系统字体，然后切换到自定义字体。我接受这个短暂的视觉变化，换来了更快的首次渲染和更低的 CLS。
- **AVIF 不是所有浏览器都支持**：Safari 直到 16.4 才支持 AVIF。使用 `<picture>` 元素提供 WebP 回退，极老的浏览器才看到原始格式。
- **中文字体子集化意味着偶尔有缺字**：极少数生僻字可能不在子集范围内。对于个人站来说，这个概率足够低，可以接受。
- **分析脚本延迟加载**：延迟加载意味着早期的用户行为不会被追踪。对于一个个人站的分析需求来说，这个精度损失可以忽略。

## 一个核心认知

在这次优化过程中，我最大的收获不是某个具体的技术技巧，而是一个认知转变：**性能不是优化的结果，是设计的起点**。

如果一开始就在设计阶段考虑图片大小、字体数量、CSS 体积——大部分优化工作根本不需要做。我花在事后优化上的时间，远比"一开始就做对"多得多。

下次做新项目的时候，我的 check-list 第一项不是"用什么框架"，而是"性能预算是多少"。先定预算，再做设计，最后才是实现。
