# 实例配置（不入库）

本目录区分 **开源模板** 与 **你的站点实例**：

| 文件 | 是否提交 | 用途 |
|------|----------|------|
| `config.example.json` | 是 | 接口样例，克隆后复制改名 |
| `config.json` | **否** | 你的真实姓名、域名、论文、外链等 |

```bash
cp instance/config.example.json instance/config.json
# 编辑 config.json 后：本地 pnpm dev / 服务器 docker compose build
```

密钥（`PAYLOAD_SECRET`、`OIDC_CLIENT_SECRET` 等）只放 `.env` / `.env.production`，永远不要写进 JSON。

部署 CI 已排除 `instance/config.json`，避免用空仓库覆盖服务器上的实例文件。
