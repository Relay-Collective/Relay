import { CAPABILITIES, type Capability } from '../content'
import { Reveal, StatusPill } from '../primitives'
import { container, eyebrow, h2, lead, sectionY } from '../styles'

// Where each capability sits around the shared foundation on wide screens: a 35 / 30 / 35 grid, two rows
const PLACEMENT = ['lg:col-start-1 lg:row-start-1', 'lg:col-start-3 lg:row-start-1', 'lg:col-start-1 lg:row-start-2', 'lg:col-start-3 lg:row-start-2']
// Inner edge of each panel, in the same 0–100 space as the grid
const PORTS: [number, number][] = [
  [35, 25],
  [65, 25],
  [35, 75],
  [65, 75],
]

function CapabilityPanel({ cap, index }: { cap: Capability; index: number }) {
  const Icon = cap.icon
  const live = cap.availability === 'live'
  const left = index % 2 === 0
  return (
    <div className="relative h-full">
      {/* Phones: a dot on the shared spine. Wide screens: a port where the connection lands */}
      <span
        className={`absolute -left-[1.6rem] top-8 h-3 w-3 rounded-full border-2 border-white lg:top-1/2 lg:-translate-y-1/2 ${
          left ? 'lg:left-auto lg:right-[-0.375rem]' : 'lg:left-[-0.375rem]'
        } ${live ? 'bg-rc-teal' : 'bg-slate-300'}`}
        aria-hidden
      />
      <div
        className={`group h-full rounded-2xl border bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(16,27,82,0.35)] sm:p-7 ${
          live ? 'border-rc-teal/40' : 'border-rc-line'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${live ? 'bg-rc-mint text-rc-teal-ink' : 'bg-rc-canvas text-rc-blue'}`}
            aria-hidden
          >
            <Icon className="h-6 w-6" />
          </span>
          <StatusPill availability={cap.availability}>{cap.note}</StatusPill>
        </div>
        <h3 className="mt-6 font-heading text-[22px] font-bold tracking-tight text-rc-navy">{cap.title}</h3>
        <p className="mt-2 text-[17px] leading-relaxed text-slate-600">{cap.text}</p>
      </div>
    </div>
  )
}

// 03: Relay Collective as one foundation that many kinds of help can run on
export function Solution() {
  return (
    <section aria-labelledby="solution-heading" className={`relative scroll-mt-20 bg-white ${sectionY}`}>
      <div className={container}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className={eyebrow}>The approach</p>
            <h2 id="solution-heading" className={`${h2} mt-5`}>
              One foundation. Many ways to make a difference.
            </h2>
          </div>
          <p className={`${lead} lg:col-span-5`}>
            Instead of every organization building and maintaining its own tools, Relay Collective provides a shared layer they can all build on, so
            help can move between them.
          </p>
        </Reveal>

        <Reveal delay={120} className="relative mt-16 lg:mt-24">
          {/* Connections from the foundation out to each capability (wide screens) */}
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {PORTS.map(([x, y], i) => {
              const d = `M50,50 C${(50 + x) / 2},50 ${(50 + x) / 2},${y} ${x},${y}`
              const live = CAPABILITIES[i].availability === 'live'
              return (
                <g key={i}>
                  <path d={d} fill="none" stroke="#e3e8f2" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <path d={d} fill="none" stroke={live ? '#008d82' : '#8fa3d6'} strokeWidth="2" vectorEffect="non-scaling-stroke" className="rc-flow" />
                </g>
              )
            })}
          </svg>

          <div className="relative grid gap-5 border-l-2 border-dashed border-rc-line pl-6 lg:grid-cols-[35%_30%_35%] lg:grid-rows-2 lg:gap-0 lg:gap-y-0 lg:border-0 lg:pl-0">
            {/* The shared foundation: first on phones, the centre of everything on wide screens */}
            <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:items-center lg:justify-center">
              <span className="absolute -left-[1.85rem] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-[3px] border-white bg-rc-navy lg:hidden" aria-hidden />
              <div className="relative flex items-center gap-4 rounded-2xl bg-rc-navy p-5 text-white lg:aspect-square lg:w-[min(70%,12rem)] lg:flex-col lg:justify-center lg:gap-2 lg:rounded-full lg:p-6 lg:text-center">
                <span className="absolute inset-2 hidden rounded-full border border-dashed border-rc-cyan/40 lg:block" aria-hidden />
                <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-rc-cyan">Relay Collective</span>
                <span className="font-heading text-lg font-bold leading-tight lg:text-xl">One shared foundation</span>
              </div>
            </div>

            {CAPABILITIES.map((cap, i) => (
              <div key={cap.title} className={`${PLACEMENT[i]} lg:py-3`}>
                <CapabilityPanel cap={cap} index={i} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
