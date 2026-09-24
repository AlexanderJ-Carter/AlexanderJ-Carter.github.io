import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Alexander Carter · 工作台</h4>
      </Banner>
      <ul className={`${baseClass}__instructions`}>
        <li>
          优先在仓库根执行{' '}
          <code>npm run folio:migrate</code>
          {'，把静态站页面与写作迁入，然后 '}
          <a href="/" target="_blank">
            打开前台
          </a>
          {' 查看。'}
        </li>
        <li>
          若只要英文演示数据，可用 <SeedButton />。
        </li>
        <li>在「页面 / 文章 / 媒体」里改标题、正文和图。改完立刻能读，不用重新构建。</li>
        <li>
          外链服务继续独立跑：MyCook、Gitea、IT-Tools、Pocket ID。这里只做入口，不把它们搬进来。
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
