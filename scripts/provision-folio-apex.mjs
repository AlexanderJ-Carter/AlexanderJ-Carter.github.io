#!/usr/bin/env node
/**
 * 把 apex 指到与 www 相同的 Tunnel，并加 www → apex 301。
 * 需 CLOUDFLARE_API_TOKEN（DNS Edit + Redirect Rules Edit）。
 *
 *   CLOUDFLARE_API_TOKEN=… node scripts/provision-folio-apex.mjs
 *   CLOUDFLARE_API_TOKEN=… node scripts/provision-folio-apex.mjs --dry-run
 */
const ZONE_NAME = 'alexander.xin'
const TUNNEL = 'afd9454b-e68f-442f-b53b-79038f6599b5.cfargotunnel.com'
const TOKEN = process.env.CLOUDFLARE_API_TOKEN
const DRY = process.argv.includes('--dry-run')

if (!TOKEN) {
  console.error('Missing CLOUDFLARE_API_TOKEN')
  process.exit(1)
}

async function api(method, path, body) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!json.success) {
    throw new Error(`${method} ${path}\n${JSON.stringify(json.errors || json, null, 2)}`)
  }
  return json.result
}

async function main() {
  const zones = await api('GET', `/zones?name=${ZONE_NAME}`)
  const zone = zones[0]
  if (!zone) throw new Error('zone not found')
  const zoneId = zone.id
  console.log('zone', zoneId, DRY ? '(dry-run)' : '')

  const records = await api('GET', `/zones/${zoneId}/dns_records?per_page=200`)
  const apexGithub = records.filter(
    (r) =>
      r.name === ZONE_NAME &&
      (r.type === 'A' || r.type === 'AAAA') &&
      (String(r.content).startsWith('185.199.') ||
        String(r.content).includes('2606:50c0:800')),
  )
  const apexCname = records.find(
    (r) => r.name === ZONE_NAME && r.type === 'CNAME',
  )
  const www = records.find((r) => r.name === `www.${ZONE_NAME}` && r.type === 'CNAME')
  const tunnelTarget = www?.content || TUNNEL
  console.log('www →', tunnelTarget)
  console.log('apex GitHub A/AAAA to remove:', apexGithub.length)
  console.log('apex CNAME:', apexCname?.content || '(none)')

  if (!DRY) {
    for (const r of apexGithub) {
      await api('DELETE', `/zones/${zoneId}/dns_records/${r.id}`)
      console.log('deleted', r.type, r.content)
    }
    if (apexCname) {
      await api('PUT', `/zones/${zoneId}/dns_records/${apexCname.id}`, {
        type: 'CNAME',
        name: '@',
        content: tunnelTarget,
        proxied: true,
        ttl: 1,
      })
      console.log('updated apex CNAME →', tunnelTarget)
    } else {
      await api('POST', `/zones/${zoneId}/dns_records`, {
        type: 'CNAME',
        name: '@',
        content: tunnelTarget,
        proxied: true,
        ttl: 1,
      })
      console.log('created apex CNAME →', tunnelTarget)
    }
  }

  // Single Redirect: www → apex
  const phase = 'http_request_dynamic_redirect'
  const rulesets = await api('GET', `/zones/${zoneId}/rulesets`)
  let entry = rulesets.find((r) => r.phase === phase && r.kind === 'zone')
  const redirectRule = {
    description: 'www → apex (Folio canonical)',
    expression: '(http.host eq "www.alexander.xin")',
    action: 'redirect',
    action_parameters: {
      from_value: {
        status_code: 301,
        target_url: {
          expression:
            'concat("https://alexander.xin", http.request.uri.path)',
        },
        preserve_query_string: true,
      },
    },
    enabled: true,
  }

  if (DRY) {
    console.log('would ensure redirect rule:', redirectRule.description)
    return
  }

  if (!entry) {
    entry = await api('POST', `/zones/${zoneId}/rulesets`, {
      name: 'Folio host redirects',
      kind: 'zone',
      phase,
      rules: [redirectRule],
    })
    console.log('created redirect ruleset', entry.id)
  } else {
    const detailed = await api('GET', `/zones/${zoneId}/rulesets/${entry.id}`)
    const rules = (detailed.rules || []).filter(
      (r) => r.description !== redirectRule.description,
    )
    rules.push(redirectRule)
    await api('PUT', `/zones/${zoneId}/rulesets/${entry.id}`, { rules })
    console.log('updated redirect ruleset', entry.id)
  }

  console.log('Done. Purge CF cache if needed. Set NEXT_PUBLIC_SERVER_URL=https://alexander.xin and rebuild.')
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
