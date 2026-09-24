# Changelog

本仓库的重要变更记录。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [SemVer](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Added

- Resend：联系表单邮件通知、`/subscribe` 邮件名单、`/feed.xml` RSS
- `/projects`（`instance.projects`）
- 站点公告（Payload Global）与联系页专用版式
- `/tools` 及时间 / 单位 / 汇率 / QR；玩乐小工具补全
- GitHub Pages `gateway/` 名片页（导航 + security 镜像）
- 今日诗词（jinrishici）经 `/api/poem`

### Changed

- 主站以 Folio（`folio/`）为准；正典域名设计为 apex，www 同源后 301
- CI 以 Folio typecheck 为门禁；文档为 CUTOVER / INSTANCE / IA
- 页脚与曝光表跳转（世界时间）调整
- 边缘：`about`/`bio`/`contact`/`time` 改 Redirect Rules + AAAA `100::`；去掉 `writing-redirect` / `redirect-profile` / `redirect-contact`
- 正典域名统一为 apex：gateway / security.txt / lighthouse / ops-portal / Pocket ID Folio 回调

### Removed

- 根目录 Astro（`src/`、`public/`）、legacy 脚本 / CI、`writing-redirect` Worker（并入 `legacy-redirect`）
- 占位 `ops-agent/`、重复 `AGENT.md`、过时根 `.env.example` / `.npmrc`


## [3.2.1] - 2026-09

Folio 切换稳定期：模板与实例分离、Gate / OIDC、画廊与玩乐迁入、Pages 网关与部署工作流。

---

许可见 [LICENSE](LICENSE)（代码）与 [NOTICE](NOTICE)（内容）。
