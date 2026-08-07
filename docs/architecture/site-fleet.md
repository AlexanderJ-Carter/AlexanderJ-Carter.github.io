# Site fleet architecture

Control plane is unified; hosting stays distributed.

## Split

| Layer      | Owns                              | Examples                                                       |
| ---------- | --------------------------------- | -------------------------------------------------------------- |
| GitHub     | Source + static fronts            | `alexander.xin`, cook, lab, netq, linux-command, yearly        |
| Cloudflare | DNS, CDN, Access, Workers, Tunnel | apex CDN, `api.alexander.xin/time`, Access apps, blog via Tunnel |
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
| `blog.alexander.xin`    | —       | —                                | 公开写作主场：Tunnel → nginx-ui，同仓 `dist`；**无 Access**；MX/TXT 邮件保留  |
| `id.alexander.xin`      | —       | Pocket ID                        | Must stay reachable without Access                                            |
| `ops.alexander.xin`     | Access  | —                                | 只读门户                                                                      |
| `docker.alexander.xin`  | Access  | Portainer OIDC（可选）           | Logout URL 应留空，勿触发 IdP end-session                                     |
| `nginxui.alexander.xin` | Access  | Nginx UI OIDC                    | 本地用户名须匹配 `preferred_username`（`huanghaoyu`）                         |
| `ssh.alexander.xin`     | Access  | SSH 密钥/密码                    | 浏览器页只能过 Access，主机身份仍要密钥；日常用本机 `ssh cloud`，浏览器仅应急 |
| `remote.alexander.xin`  | Access  | —（说明页 + 可选 `/ws`）         | 原生客户端走 Tailscale ID/Relay，不经此域名协议端口                           |
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

## Live containers (2026-08-07)

| Name         | Role            | Notes                         |
| ------------ | --------------- | ----------------------------- |
| `pocket-id`  | OIDC IdP        | `127.0.0.1:1411`, mem ≤128 MB |
| `gitea`      | Private Git     | Access + Pocket ID OIDC       |
| `portainer`  | Docker UI       | Access + optional in-app OIDC |
| `nginx-ui`   | Nginx admin     | Access + in-app OIDC          |
| `privatebin` | Encrypted paste | Public                        |
| `it-tools`   | Tool hub        | Public via Tunnel             |

## Host services (non-container)

| Service              | Role                         | Access model                                                                 |
| -------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| `rustdesk-hbbs/hbbr` | RustDesk ID + Relay          | 协议口仅经 UFW / Tailscale 可达；`remote.alexander.xin` HTTP 经 Access       |
| `vlmcsd`             | Windows/Office KMS（自用）   | 非 HTTP，**不能**套 Cloudflare Access；默认 bind `0.0.0.0:1688`，公网靠 UFW 挡；日常走 Tailscale。不上 Ops 主推卡片 |

### RustDesk（2026-08-07）

- 单元：`rustdesk-hbbs.service` / `rustdesk-hbbr.service`（数据目录 `/var/lib/rustdesk-server/`）
- **网页**：`remote.alexander.xin` 经 Access（Pocket ID Passkey / Email OTP）；匿名应 302
- **客户端**：ID/Relay = Tailscale `100.126.166.111`（主机名 `cloud`）；Key = `id_ed25519.pub`（Access 登录后说明页可见；**私钥勿入库**）
- hbbs：`-r 100.126.166.111 -k <pubkey>`；私钥权限 `600`
- 协议口 21115–21119 监听全接口，但 UFW 默认 deny + `Anywhere on tailscale0` allow → **公网不通、Tailscale 通**

### KMS / vlmcsd（先问清用法再收口）

- KMS 是 TCP 1688，无网页登录，**无法**挂 Access / Passkey
- 当前单元：`-L 0.0.0.0:1688`（与加固前一致）；**未**对公网开 UFW 1688（不扩大暴露）
- 实测（2026-08-07）：公网 `IP:1688` 不通；Tailscale `100.126.166.111:1688` 通
- 两种方案（互不锁死，需本人确认后再改）：
  1. **推荐默认（既能用又相对安全）**：保持现状 — bind 全接口 + UFW 挡公网；激活地址填 `100.126.166.111:1688`（设备需在同一 Tailnet）
  2. **更严**：bind 仅 Tailscale `100.126.166.111:1688`（机器无 Tailscale 时不可用）
  3. **临时公网激活**（扩大暴露，用完收回）：UFW allow 1688 +（可选）云安全组放行；**默认不要开**

## Edge routing decision (2026-08-07)

**原则：** HTTP 边缘真相在 **nginx-ui 容器**（`127.0.0.1:80`，按 `server_name` 分流）。Tunnel 远程配置已统一；勿再给同一 hostname 配「直连端口 + nginx」双路径。主机 `nginx` 服务 **inactive**（遗留 `sites-enabled` 勿当真相；清理需 sudo）。

| Hostname | 公网 | HTTP | 需登录 | 当前 Tunnel service | 应有路径 | Access | 本人怎么用 |
| -------- | ---- | ---- | ------ | ------------------- | -------- | ------ | ---------- |
| `www.alexander.xin` | 是 | 是 | 否 | `http://127.0.0.1:80` → nginx `Web` | **经 nginx**（静态） | 否 | 国内镜像浏览 |
| `paste.alexander.xin` | 是 | 是 | 否 | `http://127.0.0.1:80` → nginx `Paste` → `:8081` | **经 nginx**（CSP/sub_filter） | 否 | 直接打开粘贴 |
| `tools.alexander.xin` | 是 | 是 | 否 | `http://127.0.0.1:80` → nginx `Tool` → `:8080` | **经 nginx**（统一头） | 否 | 直接打开工具箱 |
| `id.alexander.xin` | 是 | 是 | IdP 自身 | `http://127.0.0.1:80` → nginx `PocketID` → `:1411` | **经 nginx**（关 Rocket Loader） | **否**（是 IdP） | Passkey / 管 OIDC 客户端 |
| `git.alexander.xin` | 是 | 是 | 是 | `http://127.0.0.1:80` → nginx `Gitea` → `:3000` | **经 nginx**（`client_max_body_size 100M` + WS） | **是** | Access → Gitea（可再 Pocket ID SSO） |
| `docker.alexander.xin` | 是 | 是 | 是 | `http://127.0.0.1:80` → nginx `Portainer` → `:9100` | **经 nginx**（WS） | **是** | Access → Portainer |
| `nginxui.alexander.xin` | 是 | 是 | 是 | `http://127.0.0.1:80` → nginx `nginx-ui` → `:9000` | **经 nginx**（WS） | **是** | Access → Nginx UI |
| `remote.alexander.xin` | 是 | 是 | 是 | `http://127.0.0.1:80` → nginx `remote`（说明 + `/ws`） | **经 nginx**（WS） | **是** | 网页看 Key；客户端走 Tailscale |
| `ssh.alexander.xin` | 是 | Access SSH | 是 | `ssh://localhost:22` | **Tunnel 直连 SSH**（不经 nginx） | **是** | 日常 `ssh cloud`；浏览器仅应急 |
| `ops.alexander.xin` | 是 | 是 | 是 | （Worker，非 Tunnel） | Cloudflare Worker | **是** | 运维首页 |
| `alexander.xin`（apex） | 是 | 是 | 否 | — | GitHub Pages + CDN | 否 | 全球主站 |
| `blog.alexander.xin` | 是 | 是 | 否 | `http://127.0.0.1:80` → nginx `Blog`（同 www `dist`） | **经 nginx**（静态写作主场） | **否** | 读文章 / RSS；`/` → `/writing/` |
| `about` / `bio` / `time` | 是 | 是 | 否 | — | Worker 重定向 | 否 | 别名入口 |
| `api.alexander.xin/time*` | 是 | 是 | 否 | — | Worker `time-api` | 否 | `GET/HEAD …/time` 或 `/time/now` |
| RustDesk 协议口 | 否* | 否 | N/A | **不进** HTTP Tunnel | Tailscale（UFW 挡公网） | 不适用 | ID/Relay=`100.126.166.111` |
| KMS `1688` | 否* | 否 | 无法 Access | **不进** HTTP Tunnel | Tailscale（见上节） | 不适用 | 激活服务器填 Tailscale IP |

\*进程可能 `0.0.0.0` 监听，但公网实测不通（UFW / 云安全组）。

**为何不全直连容器端口：** 已统一走 nginx，便于 `server_name`、转发头、WS、`client_max_body_size`、PrivateBin CSP 修补、Pocket ID `data-cfasync`。再开 Tunnel→`:8081` 等会与现网打架。

## Edge control

| Item                             | Status                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Tunnel `mycloud` ingress         | HTTP 子域（含 **blog**）→ `http://127.0.0.1:80`；仅 `ssh` → `ssh://localhost:22`                                   |
| nginx-ui                         | 边缘真相；`Blog` site：`server_name blog…`，`root` 同 www，`/` → `/writing/`；Web 为 www                             |
| `www` Worker route               | **Removed** so Tunnel/server mirror is origin                                                                      |
| `ops.alexander.xin`              | Worker `ops-portal` 运维首页（工具卡片 + 探针）；UI 文件在 `www…/ops/`；Access Launcher 为备选入口                 |
| `blog.alexander.xin`             | **B2 真托管**：Tunnel → nginx；DNS CNAME → tunnel；已去掉 `redirect-profile` 路由；**无 Access**；MX/TXT 保留       |
| `about` / `bio` / `time` aliases | Worker redirects (`redirect-profile` / `legacy-redirect`)；apex `/writing*` 由 `writing-redirect` **301→blog**   |
| Pocket ID ↔ Access OIDC          | **Live** (IdP `Pocket ID` + `Email OTP (break-glass)`)                                                             |
| Access 覆盖面                    | 仅 ops / git / docker / nginxui / ssh / remote；**勿**给 paste / tools / www / id / **blog** / 公开站               |

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

## Blog（B2：同仓产物真托管）

**博客 = Astro `/writing`，主场 `blog.alexander.xin`。** 不恢复 Ghost；不上 Listmonk / Directus（内存不足时不做）。

| Item       | Detail                                                                                                |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| 正式阅读   | `https://blog.alexander.xin/writing/`（及各语言前缀）；canonical / RSS `site` → blog 主机               |
| 边缘路径   | Tunnel → nginx-ui（`server_name blog.alexander.xin`，`root` 同 www `/var/www/alexander.xin/dist`）     |
| apex       | `alexander.xin/writing*` → **301** → `blog.alexander.xin` 同路径（Worker `writing-redirect`）            |
| www        | 保留全文 + canonical→blog；**禁止** www↔apex 互跳                                                     |
| 订阅       | `blog…/writing/subscribe` + `https://blog.alexander.xin/.../rss.xml`；无访客登录；邮件订阅暂缓         |
| Access     | **不对 blog. 加 Access**（公开读者）                                                                  |
| 写作       | Git + Markdown：`src/content/writing`                                                                 |

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
