import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { getFeatures, getInstance, getVisibleElsewhere } from '@/instance'

export const metadata: Metadata = {
  title: 'Agent 与身份',
  description: 'Pocket ID 站群联邦登录、问站、暗房助手与 MCP 入口说明。',
}

export default function AgentsPage() {
  const features = getFeatures()
  const instance = getInstance()
  const idHost = instance.oidcDisplayHost || 'id.alexander.xin'
  const products = getVisibleElsewhere().filter((e) => e.kind === 'product' || e.kind === 'tool')
  const loginUrl = `/api/oidc/login?next=${encodeURIComponent('/tools?t=ai')}`

  return (
    <PageChrome
      mark="Agents"
      title="Agent 与身份"
      description="站群用 Pocket ID 做联邦登录；模型流量仍经各站代理 OmniRoute，不公网裸开。"
      related={[
        { href: '/tools?t=ai', label: '暗房助手 →' },
        { href: '/status', label: '服务状态 →' },
        ...(features.network ? [{ href: '/network', label: '站群地图 →' }] : []),
      ]}
    >
      <div className="container max-w-3xl space-y-12">
        <section aria-labelledby="pocket-heading">
          <h2 id="pocket-heading" className="mb-3 text-xl font-semibold tracking-tight">
            Pocket ID（联邦认证）
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            IdP：<code>{idHost}</code>。Folio 后台、MyCook MCP、Flight Log（若开启）共用同一套
            OIDC，不是互相发账号密码。
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Folio 管理：
              <Link href="/api/oidc/login?next=%2Fadmin" className="mx-1 underline underline-offset-4">
                Pocket ID 登录后台
              </Link>
            </li>
            <li>
              暗房助手：已登录会话可跳过 Turnstile，并提高小时限额；
              <Link href={loginUrl} className="mx-1 underline underline-offset-4">
                登录后回助手
              </Link>
            </li>
            <li>访客仍可用问站与暗房助手（匿名限流 + Turnstile），无需登录。</li>
          </ul>
        </section>

        <section aria-labelledby="folio-agents">
          <h2 id="folio-agents" className="mb-3 text-xl font-semibold tracking-tight">
            Folio 公开面
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">问站</strong>：右下角；
              <code className="mx-1">POST /api/ask</code>
              。匿名约 20/h；Pocket ID 会话约 80/h。
            </li>
            <li>
              <strong className="text-foreground">暗房助手</strong>：
              <Link href="/tools?t=ai" className="underline underline-offset-4">
                /tools#ai
              </Link>
              ；匿名需 Turnstile（约 10/h），登录后约 60/h。
            </li>
            <li>
              机器可读：
              <Link href="/agents.json" className="mx-1 underline underline-offset-4">
                /agents.json
              </Link>
              ·
              <Link href="/api/status" className="mx-1 underline underline-offset-4">
                /api/status
              </Link>
            </li>
          </ul>
        </section>

        <section aria-labelledby="cook-agents">
          <h2 id="cook-agents" className="mb-3 text-xl font-semibold tracking-tight">
            MyCook
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">
            厨助手公开可用；远程 MCP（<code>cook-mcp</code>）走 Pocket ID JWT 或 API
            key，与 Folio 同一 IdP 叙事。
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {products
              .filter((p) => /cook|mycook/i.test(p.name) || /cook/i.test(p.host))
              .map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4"
                  >
                    {p.name}
                  </a>
                  {p.desc ? ` — ${p.desc}` : ''}
                </li>
              ))}
          </ul>
        </section>

        <section aria-labelledby="flight-agents">
          <h2 id="flight-agents" className="mb-3 text-xl font-semibold tracking-tight">
            Flight Log
          </h2>
          <p className="text-sm text-muted-foreground">
            生产可开 Pocket ID OIDC 全站门禁。LLM 只服务录入辅助；stdio MCP
            仅本地，不进公网镜像。
          </p>
          {products
            .filter((p) => /flight/i.test(p.name) || /flight/i.test(p.host))
            .map((p) => (
              <p key={p.href} className="mt-3 text-sm">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {p.name} →
                </a>
              </p>
            ))}
        </section>

        <p className="text-xs text-muted-foreground">
          仓库 <code>gateway/</code> 是 GitHub Pages 名片，与 Pocket ID / OmniRoute 无关。OmniRoute
          只在内网供 Folio / MyCook 代理模型调用。
        </p>
      </div>
    </PageChrome>
  )
}
