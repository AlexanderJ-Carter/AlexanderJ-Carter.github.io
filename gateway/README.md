# GitHub Pages 网关

发布至 GitHub Pages（[deploy.yml](../.github/workflows/deploy.yml)）。

## 作用

| 能力 | 说明 |
|------|------|
| 名片首页 | 主站 / 画廊等快捷链、Elsewhere |
| 安全镜像 | `.well-known/security.txt`、`security/pgp-key.asc` |
| 深链回主站 | `404.html` 把未知路径带到正典域名并保留 path |

主站在 `../folio/`。实例化见 [docs/FOLIO.md](../docs/FOLIO.md)。
