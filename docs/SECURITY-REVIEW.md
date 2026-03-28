# 安全审查概要（静态个人站点）

> 本文是对当前站点安全面的简要审查总结，主要针对架构、信任边界与常见风险点，便于后续迭代时参考。

## 1. 架构与信任边界

- **站点类型**：静态个人网站 + 若干前端工具页；
- **部署路径**：
  - 代码托管在 GitHub 仓库 `AlexanderJ-Carter.github.io`；
  - 构建产物由 GitHub Actions 部署到 GitHub Pages；
  - 域名 `alexander.xin` 通常经由 Cloudflare 代理（含基础 WAF / TLS 终止）。
- **后端 / 数据存储**：
  - 仓库内未包含自建后端服务或数据库；
  - 页面工具（时间 / 汇率 / 单位换算 / QR 生成等）为前端逻辑或外部 API 调用；
  - 不设计为长期存储用户输入数据。

**结论**：整体攻击面相对有限，主要安全关注点集中在 **前端输入处理 / 依赖安全 / 部署配置** 三个方面。

---

## 2. 已有安全措施盘点

1. **安全联络与政策暴露**
   - `public/.well-known/security.txt` 暴露安全联络方式和政策（符合 RFC 9116 建议）；
   - 站内 `/security/policy` 与 `/security/acknowledgments` 页面提供更友好的说明与致谢通道；
   - `public/security/pgp-key.asc` 提供 PGP 公钥，用于安全报告加密。

2. **前端结构与权限**
   - 站点无登录 / 管理后台功能；
   - 仅通过 `sessionStorage` 做轻量的「verify」页面访问控制（更多偏向 UX 阶段、非强安全边界）。

3. **前端最佳实践**
   - 使用 Astro 生成静态 HTML，默认模板无直传用户输入到 `innerHTML` 的高危用法；
   - 使用 Tailwind 与本地脚本，避免大量第三方不透明脚本；
   - `BaseLayout` 中已集成 SEO / Open Graph / structured data，未发现明显安全问题。

---

## 3. 常见攻击面分析

### 3.1 XSS（跨站脚本）

当前站点大部分内容为作者自写文案与图片，动态内容较少，理论 XSS 风险主要来源于：

- 未来若增加「留言板 / 评论 / 表单」等功能，若未做输出编码与过滤，可能产生存储型或反射型 XSS；
- 如引入第三方 Widget（统计工具、评论系统）且未审查脚本或未配置 CSP；
- 手动操作 DOM 时（`script is:inline`）若拼接了来自 `location.search` / `hash` / `localStorage` 等不可信数据。

**当前结论**：在不新增输入型功能的前提下，XSS 风险较低；如后续引入交互表单，需要同时：

- 严格避免直接将用户输入传给 `innerHTML` / `dangerouslySetInnerHTML`；
- 在必要时开启合适的 Content-Security-Policy（可在 `_headers` / 反向代理层配置）。

### 3.2 依赖与供应链

- 构建依赖主要通过 `package.json` 与 `package-lock.json` 管理；
- 使用 Astro 官方生态（`@astrojs/tailwind`，`@astrojs/sitemap` 等）以及 Tailwind；
- 若不定期更新依赖，可能存在低风险的已知漏洞，但在「纯静态站点」场景下，利用难度较大。

**建议**：

- 在本地或 CI 中定期运行：
  - `npm audit` 或 GitHub Dependabot；
  - 如提示高危依赖，评估是否会实际影响静态产物，再决定升级。

### 3.3 部署与配置

- GitHub Pages + Cloudflare 的常见风险：
  - 误配置 DNS 或 Cloudflare 规则导致缓存 / 跳转异常；
  - 若开启过多开发调试功能（例如开放 Source Map、调试页面），可能无意暴露内部信息。

**建议**：

- 保持 Cloudflare 中仅开启必要规则（如基础 WAF、防 DDoS）；
- 不在生产环境暴露未用到的调试页面、`/dev/*` 路由等。

---

## 4. 隐私与数据

### 4.1 当前状态

- 页面主要为内容展示与轻量工具，不收集账户、密码、支付信息等敏感数据；
- 联系方式以 `mailto:` 邮件链接为主；如未来使用第三方表单，需要单独评估隐私影响；
- 如接入统计工具，应在 `/privacy` 中明确说明收集内容与用途，并尊重用户的 Do Not Track / Cookie 选择。

### 4.2 未来扩展的注意事项

若新增：

- **评论 / 留言**：建议使用第三方托管（如 GitHub Issues、Giscus、独立评论服务），并在隐私页说明：
  - 谁在处理数据（第三方服务商）；
  - 存储位置与保留时长；
  - 用户如何请求删除数据。
- **表单后端**：优先采用：
  - Cloudflare Workers / Pages Functions；
  - 其他 serverless 平台（Supabase、Vercel 等）。  
    所有密钥通过平台环境变量配置，不写入仓库。

---

## 5. 建议的后续安全改进方向

以下为「可选优化」，并非当前必须项：

1. **统一安全文档入口**
   - 在 `README.md` 中链接：`AGENT.md`、`.github/SECURITY.md`、本文件；
   - 确保安全研究人员与 AI 助手都能快速找到安全相关信息。

2. **轻量 CSP 与 Headers（依赖托管平台能力）**
   - 如托管平台支持自定义响应头，可考虑：
     - 设置 `Content-Security-Policy` 限定脚本来源为 `self` 与极少数受信任域；
     - 配置 `X-Content-Type-Options: nosniff`、`Referrer-Policy` 等基础安全头；
   - 在调整前需测试音乐播放器、动画脚本等是否受影响。

3. **自动化依赖检查**

> 若未来 CI 配置复杂度可接受：

- 在 GitHub Actions 中增加简单的 `npm audit --production` 或 `npx astro check` 步骤；
- 对于仅影响开发环境的漏洞，可分级处理，避免阻塞正常部署。

4. **安全变更日志（可选）**

- 如未来安全相关改动增多，可在此文件中维护「安全相关变更时间线」；
- 包括：依赖重大更新、安全头策略变更、外部服务接入与迁移等。

---

## 6. 总体结论

在当前形态下，本项目安全面相对简单，主要风险集中在「未来新增动态功能时的设计与实现」。  
只要遵循：

- 不在前端包含任何机密信息；
- 谨慎接入第三方脚本 / 服务；
- 对用户输入类功能进行必要过滤与编码；

则总体安全风险将维持在可控范围内。该文档可在后续大版本迭代时持续更新。
