# 🌟 Alexander Carter's Personal Website

<div align="center">

![Astro](https://img.shields.io/badge/Astro-4.16.19-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**现代化、多语言、响应式的个人作品集网站**

[🌐 在线预览](https://alexander.xin) | [📖 更新日志](CHANGELOG.md) | [🚀 快速开始](#快速开始)

</div>

---

## ✨ 特性亮点

### 🎨 **视觉设计**
- 🌓 **深色/浅色主题** - 自动适配系统偏好，平滑切换动画
- 🎭 **玻璃态设计** - 现代化的毛玻璃效果和渐变背景
- 📱 **完全响应式** - 移动优先设计，完美适配所有设备
- ✨ **精致动画** - 流畅的页面过渡和交互动效

### 🌍 **多语言支持**
支持 **5 种语言** 的完整翻译：
- 🇨🇳 简体中文 (zh-CN)
- 🇺🇸 美式英语 (en-US)
- 🇬🇧 英式英语 (en-GB)
- 🇫🇷 法语 (fr)
- 🇷🇺 俄语 (ru)

### 🛠️ **实用工具**
- 💱 **智能汇率转换** - 实时汇率 + 自定义汇率计算 + 结售汇小贴士
- 📅 **智能日历** - 节假日标记、事件管理、月视图
- 🕐 **世界时间** - 多时区实时显示、API 接口
- 📊 **数据可视化** - 统计数据动态展示

### 📸 **高级画廊**
- 🖼️ **Masonry 瀑布流布局** - 自适应网格，优雅展示
- 🔍 **Lightbox 灯箱效果** - 全屏浏览，键盘/触摸导航
- 🏷️ **智能分类过滤** - 风景、自然、美食分类
- ⚡ **懒加载优化** - 渐进式图片加载，性能优越
- 📈 **作品统计** - 动态数字滚动效果

### 🎯 **性能优化**
- ⚡ **Astro Islands** - 零 JS 默认，按需加水
- 🗜️ **自动优化** - 图片压缩、代码分割、Tree-shaking
- 📦 **静态生成** - SSG 预渲染，极速访问
- 🎪 **CDN 就绪** - 边缘部署，全球加速

---

## 📁 项目结构

```
📦 AlexanderJ-Carter.github.io
├── 📂 public/                # 静态资源
│   ├── 📂 img/
│   │   ├── 📂 gallery/       # 画廊图片 (18张)
│   │   │   ├── landscape-01.jpg ~ landscape-13.jpg
│   │   │   ├── nature-flower-01.jpg ~ 02.jpg
│   │   │   └── food-01.jpg ~ 03.jpg
│   │   ├── 📂 backgrounds/   # 背景图片
│   │   ├── 📂 branding/      # 品牌资源
│   │   ├── 📂 icons/         # 图标文件
│   │   └── 📂 profile/       # 个人头像
│   ├── 📂 music/             # 音乐文件
│   └── 📂 security/          # 安全相关
├── 📂 src/
│   ├── 📂 components/        # 组件库
│   │   ├── 📂 templates/     # 页面模板
│   │   │   ├── HomeTemplate.astro
│   │   │   ├── AboutTemplate.astro
│   │   │   ├── GalleryTemplate.astro  # 🎨 升级版画廊
│   │   │   ├── CurrencyTemplate.astro # 💱 智能汇率工具
│   │   │   ├── CalendarTemplate.astro # 📅 智能日历
│   │   │   └── ...
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeScript.astro
│   │   └── ...
│   ├── 📂 pages/             # 路由页面
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── gallery.astro
│   │   ├── [lang]/           # 多语言路由
│   │   └── ...
│   ├── 📂 layouts/           # 布局组件
│   │   └── BaseLayout.astro
│   ├── 📂 scripts/           # TypeScript 脚本
│   │   ├── gallery.ts        # 🎨 画廊交互逻辑
│   │   ├── contact.ts
│   │   └── ...
│   ├── 📂 styles/            # 样式文件
│   │   └── global.css        # 全局样式 + 动画
│   └── 📂 i18n/              # 国际化
│       └── ui.ts
├── 📄 astro.config.mjs       # Astro 配置
├── 📄 tailwind.config.mjs    # Tailwind 配置
├── 📄 tsconfig.json          # TypeScript 配置
└── 📄 package.json           # 依赖管理
```

---

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: >= 18.14.1
- **包管理器**: npm / yarn / pnpm

### 🔧 安装步骤

```bash
# 1️⃣ 克隆项目
git clone https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io.git
cd AlexanderJ-Carter.github.io

# 2️⃣ 安装依赖
npm install

# 3️⃣ 启动开发服务器
npm run dev

# 4️⃣ 浏览器访问
# http://localhost:4321
```

### 📦 可用命令

| 命令              | 说明           | 用途              |
| ----------------- | -------------- | ----------------- |
| `npm run dev`     | 启动开发服务器 | 本地开发 (热重载) |
| `npm run build`   | 构建生产版本   | 静态站点生成      |
| `npm run preview` | 预览生产构建   | 本地测试生产环境  |
| `npm run astro`   | Astro CLI      | 执行 Astro 命令   |

---

## 🎨 画廊功能详解

### **新增特性**

#### 1. **Masonry 瀑布流布局**
```typescript
// 响应式网格系统
grid-cols-1     // 移动设备: 单列
md:grid-cols-2  // 平板: 双列
lg:grid-cols-3  // 桌面: 三列
```

#### 2. **Lightbox 灯箱效果**
- ✅ **全屏浏览** - 沉浸式图片查看体验
- ✅ **键盘导航** - `←` `→` 切换，`Esc` 关闭
- ✅ **触摸支持** - 移动端友好的滑动操作
- ✅ **图片计数** - 实时显示位置 (1/18)
- ✅ **平滑过渡** - 渐入渐出动画

#### 3. **智能分类过滤**
```typescript
categories = [
  'all',        // 全部 (18张)
  'landscape',  // 风景 (13张)
  'nature',     // 自然 (2张)
  'food'        // 美食 (3张)
]
```

#### 4. **性能优化**
- 🚀 **懒加载** - `loading="lazy"` 按需加载
- 🎭 **渐进增强** - 图片逐步显示
- ⚡ **交错动画** - 50ms 延迟，视觉流畅

### **交互细节**

```typescript
// 悬停效果
hover:scale-[1.03]      // 微缩放
hover:shadow-2xl        // 阴影增强
group-hover:scale-110   // 图片放大

// 动画时序
animation-delay: ${index * 0.05}s  // 交错出现
transition-duration: 500ms          // 平滑过渡
```

---

## 💱 汇率工具功能

### **核心特性**

1. **实时汇率查询**
   - 8 种主流货币支持 (USD, EUR, GBP, JPY, HKD, AUD, CAD, SGD)
   - 自动刷新，智能时间显示 (刚刚/分钟前/小时前)

2. **自定义汇率计算**
   - 支持输入银行牌价
   - 适用于结售汇场景
   - 一键填充实时汇率

3. **结售汇小贴士**
   - 银行牌价差异说明
   - 最佳兑换时机建议
   - 手机银行优势介绍
   - 境外消费注意事项

### **API 数据源**
```javascript
API: https://open.er-api.com/v6/latest/
优点: 免费、稳定、无需密钥
更新: 每24小时更新一次
```

---

## 📅 日历功能

- 📆 **月视图** - 清晰的日期网格
- 🎉 **节假日标记** - 中国法定节假日 (18个)
- ➕ **事件管理** - 添加/删除自定义事件
- 🔄 **快速导航** - 月份切换按钮

---

## 🌐 多语言实现

### **语言切换**

```typescript
// URL 路由结构
/                 → 中文 (zh-CN)
/en-US/           → 美式英语
/en-GB/           → 英式英语
/fr/              → 法语
/ru/              → 俄语
```

### **翻译管理**

```typescript
// src/i18n/ui.ts
export const ui = {
  'zh-CN': { 'nav.home': '首页' },
  'en-US': { 'nav.home': 'Home' },
  // ...
};
```

---

## 🎭 主题系统

### **自动切换**
```typescript
// 监听系统偏好
matchMedia('(prefers-color-scheme: dark)')

// 手动切换
localStorage.setItem('theme', 'dark')
```

### **CSS 变量**
```css
:root {
  --color-bg-primary: 255 255 255;
  --color-text-primary: 17 24 39;
}

.dark {
  --color-bg-primary: 15 23 42;
  --color-text-primary: 248 250 252;
}
```

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

## 📊 性能指标

| 指标                | 数值    | 说明         |
| ------------------- | ------- | ------------ |
| **Lighthouse 性能** | 95+     | 极速加载     |
| **首屏时间 (FCP)**  | < 1s    | 瞬间呈现     |
| **构建大小**        | < 500KB | 极度轻量     |
| **页面数量**        | 82      | 多语言全覆盖 |

---

## 📱 浏览器支持

| 浏览器  | 版本  |
| ------- | ----- |
| Chrome  | >= 90 |
| Firefox | >= 88 |
| Safari  | >= 14 |
| Edge    | >= 90 |

---

## 🔒 安全特性

- 🛡️ **Content Security Policy** - XSS 防护
- 🔐 **HTTPS Only** - 强制加密传输
- 🚫 **No External Scripts** - 无第三方追踪
- 🔏 **PGP Key** - 加密通信支持

---

## 📈 SEO 优化

- ✅ **Sitemap 自动生成** - 完整站点地图
- ✅ **Meta 标签优化** - 标题/描述/OG
- ✅ **语义化 HTML** - 结构清晰
- ✅ **多语言标记** - `hreflang` 支持

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### **开发流程**

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📝 更新日志

### v2.0.0 (2025-12-05)

#### 🎨 **画廊系统升级**
- ✨ 新增 Masonry 瀑布流布局
- ✨ 实现 Lightbox 灯箱效果
- ✨ 键盘导航支持 (← → Esc)
- ✨ 图片懒加载优化
- ✨ 18 张高质量作品展示
- ✨ 动态统计数字滚动

#### 💱 **汇率工具优化**
- ✨ 自定义汇率输入
- ✨ 智能时间显示
- ✨ 结售汇小贴士 (4条)
- ✨ 一键填充实时汇率
- 🐛 修复所有 TypeScript hints

#### 📅 **日历功能**
- ✨ 中国节假日标记 (18个)
- 🐛 修复 window 类型警告

#### 🌐 **多语言完善**
- ✨ 5 种语言完整支持
- ✨ 所有页面翻译覆盖

### v1.0.0 (2024-12-01)
- 🎉 初始版本发布

---

## 📄 开源协议

本项目采用 **MIT License** 开源协议。

详见 [LICENSE](./LICENSE) 文件。

---

## 👨‍💻 关于作者

**Alexander James Carter**

- 🌐 网站: [alexander.xin](https://alexander.xin)
- 📧 邮箱: [contact-us@alexander.xin](mailto:contact-us@alexander.xin)
- 💻 GitHub: [@AlexanderJ-Carter](https://github.com/AlexanderJ-Carter)
- 📝 博客: [blog.alexander.xin](https://blog.alexander.xin)

---

## 🙏 致谢

感谢以下开源项目：
- [Astro](https://astro.build) - 现代化的静态站点生成器
- [Tailwind CSS](https://tailwindcss.com) - 原子化 CSS 框架
- [TypeScript](https://typescriptlang.org) - JavaScript 超集
- [open.er-api.com](https://open.er-api.com) - 免费汇率 API

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star！**

Made with ❤️ by Alexander Carter

</div>
