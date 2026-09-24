import type { Metadata } from 'next'
import Link from 'next/link'

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
  description: '暗房里的小工具：曝光表、番茄钟、密码、取色、电台与天气。',
}

export default function FunPage() {
  return (
    <article className="pt-28 pb-24">
      <section className="container mb-10">
        <div className="max-w-2xl">
          <p className="folio-mark mb-3">Darkroom toys</p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">玩乐</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            发现一些好玩的小惊喜——计时、取色、今日一帧、曝光三角与氛围电台。
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
        </div>
      </section>
      <section className="container">
        <div className="grid gap-6 md:grid-cols-2">
          <PomodoroTimer />
          <CountdownTimer />
          <PasswordGenerator />
          <ColorPicker />
          <Calculator />
          <ExposureTriangle />
          <DailyFrame />
          <WeatherWidget />
          <AmbientRadio />
        </div>
      </section>
    </article>
  )
}
