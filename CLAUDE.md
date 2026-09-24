# CLAUDE / Agent

主站 `folio/` → www；Pages `gateway/`；`src/` 仅迁移源。

- 改站：`folio/src/`。勿删 Folio 安全资产与 `.github/SECURITY.md`。勿提交密钥。
- 说明：[docs/FOLIO-CUTOVER.md](./docs/FOLIO-CUTOVER.md) · [docs/FOLIO-INSTANCE.md](./docs/FOLIO-INSTANCE.md) · [docs/FOLIO-IA.md](./docs/FOLIO-IA.md)
- 动画尊重 `prefers-reduced-motion`；交互可键盘聚焦。
- 验证：`pnpm --dir folio build`；点验 `/` `/gallery` `/fun` `/admin` `/security/policy`。
- 未经明确要求不要 `git push`。
