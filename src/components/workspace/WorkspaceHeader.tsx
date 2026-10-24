import { CalendarPlus, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useWorkspace } from '../../hooks/useWorkspace'
import { workspaceTitle } from '../../workspace/navigation'
import { paths } from '../../workspace/paths'
import { AccountMenu } from '../AccountMenu'
import { DRAWER_ID } from '../shell/SidebarShell'
import { primaryButton } from '../ui'
import { compactButton, focusRing } from './styles'

// The bar above every workspace page: where you are, for which organization, and the one thing staff do most.
// Each page still has its own h1, so this names the section without repeating it as a heading.
export function WorkspaceHeader({ onOpenMenu, menuOpen }: { onOpenMenu: () => void; menuOpen: boolean }) {
  const { pathname } = useLocation()
  const { org } = useWorkspace()
  const showRequest = !pathname.startsWith(paths.newRide)

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
          <p className="truncate text-xs font-medium text-slate-500">{org?.name ?? 'Your organization'}</p>
          <p className="truncate font-heading text-base font-bold text-rc-navy sm:text-lg">{workspaceTitle(pathname)}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {showRequest && (
            <Link to={paths.newRide} className={`${primaryButton} ${compactButton} max-sm:w-11 max-sm:px-0`}>
              <CalendarPlus className="h-4 w-4 shrink-0" aria-hidden />
              <span className="max-sm:sr-only">Request a ride</span>
            </Link>
          )}
          <AccountMenu />
        </div>
      </div>
    </header>
  )
}
