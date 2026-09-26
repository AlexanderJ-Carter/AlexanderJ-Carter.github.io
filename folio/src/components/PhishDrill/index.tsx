'use client'

import Link from 'next/link'
import React, { useEffect, useId, useRef, useState } from 'react'

type Phase = 'lure' | 'reveal'
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
      '请填写开户时登记的号码。若已携号转网或销号，需先在柜面更新预留信息。',
      '临时借用他人号码无法通过一致性校验（错误码 E-31008）。',
    ],
  },
  card: {
    title: '卡号无法识别',
    body: [
      '请输入完整卡号，不要输入存折账号。信用卡、外币卡暂不支持本通道。',
      '错误码 E-22014 表示 BIN 校验未通过，可换一张一类户借记卡重试。',
    ],
  },
  addr: {
    title: '常住地址不一致',
    body: [
      '请按开户申请书上的常住地址填写，精确到门牌号。',
      '若已搬家，可先按旧地址完成核验，再携带身份证原件至网点更新。',
    ],
  },
  freeze: {
    title: '账户是否已被冻结',
    body: [
      '当前为「待核验限制」：快捷支付暂不可用，余额查询与柜面业务不受影响。',
      '请在倒计时结束前完成核验。请勿向陌生来电提供银行卡号或身份证号。',
    ],
  },
  agent: {
    title: '在线客服',
    body: [
      '当前排队人数 17，预计等待 6–9 分钟。服务时间 08:30–21:30。',
      '亦可拨打 400-882-0156（转 3）。客服不会要求你在聊天中发送完整卡号。',
    ],
  },
}

function maskName(raw: string): string {
  const v = raw.trim()
  if (!v) return '（未填）'
  if (v.length === 1) return v
  return `${v.slice(0, 1)}${'•'.repeat(Math.min(4, v.length - 1))}`
}

function onlyDigits(s: string) {
  return s.replace(/\D/g, '')
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
  const revealRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (phase !== 'lure') return
    const t = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => window.clearInterval(t)
  }, [phase])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLeak({
      nameHint: maskName(name),
      cardDigits: onlyDigits(card).length,
      bank: bank || '（未选）',
      phoneDigits: onlyDigits(phone).length,
      addrChars: addr.trim().length,
      idChars: idTail.trim().length,
    })
    setName('')
    setCard('')
    setBank('')
    setPhone('')
    setAddr('')
    setIdTail('')
    setHelpOpen(false)
    setPhase('reveal')
    window.requestAnimationFrame(() => revealRef.current?.focus())
  }

  const reset = () => {
    setLeak(null)
    setPhase('lure')
    setSeconds(14 * 60 + 59)
  }

  if (phase === 'reveal') {
    return (
      <div className="awareness">
        <section
          className="awareness-reveal"
          ref={revealRef}
          tabIndex={-1}
          aria-labelledby="awareness-reveal-title"
        >
          <h1 id="awareness-reveal-title" className="awareness-reveal__title">
            停一下——刚才那一页不是真的银行
          </h1>
          <p className="awareness-reveal__lede">
            你没有被盗号。这是防骗练习：字段从未发往服务器。下面是它试图拿走的东西（仅长度与脱敏痕迹）。
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
              <p>拼错域名是常见手法。真银行不会用陌生或拼错的网址要你交卡号和身份证信息。</p>
            </li>
            <li>
              <h2>「遇到问题」也可以是假的</h2>
              <p>帮助条目、排队人数、错误码都能编。真客服请从官方 App 进入。</p>
            </li>
            <li>
              <h2>倒计时和冻结是套路</h2>
              <p>有事打开官方 App 查，不要点短信或微信里的链接。</p>
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
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="awareness">
      <div className="phish-bank" aria-labelledby={`${formId}-title`}>
        <header className="phish-bank__top">
          <div className="phish-bank__brand">
            <span className="phish-bank__logo" aria-hidden>
              安
            </span>
            <div>
              <p className="phish-bank__name">网银安全核验中心</p>
              <p className="phish-bank__sub">Online Banking Risk Control</p>
            </div>
          </div>
          <p className="phish-bank__code">服务编码 SX-8821</p>
        </header>

        <p className="phish-bank__banner">
          系统监测到您的借记卡存在异常消费尝试。为保障资金安全，请在时限内完成身份核验，否则账户将临时限制快捷支付。
        </p>

        <div className="phish-bank__card">
          <div className="phish-bank__head">
            <h1 id={`${formId}-title`}>请完成账户安全核验</h1>
            <p>检测到异地设备发起支付。请填写开户时预留信息，核验通过后即可恢复正常使用。</p>
            <div className="phish-bank__timer">
              <span>剩余处理时间</span>
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
                onChange={(e) => setCard(e.target.value)}
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
                onChange={(e) => setPhone(e.target.value)}
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
                onChange={(e) => setIdTail(e.target.value)}
                placeholder="证件号最后四位"
                required
              />
            </label>

            <button type="submit" className="phish-bank__submit">
              立即验证并解除限制
            </button>
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
              客服热线：400-882-0156（转 3） · 工单号 TX{mm}
              {ss}K9
            </li>
            <li>会话节点：CN-East-2 · 证书 CN=*.alexander-sec.ru</li>
          </ul>
        </div>
      </div>

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
                <h2 id={`${formId}-help`}>常见问题</h2>
                <ul className="phish-help__list">
                  {(Object.keys(HELP) as Exclude<HelpKey, null>[]).map((key) => (
                    <li key={key}>
                      <button type="button" onClick={() => setHelpKey(key)}>
                        {HELP[key].title}
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
