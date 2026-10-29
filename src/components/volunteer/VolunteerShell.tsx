import { Menu, MessageSquarePlus } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { VolunteerProvider } from '../../context/VolunteerProvider'
import { useApp } from '../../hooks/useApp'
import { useFeedback } from '../../hooks/useFeedback'
import { useVolunteer } from '../../hooks/useVolunteer'
import { initials } from '../../logic/initials'
import { canDrive, DRIVER_KIND_LABELS, driverKind } from '../../volunteer/participation'
import { VOLUNTEER_FEEDBACK_NAV, VOLUNTEER_HELP_NAV, volunteerNav, volunteerTabs, volunteerTitle } from '../../volunteer/navigation'
import { volunteerPaths } from '../../volunteer/paths'
import { AccountMenu } from '../AccountMenu'
import { SidebarNav } from '../shell/SidebarNav'
import { DRAWER_ID, SidebarShell, type SidebarSlotProps } from '../shell/SidebarShell'
import { AppFooter, LoadErrorBanner, PendingApprovalNotice, RideNotices } from '../ShellNotices'
import { focusRing } from '../workspace/styles'

// A volunteer's signed-in app: their own workspace, with transportation as the first service.
export function VolunteerShell() {
  return (
    <VolunteerProvider>
      <ShellFrame />
    </VolunteerProvider>
  )
}

function ShellFrame() {
  const { driver } = useVolunteer()
  return (
    <SidebarShell
      storageKey="rc-volunteer-sidebar-collapsed"
      sidebar={(props) => <VolunteerSidebar {...props} />}
      header={(props) => <VolunteerHeader {...props} />}
      banner={
        driver?.status === 'PENDING' && (
          <div className="no-print border-b border-amber-200 bg-sun-50">
            <PendingApprovalNotice isDriver statusLink={volunteerPaths.verification} className="px-4 py-3 sm:px-6 lg:px-8" />
          </div>
        )
      }
      bottomBar={<VolunteerTabBar />}
      footer={<AppFooter />}
    >
      <RideNotices />
      <LoadErrorBanner />
      <Outlet />
    </SidebarShell>
  )
}

function VolunteerSidebar(props: SidebarSlotProps) {
  const { currentUser } = useApp()
  const { driver, offers } = useVolunteer()
  const { openFeedback, unseenCount } = useFeedback()
  const name = currentUser?.name ?? ''
  return (
    <SidebarNav
      {...props}
      home={{ to: volunteerPaths.overview, label: 'Relay Collective volunteer workspace home' }}
      context={{
        initials: initials(name),
        title: name || 'Your workspace',
        subtitle: driver ? DRIVER_KIND_LABELS[driverKind(driver)] : 'Volunteer workspace',
        className: 'bg-rc-teal text-white',
      }}
      groups={volunteerNav(canDrive(driver))}
      footer={[VOLUNTEER_HELP_NAV, VOLUNTEER_FEEDBACK_NAV]}
      actions={[{ label: 'Send feedback', icon: MessageSquarePlus, onClick: () => openFeedback() }]}
      badges={{
        requests: { count: offers.data?.length ?? 0, label: 'ride requests waiting', tone: 'waiting' },
        feedback: { count: unseenCount, label: 'with new updates', tone: 'waiting' },
      }}
    />
  )
}

// The bar above every page: where you are, and the account menu. Each page still has its own h1.
function VolunteerHeader({ onOpenMenu, menuOpen }: { onOpenMenu: () => void; menuOpen: boolean }) {
  const { pathname } = useLocation()
  return (
    <header className="no-print sticky top-0 z-20 border-b border-slate-200 bg-white pt-[var(--safe-top)]">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls={DRAWER_ID}
          className={`-ml-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-rc-navy hover:bg-slate-100 md:hidden ${focusRing}`}
        >
          <Menu className="h-6 w-6" aria-hidden />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-slate-500">Volunteer workspace</p>
          <p className="truncate font-heading text-base font-bold text-rc-navy sm:text-lg">{volunteerTitle(pathname)}</p>
        </div>
        <AccountMenu />
      </div>
    </header>
  )
}

// Phones: the main places as a tab bar, so the next ride is never more than one tap away
function VolunteerTabBar() {
  const { driver, offers } = useVolunteer()
  const count = offers.data?.length ?? 0
  return (
    <nav aria-label="Quick">
      <ul className="flex">
        {volunteerTabs(canDrive(driver)).map(({ to, label, icon: Icon, end, badge }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-semibold ${focusRing} ${
                  isActive ? 'text-rc-blue' : 'text-slate-600'
                }`
              }
            >
              <Icon className="h-5 w-5" aria-hidden />
              {label}
              {badge && count > 0 && (
                <>
                  <span className="absolute right-[calc(50%-1.25rem)] top-2 rounded-full bg-sun-400 px-1.5 text-[11px] font-bold tabular-nums text-ink" aria-hidden>
                    {count}
                  </span>
                  <span className="sr-only">, {count} waiting</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
