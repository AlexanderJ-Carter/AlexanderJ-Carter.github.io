---
title: "从 Astro 5 升级到 Astro 6：踩坑、回退与最终方案"
description: "一次真实的框架升级记录——包括 Content Collections 迁移噩梦和 Windows 上的神秘构建失败。"
category: "技术实践"
pubDate: 2026-05-30
updatedDate: 2026-06-01
lang: zh-CN
tags: ["Astro", "升级", "静态站点"]
timeToRead: "12 min"
---

这篇文章写在升级完成的第三天。记忆还新鲜，痛苦还真实。如果你也在考虑从 Astro 5 升级到 Astro 6，希望这篇记录能让你少走一些弯路。

## 为什么升级

Astro 5.x 的 `define:vars` 指令存在一个 XSS 漏洞（CVE-2026-XXXX）。虽然我在项目中没有直接使用受影响的用法，但安全更新不应该靠"我碰巧没用"来保证。

此外，Astro 6 带来了 Content Layer API——Content Collections 的全新架构，支持从远程数据源加载内容、更好的类型推断、以及构建性能的提升。

决定升级的时候，我以为最多半天搞定。实际上花了三天。

## 升级过程

### 第一步：依赖更新

```bash
npx @astrojs/upgrade
```

跟着官方迁移指南走，先更新核心依赖：

- `astro`: 5.x → 6.x
- `@astrojs/tailwind`: 更新到兼容版本
- `@astrojs/sitemap`: 更新到兼容版本

`package.json` 里还有一些间接依赖需要手动更新。`npm ls` 检查有没有版本冲突，逐一解决。

这一步本身没什么问题。问题从下一步开始。

### 第二步：Content Collections 迁移

这是整个升级过程中最痛苦的部分。

#### 旧方案

Astro 5 的 Content Collections 使用 `src/content/config.ts` 定义 schema，Markdown 文件放在 `src/content/` 目录下。我之前的结构：

```
src/
  content/
    config.ts
    writing/
      why-personal-website.md
      photography-and-tech.md
      ...
```

#### 新方案

Astro 6 使用 Content Layer API，配置文件从 `src/content/config.ts` 迁移到项目根目录的 `src/content.config.ts`（注意位置变了），并且使用 `glob` loader 替代自动发现。

```typescript
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['zh-CN', 'zh-TW', 'en-GB', 'fr', 'ru']).default('zh-CN'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    timeToRead: z.string().optional(),
  }),
});

export const collections = { writing };
```

看起来不复杂对吧？但实际迁移中遇到了几个坑：

#### 坑 1：`z.date()` vs `z.coerce.date()`

旧版的 `date` 字段可以直接传字符串，Astro 内部处理转换。新版的 `z.date()` 要求传入 Date 对象，而 frontmatter 里的日期是字符串。解决方案是改用 `z.coerce.date()`——它会自动把字符串强制转换为 Date。

但如果你的 frontmatter 日期格式不标准（比如 `2026-5-1` 而不是 `2026-05-01`），coerce 可能失败。我花了一个小时逐个检查所有 Markdown 文件的日期格式。

#### 坑 2：`getCollection` 的返回类型变了

旧版 `getCollection('writing')` 返回的是包含 `slug` 字段的对象数组。新版的 `slug` 变成了 `id`。所有使用 `slug` 的地方（页面路由、链接生成）都需要更新。

```typescript
// 旧
const posts = await getCollection('writing');
posts.map(post => post.slug);

// 新
const posts = await getCollection('writing');
posts.map(post => post.id);
```

这个改动影响了动态路由页面 `[...slug].astro` 里的 `getStaticPaths` 函数。

#### 坑 3：`render()` 方法的变更

旧版使用 `await post.render()` 获取渲染后的内容。新版的 API 改为 `render(post)`——一个独立的函数而不是集合项的方法。

```astro
---
// 旧
const { Content } = await post.render();

// 新
import { render } from 'astro:content';
const { Content } = await render(post);
---
```

### 第三步：页面路由适配

我的网站有两组路由：
- `/writing/` 和 `/writing/[slug]`（根路径，中文）
- `/[lang]/writing/` 和 `/[lang]/writing/[slug]`（其他语言）

因为 `slug` → `id` 的变更，动态路由的参数名也需要相应更新。但更麻烦的是，`getStaticPaths` 里的 `props` 传递方式也变了。

### 第四步：Windows 上的"0 pages built"事件

迁移完所有代码之后，运行 `npm run build`。输出显示：

```
12:34:56 [build] 0 pages built.
12:34:56 [build] Complete in 0.45s.
```

零页面。没有报错，没有警告，就是零页面。

#### 排查过程

1. **检查 Content Collections 是否加载成功**：在页面组件里打印 `getCollection('writing')` 的结果。返回空数组。
2. **检查 glob 路径**：`glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' })`——这个路径对吗？
3. **尝试绝对路径**：改成 `path.resolve('./src/content/writing')`。还是空。
4. **检查文件是否存在**：`ls src/content/writing/`。文件都在。
5. **怀疑 Windows 路径分隔符**：在 Windows 上，`path.resolve` 返回反斜杠 `\`。而 glob 的 `pattern` 用正斜杠 `/`。

#### 解决方案

使用 `import.meta.url` + `fileURLToPath` 构建跨平台安全的路径：

```typescript
import { glob } from 'astro/loaders';
import { fileURLToPath } from 'node:url';

const contentDir = fileURLToPath(new URL('./content/writing', import.meta.url));

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: contentDir }),
  // ...
});
```

但实际上更简单的做法是使用相对路径，并确保 base 是相对于项目根目录的：

```typescript
loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' })
```

问题最终确认是 glob loader 在 Windows 上处理相对路径时的一个已知 bug。workaround 是在 `base` 参数中使用 `fileURLToPath`。

**注意**：这个 bug 在 Astro 6.0.3 中被修复。如果你使用的是 6.0.3 或更高版本，应该不需要这个 workaround。

### 第五步：回退决策

在排查"0 pages built"问题的过程中，我一度考虑回退到 Astro 5。当时的想法是：

- 升级花了太多时间
- 新功能（Content Layer API）对我当前的需求没有迫切的必要性
- 安全漏洞可以通过避免使用 `define:vars` 来规避

最终没有回退，原因是：

1. Astro 5 已经进入维护模式，不再有新功能更新
2. Content Layer API 对未来扩展（比如从 GitHub API 拉取项目信息）有实际价值
3. 已经投入的迁移成本，回退等于白费

但如果在一个更紧迫的项目时间线上，回退可能确实是更理性的选择。

## 最终方案

### 成功升级的部分

- 核心框架从 Astro 5 升级到 Astro 6.0.3
- Content Collections 完全迁移到 Content Layer API
- 所有页面路由正常工作
- 构建成功，输出正确的静态文件
- `slug` → `id` 的全部代码迁移

### 保留观望的部分

- View Transitions API 的跨页动画——新版本有 breaking changes，暂时禁用
- 部分第三方集成（如 astro-icon）等待兼容更新

### 构建时间对比

| 步骤 | Astro 5 | Astro 6 |
|------|---------|---------|
| 首次构建 | 12.3s | 8.7s |
| 增量构建 | 4.1s | 3.2s |
| 内容变更 | 6.8s | 4.5s |

构建时间有可感知的改善，尤其是在内容变更后的增量构建。

## 教训

### 1. 升级之前先建分支

这听起来是常识，但我一开始直接在 main 上改了。当遇到"0 pages built"问题的时候，没有干净的状态可以回退。最后不得不手动还原。正确做法：`git checkout -b upgrade/astro-6`。

### 2. 先读完迁移指南再动手

Astro 的迁移指南写得很详细，但我急于动手，跳过了"Breaking Changes"的概览部分。结果在 `slug` → `id` 和 `render()` 的问题上各自浪费了半小时。

### 3. 在 CI 环境中先测试

本地是 Windows，CI 是 Linux。glob 路径的问题在 CI 上不会出现。升级之后应该先推到一个测试分支，让 CI 跑一遍构建，确认跨平台兼容性。

### 4. 小步升级，不要一次性改太多

我一次性更新了 Astro 核心、Content Collections、路由文件、页面组件。当构建失败的时候，无法确定是哪个改动引起的问题。应该分步进行：先更新核心依赖确认构建通过，再迁移 Content Collections 确认数据加载正常，最后逐个更新页面。

### 5. 保留旧代码的注释备份

`slug` → `id` 的迁移影响了十几个文件。删除旧代码之前，先注释掉而不是直接删除。这样在排查问题的时候可以快速恢复旧逻辑做对比。确认新方案稳定之后再清理注释。

## 写在最后

框架升级永远是"技术债"——你不想做，但不做会越欠越多。Astro 6 的 Content Layer API 确实是更好的架构，迁移的痛苦是一次性的，但更好的开发体验和构建性能是长期的回报。

如果你也准备升级，我的建议是：**选一个没有截止压力的时间段，建好分支，读完指南，小步推进**。不要像我一样在周五晚上开始，结果整个周末都在和 glob 路径搏斗。
