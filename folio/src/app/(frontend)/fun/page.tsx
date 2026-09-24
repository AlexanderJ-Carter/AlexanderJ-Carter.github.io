import type { Metadata } from 'next'

import { ColorPicker } from '@/components/widgets/ColorPicker'
import { DailyFrame } from '@/components/widgets/DailyFrame'
import { ExposureMeter } from '@/components/widgets/ExposureMeter'
import { PasswordGenerator } from '@/components/widgets/PasswordGenerator'
import { PomodoroTimer } from '@/components/widgets/PomodoroTimer'

export const metadata: Metadata = {
  title: '玩乐',
  description: '暗房里的小工具：曝光表、番茄钟、密码与取色。',
}

export default function FunPage() {
  return (
    <article className="pt-28 pb-24">
      <section className="container mb-10">
        <div className="max-w-2xl">
          <p className="folio-mark mb-3">Darkroom toys</p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">玩乐</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            发现一些好玩的小惊喜——计时、取色、今日一帧。
          </p>
          <ExposureMeter variant="ink" href="/fun" />
        </div>
      </section>
      <section className="container">
        <div className="grid gap-6 md:grid-cols-2">
          <PomodoroTimer />
          <PasswordGenerator />
          <ColorPicker />
          <DailyFrame />
        </div>
      </section>
    </article>
  )
}
