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

## 配置放哪

| 模板（可提交） | 实例（勿提交） |
|----------------|----------------|
| `folio/src/**` | `instance/config.json` |
| `instance/config.example.json` · `presets/*` | `.env` / `.env.production` |
| 安全页结构 | SQLite、密钥、OIDC、Turnstile、Resend |

关键字段：`research.publications`、`about.timeline`、`projects`、`elsewhere`。

## 前台结构（摘要）

`/` 影像与导览 · `/gallery` · `/research` · `/projects` · `/tools` · `/fun` · `/updates` · `/subscribe` · 门禁 `/about` `/contact`

## 邮件

订阅 → Resend Contacts。群发用 Resend Broadcasts；模板：

```bash
node --import tsx scripts/print-broadcast-email.mjs
```

可选：`NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN`（同意统计后加载）、`NEXT_PUBLIC_ETHICALADS_PUBLISHER`。

## 门禁

`/about` `/contact` 默认 Turnstile。生产勿设 `NEXT_PUBLIC_SKIP_VERIFY`。
