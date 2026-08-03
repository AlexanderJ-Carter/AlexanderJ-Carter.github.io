# Site fleet architecture

Control plane is unified; hosting stays distributed.

## Split

| Layer | Owns | Examples |
| --- | --- | --- |
| GitHub | Source + static fronts | `alexander.xin`, cook, lab, netq, linux-command, yearly |
| Cloudflare | DNS, CDN, Access, Workers, Tunnel | apex CDN, `api.alexander.xin/time`, Access apps |
| SSH Cloud | Stateful services only | Pocket ID, Gitea, Portainer, PrivateBin, Shlink, it-tools, www mirror |

`www.alexander.xin` is the **server mirror** (better mainland reachability).  
`alexander.xin` (apex) is **GitHub Pages**. Do not redirect one to the other.

## Identity

Layers **coexist**; they do not replace each other.

| Layer | Role | When it runs |
| --- | --- | --- |
| Cloudflare Access | Edge gate for ops / admin URLs | Before origin; Pocket ID or OTP |
| Pocket ID | Passkey OIDC IdP (`id.alexander.xin`) | Access primary IdP + app OIDC (e.g. Gitea) |
| App-local login | Per-app staff accounts (Gitea user, future CMS admin) | After Access (or alone on public apps) |
| OTP (email one-time) | Access **break-glass** only | When Passkey IdP unavailable |
| TOTP | Not required fleet-wide | Optional inside an app; Passkey + OTP cover ops |

### Request order

```
访客（公开页 / 博客读者）
  → CDN / Pages / Tunnel → 源站静态或公开服务
  → 无 Access、无登录

运维 / 作者后台
  → Cloudflare Access（第 1 层）
       ├─ 主路径: Pocket ID（Passkey OIDC）
       └─ 应急: Email OTP IdP
  → 源站（第 2 层，按应用）
       ├─ 仅 Access 即可: Ops Portal、Shlink admin、SSH（另需密钥）
       ├─ Access + 可选应用 OIDC: Portainer、Nginx UI
       └─ Access + 应用 OIDC: Gitea（Pocket ID SSO）
```

### Domain ↔ layers

| Domain | Layer 1 | Layer 2 | Notes |
| --- | --- | --- | --- |
| `alexander.xin` / `www` | — | — | Public SSG; no visitor login |
| `blog.alexander.xin` | — | — | Ghost 已下线；备份 `~/backups/ghost-20260803/`；计划 Astro/Directus |
| `id.alexander.xin` | — | Pocket ID | Must stay reachable without Access |
| `ops.alexander.xin` | Access | — | 只读门户 |
| `docker.alexander.xin` | Access | Portainer OIDC（可选） | Logout URL 应留空，勿触发 IdP end-session |
| `nginxui.alexander.xin` | Access | Nginx UI OIDC | 本地用户名须匹配 `preferred_username`（`huanghaoyu`） |
| `shlink.alexander.xin` | Access | API Key（预置） | 管理端 |
| `ssh.alexander.xin` | Access | SSH 密钥/密码 | 浏览器页只能过 Access，主机身份仍要密钥（沙箱读不到本机 `~/.ssh`）；日常用本机 `ssh cloud`，浏览器仅应急 |
| `git.alexander.xin` | Access | Gitea + Pocket ID OIDC | Dual layer on purpose |
| Future `cms.*` | Access | Directus admin (+ optional OIDC) | Do not start on 1.6 GiB |

- IdP: Pocket ID at https://id.alexander.xin (Passkey OIDC, SQLite, ~25–50 MB RAM)
- **Ops home:** https://ops.alexander.xin — tool cards + read-only probes (Worker `ops-portal`)
- **Access Launcher (备选):** https://alexanderjcarter.cloudflareaccess.com — keep lean; primary entry is Ops Portal
- Access IdP: Generic OIDC → Pocket ID (client `cloudflare-zero-trust`, PKCE on)
- Break-glass: one-time email OTP IdP kept on Access
- App SSO: Gitea / Portainer / Nginx UI OIDC clients; Gitea auth source `PocketID`
- Portainer Logout URL: **leave empty** (app-local logout only; do not use Pocket ID `end-session`)
- Ops icons: `public/img/ops/*.svg` (served at `https://www.alexander.xin/img/ops/`)
- Secrets on server only: `~/fleet/pocket-id/.static-api-key`, `~/fleet/pocket-id/oidc-secrets.env`
- Public portfolio stays anonymous (`public/auth.md`)

## Live containers (2026-08-03)

| Name | Role | Notes |
| --- | --- | --- |
| `pocket-id` | OIDC IdP | `127.0.0.1:1411`, mem ≤128 MB |
| `gitea` | Private Git | Access + Pocket ID OIDC |
| `portainer` | Docker UI | Access + optional in-app OIDC |
| `nginx-ui` | Nginx admin | Access + in-app OIDC |
| `privatebin` | Encrypted paste | Public |
| `shlink` + `shlink-web-client` | Short links | Public jump; admin behind Access |
| `it-tools` | Tool hub | Public via Tunnel |

## Edge control

| Item | Status |
| --- | --- |
| `www` Worker route | **Removed** so Tunnel/server mirror is origin |
| `ops.alexander.xin` | Worker `ops-portal` 运维首页（工具卡片 + 探针）；UI 文件在 `www…/ops/`；Access Launcher 为备选入口 |
| `shlink.alexander.xin` | Access-protected |
| `about` / `bio` / `time` aliases | Still Worker redirects (`redirect-profile` / `legacy-redirect`); Redirect Rules API not available on current token |
| Pocket ID ↔ Access OIDC | **Live** (IdP `Pocket ID` + OTP break-glass) |

## Retired / removed

| Item | Action | Backup |
| --- | --- | --- |
| Ghost + MySQL | Containers, images, live data removed | `~/backups/ghost-20260803/` |
| `blog.alexander.xin` Tunnel ingress | Removed | — |
| `blog.alexander.xin` web CNAME | Removed (MX/TXT mail records kept) | — |
| Access app `*.newyear-eki.pages.dev` | Deleted | — |
| AdGuard Home | Fully removed (compose + data + stack dir) | — |

## Blog (post-Ghost) — decision

**Do not restore Ghost.** Prefer zero extra RAM on the 1.6 GiB host.

| Option | RAM | Authoring | Fit | Verdict |
| --- | --- | --- | --- | --- |
| **Astro `writing` as blog** | 0 (already on Pages/www) | Git + MD in `src/content/writing` | Native i18n, SSG, RSS already | **Primary** |
| Directus + Postgres | ~640 MB caps in compose; needs ≥~600 MB free | Web CMS; build hook → Astro | Good later CMS; compose exists under `~/fleet/cms/` | **Backup** — compose only until RAM ↑ |
| Decap / Sveltia on Git | 0 server | Browser UI → GitHub | Nice UX; still Git source of truth | Optional polish on primary |
| Notion / external host | 0 here | External | Breaks i18n + brand control | Skip |
| Listmonk | ~192 MB | Newsletters | Separate from blog | **Later** — not blocking “有博客可读” |

**Primary path:** treat `/writing` as the blog; point `blog.alexander.xin` at the writing index (Worker redirect or Pages/www alias). Author workflow = Git. Optional later: Access on a private preview host for drafts.

**Author “login”:** not Ghost Staff — use GitHub (repo write) and/or Access in front of any future CMS admin. Pocket ID remains IdP for Access/OIDC.

## Planned (memory-gated)

Server has **1.6 GiB RAM**. Available often ~500–600 MB with current fleet.

- Directus (`cms.alexander.xin`) + Postgres: **do not start** until more RAM
- Listmonk: same; compose only
- Ops portal Worker + read-only `ops-agent`

## Registry

Canonical list: `src/data/site-registry.ts`  
Machine export: `public/network.json`

## Pocket ID bootstrap

1. Admin registered at https://id.alexander.xin (setup complete).
2. OIDC clients: `cloudflare-zero-trust`, `gitea`, `portainer`, `nginx-ui`.
3. Cloudflare Access IdP + app sources wired; OTP kept as break-glass.
4. Portainer Logout URL should be **empty** (local logout only).

Compose path on server: `~/fleet/pocket-id/`
