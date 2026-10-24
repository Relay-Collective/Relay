import { ArrowRight } from 'lucide-react'
import { AUDIENCES, LINKS, type Audience } from '../content'
import { ExternalIcon, Reveal, SmartLink } from '../primitives'
import { container, eyebrow, focusRing, h2, lead, sectionY, textLink } from '../styles'

const ACCENT: Record<Audience['accent'], { bar: string; icon: string; link: string }> = {
  blue: { bar: 'bg-rc-blue', icon: 'bg-rc-blue/10 text-rc-blue', link: 'text-rc-blue' },
  teal: { bar: 'bg-rc-teal', icon: 'bg-rc-mint text-rc-teal-ink', link: 'text-rc-teal-ink' },
  cyan: { bar: 'bg-rc-cyan', icon: 'bg-rc-cyan/12 text-[#0b7f8f]', link: 'text-[#0b6f7d]' },
  navy: { bar: 'bg-rc-navy', icon: 'bg-rc-navy/8 text-rc-navy', link: 'text-rc-navy' },
}

// 06: who Relay Collective is for, and the one thing each of them can do today
export function Audiences() {
  return (
    <section id="get-involved" aria-labelledby="audiences-heading" className={`scroll-mt-20 border-y border-rc-line bg-rc-canvas ${sectionY}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-10`}>
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className={eyebrow}>Get involved</p>
            <h2 id="audiences-heading" className={`${h2} mt-5`}>
              Better tools for the people doing the work.
            </h2>
            <p className={`${lead} mt-6`}>Relay Collective is built with and for the people who keep communities running. Here’s where you fit in.</p>
            <p className="mt-8 text-[15px] text-slate-600">
              Already part of Relay Collective?{' '}
              <SmartLink href={LINKS.signIn} className={textLink}>
                Sign in
              </SmartLink>
            </p>
          </div>
        </Reveal>

        <ul className="border-t border-rc-line lg:col-span-8">
          {AUDIENCES.map((a, i) => {
            const Icon = a.icon
            const accent = ACCENT[a.accent]
            return (
              <li key={a.title} className="border-b border-rc-line">
                <Reveal delay={i * 80}>
                  <div className="group relative grid gap-5 py-9 pl-5 transition-colors duration-300 hover:bg-white sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:py-10 sm:pl-6 sm:pr-6">
                    {/* Accent rule that grows as the row is hovered */}
                    <span
                      className={`absolute bottom-9 left-0 top-9 w-[3px] origin-top scale-y-[0.35] rounded-full transition-transform duration-500 group-hover:scale-y-100 group-focus-within:scale-y-100 ${accent.bar}`}
                      aria-hidden
                    />
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent.icon}`} aria-hidden>
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl font-bold tracking-tight text-rc-navy sm:text-[28px]">{a.title}</h3>
                      <p className="mt-2 text-lg font-medium text-slate-700">{a.text}</p>
                      <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-slate-600">{a.reason}</p>
                      <SmartLink
                        href={a.href}
                        className={`mt-5 inline-flex min-h-11 items-center gap-2 rounded-full font-semibold ${accent.link} ${focusRing} underline-offset-4 hover:underline`}
                      >
                        {a.cta}
                        {a.external ? <ExternalIcon /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />}
                      </SmartLink>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
