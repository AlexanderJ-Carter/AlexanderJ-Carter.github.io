'use client'

import Link from 'next/link'
import React, { useEffect, useId, useRef, useState } from 'react'

type Phase = 'lure' | 'verifying' | 'reveal'
type HelpKey = 'phone' | 'card' | 'addr' | 'freeze' | 'agent' | null

type LeakSummary = {
  nameHint: string
  cardDigits: number
  bank: string
  phoneDigits: number
  addrChars: number
  idChars: number
}

const BANKS = [
  '中国工商银行',
  '中国建设银行',
  '中国农业银行',
  '中国银行',
  '交通银行',
  '招商银行',
  '邮政储蓄银行',
  '其他商业银行',
] as const

const HELP: Record<Exclude<HelpKey, null>, { title: string; body: string[] }> = {
  phone: {
    title: '预留手机号已停用 / 换号',
    body: [
      '请填写开户时登记的号码。若已携号转网或销号，需先在柜面更新预留信息后再返回本通道。',
      '临时借用他人号码无法通过一致性校验（错误码 E-31008）。',
      '可拨打 400-882-0156 转 3，报工单号由坐席协助登记。',
    ],
  },
  card: {
    title: '卡号无法识别',
    body: [
      '请输入完整卡号，不要输入存折账号。信用卡、外币卡暂不支持本通道。',
      '若为新换卡，请以卡面最新卡号为准。',
      '错误码 E-22014 表示 BIN 校验未通过，可换一张一类户借记卡重试。',
    ],
  },
  addr: {
    title: '常住地址不一致',
    body: [
      '请按开户申请书上的常住地址填写，精确到门牌号。仅填省市区可能导致复核失败（错误码 E-41022）。',
      '若已搬家，可先按旧地址完成核验，再携带身份证原件至网点更新。',
    ],
  },
  freeze: {
    title: '账户是否已被冻结',
    body: [
      '当前为「待核验限制」：快捷支付与大额网银转账暂不可用，余额查询与柜面业务不受影响。',
      '请在倒计时结束前完成核验。超时后需提交工单，预计 1–3 个工作日人工复核。',
      '请勿向陌生来电提供银行卡号或身份证号。',
    ],
  },
  agent: {
    title: '在线客服',
    body: [
      '当前排队人数 17，预计等待 6–9 分钟。服务时间 08:30–21:30。',
      '亦可拨打 400-882-0156（转 3），报工单号优先接入。',
      '客服不会要求你在聊天中发送完整卡号；如遇可疑要求请立即挂断。',
    ],
  },
}

const TX = {
  merchant: '深圳**科技有限公司（快捷支付）',
  amount: '¥2,980.00',
  channel: '银联云闪付 · 异地',
  device: 'iPhone · 广东省深圳市 · IP 14.22.*.*',
  time: '',
  risk: '高风险 · 疑似盗刷',
} as const

function maskName(raw: string): string {
  const v = raw.trim()
  if (!v) return '（未填）'
  if (v.length === 1) return v
  return `${v.slice(0, 1)}${'•'.repeat(Math.min(4, v.length - 1))}`
}

function onlyDigits(s: string) {
  return s.replace(/\D/g, '')
}

function formatCard(raw: string) {
  const d = onlyDigits(raw).slice(0, 19)
  return d.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

function formatPhone(raw: string) {
  const d = onlyDigits(raw).slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 7) return `${d.slice(0, 3)} ${d.slice(3)}`
  return `${d.slice(0, 3)} ${d.slice(3, 7)} ${d.slice(7)}`
}

function formatIdTail(raw: string) {
  return raw.replace(/[^0-9Xx]/g, '').slice(0, 4).toUpperCase()
}

function txTimeLabel() {
  const d = new Date(Date.now() - 7 * 60 * 1000)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

export function PhishDrill() {
  const formId = useId()
  const [phase, setPhase] = useState<Phase>('lure')
  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [bank, setBank] = useState('')
  const [phone, setPhone] = useState('')
  const [addr, setAddr] = useState('')
  const [idTail, setIdTail] = useState('')
  const [leak, setLeak] = useState<LeakSummary | null>(null)
  const [seconds, setSeconds] = useState(14 * 60 + 59)
  const [helpOpen, setHelpOpen] = useState(false)
  const [helpKey, setHelpKey] = useState<HelpKey>(null)
  const [txTime] = useState(txTimeLabel)
  const [verifyPct, setVerifyPct] = useState(0)
  const revealRef = useRef<HTMLElement>(null)
  const verifyTimer = useRef<number | null>(null)

  useEffect(() => {
    if (phase !== 'lure') return
    const t = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => window.clearInterval(t)
  }, [phase])

  useEffect(() => {
    if (phase === 'reveal') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  useEffect(() => {
    return () => {
      if (verifyTimer.current) window.clearInterval(verifyTimer.current)
    }
  }, [])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const urgent = seconds < 3 * 60
  const ticket = `TX${mm}${ss}K9`

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const summary: LeakSummary = {
      nameHint: maskName(name),
      cardDigits: onlyDigits(card).length,
      bank: bank || '（未选）',
      phoneDigits: onlyDigits(phone).length,
      addrChars: addr.trim().length,
      idChars: idTail.trim().length,
    }
    setLeak(summary)
    setName('')
    setCard('')
    setBank('')
    setPhone('')
    setAddr('')
    setIdTail('')
    setHelpOpen(false)
    setVerifyPct(0)
    setPhase('verifying')

    let pct = 0
    if (verifyTimer.current) window.clearInterval(verifyTimer.current)
    verifyTimer.current = window.setInterval(() => {
      pct += 8 + Math.floor(Math.random() * 10)
      if (pct >= 100) {
        pct = 100
        if (verifyTimer.current) window.clearInterval(verifyTimer.current)
        verifyTimer.current = null
        window.setTimeout(() => {
          setPhase('reveal')
          window.requestAnimationFrame(() => revealRef.current?.focus())
        }, 280)
      }
      setVerifyPct(Math.min(100, pct))
    }, 160)
  }

  const reset = () => {
    setLeak(null)
    setPhase('lure')
    setSeconds(14 * 60 + 59)
    setVerifyPct(0)
  }

  if (phase === 'reveal') {
    return (
      <div className="awareness awareness--reveal">
        <section
          className="awareness-reveal"
          ref={revealRef}
          tabIndex={-1}
          aria-labelledby="awareness-reveal-title"
        >
          <p className="awareness-reveal__badge">防骗练习 · 已结束</p>
          <h1 id="awareness-reveal-title" className="awareness-reveal__title">
            停一下——刚才那一页不是真的银行
          </h1>
          <p className="awareness-reveal__lede">
            你没有被盗号，钱也没被转走。这是防骗练习：刚才填的内容只留在这台设备里，网站没有收到这些信息。
          </p>
          <dl className="awareness-leak">
            <div>
              <dt>姓名</dt>
              <dd>
                <span className="meta-mono">{leak?.nameHint}</span>
              </dd>
            </div>
            <div>
              <dt>卡号</dt>
              <dd>
                <span className="meta-mono">
                  {leak?.cardDigits ? `•••• ${leak.cardDigits} 位` : '（未填）'}
                </span>
              </dd>
            </div>
            <div>
              <dt>开户行</dt>
              <dd>
                <span className="meta-mono">{leak?.bank}</span>
              </dd>
            </div>
            <div>
              <dt>手机</dt>
              <dd>
                <span className="meta-mono">
                  {leak?.phoneDigits
                    ? `${'•'.repeat(Math.min(11, leak.phoneDigits))} · ${leak.phoneDigits} 位`
                    : '（未填）'}
                </span>
              </dd>
            </div>
            <div>
              <dt>地址</dt>
              <dd>
                <span className="meta-mono">
                  {leak?.addrChars ? `${leak.addrChars} 字` : '（未填）'}
                </span>
              </dd>
            </div>
            <div>
              <dt>证件尾号</dt>
              <dd>
                <span className="meta-mono">
                  {leak?.idChars ? `•••• · ${leak.idChars} 位` : '（未填）'}
                </span>
              </dd>
            </div>
          </dl>
          <ol className="awareness-lessons">
            <li>
              <h2>先看地址栏</h2>
              <p>
                拼错域名、陌生短链、仿冒「核验中心」是常见手法。真银行不会用陌生网址同时要卡号、住址和身份证号。
              </p>
            </li>
            <li>
              <h2>「遇到问题」也可以是假的</h2>
              <p>帮助条目、排队人数、错误码、工单号都能编。真客服请从官方 App 进入，不要点短信或微信里的链接。</p>
            </li>
            <li>
              <h2>倒计时和冻结是套路</h2>
              <p>异常交易、剩余时间、快捷支付将被限制——用来制造恐慌。有事打开官方 App 自己查。</p>
            </li>
            <li>
              <h2>本页零上报</h2>
              <p>若填过真实信息，请留意账户动账，并先打给家里人确认再点陌生链接。</p>
            </li>
          </ol>
          <div className="awareness-reveal__actions">
            <button type="button" className="awareness-btn" onClick={reset}>
              再试一次
            </button>
            <Link href="/security/policy" className="awareness-btn awareness-btn--ghost">
              本站安全政策
            </Link>
            <Link href="/" className="awareness-btn awareness-btn--ghost">
              回首页
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="awareness awareness--immersive" aria-busy={phase === 'verifying'}>
      <div className="phish-bank" aria-labelledby={`${formId}-title`}>
        <header className="phish-bank__top">
          <div className="phish-bank__brand">
            <span className="phish-bank__logo" aria-hidden>
              <svg viewBox="0 0 32 32" width="18" height="18" fill="none">
                <path
                  d="M16 3.5 27 8v8.2c0 6.2-4.4 11.9-11 13.3C9.4 28.1 5 22.4 5 16.2V8l11-4.5Z"
                  fill="currentColor"
                  opacity="0.95"
                />
                <path
                  d="M11.2 16.2 14.4 19.4 21 12.8"
                  stroke="#0958d9"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <p className="phish-bank__name">网银安全核验中心</p>
              <p className="phish-bank__sub">银联风险联防通道 · Risk Control</p>
            </div>
          </div>
          <div className="phish-bank__top-meta">
            <span className="phish-bank__secure" aria-hidden>
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                <path d="M8 1.5 13 3.5v4.2c0 3.1-2.1 5.9-5 6.8-2.9-.9-5-3.7-5-6.8V3.5L8 1.5Zm0 2.1L5 5v3.7c0 2 1.3 3.8 3 4.5 1.7-.7 3-2.5 3-4.5V5L8 3.6Z" />
              </svg>
              加密通道
            </span>
            <p className="phish-bank__code">SX-8821</p>
          </div>
        </header>

        <nav className="phish-bank__crumb" aria-label="当前位置">
          <span>首页</span>
          <span aria-hidden>/</span>
          <span>风险控制</span>
          <span aria-hidden>/</span>
          <span>身份核验</span>
        </nav>

        <p className={`phish-bank__banner${urgent ? ' is-urgent' : ''}`}>
          <span className="phish-bank__banner-icon" aria-hidden>
            !
          </span>
          <span>
            系统监测到您的借记卡存在异常消费尝试。为保障资金安全，请在时限内完成身份核验，否则将临时限制快捷支付与大额转账。
          </span>
        </p>

        <div className="phish-bank__body">
          <aside className="phish-bank__order" aria-label="异常交易详情">
            <div className="phish-bank__order-head">
              <p className="phish-bank__order-tag">{TX.risk}</p>
              <p className="phish-bank__order-amt">{TX.amount}</p>
            </div>
            <dl className="phish-bank__order-grid">
              <div>
                <dt>商户</dt>
                <dd>{TX.merchant}</dd>
              </div>
              <div>
                <dt>交易时间</dt>
                <dd className="meta-mono">{txTime}</dd>
              </div>
              <div>
                <dt>支付方式</dt>
                <dd>{TX.channel}</dd>
              </div>
              <div>
                <dt>发起设备</dt>
                <dd>{TX.device}</dd>
              </div>
              <div>
                <dt>风控单号</dt>
                <dd className="meta-mono">{ticket}</dd>
              </div>
            </dl>
          </aside>

          <div className="phish-bank__card">
            <ol className="phish-bank__steps" aria-label="核验进度">
              <li className="is-active">
                <span>1</span>身份核验
              </li>
              <li>
                <span>2</span>确认解除
              </li>
              <li>
                <span>3</span>恢复使用
              </li>
            </ol>

            <div className="phish-bank__head">
              <h1 id={`${formId}-title`}>请完成账户安全核验</h1>
              <p>
                检测到异地设备发起支付。请填写开户时预留信息，核验通过后即可恢复正常使用。本通道仅用于风险处置，不会扣款。
              </p>
              <div className={`phish-bank__timer${urgent ? ' is-urgent' : ''}`}>
                <span>{urgent ? '即将超时 · 剩余处理时间' : '剩余处理时间'}</span>
                <span className="phish-bank__countdown meta-mono tabular-nums">
                  {mm}:{ss}
                </span>
              </div>
            </div>

            <form className="phish-bank__form" onSubmit={submit} autoComplete="off">
              <label className="phish-bank__label">
                持卡人姓名
                <input
                  name="phish-name"
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="与银行卡一致"
                  required
                />
              </label>
              <label className="phish-bank__label">
                银行卡号
                <input
                  name="phish-card"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={card}
                  onChange={(e) => setCard(formatCard(e.target.value))}
                  placeholder="16–19 位卡号"
                  required
                />
              </label>
              <label className="phish-bank__label">
                开户行
                <select
                  name="phish-bank"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    请选择开户行
                  </option>
                  {BANKS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>
              <label className="phish-bank__label">
                预留手机号
                <input
                  name="phish-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="off"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="银行预留手机号"
                  required
                />
              </label>
              <label className="phish-bank__label">
                常住地址
                <input
                  name="phish-addr"
                  type="text"
                  autoComplete="off"
                  value={addr}
                  onChange={(e) => setAddr(e.target.value)}
                  placeholder="省市区 + 详细地址"
                  required
                />
              </label>
              <label className="phish-bank__label">
                身份证号后四位
                <input
                  name="phish-id"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={4}
                  minLength={4}
                  value={idTail}
                  onChange={(e) => setIdTail(formatIdTail(e.target.value))}
                  placeholder="证件号最后四位"
                  required
                />
              </label>

              <button type="submit" className="phish-bank__submit">
                立即验证并解除限制
              </button>
              <p className="phish-bank__legal">
                点击提交即表示您已阅读并同意《风险核验授权协议》。本页信息仅用于一致性校验。
              </p>
            </form>

            <button
              type="button"
              className="phish-bank__help"
              onClick={() => {
                setHelpKey(null)
                setHelpOpen(true)
              }}
            >
              遇到问题？查看常见帮助
            </button>

            <ul className="phish-bank__tips">
              <li>请确保本人操作，勿向他人转发本页或截图中的个人信息。</li>
              <li>
                客服热线：400-882-0156（转 3） · 工单号 {ticket}
              </li>
              <li>会话节点：CN-East-2 · 证书 CN=*.alexander-sec.ru</li>
            </ul>
          </div>
        </div>

        <footer className="phish-bank__foot">
          © 网银安全核验中心 · 请使用本人借记卡操作
          <br />
          <span>连接已加密 · TLS 1.2</span>
        </footer>
      </div>

      {phase === 'verifying' ? (
        <div className="phish-verify" role="status" aria-live="polite">
          <div className="phish-verify__card">
            <div className="phish-verify__spin" aria-hidden />
            <p className="phish-verify__title">正在核验身份信息</p>
            <p className="phish-verify__sub">连接风控节点 CN-East-2 · 请勿关闭页面</p>
            <div className="phish-verify__bar" aria-hidden>
              <span style={{ width: `${verifyPct}%` }} />
            </div>
            <p className="phish-verify__pct meta-mono">{verifyPct}%</p>
          </div>
        </div>
      ) : null}

      {helpOpen ? (
        <div
          className="phish-help"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${formId}-help`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setHelpOpen(false)
          }}
        >
          <div className="phish-help__sheet">
            {helpKey === null ? (
              <>
                <p className="phish-help__ticket meta-mono">工单 {ticket}</p>
                <h2 id={`${formId}-help`}>常见问题</h2>
                <ul className="phish-help__list">
                  {(Object.keys(HELP) as Exclude<HelpKey, null>[]).map((key) => (
                    <li key={key}>
                      <button type="button" onClick={() => setHelpKey(key)}>
                        {HELP[key].title}
                        <span aria-hidden>›</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <button type="button" className="phish-help__close" onClick={() => setHelpOpen(false)}>
                  关闭
                </button>
              </>
            ) : (
              <>
                <button type="button" className="phish-help__back" onClick={() => setHelpKey(null)}>
                  ← 返回列表
                </button>
                <h2 id={`${formId}-help`}>{HELP[helpKey].title}</h2>
                <div className="phish-help__body">
                  {HELP[helpKey].body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <button type="button" className="phish-help__close" onClick={() => setHelpOpen(false)}>
                  关闭
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
