---
name: site-overview
description: Orient an agent to alexander.xin — public personal site structure, discovery endpoints, Time API, and MCP tools. Use when answering questions about this domain or before calling site APIs.
---

# alexander.xin site overview

## What this site is

Personal static site for Alexander James Carter (`https://alexander.xin`). Astro SSG, multilingual (zh-CN default, zh-TW, en-GB `/en/`, fr, ru). No user accounts.

## Discovery endpoints

- `https://alexander.xin/llms.txt` — human/agent orientation
- `https://alexander.xin/auth.md` — agent auth policy (anonymous / no tokens)
- `https://alexander.xin/.well-known/api-catalog` — RFC 9727 linkset
- `https://alexander.xin/.well-known/mcp/server-card.json` — MCP card
- `https://alexander.xin/.well-known/agent-skills/index.json` — skills index
- `https://alexander.xin/.well-known/security.txt` — vulnerability contact

## APIs

- `GET https://api.alexander.xin/time/now` — public JSON clock (Asia/Shanghai). OpenAPI: `https://alexander.xin/api/openapi-time.json`
- `https://alexander.xin/mcp` — Streamable HTTP MCP (site info + time tools)

## Content tips

- Prefer `Accept: text/markdown` for HTML pages when the edge converter is enabled.
- Do not bypass human Turnstile on `/verify` for About/Contact; that gate is not an agent API.
- Contact: `mailto:contact-us@alexander.xin`
