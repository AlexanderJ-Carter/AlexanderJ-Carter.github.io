# ops-agent (planned)

Tiny read-only host health API for SSH Cloud.

## Constraints

- Listen on `127.0.0.1` only
- Expose via Tunnel hostname + Cloudflare Access JWT validation
- Report disk, memory, container health for an allow-list
- No Docker socket write, no remote shell

## Suggested path on server

`~/fleet/ops-agent/`

Do not start until Access JWT verification is wired.
