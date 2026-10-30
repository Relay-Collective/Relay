import { ArrowRight } from 'lucide-react'
import { LINKS } from '../content'
import { ExternalIcon, Reveal, SmartLink } from '../primitives'
import { container, ctaArrow, ctaOnDark, ctaOutlineOnDark } from '../styles'

// A sparse constellation behind the closing statement: the network, seen from further away
const STARS: [number, number][] = [
  [80, 90], [220, 40], [340, 150], [140, 260], [60, 380], [300, 330],
  [1100, 70], [980, 170], [1160, 260], [1040, 350], [900, 300], [1180, 420],
]
const STAR_LINKS: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 5], [3, 4], [2, 5],
  [6, 7], [7, 8], [7, 10], [8, 9], [9, 10], [9, 11],
]

// 09: the closing invitation
export function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-rc-navy py-28 text-white sm:py-32 lg:py-40">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1240 460" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {STAR_LINKS.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={STARS[a][0]} y1={STARS[a][1]} x2={STARS[b][0]} y2={STARS[b][1]} stroke="#18b9cf" strokeOpacity="0.22" strokeWidth="1" />
        ))}
        {STARS.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill={i % 3 === 0 ? '#18b9cf' : '#2251e8'} />
            {i % 4 === 0 && <circle cx={x} cy={y} r="6" fill="none" stroke="#18b9cf" strokeWidth="1" className="rc-pulse" />}
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(34,81,232,0.35),transparent)]" aria-hidden />

      <Reveal className={`${container} relative text-center`}>
        <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-rc-cyan sm:text-[13px]">Stronger communities. Built together.</p>
        <h2
          id="cta-heading"
          className="mx-auto mt-6 max-w-[18ch] font-heading text-[38px] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance text-white sm:text-[52px] lg:text-[64px]"
        >
          The future of community support is connected.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-[19px]">
          Help us build the tools that allow more organizations to do more good, together.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 min-[440px]:flex-row">
          <SmartLink href="#get-involved" className={`${ctaOnDark} min-h-14 px-7 text-[17px]`}>
            Get involved <ArrowRight className={ctaArrow} aria-hidden />
          </SmartLink>
          <SmartLink href={LINKS.github} className={`${ctaOutlineOnDark} min-h-14 px-7 text-[17px]`}>
            Explore GitHub <ExternalIcon />
          </SmartLink>
        </div>
      </Reveal>
    </section>
  )
}
