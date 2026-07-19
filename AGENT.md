# AGENT 指南（面向 AI 助手与自动化工具）

> 本文件面向 GitHub Copilot、Cursor、Claude Code 等智能开发助手，用于约束自动修改行为并提供项目上下文。
>
> **版本**: 3.1.0 | **最后更新**: 2026-03-19

## AI 配置文件关系

- `AGENT.md`: 面向通用 AI 助手的完整规则与项目上下文（主文档）。
- `.github/copilot-instructions.md`: GitHub Copilot 的高优先级实现约束。
- `CLAUDE.md`: Claude / Claude Code 的精简执行规则。

当三者存在冲突时，优先级建议为：

1. `.github/copilot-instructions.md`
2. `AGENT.md`
3. `CLAUDE.md`

---

## 1. 项目概览

### 1.1 基本信息

| 项目属性   | 值                                       |
| ---------- | ---------------------------------------- |
| **类型**   | 个人作品集与工具站点                     |
| **主题**   | 摄影 / 代码 / 设计 / 生活记录            |
| **技术栈** | Astro v5 + TypeScript + Tailwind CSS     |
| **部署**   | GitHub Pages（静态资源）+ Cloudflare CDN |
| **域名**   | https://alexander.xin                    |

### 1.2 多语言支持

| 语言代码 | 语言名称 | 路由前缀           |
| -------- | -------- | ------------------ |
| `zh-CN`  | 简体中文 | `/` (默认，无前缀) |
| `zh-TW`  | 繁體中文 | `/zh-TW/`          |
| `en-GB`  | English  | `/en/`             |
| `fr`     | Français | `/fr/`             |
| `ru`     | Русский  | `/ru/`             |

### 1.3 安全页面

- **站内**: `/security/policy`、`/security/acknowledgments`
- **标准**: `/.well-known/security.txt` (RFC 9116)
- **PGP**: `/security/pgp-key.asc`

### 1.4 架构特点

项目整体是 **纯静态站点**，采用 Astro Islands 架构：

- 默认零客户端 JS，按需水合交互组件
- 无自托管数据库或后端
- 如需动态能力，优先使用第三方 API 或边缘函数（Cloudflare Workers 等）
- 前端不存储任何机密信息

---

## 2. 目录结构

```
├── .github/
│   ├── workflows/deploy.yml      # GitHub Actions 自动部署
│   ├── SECURITY.md               # GitHub 安全政策
│   └── copilot-instructions.md   # Copilot 指令
├── public/                       # 静态资源（直接复制）
│   ├── img/                      # 图片资源
│   │   ├── branding/             # Logo、favicon
│   │   ├── gallery/              # 画廊图片
│   │   ├── profile/              # 个人照片
│   │   └── ...
│   ├── music/                    # 音乐资源 + manifest.json
│   ├── security/                 # PGP 公钥等
│   ├── .well-known/security.txt  # 安全联系信息
│   ├── robots.txt
│   ├── humans.txt
│   └── manifest.json             # PWA 清单
├── src/
│   ├── components/               # 可复用组件
│   │   ├── templates/            # 页面模板组件
│   │   ├── Header.astro          # 导航栏
│   │   ├── Footer.astro          # 页脚
│   │   ├── MusicPlayer.astro     # 音乐播放器
│   │   └── ...                   # 其他组件
│   ├── layouts/
│   │   └── BaseLayout.astro      # 基础布局
│   ├── pages/                    # 页面路由
│   │   ├── [lang]/*.astro        # 多语言路由
│   │   └── security/*.astro      # 安全页面
│   ├── i18n/
│   │   └── ui.ts                 # 多语言文本配置
│   ├── scripts/                  # 客户端脚本
│   └── styles/                   # 全局样式
├── scripts/                      # 构建脚本
│   └── generate-music-manifest.js
├── docs/                         # 文档目录
│   └── SECURITY-REVIEW.md        # 安全审查概要
├── astro.config.mjs              # Astro 配置
├── tailwind.config.mjs           # Tailwind 配置
├── tsconfig.json                 # TypeScript 配置
├── AGENT.md                      # 本文件
├── README.md                     # 项目说明
├── LICENSE                       # BSD 3-Clause
└── NOTICE                        # 内容许可 CC BY-NC-ND 4.0
```

---

## 3. 修改原则（给 AI / Agent）

### 3.1 总体原则

| 原则           | 说明                                                                     |
| -------------- | ------------------------------------------------------------------------ |
| **内容优先**   | 本项目核心是「个人表达与作品展示」，避免削弱文字与影像的情绪表达         |
| **渐进式改动** | 优先小步可回滚的修改：文案润色、排版优化、可访问性增强                   |
| **保持多语言** | 凡是新增 UI 文本，**必须同时考虑多语言**，统一通过 `src/i18n/ui.ts` 管理 |
| **安全意识**   | 不引入明文机密，谨慎接入第三方脚本/服务                                  |
| **性能意识**   | 保持静态站点优势，避免不必要的客户端 JS                                  |

### 3.2 文件修改优先级

**优先级 1 - 页面内容层**（`src/components/templates/*.astro`）

- 可以适度调整排版、模块结构、细节动效
- 新增区块应复用现有组件和样式

**优先级 2 - 页面壳层**（`src/layouts/BaseLayout.astro`、`Header.astro`、`Footer.astro`）

- 只在有明确收益（SEO、可访问性、导航清晰度）时调整
- 保持现有导航结构和语言切换行为

**优先级 3 - 跨站逻辑/配置**（`astro.config.mjs`、`tailwind.config.mjs`、`src/scripts/*.ts`）

- 非必要不要变更
- 如果必须修改，应保证向下兼容并在 PR 说明中突出

### 3.3 一律禁止的行为

| 禁止行为         | 原因                                                                  |
| ---------------- | --------------------------------------------------------------------- |
| 引入明文机密     | API Key、Token、Cookie 秘钥、数据库连接串等不可出现在代码中           |
| 接入跟踪脚本     | Google Analytics、广告 SDK 等，除非显式更新隐私说明                   |
| 强行接入重型后端 | Node/Express、数据库等应使用独立仓库或 Serverless 平台                |
| 删除安全文件     | `/public/.well-known/security.txt`、`/public/security/pgp-key.asc` 等 |
| 硬编码多语言文本 | 所有 UI 文本必须通过 `src/i18n/ui.ts` 管理                            |

---

## 4. 代码模式与约定

### 4.1 Template 模式

页面文件仅做**薄封装**，实际内容在 `src/components/templates/*.astro`：

```astro
---
import ExampleTemplate from '../components/templates/ExampleTemplate.astro';
---

<!-- src/pages/example.astro -->
<ExampleTemplate lang="zh-CN" />
```

```astro
---
import ExampleTemplate from '../../components/templates/ExampleTemplate.astro';
const { lang } = Astro.params;
---

<!-- src/pages/[lang]/example.astro -->
<ExampleTemplate lang={lang} />
```

### 4.2 文本与翻译

所有可见 UI 文本统一放在 `src/i18n/ui.ts` 的 `ui` 字典中：

```typescript
// src/i18n/ui.ts
export const ui = {
  'zh-CN': {
    'nav.home': '首页',
    'hero.greeting': '你好，我是',
    // ...
  },
  'en-GB': {
    'nav.home': 'Home',
    'hero.greeting': "Hi, I'm",
    // ...
  },
} as const;
```

使用方式：

```astro
---
import { useTranslations } from '../../i18n/ui';
const t = useTranslations(lang);
---

<a href="/">{t('nav.home')}</a>
```

**新增 key 的规则**：

1. 在 `ui['zh-CN']` 中先写简体中文源文案
2. 为其他语言补充翻译（可用英文占位，但不要留空）
3. 避免使用过长、含歧义的 key 名

### 4.3 语言路径辅助函数

在模板中构建多语言链接：

```typescript
function getLangPath(path: string): string {
  if (lang === 'zh-CN') return path;
  const prefix = (lang as string) === 'en-GB' ? 'en' : lang;
  return `/${prefix}${path}`;
}
```

### 4.4 样式约定

- **Tailwind 优先**: 使用 Tailwind utility classes
- **CSS 变量**: 使用 `var(--color-xxx)` 引用主题颜色
- **暗色模式**: 使用 `dark:` 前缀
- **动画**: 定义在 `tailwind.config.mjs` 和组件 `<style>` 中
- **无障碍**: 注意 `prefers-reduced-motion` 媒体查询

---

## 5. 安全与隐私注意事项

### 5.1 前端安全

| 关注点   | 措施                                                                    |
| -------- | ----------------------------------------------------------------------- |
| 敏感数据 | 站点不接受密码、身份证号、银行卡号等高敏感数据                          |
| 表单处理 | 不在前端硬编码表单服务 Token，优先 `mailto:` 或第三方无代码表单         |
| 脚本来源 | 默认使用 Astro 内联脚本或本地 `src/scripts/*.ts`，避免不可信 CDN        |
| XSS 防护 | 不使用 `innerHTML` / `dangerouslySetInnerHTML`，内容通过 Astro 模板渲染 |

### 5.2 与外部服务的集成

如需新增能力（访客留言、API 调用等）：

1. 优先选择**可信第三方/平台**（Cloudflare / Vercel / Supabase 等）
2. 将密钥配置在**平台侧的环境变量**，不写入本仓库
3. 在 `README.md` 或 `docs/*.md` 中说明数据流向与隐私影响

### 5.3 安全文件清单

以下文件不得删除或破坏其功能：

```
public/.well-known/security.txt    # RFC 9116 安全联系
public/security/pgp-key.asc        # PGP 公钥
src/pages/security/policy.astro    # 安全政策页面
src/pages/security/acknowledgments.astro  # 安全致谢页面
.github/SECURITY.md                # GitHub 安全政策
```

---

## 6. 设计与交互风格

### 6.1 整体风格

- **关键词**: Darkroom Folio（暗房对开本）、摄影优先、编辑式排版
- **核心原则**: 品牌与摄影画面优先；子页读成对开本而非组件墙
- **响应式**: 移动端优先；右下角 Studio Dock 统一浮动控件

### 6.2 视觉系统

**命题**: Cyanotype / Darkroom Folio — 冷石色纸面 + 蓝晒青墨

**颜色** (CSS variables in `src/styles/global.css`):

- Light paper: cool stone (`240 242 241`)
- Dark ink: warm charcoal (`15 17 19`)
- Accent: cyanotype teal `#3d7382` / `primary-500`
- 禁止 purple / pink 装饰渐变

**字体**:

- Body: Source Serif 4 + Noto Serif SC
- Display / Heading: Syne
- Meta: `.meta-mono` 系统等宽

**签名元素**:

- Contact Sheet：细边框、帧号、胶片接触印样节奏
- Folio Numbers：杂志式页码 / Plate 标记
- Cyanotype Sleeves：Music 封面用确定性 CSS 几何蓝晒（无 emoji）
- Studio Dock：Music / Search / BackToTop 同一右栏视觉语言

**效果**（克制）:

- 纸质颗粒 + 轻微 vignette
- 纸质面板（`.glass-card` 仅作兼容别名）
- 已删除 aurora / glitch / particle / liquid-glass / bento 遗留特效

### 6.3 动效原则

| 原则         | 实现                                   |
| ------------ | -------------------------------------- |
| 尊重用户偏好 | 使用 `prefers-reduced-motion` 媒体查询 |
| 渐进增强     | 核心内容不依赖动画                     |
| 性能优先     | 优先 CSS 动画，避免 JS 动画            |
| 意义明确     | 动画服务于用户理解，不为动画而动画     |

---

## 7. 页面与功能清单

### 7.1 主要页面

| 页面   | 路径        | 说明                                            |
| ------ | ----------- | ----------------------------------------------- |
| 首页   | `/`         | 全幅摄影 Hero、Featured、Studio、Focus、Writing |
| 画廊   | `/gallery`  | 接触印样网格 + 灯箱，支持分类筛选               |
| 关于   | `/about`    | 个人简介、研究与作品                            |
| 联系   | `/contact`  | 联系方式                                        |
| 时间线 | `/timeline` | 个人成长时间线                                  |
| 项目   | `/projects` | 项目展示                                        |
| Now    | `/now`      | 当前状态（/uses 风格）                          |
| Uses   | `/uses`     | 使用的工具和设备                                |

### 7.2 工具页面

| 页面     | 路径        | 说明                 |
| -------- | ----------- | -------------------- |
| 日历     | `/calendar` | 智能日历             |
| 时间     | `/time`     | 世界时钟             |
| 汇率     | `/currency` | 货币转换             |
| 单位换算 | `/units`    | 温度、长度、重量换算 |
| QR 生成  | `/qr`       | URL 转二维码         |
| 彩蛋     | `/fun`      | 趣味页面             |

### 7.3 法律页面

| 页面     | 路径             | 说明       |
| -------- | ---------------- | ---------- |
| 隐私政策 | `/privacy`       | 隐私说明   |
| 使用条款 | `/terms`         | 服务条款   |
| 许可证   | `/license`       | 许可证信息 |
| 无障碍   | `/accessibility` | 无障碍声明 |
| 网站地图 | `/sitemap`       | 站点地图   |

---

## 8. 推荐的未来扩展方向

这些是**可以考虑但当前未必实现**的方向：

### 8.1 短期优化

- [ ] **性能优化**: 添加图片懒加载、WebP 格式支持
- [ ] **SEO 增强**: 完善结构化数据、Open Graph 标签
- [ ] **无障碍**: 增强键盘导航、屏幕阅读器支持
- [ ] **PWA**: 添加 Service Worker，支持离线访问

### 8.2 中期扩展

- [ ] **创作日志/Lab**: 时间线展示「最近在折腾什么」
- [ ] **博客系统**: 使用 Astro Content Collections 管理文章
- [ ] **相册管理**: 自动扫描图片目录生成相册索引

### 8.3 长期规划

- [ ] **Serverless 集成**: Cloudflare Workers 构建极简 API
- [ ] **访客互动**: 使用 Giscus/GitHub Discussions 实现评论
- [ ] **Analytics**: 接入隐私友好的统计（Plausible、Umami）

---

## 9. 提交与审查建议

对于 Agent 生成的 PR，建议包含：

1. **简短摘要**: 说明本次变更是「文案/样式/结构/安全文档/工具页改进」中的哪一类
2. **对用户体验的影响**: 例如「首页增加一个『最近在做什么』小节」
3. **对安全与隐私的影响**: 如果接入或更改了任何外部脚本/服务，必须单独解释
4. **向后兼容性**: 说明是否需要额外部署步骤或环境变量支持

---

## 10. 常见任务示例

### 10.1 添加新页面

1. 创建模板组件: `src/components/templates/NewPageTemplate.astro`
2. 创建页面入口: `src/pages/new-page.astro`
3. 创建多语言版本: `src/pages/[lang]/new-page.astro`
4. 添加翻译: 在 `src/i18n/ui.ts` 中添加相关 key
5. 更新导航: 在 `Header.astro` 中添加链接

### 10.2 添加新组件

1. 创建组件: `src/components/NewComponent.astro`
2. 在需要的模板中导入使用
3. 如果包含文本，添加多语言支持

### 10.3 修改样式

1. 优先使用 Tailwind utility classes
2. 组件特定样式放在组件 `<style>` 标签中
3. 全局样式放在 `src/styles/global.css`
4. 自定义 Tailwind 主题在 `tailwind.config.mjs`

---

只要不违反本文所述约束，AI 助手可以自主地在本项目上进行体验优化与内容扩展。如有不确定之处，请优先询问用户确认。
