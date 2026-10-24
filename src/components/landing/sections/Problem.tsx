import { Unlink } from 'lucide-react'
import { MISSION, PROBLEMS } from '../content'
import { Reveal } from '../primitives'
import { container, eyebrow, h2, sectionY } from '../styles'

// Three organizations, each with its own tools, and no bridge between them. Generic examples, not real partners.
const SILOS: { org: string; tools: string[] }[] = [
  { org: 'Housing program', tools: ['Spreadsheet', 'Phone list'] },
  { org: 'Food bank', tools: ['Email thread', 'Sign-up sheet'] },
  { org: 'Health clinic', tools: ['Shared drive', 'Paper forms'] },
]

function Silos() {
  return (
    <figure className="relative">
      <div className="grid grid-cols-3 gap-3 sm:gap-6" aria-hidden>
        {SILOS.map((silo, i) => (
          <div key={silo.org} className="relative">
            {/* A bridge that never reaches the next organization */}
            {i < SILOS.length - 1 && (
              <span className="absolute left-[calc(100%-0.25rem)] top-6 flex w-5 items-center sm:w-8">
                <span className="h-px flex-1 border-t border-dashed border-slate-300" />
              </span>
            )}
            <div className="flex min-h-12 items-center justify-center rounded-xl bg-rc-navy px-2 py-2.5 text-center font-heading text-[12px] font-bold leading-tight text-white sm:text-sm">
              {silo.org}
            </div>
            <span className="mx-auto block h-5 w-px bg-slate-300" />
            <ul className="space-y-2">
              {silo.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-lg border border-dashed border-slate-300 bg-white px-2 py-2 text-center text-[11px] font-medium text-slate-500 sm:text-[13px]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-500" aria-hidden>
        <Unlink className="h-4 w-4 text-rc-teal-ink" />
        No shared view across organizations
      </div>
      <figcaption className="sr-only">
        An illustration of three organizations, a housing program, a food bank, and a health clinic, each using its own separate tools with no
        connection between them.
      </figcaption>
    </figure>
  )
}

// 02: why the work is harder than it needs to be. Ends on why we exist.
export function Problem() {
  return (
    <section id="mission" aria-labelledby="problem-heading" className={`scroll-mt-20 border-y border-rc-line bg-rc-canvas ${sectionY}`}>
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>The challenge</p>
          <h2 id="problem-heading" className={`${h2} mt-5 max-w-[22ch]`}>
            The problem isn’t a lack of people who care.{' '}
            <span className="text-slate-400">It’s how disconnected their efforts can be.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5 lg:self-center" delay={100}>
            <Silos />
          </Reveal>

          <ol className="lg:col-span-6 lg:col-start-7">
            {PROBLEMS.map((p, i) => (
              <li key={p.title} className="border-t border-rc-line first:border-t-0 first:pt-0 not-first:pt-8 not-last:pb-8">
                <Reveal delay={i * 90} className="grid grid-cols-[3.25rem_1fr] gap-x-4 sm:grid-cols-[4.5rem_1fr]">
                  <span className="font-heading text-3xl font-extrabold tracking-tight text-rc-teal sm:text-4xl" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold tracking-tight text-rc-navy sm:text-[22px]">{p.title}</h3>
                    <p className="mt-2 text-[17px] leading-relaxed text-slate-600">{p.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* The turn in the story: why Relay Collective exists */}
        <Reveal className="mt-20 lg:mt-28">
          <div className="grid gap-6 border-t-2 border-rc-navy pt-10 lg:grid-cols-12 lg:gap-10">
            <p className={`${eyebrow} lg:col-span-3`}>Our mission</p>
            <blockquote className="font-heading text-2xl font-semibold leading-snug tracking-[-0.015em] text-balance text-rc-navy sm:text-[28px] lg:col-span-9 lg:text-[32px]">
              {MISSION}
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
