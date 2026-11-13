# 配置与部署

仓库是模板；本机 / 服务器是实例。勿提交 `instance/config.json`、`.env*`、CMS 库与密钥。

## 配置

```bash
cd folio
cp instance/config.example.json instance/config.json
# 或参考：cp instance/presets/alexander.json instance/config.json
```

| 字段 | 用途 |
|------|------|
| `research.publications` | `/research` |
| `about.timeline` | 门禁 `/about` |
| `projects` / `elsewhere` | 项目与外链 |
| `compliance` | 备案号（空则不显示） |
| `features` | 栏目开关 |
| `nav` | 覆盖页脚链接 |

生产：`folio/.env.production` + `docker compose -f compose.prod.yaml up -d --build`。

## 路由

`/` · `/gallery` · `/research` · `/projects` · `/tools` · `/fun` · `/agents` · `/status` · `/network` · `/updates` · `/subscribe` · `/about` · `/contact`

旧工具路径 `/time` 等 301 到 `/tools?t=…`。`gateway/` 仅作 Pages 名片与安全镜像。

## 部署

- GitHub 为规范源。
- 改动 `folio/**` 触发 self-hosted 部署（本机 rsync + compose）；CI 不覆盖服务器上的实例配置与 `.env.production`。
- 可选 Secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ZONE_ID`（清缓存）。
