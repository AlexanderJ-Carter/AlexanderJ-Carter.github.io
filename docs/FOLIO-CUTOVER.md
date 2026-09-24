# Folio 切换与部署说明

## 现状（2026-09）

| 入口 | 实际服务 |
|------|----------|
| `https://www.alexander.xin` | **Folio**（腾讯云 Docker，Cloudflare → 云端 nginx → Tailscale `:3040`） |
| `https://alexanderj-carter.github.io` | GitHub Pages **网关**（`gateway/`：跳转 www + 镜像 security.txt / PGP） |
| 仓库根 Astro（`src/`、`public/`） | **遗留参考 / 迁移源**，不再参与主站发布 |

## 职责分工（有机配合）

```
开发者 push
    │
    ├─ 改 folio/** ──► folio-deploy.yml ──► SSH rsync ──► tencent docker compose
    │                                                         │
    │                                                         └─► www.alexander.xin
    │
    └─ 改 gateway/** ─► deploy.yml ──► GitHub Pages
                                          │
                                          └─► *.github.io → 刷新到 www
```

- **内容与交互**：只改 `folio/src`（页面、组件、Payload 集合、样式）。
- **公网跳转与仓库 Pages 名片**：只改 `gateway/`。
- **Astro**：可读、可 `legacy:*` 本地构建；不要把新功能写回 `src/pages`。

## CI Workflows

| 文件 | 触发 | 作用 |
|------|------|------|
| `.github/workflows/folio-deploy.yml` | `folio/**` → `main`，或手动 | 同步并重建腾讯云 Folio |
| `.github/workflows/deploy.yml` | `gateway/**` → `main`，或手动 | 发布 GitHub Pages 网关 |
| `.github/workflows/code-quality.yml` | 遗留 Astro 路径变更 | format / lint / `legacy:build`（不拦 Folio 专用 PR） |
| `.github/workflows/lighthouse.yml` | 周更 / 手动 | 对 **线上 www** 跑 Lighthouse（不再本地编 Astro） |

### Folio 部署所需 Secrets

- `FOLIO_SSH_PRIVATE_KEY`
- `FOLIO_SSH_HOST`（如 Tailscale IP `100.111.222.66`）
- `FOLIO_SSH_USER`（默认 `ubuntu`）
- `FOLIO_REMOTE_PATH`（默认 `/home/ubuntu/folio`）
- `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ZONE_ID`（可选，purge）

未配置 SSH Secrets 时，Folio job 会 skip 并打印提示；可手动部署：

```bash
ssh tencent
cd /home/ubuntu/folio
docker compose -f compose.prod.yaml build && docker compose -f compose.prod.yaml up -d
```

注意：容器端口绑在 Tailscale 地址上。机器重启后若 `:3040` 无监听，先确认 `tailscale0` 再起，必要时 `compose up -d --force-recreate`。

## 已迁 / 未迁对照（组件与路由）

### Folio 已承接

- 首页、写作 `/posts`、画廊、玩乐、关于/联系（CMS + Gate）、安全政策与致谢、隐私/条款、搜索、访客验证、OIDC 后台登录、访问量与自定义地址预览

### 仍留在 Astro（可按需迁或弃用）

- 多语言整站壳、`/tools` `/help` `/network` `/projects` `/timeline` `/uses` `/now`、NEXUS `/next/*`、各类单位换算小页等
- 写作正文源：`src/content/writing/**`（`folio/migrate-site.mjs` 仍可读）

旧 URL 已在 `folio/redirects.ts` 做一批 301/302（如 `/writing` → `/posts`、语言前缀收束）。细粒度别名继续用 Payload「重定向」集合。

## 删除清单（分阶段）

### 可删（确认 Folio 稳定后）

- 已迁路由的 Astro 页面实现、重复优化图（以 `folio/public/img/gallery-optimized` 为准）
- 仅服务旧 Pages 整站的脚本/workers（确认无引用后）

### 暂留

- `src/content/writing/**`
- 根目录 `public/.well-known/security.txt` 等（Folio / gateway 已有副本；稳定后再删根目录）

### 永不删

- `.github/SECURITY.md`
- Folio：`folio/public/.well-known/security.txt`、`folio/public/security/pgp-key.asc`、`folio/src/app/(frontend)/security/**`

## 本地

```bash
pnpm --dir folio dev   # 或 npm run folio
pnpm --dir folio build
npm run folio:migrate  # 可选
```

## 相关文档

- 根 [README.md](../README.md) — 仓库入口
- [FOLIO.md](../FOLIO.md) — Folio 本地与生产备忘
- [CLAUDE.md](../CLAUDE.md) — Agent 硬规则
