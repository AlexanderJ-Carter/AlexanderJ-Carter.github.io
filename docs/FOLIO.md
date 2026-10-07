# Folio 实例配置

开源仓库 = **模板**。你的机器 / 服务器 = **实例**（域名、姓名、密钥、CMS 库不入库）。

## 快速开始

```bash
cd folio
cp instance/config.example.json instance/config.json
# 或参考案例：cp instance/presets/alexander.json instance/config.json
cp .env.example .env
pnpm install
pnpm dev   # :3000 · /admin
```

生产：`.env.production` + `docker compose -f compose.prod.yaml up -d --build`。  
CI **不会**覆盖服务器上的 `instance/config.json` 与 `.env.production`。

### 小机运维注意（腾讯源站）

- 宿主机约 **3.6G RAM**；常驻容器建议合计硬顶 ≤ ~2G（Folio `640m`、OmniRoute `≤768m–1g`、Glance `128m`）。
- **不要在盘满时 `compose build`**：BuildKit 缓存曾占满磁盘导致整机无响应。构建后执行：
  `docker builder prune -af && docker image prune -af`
- Folio 可用环境变量覆盖：`FOLIO_MEM_LIMIT` / `FOLIO_MEMSWAP_LIMIT` / `FOLIO_CPUS` / `FOLIO_NODE_OPTIONS`。
- 公网入站靠 UFW 默认 deny；业务口（Folio `:3040`、Omni `:8180`、Glance `:3002`）只绑 Tailscale IP。SSH 监听 `0.0.0.0:22` 但 UFW 仅放行 `tailscale0`。
- 部署：仓库 Actions runner `tencent-folio`（`self-hosted,linux,folio-tencent`）跑 [folio-deploy.yml](../.github/workflows/folio-deploy.yml)，在本机同步 `/home/ubuntu/folio` 后 compose 构建。公网 runner 够不着这台机，勿再配 `FOLIO_SSH_*`。
- 公网流量路径：访客 → Cloudflare → Cloud 上 `cloudflared` → nginx（`www.alexander.xin` → `http://100.111.222.66:3040`）。

## 配置放哪

| 模板（可提交） | 实例（勿提交） |
|----------------|----------------|
| `folio/src/**` | `instance/config.json` |
| `instance/config.example.json` · `presets/*` | `.env` / `.env.production` |
| 安全页结构 | SQLite、密钥、OIDC、Turnstile、Resend |

关键字段：`research.publications`、`about.timeline`、`projects`、`elsewhere`。

### 合规与功能（可选）

```json
"compliance": {
  "icp": "",
  "icpUrl": "https://beian.miit.gov.cn/",
  "gongan": "",
  "gonganUrl": ""
},
"features": {
  "fun": true,
  "network": true,
  "subscribe": true,
  "assistant": true
}
```

- `compliance.icp` / `gongan`：有备案号再填，页脚才会显示；空字符串不渲染。
- `features.*`：关掉后页脚导航与站群地图会隐藏对应入口（URL 仍可直达）。
- `nav`：可选整表覆盖默认站内链接。

## 前台结构（摘要）

`/` 影像与导览 · `/gallery` · `/research` · `/projects` · `/tools` · `/fun` · `/network` · `/updates` · `/subscribe` · 门禁 `/about` `/contact`

栏目叙事：**看**（画廊/写作/研究）· **用**（工具/玩乐/项目）· **识**（关于/联系/订阅/更新）。互链由 `PageChrome.related` 与 `/network` 地图串联。

## 邮件

订阅 → Resend Contacts。群发用 Resend Broadcasts；模板：

```bash
node --import tsx scripts/print-broadcast-email.mjs
```

可选：`NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN`（同意统计后加载）、`NEXT_PUBLIC_ETHICALADS_PUBLISHER`。

## 门禁

`/about` `/contact` 默认 Turnstile。生产勿设 `NEXT_PUBLIC_SKIP_VERIFY`。

## 性能备忘

- Layout 使用 `revalidate = 60`，管理条改为客户端探测会话，避免整站 `force-dynamic`。
- 中文字体经 `next/font`（Noto Serif SC）自托管，去掉 render-blocking 的 Google Fonts `<link>`。
- `/_next/static` 长缓存；镜像构建见 `folio/Dockerfile`（BuildKit pnpm cache、仅拷 musl 原生包）。
