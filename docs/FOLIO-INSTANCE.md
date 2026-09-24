# 模板 vs 实例

开源仓库提供 **Folio 魔改模板**（路由、组件、Payload 集合、Gate、OIDC 接口）。  
你的服务器是对该模板的一次 **实例化**：域名、姓名、论文、密钥、CMS 数据库都不进公开仓库。

## 边界

| 放在 GitHub（模板） | 放在服务器（实例） |
|---------------------|-------------------|
| `folio/src/**` 逻辑与 UI | `instance/config.json`（姓名、论文、外链） |
| `instance/config.example.json` | `.env.production`（密钥、OIDC、Turnstile、绑定端口） |
| 默认占位文案 / example.com | SQLite `data/folio.db`（关于页履历等 CMS 正文） |
| 安全页 **结构** | `public/.well-known/security.txt`、PGP（可按实例替换） |
| CI 工作流 | `FOLIO_SSH_*` 等 Actions Secrets |

```
克隆模板
  → cp instance/config.example.json instance/config.json
  → 填写品牌 / 论文 / Elsewhere
  → cp .env.production.example .env.production
  → 填写密钥与域名
  → docker compose -f compose.prod.yaml up -d --build
```

## 接口

- 运行时：`getInstance()`（`src/instance`）合并 `defaults` + `instance/config.json` + 部分 `NEXT_PUBLIC_*`
- 构建时：`next.config.ts` / Docker build args 注入 `NEXT_PUBLIC_SITE_NAME` 等（供客户端组件）
- 部署：`folio-deploy.yml` **不会**用仓库覆盖服务器上的 `instance/config.json` 与 `.env.production`

个人简介等敏感正文请只写在 CMS（门禁页）或服务器 `instance/config.json` 的 `contact` / 后续 `profile` 字段，不要写回开源默认 seed。

前台临时公告走 Payload 全局 **站点公告**（`announcement`），不必改仓库。
