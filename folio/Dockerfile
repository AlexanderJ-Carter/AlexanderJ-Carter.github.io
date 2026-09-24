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
ARG NEXT_PUBLIC_SERVER_URL=https://www.alexander.xin
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_OIDC_LOGIN_URL=/api/oidc/login
ENV NEXT_PUBLIC_OIDC_LOGIN_URL=$NEXT_PUBLIC_OIDC_LOGIN_URL
RUN mkdir -p /app/data /app/public/media \
  && if [ -f /app/seed-data/folio.db ]; then cp /app/seed-data/folio.db /app/data/folio.db; fi \
  && corepack enable \
  && corepack prepare pnpm@10.15.0 --activate \
  && pnpm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p /app/data /app/public/media \
  && chown -R nextjs:nodejs /app

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
