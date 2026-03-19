# CLAUDE 指南（本仓库）

本文件用于 Claude / Claude Code 在本仓库执行任务时的快速约束。
与 AGENT.md 重复时，以更具体、更新更晚的规则为准。

## 1. 项目定位

- 技术栈: Astro v5 + Tailwind CSS + TypeScript
- 架构: 静态站点 (SSG)，默认零客户端 JS
- 部署: GitHub Pages + Cloudflare
- 默认语言: zh-CN (根路径 `/`)
- 其他语言: zh-TW, en-GB(`/en/`), fr, ru

## 2. 代码改动硬规则

- 页面逻辑优先修改 `src/components/templates/`。
- `src/pages/` 仅做薄路由包装，不写复杂页面逻辑。
- 新增可见文案必须考虑多语言；优先进入 `src/i18n/ui.ts` 或沿用模板内多语言对象。
- 不得删除或破坏以下安全文件:
  - `public/.well-known/security.txt`
  - `public/security/pgp-key.asc`
  - `src/pages/security/policy.astro`
  - `src/pages/security/acknowledgments.astro`
  - `.github/SECURITY.md`
- 不得写入任何密钥、Token、凭据到仓库。

## 3. 样式与交互

- 优先使用 Tailwind utility；全局样式放 `src/styles/global.css`。
- 深色模式基于 `html.dark`，不要改坏 `ThemeScript.astro` 的无闪烁逻辑。
- 动画必须兼容 `prefers-reduced-motion`。
- 所有交互元素应保留键盘可达性和可见焦点样式。

## 4. 提交前检查

按顺序执行:

1. `npm run build`
2. `npx astro check`

如果改动了文档或策略页面，请同步更新:

- `README.md` 中对应入口
- 必要时更新 `CHANGELOG.md`

## 5. 建议工作流

1. 先读相关模板和布局文件，再做小步改动。
2. 每轮改动后先本地构建，再继续下一轮。
3. 对大改动给出简短变更摘要，方便后续追踪。
