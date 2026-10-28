import { NextResponse } from 'next/server'

import { getInstance, getVisibleElsewhere, publicOriginFromInstance } from '@/instance'

export const revalidate = 3600

export function GET() {
  const instance = getInstance()
  const origin = publicOriginFromInstance()
  const elsewhere = getVisibleElsewhere()
  const cook = elsewhere.find((e) => /cook|mycook/i.test(e.name) || /cook/i.test(e.host))
  const flight = elsewhere.find((e) => /flight/i.test(e.name) || /flight/i.test(e.host))

  const body = {
    version: 1,
    site: instance.siteUrl,
    generatedFor: 'humans-and-agents',
    surfaces: [
      {
        id: 'folio-ask',
        name: '问站',
        kind: 'chat',
        url: `${origin}/`,
        api: `${origin}/api/ask`,
        auth: 'none',
        notes: 'Same-origin POST; rate-limited; public KB only.',
      },
      {
        id: 'folio-studio-assist',
        name: '暗房助手',
        kind: 'tool',
        url: `${origin}/tools?t=ai`,
        api: `${origin}/api/studio-assist`,
        auth: 'turnstile-or-pocket-id',
        notes: 'Photography exposure + caption; Pocket ID session skips Turnstile and raises limit.',
      },
      {
        id: 'pocket-id',
        name: 'Pocket ID',
        kind: 'idp',
        url: `https://${instance.oidcDisplayHost || 'id.alexander.xin'}`,
        auth: 'oidc',
        notes: 'Fleet IdP for Folio admin, MyCook MCP, FlightLog (optional).',
      },
      {
        id: 'folio-status',
        name: '公开状态',
        kind: 'status',
        url: `${origin}/status`,
        api: `${origin}/api/status`,
        auth: 'none',
      },
      ...(cook
        ? [
            {
              id: 'mycook',
              name: cook.name,
              kind: 'product' as const,
              url: cook.href,
              auth: 'varies',
              notes: 'Cook site + optional MCP at cook-mcp; see MyCook docs.',
            },
          ]
        : []),
      ...(flight
        ? [
            {
              id: 'flightlog',
              name: flight.name,
              kind: 'product' as const,
              url: flight.href,
              auth: 'oidc-optional',
              notes: 'Personal flight archive; local stdio MCP only.',
            },
          ]
        : []),
    ],
  }

  return NextResponse.json(body, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
