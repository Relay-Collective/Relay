import { ArrowRight, Check } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { FOUNDATION, LINKS, MODULES } from '../content'
import { ExternalIcon, Reveal, SmartLink, StatusPill } from '../primitives'
import { container, ctaArrow, ctaOnDark, ctaOutlineOnDark, sectionY } from '../styles'

const focusOnDark = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-rc-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-rc-navy'

// 04: the platform as layers. Pick a module and the foundation services it builds on light up.
export function Platform() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const mod = MODULES[selected]
  const ModIcon = mod.icon

  // Tabs pattern: arrows move between modules, Home and End jump to the ends
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = MODULES.length - 1
    const next = { ArrowRight: selected + 1, ArrowDown: selected + 1, ArrowLeft: selected - 1, ArrowUp: selected - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    const i = next > last ? 0 : next < 0 ? last : next
    setSelected(i)
    tabs.current[i]?.focus()
  }

  return (
    <section id="platform" aria-labelledby="platform-heading" className={`relative scroll-mt-20 overflow-hidden bg-rc-navy text-white ${sectionY}`}>
      {/* Blueprint grid, fading toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        aria-hidden
      />

      <div className={`${container} relative`}>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-rc-cyan sm:text-[13px]">The platform</p>
            <h2
              id="platform-heading"
              className="mt-5 font-heading text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance text-white sm:text-[44px] lg:text-[50px]"
            >
              Technology designed to work together.
            </h2>
          </div>
          <p className="text-[17px] leading-relaxed text-slate-300 sm:text-lg lg:col-span-5 lg:text-[19px]">
            A modular platform: one shared foundation, with service modules on top. Each new module starts from what the others already proved.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* The stack: modules above, foundation below */}
          <div className="lg:col-span-7">
            <p id="modules-label" className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Service modules
            </p>
            <div role="tablist" aria-labelledby="modules-label" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {MODULES.map((m, i) => {
                const Icon = m.icon
                const on = i === selected
                return (
                  <button
                    key={m.id}
                    ref={(el) => {
                      tabs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`module-tab-${m.id}`}
                    aria-selected={on}
                    aria-controls="module-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setSelected(i)}
                    onKeyDown={onKeyDown}
                    className={`group flex min-h-[7.5rem] flex-col items-start justify-between gap-3 rounded-2xl border p-4 text-left transition duration-300 ${focusOnDark} ${
                      on ? 'border-rc-cyan/70 bg-white/[0.09] shadow-[0_0_0_1px_rgba(24,185,207,0.35),0_18px_40px_-20px_rgba(24,185,207,0.5)]' : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${on ? 'bg-rc-cyan text-rc-navy' : 'bg-white/10 text-white'}`} aria-hidden>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-heading text-[15px] font-bold leading-tight">{m.short}</span>
                      <span className={`mt-1 block text-xs font-medium ${m.availability === 'live' ? 'text-rc-cyan' : 'text-slate-400'}`}>
                        {m.availability === 'live' ? 'Working MVP' : 'Planned'}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Where the selected module plugs into the foundation */}
            <div className="grid h-12 grid-cols-2 sm:grid-cols-4" aria-hidden>
              {MODULES.map((m, i) => (
                <span key={m.id} className="relative flex justify-center max-sm:hidden">
                  <svg className="h-full w-2" viewBox="0 0 8 48" preserveAspectRatio="none">
                    <line x1="4" y1="0" x2="4" y2="48" stroke={i === selected ? '#18b9cf' : 'rgba(255,255,255,0.14)'} strokeWidth="2" />
                    {i === selected && <line x1="4" y1="0" x2="4" y2="48" stroke="#ffffff" strokeWidth="2" className="rc-flow" />}
                  </svg>
                </span>
              ))}
              <span className="col-span-2 flex justify-center sm:hidden">
                <span className="h-full w-0.5 bg-rc-cyan" />
              </span>
            </div>

            <div className="rounded-2xl border border-white/12 bg-linear-to-b from-white/[0.07] to-white/[0.02] p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-heading text-lg font-bold">Shared foundation</p>
                <p className="text-sm text-slate-400">
                  Used by <span className="font-semibold text-white">{mod.short}</span>: {mod.uses.length} of {FOUNDATION.length}
                </p>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {FOUNDATION.map((f) => {
                  const Icon = f.icon
                  const used = mod.uses.includes(f.id)
                  return (
                    <li
                      key={f.id}
                      className={`flex min-h-12 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[13px] font-semibold leading-tight transition duration-300 sm:text-sm ${
                        used ? 'border-rc-cyan/45 bg-rc-cyan/10 text-white' : 'border-white/8 text-slate-500'
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${used ? 'text-rc-cyan' : 'text-slate-600'}`} aria-hidden />
                      {f.label}
                      <span className="sr-only">{used ? ' (used by this module)' : ''}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* What the selected module is, and what you can do about it */}
          <div
            id="module-panel"
            role="tabpanel"
            aria-labelledby={`module-tab-${mod.id}`}
            tabIndex={0}
            className={`rounded-2xl border border-white/10 bg-rc-navy-deep/60 p-6 sm:p-8 lg:col-span-5 ${focusOnDark}`}
          >
            <div key={mod.id} className="flex h-full animate-fade-up flex-col [animation-duration:450ms]">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-rc-cyan" aria-hidden>
                  <ModIcon className="h-6 w-6" />
                </span>
                <StatusPill availability={mod.availability} onDark>
                  {mod.availability === 'live' ? 'Working MVP' : 'Planned: not available yet'}
                </StatusPill>
              </div>
              <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-white sm:text-[28px]">{mod.name}</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-slate-300">{mod.description}</p>
              <ul className="mt-6 space-y-3">
                {mod.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-slate-200">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${mod.availability === 'live' ? 'text-rc-cyan' : 'text-slate-500'}`} aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
                {mod.availability === 'live' ? (
                  <>
                    <SmartLink href={LINKS.transportTour} className={ctaOnDark}>
                      See how it works <ArrowRight className={ctaArrow} aria-hidden />
                    </SmartLink>
                    <SmartLink href={LINKS.registerOrg} className={ctaOutlineOnDark}>
                      Register your organization
                    </SmartLink>
                  </>
                ) : (
                  <SmartLink href={LINKS.repo} className={ctaOutlineOnDark}>
                    Help shape this module <ExternalIcon />
                  </SmartLink>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
