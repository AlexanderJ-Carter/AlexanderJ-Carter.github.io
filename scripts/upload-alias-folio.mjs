#!/usr/bin/env node
/**
 * Upload alias-folio Worker (folio.alexander.xin → apex).
 * Requires CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const script = readFileSync(join(root, 'workers/alias-folio/src/index.js'), 'utf8')
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const token = process.env.CLOUDFLARE_API_TOKEN
if (!accountId || !token) {
  console.error('Need CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN')
  process.exit(1)
}

const name = 'alias-folio'
const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${name}`
const res = await fetch(base, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/javascript',
  },
  body: script,
})
const body = await res.json()
if (!res.ok || !body.success) {
  console.error(JSON.stringify(body, null, 2))
  process.exit(1)
}
console.log('uploaded', name)
