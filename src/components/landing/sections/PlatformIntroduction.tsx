import { Accent, Reveal } from '../primitives'
import { container, h2, lede } from '../styles'

// 02: the idea in one breath. Every nonprofit rebuilds the same tools; Relay Collective builds them once, for everyone.
export function PlatformIntroduction() {
  return (
    <section id="platform" aria-labelledby="platform-heading" className="scroll-mt-16 border-t border-hairline bg-porcelain pt-24 sm:pt-28 lg:pt-36">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-8`}>
        <Reveal className="lg:col-span-8">
          <h2 id="platform-heading" className={h2}>
            Every nonprofit rebuilds the same tools.
            <Accent className="mt-2 block text-[0.9em] leading-[1.02] text-cantaloupe-display">Let’s build them once.</Accent>
          </h2>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-3 lg:col-start-10 lg:self-end">
          <p className={lede}>
            Relay Collective is one open foundation that organizations share. Each service is a module on top of it, so the next one starts from what
            already works.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
