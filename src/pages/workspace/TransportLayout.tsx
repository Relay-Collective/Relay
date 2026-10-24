import { CalendarPlus, LayoutDashboard, MapPin, Truck, type LucideIcon } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { AvailabilityPill } from '../../components/workspace/ServiceModuleCard'
import { focusRing } from '../../components/workspace/styles'
import { paths } from '../../workspace/paths'

const TABS: { to: string; label: string; icon: LucideIcon; end?: boolean }[] = [
  { to: paths.transport, label: 'Overview', icon: LayoutDashboard, end: true },
  { to: paths.newRide, label: 'New ride request', icon: CalendarPlus },
  { to: paths.destinations, label: 'Destinations', icon: MapPin },
]

// Transportation is one application inside the workspace: its own name and sections above its pages.
// The pages themselves are the existing booking, ride, and destination screens.
export function TransportLayout() {
  return (
    <>
      <div className="no-print mb-6 flex flex-col gap-3 border-b border-slate-200 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-2.5 sm:pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rc-mint text-rc-teal-ink" aria-hidden>
            <Truck className="h-4 w-4" />
          </span>
          <span className="font-heading text-sm font-bold text-rc-navy">Transportation</span>
          <AvailabilityPill availability="live" />
        </div>
        <nav aria-label="Transportation" className="-mb-px flex gap-1 overflow-x-auto">
          {TABS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 px-3 text-sm font-semibold transition ${focusRing} ${
                  isActive ? 'border-rc-blue text-rc-navy' : 'border-transparent text-slate-500 hover:text-rc-navy'
                }`
              }
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <Outlet />
    </>
  )
}
