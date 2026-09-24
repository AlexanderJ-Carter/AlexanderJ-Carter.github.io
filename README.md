# Alexander Carter — 个人站点仓库

**主站已切换为 Folio**（Payload 3 + Next.js），运行在腾讯云 Docker，公网入口为 [www.alexander.xin](https://www.alexander.xin)。  
GitHub Pages 仅发布 `gateway/` 轻量跳转页，与主站有机配合（见下）。

[![Pages Gateway](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml)
[![Folio Deploy](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/folio-deploy.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/folio-deploy.yml)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue?style=flat-square)](LICENSE)

## 谁负责什么

| 入口 | 目录 | 部署 | 说明 |
|------|------|------|------|
| `www.alexander.xin` | `folio/` | 腾讯云 `compose.prod.yaml`；推送 `folio/**` → [`folio-deploy.yml`](.github/workflows/folio-deploy.yml) | 前台 + Payload 后台 + OIDC |
| `alexanderj-carter.github.io` | `gateway/` | GitHub Pages；推送 `gateway/**` → [`deploy.yml`](.github/workflows/deploy.yml) | 跳转到 www，镜像 security.txt / PGP |
| Apex `alexander.xin` | （DNS/Pages） | 与网关策略一致，见 [docs/FOLIO-CUTOVER.md](docs/FOLIO-CUTOVER.md) | 勿再当 Astro 整站构建入口 |
| 根目录 `src/`、`public/` | Astro 遗留 | **不自动部署** | 迁移源与参考；新功能改 `folio/` |

详细切换、Secrets、删除清单：[docs/FOLIO-CUTOVER.md](docs/FOLIO-CUTOVER.md)。Agent 约束：[CLAUDE.md](CLAUDE.md) / [AGENT.md](AGENT.md)。

## 本地开发（Folio）

```bash
# 需要 Node ≥ 22；仓库内可用 .tools/node
npm run folio          # http://127.0.0.1:3000  后台 /admin
npm run folio:admin    # 写入管理员（本地）
npm run folio:migrate  # 从 Astro 写作等内容导入 CMS（可选）
```

人机验证在开发环境默认跳过；强制：`NEXT_PUBLIC_FORCE_VERIFY=true`。

遗留 Astro（仅参考）：

```bash
npm run legacy:dev
npm run legacy:build
```

## 自动更新怎么走

1. **改主站**：提交并推送 `folio/` → Actions「Deploy Folio」rsync 到腾讯云 → `docker compose build && up -d` → 可选清 Cloudflare 缓存。需配置 `FOLIO_SSH_*` Secrets（见 CUTOVER）。
2. **改网关**：推送 `gateway/` → Actions 上传 Pages artifact 并部署。
3. **未配 SSH Secrets 时**：Folio workflow 会跳过并提示；可手动在服务器 `cd /home/ubuntu/folio && docker compose -f compose.prod.yaml up -d --build`。

未经仓库主人明确要求，自动化助手**不要** `git push`。

## 前台导览（Folio）

| 模块 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 暗房英雄与导览 |
| 写作 | `/posts` | CMS 文章（旧 `/writing` 301 至此） |
| 研究 | `/research` | 公开论文列表（对齐 GitHub 主页）；个人履历不在此 |
| 画廊 | `/gallery` | 摄影 contact sheet |
| 玩乐 | `/fun` | 小工具 |
| 关于 / 联系 | `/about` `/contact` | CMS 履历与留言；Turnstile Gate + noindex |
| 隐私 / 条款 | `/privacy` `/terms` | 静态法律页 |
| 安全 | `/security/policy` | 披露政策；另有 security.txt |
| 后台 | `/admin` | Pocket ID 登录 |

## 许可

- 代码：[LICENSE](LICENSE)（BSD 3-Clause）
- 内容：[NOTICE](NOTICE)（CC BY-NC-ND 4.0）

## 作者

**Alexander James Carter** · [www.alexander.xin](https://www.alexander.xin)
