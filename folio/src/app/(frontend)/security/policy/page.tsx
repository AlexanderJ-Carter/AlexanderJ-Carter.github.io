import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '安全政策',
  description: '网站安全漏洞披露政策和报告指南',
}

export default function SecurityPolicyPage() {
  return (
    <article className="pt-28 pb-24">
      <div className="container max-w-3xl">
        <p className="folio-mark mb-3">Security</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">安全政策</h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          我们重视网站安全，欢迎安全研究者负责任地报告发现的安全漏洞。最后更新：2026年9月24日。
        </p>

        <section className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <div>
            <h2>政策概述</h2>
            <p>
              如果您发现安全漏洞，请通过负责任的方式披露，以便我们及时修复。我们承诺：认真对待每一份报告、24
              小时内确认回复、保护报告者身份，并在修复后公开致谢（如您同意）。
            </p>
          </div>
          <div>
            <h2>适用范围</h2>
            <ul>
              <li>主域名：alexander.xin</li>
              <li>子域名：*.alexander.xin</li>
              <li>GitHub Pages：alexanderj-carter.github.io</li>
            </ul>
            <p>不包括第三方服务、社交媒体与我们无法直接控制的外部链接。</p>
          </div>
          <div>
            <h2>报告指南</h2>
            <p>请尽量包含：漏洞类型与严重程度、受影响 URL、复现步骤、影响说明，以及请求/响应或截图等技术细节。</p>
          </div>
          <div>
            <h2>处理流程</h2>
            <ol>
              <li>报告接收：24 小时内确认</li>
              <li>初步评估：3–5 天内分析</li>
              <li>漏洞修复：按严重程度排期</li>
              <li>公开致谢：修复后更新致谢页</li>
            </ol>
          </div>
          <div>
            <h2>测试限制</h2>
            <p>允许合理频率的扫描与手动测试。禁止 DoS/DDoS、访问或修改他人数据、恶意破坏，以及公开未修复漏洞。</p>
          </div>
          <div>
            <h2>联系方式</h2>
            <p>
              邮箱：
              <a href="mailto:contact-us@alexander.xin">contact-us@alexander.xin</a>
              <br />
              PGP：
              <Link href="/security/pgp-key.asc">下载公钥</Link>
            </p>
          </div>
        </section>

        <p className="mt-12 text-sm text-muted-foreground">
          <Link href="/security/acknowledgments" className="underline underline-offset-4">
            安全致谢
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
