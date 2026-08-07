# Site fleet architecture

Control plane is unified; hosting stays distributed.

## Split

| Layer      | Owns                              | Examples                                                         |
| ---------- | --------------------------------- | ---------------------------------------------------------------- |
| GitHub     | Source + static fronts            | `alexander.xin`, cook, lab, netq, linux-command, yearly, contact |
| Cloudflare | DNS, CDN, Access, Workers, Tunnel | apex CDN, `api.alexander.xin/time`, Access apps, blog via Tunnel |
| SSH Cloud  | Stateful services only            | Pocket ID, Gitea, Portainer, PrivateBin, it-tools, www mirror    |

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
| SPF（apex）       | `include:_spf.mx.cloudflare.net` + `include:amazonses.com`（2026-08-07） |
| DKIM              | `resend._domainkey`（保留）；勿删 Email Routing 的 `cf2024-1._domainkey` |
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

| Name         | Role            | Notes                                                                       |
| ------------ | --------------- | --------------------------------------------------------------------------- |
| `pocket-id`  | OIDC IdP        | `127.0.0.1:1411`, mem ≤128 MB，healthcheck，日志轮转                        |
| `gitea`      | Private Git     | Access + OIDC；`DISABLE_REGISTRATION`；mem ≤256 MB；healthcheck             |
| `portainer`  | Docker UI       | `127.0.0.1:9100`；mem ≤128 MB；Logout URL 留空                              |
| `nginx-ui`   | Nginx admin     | host 网络；管理口 **仅** `127.0.0.1:9000`；`EnableHTTPS=false`；mem ≤256 MB |
| `privatebin` | Encrypted paste | `127.0.0.1:8081`；mem ≤64 MB；上传关、限流 30/min、1 MiB                    |
| `it-tools`   | Tool hub        | `127.0.0.1:8080`；mem ≤64 MB；`read_only` + tmpfs                           |

## Host services (non-container)

| Service              | Role                       | Access model                                                                                                        |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `rustdesk-hbbs/hbbr` | RustDesk ID + Relay        | 协议口仅经 UFW / Tailscale 可达；`remote.alexander.xin` HTTP 经 Access                                              |
| `vlmcsd`             | Windows/Office KMS（自用） | 非 HTTP，**不能**套 Cloudflare Access；默认 bind `0.0.0.0:1688`，公网靠 UFW 挡；日常走 Tailscale。不上 Ops 主推卡片 |

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

| Hostname                  | 公网 | HTTP       | 需登录      | 当前 Tunnel service                                    | 应有路径                                         | Access           | 本人怎么用                           |
| ------------------------- | ---- | ---------- | ----------- | ------------------------------------------------------ | ------------------------------------------------ | ---------------- | ------------------------------------ |
| `www.alexander.xin`       | 是   | 是         | 否          | `http://127.0.0.1:80` → nginx `Web`                    | **经 nginx**（静态）                             | 否               | 国内镜像浏览                         |
| `paste.alexander.xin`     | 是   | 是         | 否          | `http://127.0.0.1:80` → nginx `Paste` → `:8081`        | **经 nginx**（CSP/sub_filter）                   | 否               | 直接打开粘贴                         |
| `tools.alexander.xin`     | 是   | 是         | 否          | `http://127.0.0.1:80` → nginx `Tool` → `:8080`         | **经 nginx**（统一头）                           | 否               | 直接打开工具箱                       |
| `id.alexander.xin`        | 是   | 是         | IdP 自身    | `http://127.0.0.1:80` → nginx `PocketID` → `:1411`     | **经 nginx**（关 Rocket Loader）                 | **否**（是 IdP） | Passkey / 管 OIDC 客户端             |
| `git.alexander.xin`       | 是   | 是         | 是          | `http://127.0.0.1:80` → nginx `Gitea` → `:3000`        | **经 nginx**（`client_max_body_size 512M` + WS） | **是**           | Access → Gitea（可再 Pocket ID SSO） |
| `docker.alexander.xin`    | 是   | 是         | 是          | `http://127.0.0.1:80` → nginx `Portainer` → `:9100`    | **经 nginx**（WS）                               | **是**           | Access → Portainer                   |
| `nginxui.alexander.xin`   | 是   | 是         | 是          | `http://127.0.0.1:80` → nginx `nginx-ui` → `:9000`     | **经 nginx**（WS）                               | **是**           | Access → Nginx UI                    |
| `remote.alexander.xin`    | 是   | 是         | 是          | `http://127.0.0.1:80` → nginx `remote`（说明 + `/ws`） | **经 nginx**（WS）                               | **是**           | 网页看 Key；客户端走 Tailscale       |
| `ssh.alexander.xin`       | 是   | Access SSH | 是          | `ssh://localhost:22`                                   | **Tunnel 直连 SSH**（不经 nginx）                | **是**           | 日常 `ssh cloud`；浏览器仅应急       |
| `ops.alexander.xin`       | 是   | 是         | 是          | （Worker，非 Tunnel）                                  | Cloudflare Worker                                | **是**           | 运维首页                             |
| `alexander.xin`（apex）   | 是   | 是         | 否          | —                                                      | GitHub Pages + CDN                               | 否               | 全球主站                             |
| `blog.alexander.xin`      | 是   | 是         | 否          | `http://127.0.0.1:80` → nginx `Blog`（同 www `dist`）  | **经 nginx**（静态写作主场）                     | **否**           | 读文章 / RSS；`/` → `/writing/`      |
| `about` / `bio` / `time`  | 是   | 是         | 否          | —                                                      | Worker 重定向                                    | 否               | 别名入口                             |
| `api.alexander.xin/time*` | 是   | 是         | 否          | —                                                      | Worker `time-api`                                | 否               | `GET/HEAD …/time` 或 `/time/now`     |
| RustDesk 协议口           | 否\* | 否         | N/A         | **不进** HTTP Tunnel                                   | Tailscale（UFW 挡公网）                          | 不适用           | ID/Relay=`100.126.166.111`           |
| KMS `1688`                | 否\* | 否         | 无法 Access | **不进** HTTP Tunnel                                   | Tailscale（见上节）                              | 不适用           | 激活服务器填 Tailscale IP            |

\*进程可能 `0.0.0.0` 监听，但公网实测不通（UFW / 云安全组）。

**为何不全直连容器端口：** 已统一走 nginx，便于 `server_name`、转发头、WS、`client_max_body_size`、PrivateBin CSP 修补、Pocket ID `data-cfasync`。再开 Tunnel→`:8081` 等会与现网打架。

## Edge control

| Item                             | Status                                                                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tunnel `mycloud` ingress         | HTTP 子域（含 **blog**）→ `http://127.0.0.1:80`；仅 `ssh` → `ssh://localhost:22`                                                                  |
| nginx-ui                         | 边缘真相；`Blog` site：`server_name blog…`，`root` 同 www，`/` → `/writing/`；Web 为 www                                                          |
| nginx-ui `site_check`            | **TLS 在 CF**；面板健康检查应用 **源站 HTTP**（compose `extra_hosts`→`127.0.0.1` + `site_configs` 按 `server_name`；勿跟公网 HTTPS/IPv6 hairpin） |
| `www` Worker route               | **Removed** so Tunnel/server mirror is origin                                                                                                     |
| `ops.alexander.xin`              | Worker `ops-portal` 运维首页（工具卡片 + 探针）；UI 文件在 `www…/ops/`；Access Launcher 为备选入口                                                |
| `blog.alexander.xin`             | **B2 真托管**：Tunnel → nginx；DNS CNAME → tunnel；已去掉 `redirect-profile` 路由；**无 Access**；MX/TXT 保留                                     |
| `about` / `bio` / `time` aliases | Worker redirects (`redirect-profile` / `legacy-redirect`)；apex `/writing*` 由 `writing-redirect` **301→blog**                                    |
| Pocket ID ↔ Access OIDC          | **Live** (IdP `Pocket ID` + `Email OTP (break-glass)`)                                                                                            |
| Access 覆盖面                    | 仅 ops / git / docker / nginxui / ssh / remote；**勿**给 paste / tools / www / id / **blog** / 公开站                                             |

## DNS inventory (audited 2026-08-07)

Zone `alexander.xin`：无 A/AAAA↔CNAME 冲突；隧道与公开站均为**橙云**；无灰云暴露源站公网 IP。邮件 MX/TXT（apex + `blog.`）**保留**，Email Routing 已启用且 `synced`。

| 主机                                                                      | DNS                         | 目标 / 说明                              | 代理                               |
| ------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- | ---------------------------------- |
| `alexander.xin`（apex）                                                   | A×4 + AAAA×4                | GitHub Pages IP（橙云）                  | 橙                                 |
| `www` `blog` `id` `git` `docker` `nginxui` `paste` `tools` `remote` `ssh` | CNAME                       | `…cfargotunnel.com`（`mycloud`）         | 橙                                 |
| `ops` `api`                                                               | AAAA `100::`                | Worker 占位（`ops-portal` / `time-api`） | 橙                                 |
| `cook` `lab` `linux-command` `netq` `yearly` `contact`                    | CNAME                       | `alexanderj-carter.github.io`            | 橙（`contact` 见 Hostname naming） |
| `about` `bio` `time`                                                      | CNAME → Pages + Worker 路由 | 兼容重定向；可改为 `100::` 但非必须      | 橙                                 |
| apex / `blog.`                                                            | MX + SPF TXT                | Cloudflare Email Routing                 | DNS only                           |
| `resend._domainkey`                                                       | TXT                         | Resend DKIM                              | DNS only                           |
| `cf2024-1._domainkey` / `_dmarc`                                          | TXT                         | Email Routing DKIM + DMARC `p=none`      | DNS only                           |

**已改（API）：** apex SPF 增补 `include:amazonses.com`（Resend 出站），现为：

`v=spf1 include:_spf.mx.cloudflare.net include:amazonses.com ~all`

**未改（有意）：** `blog.` MX/TXT；无 CAA（空 CAA = 不限制签发；若加 CAA 须覆盖 Cloudflare 全部合作 CA，建议 Dashboard 一键）。

**勿做：** 给 Tunnel 主机加指向 VPS 的 A/AAAA（会灰云暴露源 IP 或与 CNAME 冲突）；源站双栈收益有限。

## IPv6 notes (audited 2026-08-07)

| 层             | 结论                                                                                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 访客侧（橙云） | Tunnel / Pages / Worker 由 Cloudflare 提供双栈；**不必**在源站 DNS 再挂 AAAA                                                                                    |
| VPS `eth0`     | 有全球 IPv6；**出站 IPv6 超时**（`curl -6` 失败），IPv4 正常                                                                                                    |
| nginx-ui       | 已 `listen 80` + `listen [::]:80`；容器业务口绑 `127.0.0.1`（正确）                                                                                             |
| Tailscale      | IPv4 `100.126.166.111` + ULA IPv6 可用                                                                                                                          |
| cloudflared    | 建议固定 `--edge-ip-version 4` / `TUNNEL_EDGE_IP_VERSION=4`，避免坏 IPv6 上的 QUIC 噪声被当成故障。脚本：`~/fleet/cloudflared/apply-edge-ip4.sh`（需本机 sudo） |
| Windows 本机   | 若浏览器要走 IPv6 访橙云站：网卡启用 IPv6 即可；与源站无关                                                                                                      |

### TLS / HTTPS（结论）

- **对外 TLS 只在 Cloudflare（橙云 + Tunnel）终止**；源站 nginx **只听 :80**，`EnableHTTPS=false`。
- **不要**在 nginx-ui 申请源站证书 / 强制 HTTPS / 源站 HSTS（会与 Tunnel→HTTP 双层打架，并制造假红灯）。
- 安全头：边缘由 Cloudflare 管（HSTS/CSP 若要全站统一，用 Transform Rule，勿在源站重复 HSTS）。源站仅保留轻量 `nosniff` / `X-Frame-Options` / `Referrer-Policy`。
- 仓库 `public/_headers` 是 Pages 风格基线；**GitHub Pages 源不会自动应用该文件**（apex 实测无 CSP/HSTS）——缺口留给边缘规则，不在源站硬补。

### nginx-ui 站点监控假超时（已修，2026-08-07）

**真站可达：** 源站 `Host:` 探测与公网 IPv4 抽查均为 200/301/Access 302。截图里的 https timeout 是**假报错**。

| 根因                         | 说明                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| 服务器→CF **出站 IPv6 超时** | 站点有 AAAA 时，检查器走 v6 会挂；`curl -6` 失败、`curl -4` 正常     |
| 旧 `site_configs`            | 退役站（wiki/shlink/…）、`www:443` HTTPS、重复项、跟随 Access 重定向 |
| 源站无 :443                  | 对 localhost/源站做 HTTPS 探测必失败                                 |

**修复：**

1. 全部现网站点改为探测 `http://127.0.0.1:80` + `Host: <vhost>`（`expected_status` 含 200/301/302），`follow_redirects=0`
2. `~/nginx-ui/normalize-sitecheck-wrap.sh` + **cron 每 2 分钟**（nginx-ui 重启会重新导入公网 host，需压回去）
3. 管理口 `Host=127.0.0.1`；`RunMode=release`；废弃 ssl 目录已删

### nginx 源站完善（已落地）

- `conf.d/10-performance.conf`：gzip、默认 `client_max_body_size`、代理超时
- 反代站统一：`Host` / `X-Forwarded-*` / `Upgrade`+`$connection_upgrade`
- Gitea：`client_max_body_size 512M`、长超时、`proxy_request_buffering off`
- Web/Blog：静态资源 `expires 7d`；**404 返回站点 `404.html` 且状态码 404**（非 nginx 裸错）
- Blog：`/` → `/writing/`（B2）；与 www **互不跳转**；`/subscribe` `/blog` → 写作路径（www 用 `https://www…` 绝对 Location，避免 Tunnel HTTP 源写出 `http://`）

### 公开页健康抽查（2026-08-07，`curl -sSI` / 服务器 `curl -4`）

| 目标                                                                                                        | 结果                                                                    |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| apex `/` `/about/` `/projects/` `/gallery/` `/tools/` `/network/` `/login/` `/contact/` `/security/policy/` | **200**                                                                 |
| apex `/writing*` `/en/writing*`（及 zh-TW/fr/ru）                                                           | **301** → `blog.alexander.xin` 同路径                                   |
| apex `/subscribe` `/blog`（及语言前缀别名）                                                                 | **301** → blog `/writing/subscribe/` 或 `/writing/`                     |
| apex / www 故意 404                                                                                         | **404**（站点页）                                                       |
| www `/` `/writing/` `/security/policy/`                                                                     | **200**；与 apex **无互跳**；www `/subscribe` `/blog` 站内 301→写作路径 |
| blog `/` → `/writing/`；`/writing/` `/writing/subscribe/` `/en/writing/`                                    | **200**（`/` 为站内 301）                                               |
| paste / tools / id                                                                                          | **200**（公开，无 Access）                                              |
| git / docker / nginxui / ssh / remote / ops                                                                 | **302** Access（保持）                                                  |
| `nginx.alexander.xin`                                                                                       | **无记录**（正确主机为 `nginxui.alexander.xin`）                        |

### OIDC redirect URI（Pocket ID，live 核对）

| Client id               | Redirect / callback URI                                                 | Logout                                                          |
| ----------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| `cloudflare-zero-trust` | `https://alexanderjcarter.cloudflareaccess.com/cdn-cgi/access/callback` | Access：应用域 `/cdn-cgi/access/logout`（匿名无会话时可能 404） |
| `gitea`                 | `https://git.alexander.xin/user/oauth2/PocketID/callback`               | 应用本地登出；Pocket ID `logoutCallbackURLs` 空                 |
| `portainer`             | `https://docker.alexander.xin/`                                         | **Portainer Logout URL 留空**；勿填 Pocket ID `end-session`     |
| `nginx-ui`              | `https://nginxui.alexander.xin/`                                        | 本地登出；logout callbacks 空                                   |

Access 登录成功回跳：各应用 `redirect_url` 回到原主机路径（匿名探测可见 302→Access login）。  
`/oauth/authorize` 与 `/oauth/token` 为**静态 discovery 存根**（`unauthorized_client` JSON），说明主站不发 OAuth 凭证——属正常，不是坏链。

Portainer Logout URL: **leave empty** (app-local logout only; do not use Pocket ID `end-session`).

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

| Item     | Detail                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------- |
| 正式阅读 | `https://blog.alexander.xin/writing/`（及各语言前缀）；canonical / RSS `site` → blog 主机          |
| 边缘路径 | Tunnel → nginx-ui（`server_name blog.alexander.xin`，`root` 同 www `/var/www/alexander.xin/dist`） |
| apex     | `alexander.xin/writing*` → **301** → `blog.alexander.xin` 同路径（Worker `writing-redirect`）      |
| www      | 保留全文 + canonical→blog；**禁止** www↔apex 互跳                                                  |
| 订阅     | `blog…/writing/subscribe` + RSS；别名 `/subscribe` `/blog` → 写作路径；无访客登录；邮件订阅暂缓    |
| Access   | **不对 blog. 加 Access**（公开读者）                                                               |
| 写作     | Git + Markdown：`src/content/writing`                                                              |

## Planned (memory-gated)

Server has **1.6 GiB RAM**. Available often ~800 MB+ after Shlink removal.

- Directus (`cms.alexander.xin`) + Postgres: **do not start** until more RAM
- Listmonk: same; compose only
- Ops portal Worker + read-only `ops-agent`

## Hostname naming (audited 2026-08-07)

原则：**合理才改**；改名须旧主机 **301** 一段时间；运维域默认不动；不为中文用户强行拼音。

| Hostname                                                               | 用途                         | 建议                               | 理由                                                                           |
| ---------------------------------------------------------------------- | ---------------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| `alexander.xin` / `www`                                                | 主站全球 / 国内镜像          | **保留**                           | 架构约定，互不跳转                                                             |
| `blog.alexander.xin`                                                   | 写作主场                     | **保留**                           | 品牌清晰；apex `/writing*` 已 301                                              |
| `cook` / `lab` / `linux-command` / `netq`                              | 独立内容/学习站              | **保留**                           | 用途直白；`lab`≠ GitLab（导航勿写 Git Lab）                                    |
| `yearly.alexander.xin`                                                 | 年度回忆                     | **保留**（可选 `memories` 仅建议） | 已够直白；改名需强理由，且勿与 Yearly UI 大改抢同一 PR                         |
| `paste.alexander.xin`                                                  | PrivateBin                   | **保留**                           | 清晰                                                                           |
| `tools.alexander.xin`                                                  | IT-Tools（VPS）              | **建议改** → `it-tools.`（待确认） | 与主站 `/tools` 索引易混；改名需 Tunnel + nginx `server_name` + DNS + 旧名 301 |
| `contact.alexander.xin`                                                | 独立 Contact 页（Turnstile） | **建议合并或改名**（待确认）       | 与主站 `/contact` 重复；合并则 Worker 301→`/contact/`；或改 `card.` 并 301     |
| `about` / `bio` / `time`                                               | 别名                         | **保留**                           | 已 Worker 301                                                                  |
| `api` / `ops` / `id` / `git` / `docker` / `nginxui` / `ssh` / `remote` | API / 运维                   | **保留**                           | 清晰，无误导                                                                   |
| `cms`（planned）                                                       | Directus                     | **保留计划名**                     | 未上线                                                                         |

**本轮已落地（低伤害、无 DNS 切主）：** registry 补登 `contact`；导航/文案把 `tools.*` 标成 **IT-Tools**，与 `/tools` 索引区分；Footer「Git Lab」改为「Lab」。

**待你确认后再动 DNS / Tunnel / nginx：** `tools`→`it-tools`；`contact` 合并到 `/contact` 或改名为 `card`。

## Registry

Canonical list: `src/data/site-registry.ts`  
Machine export: `public/network.json`

## Pocket ID bootstrap

1. Admin registered at https://id.alexander.xin (setup complete).
2. OIDC clients: `cloudflare-zero-trust`, `gitea`, `portainer`, `nginx-ui`.
3. Cloudflare Access IdP + app sources wired; OTP kept as break-glass.
4. Portainer Logout URL should be **empty** (local logout only).

Compose path on server: `~/fleet/pocket-id/`
