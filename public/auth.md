# auth.md

Not a human visitor? Start with https://alexander.xin/llms.txt and https://alexander.xin/.well-known/api-catalog.

You are an agent. This document describes how to obtain credentials for **alexander.xin**.

## Audience

Agents that need to read public site content, call the public Time API, or use the public MCP endpoint.

## Registration policy

This site does **not** require agent registration and does **not** issue OAuth access tokens for public resources.

Supported identity type: **anonymous**.

- Public HTML/Markdown pages: no credential.
- Time API (`https://api.alexander.xin/time` or `/time/now`): no credential.
- MCP (`https://alexander.xin/mcp`): no credential.

There is no `register_uri` that creates accounts. Do not invent signup forms or scrape `/verify` Turnstile flows for agents — that gate is for human About/Contact pages only.

## How to proceed

1. Read `https://alexander.xin/llms.txt` for site orientation.
2. Discover APIs via `https://alexander.xin/.well-known/api-catalog`.
3. Discover MCP via `https://alexander.xin/.well-known/mcp/server-card.json`.
4. Prefer `Accept: text/markdown` when fetching HTML pages (edge converts when available).
5. Contact humans at `mailto:contact-us@alexander.xin` only when you need a policy exception.

## OAuth metadata

Protected Resource Metadata: `https://alexander.xin/.well-known/oauth-protected-resource`

Authorization Server Metadata: `https://alexander.xin/.well-known/oauth-authorization-server`

These documents advertise the anonymous agent-auth profile. Authorization and token endpoints exist for protocol compatibility and return structured errors explaining that public resources need no bearer token.
