# Alexander Carter

个人站点 · [www.alexander.xin](https://www.alexander.xin) · Pages 名片 · [alexanderj-carter.github.io](https://alexanderj-carter.github.io)

[![Pages Gateway](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml)
[![Folio Deploy](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/folio-deploy.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/folio-deploy.yml)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue?style=flat-square)](LICENSE)

## 结构

| 目录 | 职责 |
|------|------|
| `folio/` | 主站（Payload 3 + Next.js） |
| `gateway/` | GitHub Pages 名片与安全镜像 |
| `docs/` | 切换、DNS、实例、内容地图 |
| `src/` | Astro 遗留（迁移源） |

## 文档

- [切换 · 部署 · DNS](docs/FOLIO-CUTOVER.md)
- [模板 vs 实例](docs/FOLIO-INSTANCE.md)
- [内容地图](docs/FOLIO-IA.md)

## 本地

Node ≥ 22。

```bash
npm run folio          # http://127.0.0.1:3000
npm run folio:admin
npm run folio:migrate  # 可选
```

## 部署

| 路径 | 结果 |
|------|------|
| `folio/**` → main | 腾讯云 Folio（`FOLIO_SSH_*`） |
| `gateway/**` → main | GitHub Pages |

## 路由（www）

| 路径 | 内容 |
|------|------|
| `/` `/gallery` `/research` | 首页 · 画廊 · 论文 |
| `/tools` `/fun` | 工具 · 玩乐 |
| `/about` `/contact` | 简介 · 留言（门禁） |
| `/admin` | 后台 |

## 许可

- 代码：[LICENSE](LICENSE)（BSD 3-Clause）
- 内容：[NOTICE](NOTICE)（CC BY-NC-ND 4.0）
