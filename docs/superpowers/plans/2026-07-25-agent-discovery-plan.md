# Agent Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship static discovery documents plus Cloudflare edge behavior so alexander.xin passes agent-readiness discoverability checks without inventing a fake login system.

**Architecture:** Astro static files under `public/` for catalogs/skills/auth; `WebMcp.astro` for browser tools; `workers/agent-gateway` for Link/Markdown/MCP; `scripts/provision-agent-discovery.mjs` for DNS-AID + header transform + optional Markdown for Agents.

**Tech Stack:** Astro 5 static, Cloudflare Workers, Cloudflare DNS SVCB, RFC 9727/8288/8414/9728.

## Tasks

1. Static discovery files in `public/.well-known/**`, `auth.md`, `llms.txt`, OpenAPI.
2. WebMCP registration in `BaseLayout` via `WebMcp.astro`.
3. Agent gateway Worker for `/mcp`, markdown Accept, content types, Link fallback.
4. Provision DNS-AID SVCB + response header transform (+ DNSSEC / content_converter when plan allows).
5. `npm run build` + local artifact checks; after deploy, `isitagentready` scan.
