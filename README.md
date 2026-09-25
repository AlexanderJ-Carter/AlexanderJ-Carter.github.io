# Folio

Payload + Next 个人站模板。本仓库可开源复用；**你的域名、姓名、密钥、CMS 数据只放实例侧**。

| 目录 | 职责 |
|------|------|
| `folio/` | 主站应用 |
| `gateway/` | GitHub Pages 名片（可选） |
| `docs/FOLIO.md` | 实例化说明 |

```bash
npm run folio    # folio/ · :3000 · /admin
```

推送 `folio/**` 触发镜像部署工作流（若已配置 Secrets）。DNS / 密钥只在服务器与 Cloudflare 修改。

案例预设：`folio/instance/presets/alexander.json`（可复制为服务器 `config.json`）。

## 许可

- 代码：[LICENSE](LICENSE)（BSD 3-Clause）
- 内容：[NOTICE](NOTICE)（CC BY-NC-ND 4.0）
- 安全：[.github/SECURITY.md](.github/SECURITY.md)
