import { IMPACT_POINTS } from '../content'
import { Accent, Reveal } from '../primitives'
import { container, display, eyebrow } from '../styles'

// A line of people, each connected to the next, passing something along. One of them is warm.
const NODES = Array.from({ length: 13 }, (_, i) => ({ x: 40 + i * 110, y: 70 + Math.sin(i * 0.9) * 34 }))

// 06: why it matters. Words instead of numbers: we only publish figures we can stand behind.
export function ImpactSection() {
  return (
    <section id="impact" aria-labelledby="impact-heading" className="relative scroll-mt-16 overflow-hidden bg-midnight py-24 text-white sm:py-28 lg:py-40">
      <div className={container}>
        <Reveal>
          <p className={`${eyebrow} text-electric`}>Impact</p>
          <h2 id="impact-heading" className={`${display} mt-8 text-[44px] leading-[0.98] sm:text-[68px] lg:text-[104px]`}>
            <span className="block text-white/45">Technology is powerful.</span>
            <span className="block text-white">
              Connection changes <Accent className="text-electric-soft lg:block">everything.</Accent>
            </span>
          </h2>
        </Reveal>
      </div>

      <Reveal className="relative mt-16 lg:mt-20">
        <svg viewBox="0 0 1440 140" className="h-[90px] w-full sm:h-[140px]" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
          <path
            d={NODES.map((n, i) => `${i ? 'L' : 'M'}${n.x} ${n.y}`).join('')}
            fill="none"
            stroke="#0297de"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          <path
            d={NODES.map((n, i) => `${i ? 'L' : 'M'}${n.x} ${n.y}`).join('')}
            pathLength={1}
            className="rcl-relay"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={i === 8 ? 6 : 4} fill={i === 8 ? '#fc734d' : '#02070a'} stroke={i === 8 ? 'none' : '#0297de'} strokeWidth="1.5" />
          ))}
        </svg>
      </Reveal>

      <div className={`${container} mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8`}>
        <Reveal className="lg:col-span-4">
          <p className="font-grotesk text-2xl font-medium leading-snug tracking-[-0.02em] text-white sm:text-[28px]">
            Relay Collective exists to help organizations spend less time coordinating and more time supporting their communities.
          </p>
        </Reveal>
        <ul className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:col-span-7 lg:col-start-6">
          {IMPACT_POINTS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 100} className="border-t border-white/15 pt-6">
              <h3 className="font-grotesk text-lg font-semibold tracking-[-0.02em] text-white">{p.title}</h3>
              <p className="mt-3 font-dm text-[15px] leading-relaxed text-white/65">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
