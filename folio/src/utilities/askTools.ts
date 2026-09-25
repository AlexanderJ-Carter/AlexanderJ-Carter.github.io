/**
 * 问站白名单小工具：天气 / 汇率 / 诗词 / 上海时间。
 * 仅服务端调用；禁止任意 URL 抓取。
 */

export type AskToolAction = {
  type: 'navigate'
  path: string
  label: string
}

export type AskToolResult = {
  id: 'weather' | 'fx' | 'poem' | 'clock'
  facts: string
  answer: string
  navigate: AskToolAction
  suggestions: { label: string; question: string }[]
}

const WEATHER_CODES: Record<number, string> = {
  0: '晴朗',
  1: '晴间多云',
  2: '多云',
  3: '阴天',
  45: '雾',
  48: '雾凇',
  51: '小雨',
  53: '中雨',
  55: '大雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  80: '阵雨',
  95: '雷暴',
}

const CITIES: { keys: string[]; label: string; lat: number; lon: number }[] = [
  { keys: ['北京', 'beijing'], label: '北京', lat: 39.9042, lon: 116.4074 },
  { keys: ['上海', 'shanghai'], label: '上海', lat: 31.2304, lon: 121.4737 },
  { keys: ['深圳', 'shenzhen'], label: '深圳', lat: 22.5431, lon: 114.0579 },
  { keys: ['广州', 'guangzhou'], label: '广州', lat: 23.1291, lon: 113.2644 },
  { keys: ['杭州', 'hangzhou'], label: '杭州', lat: 30.2741, lon: 120.1551 },
  { keys: ['成都', 'chengdu'], label: '成都', lat: 30.5728, lon: 104.0668 },
  { keys: ['南京', 'nanjing'], label: '南京', lat: 32.0603, lon: 118.7969 },
  { keys: ['武汉', 'wuhan'], label: '武汉', lat: 30.5928, lon: 114.3055 },
  { keys: ['西安', 'xian', "xi'an"], label: '西安', lat: 34.3416, lon: 108.9398 },
  { keys: ['香港', 'hong kong', 'hk'], label: '香港', lat: 22.3193, lon: 114.1694 },
  { keys: ['台北', 'taipei'], label: '台北', lat: 25.033, lon: 121.5654 },
  { keys: ['重庆', 'chongqing'], label: '重庆', lat: 29.563, lon: 106.5516 },
  { keys: ['苏州', 'suzhou'], label: '苏州', lat: 31.2989, lon: 120.5853 },
  { keys: ['天津', 'tianjin'], label: '天津', lat: 39.3434, lon: 117.3616 },
  { keys: ['长沙', 'changsha'], label: '长沙', lat: 28.2282, lon: 112.9388 },
  { keys: ['厦门', 'xiamen'], label: '厦门', lat: 24.4798, lon: 118.0894 },
]

const FX_CODES = ['USD', 'EUR', 'GBP', 'JPY', 'HKD', 'AUD', 'CAD', 'CNY'] as const

const FX_ALIAS: Record<string, (typeof FX_CODES)[number]> = {
  美元: 'USD',
  美金: 'USD',
  usd: 'USD',
  欧元: 'EUR',
  eur: 'EUR',
  英镑: 'GBP',
  gbp: 'GBP',
  日元: 'JPY',
  jpy: 'JPY',
  港币: 'HKD',
  港元: 'HKD',
  hkd: 'HKD',
  澳元: 'AUD',
  aud: 'AUD',
  加元: 'CAD',
  cad: 'CAD',
  人民币: 'CNY',
  块钱: 'CNY',
  cny: 'CNY',
  rmb: 'CNY',
}

type ToolKind = AskToolResult['id']

function resolveCity(text: string): { label: string; lat: number; lon: number } {
  const lower = text.toLowerCase()
  for (const c of CITIES) {
    if (c.keys.some((k) => lower.includes(k.toLowerCase()))) {
      return { label: c.label, lat: c.lat, lon: c.lon }
    }
  }
  return { label: '北京', lat: 39.9042, lon: 116.4074 }
}

function matchKind(text: string): ToolKind | null {
  if (/天气|气温|下雨|下雪|温度|humidity|weather|forecast|多少度/i.test(text)) return 'weather'
  if (/汇率|兑|换汇|美元|欧元|英镑|日元|港币|frankfurter|forex|\bfx\b|USD|EUR|CNY/i.test(text)) {
    return 'fx'
  }
  if (/诗词|一句诗|今日诗|念诗|jinrishici|poem/i.test(text)) return 'poem'
  if (/几点|现在时间|上海时间|几点了|what time|clock/i.test(text)) return 'clock'
  return null
}

function detectCurrency(token: string): (typeof FX_CODES)[number] | null {
  const t = token.trim().toLowerCase()
  if (!t) return null
  for (const code of FX_CODES) {
    if (t === code.toLowerCase()) return code
  }
  for (const [alias, code] of Object.entries(FX_ALIAS)) {
    if (t.includes(alias.toLowerCase())) return code
  }
  return null
}

function parseFxPair(text: string): { from: string; to: string } {
  // 「美元兑人民币」「1 欧元换多少块」
  const ordered = text.match(
    /([A-Za-z]{3}|美元|美金|欧元|英镑|日元|港币|港元|澳元|加元|人民币|块钱?)\s*(?:兑|换|对|to|\/)\s*([A-Za-z]{3}|美元|美金|欧元|英镑|日元|港币|港元|澳元|加元|人民币|块钱?)/i,
  )
  if (ordered) {
    const from = detectCurrency(ordered[1]!) || 'USD'
    const to = detectCurrency(ordered[2]!) || 'CNY'
    if (from !== to) return { from, to }
  }

  const found: string[] = []
  for (const code of FX_CODES) {
    if (new RegExp(`\\b${code}\\b`, 'i').test(text) || text.includes(code)) {
      if (!found.includes(code)) found.push(code)
    }
  }
  for (const [alias, code] of Object.entries(FX_ALIAS)) {
    if (text.toLowerCase().includes(alias.toLowerCase()) && !found.includes(code)) {
      found.push(code)
    }
  }

  if (found.length >= 2) return { from: found[0]!, to: found[1]! }
  if (found.length === 1 && found[0] !== 'CNY') return { from: found[0]!, to: 'CNY' }
  return { from: 'USD', to: 'CNY' }
}

async function fetchWeather(text: string): Promise<AskToolResult> {
  const place = resolveCity(text)
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=2`

  const res = await fetch(url, { signal: AbortSignal.timeout(6000), cache: 'no-store' })
  if (!res.ok) throw new Error('weather http')
  const json = (await res.json()) as {
    current?: {
      temperature_2m?: number
      relative_humidity_2m?: number
      wind_speed_10m?: number
      weather_code?: number
    }
    daily?: {
      temperature_2m_max?: number[]
      temperature_2m_min?: number[]
    }
  }
  const cur = json.current
  if (!cur || typeof cur.temperature_2m !== 'number') throw new Error('weather empty')

  const code = cur.weather_code ?? -1
  const desc = WEATHER_CODES[code] ?? '—'
  const temp = Math.round(cur.temperature_2m)
  const humidity = Math.round(cur.relative_humidity_2m ?? 0)
  const wind = Math.round((cur.wind_speed_10m ?? 0) * 10) / 10
  const hi = json.daily?.temperature_2m_max?.[0]
  const lo = json.daily?.temperature_2m_min?.[0]
  const range =
    typeof hi === 'number' && typeof lo === 'number'
      ? `今日约 ${Math.round(lo)}–${Math.round(hi)}°C。`
      : ''

  const facts = `天气实况（Open-Meteo）：${place.label} 当前约 ${temp}°C，${desc}；湿度 ${humidity}%；风速 ${wind} m/s。${range}`
  return {
    id: 'weather',
    facts,
    answer: `${place.label}现在大约 ${temp}°C，${desc}。湿度 ${humidity}%，风速约 ${wind} m/s。${range}更完整的七日预报在 /fun。`,
    navigate: { type: 'navigate', path: '/fun', label: '打开玩乐天气' },
    suggestions: [
      { label: '上海天气', question: '上海现在天气怎么样？' },
      { label: '给一句诗', question: '再给我一句诗词。' },
    ],
  }
}

async function fetchFx(text: string): Promise<AskToolResult> {
  const { from, to } = parseFxPair(text)
  const res = await fetch('https://api.frankfurter.app/latest?from=USD', {
    signal: AbortSignal.timeout(6000),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('fx http')
  const json = (await res.json()) as { rates?: Record<string, number>; date?: string }
  const rates: Record<string, number> = { USD: 1, ...(json.rates || {}) }
  if (!rates[from] || !rates[to]) throw new Error('fx pair')

  const amountMatch = text.match(/(\d+(?:\.\d+)?)/)
  const amount = amountMatch ? Number(amountMatch[1]) : 1
  const inUsd = amount / rates[from]!
  const converted = Math.round(inUsd * rates[to]! * 10000) / 10000
  const one = Math.round((1 / rates[from]!) * rates[to]! * 10000) / 10000

  const facts = `汇率（Frankfurter，${json.date || '今日'}）：1 ${from} ≈ ${one} ${to}；${amount} ${from} ≈ ${converted} ${to}。`
  return {
    id: 'fx',
    facts,
    answer: `参考价（Frankfurter）：1 ${from} ≈ ${one} ${to}。${amount === 1 ? '' : `${amount} ${from} ≈ ${converted} ${to}。`}精细换算去 /currency。`,
    navigate: { type: 'navigate', path: '/currency', label: '打开汇率工具' },
    suggestions: [
      { label: '欧元兑人民币', question: '1 欧元大约兑多少人民币？' },
      { label: '北京天气', question: '北京现在天气怎么样？' },
    ],
  }
}

async function fetchPoem(): Promise<AskToolResult> {
  const res = await fetch('https://v2.jinrishici.com/one.json', {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(6000),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('poem http')
  const data = (await res.json()) as {
    data?: { content?: string; origin?: { title?: string; author?: string; dynasty?: string } }
  }
  const content = data.data?.content?.trim()
  if (!content) throw new Error('poem empty')
  const origin = data.data?.origin
  const meta = [origin?.dynasty, origin?.author, origin?.title].filter(Boolean).join(' · ')

  const facts = `今日诗词：${content}${meta ? `（${meta}）` : ''}`
  return {
    id: 'poem',
    facts,
    answer: meta ? `「${content}」——${meta}。更多在 /fun。` : `「${content}」。更多在 /fun。`,
    navigate: { type: 'navigate', path: '/fun', label: '打开玩乐' },
    suggestions: [
      { label: '再来一句', question: '再给我一句诗词。' },
      { label: '上海天气', question: '上海现在天气怎么样？' },
    ],
  }
}

function fetchClock(): AskToolResult {
  const stamp = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())

  return {
    id: 'clock',
    facts: `Asia/Shanghai 当前：${stamp}`,
    answer: `上海时区现在是 ${stamp}。世界时钟在 /time。`,
    navigate: { type: 'navigate', path: '/time', label: '打开时间工具' },
    suggestions: [
      { label: '北京天气', question: '北京现在天气怎么样？' },
      { label: '美元汇率', question: '1 美元大约兑多少人民币？' },
    ],
  }
}

/** 若命中白名单工具则取数；未命中返回 null。 */
export async function runAskTool(question: string): Promise<AskToolResult | null> {
  const kind = matchKind(question)
  if (!kind) return null

  try {
    if (kind === 'weather') return await fetchWeather(question)
    if (kind === 'fx') return await fetchFx(question)
    if (kind === 'poem') return await fetchPoem()
    return fetchClock()
  } catch {
    const fallbackNav: Record<ToolKind, AskToolAction> = {
      weather: { type: 'navigate', path: '/fun', label: '打开玩乐天气' },
      fx: { type: 'navigate', path: '/currency', label: '打开汇率工具' },
      poem: { type: 'navigate', path: '/fun', label: '打开玩乐' },
      clock: { type: 'navigate', path: '/time', label: '打开时间工具' },
    }
    const soft: Record<ToolKind, string> = {
      weather: '这会儿天气接口没跟上。可以到 /fun 看玩乐页的天气卡片。',
      fx: '这会儿汇率接口没跟上。可以到 /currency 手动换算。',
      poem: '这会儿诗词接口没跟上。可以到 /fun 再试今日诗词。',
      clock: '时间工具在 /time，也可以看设备本地时钟。',
    }
    return {
      id: kind,
      facts: '',
      answer: soft[kind],
      navigate: fallbackNav[kind],
      suggestions: [
        { label: '去玩乐', question: '玩乐页现在有哪些玩具？' },
        { label: '去工具', question: '实用工具页有什么？' },
      ],
    }
  }
}
