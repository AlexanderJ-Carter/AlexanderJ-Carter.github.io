# Folio 导航 / 功能恢复备注（一次性）

部署代码后，在服务器上更新 Header 全局导航（写作 / 画廊 / 玩乐 / 关于 / 联系）：

```bash
cd /path/to/folio
# 若 DATABASE 已有内容，可只跑 migrate 的导航段，或整站 migrate:site
docker compose -f compose.prod.yaml exec folio \
  node --import tsx migrate-site.mjs
# 或本机对生产库：pnpm run migrate:site
```

`HeaderNav` 在 CMS `navItems` 为空时会回退到上述链接。

验证 Cookie：Astro 使用 `sessionStorage.is_verified`；Folio 使用 `folio_verify=1`（max-age 7d），以便 middleware 服务端拦截 `/about`、`/contact`。
