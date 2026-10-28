'use client'

/**
 * 问站与 layout 同包加载。
 * 勿用 next/dynamic({ ssr:false })：独立 async chunk 若未随 standalone 完整同步会 404，FAB 永久不挂载，
 * 页脚「问站」只派发事件却无人监听。
 */
export { SiteAssistant as SiteAssistantLazy } from './index'
