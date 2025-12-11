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

## License

- MIT License. 查看 `LICENSE` 了解详情。

## Author

- Alexander James Carter — <https://alexander.xin>
