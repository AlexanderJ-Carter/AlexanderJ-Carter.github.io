import { getVisibleElsewhere, type InstanceElsewhere } from '@/instance'

export type FleetHint = {
  answer: string
  suggestions: { label: string; question: string }[]
  navigate?: { type: 'navigate'; path: string; label: string }
}

const ALIASES: { re: RegExp; hostPart: string }[] = [
  { re: /mycook|菜谱|做饭|cook(?!-mcp)/i, hostPart: 'cook' },
  { re: /flight\s*log|飞行记录|航班档案/i, hostPart: 'flight' },
  { re: /\bnetq\b|网络排查/i, hostPart: 'netq' },
  { re: /\byearly\b|一年一记/i, hostPart: 'yearly' },
  { re: /new\s*year|春节|农历新年/i, hostPart: 'newyear' },
  { re: /\blab\b|实验台|git.?workflow/i, hostPart: 'lab' },
  { re: /linux.?command|命令速查/i, hostPart: 'linux' },
  { re: /it-?tools/i, hostPart: 'tools.alexander' },
  { re: /\bgitea\b|自建.?git/i, hostPart: 'git.alexander' },
]

function matchItem(text: string, item: InstanceElsewhere): boolean {
  const lower = text.toLowerCase()
  if (lower.includes(item.host.toLowerCase())) return true
  if (lower.includes(item.name.toLowerCase())) return true
  return ALIASES.some(
    (a) => a.re.test(text) && item.host.toLowerCase().includes(a.hostPart.toLowerCase()),
  )
}

/** 站群产品/工具启发式：导到外链说明 + 站内 /network|/agents */
export function inferFleetHint(question: string): FleetHint | null {
  const text = question.trim()
  if (!text) return null

  if (/站群|地图|elsewhere|有哪些站|子域/i.test(text)) {
    return {
      answer: '站群分区总图在 /network（看 / 用 / 识 + 站外）。公开探活见 /status；Agent 入口见 /agents。',
      suggestions: [
        { label: '打开地图', question: '站群地图怎么看？' },
        { label: '服务状态', question: '现在各站通不通？' },
      ],
      navigate: { type: 'navigate', path: '/network', label: '去站群地图' },
    }
  }

  if (/agent|mcp|skills|厨助手|问站怎么用|给.?ai/i.test(text)) {
    return {
      answer:
        '本站问站在右下角；暗房助手在 /tools。MyCook 另有厨助手与可选 MCP；Flight Log 的 MCP 仅本地。总索引在 /agents。',
      suggestions: [
        { label: 'Agent 页', question: 'Agent 入口页有什么？' },
        { label: '暗房助手', question: '暗房助手怎么用？' },
      ],
      navigate: { type: 'navigate', path: '/agents', label: '打开 Agent 入口' },
    }
  }

  if (/状态|挂了|探活|uptime|health|通不通|监控/i.test(text)) {
    return {
      answer: '公开轻量探活在 /status。运维内网看板（Glance 等）不对外开放。',
      suggestions: [
        { label: '看状态', question: '服务状态页怎么打开？' },
        { label: '站群地图', question: '站群地图在哪？' },
      ],
      navigate: { type: 'navigate', path: '/status', label: '打开状态页' },
    }
  }

  if (/暗房助手|曝光建议|作品说明|studio.?assist/i.test(text)) {
    return {
      answer:
        '暗房助手在 /tools 的「暗房助手」分区：贴场景或参数，生成短曝光建议与说明（有限流与人机验证）。',
      suggestions: [
        { label: '去工具页', question: '实用工具页里有什么？' },
        { label: '玩乐区别', question: '玩乐页和工具页有什么区别？' },
      ],
      navigate: { type: 'navigate', path: '/tools', label: '去实用工具' },
    }
  }

  const items = getVisibleElsewhere()
  const hit = items.find((item) => matchItem(text, item))
  if (!hit) return null

  const kindHint =
    hit.kind === 'product'
      ? '产品站'
      : hit.kind === 'tool'
        ? '硬核工具'
        : hit.kind === 'personal'
          ? '生活向小站'
          : '基建入口'

  return {
    answer: `${hit.name}（${kindHint}）在 ${hit.href}${hit.desc ? `——${hit.desc}` : ''}。完整列表见 /network。`,
    suggestions: [
      { label: '站群地图', question: '站群地图怎么分区的？' },
      { label: '其它产品', question: '还有哪些产品站？' },
    ],
    navigate: { type: 'navigate', path: '/network', label: '去站群地图' },
  }
}
