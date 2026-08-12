# Ops Portal

Fleet ops home and **primary maintainer entry** (site `/login` CTA points here). Tool cards + read-only status probes behind Cloudflare Access. Not visitor registration.

## UI

- Source: `public/index.html` (also mirrored to repo `public/ops/index.html`).
- Live UI file on www: `https://www.alexander.xin/ops/index.html` (Worker fetches it for `/`).
- Icons: `public/icons/` + repo `public/img/ops/*.svg`. Regenerate with `node scripts/gen-icons.mjs`.
- After HTML/icon edits: upload to server `dist/ops/` and `dist/img/ops/` (scp), then refresh Ops.

## Deploy

1. Prefer Cloudflare API multipart upload of `src/worker.js` as Worker `ops-portal` (local wrangler may be broken).
2. Access app for `ops.alexander.xin`; keep visible in App Launcher. Hide infrequently used apps (SSH) — reach them from this portal.
3. Pocket ID OIDC as primary IdP; Access IdP `Email OTP (break-glass)` for emergencies.

## Endpoints

- `/` — ops home (cards + probes table; HTML from www mirror)
- `/api/status` — probe apex, www, identity, time API, tools, paste, network.json, fleet-changelog.json
- Fleet log UI fetches `https://www.alexander.xin/fleet-changelog.json` (public; maintained in `src/data/fleet-changelog.ts`)

No Docker socket, no secrets, no write actions in v1.
