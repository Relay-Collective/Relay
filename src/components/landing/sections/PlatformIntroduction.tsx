import { Accent, Reveal } from '../primitives'
import { container, h2, lede } from '../styles'

// 02: rides are the first service, not the whole idea. The capabilities that follow show what that means.
export function PlatformIntroduction() {
  return (
    <section id="platform" aria-labelledby="platform-heading" className="scroll-mt-16 border-t border-hairline bg-porcelain pt-24 sm:pt-28 lg:pt-36">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-8`}>
        <Reveal className="lg:col-span-8">
          <h2 id="platform-heading" className={h2}>
            Beyond rides.
            <Accent className="mt-2 block text-[0.9em] leading-[1.02] text-cantaloupe-display">A shared infrastructure for greater impact.</Accent>
          </h2>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-3 lg:col-start-10 lg:self-end">
          <p className={lede}>Coordinate people, services, and resources across your organization — all in one place.</p>
        </Reveal>
      </div>
    </section>
  )
}
