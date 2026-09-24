import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const email = process.env.SEED_EMAIL || 'admin@alexander.xin'
const password = process.env.SEED_PASSWORD || 'Folio-ChangeMe-2026!'
const name = process.env.SEED_NAME || 'Alexander'

const payload = await getPayload({ config })
const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
  overrideAccess: true,
})

if (existing.docs[0]) {
  await payload.update({
    collection: 'users',
    id: existing.docs[0].id,
    data: { password, name },
    overrideAccess: true,
  })
  process.stdout.write(`updated ${email}\n`)
} else {
  await payload.create({
    collection: 'users',
    data: { email, password, name },
    overrideAccess: true,
  })
  process.stdout.write(`created ${email}\n`)
}
process.exit(0)
