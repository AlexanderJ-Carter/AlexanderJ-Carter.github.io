# GitHub Pages 网关

发布至 `https://alexanderj-carter.github.io`（[deploy.yml](../.github/workflows/deploy.yml)）。

## 作用

| 能力 | 说明 |
|------|------|
| 名片首页 | 主站 / 画廊等快捷链、Elsewhere、不以 0 秒强制跳转 |
| 安全镜像 | `.well-known/security.txt`、`security/pgp-key.asc` |
| 深链回主站 | `404.html` 把未知路径带到 `www` 并保留 path |

主站在 `../folio/`。DNS 与域名分工见 [FOLIO-CUTOVER.md](../docs/FOLIO-CUTOVER.md#dns)。
