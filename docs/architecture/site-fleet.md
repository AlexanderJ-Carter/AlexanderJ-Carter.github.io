# Site fleet architecture

Control plane is unified; hosting stays distributed.

## Split

| Layer      | Owns                              | Examples                                                       |
| ---------- | --------------------------------- | -------------------------------------------------------------- |
| GitHub     | Source + static fronts            | `alexander.xin`, cook, lab, netq, linux-command, yearly        |
| Cloudflare | DNS, CDN, Access, Workers, Tunnel | apex CDN, `api.alexander.xin/time`, Access apps, blog redirect |
| SSH Cloud  | Stateful services only            | Pocket ID, Gitea, Portainer, PrivateBin, it-tools, www mirror  |

`www.alexander.xin` is the **server mirror** (better mainland reachability).  
`alexander.xin` (apex) is **GitHub Pages**. Do not redirect one to the other.

## Identity

Layers **coexist**; they do not replace each other.

| Layer                | Role                                                  | When it runs                                    |
| -------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| Cloudflare Access    | Edge gate for ops / admin URLs                        | Before origin; Pocket ID or OTP                 |
| Pocket ID            | Passkey OIDC IdP (`id.alexander.xin`)                 | Access primary IdP + app OIDC (e.g. Gitea)      |
| App-local login      | Per-app staff accounts (Gitea user, future CMS admin) | After Access (or alone on public apps)          |
| OTP (email one-time) | Access **break-glass** only                           | When Passkey IdP unavailable                    |
| TOTP                 | Not required fleet-wide                               | Optional inside an app; Passkey + OTP cover ops |

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
       ├─ 仅 Access 即可: Ops Portal、SSH（另需密钥）
       ├─ Access + 可选应用 OIDC: Portainer、Nginx UI
       └─ Access + 应用 OIDC: Gitea（Pocket ID SSO）
```

### Domain ↔ layers

| Domain                  | Layer 1 | Layer 2                          | Notes                                                                         |
| ----------------------- | ------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `alexander.xin` / `www` | —       | —                                | Public SSG; no visitor login                                                  |
| `blog.alexander.xin`    | —       | —                                | Worker `redirect-profile` → `/writing/`（公开读者）；MX/TXT 邮件保留          |
| `id.alexander.xin`      | —       | Pocket ID                        | Must stay reachable without Access                                            |
| `ops.alexander.xin`     | Access  | —                                | 只读门户                                                                      |
| `docker.alexander.xin`  | Access  | Portainer OIDC（可选）           | Logout URL 应留空，勿触发 IdP end-session                                     |
| `nginxui.alexander.xin` | Access  | Nginx UI OIDC                    | 本地用户名须匹配 `preferred_username`（`huanghaoyu`）                         |
| `ssh.alexander.xin`     | Access  | SSH 密钥/密码                    | 浏览器页只能过 Access，主机身份仍要密钥；日常用本机 `ssh cloud`，浏览器仅应急 |
| `git.alexander.xin`     | Access  | Gitea + Pocket ID OIDC           | Dual layer on purpose                                                         |
| Future `cms.*`          | Access  | Directus admin (+ optional OIDC) | Do not start on 1.6 GiB                                                       |

- IdP: Pocket ID at https://id.alexander.xin (Passkey OIDC, SQLite, ~25–50 MB RAM)
- **Ops home:** https://ops.alexander.xin — tool cards + read-only probes (Worker `ops-portal`)
- **Access Launcher (备选):** https://alexanderjcarter.cloudflareaccess.com — keep lean; primary entry is Ops Portal
- Access IdP: Generic OIDC → Pocket ID (client `cloudflare-zero-trust`, PKCE on)
- Break-glass: Access IdP `Email OTP (break-glass)` (one-time email; Cloudflare sends mail, not Resend)
- App SSO: Gitea / Portainer / Nginx UI OIDC clients; Gitea auth source `PocketID`
- Portainer Logout URL: **leave empty** (app-local logout only; do not use Pocket ID `end-session`)
- Ops icons: `public/img/ops/*.svg` (served at `https://www.alexander.xin/img/ops/`)
- Secrets on server only: `~/fleet/pocket-id/.static-api-key`, `~/fleet/pocket-id/oidc-secrets.env`, `~/fleet/pocket-id/.resend-smtp-password`（SMTP 用，勿入库）
- Public portfolio stays anonymous (`public/auth.md`)

### Email inventory (live 2026-08-03)

两套「邮箱」不是一回事，不要混改。**Access OTP 与 Pocket ID SMTP 彼此独立。**

| 邮箱放哪                            | 实际值                                                                   | 干什么                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Access 策略 Allow → Emails          | `haoyu6huang@gmail.com` + `2253940186@qq.com`（多数应用）；SSH **仅** QQ | 谁能过边缘门禁；OTP 验证码也发到这里（**Cloudflare 发信**，与 Resend 无关）                                              |
| Pocket ID 用户 `huanghaoyu` → Email | `2253940186@qq.com`                                                      | OIDC `email` claim；Access 走 Pocket ID 登录时用这个邮箱去匹配策略；Pocket ID 自有邮件（验证 / 管理员登录码 / 登录通知） |
| Cloudflare 账户登录邮箱             | Gmail（账户侧）                                                          | 管 Dashboard / 账单，**不是** Access OTP 白名单本身                                                                      |

#### Pocket ID SMTP（Resend，已配置）

| 项                | 值                                                                       |
| ----------------- | ------------------------------------------------------------------------ |
| Provider          | Resend（域名 `alexander.xin` 已 verified）                               |
| Host / Port / TLS | `smtp.resend.com` / `465` / `tls`                                        |
| User              | `resend`（密码 = Resend sending API Key，服务器文件，不入库）            |
| From              | `noreply@alexander.xin`（事务发信；无需收信 Routing）                    |
| 公开注册          | **关**（`allowUserSignups=disabled`）                                    |
| 开                | 电子邮件验证；管理员发送的电子邮件登录代码；登录时的电子邮件通知         |
| 关                | 用户自助请求的电子邮件登录代码；API 密钥过期邮件；「电子邮件默认已验证」 |

以后邀请用户：管理员建号 / 发邀请后，靠验证邮件确认邮箱；首登或破窗可用「管理员登录代码」。开放邀请制时再把注册改为 `withToken`（仍非路人自助）。Access 边缘 OTP 仍走 Cloudflare，不经过这套 SMTP。

要点：

- Pocket ID **登录靠 Passkey**，不是邮箱密码。UI 里的邮箱是身份属性 + 通知，不是第二套「访客账户」。
- Access OTP 的收件箱 = 策略里的邮箱；与 Pocket ID 邮箱字段**无自动同步**。
- 走 Pocket ID SSO 时，Access 看到的邮箱是 Pocket ID 里填的那个（当前 QQ）。Gmail 主要服务 OTP 应急 / 与账户相关场景。
- `id.alexander.xin` 前面**不能**挂 Access（它本身是 IdP）。
- 公开注册保持关闭；访客不进 Pocket ID。

### How to manage (operator)

| 要做的事                                | 去哪                                                                                                                          |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 日常进运维                              | `ops.alexander.xin`（主）；Access Launcher 备选                                                                               |
| 加/换 Passkey、改 Pocket ID 邮箱/用户名 | `id.alexander.xin` → 自己的账户设置                                                                                           |
| Access 白名单增删邮箱                   | Zero Trust → Access → 各应用 Policies（或可复用策略）                                                                         |
| 丢光 Passkey                            | 用 Access IdP `Email OTP (break-glass)`（策略里的邮箱收码）进 Ops；再在 Pocket ID 登记新 Passkey；或服务器上用 API/admin 恢复 |
| 应用 OIDC 客户端密钥                    | 服务器 `~/fleet/pocket-id/oidc-secrets.env`（勿入库）                                                                         |
| Pocket ID SMTP / 发信开关               | Admin UI → Application Configuration；密钥在服务器 `.resend-smtp-password`（勿入库）                                          |
| Resend 域名 / API Key                   | Resend Dashboard（`alexander.xin`）；sending key 名 `Pocket ID SMTP`                                                          |

## Live containers (2026-08-03)

| Name         | Role            | Notes                         |
| ------------ | --------------- | ----------------------------- |
| `pocket-id`  | OIDC IdP        | `127.0.0.1:1411`, mem ≤128 MB |
| `gitea`      | Private Git     | Access + Pocket ID OIDC       |
| `portainer`  | Docker UI       | Access + optional in-app OIDC |
| `nginx-ui`   | Nginx admin     | Access + in-app OIDC          |
| `privatebin` | Encrypted paste | Public                        |
| `it-tools`   | Tool hub        | Public via Tunnel             |

## Edge control

| Item                             | Status                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `www` Worker route               | **Removed** so Tunnel/server mirror is origin                                                                      |
| `ops.alexander.xin`              | Worker `ops-portal` 运维首页（工具卡片 + 探针）；UI 文件在 `www…/ops/`；Access Launcher 为备选入口                 |
| `blog.alexander.xin`             | Worker `redirect-profile` 公开 302 → `alexander.xin/writing/`（MX/TXT 保留）                                       |
| `about` / `bio` / `time` aliases | Still Worker redirects (`redirect-profile` / `legacy-redirect`); Redirect Rules API not available on current token |
| Pocket ID ↔ Access OIDC          | **Live** (IdP `Pocket ID` + `Email OTP (break-glass)`)                                                             |

## Retired / removed

弃用栈不保留备份：容器、镜像、数据与 `~/backups/*` 一并删除。

| Item                                          | Action                                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Ghost + MySQL                                 | Containers, images, live data, and backup dir removed                                                   |
| Shlink + web client                           | Containers, images, compose, nginx sites, Tunnel ingress, DNS CNAME, Access app, and backup dir removed |
| `link.alexander.xin` / `shlink.alexander.xin` | Tunnel + DNS + nginx sites removed                                                                      |
| Access app `Shlink`                           | Deleted                                                                                                 |
| Access app `*.newyear-eki.pages.dev`          | Deleted                                                                                                 |
| AdGuard Home                                  | Fully removed (compose + data + stack dir)                                                              |

## Blog

**博客 = Astro `/writing`。** 不恢复 Ghost；不上 Listmonk / Directus（内存不足时不做）。

| Item         | Detail                                                                              |
| ------------ | ----------------------------------------------------------------------------------- |
| 读者入口     | `https://blog.alexander.xin` → `https://alexander.xin/writing/`（Worker 302，公开） |
| 同站路径     | `/writing/`（Pages + www 镜像）                                                     |
| 写作         | Git + Markdown：`src/content/writing`                                               |
| 订阅         | 暂缓（Listmonk 等）                                                                 |
| 个人主页登录 | 不加                                                                                |

## Planned (memory-gated)

Server has **1.6 GiB RAM**. Available often ~800 MB+ after Shlink removal.

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
