# Alexander Carter's Personal Website

现代化、多语言、响应式的个人作品集站点，基于 **Astro** + **Tailwind CSS** 构建，并通过 GitHub Actions 自动部署到 GitHub Pages。

[![Build Status](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue?style=flat-square)](LICENSE)
[![Content License](https://img.shields.io/badge/Content-CC%20BY--NC--ND%204.0-lightgrey?style=flat-square)](NOTICE)

## 概述

- **架构**：Astro Islands，默认零客户端 JS，按需水合交互组件。
- **多语言**：支持 zh-CN（默认）、zh-TW、en、fr、ru，自动生成 sitemap 与 hreflang。
- **功能**：深浅色主题、音乐播放器、彩蛋页、Now/Uses、画廊、联系与政策页等。
- **体验**：响应式设计、无障碍优化（WCAG 2.1）、跳过链接与键盘导航。

## 项目结构

```text
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── public/                        # 静态资源
│   ├── img/                       # 品牌与画廊图片
│   ├── music/                     # 音频资源
│   ├── security/                  # PGP 公钥等
│   ├── .well-known/security.txt   # 安全联系与政策（RFC 9116）
│   ├── robots.txt
│   ├── humans.txt
│   └── manifest.json
├── src/
│   ├── components/                # 可复用组件与页面模板
│   ├── layouts/
│   ├── pages/
│   │   ├── [lang]/*.astro         # 多语言路由（含 security 子路径）
│   │   └── security/*.astro       # 安全政策与致谢（根路径）
│   ├── i18n/ui.ts
│   ├── scripts/
│   └── styles/
├── astro.config.mjs
├── tailwind.config.mjs
├── LICENSE                        # BSD 3-Clause（源代码）
└── NOTICE                         # 内容许可与第三方声明
```

## 安全

- **漏洞披露**：请勿公开披露未修复漏洞。通过 [安全政策](https://alexander.xin/security/policy) 或 [security.txt](https://alexander.xin/.well-known/security.txt) 中的联系方式负责任地报告，敏感内容建议使用 PGP 加密。
- **安全页面**：[/security/policy](https://alexander.xin/security/policy)、[/security/acknowledgments](https://alexander.xin/security/acknowledgments)。

## 本地开发

```bash
npm install
npm run dev
```

在浏览器打开 **http://localhost:4321**。若线上域名经 Cloudflare 并开启 Bot 防护，本地访问不会经过 Cloudflare，可避免人机验证。线上测试可在 Cloudflare 控制台使用 **Development Mode** 或 **IP Access Rules** 将本机 IP 加入白名单。

## 许可

- **源代码**：BSD 3-Clause License，见 [LICENSE](LICENSE)。
- **网站内容**（文字、图片等）：CC BY-NC-ND 4.0，见 [NOTICE](NOTICE)。超出许可的使用须事先获得书面同意。

## 作者

Alexander James Carter — [alexander.xin](https://alexander.xin)
