import { PRINCIPLES } from '../content'
import { Reveal } from '../primitives'
import { container, eyebrow, h2, lead, sectionY } from '../styles'

// 07: the principles every product decision is checked against, each with what it looks like today
export function Principles() {
  return (
    <section id="principles" aria-labelledby="principles-heading" className={`scroll-mt-20 bg-white ${sectionY}`}>
      <div className={container}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className={eyebrow}>Our guiding principles</p>
            <h2 id="principles-heading" className={`${h2} mt-5`}>
              Technology should bring people closer, not create more barriers.
            </h2>
          </div>
          <p className={`${lead} lg:col-span-4 lg:self-end`}>Four commitments that shape what we build, and what we choose not to.</p>
        </Reveal>

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-8">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon
            return (
              <li key={p.title}>
                <Reveal delay={i * 90} className="flex h-full flex-col">
                  <div className="relative flex-1 border-t border-rc-line pt-6">
                    <span className="absolute -top-px left-0 h-[3px] w-12 bg-rc-teal" aria-hidden />
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm font-bold text-slate-400" aria-hidden>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Icon className="h-5 w-5 text-rc-teal-ink" aria-hidden />
                    </div>
                    <h3 className="mt-6 font-heading text-[22px] font-bold tracking-tight text-rc-navy">{p.title}</h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-slate-600">{p.text}</p>
                  </div>
                  <p className="mt-5 rounded-xl bg-rc-mint px-4 py-3.5 text-sm leading-relaxed text-slate-700">
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-rc-teal-ink">In practice</span>
                    <span className="mt-1 block">{p.practice}</span>
                  </p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
