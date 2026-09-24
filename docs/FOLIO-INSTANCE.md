# 模板 vs 实例

开源仓库 = **Folio 模板**（可复用的个人站）。  
你的机器 = **一次实例化**（域名、姓名、密钥、CMS 库都不进公开仓库）。

## 边界

| 放在 GitHub（模板） | 放在服务器（实例） |
|---------------------|-------------------|
| `folio/src/**` 逻辑与 UI | `instance/config.json`（姓名、论文、外链、projects） |
| `instance/config.example.json` | `.env.production`（密钥、OIDC、Turnstile、Resend、端口） |
| 默认 example.com 文案 | SQLite `data/folio.db` |
| 安全页 **结构** | 实例 security.txt / PGP（可替换） |
| CI 工作流 | `FOLIO_SSH_*`、`CLOUDFLARE_*` Secrets |

```
克隆模板
  → cp instance/config.example.json instance/config.json
  → 填写品牌 / 论文 / Elsewhere / projects
  → cp .env.production.example .env.production
  → 填写密钥与公网 URL
  → docker compose -f compose.prod.yaml up -d --build
```

## 运行时接口

- `getInstance()`：`defaults` + `instance/config.json` + 部分 `NEXT_PUBLIC_*`
- Docker build args：注入 `NEXT_PUBLIC_SITE_NAME` 等（客户端包）
- `folio-deploy.yml` **不会**覆盖服务器上的 `instance/config.json` 与 `.env.production`

## 邮件（Resend）

模板已接 `@payloadcms/email-resend` 与 `/api/subscribe`。实例需：

| 变量 | 含义 |
|------|------|
| `RESEND_API_KEY` | 发信与 Contacts |
| `EMAIL_FROM_ADDRESS` | 已验证域名上的 From（如 `noreply@你的域`） |
| `EMAIL_FROM_NAME` | 显示名 |
| `CONTACT_NOTIFY_EMAIL` | 联系表单通知收件人 |
| `RESEND_SEGMENT_ID` | 订阅名单 Segment ID |

部署后跑 `scripts/configure-contact-form.mjs`，把 CMS 里 Contact Form 的 `emailTo` 修成通知站长。

## 正典域名

模板不写死域名。实例建议：

1. 公网正典：`https://alexander.xin`（或你的 apex）  
2. `NEXT_PUBLIC_SERVER_URL` 与 `instance.siteUrl` 与之对齐  
3. Cloudflare：apex / www 同源，www → apex 301（见 [FOLIO-CUTOVER](FOLIO-CUTOVER.md)）

个人简介等敏感正文只写在 CMS（门禁页）或服务器 `instance/config.json`，不要写回开源默认 seed。  
前台临时公告走 Payload 全局 **站点公告**（`announcement`）。
