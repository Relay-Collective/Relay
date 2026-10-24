import { Accessibility, ArrowRight, Boxes, Check, HandHeart, HeartHandshake, Home, Route } from 'lucide-react'
import { LINKS, STORY_STEPS, TEAM } from '../content'
import { Reveal, SmartLink } from '../primitives'
import { container, eyebrow, h2, lead, sectionY, textLink } from '../styles'

const TRACK = ['Requested', 'Confirmed', 'Picked up', 'Arrived']
const TRACK_DONE = 2

// A faithful sketch of a ride in the transportation app, with made-up example details
function RideSketch() {
  return (
    <div
      role="img"
      aria-label="Illustration of the transportation app: a ride request from a housing program to a hospital appointment, with a driver confirmed. Example data."
      className="relative rounded-2xl border border-rc-line bg-white p-5 shadow-[0_24px_60px_-30px_rgba(16,27,82,0.35)] sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <span className="flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          <span className="h-2 w-2 rounded-full bg-rc-teal" />
          Ride request · 9:15 AM
        </span>
        <span className="rounded-full bg-rc-mint px-2.5 py-1 text-xs font-semibold text-rc-teal-ink">Driver confirmed</span>
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-x-2 font-heading text-lg font-bold text-rc-navy sm:text-xl">
        Housing program <ArrowRight className="h-4 w-4 text-rc-blue" /> Hospital
      </p>
      <p className="mt-1.5 flex items-center gap-2 text-sm text-slate-500">
        <Accessibility className="h-4 w-4" /> Wheelchair accessible · Meets at the front desk
      </p>
      <ol className="mt-5 grid grid-cols-4 border-t border-rc-line pt-4">
        {TRACK.map((step, i) => {
          const done = i < TRACK_DONE
          return (
            <li key={step} className="relative flex flex-col items-center text-center">
              {i > 0 && <span className={`absolute right-1/2 top-2.75 h-0.5 w-full ${i < TRACK_DONE ? 'bg-rc-teal' : 'bg-rc-line'}`} />}
              <span
                className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 ${done ? 'border-rc-teal bg-rc-teal text-white' : 'border-rc-line bg-white'}`}
              >
                {done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <span className={`mt-2 text-[11px] font-semibold sm:text-xs ${done ? 'text-rc-navy' : 'text-slate-400'}`}>{step}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

// Where it goes next: the same foundation, more kinds of help around it
const NEXT_NODES = [
  { label: 'Volunteers', icon: HandHeart },
  { label: 'Resources', icon: Boxes },
  { label: 'Partners', icon: HeartHandshake },
  { label: 'Services', icon: Home },
]

function GrowingNetwork() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-rc-mint p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rc-teal-ink">Where it’s going</p>
      <div className="relative mt-5" aria-hidden>
        {/* The line every future module hangs from */}
        <span className="absolute left-6 right-6 top-6 h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-rc-teal)_0_6px,transparent_6px_12px)] opacity-50" />
        <ul className="relative grid grid-cols-5 gap-1">
          <li className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rc-teal text-white shadow-[0_0_0_6px_rgba(0,141,130,0.15)]">
              <Route className="h-5 w-5" />
            </span>
            <span className="mt-2 text-[11px] font-bold text-rc-navy sm:text-xs">Transport</span>
          </li>
          {NEXT_NODES.map(({ label, icon: Icon }) => (
            <li key={label} className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-rc-teal/50 bg-white text-rc-teal-ink">
                <Icon className="h-5 w-5" />
              </span>
              <span className="mt-2 text-[11px] font-semibold text-slate-600 sm:text-xs">{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-sm text-slate-600">
        <span className="font-semibold text-rc-navy">Transportation is live.</span> The dashed modules are planned, not built yet.
      </p>
    </div>
  )
}

// 05: the origin story, and how one ride became a broader mission
export function Story() {
  return (
    <section id="story" aria-labelledby="story-heading" className={`scroll-mt-20 bg-white ${sectionY}`}>
      <div className={`${container} grid gap-14 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-6">
          <Reveal>
            <p className={eyebrow}>Where it all started</p>
            <h2 id="story-heading" className={`${h2} mt-5`}>
              It started with a ride. It’s growing into something more.
            </h2>
            <p className={`${lead} mt-6 max-w-xl`}>
              People trying to reach hospitals, appointments, and housing services were missing them, not because help didn’t exist, but because they
              had no way to get there. So we started with getting there.
            </p>
          </Reveal>

          <ol className="relative mt-12 space-y-9 pl-10">
            <span className="absolute bottom-3 left-2.75 top-3 w-0.5 bg-linear-to-b from-rc-teal via-rc-teal to-rc-line" aria-hidden />
            {STORY_STEPS.map((s, i) => {
              const future = i === STORY_STEPS.length - 1
              return (
                <li key={s.title} className="relative">
                  <Reveal delay={i * 80}>
                    <span
                      className={`absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${
                        future ? 'border-2 border-dashed border-rc-teal bg-white' : 'bg-rc-teal'
                      }`}
                      aria-hidden
                    >
                      {!future && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rc-teal-ink">{s.label}</p>
                    <h3 className="mt-1 font-heading text-xl font-bold tracking-tight text-rc-navy">{s.title}</h3>
                    <p className="mt-1.5 max-w-lg text-[17px] leading-relaxed text-slate-600">{s.text}</p>
                  </Reveal>
                </li>
              )
            })}
          </ol>

          <Reveal className="mt-12 border-t border-rc-line pt-6 text-[15px] leading-relaxed text-slate-600">
            <p>
              Designed and built by{' '}
              {TEAM.map((m, i) => (
                <span key={m.handle}>
                  <SmartLink href={`https://github.com/${m.handle}`} className={textLink}>
                    {m.name}
                  </SmartLink>
                  {i < TEAM.length - 2 ? ', ' : i === TEAM.length - 2 ? ', and ' : '.'}
                </span>
              ))}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Relay Collective is an independent project. Naming the organizations we’ve worked with does not imply their endorsement.
            </p>
          </Reveal>
        </div>

        {/* The ride, turning into a network */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={120} className="lg:sticky lg:top-28">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Where we started</p>
            <RideSketch />
            <div className="flex h-14 justify-center" aria-hidden>
              <svg className="h-full w-2" viewBox="0 0 8 56" preserveAspectRatio="none">
                <line x1="4" y1="0" x2="4" y2="56" stroke="#e3e8f2" strokeWidth="2" />
                <line x1="4" y1="0" x2="4" y2="56" stroke="#008d82" strokeWidth="2" className="rc-flow" />
              </svg>
            </div>
            <GrowingNetwork />
            <p className="mt-4 text-sm text-slate-500">
              Want to see the real screens?{' '}
              <SmartLink href={LINKS.transportTour} className={textLink}>
                Walk through the transportation app
              </SmartLink>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
