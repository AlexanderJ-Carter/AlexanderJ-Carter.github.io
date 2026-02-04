# Alexander Carter's Personal Website

现代化、多语言、响应式的个人作品集站点，基于 Astro + Tailwind CSS
构建，并通过 GitHub Actions 自动部署到 GitHub Pages。

[![Build Status](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## Overview

- 采用 Astro Islands 架构，默认零客户端 JS，按需水合交互组件。
- 支持多语言路由（默认 `zh-CN`，含 `zh-TW`、`en-GB`、`fr`、`ru`），
  自动生成 `sitemap` 与 `hreflang`。
- 内置深浅色主题、音乐播放器、节日问候、快捷操作、滚动动效等 UI
  组件。
- 响应式设计覆盖桌面、平板与移动端。

## Project Structure

```text
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── public/                        # 静态资源（直接复制到输出）
│   ├── img/                       # 品牌与页面图片
│   ├── music/                     # 音频资源
│   ├── security/                  # 公钥等安全文件
│   └── .well-known/               # 安全相关声明
├── src/
│   ├── components/                # 可复用组件
│   │   └── templates/             # 页面级模板
│   ├── layouts/                   # 基础布局
│   ├── pages/                     # 文件系统路由
│   │   ├── [lang]/*.astro         # 多语言入口
│   │   └── security/*.astro       # 安全相关页面
│   ├── i18n/ui.ts                 # 文案与语言配置
│   ├── scripts/scroll-animations.ts # 客户端滚动动效
│   └── styles/global.css          # 全局样式
├── astro.config.mjs               # Astro 配置（含 sitemap 与 i18n）
├── tailwind.config.mjs            # Tailwind 配置
├── package.json                   # 项目元数据与脚本
└── LICENSE                        # MIT 许可证
```

## Internationalization

- 默认语言 `zh-CN`，多语言通过 `[lang]` 动态路由生成；根路径 `/` 渲染默认语言。
- 语言名称和文案集中在 `src/i18n/ui.ts`，模板通过 `lang` prop 获取对应文案。

## Live Demo

- <https://alexander.xin>

## 本地开发与 Cloudflare 人机验证

线上域名若经过 Cloudflare 且开启了 Bot 防护，直接访问可能会遇到人机验证（Captcha）。**本地调试时请使用本地地址，请求不会经过 Cloudflare，可避免验证：**

```bash
npm install
npm run dev
```

在浏览器打开 **http://localhost:4321**（或终端显示的本地 URL）进行开发和预览，所有请求都在本机完成，不会触发 Cloudflare 人机认证。

若需要在不关掉防护的前提下临时测试线上环境，可在 Cloudflare 控制台：

- **Development Mode**：临时关闭缓存与部分安全检测（约 3 小时），便于调试。
- **IP Access Rules**：将你的开发机 IP 加入白名单，对指定 IP 跳过质询。

## License

- MIT License. 查看 `LICENSE` 了解详情。

## Author

- Alexander James Carter — <https://alexander.xin>
