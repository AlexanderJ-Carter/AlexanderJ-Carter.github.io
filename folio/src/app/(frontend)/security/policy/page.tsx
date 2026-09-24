import type { Metadata } from 'next'
import Link from 'next/link'

import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '安全政策',
  description: '网站安全漏洞披露政策和报告指南',
}

export default function SecurityPolicyPage() {
  const { security, siteName } = getInstance()

  return (
    <article className="pt-28 pb-24">
      <div className="container max-w-3xl">
        <p className="folio-mark mb-3">Security</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">安全政策</h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          我们重视网站安全，欢迎安全研究者负责任地报告发现的安全漏洞。适用范围与联系方式由实例配置提供（
          {siteName}）。
        </p>

        <section className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <div>
            <h2>政策概述</h2>
            <p>
              如果您发现安全漏洞，请通过负责任的方式披露，以便我们及时修复。我们承诺：认真对待每一份报告、及时确认回复、保护报告者身份，并在修复后公开致谢（如您同意）。
            </p>
          </div>
          <div>
            <h2>适用范围</h2>
            <ul>
              {security.domains.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p>不包括第三方服务、社交媒体与我们无法直接控制的外部链接。</p>
          </div>
          <div>
            <h2>报告指南</h2>
            <p>
              请尽量包含：漏洞类型与严重程度、受影响 URL、复现步骤、影响说明，以及请求/响应或截图等技术细节。
            </p>
          </div>
          <div>
            <h2>联系</h2>
            <p>
              <a href={`mailto:${security.contactEmail}`}>{security.contactEmail}</a>
              。亦可参阅{' '}
              <a href="/.well-known/security.txt">security.txt</a>。
            </p>
          </div>
        </section>

        <p className="mt-12">
          <Link href="/" className="underline underline-offset-4 text-sm text-muted-foreground">
            ← 返回首页
          </Link>
        </p>
      </div>
    </article>
  )
}
