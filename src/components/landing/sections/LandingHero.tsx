import { ArrowRight, ArrowDown } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { HeroAccentComposition } from '../HeroAccentComposition'
import { LINKS, PARTNER, TRUST } from '../content'
import { Accent } from '../primitives'
import { container, ctaArrow, ctaGhost, ctaPrimary, display } from '../styles'

const enter = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties

// 01: the first five seconds. What it is, who it's for, and the handoff that becomes the brand.
export function LandingHero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-midnight text-white">
      <div className={`${container} relative pt-12 sm:pt-16 lg:min-h-[min(860px,calc(100svh-76px))] lg:pt-24`}>
        <div className="relative z-10 max-w-[900px]">
          <h1 id="hero-heading" className={`${display} text-[clamp(46px,7.2vw,104px)] leading-[0.94] text-white`}>
            <span className="rcl-enter block lg:whitespace-nowrap" style={enter(120)}>
              Technology that
            </span>
            <span className="rcl-enter block" style={enter(240)}>
              brings us <Accent className="pr-2 text-cantaloupe">together.</Accent>
            </span>
          </h1>

          <p className="rcl-enter mt-8 max-w-[520px] font-dm text-[17px] leading-[1.6] text-white/70 sm:text-lg" style={enter(420)}>
            A connected platform for nonprofits, volunteers, and communities to coordinate support, resources, and essential services — starting
            with rides.
          </p>

          <div className="rcl-enter mt-10 flex flex-col gap-3 sm:flex-row" style={enter(540)}>
            <Link to={LINKS.register} className={ctaPrimary}>
              Get Started <ArrowRight className={ctaArrow} aria-hidden />
            </Link>
            <a href="#showcase" className={ctaGhost}>
              Explore the Platform <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
            </a>
          </div>

          <p className="rcl-enter mt-12 flex max-w-[460px] items-start gap-3 font-dm text-sm leading-relaxed text-fog" style={enter(700)}>
            <span className="relative mt-[7px] flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-electric/60 motion-reduce:hidden" />
              <span className="relative h-2 w-2 rounded-full bg-electric" />
            </span>
            <span>
              In pilot with {PARTNER.name} – {PARTNER.program}, {PARTNER.place}.
            </span>
          </p>
        </div>

        {/* Below the actions on phones and tablets, cropped only by the right edge. From lg, the right half of the hero
            out to the screen's edge, pinned to its top-right corner so the corner crops it. --d is the drawing's side;
            --ct and --cr push the drawing past the box's top and right edges. */}
        <HeroAccentComposition className="relative -mx-4 mt-6 block h-[calc(min(100vw,560px)*1.06)] overflow-hidden [--cr:calc(var(--d)*-0.05)] [--ct:calc(var(--d)*0.12)] [--d:min(100vw,560px)] sm:-mx-6 lg:absolute lg:inset-y-0 lg:left-1/2 lg:right-[calc(50%-50vw)] lg:mx-0 lg:mt-0 lg:h-auto lg:overflow-visible lg:[--cr:calc(var(--d)*-0.09)] lg:[--ct:calc(var(--d)*-0.05)] lg:[--d:min(100cqw,100cqh)] lg:[clip-path:inset(0_0_0_-50vw)] lg:[container-type:size] xl:[--d:min(108cqw,104cqh)]" />
      </div>

      {/* Trust: what's true, in words, where a template would put invented numbers */}
      <div className="relative z-10 border-t border-white/10">
        <dl className={`${container} grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12`}>
          {TRUST.map((t, i) => (
            <div key={t.label} className={`rcl-enter lg:border-l lg:border-white/10 lg:pl-8 ${i === 0 ? 'lg:border-l-0 lg:pl-0' : ''}`} style={enter(820 + i * 80)}>
              <dt className="font-dm text-xs font-medium uppercase tracking-[0.18em] text-fog">{t.label}</dt>
              <dd className="mt-2 font-grotesk text-[17px] font-medium leading-snug tracking-[-0.02em] text-white sm:text-lg">{t.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
