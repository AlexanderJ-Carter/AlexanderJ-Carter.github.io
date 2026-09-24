# Folio 切换与清理说明

## 现状（2026-09）

| 入口 | 实际服务 |
|------|----------|
| `https://www.alexander.xin` | **Folio**（腾讯云 Docker，经 Cloudflare + 云端 nginx → Tailscale） |
| `https://alexanderj-carter.github.io` | GitHub Pages **网关页**（跳转到 www，并镜像 security.txt） |
| 仓库根目录 Astro (`src/`、`public/`) | **遗留参考**，内容迁移源；不再是主站 |

## CI

1. `.github/workflows/folio-deploy.yml` — 推送 `folio/**` 到 `main` 时，SSH 同步并在腾讯云 `docker compose build && up -d`，再清 Cloudflare 缓存。
2. `.github/workflows/deploy.yml` — 仅构建/发布 `gateway/` 到 GitHub Pages（轻量跳转，不再整站编译 Astro）。

### 需要配置的 Secrets

- `FOLIO_SSH_PRIVATE_KEY` — 部署用私钥
- `FOLIO_SSH_HOST` — 如 `100.111.222.66`（或可解析主机名）
- `FOLIO_SSH_USER` — 如 `ubuntu`
- `FOLIO_REMOTE_PATH` — 默认 `/home/ubuntu/folio`
- `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ZONE_ID` — 可选，用于 purge

## 删除清单（分阶段，勿一次清空）

### 可删（确认 Folio 已覆盖后）

- 纯 Astro 页面中已迁到 Folio 的路由实现（`src/pages/gallery.astro`、`fun.astro`、`about`/`contact` 模板等）
- 旧 Pages 专用脚本/workers（若不再使用）
- 重复的优化图：以 `folio/public/img/gallery-optimized` 为准

### 暂留

- `src/content/writing/**` — `folio/migrate-site.mjs` 仍可读
- `public/.well-known/security.txt`、`public/security/pgp-key.asc` — 已复制到 Folio；根目录可在切换稳定后删除
- `src/pages/security/*` — 已迁到 Folio `/security/*`；稳定后可删 Astro 版

### 永不删（规则）

- 仓库级安全文档：`.github/SECURITY.md`
- Folio 内：`folio/public/.well-known/security.txt`、`folio/public/security/pgp-key.asc`、`folio/src/app/(frontend)/security/**`

## 本地开发

```bash
# Folio
pnpm --dir folio dev

# 内容再导入 CMS（可选）
pnpm folio:migrate
```
