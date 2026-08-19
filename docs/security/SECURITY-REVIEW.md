# 安全审查概要（静态个人站点）

> 本文是对当前站点安全面的简要审查总结，主要针对架构、信任边界与常见风险点，便于后续迭代时参考。
>
> **最后更新**: 2026-08-19

## 1. 架构与信任边界

- **站点类型**：静态个人网站 + 若干前端工具页 + 边缘 Worker（重定向、时间 API、Ops Portal、site-help）。
- **部署路径**：
  - 代码托管在 GitHub 仓库 `AlexanderJ-Carter.github.io`；
  - 构建产物由 GitHub Actions 部署到 GitHub Pages；
  - 域名 `alexander.xin` 通常经由 Cloudflare 代理（含基础 WAF / TLS 终止）。
- **后端 / 数据存储**：
  - 仓库内未包含自建用户数据库；
  - 页面工具（时间 / 汇率 / 单位换算 / QR 生成等）为前端逻辑或外部 API 调用；
  - 不设计为长期存储用户输入数据。
- **源站 vs 边缘头**：`public/_headers` 是 Pages 风格基线；**GitHub Pages 源不会自动应用该文件**。apex 由 `workers/legacy-redirect` 在 HTML 响应上补齐 CSP / COOP / nosniff / `X-Frame-Options`。全站 HSTS 仍应由 Cloudflare 边缘规则管理，避免源站重复。

**结论**：整体攻击面相对有限，主要安全关注点集中在 **前端输入处理 / 依赖安全 / 部署与 Worker 配置** 三个方面。

---

## 2. 已有安全措施盘点

1. **安全联络与政策暴露**
   - `public/.well-known/security.txt` 暴露安全联络方式和政策（符合 RFC 9116 建议，当前 `Expires: 2027-03-19`）；
   - 站内 `/security/policy` 与 `/security/acknowledgments` 页面提供更友好的说明与致谢通道；
   - `public/security/pgp-key.asc` 提供 PGP 公钥，用于安全报告加密。

2. **前端结构与权限**
   - 站点无公开登录 / 管理后台；Ops Portal 走 Cloudflare Access；
   - 仅通过 `sessionStorage` 做轻量的「verify」页面访问控制（更多偏向 UX 阶段、非强安全边界）。

3. **前端最佳实践**
   - 使用 Astro 生成静态 HTML；帮助问答对模型输出先 `escapeHtml` 再有限 markdown；
   - 今日诗词等第三方 JSON 使用 `textContent`，不把远端字符串写入 `innerHTML`；
   - `BaseLayout` 中已集成 SEO / Open Graph / structured data。

4. **依赖与 CI**
   - Dependabot（npm 每周、GitHub Actions 每周）；
   - Code Quality 运行 `npm audit --audit-level=high`、Prettier、ESLint、`astro check`（经 `npm run build`）；
   - 第三方 Action 以 commit SHA 钉死，避免 tag 被改写。

---

## 3. 常见攻击面分析

### 3.1 XSS（跨站脚本）

当前站点大部分内容为作者自写文案与图片，动态内容来自：

- `/api/help` 的 LLM / KB 回答（已转义后再做链接/`**` 替换）；
- 今日诗词（jinrishici）、Open-Meteo、汇率 API；
- 未来若增加「留言板 / 评论 / 表单」等功能，若未做输出编码与过滤，可能产生存储型或反射型 XSS。

**当前结论**：第三方脚本仍依赖 `'unsafe-inline'`（Turnstile / AdSense / 大量 `is:inline`）。后续若启用 Astro `security.csp` 哈希策略，需单独验证广告、人机验证与主题脚本。

### 3.2 依赖与供应链

- 构建依赖通过 `package.json` 与 `package-lock.json` 锁定；
- `overrides` 钉住 lodash / vite / yaml / nanoid 等传递依赖的已披露版本下限；
- GitHub Actions 使用官方 action 大版本 + 第三方 SHA。

**建议**：高危 `npm audit` 失败即修；不要为了「过 CI」把 audit 改回 `continue-on-error`。

### 3.3 部署与配置

- GitHub Pages + Cloudflare 的常见风险：DNS / 缓存规则误配、调试页暴露。
- `_headers` 与 Worker 策略应保持 CSP 白名单一致（含 jinrishici SDK）。www / blog 通过 `scripts/provision-agent-discovery.mjs` 写入 **hostname 限定** 的 Transform Rule（不要对整个 zone 套站点 CSP）。

---

## 4. 隐私与数据

### 4.1 当前状态

- 页面主要为内容展示与轻量工具，不收集账户、密码、支付信息等敏感数据；
- 联系方式以 `mailto:` 邮件链接为主；
- AdSense / CMP 需与 `/privacy` 文案同步；未启用广告时不要加载广告脚本。

### 4.2 未来扩展的注意事项

若新增评论或表单后端：密钥只放平台环境变量；对用户输入禁止 `innerHTML`。

---

## 5. 刻意未做的升级

以下为评估后**暂缓**的项，不是疏漏：

| 项目 | 原因 |
| --- | --- |
| Tailwind CSS v4 | 设计 token / 插件 / `@apply` 迁移面大，与安全无关 |
| TypeScript 6/7、ESLint 10 | 生态与 `astro check` 尚未作为本仓库基线 |
| Astro 内置 `security.csp: true` | 会改成 meta CSP + 哈希；需先盘点全部 `is:inline` 与第三方脚本 |
| 时间 API 收紧 CORS | 公开 JSON 接口，MCP / 外部工具依赖 `Access-Control-Allow-Origin: *` |

---

## 6. 总体结论

在当前形态下，本项目安全面相对简单。只要遵循：

- 不在前端包含任何机密信息；
- 谨慎接入第三方脚本 / 服务；
- 对用户输入与第三方 JSON 做输出编码；
- 让 CI 的 audit / lockfile / Action SHA 真正挡住回归；

则总体安全风险将维持在可控范围内。该文档应随大版本与安全头策略变更同步更新。
