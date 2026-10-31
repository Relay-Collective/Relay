import { ArrowDown, ArrowRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { HeroProductExperience } from '../HeroProductExperience'
import { LINKS, PARTNER } from '../content'
import { Accent } from '../primitives'
import { container, ctaArrow, ctaArrowDown, ctaGhost, ctaPrimary, display, focusRing } from '../styles'

const enter = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties

// 01: the first five seconds. What it is, who it's for, the two ways forward, and one ride playing out beside it.
export function LandingHero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate bg-porcelain">
      <div
        className={`${container} grid items-center gap-14 pb-20 pt-10 sm:pt-14 md:gap-16 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] lg:gap-10 lg:pb-28 lg:pt-16 xl:gap-16 xl:pt-20`}
      >
        <div>
          <h1 id="hero-heading" className={`${display} text-[clamp(44px,6.2vw,92px)] leading-[0.95] lg:text-[clamp(56px,5.5vw,88px)]`}>
            <span className="rcl-enter block" style={enter(80)}>
              Technology that
            </span>
            <span className="rcl-enter block" style={enter(180)}>
              brings us <Accent className="pr-1 text-cantaloupe-display">together.</Accent>
            </span>
          </h1>

          <p className="rcl-enter mt-7 max-w-[34ch] font-dm text-[18px] leading-[1.6] text-midnight-soft sm:text-[20px]" style={enter(320)}>
            A connected platform for nonprofits, volunteers, and communities to coordinate support, resources, and essential services.
          </p>

          <div className="rcl-enter mt-9 flex flex-col gap-3 sm:flex-row" style={enter(440)}>
            <Link to={LINKS.register} className={ctaPrimary}>
              Get Started <ArrowRight className={ctaArrow} aria-hidden />
            </Link>
            <a href="#platform" className={ctaGhost}>
              Explore the Platform <ArrowDown className={ctaArrowDown} aria-hidden />
            </a>
          </div>

          <p className="rcl-enter mt-5 font-dm text-[15px] text-midnight-soft" style={enter(500)}>
            Want to drive?{' '}
            <Link to={LINKS.registerDriver} className={`rounded font-semibold text-midnight underline decoration-electric decoration-2 underline-offset-[5px] hover:decoration-midnight ${focusRing}`}>
              Volunteer as a driver
            </Link>
          </p>

          <p className="rcl-enter mt-10 flex max-w-[44ch] items-start gap-3 font-dm text-[14px] leading-relaxed text-hush" style={enter(560)}>
            <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-electric" aria-hidden />
            <span>
              In pilot with {PARTNER.name} — {PARTNER.program}, {PARTNER.place}.
            </span>
          </p>
        </div>

        <div className="max-w-[640px] md:mx-auto md:w-full lg:mx-0 lg:max-w-none">
          <HeroProductExperience />
        </div>
      </div>
    </section>
  )
}
