# 实例配置（不入库）

| 文件 | 提交 | 用途 |
|------|------|------|
| `config.example.json` | 是 | 接口样例 |
| `presets/*.json` | 是 | 可选案例（复制后改） |
| `config.json` | **否** | 真实实例 |

```bash
cp instance/config.example.json instance/config.json
# 或：cp instance/presets/alexander.json instance/config.json
```

`research.publications` → `/research`；`about.timeline` → 门禁 `/about`。  
密钥只放 `.env` / `.env.production`。详见 [docs/FOLIO.md](../../docs/FOLIO.md)。
