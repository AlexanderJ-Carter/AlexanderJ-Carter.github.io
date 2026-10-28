'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Calculator } from '@/components/widgets/Calculator'
import { ColorPicker } from '@/components/widgets/ColorPicker'
import { PasswordGenerator } from '@/components/widgets/PasswordGenerator'
import { CurrencyTool } from '@/components/tools/CurrencyTool'
import { QrTool } from '@/components/tools/QrTool'
import { TimeTool } from '@/components/tools/TimeTool'
import { UnitsTool } from '@/components/tools/UnitsTool'
import { StudioAssist } from '@/components/tools/StudioAssist'

const SECTIONS = [
  { id: 'time', label: '时间' },
  { id: 'units', label: '换算' },
  { id: 'currency', label: '汇率' },
  { id: 'qr', label: 'QR' },
  { id: 'drawer', label: '抽屉' },
  { id: 'ai', label: '暗房助手' },
] as const

const QUERY_TO_ID: Record<string, string> = {
  time: 'time',
  units: 'units',
  currency: 'currency',
  fx: 'currency',
  qr: 'qr',
  drawer: 'drawer',
  ai: 'ai',
  studio: 'ai',
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export function ToolsHub() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const raw = searchParams.get('t') || searchParams.get('section')
    const fromQuery = raw ? QUERY_TO_ID[raw.toLowerCase()] : null
    const fromHash =
      typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : ''
    const id = fromQuery || (fromHash && QUERY_TO_ID[fromHash] ? fromHash : null)
    if (!id) return
    const timer = window.setTimeout(() => scrollToSection(id), 80)
    return () => window.clearTimeout(timer)
  }, [searchParams])

  return (
    <div className="tools-hub">
      <nav className="tools-hub__jumps" aria-label="工具分区">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="tools-hub__jump"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(s.id)
              window.history.replaceState(null, '', `#${s.id}`)
            }}
          >
            {s.label}
          </a>
        ))}
      </nav>

      <section id="time" className="tools-hub__section" aria-labelledby="time-heading">
        <header className="tools-hub__head">
          <p className="folio-mark mb-2">Time</p>
          <h2 id="time-heading" className="tools-hub__title">
            世界时间
          </h2>
          <p className="tools-hub__lead">多时区对照与一键复制。</p>
        </header>
        <TimeTool />
      </section>

      <section id="units" className="tools-hub__section" aria-labelledby="units-heading">
        <header className="tools-hub__head">
          <p className="folio-mark mb-2">Units</p>
          <h2 id="units-heading" className="tools-hub__title">
            单位换算
          </h2>
          <p className="tools-hub__lead">温度、长度、重量。</p>
        </header>
        <UnitsTool />
      </section>

      <section id="currency" className="tools-hub__section" aria-labelledby="currency-heading">
        <header className="tools-hub__head">
          <p className="folio-mark mb-2">FX</p>
          <h2 id="currency-heading" className="tools-hub__title">
            汇率
          </h2>
          <p className="tools-hub__lead">主要货币参考换算（Frankfurter）。</p>
        </header>
        <CurrencyTool />
      </section>

      <section id="qr" className="tools-hub__section" aria-labelledby="qr-heading">
        <header className="tools-hub__head">
          <p className="folio-mark mb-2">QR</p>
          <h2 id="qr-heading" className="tools-hub__title">
            二维码
          </h2>
          <p className="tools-hub__lead">链接转二维码。</p>
        </header>
        <QrTool />
      </section>

      <section id="drawer" className="tools-hub__section" aria-labelledby="drawer-heading">
        <header className="tools-hub__head">
          <p className="folio-mark mb-2">Drawer</p>
          <h2 id="drawer-heading" className="tools-hub__title">
            抽屉
          </h2>
          <p className="tools-hub__lead">取色、密码、计算器——本地完成，无需登录。</p>
        </header>
        <div className="fun-drawer">
          <ColorPicker />
          <PasswordGenerator />
          <Calculator />
        </div>
      </section>

      <section id="ai" className="tools-hub__section" aria-labelledby="ai-heading">
        <header className="tools-hub__head">
          <p className="folio-mark mb-2">Studio</p>
          <h2 id="ai-heading" className="tools-hub__title">
            暗房助手
          </h2>
          <p className="tools-hub__lead">
            贴场景或光圈/快门/ISO，生成短曝光建议与作品说明。经本站代理调用 OmniRoute，有限流。
          </p>
        </header>
        <StudioAssist />
      </section>
    </div>
  )
}
