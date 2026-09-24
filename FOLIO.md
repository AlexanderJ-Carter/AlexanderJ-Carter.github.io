# Folio — 下一代个人主页（Payload + Next.js）

目录：`folio/`。公网主站由你的 **实例配置** 决定。  
开源仓库只含模板；姓名/论文/密钥见 [docs/FOLIO-INSTANCE.md](docs/FOLIO-INSTANCE.md)。  
GitHub Pages 的 `gateway/` 亦属实例跳转页。总览见 [docs/FOLIO-CUTOVER.md](docs/FOLIO-CUTOVER.md)。

## 本地

```bash
cp folio/instance/config.example.json folio/instance/config.json  # 填你的实例
export PATH="$PWD/.tools/node/bin:$PATH"
npm run folio
```

- 前台：http://127.0.0.1:3000  
- 后台：http://127.0.0.1:3000/admin（默认中文；生产仅 Pocket ID）

```bash
npm run folio:admin      # 本地管理员
npm run folio:migrate    # 导入写作 + 首页/关于/联系等
```

## 生产（tencent）

Cloudflare → 云端 nginx → Tailscale `100.111.222.66:3040`。

```bash
cd /home/ubuntu/folio
docker compose -f compose.prod.yaml up -d --build
```

凭据仅在服务器：`.env.production`、`ADMIN.txt`（勿提交）。  
CI：推送 `folio/**` 触发 `.github/workflows/folio-deploy.yml`（需 `FOLIO_SSH_*`）。

重启后若 www 502：先查 Tailscale 与 `docker compose ps` 端口是否绑在 `100.111.222.66:3040`。

## 设计备忘

- 青晒蓝 / 石色 token、锐角；Syne + Source Serif
- 全屏英雄：取景框、胶片颗粒、扫光；`prefers-reduced-motion` 兼容
- 访客 Gate：Turnstile + `folio_verify` Cookie；通过后硬跳转

## 仓库策略

- 跟踪 `folio/`；忽略 `node_modules`、`.env*`、`*.db`、`public/media`、`seed-data/`
- `.tools/`、`try-*/` 继续 ignore
- 新功能不要写回根目录 Astro
