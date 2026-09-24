# Changelog

本仓库的重要变更记录。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [SemVer](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Added

- 站点公告（Payload Global）与联系页专用版式
- `/tools` 及时间 / 单位 / 汇率 / QR；玩乐小工具补全
- GitHub Pages `gateway/` 名片页（导航 + security 镜像）
- 今日诗词（jinrishici）经 `/api/poem`

### Changed

- 主站以 Folio（`folio/`）为准；CI 以 Folio typecheck 为门禁
- 文档精简为 CUTOVER / INSTANCE / IA
- 页脚与曝光表跳转（世界时间）调整

### Deprecated

- 根目录 Astro（`src/`）与 `legacy:*` 脚本（迁移源，将移除）

## [3.2.1] - 2026-09

Folio 切换稳定期：模板与实例分离、Gate / OIDC、画廊与玩乐迁入、Pages 网关与部署工作流。

---

许可见 [LICENSE](LICENSE)（代码）与 [NOTICE](NOTICE)（内容）。
