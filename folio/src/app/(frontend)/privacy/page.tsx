import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { CookiePrefsButton } from '@/components/CookieConsent'
import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '隐私政策',
  description: '本站如何处理访客数据、Cookie 与可选统计。',
}

export default function PrivacyPage() {
  const { siteUrl, security, contact } = getInstance()
  const host = siteUrl.replace(/^https?:\/\//, '')
  const mail = contact?.email || security.contactEmail

  return (
    <PageChrome
      mark="Legal"
      title="隐私政策"
      narrow
      description={
        <>
          适用于 <code>{host}</code>。相关页面：
          <Link className="mx-1 underline underline-offset-4" href="/terms">
            服务条款
          </Link>
          ·
          <Link className="mx-1 underline underline-offset-4" href="/security/policy">
            安全政策
          </Link>
          ·
          <Link className="mx-1 underline underline-offset-4" href="/privacy#cookies">
            Cookie
          </Link>
          。
        </>
      }
    >
      <div className="container max-w-3xl">
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>1. 我们处理的信息</h2>
            <p>本站前台无需注册。为提供页面、安全与留言功能，可能处理：</p>
            <ul>
              <li>
                <strong>请求与安全日志</strong>：CDN / 反代可能记录 IP、UA、路径与时间；人机验证使用
                Cloudflare Turnstile。
              </li>
              <li>
                <strong>联系表单</strong>：姓名、邮箱与正文提交到本站表单后端，用于回复。
              </li>
              <li>
                <strong>邮件订阅</strong>：若使用订阅页，邮箱会进入 Resend Contacts /
                Segment，用于通讯；可随时在退订页取消。
              </li>
              <li>
                <strong>可选浏览统计</strong>：仅在你同意「统计」后，本站会累计页面/文章浏览次数，并可能加载
                Cloudflare Web Analytics 信标（隐私友好、不做广告画像）。
              </li>
              <li>
                <strong>可选赞助位</strong>：若启用 EthicalAds，仅展示面向开发者的文字赞助；未配置时不出现任何广告位。
              </li>
            </ul>
          </section>

          <section id="cookies">
            <h2>2. Cookie 与本地存储</h2>
            <p>
              首次访问可选择「仅必要」或「接受统计」。做出选择后不再显示角落提示；若要更改，使用下方按钮或页脚
              Cookie 链接回到此处。
            </p>
            <p className="not-prose my-4">
              <CookiePrefsButton className="inline-flex min-h-9 items-center rounded-sm border border-border px-3 text-sm transition-colors hover:border-foreground" />
            </p>
            <div className="not-prose overflow-x-auto rounded-sm border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">名称</th>
                    <th className="px-3 py-2 font-medium">类型</th>
                    <th className="px-3 py-2 font-medium">用途</th>
                    <th className="px-3 py-2 font-medium">期限</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2">
                      <code>folio_verify</code>
                    </td>
                    <td className="px-3 py-2">必要 Cookie</td>
                    <td className="px-3 py-2">放行门禁页（关于、联系）</td>
                    <td className="px-3 py-2">约 7 天</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2">
                      <code>payload-token</code> 等
                    </td>
                    <td className="px-3 py-2">必要 Cookie</td>
                    <td className="px-3 py-2">仅管理员登录后台</td>
                    <td className="px-3 py-2">约 24 小时</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2">主题偏好</td>
                    <td className="px-3 py-2">必要 · localStorage</td>
                    <td className="px-3 py-2">深浅色外观</td>
                    <td className="px-3 py-2">直至清除</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2">
                      <code>folio_consent</code>
                    </td>
                    <td className="px-3 py-2">必要 · localStorage</td>
                    <td className="px-3 py-2">记住你的 Cookie / 统计选择</td>
                    <td className="px-3 py-2">直至清除</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2">Turnstile / CF 相关</td>
                    <td className="px-3 py-2">必要 / 安全</td>
                    <td className="px-3 py-2">人机验证与边缘安全（由 Cloudflare 处理）</td>
                    <td className="px-3 py-2">按其政策</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>3. 门禁页</h2>
            <p>
              <code>/about</code> 与 <code>/contact</code>{' '}
              默认需完成访客验证。履历类内容不对搜索引擎公开（
              <code>noindex</code>）。公开论文仍在 <code>/research</code>。
            </p>
          </section>

          <section>
            <h2>4. 第三方</h2>
            <ul>
              <li>
                <strong>Cloudflare</strong>：CDN、Turnstile；可选 Web Analytics（同意统计后）。
              </li>
              <li>
                <strong>Resend</strong>：事务邮件与订阅联系人（若已启用）。
              </li>
              <li>
                <strong>EthicalAds</strong>（可选）：开发者向文字赞助；未配置则不加载。
              </li>
              <li>
                <strong>OIDC 身份提供方</strong>：仅管理员登录（如 Pocket ID）。
              </li>
            </ul>
            <p>不嵌入广告网络，不做跨站广告画像。</p>
          </section>

          <section>
            <h2>5. 管理员身份</h2>
            <p>
              <code>/admin</code> 仅维护者使用。管理员会话与访客 Cookie 分离。
            </p>
          </section>

          <section>
            <h2>6. 联系</h2>
            <p>
              隐私相关询问可通过{' '}
              <Link className="underline underline-offset-4" href="/contact">
                联系页
              </Link>
              {mail ? (
                <>
                  {' '}
                  或 <a href={`mailto:${mail}`}>{mail}</a>
                </>
              ) : null}
              ，亦可参考 security.txt。
            </p>
          </section>

          <p className="text-sm text-muted-foreground">最近更新：2026-09-25</p>
        </div>

        <p className="mt-12">
          <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4">
            ← 返回首页
          </Link>
        </p>
      </div>
    </PageChrome>
  )
}
