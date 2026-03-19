# Alexander Carter's Personal Website

现代化、多语言、响应式的个人作品集站点，基于 **Astro** + **Tailwind CSS** 构建，并通过 GitHub Actions 自动部署到 GitHub Pages。

[![Build Status](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/deploy.yml)
[![Code Quality](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/code-quality.yml/badge.svg)](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/actions/workflows/code-quality.yml)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue?style=flat-square)](LICENSE)
[![Content License](https://img.shields.io/badge/Content-CC%20BY--NC--ND%204.0-lightgrey?style=flat-square)](NOTICE)

## 快速链接

- 🌐 **网站**: [alexander.xin](https://alexander.xin)
- 📝 **文档**: [CONTRIBUTING.md](CONTRIBUTING.md) | [CHANGELOG.md](CHANGELOG.md) | [AGENT.md](AGENT.md) | [CLAUDE.md](CLAUDE.md)
- 🔒 **安全**: [SECURITY.md](.github/SECURITY.md) | [security.txt](https://alexander.xin/.well-known/security.txt)

## 概述

- **架构**：Astro Islands，默认零客户端 JS，按需水合交互组件。
- **多语言**：支持 zh-CN（默认）、zh-TW、en-GB、fr、ru，自动生成 sitemap 与 hreflang。
- **功能**：深浅色主题、音乐播放器、彩蛋页、Now/Uses、画廊、联系与政策页等。
- **体验**：响应式设计、无障碍优化（WCAG 2.1）、跳过链接与键盘导航。
- **CI/CD**：GitHub Actions 自动化部署、代码质量检查、安全审计。

## 项目结构

```text
├── .github/
│   ├── workflows/                 # GitHub Actions CI/CD
│   │   ├── deploy.yml             # 自动部署到 GitHub Pages
│   │   ├── code-quality.yml       # 代码质量检查
│   │   ├── security-audit.yml     # 定期安全审计
│   │   └── lighthouse.yml         # 性能与 SEO 审计
│   ├── ISSUE_TEMPLATE/            # Issue 模板
│   ├── SECURITY.md                # 安全政策
│   ├── CODEOWNERS                 # 代码所有者
│   ├── dependabot.yml             # 依赖自动更新
│   └── pull_request_template.md   # PR 模板
├── public/                        # 静态资源
│   ├── img/                       # 品牌与画廊图片
│   ├── music/                     # 音频资源
│   ├── security/                  # PGP 公钥等
│   ├── .well-known/security.txt   # RFC 9116 安全联系信息
│   ├── robots.txt
│   ├── humans.txt
│   └── manifest.json
├── src/
│   ├── components/                # 可复用组件与页面模板
│   ├── layouts/
│   ├── pages/
│   │   ├── [lang]/*.astro         # 多语言路由
│   │   └── security/*.astro       # 安全政策与致谢
│   ├── i18n/ui.ts                 # 翻译配置
│   ├── scripts/
│   └── styles/
├── docs/
│   ├── SECURITY-REVIEW.md         # 安全审查详情
│   ├── TIME-API-CLOUDFLARE.md     # 技术文档
│   └── UX-OPTIMIZATION.md         # UX 长期优化路线图
├── AGENT.md                        # 通用 AI 协作规则（完整版）
├── CLAUDE.md                       # Claude/Claude Code 协作规则（精简版）
├── CHANGELOG.md                   # 版本历史
├── CONTRIBUTING.md                # 贡献指南
├── LICENSE                        # BSD 3-Clause（源代码）
└── NOTICE                         # 内容许可与第三方声明
```

## 开发

### 本地设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建产物
npm run build

# 格式化代码
npx prettier --write .

# 类型检查
npx astro check

# 安全审计
npm audit
```

在浏览器打开 **http://localhost:4321**。

### 工作流程

详见 [CONTRIBUTING.md](CONTRIBUTING.md) 了解完整的开发流程和代码标准。

## AI 协作

- **通用规则**: [AGENT.md](AGENT.md)
- **Claude**: [CLAUDE.md](CLAUDE.md)
- **GitHub Copilot**: [.github/copilot-instructions.md](.github/copilot-instructions.md)

如规则存在重叠，以具体工具的专用规则优先，其次参考 AGENT.md 的全局约束。

## 自动化流程

该项目使用 GitHub Actions 进行自动化：

| 工作流             | 触发条件        | 功能                      |
| ------------------ | --------------- | ------------------------- |
| **Deploy**         | 推送到 main     | 构建和部署到 GitHub Pages |
| **Code Quality**   | PR 和主分支推送 | Prettier、TypeScript 检查 |
| **Security Audit** | 每周日          | npm 依赖安全审计          |
| **Lighthouse**     | 每周一          | 性能与 SEO 评分           |
| **Dependabot**     | 每周一          | 自动依赖更新              |

## 安全

- **漏洞披露**：请勿公开披露未修复漏洞。通过 [安全政策](https://alexander.xin/security/policy) 或 [security.txt](https://alexander.xin/.well-known/security.txt) 中的联系方式负责任地报告。
- **安全页面**：[/security/policy](https://alexander.xin/security/policy)、[/security/acknowledgments](https://alexander.xin/security/acknowledgments)
- **文档**：
  - 仓库级安全政策：[`.github/SECURITY.md`](./.github/SECURITY.md)
  - 静态站点安全审查：[`docs/SECURITY-REVIEW.md`](./docs/SECURITY-REVIEW.md)
  - 安全联系信息：[`/.well-known/security.txt`](https://alexander.xin/.well-known/security.txt)

## 许可

- **源代码**：BSD 3-Clause License，见 [LICENSE](LICENSE)
- **网站内容**（文字、图片等）：CC BY-NC-ND 4.0，见 [NOTICE](NOTICE)

超出许可范围的使用须事先获得书面同意。

## 版本历史

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本变更和更新历史。

## 贡献

欢迎提交问题和拉取请求！请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细的贡献指南和代码标准。

## 作者

**Alexander James Carter** — [alexander.xin](https://alexander.xin)

