import { ArrowRight } from 'lucide-react'
import { CAPABILITIES, LINKS, type Capability } from '../content'
import { Accent, Reveal, SmartLink, StatusTag } from '../primitives'
import { container, display, h2Small, textLink } from '../styles'

// The real ride lifecycle, in the same words the app uses on its status badges
const RIDE_STATES = ['Finding a driver', 'Driver confirmed', 'Picked up', 'Completed']

const byId = Object.fromEntries(CAPABILITIES.map((c) => [c.id, c])) as Record<string, Capability>

// 03: four services on one foundation. The live one leads with the most room; the planned one is drawn in outline.
export function PlatformCapabilities() {
  const { transport, volunteers, organizations, grow } = byId
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="scroll-mt-16 bg-porcelain pb-24 pt-20 sm:pb-28 lg:pb-36 lg:pt-28">
      <div className={container}>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="solutions-heading" className={h2Small}>
            One foundation. Many <Accent>services.</Accent>
          </h2>
          <p className="max-w-sm font-dm text-[17px] leading-relaxed text-midnight-soft">
            Transportation is working today. Everything else builds on the same accounts, roles, and requests.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12">
          {/* Transportation: the live service, so it gets the most room and the clearest picture */}
          <Reveal as="article" className="lg:col-span-7 lg:row-span-2" aria-labelledby="cap-transport">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-hairline bg-white p-7 sm:p-10">
              <span className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-electric sm:-right-28 sm:-top-28 sm:h-72 sm:w-72" aria-hidden />
              <CardHead capability={transport} />
              <h3 id="cap-transport" className={`${display} relative mt-12 text-[clamp(40px,5vw,64px)] leading-[0.98]`}>
                {transport.title}
              </h3>
              <p className="mt-5 max-w-md font-dm text-[17px] leading-relaxed text-midnight-soft">{transport.text}</p>

              <ol className="mt-auto grid gap-4 pt-12 sm:grid-cols-4 sm:gap-0" aria-label="A ride, from request to drop-off">
                {RIDE_STATES.map((s, i) => (
                  <li key={s} className="relative flex items-center gap-3 sm:block">
                    <span
                      className={`relative z-10 block h-3 w-3 shrink-0 rounded-full ${
                        i === RIDE_STATES.length - 1 ? 'bg-cantaloupe' : i === 0 ? 'border-2 border-electric bg-white' : 'bg-electric'
                      }`}
                      aria-hidden
                    />
                    {i < RIDE_STATES.length - 1 && <span className="absolute left-3 top-[5px] hidden h-[2px] w-[calc(100%-12px)] bg-electric/35 sm:block" aria-hidden />}
                    <span className="font-dm text-[14px] font-medium text-midnight sm:mt-4 sm:block">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t border-hairline pt-5">
                <SmartLink href={LINKS.transportTour} className={textLink}>
                  Take the transportation tour <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </SmartLink>
              </div>
            </div>
          </Reveal>

          <Reveal as="article" delay={100} className="lg:col-span-5" aria-labelledby="cap-volunteers">
            <div className="flex h-full flex-col rounded-[20px] border border-hairline bg-white p-7 sm:p-9">
              <CardHead capability={volunteers} />
              <h3 id="cap-volunteers" className={`${display} mt-10 text-[34px] leading-[1] sm:text-[40px]`}>
                {volunteers.title}
              </h3>
              <p className="mt-4 font-dm text-[16px] leading-relaxed text-midnight-soft">{volunteers.text}</p>
              <div className="mt-auto pt-6">
                <SmartLink href={LINKS.registerDriver} className={textLink}>
                  Volunteer as a driver <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </SmartLink>
              </div>
            </div>
          </Reveal>

          {/* The one midnight surface in the grid: the workspace that holds the rest together */}
          <Reveal as="article" delay={180} className="lg:col-span-5" aria-labelledby="cap-orgs">
            <div className="flex h-full flex-col rounded-[20px] bg-midnight p-7 text-white sm:p-9">
              <CardHead capability={organizations} onDark />
              <h3 id="cap-orgs" className="mt-10 text-balance font-grotesk text-[34px] font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-[40px]">
                {organizations.title}
              </h3>
              <p className="mt-4 font-dm text-[16px] leading-relaxed text-white/75">{organizations.text}</p>
            </div>
          </Reveal>

          {/* The vision: drawn in outline, so it never reads as something you can use today */}
          <Reveal as="article" delay={120} className="lg:col-span-12" aria-labelledby="cap-grow">
            <div className="grid gap-10 rounded-[20px] border border-dashed border-midnight/25 p-7 sm:p-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <CardHead capability={grow} />
                <h3 id="cap-grow" className={`${display} mt-10 text-[34px] leading-[1] sm:text-[40px]`}>
                  {grow.title}
                </h3>
                <p className="mt-4 max-w-lg font-dm text-[16px] leading-relaxed text-midnight-soft">{grow.text}</p>
              </div>
              <GrowthDiagram />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function CardHead({ capability, onDark = false }: { capability: Capability; onDark?: boolean }) {
  const Icon = capability.icon
  const iconTone =
    capability.accent === 'cantaloupe' ? (onDark ? 'bg-cantaloupe text-midnight' : 'bg-cantaloupe-wash text-cantaloupe-ink') : 'bg-electric-wash text-electric-ink'
  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3">
      <p className={`flex items-center gap-3 font-dm text-[15px] font-semibold ${onDark ? 'text-white' : 'text-midnight'}`}>
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${iconTone}`} aria-hidden>
          <Icon className="h-5 w-5" />
        </span>
        {capability.area}
      </p>
      {onDark ? (
        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-3 py-1 font-dm text-[13px] font-medium text-white/85">
          <span className="h-2 w-2 rounded-full bg-electric" aria-hidden />
          {capability.status}
        </span>
      ) : (
        <StatusTag availability={capability.availability}>{capability.status}</StatusTag>
      )}
    </div>
  )
}

// Layers stacking on one base: the foundation stays, the services above it grow. Only the solid layer exists today.
function GrowthDiagram() {
  const layers = [
    { label: 'Transportation', live: true },
    { label: 'Volunteer roles' },
    { label: 'Resource sharing' },
    { label: 'Cross-organization services' },
  ]
  return (
    <div className="lg:col-span-5 lg:col-start-8" aria-hidden>
      <div className="flex flex-col-reverse gap-2">
        <div className="rounded-xl bg-midnight px-4 py-3 font-dm text-[14px] font-medium text-white">
          Shared foundation <span className="text-white/60">· organizations, roles, requests</span>
        </div>
        {layers.map((l, i) => (
          <div
            key={l.label}
            className={`rounded-xl px-4 py-2.5 font-dm text-[14px] font-medium ${
              l.live ? 'bg-electric text-midnight' : 'border border-dashed border-midnight/35 text-midnight-soft'
            }`}
            style={{ marginLeft: `${(i + 1) * 6}%` }}
          >
            {l.label}
            {!l.live && <span className="text-hush"> · planned</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
