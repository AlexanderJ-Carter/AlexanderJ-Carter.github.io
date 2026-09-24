# GitHub Pages 网关

本目录由 [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) 发布到
`https://alexanderj-carter.github.io`。

- `index.html` — 跳转到 `https://www.alexander.xin`
- `404.html` — 任意深层路径也尽量带回主站（并保留 path）
- `.well-known/security.txt`、`security/pgp-key.asc` — 与 Folio 镜像，满足 Pages 域名上的披露入口

主站代码与 CMS 在 `../folio/`，部署见 `../docs/FOLIO-CUTOVER.md`。
