# Folio — 下一代个人主页（Payload 魔改）

目录：`folio/`（由 Payload Website 模板魔改）。Astro 静态壳仍在仓库根，切流前两边可并存。

## 本地

```bash
export PATH="$PWD/.tools/node/bin:$PATH"
npm run folio
```

- 前台：http://127.0.0.1:3000  
- 后台：http://127.0.0.1:3000/admin（界面默认中文）

管理员：

```bash
npm run folio:admin
# 或 cd folio && pnpm seed:admin / reset-admin.mjs
```

导入静态写作 + 首页/关于/联系：

```bash
npm run folio:migrate
```

## 生产（tencent 容器）

cloud 只有 1.6G，Folio 跑在 **tencent** `:3040`（Tailscale），cloud nginx 把 `www.alexander.xin` 反代过去。Hermes 已停以腾内存。

```bash
# 在 tencent
cd /home/ubuntu/folio
docker compose -f compose.prod.yaml up -d --build
```

凭据：服务器上 `~/folio/ADMIN.txt`（勿提交）。`.env.production` 同理。

## 已迁入的暗房设计

- 青晒蓝 / 石色 token、锐角圆角
- Syne + Source Serif
- 全屏英雄：取景框呼吸、胶片颗粒、扫光
- `folio-mark` / `film-edge`
- 中文后台 i18n + 内容分组文案
- 页脚 MyCook / Gitea

## Pocket ID / Cloudflare Access

`home.alexander.xin` 已是 Access → Pocket ID。`/admin` 建议同样建一条 Access 应用（路径 `/admin*`），IdP 用 Pocket ID。隧道仍走 cloud 的 cloudflared token。

## 仓库策略

- `folio/` 纳入 git（下一代主页）
- `node_modules`、`.env*`、`*.db`、`public/media` 不入库
- `.tools/`、旧 `try-*/` 试用目录继续 ignore
- 切流完成前保留 Astro `src/`；切流后再收静态部署脚本

## 清理

```bash
# 仅本地试用残留（勿删 folio/）
rm -rf .tools/php
```
