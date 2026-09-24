import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const email = process.env.SEED_EMAIL || 'admin@alexander.xin'
const password = process.env.SEED_PASSWORD || 'desk-local'
const name = process.env.SEED_NAME || 'Alexander'

const payload = await getPayload({ config })
const existing = await payload.find({
  collection: 'users',
  limit: 1,
  overrideAccess: true,
})

if (existing.totalDocs > 0) {
  process.stdout.write(`already have ${existing.totalDocs} user(s)\n`)
  process.exit(0)
}

await payload.create({
  collection: 'users',
  data: { email, password, name },
  overrideAccess: true,
})

process.stdout.write(`created ${email} / ${password}\n`)
process.exit(0)
