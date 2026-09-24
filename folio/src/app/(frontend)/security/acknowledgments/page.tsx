import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '安全致谢',
  description: '感谢为网站安全做出贡献的安全研究者',
}

export default function SecurityAcknowledgmentsPage() {
  return (
    <article className="pt-28 pb-24">
      <div className="container max-w-3xl">
        <p className="folio-mark mb-3">Security</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">安全致谢</h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          感谢负责任披露漏洞的研究者。最后更新：2026年9月24日。
        </p>

        <section className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <div>
            <h2>致谢说明</h2>
            <p>通过负责任的漏洞披露，你们帮助我们提升整体安全、保护用户数据，并完善响应流程。</p>
          </div>
          <div>
            <h2>安全报告</h2>
            <p>目前尚无公开致谢条目。每一份有效报告都会在此更新（经报告者同意）。</p>
          </div>
          <div>
            <h2>发现安全问题？</h2>
            <p>
              请发送至{' '}
              <a href="mailto:contact-us@alexander.xin">contact-us@alexander.xin</a>
              。敏感内容请使用{' '}
              <Link href="/security/pgp-key.asc">PGP 公钥</Link> 加密。我们承诺 24 小时内回复。
            </p>
          </div>
        </section>

        <p className="mt-12 text-sm text-muted-foreground">
          <Link href="/security/policy" className="underline underline-offset-4">
            安全政策
          </Link>
          {' · '}
          <Link href="/.well-known/security.txt" className="underline underline-offset-4">
            security.txt
          </Link>
        </p>
      </div>
    </article>
  )
}
