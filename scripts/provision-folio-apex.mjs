#!/usr/bin/env node
/**
 * Folio 边缘：apex/www Tunnel、www→apex、别名主机 → Folio 路径。
 * 需 CLOUDFLARE_API_TOKEN（Zone DNS Edit + Redirect Rules Edit + Workers Routes）。
 *
 *   CLOUDFLARE_API_TOKEN=… node scripts/provision-folio-apex.mjs
 *   CLOUDFLARE_API_TOKEN=… node scripts/provision-folio-apex.mjs --dry-run
 */
const ZONE_NAME = 'alexander.xin'
const TUNNEL = 'afd9454b-e68f-442f-b53b-79038f6599b5.cfargotunnel.com'
const TOKEN = process.env.CLOUDFLARE_API_TOKEN
const DRY = process.argv.includes('--dry-run')

/** 仅 Redirect Rule 的别名（AAAA 100::，不经 Tunnel） */
const ALIAS_REDIRECTS = [
  { host: 'about.alexander.xin', path: '/about', description: 'about → Folio /about' },
  { host: 'bio.alexander.xin', path: '/about', description: 'bio → Folio /about' },
  { host: 'contact.alexander.xin', path: '/contact', description: 'contact → Folio /contact' },
  { host: 'time.alexander.xin', path: '/time', description: 'time → Folio /time' },
]

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

function hostRedirectRule({ host, path, description }) {
  return {
    description,
    expression: `(http.host eq "${host}")`,
    action: 'redirect',
    action_parameters: {
      from_value: {
        status_code: 301,
        target_url: { value: `https://${ZONE_NAME}${path}` },
        preserve_query_string: true,
      },
    },
    enabled: true,
  }
}

async function ensureApexAndWww(zoneId, records) {
  const apexGithub = records.filter(
    (r) =>
      r.name === ZONE_NAME &&
      (r.type === 'A' || r.type === 'AAAA') &&
      (String(r.content).startsWith('185.199.') ||
        String(r.content).includes('2606:50c0:800')),
  )
  const apexCname = records.find((r) => r.name === ZONE_NAME && r.type === 'CNAME')
  const www = records.find((r) => r.name === `www.${ZONE_NAME}` && r.type === 'CNAME')
  const tunnelTarget = www?.content || TUNNEL
  console.log('www →', tunnelTarget)
  console.log('apex GitHub A/AAAA to remove:', apexGithub.length)

  if (DRY) return tunnelTarget

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
  return tunnelTarget
}

async function ensureAliasDns(zoneId, records) {
  for (const { host } of ALIAS_REDIRECTS) {
    const short = host.replace(`.${ZONE_NAME}`, '')
    const existing = records.filter((r) => r.name === host)
    const ok = existing.find(
      (r) => r.type === 'AAAA' && r.content === '100::' && r.proxied,
    )
    if (DRY) {
      console.log('alias DNS', host, ok ? 'ok 100::' : `would set (${existing.length} existing)`)
      continue
    }
    for (const r of existing) {
      if (r.id === ok?.id) continue
      await api('DELETE', `/zones/${zoneId}/dns_records/${r.id}`)
      console.log('deleted', r.type, host, r.content)
    }
    if (!ok) {
      await api('POST', `/zones/${zoneId}/dns_records`, {
        type: 'AAAA',
        name: short,
        content: '100::',
        proxied: true,
        ttl: 1,
      })
      console.log('created AAAA', host, '100::')
    } else {
      console.log('ok', host, '100::')
    }
  }
}

async function ensureRedirectRules(zoneId) {
  const wwwRule = {
    description: 'www → apex (Folio canonical)',
    expression: `(http.host eq "www.${ZONE_NAME}")`,
    action: 'redirect',
    action_parameters: {
      from_value: {
        status_code: 301,
        target_url: {
          expression: `concat("https://${ZONE_NAME}", http.request.uri.path)`,
        },
        preserve_query_string: true,
      },
    },
    enabled: true,
  }
  const wanted = [wwwRule, ...ALIAS_REDIRECTS.map(hostRedirectRule)]
  const keep = new Set(wanted.map((r) => r.description))

  if (DRY) {
    console.log(
      'would ensure redirect rules:',
      wanted.map((r) => r.description).join('; '),
    )
    return
  }

  const phase = 'http_request_dynamic_redirect'
  const rulesets = await api('GET', `/zones/${zoneId}/rulesets`)
  let entry = rulesets.find((r) => r.phase === phase && r.kind === 'zone')
  if (!entry) {
    entry = await api('POST', `/zones/${zoneId}/rulesets`, {
      name: 'Folio host redirects',
      kind: 'zone',
      phase,
      rules: wanted,
    })
    console.log('created redirect ruleset', entry.id)
    return
  }
  const detailed = await api('GET', `/zones/${zoneId}/rulesets/${entry.id}`)
  const others = (detailed.rules || []).filter((r) => !keep.has(r.description))
  await api('PUT', `/zones/${zoneId}/rulesets/${entry.id}`, {
    rules: [...others, ...wanted],
  })
  console.log('updated redirect ruleset', entry.id, 'managed', wanted.length)
}

async function main() {
  const zones = await api('GET', `/zones?name=${ZONE_NAME}`)
  const zone = zones[0]
  if (!zone) throw new Error('zone not found')
  console.log('zone', zone.id, DRY ? '(dry-run)' : '')

  const records = await api('GET', `/zones/${zone.id}/dns_records?per_page=200`)
  await ensureApexAndWww(zone.id, records)
  await ensureAliasDns(zone.id, records)
  await ensureRedirectRules(zone.id)

  console.log(
    'Done. legacy-redirect 仍挂 alexander.xin/*。Set NEXT_PUBLIC_SERVER_URL=https://alexander.xin',
  )
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
