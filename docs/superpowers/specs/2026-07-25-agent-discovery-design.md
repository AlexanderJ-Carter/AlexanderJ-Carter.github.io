# Agent Discovery Design (2026-07-25)

## Goal

Make `https://alexander.xin` discoverable by AI agents per isitagentready checks, without inventing a fake login system.

## Principles

1. Prefer truthful metadata over scanner-passing stubs.
2. Public site content and `api.alexander.xin` time API remain unauthenticated.
3. GitHub Pages does not apply `public/_headers`; Link headers and content negotiation are enforced by the `legacy-redirect` Worker on `alexander.xin/*`.
4. Free-plan only: no Pro Markdown for Agents / paid IdP. Worker converts HTML when `Accept: text/markdown`.

## Delivered

| Check                                                                    | Delivery                                         | Live now?                 |
| ------------------------------------------------------------------------ | ------------------------------------------------ | ------------------------- |
| Link headers                                                             | Worker sets `Link` on `/`                        | Yes                       |
| Markdown negotiation                                                     | Worker HTML→MD + `x-markdown-tokens`             | Yes                       |
| MCP endpoint                                                             | Worker `/mcp` Streamable HTTP                    | Yes                       |
| DNS-AID                                                                  | SVCB `_index._agents` + `_mcp._agents` (AD=true) | Yes                       |
| API Catalog / skills / auth.md / OAuth well-known / WebMCP / server-card | Static files in `public/`                        | After GitHub Pages deploy |

## Auth stance

`/auth.md` and OAuth well-known documents advertise **anonymous** access only. Authorization/token endpoints return structured errors; no accounts are created.
