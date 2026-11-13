# 安全政策（GitHub 仓库级别）

> 本文件补充站点内的 `/security/policy` 页面与 `/.well-known/security.txt`，面向 GitHub 漏洞报告者与安全研究人员。

## 报告安全问题

- **请勿公开披露未修复漏洞**（包括 issue、讨论区、公开 gist 等）。
- 优先通过以下任一渠道报告：
  - 参见站点根目录 `/.well-known/security.txt` 中列出的联系方式；
  - 访问 `https://alexander.xin/security/policy`，按照说明使用推荐方式联系；
  - 如需加密，请使用站点 `folio/public/security/pgp-key.asc` 中的 PGP 公钥。

在报告中请尽量提供：

- 受影响的 URL / 功能；
- 重现步骤（必要时可附截图 / 简短视频）；
- 预期行为与实际行为对比；
- 可能的安全影响（例如信息泄露、XSS、访问控制绕过等）。

## 响应预期

由于这是个人项目，响应时间可能会因学习 / 工作安排有所波动，但我会在能力范围内尽快：

1. 确认收到报告；
2. 评估影响范围与修复优先级；
3. 在修复完成并部署后，征得同意后在 `/security/acknowledgments` 页面中致谢。

目前不设正式赏金计划，但会在合理范围内给予公开致谢。

## 范围说明

- 主站：`folio/`（Next + Payload，含 `/admin` 与可选门禁页）
- 名片：`gateway/`（GitHub Pages）+ Cloudflare（CDN / WAF / Workers）

以下一般不在范围内：第三方服务本身、本项目中不可触达的已知依赖漏洞、无法在实际部署中复现的理论攻击。不确定时仍欢迎私下联系。
