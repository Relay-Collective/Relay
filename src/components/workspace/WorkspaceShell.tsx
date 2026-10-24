import { X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { WorkspaceProvider } from '../../context/WorkspaceProvider'
import { useWorkspace } from '../../hooks/useWorkspace'
import { AppFooter, LoadErrorBanner, PendingApprovalNotice, RideNotices } from '../ShellNotices'
import { focusRing } from './styles'
import { WorkspaceHeader } from './WorkspaceHeader'
import { WorkspaceSidebar } from './WorkspaceSidebar'

const COLLAPSED_KEY = 'rc-workspace-sidebar-collapsed'

// A remembered layout choice only. Storage can be blocked, so it falls back to open.
function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(COLLAPSED_KEY) === '1'
  } catch {
    return false
  }
}

function writeCollapsed(value: boolean) {
  try {
    window.localStorage.setItem(COLLAPSED_KEY, value ? '1' : '0')
  } catch {
    // Not remembered next time; nothing else depends on it
  }
}

// A partner organization's signed-in app. Desktop: a sidebar that can collapse to icons.
// Tablet: the icon rail. Phone: a drawer from the menu button.
export function WorkspaceShell() {
  return (
    <WorkspaceProvider>
      <ShellFrame />
    </WorkspaceProvider>
  )
}

function ShellFrame() {
  const { org } = useWorkspace()
  const [collapsed, setCollapsed] = useState(readCollapsed)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      writeCollapsed(!c)
      return !c
    })
  }

  // Bars fixed to the bottom of a page (e.g. the booking form's send button) start after the sidebar
  const inset = collapsed ? 'md:[--shell-inset:4.5rem]' : 'md:[--shell-inset:4.5rem] lg:[--shell-inset:16rem]'

  return (
    <div className={`workspace min-h-screen bg-canvas ${inset}`}>
      <a
        href="#workspace-main"
        className={`sr-only z-50 rounded-full bg-white px-4 py-2 font-semibold text-rc-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4 ${focusRing}`}
      >
        Skip to content
      </a>

      <aside
        aria-label="Sidebar"
        className={`no-print fixed inset-y-0 left-0 z-30 hidden border-r border-slate-200 bg-white pt-[var(--safe-top)] md:block md:w-[4.5rem] ${collapsed ? '' : 'lg:w-64'}`}
      >
        <WorkspaceSidebar mode={collapsed ? 'rail' : 'responsive'} onToggleCollapse={toggleCollapsed} />
      </aside>

      <NavDrawer open={drawerOpen} onClose={closeDrawer} />

      <div className="flex min-h-screen flex-col md:pl-[var(--shell-inset)]">
        <WorkspaceHeader onOpenMenu={() => setDrawerOpen(true)} menuOpen={drawerOpen} />

        {org?.status === 'PENDING' && (
          <div className="no-print border-b border-amber-200 bg-sun-50">
            <PendingApprovalNotice isDriver={false} className="px-4 py-3 sm:px-6 lg:px-8" />
          </div>
        )}

        <main id="workspace-main" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 focus:outline-none sm:px-6 lg:px-8 lg:py-8">
          <RideNotices />
          <LoadErrorBanner />
          <Outlet />
        </main>

        <AppFooter className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8" />
      </div>
    </div>
  )
}

// Phones: the full sidebar in a modal drawer. A modal dialog keeps focus inside and closes on Escape.
function NavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // The drawer only exists below the tablet breakpoint; widening the window closes it
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const onChange = () => query.matches && onClose()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      id="workspace-drawer"
      aria-label="Navigation"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()} // a tap on the backdrop
      className="no-print m-0 h-full max-h-none w-[min(20rem,85vw)] max-w-none bg-white p-0 pt-[var(--safe-top)] backdrop:bg-rc-navy/40 open:animate-step-back md:hidden"
    >
      <div className="relative h-full">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className={`absolute right-2 top-2.5 z-10 flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 ${focusRing}`}
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        {open && <WorkspaceSidebar mode="full" onNavigate={onClose} />}
      </div>
    </dialog>
  )
}
