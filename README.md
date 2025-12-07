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
  - [🧩 组件文档](#-组件文档)
    - [核心组件](#核心组件)
    - [功能组件](#功能组件)
    - [交互组件](#交互组件)
  - [⚙️ 配置指南](#️-配置指南)
    - [Astro 配置](#astro-配置)
    - [Tailwind CSS 配置](#tailwind-css-配置)
    - [国际化配置](#国际化配置)
  - [🔧 开发指南](#-开发指南)
    - [开发工作流](#开发工作流)
    - [代码规范](#代码规范)
    - [添加新页面](#添加新页面)
    - [添加新语言](#添加新语言)
    - [自定义样式](#自定义样式)
  - [🚀 部署指南](#-部署指南)
    - [GitHub Pages 部署](#github-pages-部署)
    - [其他平台部署](#其他平台部署)
  - [🐛 故障排查](#-故障排查)
    - [常见问题](#常见问题)
    - [构建问题](#构建问题)
    - [运行时问题](#运行时问题)
  - [📖 更新日志](#-更新日志)
    - [v3.0.0 (2025-12-05)](#v300-2025-12-05)
    - [v1.0.0 (2024-12-01)](#v100-2024-12-01)
  - [🤝 贡献指南](#-贡献指南)
  - [📄 开源协议](#-开源协议)
  - [👨‍💻 关于作者](#-关于作者)

---

## ✨ 特性亮点

### 🎨 视觉与交互

- 🌓 **深色/浅色主题**: 
  - 自动适配系统偏好
  - 一键手动切换
  - 平滑过渡动画
  - 持久化用户选择
  
- 🎭 **现代化设计**: 
  - 玻璃态效果（Glassmorphism）
  - 渐变背景动画
  - 流畅的页面过渡
  - 微交互动画

- 📱 **完全响应式**: 
  - 移动优先设计理念
  - 适配手机、平板、桌面
  - 触摸手势支持
  - 自适应布局

### 🌍 国际化

- **5 种语言支持**:
  - 🇨🇳 中文（简体）- 默认
  - 🇹🇼 中文（繁體）
  - 🇬🇧 English
  - 🇫🇷 Français  
  - 🇷🇺 Русский
- 基于路由的语言切换
- SEO 友好的 hreflang 标记

### ⚡ 性能优化

- **Astro Islands 架构**: 
  - 默认零 JavaScript
  - 按需水合（Hydration）
  - 静态站点生成（SSG）
  - 极速首屏加载

- **资源优化**:
  - 图片懒加载
  - 内联关键 CSS
  - 字体预加载
  - 代码分割

### 🛠️ 实用工具集

- 💱 **智能汇率转换器**:
  - 实时汇率查询
  - 自定义银行牌价
  - 结售汇贴士
  - 历史汇率对比

- 📅 **智能日历**:
  - 节假日自动标记
  - 事件管理功能
  - 本地存储支持
  - 月/周视图切换

- 🕐 **世界时间**:
  - 多时区同步显示
  - 自动夏令时调整
  - 自定义城市添加

### 📸 高级画廊系统

- 🖼️ **瀑布流布局**: 
  - 响应式 Masonry 网格
  - 自动计算最优排列
  - 平滑过渡动画

- 🔍 **Lightbox 灯箱**:
  - 全屏高清浏览
  - 键盘导航（←/→/Esc）
  - 触摸滑动支持
  - 缩放功能

- 🏷️ **智能分类过滤**:
  - 多维度标签系统
  - 实时筛选效果
  - 计数统计显示

### 🛡️ 安全与 SEO

- **安全特性**:
  - Content Security Policy (CSP)
  - HTTPS Only
  - 无第三方追踪
  - XSS 防护

- **SEO 优化**:
  - 自动生成 Sitemap
  - 结构化数据（Schema.org）
  - Open Graph 标签
  - 语义化 HTML5
  - 移动友好标记

---

## 🛠️ 技术栈

### 核心框架

| 技术                                       | 版本     | 说明                                      |
| ------------------------------------------ | -------- | ----------------------------------------- |
| [Astro](https://astro.build)               | ^5.16.4  | 现代静态站点生成器，支持 Islands 架构     |
| [TypeScript](https://typescriptlang.org)   | ^5.5.0   | JavaScript 超集，提供类型安全             |
| [Node.js](https://nodejs.org)              | ≥18.14.1 | JavaScript 运行时环境                     |

### UI 框架与样式

| 技术                                                                               | 版本    | 说明                              |
| ---------------------------------------------------------------------------------- | ------- | --------------------------------- |
| [Tailwind CSS](https://tailwindcss.com)                                            | ^3.4.0  | 实用优先的原子化 CSS 框架         |
| [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)  | ^0.5.19 | 排版插件，提供美观的文章样式      |
| [@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/) | ^5.1.0 | Astro 的 Tailwind CSS 集成        |

### 工具与集成

| 技术                                                                                 | 版本    | 说明                          |
| ------------------------------------------------------------------------------------ | ------- | ----------------------------- |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)   | ^3.1.0  | 自动生成网站地图              |
| [@astrojs/check](https://docs.astro.build/en/reference/cli-reference/#astro-check)   | ^0.9.0  | Astro 项目类型检查工具        |
| [Prettier](https://prettier.io)                                                      | ^3.3.0  | 代码格式化工具                |
| [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro)          | ^0.14.0 | Astro 文件的 Prettier 插件    |

### 开发工具

- **包管理器**: npm / yarn / pnpm
- **版本控制**: Git
- **CI/CD**: GitHub Actions
- **部署**: GitHub Pages
- **代码编辑器**: VS Code（推荐）

### 推荐的 VS Code 插件

```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

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
├── 📂 .github/               # GitHub 配置
│   └── 📂 workflows/         # CI/CD 工作流
│       └── deploy.yml        # 自动部署配置
├── 📂 public/                # 静态资源目录（直接复制到构建输出）
│   ├── 📂 img/               # 图片资源
│   │   ├── 📂 branding/      # 品牌相关（logo 等）
│   │   ├── 📂 gallery/       # 画廊图片
│   │   └── 📂 icons/         # 图标文件
│   ├── 📂 music/             # 音乐文件
│   ├── 📂 fonts/             # 字体文件
│   ├── favicon.svg           # 网站图标
│   ├── manifest.json         # PWA 配置
│   └── robots.txt            # 搜索引擎爬虫规则
├── 📂 src/                   # 源代码目录
│   ├── 📂 components/        # 可复用组件
│   │   ├── 📂 templates/     # 页面级模板组件
│   │   ├── Header.astro      # 全局页头（导航栏）
│   │   ├── Footer.astro      # 全局页脚
│   │   ├── MusicPlayer.astro # 音乐播放器
│   │   ├── CookieConsent.astro # Cookie 同意弹窗
│   │   ├── HolidayGreeting.astro # 节日问候
│   │   ├── BackToTop.astro   # 返回顶部按钮
│   │   ├── MouseFollower.astro # 鼠标跟随效果
│   │   ├── ReadingProgress.astro # 阅读进度条
│   │   ├── ShareButton.astro # 分享按钮
│   │   ├── Typewriter.astro  # 打字机效果
│   │   ├── ThemeScript.astro # 主题切换脚本
│   │   ├── PageLoader.astro  # 页面加载动画
│   │   ├── QuickActions.astro # 快捷操作面板
│   │   ├── StatsCounter.astro # 统计计数器
│   │   ├── PoemHistory.astro # 诗词历史
│   │   └── NewYearEffects.astro # 新年特效
│   ├── 📂 layouts/           # 布局组件
│   │   └── BaseLayout.astro  # 基础布局（包含 head、header、footer）
│   ├── 📂 pages/             # 页面路由（文件系统路由）
│   │   ├── index.astro       # 首页（默认语言）
│   │   ├── about.astro       # 关于页面
│   │   ├── gallery.astro     # 画廊页面
│   │   ├── calendar.astro    # 日历页面
│   │   ├── currency.astro    # 汇率工具页面
│   │   ├── time.astro        # 世界时间页面
│   │   ├── timeline.astro    # 时间线页面
│   │   ├── contact.astro     # 联系页面
│   │   ├── privacy.astro     # 隐私政策
│   │   ├── terms.astro       # 服务条款
│   │   ├── license.astro     # 许可证
│   │   ├── accessibility.astro # 无障碍声明
│   │   ├── verify.astro      # 验证页面
│   │   ├── sitemap.astro     # 站点地图
│   │   ├── 404.astro         # 404 错误页面
│   │   ├── 📂 security/      # 安全相关页面
│   │   └── 📂 [lang]/        # 多语言路由目录
│   │       ├── index.astro   # 各语言首页
│   │       └── ...           # 其他语言页面
│   ├── 📂 scripts/           # 客户端 TypeScript 脚本
│   │   └── theme.ts          # 主题切换逻辑
│   ├── 📂 styles/            # 全局样式
│   │   └── global.css        # 全局 CSS 样式
│   ├── 📂 i18n/              # 国际化
│   │   └── ui.ts             # 翻译文本定义
│   └── env.d.ts              # TypeScript 环境类型定义
├── 📄 .gitignore             # Git 忽略文件配置
├── 📄 .prettierrc            # Prettier 格式化配置
├── 📄 .markdownlint.json     # Markdown lint 配置
├── 📄 astro.config.mjs       # Astro 框架配置
├── 📄 tailwind.config.mjs    # Tailwind CSS 配置
├── 📄 tsconfig.json          # TypeScript 配置
├── 📄 package.json           # 项目依赖和脚本
├── 📄 package-lock.json      # 依赖锁定文件
├── 📄 README.md              # 项目文档（本文件）
├── 📄 CHANGELOG.md           # 版本更新日志
└── 📄 LICENSE                # MIT 开源许可证
```

**目录说明**：

- **public/**: 静态文件，构建时直接复制，通过 `/` 路径访问
- **src/components/**: 可复用的 Astro 组件
- **src/layouts/**: 页面布局模板
- **src/pages/**: 基于文件系统的路由，每个 `.astro` 文件对应一个页面
- **src/i18n/**: 国际化翻译配置
- **src/scripts/**: 客户端 JavaScript/TypeScript 代码
- **src/styles/**: 全局样式表

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

## 🧩 组件文档

本项目采用模块化组件设计，每个组件都有明确的职责和用途。

### 核心组件

#### Header.astro
导航栏组件，提供网站主要导航功能。

**特性**：
- 响应式导航菜单（移动端汉堡菜单）
- 多语言切换器
- 主题切换按钮
- 粘性定位，滚动时保持可见

**使用示例**：
```astro
---
import Header from '@/components/Header.astro';
---
<Header lang="zh-CN" currentPath="/" />
```

#### Footer.astro
页脚组件，包含网站信息和社交链接。

**特性**：
- 社交媒体链接
- 版权信息
- 快速导航链接
- 多语言支持

#### BaseLayout.astro
基础布局组件，所有页面的容器。

**Props**：
- `title`: 页面标题
- `description`: 页面描述
- `lang`: 语言代码
- `image`: OG 图片（可选）

**使用示例**：
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---
<BaseLayout 
  title="我的页面" 
  description="页面描述"
  lang="zh-CN"
>
  <!-- 页面内容 -->
</BaseLayout>
```

### 功能组件

#### MusicPlayer.astro
音乐播放器组件，支持播放背景音乐。

**特性**：
- 播放/暂停控制
- 音量调节
- 进度条显示
- 播放列表支持
- 记忆上次播放状态

**配置音乐文件**：
在 `public/music/` 目录下放置音频文件，组件会自动加载。

#### CookieConsent.astro
Cookie 同意组件，符合 GDPR 规范。

**特性**：
- 用户首次访问时显示
- 选择同意后存储在 localStorage
- 可自定义文案和样式

#### HolidayGreeting.astro
节日问候组件，根据当前日期显示相应的节日祝福。

**特性**：
- 自动检测节假日
- 支持多种节日（春节、圣诞节等）
- 动画效果
- 可自定义节日列表

### 交互组件

#### BackToTop.astro
回到顶部按钮。

**特性**：
- 滚动一定距离后显示
- 平滑滚动动画
- 自动隐藏/显示

#### MouseFollower.astro
鼠标跟随效果组件。

**特性**：
- 自定义跟随效果
- 可配置延迟和样式
- 响应式（移动端自动禁用）

#### ReadingProgress.astro
阅读进度条组件。

**特性**：
- 显示页面阅读进度
- 固定在页面顶部
- 平滑动画

#### ShareButton.astro
分享按钮组件。

**特性**：
- 支持多个社交平台（微信、微博、Twitter、Facebook）
- 原生分享 API 支持
- 复制链接功能

#### Typewriter.astro
打字机效果组件。

**Props**：
- `text`: 要显示的文本
- `speed`: 打字速度（毫秒）
- `delay`: 开始前延迟

---

## ⚙️ 配置指南

### Astro 配置

项目的主要配置在 `astro.config.mjs` 文件中：

```javascript
export default defineConfig({
  site: 'https://alexander.xin',  // 网站 URL
  integrations: [
    tailwind(),                    // Tailwind CSS 集成
    sitemap({                      // 自动生成 sitemap
      i18n: {
        defaultLocale: 'zh-CN',
        locales: {
          'zh-CN': 'zh-CN',
          'zh-TW': 'zh-TW',
          'en-GB': 'en-GB',
          'fr': 'fr',
          'ru': 'ru',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh-CN',        // 默认语言
    locales: ['zh-CN', 'zh-TW', 'en-GB', 'fr', 'ru'],
    routing: {
      prefixDefaultLocale: false,  // 默认语言不使用前缀
      redirectToDefaultLocale: true,
    },
  },
  output: 'static',                // 静态站点生成
  build: {
    inlineStylesheets: 'auto',     // 自动内联小样式
  },
});
```

**配置选项说明**：
- `site`: 部署的最终 URL，用于生成正确的 canonical 链接和 sitemap
- `output`: 'static' 表示生成静态站点，'server' 表示 SSR 模式
- `prefixDefaultLocale`: 默认语言是否需要 URL 前缀

### Tailwind CSS 配置

`tailwind.config.mjs` 包含了主题定制：

```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },     // 主色调
      accent: { ... },      // 强调色
    },
    fontFamily: {
      sans: ['Inter', ...], // 默认字体
      display: ['Playfair Display', ...], // 标题字体
    },
    animation: { ... },     // 自定义动画
  },
}
```

**自定义颜色**：
在 `colors` 对象中添加新的颜色变量，遵循 50-900 的色阶。

**自定义动画**：
在 `animation` 和 `keyframes` 中定义新的动画效果。

### 国际化配置

翻译文件位于 `src/i18n/ui.ts`：

```typescript
export const ui = {
  'zh-CN': {
    'site.title': 'Alexander James Carter',
    'nav.home': '首页',
    // ... 更多翻译
  },
  'en-GB': {
    'site.title': 'Alexander James Carter',
    'nav.home': 'Home',
    // ... 更多翻译
  },
};
```

**添加新翻译**：
1. 在 `ui` 对象中为每种语言添加新的键值对
2. 在组件中使用 `t()` 函数获取翻译文本

---

## 🔧 开发指南

### 开发工作流

1. **创建功能分支**：
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **开发过程中**：
   ```bash
   npm run dev  # 启动开发服务器
   # 实时预览：http://localhost:4321
   ```

3. **构建测试**：
   ```bash
   npm run build   # 构建生产版本
   npm run preview # 预览构建结果
   ```

4. **提交代码**：
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   git push origin feature/your-feature-name
   ```

### 代码规范

项目使用以下工具确保代码质量：

- **Prettier**: 代码格式化（配置在 `.prettierrc`）
- **TypeScript**: 类型检查
- **Markdown Lint**: Markdown 文件检查（配置在 `.markdownlint.json`）

**格式化代码**：
```bash
npx prettier --write .
```

**类型检查**：
```bash
npm run build  # 会自动运行 astro check
```

### 添加新页面

1. **在 `src/pages/` 目录下创建新文件**：
   ```astro
   ---
   // src/pages/new-page.astro
   import BaseLayout from '@/layouts/BaseLayout.astro';
   import { getLangFromUrl, useTranslations } from '@/i18n/utils';

   const lang = getLangFromUrl(Astro.url);
   const t = useTranslations(lang);
   ---
   
   <BaseLayout title={t('newpage.title')} description={t('newpage.desc')} lang={lang}>
     <main>
       <h1>{t('newpage.heading')}</h1>
       <!-- 页面内容 -->
     </main>
   </BaseLayout>
   ```

2. **添加翻译文本到 `src/i18n/ui.ts`**：
   ```typescript
   'zh-CN': {
     'newpage.title': '新页面',
     'newpage.desc': '新页面描述',
     'newpage.heading': '欢迎来到新页面',
   }
   ```

3. **添加导航链接到 Header 组件**（如需要）

### 添加新语言

1. **更新 `astro.config.mjs`**：
   ```javascript
   i18n: {
     locales: [..., 'de'], // 添加德语
   }
   ```

2. **在 `src/i18n/ui.ts` 添加翻译**：
   ```typescript
   'de': {
     'site.title': 'Alexander James Carter',
     // ... 所有需要的翻译
   }
   ```

3. **更新 `languages` 对象**：
   ```typescript
   export const languages = {
     // ...
     'de': 'Deutsch',
   };
   ```

### 自定义样式

**全局样式**：
在 `src/styles/global.css` 中添加全局 CSS。

**组件样式**：
使用 Tailwind CSS 工具类或在 `<style>` 标签中添加组件样式：

```astro
<div class="custom-component">
  <!-- 内容 -->
</div>

<style>
  .custom-component {
    /* 自定义样式 */
  }
</style>
```

**使用 CSS 变量**：
在 `:root` 和 `.dark` 选择器中定义主题变量：

```css
:root {
  --color-primary: #0ea5e9;
}

.dark {
  --color-primary: #38bdf8;
}
```

---

## 🚀 部署指南

### GitHub Pages 部署

项目已配置自动部署到 GitHub Pages。

**自动部署流程**：
1. 推送到 `main` 分支
2. GitHub Actions 自动触发构建
3. 构建完成后自动部署到 GitHub Pages

**手动触发部署**：
在 GitHub 仓库的 Actions 标签页，选择 "Deploy to GitHub Pages" workflow，点击 "Run workflow"。

**配置步骤**（首次设置）：
1. 进入仓库 Settings → Pages
2. Source 选择 "GitHub Actions"
3. 确保 workflow 文件 `.github/workflows/deploy.yml` 存在

### 其他平台部署

#### Vercel
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

#### Netlify
```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod
```

**构建配置**：
- Build command: `npm run build`
- Publish directory: `dist`

#### Cloudflare Pages
1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 输出目录：`dist`

---

## 🐛 故障排查

### 常见问题

#### 问题：端口 4321 已被占用

**解决方案**：
```bash
# 查找占用端口的进程
lsof -i :4321

# 终止进程或使用其他端口
npm run dev -- --port 3000
```

#### 问题：图片未显示

**可能原因**：
1. 图片路径错误
2. 图片不在 `public/` 目录下

**解决方案**：
- 确保图片在 `public/` 目录
- 使用绝对路径：`/img/photo.jpg`（不是 `./img/photo.jpg`）

#### 问题：翻译未生效

**检查清单**：
1. ✅ 翻译已添加到 `src/i18n/ui.ts`
2. ✅ 语言代码正确（如 'zh-CN' 不是 'zh_CN'）
3. ✅ 使用 `t()` 函数获取翻译
4. ✅ 重启开发服务器

### 构建问题

#### 问题：TypeScript 类型错误

**解决方案**：
```bash
# 运行类型检查
npm run build

# 查看详细错误信息
npx astro check --watch
```

#### 问题：内存不足

**解决方案**：
```bash
# 增加 Node.js 内存限制
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

#### 问题：依赖安装失败

**解决方案**：
```bash
# 清除缓存并重新安装
rm -rf node_modules package-lock.json
npm install
```

### 运行时问题

#### 问题：深色模式不工作

**检查**：
1. 浏览器是否支持 `localStorage`
2. 检查浏览器控制台错误
3. 确认 ThemeScript 组件已加载

**解决方案**：
清除浏览器缓存和 localStorage：
```javascript
// 在浏览器控制台执行
localStorage.clear();
location.reload();
```

#### 问题：音乐播放器无法播放

**可能原因**：
1. 音频文件格式不支持
2. 浏览器自动播放策略限制

**解决方案**：
- 使用 MP3 格式
- 用户必须先与页面交互（点击）才能播放

#### 问题：页面加载慢

**优化建议**：
1. 压缩图片（使用 WebP 格式）
2. 启用懒加载：`loading="lazy"`
3. 检查网络请求（开发者工具 Network 标签）
4. 确保使用 CDN 或优化的图片托管

---

## ❓ 常见问题 (FAQ)

### 通用问题

**Q: 这个项目可以商用吗？**  
A: 可以！本项目采用 MIT 许可证，允许商业使用。但请保留原始许可证和版权声明。

**Q: 支持哪些浏览器？**  
A: 支持所有现代浏览器：Chrome 90+、Firefox 88+、Safari 14+、Edge 90+。

**Q: 可以添加更多语言吗？**  
A: 当然可以！参考[添加新语言](#添加新语言)部分的说明。

**Q: 网站是否支持 PWA？**  
A: 目前包含 `manifest.json`，可以进一步配置 Service Worker 实现完整 PWA 功能。

**Q: 图片应该放在哪里？**  
A: 静态图片放在 `public/img/` 目录下，可以通过 `/img/xxx.jpg` 访问。

**Q: 如何修改网站配色？**  
A: 在 `tailwind.config.mjs` 中修改 `colors` 配置，或在 `src/styles/global.css` 中修改 CSS 变量。

### 开发问题

**Q: 为什么选择 Astro 而不是 Next.js 或 Gatsby？**  
A: Astro 专注于内容网站，默认零 JS，性能更优。Islands 架构允许按需交互，非常适合个人网站。

**Q: 可以使用 React/Vue/Svelte 组件吗？**  
A: 可以！Astro 支持多种 UI 框架。安装对应集成后即可使用。

**Q: 开发服务器启动很慢怎么办？**  
A: 
- 清除 `node_modules` 和缓存重新安装
- 检查是否有大量未优化的图片
- 确保 Node.js 版本符合要求

**Q: 如何禁用某个功能（如音乐播放器）？**  
A: 在相应页面的布局文件中移除或注释掉对应组件即可。

**Q: TypeScript 报错怎么办？**  
A: 运行 `npm run build` 查看详细错误，或使用 `npx astro check` 进行类型检查。

### 部署问题

**Q: 部署后样式丢失？**  
A: 检查 `astro.config.mjs` 中的 `site` 配置是否正确，确保与实际部署 URL 一致。

**Q: 404 页面不显示？**  
A: GitHub Pages 需要在仓库设置中正确配置。确保 `404.astro` 存在于 `src/pages/` 目录。

**Q: 可以部署到自定义域名吗？**  
A: 可以！在 GitHub Pages 设置中添加自定义域名，并更新 `astro.config.mjs` 中的 `site` 配置。

**Q: 构建输出文件夹是哪个？**  
A: 默认输出到 `dist/` 目录。

**Q: 支持服务端渲染（SSR）吗？**  
A: 当前配置为静态站点生成（SSG）。如需 SSR，修改 `astro.config.mjs` 中的 `output` 为 `'server'` 并配置适配器。

### 性能问题

**Q: 如何进一步优化性能？**  
A: 
- 使用 WebP/AVIF 格式图片
- 启用 CDN
- 压缩静态资源
- 减少第三方脚本

**Q: Lighthouse 分数如何提高？**  
A: 
- 优化图片大小和格式
- 减少主线程工作
- 消除渲染阻塞资源
- 添加适当的缓存策略

### 功能问题

**Q: 汇率 API 有使用限制吗？**  
A: 当前使用的免费 API 有请求次数限制，建议添加本地缓存或切换到付费 API。

**Q: 音乐播放器支持哪些格式？**  
A: 支持浏览器原生支持的格式：MP3、OGG、WAV。推荐使用 MP3。

**Q: 如何添加新的工具页面？**  
A: 参考现有工具页面（如 `currency.astro`），在 `src/pages/` 创建新文件并添加相应逻辑。

---

## 📖 更新日志

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

欢迎提交 Issue 和 Pull Request！我们非常感谢社区的贡献。

### 如何贡献

1. **Fork 本仓库**
   - 点击页面右上角的 "Fork" 按钮

2. **克隆到本地**
   ```bash
   git clone https://github.com/your-username/AlexanderJ-Carter.github.io.git
   cd AlexanderJ-Carter.github.io
   ```

3. **创建特性分支**
   ```bash
   git checkout -b feature/AmazingFeature
   # 或
   git checkout -b fix/BugFix
   ```

4. **进行开发**
   ```bash
   npm install
   npm run dev
   ```

5. **提交更改**
   
   **提交信息规范**（遵循 [Conventional Commits](https://www.conventionalcommits.org/)）：
   ```bash
   git commit -m "feat: 添加新功能"
   git commit -m "fix: 修复某个 bug"
   git commit -m "docs: 更新文档"
   git commit -m "style: 代码格式调整"
   git commit -m "refactor: 代码重构"
   git commit -m "perf: 性能优化"
   git commit -m "test: 添加测试"
   git commit -m "chore: 构建/工具链变更"
   ```

6. **推送到分支**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **开启 Pull Request**
   - 在 GitHub 上打开你的 fork
   - 点击 "New Pull Request"
   - 填写 PR 描述，说明你的改动

### 代码规范

- 使用 **TypeScript** 编写代码
- 遵循项目的 **Prettier** 配置
- 组件使用 **Astro** 语法
- 样式使用 **Tailwind CSS** 工具类
- 确保代码通过 TypeScript 类型检查

### Pull Request 检查清单

在提交 PR 之前，请确保：

- [ ] 代码已格式化（`npx prettier --write .`）
- [ ] TypeScript 类型检查通过（`npm run build`）
- [ ] 功能在本地测试通过
- [ ] 添加了适当的注释（如有必要）
- [ ] 更新了相关文档（如有必要）
- [ ] 提交信息遵循规范
- [ ] PR 描述清晰说明了改动内容

### 报告问题

如果你发现了 bug 或有新功能建议：

1. **搜索现有 Issues**，避免重复
2. **创建新 Issue**，包含：
   - 清晰的标题
   - 问题描述或功能建议
   - 复现步骤（如果是 bug）
   - 预期行为 vs 实际行为
   - 截图（如适用）
   - 环境信息（浏览器、Node.js 版本等）

### 开发建议

- **小步提交**：将大的改动拆分成多个小的 commit
- **保持同步**：定期从上游 main 分支同步代码
- **测试充分**：在不同浏览器和设备上测试
- **文档同步**：代码改动时同步更新文档

### 行为准则

- 尊重所有贡献者
- 提供建设性的反馈
- 专注于改进项目
- 友善和包容

感谢你的贡献！🙏

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
