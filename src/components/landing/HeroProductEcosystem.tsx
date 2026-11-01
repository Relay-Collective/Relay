import { ArrowDown, Building2, CarFront, CircleCheck, HandHeart, Inbox, Layers, LayoutDashboard, UsersRound, type LucideIcon } from 'lucide-react'
import { useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { LogoMark } from '../brand/LogoMark'
import { DEMO_ACTIVITY, DEMO_ORG, DEMO_STAFF, type DemoArea } from './demo'
import { usePrefersReducedMotion } from './hooks'

const at = (ms: number) => ({ '--enter-delay': `${ms}ms` } as CSSProperties)

// When each part lands, in ms after load: the workspace, the people around it, the services it runs, the outcome.
// Everything is in place by about 1.8s; the relay points finish travelling by about 2.6s and nothing moves after.
const T = {
  board: 120,
  orgs: 520,
  orgsLine: 680,
  volunteers: 700,
  volunteersLine: 860,
  transport: 1000,
  services: 1100,
  impactLine: 1200,
  impact: 1320,
}
const TRAVEL = { orgs: 1050, volunteers: 1250, impact: 1500 }

type PartKey = 'organizations' | 'volunteers' | 'transport' | 'services' | 'impact'
type Tone = 'electric' | 'cantaloupe' | 'emerald'

const TONE: Record<Tone, string> = {
  electric: 'bg-electric-wash text-electric-ink',
  cantaloupe: 'bg-cantaloupe-wash text-cantaloupe-ink',
  emerald: 'bg-emerald-50 text-emerald-700',
}

// What the platform brings together, each linking to where the page explains it.
// Status follows CAPABILITIES in content.ts: volunteers are drivers today, community services are planned.
const PARTS: Record<PartKey, { title: string; text: string; icon: LucideIcon; tone: Tone; href: string; status?: 'drivers' | 'planned' }> = {
  organizations: { title: 'Organizations', text: 'Teams, members, and services in one place.', icon: Building2, tone: 'electric', href: '#cap-orgs' },
  volunteers: {
    title: 'Volunteers',
    text: 'People ready to support community needs.',
    icon: HandHeart,
    tone: 'cantaloupe',
    href: '#cap-volunteers',
    status: 'drivers',
  },
  transport: { title: 'Transportation', text: 'Rides to essential appointments.', icon: CarFront, tone: 'electric', href: '#cap-transport' },
  services: {
    title: 'Community services',
    text: 'Room for growing programs.',
    icon: Layers,
    tone: 'cantaloupe',
    href: '#cap-grow',
    status: 'planned',
  },
  impact: { title: 'Community impact', text: 'People connected. Services delivered.', icon: CircleCheck, tone: 'emerald', href: '#impact' },
}

// The hero picture: one workspace at the centre, the parts of the platform around it, the outcome beneath.
// The workspace is illustrative and hidden from screen readers; the cards are links to the sections that explain each part.
export function HeroProductEcosystem() {
  const [active, setActive] = useState<PartKey | null>(null)
  return (
    <figure className="relative">
      <figcaption className="sr-only">
        An illustrative Relay Collective workspace, connected to organizations, volunteers, transportation, community services (planned), and
        community impact.
      </figcaption>
      <Stage active={active} onActive={setActive} />
      <Compact active={active} onActive={setActive} />
      <p
        className="rcl-enter mt-6 flex items-center gap-2 font-dm text-[13px] text-hush md:justify-center xl:mt-3 xl:justify-start"
        style={at(T.impact + 200)}
        aria-hidden
      >
        <span className="h-px w-5 bg-hush/60" />
        Illustrative example. The organization, people and numbers are not real.
      </p>
    </figure>
  )
}

interface Linked {
  active: PartKey | null
  onActive: (part: PartKey | null) => void
}

/* ---------- Tablet and desktop ---------- */

// The workspace leads; Organizations and Volunteers sit above it, Transportation and Community services dock on its lower
// edge, and Community impact hangs beneath as the outcome. Sizes are in em, and 1em is a fortieth of the stage's width,
// so the whole composition scales as one piece.
function Stage({ active, onActive }: Linked) {
  const stage = useRef<HTMLDivElement>(null)
  const board = useRef<HTMLDivElement>(null)
  const orgs = useRef<HTMLAnchorElement>(null)
  const volunteers = useRef<HTMLAnchorElement>(null)
  const impact = useRef<HTMLAnchorElement>(null)
  const wires = useConnectors(stage, board, { orgs, volunteers, impact })
  const reduced = usePrefersReducedMotion()

  const LINES = [
    { part: 'organizations', wire: wires.orgs, delay: T.orgsLine, travel: TRAVEL.orgs, dot: 'bg-electric' },
    { part: 'volunteers', wire: wires.volunteers, delay: T.volunteersLine, travel: TRAVEL.volunteers, dot: 'bg-cantaloupe' },
    { part: 'impact', wire: wires.impact, delay: T.impactLine, travel: TRAVEL.impact, dot: 'bg-electric' },
  ] as const

  return (
    <div className="hidden select-none [container-type:inline-size] md:block">
      <div ref={stage} className="relative text-[2.5cqw]">
        <Hook className="absolute left-[0.6em] top-[4.4em] w-[24em]" />
        <span
          className="rcl-fade absolute left-[35.6em] top-[22.6em] aspect-square w-[3.8em] rounded-full bg-cantaloupe"
          style={at(T.services)}
          aria-hidden
        />

        {/* Thin electric connectors. A hovered or focused card brings its own forward and quiets the others. */}
        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" fill="none" aria-hidden>
          {LINES.map(
            ({ part, wire, delay }) =>
              wire && (
                <g key={part} className="transition-opacity duration-300" opacity={active && active !== part ? 0.25 : 1}>
                  {/* A white casing keeps the line legible where it crosses the electric hook */}
                  <path className="rcl-route" pathLength={1} style={at(delay)} d={wire.d} stroke="#fff" strokeWidth={4.5} strokeLinecap="round" />
                  <path
                    className="rcl-route transition-[stroke,stroke-width] duration-300"
                    pathLength={1}
                    style={at(delay)}
                    d={wire.d}
                    stroke={active === part ? '#0272A8' : '#0297DE'}
                    strokeOpacity={active === part ? 1 : 0.7}
                    strokeWidth={active === part ? 1.75 : 1.25}
                    strokeLinecap="round"
                  />
                  <g className="rcl-fade" style={at(delay + 300)}>
                    <circle cx={wire.from[0]} cy={wire.from[1]} r="3" fill="#fff" stroke="#0297DE" strokeWidth="1.25" />
                    <circle cx={wire.to[0]} cy={wire.to[1]} r="3" fill="#fff" stroke="#0297DE" strokeWidth="1.25" />
                  </g>
                </g>
              ),
          )}
        </svg>

        {/* Relay points: blue from Organizations into the workspace, cantaloupe out to Volunteers, blue down to impact. Once. */}
        {!reduced &&
          LINES.map(
            ({ part, wire, travel, dot }) =>
              wire && (
                <span
                  key={part}
                  className={`rcl-traveller pointer-events-none absolute left-0 top-0 z-30 h-[0.55em] w-[0.55em] rounded-full ring-[0.2em] ring-white ${dot}`}
                  style={{ offsetPath: `path('${wire.d}')`, ...at(travel) }}
                  aria-hidden
                />
              ),
          )}

        {/* The upper cards come first in the markup, so keyboard order follows the story: people, services, outcome */}
        <PartCard
          ref={orgs}
          part="organizations"
          size="upper"
          delay={T.orgs}
          active={active}
          onActive={onActive}
          className="absolute left-0 top-[0.5em] z-20 w-[14.8em]"
        />
        <PartCard
          ref={volunteers}
          part="volunteers"
          size="upper"
          delay={T.volunteers}
          active={active}
          onActive={onActive}
          className="absolute right-0 top-0 z-20 w-[15.2em]"
        />

        <div className="px-[3em] pt-[9.6em]">
          <div ref={board} className="rcl-card relative" style={at(T.board)}>
            <div aria-hidden>
              <Workspace active={active} />
            </div>
            <div className="absolute left-[1.4em] top-[calc(100%-1.8em)] z-20 w-[13.8em]">
              <PartCard part="transport" size="chip" delay={T.transport} active={active} onActive={onActive} />
            </div>
            <div className="absolute right-[1.4em] top-[calc(100%-1.8em)] z-20 w-[13.8em]">
              <PartCard part="services" size="chip" delay={T.services} active={active} onActive={onActive} />
            </div>
          </div>
          <div className="mt-[5.8em] flex justify-center">
            <PartCard ref={impact} part="impact" size="outcome" delay={T.impact} active={active} onActive={onActive} className="w-[20.4em]" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface Wire {
  d: string
  from: [number, number]
  to: [number, number]
}

type WireKey = 'orgs' | 'volunteers' | 'impact'

// Measures where each card meets the workspace and draws a soft S-curve between them, in the stage's own pixels.
// Organizations runs into the workspace, Volunteers out of it, impact down from it: the way the relay points travel.
function useConnectors(
  stage: RefObject<HTMLDivElement | null>,
  board: RefObject<HTMLDivElement | null>,
  cards: Record<WireKey, RefObject<HTMLAnchorElement | null>>,
): Partial<Record<WireKey, Wire>> {
  const [wires, setWires] = useState<Partial<Record<WireKey, Wire>>>({})
  const { orgs, volunteers, impact } = cards

  useLayoutEffect(() => {
    const root = stage.current
    if (!root) return
    const n = (v: number) => Math.round(v * 10) / 10
    const curve = (from: [number, number], to: [number, number]): Wire => {
      const bend = (to[1] - from[1]) * 0.55
      return {
        d: `M${n(from[0])} ${n(from[1])} C${n(from[0])} ${n(from[1] + bend)} ${n(to[0])} ${n(to[1] - bend)} ${n(to[0])} ${n(to[1])}`,
        from,
        to,
      }
    }
    // Cards settle in with a transform, so read layout boxes (offset*), never the animated ones
    const box = (el: HTMLElement | null) => {
      if (!el) return null
      let left = 0
      let top = 0
      for (let at: HTMLElement | null = el; at && at !== root; at = at.offsetParent as HTMLElement | null) {
        left += at.offsetLeft
        top += at.offsetTop
      }
      return { left, top, width: el.offsetWidth, height: el.offsetHeight }
    }
    const measure = () => {
      const b = box(board.current)
      const o = box(orgs.current)
      const v = box(volunteers.current)
      const i = box(impact.current)
      if (!b || !o || !v || !i || root.offsetWidth === 0) return
      const em = root.offsetWidth / 40
      const impactX = i.left + i.width / 2
      setWires({
        orgs: curve([o.left + o.width * 0.68, o.top + o.height], [o.left + o.width * 0.68 + 1.8 * em, b.top]),
        volunteers: curve([v.left + v.width * 0.32 - 1.8 * em, b.top], [v.left + v.width * 0.32, v.top + v.height]),
        impact: curve([impactX, b.top + b.height], [impactX, i.top]),
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    document.fonts?.ready.then(measure)
    return () => observer.disconnect()
  }, [stage, board, orgs, volunteers, impact])

  return wires
}

// The electric hook from the logo, drawn large and cropped by the workspace, so the brand's own loop frames the product
function Hook({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 432 480" className={`rcl-fade overflow-visible ${className}`} fill="none" aria-hidden>
      <path d="M40 420V184a144 144 0 0 1 144-144h248" stroke="#0297DE" strokeWidth="48" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- Phones ---------- */

// Phones get their own arrangement: the workspace first, Organizations and Volunteers tucked under it, the services it runs
// as one short list, then the outcome. Readable sizes, one short connector, nothing hidden behind anything else.
function Compact({ active, onActive }: Linked) {
  return (
    <div className="relative select-none md:hidden">
      <Hook className="absolute -left-3 -top-5 w-[62%]" />
      <span className="absolute -right-6 top-[38%] aspect-square w-16 rounded-full bg-cantaloupe" aria-hidden />

      <div className="rcl-card relative ml-3" style={at(T.board)} aria-hidden>
        <Workspace compact active={active} />
      </div>

      <div className="relative z-10 -mt-4 grid grid-cols-2 gap-2.5 px-1.5">
        <PartCard part="organizations" size="compact" delay={T.orgs} active={active} onActive={onActive} />
        <PartCard part="volunteers" size="compact" delay={T.volunteers} active={active} onActive={onActive} />
      </div>

      <div className="rcl-card rcl-card-lift mx-1.5 mt-2.5 rounded-xl border border-hairline bg-white" style={at(T.transport)}>
        <PartRow part="transport" onActive={onActive} />
        <PartRow part="services" onActive={onActive} />
      </div>

      <span className="mx-auto block h-7 w-px bg-electric" aria-hidden />
      <div className="mx-1.5">
        <PartCard part="impact" size="compact-outcome" delay={T.impact} active={active} onActive={onActive} />
      </div>
    </div>
  )
}

/* ---------- Parts ---------- */

function Icon({ icon: I, tone, size }: { icon: LucideIcon; tone: Tone; size: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-[28%] ${TONE[tone]}`} style={{ width: size, height: size }} aria-hidden>
      <I className="h-[48%] w-[48%]" strokeWidth={2} />
    </span>
  )
}

// Live work and planned work never look the same: a half dot for a first step, a dashed ring for planned. Words too.
function Status({ status }: { status: 'drivers' | 'planned' }) {
  const planned = status === 'planned'
  return (
    <span
      className={`inline-flex items-center gap-[0.4em] whitespace-nowrap rounded-full border px-[0.6em] py-[0.15em] font-dm text-[0.6875em] font-semibold text-midnight-soft ${
        planned ? 'border-dashed border-midnight/30' : 'border-hairline bg-porcelain'
      }`}
    >
      <span
        className={`h-[0.6em] w-[0.6em] rounded-full ${
          planned
            ? 'border border-dashed border-hush'
            : 'bg-[linear-gradient(90deg,var(--color-cantaloupe)_50%,transparent_50%)] ring-1 ring-cantaloupe'
        }`}
        aria-hidden
      />
      {planned ? 'Planned' : 'Drivers today'}
    </span>
  )
}

// One clear name per link, so the title, status and text are not read as one run-on word
const label = (part: PartKey) => {
  const { title, text, status } = PARTS[part]
  return `${title}${status ? ` (${status === 'planned' ? 'planned' : 'drivers today'})` : ''}. ${text}`
}

type Size = 'upper' | 'chip' | 'outcome' | 'compact' | 'compact-outcome'

const card = 'group block rounded-[0.9em] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-electric-ink'
const surface =
  'rcl-card-lift relative h-full rounded-[0.9em] border bg-white transition-[translate,border-color,box-shadow] duration-300 ease-out group-hover:-translate-y-[0.15em] group-hover:border-electric/40 group-focus-visible:border-electric/40 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0'

function PartCard({
  part,
  size,
  delay,
  active,
  onActive,
  className = '',
  ref,
}: {
  part: PartKey
  size: Size
  delay: number
  onActive: (part: PartKey | null) => void
  className?: string
  ref?: RefObject<HTMLAnchorElement | null>
} & Pick<Linked, 'active'>) {
  const { title, text, icon, tone, href, status } = PARTS[part]
  const compact = size === 'compact' || size === 'compact-outcome'
  const stacked = size === 'compact'
  // Status sits beside the name on the wide cards, and under the text on the narrow phone cards
  const inline = !stacked
  return (
    <a
      ref={ref}
      href={href}
      aria-label={label(part)}
      className={`rcl-card ${card} ${compact ? 'text-[15px]' : ''} ${className}`}
      style={at(delay)}
      onMouseEnter={() => onActive(part)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(part)}
      onBlur={() => onActive(null)}
    >
      <span
        className={`${surface} flex ${stacked ? 'flex-col' : 'items-start'} gap-[0.75em] ${size === 'chip' ? 'p-[0.75em]' : 'p-[0.9em]'} ${
          active === part ? 'border-electric/40' : 'border-hairline'
        }`}
      >
        <Icon icon={icon} tone={tone} size={size === 'chip' ? '2em' : size === 'outcome' ? '2.5em' : '2.2em'} />
        <span className="block min-w-0 flex-1 pr-[0.6em]">
          <span className="flex flex-wrap items-center gap-x-[0.5em] gap-y-[0.25em]">
            <span
              className={`whitespace-nowrap font-grotesk font-semibold leading-tight tracking-[-0.02em] text-midnight ${
                size === 'chip' ? 'text-[0.9em]' : size === 'outcome' ? 'text-[1.1em]' : 'text-[1em]'
              }`}
            >
              {title}
            </span>
            {inline && status && <Status status={status} />}
          </span>
          <span className={`mt-[0.3em] block font-dm leading-[1.4] text-midnight-soft ${size === 'chip' ? 'text-[0.75em]' : 'text-[0.8125em]'}`}>
            {text}
          </span>
          {!inline && status && (
            <span className="mt-[0.6em] block">
              <Status status={status} />
            </span>
          )}
        </span>
        {/* The way in: always shown on phones, revealed on hover or focus where a pointer can find the card */}
        <ArrowDown
          className={`absolute right-[0.75em] top-[0.8em] h-[0.9em] w-[0.9em] text-electric-ink transition-[opacity,translate] duration-300 group-hover:translate-y-[0.1em] group-hover:opacity-100 group-focus-visible:opacity-100 ${
            compact ? 'opacity-60' : 'opacity-0'
          }`}
          strokeWidth={2.25}
          aria-hidden
        />
      </span>
    </a>
  )
}

// One line of the phone's services list: icon, name, short description, status
function PartRow({ part, onActive }: { part: PartKey; onActive: (part: PartKey | null) => void }) {
  const { title, text, icon, tone, href, status } = PARTS[part]
  return (
    <a
      href={href}
      aria-label={label(part)}
      className={`group flex min-h-16 items-center gap-3 px-3.5 py-3 text-[15px] first:rounded-t-xl last:rounded-b-xl [&+&]:border-t [&+&]:border-hairline ${card}`}
      onFocus={() => onActive(part)}
      onBlur={() => onActive(null)}
    >
      <Icon icon={icon} tone={tone} size="2.25em" />
      <span className="min-w-0 flex-1">
        <span className="block font-grotesk text-[15px] font-semibold leading-tight tracking-[-0.02em] text-midnight">{title}</span>
        <span className="mt-0.5 block font-dm text-[13px] leading-snug text-midnight-soft">{text}</span>
      </span>
      {status ? <Status status={status} /> : <ArrowDown className="h-4 w-4 shrink-0 text-hush" strokeWidth={2.25} aria-hidden />}
    </a>
  )
}

/* ---------- The workspace ---------- */

const NAV: { label: string; icon: LucideIcon; part?: PartKey; current?: boolean; badge?: number }[] = [
  { label: 'Overview', icon: LayoutDashboard, current: true },
  { label: 'Requests', icon: Inbox, badge: 2 },
  { label: 'Transportation', icon: CarFront, part: 'transport' },
  { label: 'Volunteers', icon: HandHeart, part: 'volunteers' },
  { label: 'Team', icon: UsersRound, part: 'organizations' },
]

const METRICS: { label: string; value: number; icon: LucideIcon; tone: Tone; part: PartKey }[] = [
  { label: 'Team members', value: 24, icon: UsersRound, tone: 'electric', part: 'organizations' },
  { label: 'Active volunteers', value: 18, icon: HandHeart, tone: 'cantaloupe', part: 'volunteers' },
  { label: 'Completed this week', value: 12, icon: CircleCheck, tone: 'emerald', part: 'impact' },
]

const AREA: Record<DemoArea, { icon: LucideIcon; tone: Tone; part: PartKey }> = {
  organizations: { icon: Building2, tone: 'electric', part: 'organizations' },
  volunteers: { icon: HandHeart, tone: 'cantaloupe', part: 'volunteers' },
  transport: { icon: CarFront, tone: 'electric', part: 'transport' },
  impact: { icon: CircleCheck, tone: 'emerald', part: 'impact' },
}

// What a hovered or focused card lights up inside the workspace
const lit = (on: boolean) => (on ? 'bg-electric-wash ring-1 ring-electric/35' : 'ring-0 ring-transparent')

// The organization's overview, simplified: one place where every working part of the platform shows up
function Workspace({ active, compact = false }: { active: PartKey | null; compact?: boolean }) {
  const activity = compact ? DEMO_ACTIVITY.slice(0, 2) : DEMO_ACTIVITY
  const main = (
    <div className={`min-w-0 ${compact ? 'px-4 pb-10 pt-4' : 'px-[1.5em] pb-[3.6em] pt-[1.4em]'}`}>
      <p className={`font-grotesk font-semibold leading-tight tracking-[-0.03em] text-midnight ${compact ? 'text-[19px]' : 'text-[1.35em]'}`}>
        Good afternoon, {DEMO_STAFF.first}.
      </p>
      <span className={`mt-[0.2em] block truncate font-dm text-hush ${compact ? 'text-[13px]' : 'text-[0.75em]'}`}>
        Here's what's happening across your organization.
      </span>

      <div className={`grid grid-cols-3 ${compact ? 'mt-4 gap-2' : 'mt-[1.1em] gap-[0.6em]'}`}>
        {METRICS.map((m) => (
          <div
            key={m.label}
            className={`rounded-[0.75em] border border-hairline transition-[background-color,box-shadow] duration-300 ${
              compact ? 'p-2.5' : 'p-[0.8em]'
            } ${lit(active === m.part)}`}
          >
            <div className="flex items-start justify-between gap-1">
              <p
                className={`font-grotesk font-semibold leading-none tracking-[-0.03em] text-midnight tabular-nums ${
                  compact ? 'text-[24px]' : 'text-[1.7em]'
                }`}
              >
                {m.value}
              </p>
              <Icon icon={m.icon} tone={m.tone} size={compact ? '22px' : '1.6em'} />
            </div>
            <p className={`mt-[0.5em] font-dm leading-tight text-midnight-soft ${compact ? 'text-[12px]' : 'text-[0.75em]'}`}>{m.label}</p>
          </div>
        ))}
      </div>

      <p className={`font-grotesk font-semibold text-midnight ${compact ? 'mt-4 text-[14px]' : 'mt-[1.2em] text-[0.85em]'}`}>Recent activity</p>
      <ul className="mt-[0.3em]">
        {activity.map((a) => {
          const { icon, tone, part } = AREA[a.area]
          return (
            <li
              key={a.text}
              className={`mx-[-0.5em] flex items-center gap-[0.65em] rounded-[0.6em] px-[0.5em] py-[0.5em] font-dm transition-[background-color,box-shadow] duration-300 [&+&]:mt-[0.1em] ${lit(
                active === part,
              )}`}
            >
              <Icon icon={icon} tone={tone} size={compact ? '26px' : '1.65em'} />
              <span className={`min-w-0 flex-1 truncate text-midnight ${compact ? 'text-[13px]' : 'text-[0.75em]'}`}>{a.text}</span>
              <span className={`shrink-0 tabular-nums text-hush ${compact ? 'text-[12px]' : 'text-[0.72em]'}`}>{a.when}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )

  if (compact) {
    return (
      <div className="rcl-lift-lg overflow-hidden rounded-2xl border border-hairline bg-white">
        <div className="flex items-center gap-2 border-b border-hairline bg-porcelain px-4 py-2.5">
          <LogoMark className="h-5 w-5" />
          <span className="truncate font-dm text-[13px] font-medium text-midnight-soft">{DEMO_ORG}</span>
        </div>
        {main}
      </div>
    )
  }

  return (
    <div className="rcl-lift-lg overflow-hidden rounded-[1.1em] border border-hairline bg-white">
      <div className="grid grid-cols-[8.6em_1fr]">
        <aside className="flex flex-col border-r border-hairline bg-porcelain px-[0.75em] pb-[3.6em] pt-[1.3em]">
          <div className="flex items-center gap-[0.45em] px-[0.3em]">
            <LogoMark className="h-[1.4em] w-[1.4em]" />
            <span className="whitespace-nowrap font-grotesk text-[0.72em] font-semibold tracking-[-0.02em] text-midnight">Relay Collective</span>
          </div>
          <ul className="mt-[1.4em] grid gap-[0.25em] font-dm text-[0.75em]">
            {NAV.map(({ label, icon: I, current, badge, part }) => (
              <li
                key={label}
                className={`flex items-center gap-[0.6em] rounded-[0.6em] px-[0.65em] py-[0.6em] transition-[background-color,box-shadow,color] duration-300 ${
                  current ? 'bg-midnight font-semibold text-white' : `text-midnight-soft ${lit(!!part && active === part)}`
                }`}
              >
                <I className="h-[1.25em] w-[1.25em] shrink-0" />
                <span className="flex-1 truncate">{label}</span>
                {badge && (
                  <span className="rounded-full bg-cantaloupe px-[0.5em] text-[0.85em] font-semibold text-midnight tabular-nums">{badge}</span>
                )}
              </li>
            ))}
          </ul>
          <span className="mt-auto block truncate px-[0.3em] pt-[1em] font-dm text-[0.68em] text-hush">{DEMO_ORG}</span>
        </aside>
        {main}
      </div>
    </div>
  )
}
