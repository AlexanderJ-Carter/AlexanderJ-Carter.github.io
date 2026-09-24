# Folio 导航 / 功能恢复备注

部署代码后，在服务器上更新 Header / Footer 全局导航（画廊 / 玩乐 / 工具 / 研究 / 关于 / 联系；暂不挂写作）：

```bash
cd /path/to/folio
docker compose -f compose.prod.yaml exec folio \
  node --import tsx scripts/configure-nav.mjs
```

`HeaderNav` 在 CMS `navItems` 为空时会回退到上述链接。

验证 Cookie：Astro 使用 `sessionStorage.is_verified`；Folio 使用 `folio_verify=1`（max-age 7d），以便 middleware 服务端拦截 `/about`、`/contact`。
