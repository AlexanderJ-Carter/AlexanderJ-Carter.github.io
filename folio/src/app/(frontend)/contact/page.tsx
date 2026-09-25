import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { FormBlock } from '@/blocks/Form/Component'
import { PageChrome } from '@/components/PageChrome'
import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '联系',
  description: '合作、反馈或打个招呼都可以。',
  robots: { index: false, follow: false },
}

export default async function ContactPage() {
  const instance = getInstance()
  const email = instance.contact?.email || instance.security.contactEmail
  const securityEmail = instance.security.contactEmail
  const location = instance.contact?.location || '—'
  const github = instance.elsewhere.find((e) => /github/i.test(e.name) || /github\.com/i.test(e.href))

  const payload = await getPayload({ config: configPromise })
  const forms = await payload.find({
    collection: 'forms',
    where: {
      or: [{ title: { equals: 'Contact Form' } }, { title: { equals: '联系表单' } }],
    },
    limit: 1,
    depth: 2,
  })
  const formDoc = forms.docs[0]

  return (
    <PageChrome
      mark="联系"
      kicker="留言"
      title="联系"
      description="合作、反馈或打个招呼都可以。公开邮箱见左侧；安全问题请单独写信。"
    >
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="folio-mark mb-4">方式</p>
          <dl className="divide-y divide-border border-y border-border">
            <div className="grid gap-1 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
              <dt className="text-sm font-medium">一般</dt>
              <dd>
                <a className="underline underline-offset-4" href={`mailto:${email}`}>
                  {email}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">合作、站务、普通留言</p>
              </dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
              <dt className="text-sm font-medium">安全</dt>
              <dd>
                <a className="underline underline-offset-4" href={`mailto:${securityEmail}`}>
                  {securityEmail}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">
                  漏洞披露 ·{' '}
                  <a className="underline underline-offset-2" href="/.well-known/security.txt">
                    security.txt
                  </a>
                  ·{' '}
                  <Link className="underline underline-offset-2" href="/security/pgp-key.asc">
                    PGP
                  </Link>
                </p>
              </dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
              <dt className="text-sm font-medium">地点</dt>
              <dd className="text-muted-foreground">{location}</dd>
            </div>
            {github ? (
              <div className="grid gap-1 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                <dt className="text-sm font-medium">GitHub</dt>
                <dd>
                  <a
                    className="underline underline-offset-4"
                    href={github.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {github.host || github.name}
                  </a>
                </dd>
              </div>
            ) : null}
            <div className="grid gap-1 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
              <dt className="text-sm font-medium">研究</dt>
              <dd>
                <Link className="underline underline-offset-4" href="/research">
                  公开论文与项目 →
                </Link>
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            本页需访客验证。域名邮箱经 Cloudflare Email Routing 转发；请勿使用未公开的本地部分试探。
          </p>
        </div>

        <div className="lg:col-span-7">
          <p className="folio-mark mb-4">留言</p>
          <h2 className="mb-6 text-xl font-semibold tracking-tight">发一封短讯</h2>
          {formDoc ? (
            <FormBlock bare enableIntro={false} form={formDoc as unknown as FormType} />
          ) : (
            <div className="rounded-sm border border-border/80 bg-muted/30 px-5 py-8">
              <p className="text-sm leading-relaxed text-foreground/85">
                表单暂时歇着。直接写信也行：
              </p>
              <a
                className="mt-4 inline-flex text-sm font-medium underline underline-offset-4 hover:text-primary"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </PageChrome>
  )
}
