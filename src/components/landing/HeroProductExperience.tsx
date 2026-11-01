import { Accessibility, Blocks, CalendarPlus, CarFront, Check, CircleCheck, Inbox, LayoutDashboard, MapPin, UsersRound } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { LogoMark } from '../brand/LogoMark'
import { DEMO_DRIVER, DEMO_ORG, DEMO_RIDE, DEMO_STAFF, DEMO_UPCOMING } from './demo'
import { StatusPill, StepLabel } from './ProductBits'

const at = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties

// When each part of the ride lands, in ms after load. The request reads "Finding a driver" until the ride is done.
const T = { board: 250, request: 850, route1: 1450, driver: 1950, route2: 2750, done: 3200 }

// The hero picture: one ride, Request → Connection → Impact, told through the screens staff and drivers use.
// Every name and time is illustrative. The picture is hidden from screen readers; the caption says what it shows.
export function HeroProductExperience() {
  return (
    <figure className="relative">
      <figcaption className="sr-only">
        An illustrative ride: staff request a ride to a medical appointment, a volunteer driver confirms it, and the ride is completed.
      </figcaption>
      <Stage />
      <Compact />
      <p className="rcl-enter mt-5 flex items-center gap-2 font-dm text-[13px] text-hush md:mt-3" style={at(T.done + 300)} aria-hidden>
        <span className="h-px w-5 bg-hush/60" />
        Illustrative example. The organization, people and places are not real.
      </p>
    </figure>
  )
}

// Tablet and desktop: the layered composition, scaled as one piece. 1em is 16px when the stage is 640px wide.
function Stage() {
  return (
    <div className="hidden select-none [container-type:inline-size] md:block" aria-hidden>
      <div className="relative aspect-[640/600] text-[2.5cqw]">
        {/* The ground: a large electric field and a small cantaloupe counterweight */}
        <span className="rcl-fade absolute left-[27%] top-[4%] aspect-square w-[80%] rounded-full bg-electric" />
        <span className="rcl-fade absolute left-[86%] top-[66%] aspect-square w-[15%] rounded-full bg-cantaloupe" style={at(T.done)} />

        <div className="rcl-card absolute left-0 top-[6%] w-[74%]" style={at(T.board)}>
          <Dashboard />
        </div>

        {/* The route the request travels. Midnight reads on both porcelain and blue. */}
        <svg viewBox="0 0 640 600" className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" fill="none">
          <path className="rcl-route" pathLength={1} style={at(T.route1)} d="M276 404 C 326 404, 318 300, 372 300" stroke="#111820" strokeWidth="2" strokeLinecap="round" />
          <path className="rcl-route" pathLength={1} style={at(T.route2)} d="M512 386 C 512 436, 452 430, 452 478" stroke="#111820" strokeWidth="2" strokeLinecap="round" />
          <circle className="rcl-fade" style={at(T.route1)} cx="276" cy="404" r="5" fill="#111820" />
          <circle className="rcl-fade" style={at(T.route1 + 600)} cx="372" cy="300" r="5" fill="#fff" stroke="#111820" strokeWidth="2" />
          <circle className="rcl-fade" style={at(T.route2 + 600)} cx="452" cy="478" r="5" fill="#fff" stroke="#111820" strokeWidth="2" />
        </svg>

        <div className="rcl-card absolute left-[1%] top-[52%] z-20 w-[42.5%]" style={at(T.request)}>
          <RequestCard />
        </div>
        <div className="rcl-card absolute left-[58%] top-[38%] z-20 w-[42%]" style={at(T.driver)}>
          <DriverCard />
        </div>
        <div className="rcl-card absolute left-[50%] top-[80%] z-20 w-[44%]" style={at(T.done)}>
          <DoneCard />
        </div>
      </div>
    </div>
  )
}

// Phones: the same three moments, stacked on one route line. No dashboard, so the story stays readable.
function Compact() {
  return (
    <div className="relative select-none text-[15px] md:hidden" aria-hidden>
      <span className="absolute -right-24 -top-10 h-64 w-64 rounded-full bg-electric" />
      <span className="absolute bottom-6 left-[1.4em] top-6 w-[2px] bg-midnight" />
      <ol className="relative grid gap-4">
        <li className="rcl-card mr-10" style={at(T.request)}>
          <RequestCard />
        </li>
        <li className="rcl-card ml-8" style={at(T.driver)}>
          <DriverCard />
        </li>
        <li className="rcl-card mr-4" style={at(T.done)}>
          <DoneCard />
        </li>
      </ol>
    </div>
  )
}

function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rcl-lift rounded-[0.9em] border border-hairline bg-white p-[1em] ${className}`}>{children}</div>
}

function RequestCard() {
  return (
    <Panel>
      <div className="flex items-center justify-between gap-[0.5em]">
        <StepLabel n={1}>Request</StepLabel>
        {/* The status catches up with the ride once it's done */}
        <span className="grid justify-items-end" style={at(T.done)}>
          <StatusPill status="Finding a driver" className="rcl-swap-out col-start-1 row-start-1" />
          <StatusPill status="Completed" className="rcl-swap-in col-start-1 row-start-1" />
        </span>
      </div>
      <p className="mt-[0.8em] font-grotesk text-[1.05em] font-semibold leading-tight tracking-[-0.02em] text-midnight">{DEMO_RIDE.title}</p>
      <dl className="mt-[0.7em] grid gap-[0.35em] font-dm text-[0.75em] text-midnight-soft">
        <div className="flex items-center gap-[0.5em]">
          <dt className="sr-only">Pickup</dt>
          <CalendarPlus className="h-[1.15em] w-[1.15em] shrink-0 text-hush" />
          <dd>
            Today, <span className="font-semibold text-midnight tabular-nums">{DEMO_RIDE.pickup}</span> · {DEMO_RIDE.rider}
          </dd>
        </div>
        <div className="flex items-center gap-[0.5em]">
          <dt className="sr-only">Destination</dt>
          <MapPin className="h-[1.15em] w-[1.15em] shrink-0 text-hush" />
          <dd className="truncate">{DEMO_RIDE.to}</dd>
        </div>
      </dl>
      <p className="mt-[0.8em] inline-flex items-center gap-[0.4em] rounded-[0.4em] bg-porcelain px-[0.6em] py-[0.3em] font-dm text-[0.6875em] font-medium text-midnight-soft">
        <Accessibility className="h-[1.2em] w-[1.2em]" /> {DEMO_RIDE.needs}
      </p>
    </Panel>
  )
}

function DriverCard() {
  return (
    <Panel>
      <StepLabel n={2}>Connection</StepLabel>
      <div className="mt-[0.8em] flex items-center gap-[0.7em]">
        <span className="relative flex h-[2.6em] w-[2.6em] shrink-0 items-center justify-center rounded-full bg-cantaloupe-wash font-dm text-[0.8em] font-semibold text-cantaloupe-ink">
          {DEMO_DRIVER.initials}
          <span className="absolute -bottom-[0.15em] -right-[0.15em] flex h-[1.25em] w-[1.25em] items-center justify-center rounded-full border-2 border-white bg-electric text-white">
            <Check className="h-[0.75em] w-[0.75em]" strokeWidth={3.5} />
          </span>
        </span>
        <div className="min-w-0">
          <p className="font-grotesk text-[1.05em] font-semibold leading-tight tracking-[-0.02em] text-midnight">Driver confirmed</p>
          <p className="mt-[0.15em] truncate font-dm text-[0.75em] text-midnight-soft">{DEMO_DRIVER.name} · Volunteer driver</p>
        </div>
      </div>
      <p className="mt-[0.8em] flex items-center gap-[0.45em] border-t border-hairline pt-[0.7em] font-dm text-[0.75em] text-midnight-soft">
        <CarFront className="h-[1.15em] w-[1.15em] text-electric-ink" />
        Picks up {DEMO_RIDE.rider} at <span className="font-semibold text-midnight tabular-nums">{DEMO_RIDE.pickup}</span>
      </p>
    </Panel>
  )
}

function DoneCard() {
  return (
    <Panel className="flex items-center gap-[0.75em]">
      <span className="flex h-[2.4em] w-[2.4em] shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <CircleCheck className="h-[1.3em] w-[1.3em]" strokeWidth={2.25} />
      </span>
      <div className="min-w-0">
        <StepLabel n={3}>Impact</StepLabel>
        <p className="mt-[0.2em] font-grotesk text-[1.05em] font-semibold leading-tight tracking-[-0.02em] text-midnight">Ride completed</p>
        <p className="truncate font-dm text-[0.75em] text-midnight-soft">
          Dropped off at <span className="tabular-nums">{DEMO_RIDE.droppedOff}</span>
        </p>
      </div>
    </Panel>
  )
}

const NAV = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Requests', icon: Inbox, badge: 1 },
  { label: 'Services', icon: Blocks },
  { label: 'Transportation', icon: CarFront },
  { label: 'Team', icon: UsersRound },
]

// The organization's workspace overview, simplified: sidebar, greeting, the three numbers staff check, upcoming rides
function Dashboard() {
  return (
    <div className="rcl-lift-lg overflow-hidden rounded-[0.9em] border border-hairline bg-white">
      <div className="grid grid-cols-[7.6em_1fr]">
        <aside className="border-r border-hairline bg-porcelain p-[0.75em]">
          <div className="flex items-center gap-[0.4em]">
            <LogoMark className="h-[1.2em] w-[1.2em]" />
            <span className="whitespace-nowrap font-grotesk text-[0.5625em] font-semibold tracking-[-0.02em] text-midnight">Relay Collective</span>
          </div>
          <p className="mt-[1em] truncate rounded-[0.4em] border border-hairline bg-white px-[0.5em] py-[0.35em] font-dm text-[0.5625em] font-medium text-midnight">
            {DEMO_ORG}
          </p>
          <ul className="mt-[0.9em] grid gap-[0.2em] font-dm text-[0.625em]">
            {NAV.map(({ label, icon: Icon, active, badge }) => (
              <li
                key={label}
                className={`flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.5em] ${active ? 'bg-midnight font-semibold text-white' : 'text-midnight-soft'}`}
              >
                <Icon className="h-[1.2em] w-[1.2em] shrink-0" />
                <span className="flex-1 truncate">{label}</span>
                {badge && <span className="rounded-full bg-cantaloupe px-[0.45em] text-[0.85em] font-semibold text-midnight">{badge}</span>}
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 p-[1em]">
          <div className="flex items-start justify-between gap-[0.5em]">
            <div className="min-w-0">
              <p className="font-grotesk text-[1.05em] font-semibold tracking-[-0.03em] text-midnight">Good afternoon, {DEMO_STAFF.first}.</p>
              <p className="truncate font-dm text-[0.625em] text-hush">Here's what's happening at {DEMO_ORG}.</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-[0.35em] rounded-full bg-midnight px-[0.8em] py-[0.45em] font-dm text-[0.5625em] font-semibold text-white">
              <CalendarPlus className="h-[1.2em] w-[1.2em]" /> Request a ride
            </span>
          </div>

          <div className="mt-[0.9em] grid grid-cols-3 gap-[0.5em]">
            {[
              { label: 'Awaiting a driver', value: 2 },
              { label: 'Confirmed or under way', value: 3, live: true },
              { label: 'Completed', value: 12 },
            ].map((m) => (
              <div key={m.label} className={`rounded-[0.6em] border p-[0.6em] ${m.live ? 'border-electric/40 bg-electric-wash' : 'border-hairline'}`}>
                <p className="min-h-[2.4em] font-dm text-[0.5625em] leading-[1.2] text-midnight-soft">{m.label}</p>
                <p className="font-grotesk text-[1.35em] font-semibold leading-tight tracking-[-0.03em] text-midnight tabular-nums">{m.value}</p>
              </div>
            ))}
          </div>

          <p className="mt-[0.9em] font-grotesk text-[0.75em] font-semibold text-midnight">Upcoming rides</p>
          <ul className="mt-[0.3em] divide-y divide-hairline">
            {DEMO_UPCOMING.map((r) => (
              <li key={r.who} className="flex items-center gap-[0.6em] py-[0.45em] font-dm">
                <span className="flex h-[1.7em] w-[1.7em] shrink-0 items-center justify-center rounded-full bg-porcelain text-[0.5625em] font-semibold text-midnight">{r.who}</span>
                <span className="w-[4.4em] shrink-0 text-[0.625em] font-medium tabular-nums text-midnight">{r.time}</span>
                <span className="min-w-0 flex-1 truncate text-[0.625em] text-midnight-soft">{r.to}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
