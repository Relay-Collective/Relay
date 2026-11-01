import { Ban, Bus, CalendarPlus, CarFront, Check, CircleCheck, SearchX, UserX, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ACTIVITY_TEXT, timeAgo, type ActivityItem, type ActivityKind } from '../../logic/requestSummary'
import { paths } from '../../workspace/paths'
import { focusRing } from './styles'

const ICON: Record<ActivityKind, { icon: LucideIcon; tone: string }> = {
  REQUESTED: { icon: CalendarPlus, tone: 'bg-brand-50 text-rc-blue' },
  CONFIRMED: { icon: Check, tone: 'bg-emerald-50 text-emerald-700' },
  PICKED_UP: { icon: CarFront, tone: 'bg-cyan-50 text-cyan-800' },
  COMPLETED: { icon: CircleCheck, tone: 'bg-emerald-50 text-emerald-800' },
  NO_SHOW: { icon: UserX, tone: 'bg-coral-50 text-coral-700' },
  TRANSIT: { icon: Bus, tone: 'bg-teal-50 text-teal-700' },
  EXPIRED: { icon: SearchX, tone: 'bg-slate-100 text-slate-600' },
  CANCELLED: { icon: Ban, tone: 'bg-slate-100 text-slate-600' },
}

// What happened lately, newest first. Names the place, never the rider.
export function RecentActivityList({ items, now }: { items: ActivityItem[]; now: number }) {
  return (
    <ol className="divide-y divide-slate-100">
      {items.map(({ id, ride, kind, at }) => {
        const { icon: Icon, tone } = ICON[kind]
        return (
          <li key={id}>
            <Link to={paths.ride(ride.id)} className={`flex items-center gap-3 px-5 py-3 transition hover:bg-slate-50 ${focusRing} focus-visible:ring-inset`}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tone}`} aria-hidden>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-rc-navy">{ACTIVITY_TEXT[kind]}</span>
                <span className="block truncate text-sm text-slate-600">
                  {ride.returnOfRideId ? 'Return from' : 'To'} {ride.destinationName}
                </span>
              </span>
              <time dateTime={at} title={new Date(at).toLocaleString()} className="shrink-0 text-xs font-medium text-slate-500">
                {timeAgo(at, now)}
              </time>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
