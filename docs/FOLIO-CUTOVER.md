# Folio 切换与部署说明

## 现状（2026-09）

| 入口 | 实际服务 |
|------|----------|
| `https://www.alexander.xin` | **Folio**（腾讯云 Docker，Cloudflare → 云端 nginx → Tailscale `:3040`） |
| `https://alexanderj-carter.github.io` | GitHub Pages **网关名片**（`gateway/`：导航 + security 镜像；深链 404→www） |
| 仓库根 Astro（`src/`） | **遗留迁移源**，不部署、不作为 CI 门禁 |

## DNS

| 主机名 | 建议记录 | 指向 |
|--------|----------|------|
| `www.alexander.xin` | CNAME（橙云） | Cloudflare Tunnel / 现网 tunnel 目标 |
| `alexander.xin`（apex） | CNAME/ALIAS 或 Pages | 与 www 策略一致，或 301→www |
| `alexanderj-carter.github.io` | GitHub Pages 默认 | 本仓库 `gateway/` |
| `cook` / `git` / `tools` / `id` 等 | 各服务 CNAME | 见舰队文档，**勿**指到 Folio 容器 |

改 DNS 后：Cloudflare 可 purge；Pages 部署 workflow 已带可选 purge。本仓库**不能**代替你在 CF Dashboard 点保存——需你或持有 Token 的 Actions 执行。

详细隧道与舰队：[docs/architecture/site-fleet.md](architecture/site-fleet.md)。

## 职责分工

```
开发者 push
    │
    ├─ 改 folio/** ──► folio-deploy.yml ──► SSH rsync ──► tencent docker compose
    │                                                         │
    │                                                         └─► www.alexander.xin
    │
    └─ 改 gateway/** ─► deploy.yml ──► GitHub Pages
                                          │
                                          └─► *.github.io 名片 + 安全镜像
                                              （404 深链带回 www）
```

- **内容与交互**：只改 `folio/src`。
- **Pages 名片与安全镜像**：只改 `gateway/`。
- **Astro（`src/`）**：仅迁移源；下一阶段删除已迁页面与 `legacy:*` 依赖。

## CI Workflows

| 文件 | 触发 | 作用 |
|------|------|------|
| `.github/workflows/folio-deploy.yml` | `folio/**` → `main`，或手动 | 同步并重建腾讯云 Folio |
| `.github/workflows/deploy.yml` | `gateway/**` → `main`，或手动 | 发布 GitHub Pages 网关 |
| `.github/workflows/code-quality.yml` | `folio/**` 变更 | Folio `tsc` 门禁 |
| `.github/workflows/legacy-astro.yml` | **仅手动** | 可选核对遗留 Astro 构建 |
| `.github/workflows/lighthouse.yml` | 周更 / 手动 | 对 **线上 www** 跑 Lighthouse |

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

- 首页、画廊、玩乐、工具（时间/单位/汇率/QR）、研究页、关于/联系（Gate）、公告横幅、隐私/条款、安全、OIDC、搜索

### 仍留在 Astro（下一阶段删除或迁完再删）

- 多语言壳、`/projects` `/help` `/network` 等未迁页
- `src/content/writing/**`（migrate 仍可读，迁稳后再归档）

旧 URL 已在 `folio/redirects.ts` 做一批 301/302（如 `/writing` → `/posts`、语言前缀收束）。细粒度别名继续用 Payload「重定向」集合。

## 删除清单（分阶段）

### 可删（确认 Folio 稳定后 · 第一阶段起可动手）

- 已迁路由的 Astro 页面实现、重复优化图（以 `folio/public/img/gallery-optimized` 为准）
- 仅服务旧 Pages 整站的脚本/workers（确认无引用后）
- 根目录 `legacy:*` npm 脚本与 Astro 依赖（下一阶段整包移除）

### 暂留

- `src/content/writing/**`（`folio/migrate-site.mjs` 仍可读）
- 根目录 `public/.well-known/security.txt` 等（Folio / gateway 已有副本；稳定后再删根目录）

### 永不删

- `.github/SECURITY.md`
- Folio：`folio/public/.well-known/security.txt`、`folio/public/security/pgp-key.asc`、`folio/src/app/(frontend)/security/**`

### 已承接（相对初版 CUTOVER 新增）

- `/tools` `/time` `/units` `/currency` `/qr`、玩乐扩展小工具、站点公告 Global、`PageChrome` 子页壳、专用 `/contact`

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
