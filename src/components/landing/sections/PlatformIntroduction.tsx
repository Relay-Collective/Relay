import { CAPABILITIES } from '../content'
import { Accent, Reveal } from '../primitives'
import { container, eyebrow, h2 } from '../styles'

// 02: the turn from midnight to porcelain. Rides are the first service, not the whole idea.
export function PlatformIntroduction() {
  return (
    <section id="platform" aria-labelledby="platform-heading" className="scroll-mt-16 bg-porcelain pt-24 text-graphite sm:pt-28 lg:pt-40">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-8`}>
        <Reveal className="lg:col-span-8">
          <p className={`${eyebrow} text-electric-ink`}>Platform</p>
          <h2 id="platform-heading" className={`${h2} mt-6 text-graphite`}>
            Beyond rides.
            <Accent className="mt-2 block text-[0.86em] leading-[1.02] text-cantaloupe-ink">A shared infrastructure for greater impact.</Accent>
          </h2>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-3 lg:col-start-10 lg:self-end">
          <p className="font-dm text-xl leading-[1.5] text-graphite/80 lg:text-[22px]">
            Coordinate people, services, and resources across your organization — all in one place.
          </p>
        </Reveal>
      </div>

      {/* The service line: one rail, four stops. Solid stops work today; the dashed one is where it's going. */}
      <Reveal delay={200} className={`${container} mt-20 lg:mt-28`}>
        <ol className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:border-t sm:border-graphite/15 sm:pt-8" aria-label="Services on the platform">
          {CAPABILITIES.map((c, i) => (
            <li key={c.id} className="relative border-t border-graphite/15 pr-4 pt-6 sm:border-0 sm:pt-0">
              <span
                className={`absolute -top-[5px] left-0 sm:-top-[37px] h-[9px] w-[9px] rounded-full ${
                  c.availability === 'planned'
                    ? 'border border-dashed border-graphite/60 bg-porcelain'
                    : c.accent === 'cantaloupe'
                      ? 'bg-cantaloupe'
                      : 'bg-electric'
                }`}
                aria-hidden
              />
              <p className="font-dm text-xs font-medium tabular-nums text-graphite/70">0{i + 1}</p>
              <p className="mt-1 font-grotesk text-lg font-medium tracking-[-0.02em] text-graphite">{c.area}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}
