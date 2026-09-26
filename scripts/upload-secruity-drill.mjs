/**
 * Upload secruity-drill Worker + DNS (AAAA 100::) + zone route.
 *
 *   CLOUDFLARE_API_TOKEN=… node scripts/upload-secruity-drill.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const TOKEN = process.env.CLOUDFLARE_API_TOKEN
const ACCOUNT_ID =
  process.env.CLOUDFLARE_ACCOUNT_ID || '863301424d2b2a32561bb2c5cdb640ed'
const ZONE_ID =
  process.env.CLOUDFLARE_ZONE_ID || '575d1a9fc4f734e113e44a5d9edc0f8a'
const SCRIPT = 'secruity-drill'
const HOST = 'secruity.alexander.xin'
const SHORT = 'secruity'

if (!TOKEN) {
  console.error('Missing CLOUDFLARE_API_TOKEN')
  process.exit(1)
}

const root = dirname(fileURLToPath(import.meta.url))
const index = readFileSync(
  join(root, '../workers/secruity-drill/src/index.js'),
  'utf8',
)

const boundary = `----CFWorker${Date.now()}`
const metadata = JSON.stringify({
  main_module: 'index.js',
  compatibility_date: '2026-08-01',
})

const body = [
  `--${boundary}`,
  'Content-Disposition: form-data; name="metadata"',
  'Content-Type: application/json',
  '',
  metadata,
  `--${boundary}`,
  'Content-Disposition: form-data; name="index.js"; filename="index.js"',
  'Content-Type: application/javascript+module',
  '',
  index,
  `--${boundary}--`,
  '',
].join('\r\n')

async function cf(path, init = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(init.headers || {}),
    },
  })
  const json = await res.json()
  if (!json.success) {
    console.error(path, JSON.stringify(json.errors || json, null, 2))
    process.exit(1)
  }
  return json.result
}

await cf(`/accounts/${ACCOUNT_ID}/workers/scripts/${SCRIPT}`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
  },
  body,
})
console.log('uploaded', SCRIPT)

const records = await cf(
  `/zones/${ZONE_ID}/dns_records?name=${HOST}&per_page=50`,
)
const ok = (records || []).find(
  (r) => r.type === 'AAAA' && r.content === '100::' && r.proxied,
)
for (const r of records || []) {
  if (r.id === ok?.id) continue
  if (r.type === 'MX' || r.type === 'TXT') continue
  await cf(`/zones/${ZONE_ID}/dns_records/${r.id}`, { method: 'DELETE' })
  console.log('deleted', r.type, r.content)
}
if (!ok) {
  await cf(`/zones/${ZONE_ID}/dns_records`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'AAAA',
      name: SHORT,
      content: '100::',
      proxied: true,
      ttl: 1,
      comment: 'secruity-drill Worker (typo host)',
    }),
  })
  console.log('created AAAA', HOST, '100::')
} else {
  console.log('ok DNS', HOST, '100::')
}

const routes = await cf(`/zones/${ZONE_ID}/workers/routes`)
const pattern = `${HOST}/*`
const existing = (routes || []).find((r) => r.pattern === pattern)
if (existing) {
  await cf(`/zones/${ZONE_ID}/workers/routes/${existing.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pattern, script: SCRIPT }),
  })
  console.log('updated route', pattern, '→', SCRIPT)
} else {
  await cf(`/zones/${ZONE_ID}/workers/routes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pattern, script: SCRIPT }),
  })
  console.log('created route', pattern, '→', SCRIPT)
}

console.log('done: https://' + HOST)
