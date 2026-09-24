import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { DashboardInsights } from '@/components/admin/DashboardInsights'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Alexander Carter · Folio 工作台</h4>
      </Banner>

      <DashboardInsights />

      <div className={`${baseClass}__grid`}>
        <section>
          <h5>日常改稿</h5>
          <ul>
            <li>
              <a href="/admin/collections/pages">页面</a> — 首页 / 关于 / 联系；侧栏可改自定义地址
            </li>
            <li>
              <a href="/admin/collections/posts">文章</a> — 写作区，支持预览与访问量
            </li>
            <li>
              <a href="/admin/collections/media">媒体</a> — 上传图片后挂到页面或文章
            </li>
          </ul>
        </section>
        <section>
          <h5>站点结构</h5>
          <ul>
            <li>
              <a href="/admin/globals/header">页头</a> — 顶栏导航
            </li>
            <li>
              <a href="/admin/globals/footer">页脚</a> — 页脚链接
            </li>
            <li>
              <a href="/admin/collections/redirects">重定向</a> — 旧 URL → 新自定义地址
            </li>
          </ul>
        </section>
        <section>
          <h5>运营</h5>
          <ul>
            <li>
              <a href="/admin/collections/forms">表单</a> — 联系表单字段
            </li>
            <li>
              <a href="/admin/collections/form-submissions">表单提交</a> — 访客留言
            </li>
            <li>
              画廊 / 玩乐是代码页（
              <a href="/gallery" target="_blank" rel="noreferrer">
                /gallery
              </a>
              、
              <a href="/fun" target="_blank" rel="noreferrer">
                /fun
              </a>
              ）
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
