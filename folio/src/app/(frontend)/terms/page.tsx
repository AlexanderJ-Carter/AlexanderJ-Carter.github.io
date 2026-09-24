import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '服务条款',
  description: '使用本 Folio 站点时的基本约定。',
}

export default function TermsPage() {
  const { siteUrl } = getInstance()
  const host = siteUrl.replace(/^https?:\/\//, '')

  return (
    <PageChrome
      mark="Legal"
      title="服务条款"
      narrow
      description={
        <>
          适用于本 Folio 实例。另见
          <Link className="mx-1 underline underline-offset-4" href="/privacy">
            隐私政策
          </Link>
          。
        </>
      }
    >
      <div className="container max-w-3xl">
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>1. 接受条款</h2>
            <p>
              访问 <code>{host}</code> 即表示你理解本站为个人作品与写作展示，并同意本条款。若不同意，请停止使用。
            </p>
          </section>

          <section>
            <h2>2. 用途</h2>
            <ul>
              <li>展示摄影、写作与个人项目</li>
              <li>提供公开安全披露入口与联系方式</li>
              <li>维护者使用后台管理系统内容（不对访客开放注册）</li>
            </ul>
          </section>

          <section>
            <h2>3. 行为约定</h2>
            <ul>
              <li>不尝试破坏站点可用性或安全机制</li>
              <li>不滥用表单、接口或自动化抓取造成异常负载</li>
              <li>尊重文案、摄影与代码的许可声明</li>
            </ul>
          </section>

          <section>
            <h2>4. 内容与免责</h2>
            <p>
              站点按「现状」提供。文章与工具说明可能过时；作者不对完整性、可用性作保证。外链第三方服务适用其各自条款。
            </p>
          </section>
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
