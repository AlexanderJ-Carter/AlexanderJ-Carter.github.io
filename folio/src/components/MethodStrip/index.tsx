import React from 'react'

/** 暗房三法则 — 纯展示，不进 CMS block schema */
export function MethodStrip() {
  const items = [
    {
      title: 'Expose · 曝光',
      body: '只放真实可访问的内容与链接；坏链不进索引。',
    },
    {
      title: 'Focus · 对焦',
      body: '一页一件事。导航分组，正文不堆看板。',
    },
    {
      title: 'Print · 冲印',
      body: '改完就能读；隐私默认，键盘可达。',
    },
  ]

  return (
    <section className="container py-2" aria-labelledby="method-heading">
      <div className="mb-6 max-w-2xl">
        <p className="folio-mark mb-2">Method</p>
        <h2 id="method-heading" className="text-2xl md:text-3xl tracking-tight font-semibold">
          暗房三法则
        </h2>
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          站点如何取舍的工作隐喻——曝光、对焦、冲印。
        </p>
      </div>
      <ul className="principle-grid list-none p-0 m-0">
        {items.map((item) => (
          <li key={item.title} className="principle-item">
            <p className="principle-item__title">{item.title}</p>
            <p className="principle-item__body">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
