# 🏗️ 架构文档 / Architecture Documentation

## 目录 / Table of Contents

- [中文](#中文)
- [English](#english)

---

## 中文

### 项目架构概览

本项目采用 **Astro** 框架构建，利用其 **Islands 架构** 实现最佳性能。

```
┌─────────────────────────────────────────┐
│          GitHub Pages 托管              │
│         (静态文件服务)                   │
└─────────────────────────────────────────┘
                    ↑
                    │ 部署
                    │
┌─────────────────────────────────────────┐
│        GitHub Actions CI/CD             │
│    (自动构建和部署工作流)                │
└─────────────────────────────────────────┘
                    ↑
                    │ 触发
                    │
┌─────────────────────────────────────────┐
│            Astro 构建系统                │
│      (SSG - 静态站点生成)                │
├─────────────────────────────────────────┤
│  - TypeScript 编译                       │
│  - Tailwind CSS 处理                     │
│  - 资源优化和压缩                        │
│  - Sitemap 生成                         │
└─────────────────────────────────────────┘
                    ↑
                    │
┌─────────────────────────────────────────┐
│             源代码                       │
│   ├── Components (组件)                 │
│   ├── Pages (页面路由)                  │
│   ├── Layouts (布局)                    │
│   ├── Scripts (客户端脚本)              │
│   └── i18n (国际化)                     │
└─────────────────────────────────────────┘
```

### 核心技术架构

#### 1. Astro Islands 架构

**原理**：
- 页面默认为静态 HTML（零 JavaScript）
- 仅在需要交互的组件处注入 JavaScript
- 实现部分水合（Partial Hydration）

**优势**：
- 极快的首屏加载
- 更小的 JavaScript 包
- 更好的 SEO
- 降低带宽消耗

**示例**：
```astro
---
// Header 是静态的，无需 JS
import Header from '@/components/Header.astro';
// MusicPlayer 需要交互，会水合
import MusicPlayer from '@/components/MusicPlayer.astro';
---

<Header />
<MusicPlayer client:load />
```

#### 2. 路由系统

**基于文件系统的路由**：

```
src/pages/
├── index.astro              → /
├── about.astro              → /about
├── gallery.astro            → /gallery
└── [lang]/
    ├── index.astro          → /en-GB/, /fr/, /ru/
    ├── about.astro          → /en-GB/about, /fr/about
    └── gallery.astro        → /en-GB/gallery, /fr/gallery
```

**路由特点**：
- 自动生成路由
- 支持动态路由 `[param]`
- 支持嵌套路由
- 自动代码分割

#### 3. 国际化系统

**架构设计**：

```typescript
// src/i18n/ui.ts
export const languages = {
  'zh-CN': '中文 (简体)',
  'en-GB': 'English',
  // ...
};

export const ui = {
  'zh-CN': {
    'nav.home': '首页',
    // ...
  },
  'en-GB': {
    'nav.home': 'Home',
    // ...
  },
};
```

**工作流程**：
1. URL 解析 → 确定语言代码
2. 加载对应翻译 → 从 `ui` 对象获取
3. 渲染组件 → 使用 `t()` 函数
4. SEO 优化 → 自动生成 `hreflang` 标签

**实现细节**：
```astro
---
import { getLangFromUrl, useTranslations } from '@/i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('hero.title')}</h1>
```

#### 4. 组件架构

**组件分层**：

```
Components
├── Layouts (布局组件)
│   └── BaseLayout.astro      # 基础布局，包含 HTML 结构
│
├── Templates (模板组件)
│   └── 页面级大型组件
│
├── Core Components (核心组件)
│   ├── Header.astro          # 导航
│   └── Footer.astro          # 页脚
│
├── Feature Components (功能组件)
│   ├── MusicPlayer.astro     # 音乐播放器
│   ├── CookieConsent.astro   # Cookie 同意
│   └── HolidayGreeting.astro # 节日问候
│
└── UI Components (交互组件)
    ├── BackToTop.astro       # 返回顶部
    ├── ShareButton.astro     # 分享按钮
    └── ReadingProgress.astro # 阅读进度
```

**组件通信**：
- Props（父 → 子）
- Events（子 → 父）
- Context API（跨层级）
- LocalStorage（持久化）

#### 5. 样式架构

**Tailwind CSS + 自定义 CSS**：

```
Styles
├── global.css              # 全局样式
│   ├── CSS Reset
│   ├── CSS Variables
│   └── Base Styles
│
├── Tailwind Utilities      # 原子化类
│   ├── Layout
│   ├── Typography
│   ├── Colors
│   └── Spacing
│
└── Component Styles        # 组件样式
    └── <style> 标签（Scoped）
```

**主题系统**：

```css
/* 亮色主题 */
:root {
  --color-primary: #0ea5e9;
  --color-background: #ffffff;
  --color-text: #1f2937;
}

/* 暗色主题 */
.dark {
  --color-primary: #38bdf8;
  --color-background: #111827;
  --color-text: #f3f4f6;
}
```

**主题切换流程**：
1. 检测系统偏好 → `prefers-color-scheme`
2. 读取用户选择 → `localStorage`
3. 应用主题类 → 添加/移除 `.dark`
4. 保存状态 → 更新 `localStorage`

### 数据流

#### 静态数据流

```
Source Files (.astro, .ts)
        ↓
Astro Compiler (编译时)
        ↓
Static HTML + CSS + JS
        ↓
Build Output (dist/)
        ↓
Static Server (GitHub Pages)
        ↓
Browser (用户访问)
```

#### 动态数据流（客户端）

```
User Interaction (用户交互)
        ↓
Event Handler (事件处理)
        ↓
State Update (状态更新)
        ↓
DOM Update (DOM 更新)
        ↓
LocalStorage (可选持久化)
```

### 构建流程

```bash
npm run build
    │
    ├─→ astro check        # TypeScript 类型检查
    │
    └─→ astro build
         │
         ├─→ 编译 .astro 文件 → HTML
         ├─→ 编译 TypeScript → JavaScript
         ├─→ 处理 Tailwind CSS → CSS
         ├─→ 优化资源
         │    ├─→ 压缩 HTML/CSS/JS
         │    ├─→ 内联关键 CSS
         │    └─→ 代码分割
         │
         └─→ 输出到 dist/
              ├─→ index.html
              ├─→ assets/
              │    ├─→ [hash].css
              │    └─→ [hash].js
              └─→ _astro/
```

### 部署架构

```
GitHub Repository (main 分支)
        ↓
        │ Push 触发
        ↓
GitHub Actions Workflow
        ↓
    ┌───┴───┐
    │ Build │
    │ Job   │
    └───┬───┘
        │
        ├─→ Checkout 代码
        ├─→ 设置 Node.js
        ├─→ 安装依赖 (npm ci)
        ├─→ 构建项目 (npm run build)
        └─→ 上传构建产物
        ↓
    ┌───┴───┐
    │Deploy │
    │ Job   │
    └───┬───┘
        │
        └─→ 部署到 GitHub Pages
        ↓
静态网站上线 (alexander.xin)
```

### 性能优化策略

#### 1. 构建时优化

- **代码分割**：按路由自动分割
- **Tree Shaking**：移除未使用的代码
- **压缩**：HTML/CSS/JS 压缩
- **内联 CSS**：关键 CSS 内联到 HTML

#### 2. 资源优化

- **图片懒加载**：`loading="lazy"`
- **字体优化**：`font-display: swap`
- **预加载**：关键资源 `<link rel="preload">`
- **CDN**：静态资源 CDN 加速

#### 3. 运行时优化

- **最小化 JavaScript**：默认零 JS
- **按需水合**：仅交互组件水合
- **缓存策略**：Service Worker（可选）
- **懒执行**：事件监听按需添加

### 安全架构

#### 内容安全策略 (CSP)

```html
<meta http-equiv="Content-Security-Policy" 
      content="
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
      ">
```

#### 其他安全措施

- **HTTPS Only**：强制 HTTPS
- **X-Frame-Options**：防止点击劫持
- **X-Content-Type-Options**：防止 MIME 嗅探
- **Referrer-Policy**：控制 Referrer 信息

### 扩展性设计

#### 添加新页面

```astro
// src/pages/new-page.astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="New Page">
  <!-- 内容 -->
</BaseLayout>
```

#### 添加新组件

```astro
// src/components/NewComponent.astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div>
  <h2>{title}</h2>
</div>
```

#### 添加新语言

```typescript
// src/i18n/ui.ts
export const languages = {
  // ...
  'de': 'Deutsch',  // 添加德语
};

export const ui = {
  // ...
  'de': {
    'nav.home': 'Startseite',
    // ... 其他翻译
  },
};
```

### 监控与调试

#### 构建时调试

```bash
# 详细构建日志
npm run build -- --verbose

# 类型检查
npx astro check

# 查看构建产物
ls -lah dist/
```

#### 运行时调试

- Chrome DevTools
- Lighthouse 性能审计
- Network 面板（网络请求）
- Console（日志输出）

---

## English

### Architecture Overview

This project is built with **Astro** framework, leveraging its **Islands Architecture** for optimal performance.

### Core Technical Architecture

#### 1. Astro Islands Architecture

**Principles**:
- Pages default to static HTML (zero JavaScript)
- JavaScript injected only in interactive components
- Implements Partial Hydration

**Benefits**:
- Ultra-fast initial page load
- Smaller JavaScript bundles
- Better SEO
- Reduced bandwidth consumption

#### 2. Routing System

**File-based Routing**:
- Automatic route generation
- Dynamic routes support `[param]`
- Nested routes support
- Automatic code splitting

#### 3. Internationalization System

**Design**:
- URL-based language detection
- Translation object management
- SEO-friendly with hreflang tags
- Automatic locale routing

#### 4. Component Architecture

**Component Layers**:
- Layouts: Page structure components
- Templates: Page-level large components
- Core: Essential UI components (Header, Footer)
- Feature: Functional components (MusicPlayer, etc.)
- UI: Interactive components (Buttons, etc.)

#### 5. Styling Architecture

**Tailwind CSS + Custom CSS**:
- Global styles with CSS variables
- Utility-first approach
- Component-scoped styles
- Theme system (light/dark)

### Performance Optimization

- **Build-time**: Code splitting, tree shaking, minification
- **Resource**: Image lazy loading, font optimization, preloading
- **Runtime**: Minimal JavaScript, hydration on demand, caching

### Security

- Content Security Policy (CSP)
- HTTPS enforcement
- XSS protection
- No third-party tracking

---

Made with ❤️ by Alexander Carter
