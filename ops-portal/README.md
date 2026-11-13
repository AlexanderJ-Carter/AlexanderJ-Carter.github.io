# Ops Portal

维护者入口（站内 `/login` CTA 指向此处）。Cloudflare Access 后的工具卡片与只读探活，不是访客注册。

- UI：`public/index.html`（镜像到站上 `/ops/`）
- 探活：`GET /api/status` · 手动检查：`POST /api/check`
- 告警：cron + KV 状态差分；密钥用 `wrangler secret put`（`RESEND_API_KEY` 等）
- 访客「问站」在 Folio：`POST /api/ask`（KB：`folio/public/assistant/kb.json`）
