import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { DashboardInsights } from '@/components/admin/DashboardInsights'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>{process.env.NEXT_PUBLIC_SITE_NAME || 'Folio'} · 工作台</h4>
      </Banner>

      <DashboardInsights />

      <div className={`${baseClass}__grid`}>
        <section>
          <h5>日常改稿</h5>
          <ul>
            <li>
              <a href="/admin/collections/pages">页面</a> — 首页 / 关于 / 联系
            </li>
            <li>
              <a href="/admin/collections/posts">文章</a> — 写作（暂缓公开时可只存草稿）
            </li>
            <li>
              <a href="/admin/collections/media">媒体</a> — 图库与封面
            </li>
            <li>
              <a href="/admin/globals/announcement">站点公告</a> — 顶栏横幅
            </li>
          </ul>
        </section>
        <section>
          <h5>站点结构</h5>
          <ul>
            <li>
              <a href="/admin/globals/header">页头</a> — 顶栏导航（含项目等）
            </li>
            <li>
              <a href="/admin/globals/footer">页脚</a> — 页脚链接
            </li>
            <li>
              <a href="/admin/collections/redirects">重定向</a> — 路径级旧链 → 新址
            </li>
            <li>
              代码页：
              <a href="/projects" target="_blank" rel="noreferrer">
                /projects
              </a>
              ·
              <a href="/subscribe" target="_blank" rel="noreferrer">
                /subscribe
              </a>
              ·
              <a href="/gallery" target="_blank" rel="noreferrer">
                /gallery
              </a>
              ·
              <a href="/tools" target="_blank" rel="noreferrer">
                /tools
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h5>运营与邮件</h5>
          <ul>
            <li>
              <a href="/admin/collections/forms">表单</a> — Contact Form 字段与通知邮件
            </li>
            <li>
              <a href="/admin/collections/form-submissions">表单提交</a> — 访客留言入库
            </li>
            <li>
              Resend：实例 <code>.env.production</code> 配好后，宿主机跑{' '}
              <code>pnpm configure:contact-form</code>
            </li>
            <li>
              订阅名单：前台 <code>/subscribe</code> → Resend Contacts；退订{' '}
              <code>/unsubscribe</code>。看名单请打开{' '}
              <a href="https://resend.com/contacts" target="_blank" rel="noreferrer">
                Resend Contacts
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h5>主题与预览</h5>
          <ul>
            <li>右上角切换后台深色 / 浅色。</li>
            <li>编辑页「预览」打开前台草稿；顶栏可退出预览。</li>
            <li>
              <a href="/" target="_blank" rel="noreferrer">
                打开前台
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default BeforeDashboard
