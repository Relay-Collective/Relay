import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LINKS } from '../content'
import { Accent, ExternalIcon, Reveal, SmartLink } from '../primitives'
import { container, ctaArrow, ctaGhostOnBlue, ctaOnBlue, display } from '../styles'

const MORE: { label: string; href: string; external?: boolean }[] = [
  { label: 'Register your organization', href: LINKS.registerOrg },
  { label: 'Volunteer as a driver', href: LINKS.registerDriver },
  { label: 'Contribute on GitHub', href: LINKS.repo, external: true },
]

// 07: the close. Electric blue, the one loud surface on the page, after the quiet of the impact section.
// Midnight text on electric is 6.3:1; the white accent word is display size, where 3:1 is enough.
export function LandingCTA() {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-electric text-midnight">
      {/* Concentric arcs from the corner: the logo's two arcs, opened up into a road */}
      <svg
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] sm:h-[680px] sm:w-[680px] lg:-bottom-24 lg:-right-24 lg:h-[760px] lg:w-[760px]"
        fill="none"
        aria-hidden
        focusable="false"
      >
        {[80, 140, 200, 260, 320, 380, 440, 500].map((r, i) => (
          <circle key={r} cx="600" cy="600" r={r} stroke={i === 3 ? '#ffffff' : '#02070a'} strokeOpacity={i === 3 ? 0.9 : 0.16} strokeWidth={i === 3 ? 2 : 1} />
        ))}
        <circle cx={600 - 260 * Math.cos(Math.PI / 5)} cy={600 - 260 * Math.sin(Math.PI / 5)} r="7" fill="#02070a" />
      </svg>

      <div className={`${container} relative py-24 sm:py-28 lg:py-40`}>
        <Reveal className="max-w-4xl">
          <h2 id="cta-heading" className={`${display} text-[44px] leading-[0.98] text-midnight sm:text-[68px] lg:text-[96px]`}>
            Let’s build stronger communities. <Accent className="text-white">Together.</Accent>
          </h2>
          <p className="mt-8 max-w-xl font-dm text-lg leading-relaxed text-midnight/85 sm:text-xl">
            Bring your organization into a connected platform built for meaningful community impact.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to={LINKS.register} className={ctaOnBlue}>
              Get Started <ArrowRight className={ctaArrow} aria-hidden />
            </Link>
            <a href="#showcase" className={ctaGhostOnBlue}>
              Explore the Platform <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
            </a>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-midnight/20 pt-6">
            {MORE.map((m) => (
              <li key={m.label}>
                <SmartLink
                  href={m.href}
                  className="group inline-flex min-h-11 items-center gap-1.5 rounded font-dm text-[15px] font-semibold text-midnight underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight"
                >
                  {m.label}
                  {m.external ? <ExternalIcon /> : <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />}
                </SmartLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
