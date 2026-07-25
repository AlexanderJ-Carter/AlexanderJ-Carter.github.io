#!/usr/bin/env node
/**
 * Provision Cloudflare edge pieces for agent discovery.
 * Requires CLOUDFLARE_API_TOKEN with Zone DNS Edit, Zone Settings Edit,
 * and Account Workers Edit as needed.
 *
 * Usage:
 *   node scripts/provision-agent-discovery.mjs
 */

const ZONE_NAME = 'alexander.xin';
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!TOKEN) {
  console.error('Missing CLOUDFLARE_API_TOKEN');
  process.exit(1);
}

const api = async (method, path, body) => {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(JSON.stringify(json.errors || json, null, 2));
  }
  return json.result;
};

async function main() {
  const zones = await api('GET', `/zones?name=${ZONE_NAME}`);
  const zone = zones[0];
  if (!zone) throw new Error('Zone not found');
  const zoneId = zone.id;
  console.log('Zone', zoneId, zone.plan?.name);
  // Free plan only: Markdown for Agents (content_converter) is Pro+; use Worker instead.

  const desired = [
    {
      type: 'SVCB',
      name: `_index._agents.${ZONE_NAME}`,
      data: {
        priority: 1,
        target: ZONE_NAME,
        value: 'alpn="h2,h3" port=443',
      },
      ttl: 3600,
    },
    {
      type: 'SVCB',
      name: `_mcp._agents.${ZONE_NAME}`,
      data: {
        priority: 1,
        target: ZONE_NAME,
        value: 'alpn="h2,h3" port=443',
      },
      ttl: 3600,
    },
  ];

  for (const record of desired) {
    const existing = await api(
      'GET',
      `/zones/${zoneId}/dns_records?type=${record.type}&name=${record.name}`
    );
    if (existing.length) {
      const id = existing[0].id;
      const updated = await api('PUT', `/zones/${zoneId}/dns_records/${id}`, {
        type: record.type,
        name: record.name,
        ttl: record.ttl,
        data: record.data,
      });
      console.log('updated', updated.name, updated.type);
    } else {
      const created = await api('POST', `/zones/${zoneId}/dns_records`, {
        type: record.type,
        name: record.name,
        ttl: record.ttl,
        data: record.data,
      });
      console.log('created', created.name, created.type);
    }
  }

  const rulesets = await api('GET', `/zones/${zoneId}/rulesets`);
  const phase = 'http_response_headers_transform';
  let entry = rulesets.find((r) => r.phase === phase && r.kind === 'zone');
  const linkValue =
    '</.well-known/api-catalog>; rel="api-catalog", </.well-known/mcp/server-card.json>; rel="service-desc", </.well-known/agent-skills/index.json>; rel="describedby", </llms.txt>; rel="describedby", </auth.md>; rel="describedby"';
  const rule = {
    expression: '(http.request.uri.path eq "/")',
    description: 'Agent discovery Link headers on homepage',
    action: 'rewrite',
    action_parameters: {
      headers: {
        Link: {
          operation: 'set',
          value: linkValue,
        },
      },
    },
  };

  if (!entry) {
    entry = await api('POST', `/zones/${zoneId}/rulesets`, {
      name: 'Agent discovery response headers',
      kind: 'zone',
      phase,
      rules: [rule],
    });
    console.log('created ruleset', entry.id);
  } else {
    const detailed = await api('GET', `/zones/${zoneId}/rulesets/${entry.id}`);
    const rules = (detailed.rules || []).filter(
      (r) => r.description !== rule.description
    );
    rules.push(rule);
    const updated = await api('PUT', `/zones/${zoneId}/rulesets/${entry.id}`, {
      rules,
    });
    console.log('updated ruleset', updated.id);
  }

  console.log('Done. Deploy workers/agent-gateway with: npx wrangler deploy');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
