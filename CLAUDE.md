# CLAUDE 指南（本仓库）

本文件用于 Claude / Claude Code 在本仓库执行任务时的快速约束。
与 AGENT.md 重复时，以更具体、更新更晚的规则为准。

## 1. 项目定位（2026-09 起）

- **主站**: `folio/` — Payload 3 + Next.js（Docker 部署于腾讯云，域名 `www.alexander.xin`）
- **GitHub Pages**: `gateway/` — 轻量跳转到 www，并镜像 security.txt / PGP
- **遗留**: 根目录 Astro（`src/`、`public/`）仅作迁移源与参考，勿再当主站改版入口
- 切换说明: [docs/FOLIO-CUTOVER.md](./docs/FOLIO-CUTOVER.md)

## 2. 代码改动硬规则

- 站点功能优先改 `folio/src/`（页面、组件、导航、样式）。
- 勿删除 Folio 安全资产:
  - `folio/public/.well-known/security.txt`
  - `folio/public/security/pgp-key.asc`
  - `folio/src/app/(frontend)/security/**`
  - `.github/SECURITY.md`
- 根目录 Astro 安全文件在切换稳定前也不要删。
- 不得写入任何密钥、Token、凭据到仓库。

## 3. 样式与交互（Folio）

- 前台沿用 Folio / 暗房视觉；后台登录见 `custom.scss` + Pocket ID。
- 动画必须兼容 `prefers-reduced-motion`。
- 交互元素保留键盘可达与可见焦点。

## 4. 提交前检查

Folio 改动:

1. `pnpm --dir folio build`（或在服务器 compose build）
2. 关键路由手动点验（/, /gallery, /fun, /admin/login, /security/policy）

文档或切换策略变更时同步 `docs/FOLIO-CUTOVER.md` 与必要时 `README.md`。

## 5. 建议工作流

1. 先读 Folio 相关页面/组件，再小步改动。
2. 部署走腾讯云 Docker；GitHub Actions 见 `folio-deploy.yml`（需 SSH secrets）。
3. 未经许可不要 `git push`。
