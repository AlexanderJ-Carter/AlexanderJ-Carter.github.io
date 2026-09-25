# Folio production image. Build on the x86_64 server.
FROM node:22.17.0-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable \
  && corepack prepare pnpm@10.15.0 --activate \
  && pnpm i --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PAYLOAD_SECRET=build-time-placeholder-change-me
ENV DATABASE_URL=file:/app/data/folio.db
# NEXT_PUBLIC_* must be present at build time for the admin client bundle.
ARG NEXT_PUBLIC_SERVER_URL=http://127.0.0.1:3000
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_SITE_NAME=Folio
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_SITE_MARK=FO
ENV NEXT_PUBLIC_SITE_MARK=$NEXT_PUBLIC_SITE_MARK
ARG NEXT_PUBLIC_OIDC_LOGIN_URL=/api/oidc/login
ENV NEXT_PUBLIC_OIDC_LOGIN_URL=$NEXT_PUBLIC_OIDC_LOGIN_URL
ARG NEXT_PUBLIC_OIDC_DISPLAY_HOST=
ENV NEXT_PUBLIC_OIDC_DISPLAY_HOST=$NEXT_PUBLIC_OIDC_DISPLAY_HOST
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
RUN mkdir -p /app/data /app/public/media \
  && if [ -f /app/seed-data/folio.db ]; then cp /app/seed-data/folio.db /app/data/folio.db; fi \
  && corepack enable \
  && corepack prepare pnpm@10.15.0 --activate \
  && pnpm run build

# Separate layer: pnpm-hoisted native SQLite drivers for the standalone runner.
RUN node <<'NODE'
const fs = require('fs')
const path = require('path')

const out = '/app/native-mods'
fs.mkdirSync(out, { recursive: true })

function findPnpmPkg(pkgName) {
  const pnpm = path.join(process.cwd(), 'node_modules/.pnpm')
  const key = pkgName.startsWith('@') ? pkgName.replace('/', '+') : pkgName
  const dirs = fs.readdirSync(pnpm).filter((d) => d.startsWith(`${key}@`))
  if (!dirs.length) throw new Error(`no .pnpm entry for ${pkgName}`)
  dirs.sort()
  const dir = dirs[dirs.length - 1]
  const pkgPath = path.join(pnpm, dir, 'node_modules', ...pkgName.split('/'))
  if (!fs.existsSync(pkgPath)) throw new Error(`missing package dir ${pkgPath}`)
  return pkgPath
}

function copyPkg(pkgName) {
  const src = findPnpmPkg(pkgName)
  const dest = path.join(out, ...pkgName.split('/'))
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.cpSync(src, dest, { recursive: true, dereference: true })
  console.log('native', pkgName, '←', src)
}

const required = ['libsql', '@neon-rs/load', 'detect-libc', 'js-base64', 'promise-limit']
const optional = [
  '@libsql/client',
  '@libsql/core',
  '@libsql/hrana-client',
  '@libsql/isomorphic-fetch',
  '@libsql/isomorphic-ws',
  '@libsql/linux-x64-musl',
  '@libsql/linux-x64-gnu',
  '@libsql/linux-arm64-musl',
  '@libsql/linux-arm64-gnu',
]

for (const name of required) copyPkg(name)
for (const name of optional) {
  try {
    copyPkg(name)
  } catch (e) {
    console.warn('optional skip', name, e.message)
  }
}
NODE

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN apk add --no-cache su-exec \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p /app/data /app/public/media /app/instance \
  && chown -R nextjs:nodejs /app

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/native-mods/ ./node_modules/
COPY --from=builder --chown=nextjs:nodejs /app/instance ./instance
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server.js"]
