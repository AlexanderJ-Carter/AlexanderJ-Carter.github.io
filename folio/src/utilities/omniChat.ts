/**
 * OmniRoute OpenAI-compatible chat helper（仅服务端）。
 * Omni 只绑 Tailscale；公网经 Folio API 代理，勿在客户端直连。
 */

export type OmniChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type OmniChatOptions = {
  messages: OmniChatMessage[]
  temperature?: number
  maxTokens?: number
  timeoutMs?: number
}

export type OmniChatResult = {
  content: string
  finishReason?: string
}

function omniEnv(): { base: string; key: string; model: string } | null {
  const base = process.env.OMNI_URL?.replace(/\/$/, '')
  const key = process.env.OMNI_KEY
  const model = process.env.OMNI_MODEL
  if (!base || !key || !model) return null
  return { base, key, model }
}

/** Omni 是否已配置（不问模型是否可达）。 */
export function isOmniConfigured(): boolean {
  return omniEnv() !== null
}

/** 调用 OmniRoute `/v1/chat/completions`；未配置或失败返回 null。 */
export async function omniChat(options: OmniChatOptions): Promise<OmniChatResult | null> {
  const env = omniEnv()
  if (!env) return null

  try {
    const res = await fetch(`${env.base}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.key}`,
      },
      body: JSON.stringify({
        model: env.model,
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 800,
        messages: options.messages,
      }),
      signal: AbortSignal.timeout(options.timeoutMs ?? 25000),
    })

    if (!res.ok) return null
    const data = (await res.json()) as {
      choices?: { message?: { content?: string }; finish_reason?: string }[]
    }
    const content = data.choices?.[0]?.message?.content?.trim()
    if (!content) return null
    return {
      content,
      finishReason: data.choices?.[0]?.finish_reason,
    }
  } catch {
    return null
  }
}
