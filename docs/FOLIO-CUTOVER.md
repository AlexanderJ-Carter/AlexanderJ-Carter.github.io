# Folio 切换与部署

## 架构（终态）

| 主机 | 职责 |
|------|------|
| **`alexander.xin`（apex）** | **正典主站** → Folio（与 www 同源） |
| `www.alexander.xin` | 同 Folio；目标为 **301 → apex**（保留 path/query） |
| `alexanderj-carter.github.io` | Pages **名片**（`gateway/`），不是第二套主站 |
| `cook` / `git` / `tools` / `id` / … | 各服务，勿指 Folio |

开源仓库只保证 **Folio 应用正确**；DNS / Tunnel / Cloudflare Redirect / 密钥在**服务器与 Cloudflare 控制台**单独改。

```
访客 → Cloudflare
         ├─ alexander.xin / www  → Tunnel → nginx → Folio :3040
         └─ *.github.io          → GitHub Pages → gateway/
```

## DNS / Cloudflare / Nginx（实例侧清单）

在 Cloudflare 对 zone `alexander.xin` 完成：

1. **`www` / `@`**：均 CNAME → 同一 Tunnel，Proxied  
2. **Redirect Rules**（`scripts/provision-folio-apex.mjs`）：  
   - `www` → `https://alexander.xin${path}`（保留 query）  
   - `about` / `bio` → `/about`；`contact` → `/contact`；`time` → `/time`  
3. **别名 DNS**：`about` / `bio` / `contact` / `time` 用 **AAAA `100::`**（橙云，仅边缘跳转，不经 Tunnel）  
4. **Tunnel ingress**：含 `alexander.xin` 与 `www.alexander.xin` → 源站 HTTP（Nginx）  
5. **Workers**：仅 `legacy-redirect` 挂 `alexander.xin/*`（`/writing*`→blog、旧 HTML 路径、透传 + 安全头）  
6. **NginxUI（cloud）** 站点 **Web**：`server_name alexander.xin www.alexander.xin`，`proxy_pass http://tencent-cloud:3040`  
7. 实例 `.env.production`：`NEXT_PUBLIC_SERVER_URL=https://alexander.xin`、`FOLIO_PUBLISH=<tailscale>:3040`，再 `compose --env-file .env.production …`  

脚本：`scripts/provision-folio-apex.mjs`（DNS+Redirect）、`scripts/upload-legacy-redirect.mjs`（Worker）。  

## 改哪里（仓库）

| 路径 | 职责 |
|------|------|
| `folio/` | 主站应用（唯一业务代码） |
| `gateway/` | Pages 名片 |
| `docs/` | 切换 / 实例 / 内容地图 |

推送 `folio/**` → `folio-deploy.yml`（rsync + `compose build`）。  
推送 `gateway/**` → `deploy.yml`。

## 服务器部署

```bash
ssh tencent
cd /home/ubuntu/folio
# 仓库 rsync 后（必须 --env-file，否则 FOLIO_PUBLISH 不生效、端口只绑 127.0.0.1）：
docker compose --env-file .env.production -f compose.prod.yaml build
docker compose --env-file .env.production -f compose.prod.yaml up -d
```

`.env.production` 需含 `FOLIO_PUBLISH=100.111.222.66:3040`（tencent Tailscale），供 cloud NginxUI `Web` 反代。

密钥与邮件（仅服务器 `.env.production`，不入库）：

```bash
RESEND_API_KEY=re_…
EMAIL_FROM_ADDRESS=noreply@alexander.xin
EMAIL_FROM_NAME=Alexander Carter
CONTACT_NOTIFY_EMAIL=contact-us@alexander.xin
RESEND_SEGMENT_ID=…   # Resend → Segments → Folio
NEXT_PUBLIC_SERVER_URL=https://alexander.xin
FOLIO_PUBLISH=100.111.222.66:3040
OIDC_REDIRECT_URI=https://alexander.xin/api/oidc/callback
```

导航 / 联系表单：

```bash
docker compose --env-file .env.production -f compose.prod.yaml --profile ops run --rm folio-ops scripts/configure-nav.mjs
docker compose --env-file .env.production -f compose.prod.yaml --profile ops run --rm folio-ops scripts/configure-contact-form.mjs
```

## CI

| Workflow | 作用 |
|----------|------|
| `code-quality.yml` | Folio `tsc` |
| `folio-deploy.yml` | 部署主站 |
| `deploy.yml` | 部署 Pages |
| `lighthouse.yml` | 扫主站 |

## 本地

```bash
npm run folio
npm run folio:admin
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
