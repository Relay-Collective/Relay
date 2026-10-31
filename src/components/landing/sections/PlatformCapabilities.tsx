import { ArrowRight } from 'lucide-react'
import { CAPABILITIES, LINKS, type Capability } from '../content'
import { Accent, Reveal, SmartLink, StatusTag } from '../primitives'
import { container, display, eyebrow, focusRing, focusRingOnLight } from '../styles'

// The real ride lifecycle, in the same words the app uses on its status badges
const RIDE_STATES = ['Finding a driver', 'Driver confirmed', 'Picked up', 'Completed']

const byId = Object.fromEntries(CAPABILITIES.map((c) => [c.id, c])) as Record<string, Capability>

// 03: four services on one foundation, laid out as a bento so the live one leads.
export function PlatformCapabilities() {
  const transport = byId.transport
  const volunteers = byId.volunteers
  const organizations = byId.organizations
  const grow = byId.grow
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="scroll-mt-16 bg-porcelain py-24 text-graphite sm:py-28 lg:py-36">
      <div className={container}>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={`${eyebrow} text-electric-ink`}>Solutions</p>
            <h2 id="solutions-heading" className={`${display} mt-6 text-[40px] leading-[1] text-graphite sm:text-[52px] lg:text-[60px]`}>
              One foundation. <Accent className="text-graphite">Many services.</Accent>
            </h2>
          </div>
          <p className="max-w-sm font-dm text-[17px] leading-relaxed text-graphite/75">
            Transportation is working today. Everything else is built on the same accounts, roles, and requests.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          {/* Transportation: the live service, so it gets the most room and the clearest picture */}
          <Reveal as="article" className="lg:col-span-7 lg:row-span-2" aria-labelledby="cap-transport">
            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-midnight p-7 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-10">
              <span
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-electric/30 transition-transform duration-700 group-hover:scale-110"
                aria-hidden
              />
              <span className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-electric/20" aria-hidden />
              <CardHead capability={transport} n="01" />
              <h3 id="cap-transport" className={`${display} mt-10 text-[44px] leading-[0.98] text-white sm:text-[64px]`}>
                {transport.title}
              </h3>
              <p className="mt-5 max-w-md font-dm text-[17px] leading-relaxed text-white/70">{transport.text}</p>

              <ol className="mt-auto grid gap-3 pt-12 sm:grid-cols-4 sm:gap-0" aria-label="A ride, from request to drop-off">
                {RIDE_STATES.map((s, i) => (
                  <li key={s} className="relative flex items-center gap-3 sm:block">
                    <span className="relative z-10 flex h-3 w-3 items-center justify-center" aria-hidden>
                      <span className={`h-3 w-3 rounded-full ${i === RIDE_STATES.length - 1 ? 'bg-cantaloupe' : i === 0 ? 'border-2 border-electric bg-midnight' : 'bg-electric'}`} />
                    </span>
                    {i < RIDE_STATES.length - 1 && <span className="absolute left-3 top-[5px] hidden h-[2px] w-[calc(100%-12px)] bg-electric/40 sm:block" aria-hidden />}
                    <span className="font-dm text-sm text-white/80 sm:mt-4 sm:block">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t border-white/10 pt-6">
                <SmartLink
                  href={LINKS.transportTour}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full font-dm text-[15px] font-semibold text-white ${focusRing}`}
                >
                  Take the transportation tour <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </SmartLink>
              </div>
            </div>
          </Reveal>

          <Reveal as="article" delay={100} className="lg:col-span-5" aria-labelledby="cap-volunteers">
            <div className="group flex h-full flex-col rounded-2xl border border-graphite/10 bg-white p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cantaloupe/50 sm:p-9">
              <CardHead capability={volunteers} n="02" onLight />
              <h3 id="cap-volunteers" className={`${display} mt-10 text-[34px] leading-[1] text-graphite sm:text-[40px]`}>
                {volunteers.title}
              </h3>
              <p className="mt-4 font-dm text-[16px] leading-relaxed text-graphite/75">{volunteers.text}</p>
              <div className="mt-6">
                <SmartLink
                  href={LINKS.registerDriver}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full font-dm text-[15px] font-semibold text-cantaloupe-ink ${focusRingOnLight}`}
                >
                  Volunteer as a driver <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </SmartLink>
              </div>
            </div>
          </Reveal>

          <Reveal as="article" delay={180} className="lg:col-span-5" aria-labelledby="cap-orgs">
            <div className="group flex h-full flex-col rounded-2xl bg-midnight-800 p-7 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-9">
              <CardHead capability={organizations} n="03" />
              <h3 id="cap-orgs" className={`${display} mt-10 text-[34px] leading-[1] text-white sm:text-[40px]`}>
                {organizations.title}
              </h3>
              <p className="mt-4 font-dm text-[16px] leading-relaxed text-white/70">{organizations.text}</p>
            </div>
          </Reveal>

          {/* The vision: drawn in outline, so it never reads as something you can use today */}
          <Reveal as="article" delay={120} className="lg:col-span-12" aria-labelledby="cap-grow">
            <div className="group grid gap-8 rounded-2xl border border-dashed border-graphite/25 p-7 sm:p-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <CardHead capability={grow} n="04" onLight />
                <h3 id="cap-grow" className={`${display} mt-10 text-[34px] leading-[1] text-graphite sm:text-[40px]`}>
                  {grow.title}
                </h3>
                <p className="mt-4 max-w-lg font-dm text-[16px] leading-relaxed text-graphite/75">{grow.text}</p>
              </div>
              <GrowthDiagram />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function CardHead({ capability, n, onLight = false }: { capability: Capability; n: string; onLight?: boolean }) {
  const Icon = capability.icon
  const iconTone = capability.accent === 'cantaloupe' ? (onLight ? 'text-cantaloupe-ink' : 'text-cantaloupe') : onLight ? 'text-electric-ink' : 'text-electric'
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 ${onLight ? 'bg-graphite/[0.05]' : 'bg-white/[0.06]'} ${iconTone}`}
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </span>
        <p className={`font-dm text-sm font-medium ${onLight ? 'text-graphite/75' : 'text-white/70'}`}>
          <span className="tabular-nums" aria-hidden>
            {n} ·{' '}
          </span>
          {capability.area}
        </p>
      </div>
      <StatusTag availability={capability.availability} onLight={onLight}>
        {capability.status}
      </StatusTag>
    </div>
  )
}

// Layers stacking on one base: the foundation stays, the services above it grow
function GrowthDiagram() {
  const layers = [
    { label: 'Transportation', tone: 'bg-electric text-midnight' },
    { label: 'Volunteer roles', tone: 'border border-dashed border-graphite/40 text-graphite/80' },
    { label: 'Resource sharing', tone: 'border border-dashed border-graphite/40 text-graphite/80' },
    { label: 'Cross-organization services', tone: 'border border-dashed border-graphite/40 text-graphite/80' },
  ]
  return (
    <div className="lg:col-span-5 lg:col-start-8" aria-hidden>
      <div className="flex flex-col-reverse gap-2">
        <div className="rounded-lg bg-graphite px-4 py-3 font-dm text-sm font-medium text-white">
          Shared foundation <span className="text-fog">· organizations, roles, requests</span>
        </div>
        {layers.map((l, i) => (
          <div
            key={l.label}
            className={`rounded-lg px-4 py-2.5 font-dm text-sm font-medium transition-transform duration-500 group-hover:translate-x-[var(--shift)] ${l.tone}`}
            style={{ marginLeft: `${(i + 1) * 6}%`, ['--shift' as string]: `${(i + 1) * 4}px` }}
          >
            {l.label}
          </div>
        ))}
      </div>
    </div>
  )
}
