import type { Metadata } from 'next'
import Link from 'next/link'

import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '隐私政策',
  description: 'Folio 站点如何处理有限访客数据与 Cookie。',
}

export default function PrivacyPage() {
  const { siteUrl } = getInstance()
  const host = siteUrl.replace(/^https?:\/\//, '')

  return (
    <article className="pt-28 pb-24">
      <div className="container max-w-3xl">
        <p className="folio-mark mb-3">Legal</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">隐私政策</h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          适用于 <code>{host}</code> 上的 Folio 实例。相关页面：
          <Link className="underline underline-offset-4 mx-1" href="/terms">
            服务条款
          </Link>
          ·
          <Link className="underline underline-offset-4 mx-1" href="/security/policy">
            安全政策
          </Link>
          。
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>1. 我们处理的信息</h2>
            <p>本站前台无需注册。为提供页面、安全与留言功能，可能处理：</p>
            <ul>
              <li>
                <strong>请求与安全日志</strong>：CDN / 反代可能记录 IP、UA、路径与时间；人机验证可使用
                Cloudflare Turnstile。
              </li>
              <li>
                <strong>访客验证 Cookie</strong>：通过 Gate 后写入 <code>folio_verify</code>
                ，用于放行配置为受保护的路径（默认含关于/联系）。
              </li>
              <li>
                <strong>主题偏好</strong>：深浅色等保存在浏览器本地存储。
              </li>
              <li>
                <strong>联系表单</strong>：提交到本站 Payload 表单后端，用于回复。
              </li>
              <li>
                <strong>访问量近似统计</strong>：页面/文章累计浏览字段，不含广告画像。
              </li>
            </ul>
          </section>

          <section>
            <h2>2. 管理员身份</h2>
            <p>
              <code>/admin</code> 仅维护者使用，可经 OIDC（如 Pocket ID）登录。管理员会话与访客 Cookie
              分离。
            </p>
          </section>

          <section>
            <h2>3. 联系</h2>
            <p>
              隐私相关询问可通过{' '}
              <Link className="underline underline-offset-4" href="/contact">
                联系页
              </Link>{' '}
              或 security.txt 中的邮箱。
            </p>
          </section>
        </div>

        <p className="mt-12">
          <Link href="/" className="underline underline-offset-4 text-sm text-muted-foreground">
            ← 返回首页
          </Link>
        </p>
      </div>
    </article>
  )
}
