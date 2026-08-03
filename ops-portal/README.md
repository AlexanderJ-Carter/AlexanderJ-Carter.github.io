# Ops Portal

Fleet ops home: tool cards + read-only status probes (behind Cloudflare Access).

## UI

- Source: `public/index.html` (also mirrored to repo `public/ops/index.html`).
- Live UI file on www: `https://www.alexander.xin/ops/index.html` (Worker fetches it for `/`).
- Icons: `public/icons/` + repo `public/img/ops/*.svg`. Regenerate with `node scripts/gen-icons.mjs`.
- After HTML/icon edits: upload to server `dist/ops/` and `dist/img/ops/` (scp), then refresh Ops.

## Deploy

1. Prefer Cloudflare API multipart upload of `src/worker.js` as Worker `ops-portal` (local wrangler may be broken).
2. Access app for `ops.alexander.xin`; keep visible in App Launcher. Hide infrequently used apps (SSH) — reach them from this portal.
3. Pocket ID OIDC as primary IdP; OTP as break-glass.

## Endpoints

- `/` — ops home (cards + probes table; HTML from www mirror)
- `/api/status` — probe apex, www, identity, time API, tools, paste, network.json

No Docker socket, no secrets, no write actions in v1.
