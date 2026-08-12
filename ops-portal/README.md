# Ops Portal

Fleet ops home and **primary maintainer entry** (site `/login` CTA points here). Tool cards + read-only status probes behind Cloudflare Access. Not visitor registration.

## UI

- Source: `public/index.html` (also mirrored to repo `public/ops/index.html`).
- Live UI file on www: `https://www.alexander.xin/ops/index.html` (Worker fetches it for `/`).
- Icons: `public/icons/` + repo `public/img/ops/*.svg`. Regenerate with `node scripts/gen-icons.mjs`.
- After HTML/icon edits: upload to server `dist/ops/` and `dist/img/ops/` (scp), then refresh Ops.

## Alerting (cron)

- Cron: every 10 minutes (`wrangler.jsonc` triggers).
- KV `OPS_STATE` stores last ok/down map; email only on **state change**.
- Secrets (dashboard or `wrangler secret put`):
  - `RESEND_API_KEY` — required to send
  - `ALERT_FROM` — default `Ops Portal <noreply@alexander.xin>`
  - `ALERT_TO` — comma-separated; default `2253940186@qq.com`
- Manual run: `POST https://ops.alexander.xin/api/check` (behind Access)
- `/api/status` reports `alerting.kv` / `alerting.resend`

## Deploy

1. Prefer Cloudflare API multipart upload of the Worker (local wrangler may lack token).
2. Access app for `ops.alexander.xin`; keep visible in App Launcher.
3. Pocket ID OIDC as primary IdP; Access IdP `Email OTP (break-glass)` for emergencies.

## Endpoints

- `/` — ops home (cards + fleet log + probes; HTML from www mirror)
- `/api/status` — probe apex, www, blog, identity, time API, tools, paste, cook, lab, network.json
- `/api/check` — POST: run probes, diff, optional email
- `/fleet-changelog.json` — maintainer-only fleet timeline (proxied from www `/ops/fleet-changelog.json`; not shown on public Network)
