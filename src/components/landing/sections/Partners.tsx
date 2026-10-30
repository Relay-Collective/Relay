import { MapPin } from 'lucide-react'
import { PARTNER, PARTNERSHIP } from '../content'
import { Reveal } from '../primitives'
import { container, eyebrow, h2, lead, sectionY } from '../styles'

// 06: the organization we build alongside. A partner, named in text only: no partner logos (see DESIGN.md)
export function Partners() {
  return (
    <section id="partners" aria-labelledby="partners-heading" className={`scroll-mt-20 border-t border-rc-line bg-white ${sectionY}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-10`}>
        <Reveal className="lg:col-span-5">
          <p className={eyebrow}>Our partners</p>
          <h2 id="partners-heading" className={`${h2} mt-5`}>
            Built in partnership with {PARTNER.name}.
          </h2>
          <p className={`${lead} mt-6`}>
            {PARTNER.name} is our partner, not just an organization we once worked with. Their front-line teams helped decide what we build, and
            they’re where it gets tested first.
          </p>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-rc-line bg-white shadow-[0_24px_60px_-30px_rgba(16,27,82,0.35)]">
            <div className="relative overflow-hidden bg-rc-navy px-6 py-8 text-white sm:px-8 sm:py-10">
              <span
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,185,207,0.28),transparent_70%)]"
                aria-hidden
              />
              <span className="relative inline-flex items-center gap-1.5 rounded-full bg-rc-teal/20 px-2.5 py-1 text-xs font-semibold text-rc-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-rc-teal" aria-hidden />
                {PARTNER.role}
              </span>
              <p className="relative mt-5 font-heading text-[30px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[38px]">{PARTNER.name}</p>
              <p className="relative mt-2 text-lg font-medium text-white/85">{PARTNER.program}</p>
              <p className="relative mt-3 flex items-center gap-1.5 text-sm text-white/70">
                <MapPin className="h-4 w-4" aria-hidden /> {PARTNER.place}
              </p>
            </div>

            <ul className="divide-y divide-rc-line">
              {PARTNERSHIP.map(({ title, text, icon: Icon }) => (
                <li key={title} className="flex gap-4 px-6 py-6 sm:px-8">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rc-mint text-rc-teal-ink" aria-hidden>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-rc-navy">{title}</h3>
                    <p className="mt-1 text-[16px] leading-relaxed text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Relay Collective is an independent platform. {PARTNER.name} is our partner, not our owner, and we don’t speak on their behalf.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
