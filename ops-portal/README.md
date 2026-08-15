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

## site-help Worker (`/api/help`)

Visitor Q&A for alexander.xin — **KB-first, LLM-fallback**. Source: `src/site-help.js` (ES module worker, bound to KV `HELP_RATE`).

- **Flow**: keyword-match the question against the public KB (`alexander.xin/help/kb.json`, regenerated from `src/data/help-kb.ts`). On a confident hit, return the KB answer (`mode: retrieve`). If `llm:true` and no hit, call OmniRoute (LLM gateway) grounded in the KB facts (`mode: llm`). Else a graceful "no public info" reply (`mode: none`).
- **Guardrails**: fixed system prompt (question never enters the system layer); low temperature + capped tokens; `scrub()` strips leaked prompt/secret patterns; origin allow-list; per-IP rate limit (LLM 20/h, KB 60/h) via `HELP_RATE` KV.
- **Secrets** (set via `wrangler secret put` or dashboard on the `site-help` worker):
  - `OMNI_URL` — OmniRoute base URL (e.g. `https://omni.alexander.xin`); empty = KB-only (AI off).
  - `OMNI_KEY` — bearer token for OmniRoute (never echoed in responses).
  - `OMNI_MODEL` — model id (default `gpt-4o-mini`).
- **Assumes OmniRoute is OpenAI-compatible** (`/v1/chat/completions`). Confirm against the gateway; adjust `callOmni()` if the shape differs.

### Build + deploy

1. Edit `src/site-help.js`.
2. `npm run encode:help` — encodes the source to `dist/help.b64` (+ `help.b64`) for the existing upload pipeline.
3. Deploy with the existing `node ops-portal/scripts/gen-mcp-deploy.cjs` (reads `dist/help.b64`, uploads the `site-help` worker, binds `HELP_RATE` KV).
4. Set `OMNI_URL` / `OMNI_KEY` / `OMNI_MODEL` as worker secrets to enable the LLM path; leave `OMNI_URL` empty to keep KB-only.

