/**
 * Upload blog-alias Worker and attach custom domain blog.alexander.xin.
 * Requires CLOUDFLARE_API_TOKEN (+ zone edit on alexander.xin).
 *
 *   CLOUDFLARE_API_TOKEN=… node scripts/upload-blog-alias.mjs
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const TOKEN = process.env.CLOUDFLARE_API_TOKEN
const ACCOUNT_ID =
  process.env.CLOUDFLARE_ACCOUNT_ID || '863301424d2b2a32561bb2c5cdb640ed'
const ZONE_ID =
  process.env.CLOUDFLARE_ZONE_ID || '575d1a9fc4f734e113e44a5d9edc0f8a'
const SCRIPT = 'blog-alias'
const HOST = 'blog.alexander.xin'

if (!TOKEN) {
  console.error('Missing CLOUDFLARE_API_TOKEN')
  process.exit(1)
}

const root = dirname(fileURLToPath(import.meta.url))
const index = readFileSync(
  join(root, '../workers/blog-alias/src/index.js'),
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
      ...(init.body && !(init.headers && init.headers['Content-Type'])
        ? {}
        : {}),
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

// Prefer Workers route on the zone (works even if Pages still holds DNS briefly).
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

console.log('done: https://' + HOST + ' → https://alexander.xin/posts')
