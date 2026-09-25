import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { AmbientRadio } from '@/components/widgets/AmbientRadio'
import { Calculator } from '@/components/widgets/Calculator'
import { ColorPicker } from '@/components/widgets/ColorPicker'
import { CountdownTimer } from '@/components/widgets/CountdownTimer'
import { DailyFrame } from '@/components/widgets/DailyFrame'
import { ExposureMeter } from '@/components/widgets/ExposureMeter'
import { ExposureTriangle } from '@/components/widgets/ExposureTriangle'
import { PasswordGenerator } from '@/components/widgets/PasswordGenerator'
import { PomodoroTimer } from '@/components/widgets/PomodoroTimer'
import { WeatherWidget } from '@/components/widgets/WeatherWidget'

export const metadata: Metadata = {
  title: '玩乐',
  description: '暗房玩具柜：今日一帧、曝光三角、氛围电台、番茄钟，以及几件桌上小工具。',
}

const JUMPS = [
  { href: '#studio', label: '摄影向' },
  { href: '#bench', label: '节奏' },
  { href: '#drawer', label: '抽屉' },
] as const

export default function FunPage() {
  return (
    <PageChrome
      mark="Darkroom toys"
      title="玩乐"
      description={
        <>
          <p className="mb-5">
            暗房里的玩具柜——先看一片光，再调曝光，放点背景音；计时与天气搁在工作台，密码和计算器收进抽屉。
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ExposureMeter variant="ink" href="/time" />
            <Link
              href="/tools"
              className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
            >
              更多实用工具 →
            </Link>
          </div>
          <nav className="fun-jumps mt-6" aria-label="玩乐分区">
            {JUMPS.map((j) => (
              <a key={j.href} href={j.href} className="fun-jump">
                {j.label}
              </a>
            ))}
          </nav>
        </>
      }
    >
      <section id="studio" className="container fun-section" aria-labelledby="studio-heading">
        <header className="fun-section__head">
          <p className="folio-mark mb-2">01 · Studio</p>
          <h2 id="studio-heading" className="fun-section__title">
            摄影向
          </h2>
          <p className="fun-section__lead">看片、算光、听电台——这一区最像暗房。</p>
        </header>
        <div className="fun-studio">
          <div className="fun-studio__frame">
            <DailyFrame />
          </div>
          <div className="fun-studio__side">
            <ExposureTriangle />
          </div>
          <div className="fun-studio__radio">
            <AmbientRadio />
          </div>
        </div>
      </section>

      <div className="film-edge" aria-hidden />

      <section id="bench" className="container fun-section" aria-labelledby="bench-heading">
        <header className="fun-section__head">
          <p className="folio-mark mb-2">02 · Bench</p>
          <h2 id="bench-heading" className="fun-section__title">
            节奏
          </h2>
          <p className="fun-section__lead">番茄与倒计时管专注；天气看窗外亮不亮。</p>
        </header>
        <div className="fun-bench">
          <PomodoroTimer />
          <CountdownTimer />
          <div className="fun-bench__weather">
            <WeatherWidget />
          </div>
        </div>
      </section>

      <div className="film-edge" aria-hidden />

      <section id="drawer" className="container fun-section" aria-labelledby="drawer-heading">
        <header className="fun-section__head">
          <p className="folio-mark mb-2">03 · Drawer</p>
          <h2 id="drawer-heading" className="fun-section__title">
            抽屉
          </h2>
          <p className="fun-section__lead">
            取色、密码、计算器——够用就好。更重的工具在{' '}
            <Link href="/tools" className="underline underline-offset-4 hover:text-foreground">
              /tools
            </Link>
            。
          </p>
        </header>
        <div className="fun-drawer">
          <ColorPicker />
          <PasswordGenerator />
          <Calculator />
        </div>
      </section>
    </PageChrome>
  )
}
