# 🌟 Alexander Carter's Personal Website 🌟

![Project Logo](./public/img/branding/logo.png)

现代化 · 多语言 · 响应式 个人作品集

[![Build Status](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-4.16.19-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://alexander.xin)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[**🌐 在线预览**](https://alexander.xin) · [**🚀 快速开始**](#-快速开始) · [**📖 更新日志**](CHANGELOG.md)

---

## 🧭 目录

- [🌟 Alexander Carter's Personal Website 🌟](#-alexander-carters-personal-website-)
  - [🧭 目录](#-目录)
  - [✨ 特性亮点](#-特性亮点)
  - [🛠️ 技术栈](#️-技术栈)
  - [🚀 快速开始](#-快速开始)
    - [📋 环境要求](#-环境要求)
    - [🔧 安装与启动](#-安装与启动)
    - [📦 可用命令](#-可用命令)
    - [📁 项目结构](#-项目结构)
  - [🎨 功能详解](#-功能详解)
    - [📸 画廊功能](#-画廊功能)
    - [💱 汇率工具](#-汇率工具)
    - [📅 日历功能](#-日历功能)
    - [🌐 多语言实现](#-多语言实现)
    - [🎭 主题系统](#-主题系统)
    - [📊 性能与优化](#-性能与优化)
      - [性能指标](#性能指标)
      - [浏览器支持](#浏览器支持)
      - [安全特性](#安全特性)
      - [SEO 优化](#seo-优化)
    - [📖 更新日志](#-更新日志)
      - [v3.0.0 (2025-12-05)](#v300-2025-12-05)
      - [v1.0.0 (2024-12-01)](#v100-2024-12-01)
  - [🤝 贡献指南](#-贡献指南)
  - [📄 开源协议](#-开源协议)
  - [👨‍💻 关于作者](#-关于作者)

---

## ✨ 特性亮点

- 🌓 **深色/浅色主题**: 自动适配系统偏好，平滑切换动画。
- 🎭 **玻璃态设计**: 现代化的毛玻璃效果和渐变背景。
- 📱 **完全响应式**: 移动优先设计，完美适配所有设备。
- 🌍 **多语言支持**: 完整支持 5 种语言 (中, 英, 法, 俄)。
- ⚡ **极致性能**: 基于 Astro Islands 架构，默认零 JS，实现静态预渲染 (SSG)。
- 🛠️ **实用工具集**:
  - 💱 **智能汇率转换**: 实时汇率、自定义计算与结售汇小贴士。
  - 📅 **智能日历**: 节假日标记、事件管理。
  - 🕐 **世界时间**: 多时区实时显示。
- 📸 **高级画廊**:
  - 🖼️ **瀑布流布局**: 优雅的 Masonry 网格。
  - 🔍 **灯箱效果**: 全屏浏览，支持键盘/触摸导航。
  - 🏷️ **智能分类过滤**: 按主题分类。
- 🛡️ **安全与SEO**: 优化的内容安全策略 (CSP) 与全面的搜索引擎优化 (SEO)。

---

## 🛠️ 技术栈

| 技术                                                                               | 版本    | 说明           |
| ---------------------------------------------------------------------------------- | ------- | -------------- |
| [Astro](https://astro.build)                                                       | 4.16.19 | 静态站点生成器 |
| [TypeScript](https://typescriptlang.org)                                           | 5.x     | 类型安全       |
| [Tailwind CSS](https://tailwindcss.com)                                            | 3.4.0   | 原子化 CSS     |
| [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)  | 0.5.x   | 内容排版       |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | 3.2.2   | SEO 优化       |

---

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: `v18.14.1` 或更高版本
- **包管理器**: `npm`, `yarn`, 或 `pnpm`

### 🔧 安装与启动

```bash
# 1. 克隆项目
git clone https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io.git
cd AlexanderJ-Carter.github.io

# 2. 安装依赖
npm install

# 3. 启动开发服务器 (http://localhost:4321)
npm run dev
```

### 📦 可用命令

| 命令              | 说明               |
| ----------------- | ------------------ |
| `npm run dev`     | 启动本地开发服务器 |
| `npm run build`   | 构建生产版本       |
| `npm run preview` | 预览生产构建       |

---

### 📁 项目结构

```text
📦 AlexanderJ-Carter.github.io
├── 📂 public/                # 静态资源 (图片, 字体, Music)
├── 📂 src/
│   ├── 📂 components/        # Astro 组件
│   │   ├── 📂 templates/     # 页面级模板
│   │   ├── Header.astro      # 全局页头
│   │   ├── Footer.astro      # 全局页脚
│   │   └── ...
│   ├── 📂 pages/             # 路由页面
│   │   ├── index.astro       # 默认语言 (中文)
│   │   └── [lang]/           # 多语言路由
│   ├── 📂 layouts/           # 布局组件 (BaseLayout.astro)
│   ├── 📂 scripts/           # 客户端 TypeScript 脚本
│   ├── 📂 styles/            # 全局样式
│   └── 📂 i18n/              # 国际化翻译文件
├── 📄 astro.config.mjs       # Astro 配置文件
├── 📄 tailwind.config.mjs    # Tailwind CSS 配置文件
└── 📄 package.json           # 项目依赖
```

---

## 🎨 功能详解

### 📸 画廊功能

- **Masonry 瀑布流布局**: 通过 `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` 实现响应式网格。
- **Lightbox 灯箱效果**: 支持全屏浏览、键盘 (`←`/`→`/`Esc`) 和触摸导航。
- **智能分类过滤**: 基于 `data-category` 属性动态筛选图片。
- **性能优化**: 图片懒加载 (`loading="lazy"`) 和交错入场动画。

### 💱 汇率工具

- **实时汇率**: 调用 `open.er-api.com` 的免费 API，每日自动更新。
- **自定义计算**: 支持输入银行实际牌价进行精确计算。
- **结售汇贴士**: 提供实用的兑换建议。

### 📅 日历功能

- **月视图**: 清晰的日期网格布局。
- **节假日标记**: 预设中国法定节假日。
- **事件管理**: 允许用户在本地添加和删除自定义事件。

### 🌐 多语言实现

- **路由驱动**: 语言通过 URL 前缀区分, 如 `/` (默认中文), `/en-US/`, `/fr/`。
- **翻译管理**: 在 `src/i18n/ui.ts` 中集中管理所有 UI 文本。

### 🎭 主题系统

- **自动检测**: 使用 `matchMedia('(prefers-color-scheme: dark)')` 适配系统设置。
- **手动切换**: 通过 `localStorage` 存储用户选择，实现持久化。
- **CSS 变量**: 在 `:root` 和 `.dark` 选择器中定义颜色变量，实现动态切换。

---

### 📊 性能与优化

#### 性能指标

| 指标                | 数值    | 说明     |
| ------------------- | ------- | -------- |
| **Lighthouse 性能** | 95+     | 极速加载 |
| **首屏时间 (FCP)**  | < 1s    | 瞬间呈现 |
| **构建大小**        | < 500KB | 极度轻量 |

#### 浏览器支持

| 浏览器  | 版本  |
| ------- | ----- |
| Chrome  | >= 90 |
| Firefox | >= 88 |
| Safari  | >= 14 |
| Edge    | >= 90 |

#### 安全特性

- 🛡️ **Content Security Policy** - XSS 防护
- 🔐 **HTTPS Only** - 强制加密传输
- 🚫 **No External Scripts** - 无第三方追踪
- 🔏 **PGP Key** - 加密通信支持

#### SEO 优化

- ✅ **Sitemap 自动生成**
- ✅ **Meta 标签优化** (标题/描述/OG)
- ✅ **语义化 HTML**
- ✅ **多语言标记** (`hreflang`)

---

### 📖 更新日志

#### v3.0.0 (2025-12-05)

重大版本：全面重构并迁移到 Astro 框架，提升性能、可维护性与多语言支持。

- 🏗️ **框架迁移**: 从静态 HTML/CSS/JS 迁移至 **Astro**。
- 🛠️ **技术栈升级**: 引入 **TypeScript** 与 **Tailwind CSS**。
- 🌍 **国际化**: 改为基于路由的 i18n (`src/pages/[lang]`)。
- 📁 **目录重组**: 源码统一到 `src/`，静态资源放 `public/`。
- ⚡ **性能优化**: 利用 Astro Islands 架构提升加载速度。

#### v1.0.0 (2024-12-01)

- 🎉 初始版本发布

_详见 [CHANGELOG.md](CHANGELOG.md) 文件。_

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 开源协议

本项目采用 **MIT License** 开源协议。详见 [LICENSE](./LICENSE) 文件。

---

## 👨‍💻 关于作者

### Alexander James Carter

[alexander.xin](https://alexander.xin) · [GitHub](https://github.com/AlexanderJ-Carter) · [Blog](https://blog.alexander.xin)

---

Made with ❤️ by Alexander Carter

⭐ 如果这个项目对你有帮助，请给个 Star！ ⭐
