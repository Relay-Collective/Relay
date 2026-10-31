import { STEPS } from '../content'
import { Accent, Reveal } from '../primitives'
import { container, display, eyebrow } from '../styles'

// 05: three steps on one road line. The line draws itself once the steps come into view.
export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-16 bg-porcelain py-24 text-graphite sm:py-28 lg:py-36">
      <div className={container}>
        <Reveal className="max-w-3xl">
          <p className={`${eyebrow} text-electric-ink`}>How it works</p>
          <h2 id="how-heading" className={`${display} mt-6 text-[40px] leading-[1] text-graphite sm:text-[52px] lg:text-[60px]`}>
            From sign-up to <Accent className="text-cantaloupe-ink">showing up.</Accent>
          </h2>
        </Reveal>

        <Reveal className="relative mt-16 lg:mt-24">
          {/* The road: across on wide screens, down the left edge on phones */}
          <span className="absolute bottom-4 left-[5px] top-4 w-px bg-graphite/15 lg:hidden" aria-hidden>
            <span className="rcl-line absolute inset-0 bg-electric" />
          </span>
          <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-graphite/15 lg:block" aria-hidden>
            <span className="rcl-line absolute inset-0 bg-electric" />
          </span>

          <ol className="grid gap-14 lg:grid-cols-3 lg:gap-10">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative pl-10 lg:pl-0 lg:pt-14">
                <span
                  className={`absolute left-0 top-1 h-[11px] w-[11px] rounded-full lg:top-0 ${i === STEPS.length - 1 ? 'bg-cantaloupe' : 'bg-electric'}`}
                  aria-hidden
                />
                <p className="font-grotesk text-[72px] font-medium leading-none tracking-[-0.06em] text-graphite/90 tabular-nums sm:text-[96px]" aria-hidden>
                  {s.n}
                </p>
                <h3 className="mt-6 font-grotesk text-2xl font-semibold tracking-[-0.03em] text-graphite sm:text-[28px]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-3 max-w-sm font-dm text-[17px] leading-relaxed text-graphite/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
