import {
  Blocks,
  Building2,
  CalendarPlus,
  CarFront,
  Check,
  ChevronDown,
  CircleCheck,
  CircleHelp,
  Clock,
  Inbox,
  LayoutDashboard,
  TriangleAlert,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import logoMark from '../../../assets/logo-mark.svg'
import { Accent, Reveal } from '../primitives'
import { container, eyebrow, h2 } from '../styles'

// 04: the organization workspace, drawn for the landing page. A picture of the real screens, built from
// the same labels (nav, metrics, statuses), never the screens themselves, and never real data.
// Everything below is illustrative: the organization, the people, and the numbers are made up.
const DEMO = {
  org: 'Northside Community Services',
  person: 'Alex',
  initials: 'AL',
}

const NAV: { label: string; icon: LucideIcon; active?: boolean; badge?: number; group?: string }[] = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Requests', icon: Inbox, badge: 1 },
  { label: 'Services', icon: Blocks },
  { label: 'Transportation', icon: CarFront, group: 'Services' },
  { label: 'Organization profile', icon: Building2, group: 'Organization' },
  { label: 'Team', icon: UsersRound },
]

const METRICS: { label: string; value: number; hint: string; icon: LucideIcon; tone: 'attention' | 'plain' | 'live' }[] = [
  { label: 'Need attention', value: 1, hint: 'Pickup in 40 min', icon: TriangleAlert, tone: 'attention' },
  { label: 'Awaiting a driver', value: 2, hint: 'Drivers are being asked', icon: Clock, tone: 'plain' },
  { label: 'Confirmed or under way', value: 3, hint: 'On the road today', icon: CarFront, tone: 'live' },
  { label: 'Completed', value: 12, hint: 'Last 30 days', icon: CircleCheck, tone: 'plain' },
]

type Status = 'Finding a driver' | 'Driver confirmed' | 'Picked up'
const STATUS_TONE: Record<Status, string> = {
  'Finding a driver': 'bg-white/[0.06] text-white/80',
  'Driver confirmed': 'bg-electric/15 text-electric-soft',
  'Picked up': 'bg-white text-midnight',
}

const RIDES: { who: string; time: string; to: string; status: Status }[] = [
  { who: 'JD', time: '2:30 PM', to: 'Medical appointment', status: 'Driver confirmed' },
  { who: 'SK', time: '3:15 PM', to: 'Housing interview', status: 'Picked up' },
  { who: 'RM', time: '4:00 PM', to: 'Social service visit', status: 'Finding a driver' },
]

const WEEK = [3, 5, 4, 6, 9, 2, 1]
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function ProductShowcase() {
  return (
    <section id="showcase" aria-labelledby="showcase-heading" className="relative scroll-mt-16 overflow-hidden bg-midnight py-24 text-white sm:py-28 lg:py-40">
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[640px] w-[1100px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(2,151,222,0.16),transparent)]"
        aria-hidden
      />
      <div className={`${container} relative`}>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className={`${eyebrow} text-electric`}>The workspace</p>
            <h2 id="showcase-heading" className={`${h2} mt-6 text-white`}>
              One platform.
              <br />
              More <Accent className="text-electric-soft">possibilities.</Accent>
            </h2>
          </div>
          <p className="font-dm text-[17px] leading-relaxed text-white/70 lg:col-span-4">
            The workspace your team signs in to. What needs attention, every request in flight, and the services your organization uses, in one view.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-16 [perspective:2400px] lg:mt-24">
          <figure className="relative">
            <div className="rcl-tilt">
              <DashboardMock />
            </div>
            <RideCardMock />
            <figcaption className="mt-6 flex items-center gap-2 font-dm text-sm text-fog">
              <span className="h-px w-6 bg-fog/50" aria-hidden />
              Illustrative demo. The organization, people, and rides shown are not real.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

// The overview screen. Hidden from screen readers: the figure caption says what it is.
function DashboardMock() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 bg-midnight-800 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] select-none"
      aria-hidden
    >
      <div className="grid md:grid-cols-[232px_1fr]">
        <aside className="hidden flex-col border-r border-white/[0.07] bg-midnight p-4 md:flex">
          <div className="flex items-center gap-2 px-2 py-1">
            <img src={logoMark} alt="" className="h-6 w-6" />
            <span className="font-grotesk text-[15px] font-semibold tracking-[-0.02em]">Relay Collective</span>
          </div>
          <div className="mt-5 flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 font-dm text-[12px] text-white/85">
            <span className="truncate">{DEMO.org}</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-fog" />
          </div>
          <nav className="mt-5 space-y-0.5 font-dm text-[13px]">
            {NAV.map(({ label, icon: Icon, active, badge, group }) => (
              <div key={label}>
                {group && <p className="mb-1 mt-4 px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">{group}</p>}
                <div className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${active ? 'bg-electric font-medium text-midnight' : 'text-white/70'}`}>
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{label}</span>
                  {badge && <span className="rounded-full bg-cantaloupe px-1.5 text-[10px] font-semibold text-midnight">{badge}</span>}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-auto space-y-3 pt-10">
            <div className="flex items-center gap-2.5 px-3 font-dm text-[13px] text-white/60">
              <CircleHelp className="h-4 w-4" /> Help and support
            </div>
            <div className="flex items-center gap-2.5 rounded-lg border-t border-white/[0.07] px-2 pt-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-dm text-[11px] font-semibold">{DEMO.initials}</span>
              <div className="font-dm text-[12px] leading-tight">
                <p className="text-white">{DEMO.person} Lee</p>
                <p className="text-white/50">Organization admin</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-dm text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">Thursday, November 12</p>
              <p className="mt-1.5 font-grotesk text-[22px] font-semibold tracking-[-0.03em] sm:text-[28px]">
                Good afternoon, <span className="font-editorial text-[1.08em] font-normal italic tracking-[-0.01em] text-cantaloupe">{DEMO.person}.</span>
              </p>
              <p className="mt-1 font-dm text-[13px] text-white/60">Here's what's happening at {DEMO.org}.</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-dm text-[12px] font-semibold text-midnight">
              <CalendarPlus className="h-3.5 w-3.5" /> Request a ride
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {METRICS.map(({ label, value, hint, icon: Icon, tone }) => (
              <div
                key={label}
                className={`relative overflow-hidden rounded-xl border p-4 ${
                  tone === 'live'
                    ? 'border-electric/40 bg-[linear-gradient(135deg,rgba(2,151,222,0.32),rgba(2,151,222,0.06))]'
                    : tone === 'attention'
                      ? 'border-cantaloupe/40 bg-cantaloupe/[0.06]'
                      : 'border-white/[0.07] bg-white/[0.02]'
                }`}
              >
                <Icon className={`h-4 w-4 ${tone === 'attention' ? 'text-cantaloupe' : tone === 'live' ? 'text-electric-soft' : 'text-white/50'}`} />
                <p className="mt-3 font-dm text-[12px] text-white/70">{label}</p>
                <p className="font-grotesk text-[30px] font-semibold leading-tight tracking-[-0.03em] tabular-nums">{value}</p>
                <p className="font-dm text-[11px] text-white/45">{hint}</p>
                {tone === 'live' && (
                  <svg viewBox="0 0 120 40" className="absolute bottom-3 right-3 hidden h-8 w-24 text-electric-soft sm:block" fill="none">
                    <path d="M2 34 C 20 34, 26 22, 40 24 S 62 36, 74 22 S 98 6, 118 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-5">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 lg:col-span-3">
              <div className="flex items-center justify-between">
                <p className="font-grotesk text-[15px] font-medium">Needs action</p>
                <span className="font-dm text-[11px] text-white/50">View all requests</span>
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-lg bg-cantaloupe/10 p-3">
                <TriangleAlert className="h-4 w-4 shrink-0 text-cantaloupe" />
                <div className="min-w-0 flex-1 font-dm">
                  <p className="text-[13px] font-medium">No driver available</p>
                  <p className="truncate text-[11px] text-white/60">5:10 PM pickup · Pharmacy</p>
                </div>
                <span className="rounded-full bg-cantaloupe px-3 py-1 font-dm text-[11px] font-semibold text-midnight">Rebook now</span>
              </div>
              <p className="mt-5 font-grotesk text-[15px] font-medium">Upcoming rides</p>
              <ul className="mt-2 divide-y divide-white/[0.06]">
                {RIDES.map((r) => (
                  <li key={r.who} className="flex items-center gap-3 py-2.5 font-dm">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[10px] font-semibold">{r.who}</span>
                    <span className="w-16 shrink-0 text-[12px] tabular-nums text-white/85">{r.time}</span>
                    <span className="min-w-0 flex-1 truncate text-[12px] text-white/60">{r.to}</span>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${STATUS_TONE[r.status]}`}>{r.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <p className="font-grotesk text-[15px] font-medium">Requests this week</p>
                <span className="font-dm text-[11px] text-white/50">30 total</span>
              </div>
              <div className="mt-4 flex h-28 items-end gap-2">
                {WEEK.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className={`w-full rounded-t-[4px] ${i === 4 ? 'bg-electric' : 'bg-white/[0.1]'}`} style={{ height: `${(v / 9) * 88}px` }} />
                    <span className="font-dm text-[10px] text-white/45">{DAYS[i]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-3 font-dm text-[11px]">
                <p className="flex items-center gap-2 text-white/70">
                  <Check className="h-3.5 w-3.5 text-electric-soft" /> Driver confirmed for JD · 4 min ago
                </p>
                <p className="flex items-center gap-2 text-white/70">
                  <CircleCheck className="h-3.5 w-3.5 text-white/50" /> Ride completed for MR · 1 hr ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// A ride's progress, as staff see it. Layered over the corner on wide screens only.
function RideCardMock() {
  const steps = [
    { label: 'Requested', done: true },
    { label: 'Driver confirmed', done: true },
    { label: 'Picked up', current: true },
    { label: 'Completed' },
  ]
  return (
    <div
      className="absolute -bottom-10 -right-6 hidden w-[300px] rounded-2xl border border-white/10 bg-midnight-700 p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] select-none xl:block"
      aria-hidden
    >
      <div className="flex items-center justify-between font-dm">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">Ride · SK</p>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-midnight">Picked up</span>
      </div>
      <p className="mt-2 font-grotesk text-lg font-semibold tracking-[-0.02em]">Housing interview</p>
      <p className="font-dm text-[12px] text-white/55">Pickup 3:15 PM · Wheelchair accessible</p>
      <ol className="mt-5 space-y-3">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-3 font-dm text-[12px]">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                s.done ? 'bg-electric text-midnight' : s.current ? 'border-2 border-cantaloupe' : 'border border-white/25'
              }`}
            >
              {s.done && <Check className="h-3 w-3" strokeWidth={3} />}
              {s.current && <span className="h-1.5 w-1.5 rounded-full bg-cantaloupe" />}
            </span>
            <span className={s.done || s.current ? 'text-white' : 'text-white/50'}>{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
