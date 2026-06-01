# Alexander Carter's Personal Website

多语言个人网站与作品集，聚焦摄影、创作、工具与生活记录。

[![Build Status](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml)
[![Code Quality](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/code-quality.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/code-quality.yml)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue?style=flat-square)](LICENSE)
[![Content License](https://img.shields.io/badge/Content-CC%20BY--NC--ND%204.0-lightgrey?style=flat-square)](NOTICE)

## 访问入口

- 主站: [alexander.xin](https://alexander.xin)
- 博客: [blog.alexander.xin](https://blog.alexander.xin)
- 安全联系方式: [security.txt](https://alexander.xin/.well-known/security.txt)

## 站点亮点

- 多语言支持: zh-CN（默认）、zh-TW、en-GB、fr、ru
- 页面体验: 深浅色主题、可见焦点、键盘可达、减少动效兼容
- 内容版块: 作品画廊、项目展示、札记长文、阅读路线、时间线、Now/Uses、工具页
- 技术底座: Astro + Tailwind CSS + TypeScript
- 体验原则: 静态优先、轻量交互、隐私友好、移动端可读

## 页面导览

| 模块   | 路径                        | 内容                     |
| ------ | --------------------------- | ------------------------ |
| 首页   | `/`                         | 总览、当前关注、精选内容 |
| 关于   | `/about`                    | 个人简介、当前关注、技能 |
| 画廊   | `/gallery`                  | 摄影作品、分类与灯箱浏览 |
| 项目   | `/projects`                 | 站内项目、工具合集与原则 |
| 写作   | `/writing`                  | 工程、设计与摄影长文     |
| 时间线 | `/timeline`                 | 经历与进展节点           |
| 联系   | `/contact`                  | 联系方式与留言入口       |
| 本站   | `/uses`                     | 技术栈、站点特性与边界   |
| 安全   | `/security/policy`          | 漏洞披露政策与流程       |
| 致谢   | `/security/acknowledgments` | 安全研究者致谢           |

## 设计与实现原则

- 信息架构优先: 页面先回答“这里有什么、为什么值得看、下一步去哪里”。
- 组件一致性: 卡片、按钮、焦点、链接和工具入口保持稳定形态，减少学习成本。
- 交互克制: 动画只服务于状态反馈和层级表达，并遵守 `prefers-reduced-motion`。
- 性能默认值: 静态生成、图片懒加载、少依赖、减少全局样式副作用。
- 可访问性底线: 保留键盘路径、可见焦点、足够点击目标和清晰文本层级。

## 安全与隐私

- 安全政策页面: [security/policy](https://alexander.xin/security/policy)
- 安全致谢页面: [security/acknowledgments](https://alexander.xin/security/acknowledgments)
- 仓库安全政策: [.github/SECURITY.md](.github/SECURITY.md)
- PGP 公钥: [security/pgp-key.asc](https://alexander.xin/security/pgp-key.asc)

## 许可

- 源代码许可: [LICENSE](LICENSE)（BSD 3-Clause）
- 网站内容许可: [NOTICE](NOTICE)（CC BY-NC-ND 4.0）

## 更新记录

- 版本发布: [GitHub Releases](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/releases)
- 变更记录: [CHANGELOG.md](CHANGELOG.md)

说明:

- Release 支持自动创建（显式触发）
- `CHANGELOG.md` 会在发布后自动同步新增版本条目

## 作者

**Alexander James Carter**  
Website: [alexander.xin](https://alexander.xin)
