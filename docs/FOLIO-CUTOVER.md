# Folio 切换与部署

## 入口

| 主机 | 目录 |
|------|------|
| `www.alexander.xin` | `folio/` · Docker · Cloudflare → nginx → Tailscale `:3040` |
| `alexanderj-carter.github.io` | `gateway/` · Pages 名片 + security 镜像 |
| `src/` | Astro 遗留（迁移源，不部署） |

## DNS

| 主机 | 指向 |
|------|------|
| `www` | Tunnel / 现网 CF 目标 |
| apex | 与 www 一致或 301→www |
| `*.github.io` | 本仓库 Pages |
| `cook` / `git` / `tools` / `id` | 各服务，勿指 Folio |

## 改哪里

- 主站 → `folio/src`
- Pages → `gateway/`
- 勿改 `src/` 当主站

推送 `folio/**` → `folio-deploy.yml`（需 `FOLIO_SSH_*`）。  
推送 `gateway/**` → `deploy.yml`。

手动：

```bash
ssh tencent
cd /home/ubuntu/folio
docker compose -f compose.prod.yaml up -d --build
# 更新导航（可选）
docker compose -f compose.prod.yaml exec folio node --import tsx scripts/configure-nav.mjs
```

## CI

| Workflow | 作用 |
|----------|------|
| `code-quality.yml` | Folio `tsc` |
| `folio-deploy.yml` | 部署主站 |
| `deploy.yml` | 部署 Pages |
| `legacy-astro.yml` | 仅手动 |
| `lighthouse.yml` | 周更扫 www |

## 本地

```bash
npm run folio
npm run folio:admin
npm run folio:migrate   # 可选
```

## 安全资产（勿删）

- `.github/SECURITY.md`
- `folio/public/.well-known/security.txt`
- `folio/public/security/pgp-key.asc`
- `folio/src/app/(frontend)/security/**`

## 相关

- [README](../README.md)
- [模板 vs 实例](FOLIO-INSTANCE.md)
- [内容地图](FOLIO-IA.md)
- [CLAUDE.md](../CLAUDE.md)
