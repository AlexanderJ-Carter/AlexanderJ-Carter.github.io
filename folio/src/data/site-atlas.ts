import type { AtlasZone } from '@/components/NetworkAtlas'
import { getFeatures } from '@/instance'

/** 站群地图分区：与页脚导航同源叙事（看 / 用 / 识） */
export function getAtlasZones(): AtlasZone[] {
  const features = getFeatures()
  const useNodes = [
    { href: '/tools', label: '工具', note: '时间 · 换算 · QR · 助手' },
    ...(features.fun
      ? [{ href: '/fun', label: '玩乐', note: '一帧 · 曝光 · 电台 · 节奏' }]
      : []),
    { href: '/agents', label: 'Agent', note: '问站 · MCP · Skills' },
    { href: '/projects', label: '项目', note: '生活向构建' },
  ]
  const knowNodes = [
    { href: '/about', label: '关于', note: '门禁履历' },
    { href: '/contact', label: '联系', note: '门禁留言' },
    ...(features.subscribe
      ? [{ href: '/subscribe', label: '订阅', note: '低频通讯' }]
      : []),
    { href: '/updates', label: '更新', note: '近况与沿革' },
    { href: '/status', label: '状态', note: '公开探活' },
  ]

  return [
    {
      id: 'see',
      title: '看',
      mark: 'N·01',
      blurb: '影像与文字',
      nodes: [
        { href: '/gallery', label: '画廊', note: '影像联系单' },
        { href: '/posts', label: '写作', note: '精选短文' },
        { href: '/research', label: '研究', note: '公开论文' },
      ],
    },
    {
      id: 'use',
      title: '用',
      mark: 'N·02',
      blurb: '工具与玩乐',
      nodes: useNodes,
    },
    {
      id: 'know',
      title: '识',
      mark: 'N·03',
      blurb: '身份与往来',
      nodes: knowNodes,
    },
  ]
}
