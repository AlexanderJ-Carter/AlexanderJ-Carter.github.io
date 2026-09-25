import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '服务条款',
  description: '使用本站时的基本约定。',
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
          适用于本站实例。另见
          <Link className="mx-1 underline underline-offset-4" href="/privacy">
            隐私政策
          </Link>
          ·
          <Link className="mx-1 underline underline-offset-4" href="/security/policy">
            安全政策
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
              访问 <code>{host}</code>{' '}
              即表示你理解本站为个人作品、写作与研究入口展示，并同意本条款与隐私政策。若不同意，请停止使用。
            </p>
          </section>

          <section>
            <h2>2. 用途</h2>
            <ul>
              <li>展示摄影、写作、工具与个人项目</li>
              <li>公开研究论文与安全披露入口</li>
              <li>经门禁后的关于 / 联系（防滥用）</li>
              <li>可选邮件订阅（可退订）</li>
              <li>维护者使用后台管理系统内容（不对访客开放注册）</li>
            </ul>
          </section>

          <section>
            <h2>3. 行为约定</h2>
            <ul>
              <li>不尝试破坏站点可用性、绕过访客门禁或安全机制</li>
              <li>不滥用表单、订阅、接口或自动化抓取造成异常负载</li>
              <li>尊重文案、摄影与代码的许可声明；外链第三方适用其各自条款</li>
            </ul>
          </section>

          <section>
            <h2>4. 内容与免责</h2>
            <p>
              站点按「现状」提供。文章、工具说明与研究链接可能过时；作者不对完整性、可用性作保证。研究观点不代表所属机构立场。
            </p>
          </section>

          <section>
            <h2>5. 变更</h2>
            <p>条款可能随功能调整更新；重大变更会尽量在隐私政策中注明日期。</p>
          </section>

          <section id="license">
            <h2>6. 版权与许可</h2>
            <ul>
              <li>
                <strong>源代码</strong>（本仓库程序与配置）：
                <a
                  href="https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/blob/main/LICENSE"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  BSD 3-Clause
                </a>
                。
              </li>
              <li>
                <strong>站点内容</strong>（文案、摄影与其它原创媒体，另有标注除外）：
                <a
                  href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  CC BY-NC-ND 4.0
                </a>
                — 可署名非商业分享，不可改编或商用；超出范围需事先书面许可。详见仓库{' '}
                <a
                  href="https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/blob/main/NOTICE"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  NOTICE
                </a>
                。
              </li>
              <li>
                第三方资源与商标归各自权利人；提及仅供识别，不代表背书。
              </li>
            </ul>
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
