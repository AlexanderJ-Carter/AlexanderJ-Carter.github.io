import { existsSync, readFileSync } from 'fs'
import path from 'path'

import { defaultInstance } from './defaults'
import type { FolioInstance } from './types'

function deepMerge<T extends Record<string, unknown>>(base: T, overlay: Partial<T>): T {
  const out: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    if (value === undefined) continue
    const prev = out[key]
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      prev &&
      typeof prev === 'object' &&
      !Array.isArray(prev)
    ) {
      out[key] = deepMerge(prev as Record<string, unknown>, value as Record<string, unknown>)
    } else {
      out[key] = value
    }
  }
  return out as T
}

function candidatePaths(): string[] {
  const cwd = process.cwd()
  const fromEnv = process.env.FOLIO_INSTANCE_CONFIG?.trim()
  return [
    fromEnv,
    path.join(cwd, 'instance', 'config.json'),
    path.join(cwd, '..', 'instance', 'config.json'),
  ].filter((p): p is string => Boolean(p))
}

let cached: FolioInstance | null = null

/** 读取实例配置：仓库只有 example；真实文件在服务器 instance/config.json（不入库）。 */
export function getInstance(): FolioInstance {
  if (cached) return cached

  let overlay: Partial<FolioInstance> = {}
  for (const file of candidatePaths()) {
    if (!existsSync(file)) continue
    try {
      overlay = JSON.parse(readFileSync(file, 'utf8')) as Partial<FolioInstance>
      break
    } catch (err) {
      console.error('[folio/instance] failed to parse', file, err)
    }
  }

  const merged = deepMerge(
    defaultInstance as unknown as Record<string, unknown>,
    overlay as unknown as Record<string, unknown>,
  ) as unknown as FolioInstance

  // 环境变量可覆盖关键公网项（CI / 容器）
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '')
  if (siteUrl) merged.siteUrl = siteUrl
  if (process.env.NEXT_PUBLIC_SITE_NAME?.trim()) {
    merged.siteName = process.env.NEXT_PUBLIC_SITE_NAME.trim()
  }

  cached = merged
  return cached
}

export function publicOriginFromInstance(): string {
  const url = getInstance().siteUrl.replace(/\/$/, '')
  if (url && !/0\.0\.0\.0|127\.0\.0\.1|localhost/i.test(url)) return url
  return defaultInstance.siteUrl
}
