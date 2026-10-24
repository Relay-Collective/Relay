import { LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logoMark from '../../assets/logo-mark.svg'
import { useApp } from '../../hooks/useApp'
import { useNow } from '../../hooks/useNow'
import { useWorkspace } from '../../hooks/useWorkspace'
import { requestMetrics } from '../../logic/requestSummary'
import { HELP_NAV, WORKSPACE_NAV, type NavEntry } from '../../workspace/navigation'
import { paths } from '../../workspace/paths'
import { focusRing } from './styles'

interface Props {
  // rail: icons only. full: icons and words. responsive: a rail on tablets, full on desktop.
  mode: 'rail' | 'full' | 'responsive'
  onNavigate?: () => void // e.g. close the phone drawer
  onToggleCollapse?: () => void // desktop only
}

// The workspace's navigation: who you're working for, where you can go, and how to leave.
export function WorkspaceSidebar({ mode, onNavigate, onToggleCollapse }: Props) {
  const { signOut } = useApp()
  const { org, rides } = useWorkspace()
  const now = useNow()
  const attention = rides.data ? requestMetrics(rides.data, new Date(now)).attention : 0

  // Words show in full mode, and from the desktop breakpoint in responsive mode. They stay readable to screen readers.
  const words = mode === 'full' ? '' : mode === 'rail' ? 'sr-only' : 'sr-only lg:not-sr-only'
  const onlyFull = mode === 'full' ? '' : mode === 'rail' ? 'hidden' : 'hidden lg:block'
  const onlyRail = mode === 'full' ? 'hidden' : mode === 'rail' ? '' : 'lg:hidden'
  const center = mode === 'full' ? '' : mode === 'rail' ? 'justify-center' : 'justify-center lg:justify-start'

  const item = (entry: NavEntry) => {
    const count = entry.badge === 'attention' ? attention : 0
    const Icon = entry.icon
    return (
      <li key={entry.to}>
        <NavLink
          to={entry.to}
          end={entry.end}
          onClick={onNavigate}
          title={mode === 'full' ? undefined : entry.label}
          className={({ isActive }) =>
            `relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-[15px] font-semibold transition ${center} ${focusRing} ${
              isActive ? 'bg-brand-50 text-rc-blue' : 'text-slate-600 hover:bg-slate-100 hover:text-rc-navy'
            }`
          }
        >
          <Icon className="h-5 w-5 shrink-0" aria-hidden />
          <span className={`min-w-0 flex-1 truncate ${words}`}>{entry.label}</span>
          {count > 0 && (
            <>
              <span className={`rounded-full bg-care-red px-2 py-0.5 text-xs font-bold tabular-nums text-white ${onlyFull}`} aria-hidden>
                {count}
              </span>
              <span className={`absolute right-2 top-2 h-2 w-2 rounded-full bg-care-red ${onlyRail}`} aria-hidden />
              <span className="sr-only">, {count} need attention</span>
            </>
          )}
        </NavLink>
      </li>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className={`flex h-16 shrink-0 items-center px-4 ${center}`}>
        <Link to={paths.overview} onClick={onNavigate} className={`inline-flex items-center gap-2.5 rounded-lg ${focusRing}`} aria-label="Relay Collective workspace home">
          <img src={logoMark} alt="" className="h-8 w-8" width={32} height={32} />
          <span className={`font-heading text-[17px] font-extrabold tracking-[-0.02em] whitespace-nowrap text-rc-navy ${onlyFull}`}>
            Relay <span className="text-rc-blue">Collective</span>
          </span>
        </Link>
      </div>

      {/* Whose workspace this is. One account belongs to one organization, so there is nothing to switch to. */}
      <div className="px-3 pb-3">
        <div className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-rc-canvas p-2.5 ${center}`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rc-navy font-heading text-sm font-bold text-white" aria-hidden>
            {org ? initials(org.name) : ''}
          </span>
          <span className={`min-w-0 ${words}`}>
            <span className="block truncate text-sm font-bold text-rc-navy">{org?.name ?? 'Your organization'}</span>
            <span className="block truncate text-xs text-slate-500">Nonprofit workspace</span>
          </span>
        </div>
      </div>

      <nav aria-label="Workspace" className="flex-1 overflow-y-auto px-3 pb-4">
        {WORKSPACE_NAV.map((group, i) => (
          <div key={group.label ?? i} className={i ? 'mt-5' : ''}>
            {group.label && (
              <>
                <p className={`px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${onlyFull}`} aria-hidden>
                  {group.label}
                </p>
                <div className={`mx-3 mb-2 border-t border-slate-200 ${onlyRail}`} aria-hidden />
              </>
            )}
            <ul className="space-y-0.5" aria-label={group.label}>
              {group.items.map(item)}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-0.5 border-t border-slate-200 p-3">
        <ul>{item(HELP_NAV)}</ul>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`hidden min-h-11 w-full items-center gap-3 rounded-lg px-3 text-[15px] font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-rc-navy lg:flex ${center} ${focusRing}`}
            aria-label={mode === 'rail' ? 'Expand sidebar' : 'Collapse sidebar'}
            title={mode === 'rail' ? 'Expand sidebar' : undefined}
          >
            {mode === 'rail' ? <PanelLeftOpen className="h-5 w-5 shrink-0" aria-hidden /> : <PanelLeftClose className="h-5 w-5 shrink-0" aria-hidden />}
            <span className={words} aria-hidden>
              Collapse
            </span>
          </button>
        )}
        <button
          type="button"
          onClick={() => void signOut()}
          title={mode === 'full' ? undefined : 'Sign out'}
          className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-[15px] font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-700 ${center} ${focusRing}`}
        >
          <LogOut className="h-5 w-5 shrink-0" aria-hidden />
          <span className={words}>Sign out</span>
        </button>
      </div>
    </div>
  )
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('')
}
