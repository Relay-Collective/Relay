import { LogOut, PanelLeftClose, PanelLeftOpen, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoMark from '../../assets/logo-mark.svg'
import { useApp } from '../../hooks/useApp'
import { focusRing } from '../workspace/styles'

// rail: icons only. full: icons and words. responsive: a rail on tablets, full on desktop.
export type SidebarMode = 'rail' | 'full' | 'responsive'

export interface NavEntry {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean // active only on this exact address, not the pages under it
  badge?: string // key into the sidebar's live counts
}

export interface NavGroup {
  label?: string
  items: NavEntry[]
}

// A live count beside a link, and what it counts, for screen readers ("3 need attention")
export interface NavBadge {
  count: number
  label: string
  tone?: 'alert' | 'waiting' // red for problems, amber for work in a queue
}

interface Props {
  mode: SidebarMode
  onNavigate?: () => void // e.g. close the phone drawer
  onToggleCollapse?: () => void // desktop only
  home: { to: string; label: string }
  context: { initials: string; title: string; subtitle: string; className: string } // whose space this is
  contextIcon?: ReactNode // shown in place of the initials
  groups: NavGroup[]
  footer: NavEntry[]
  badges?: Record<string, NavBadge | undefined>
}

// The sidebar of a signed-in console: whose space it is, where you can go, and how to leave.
export function SidebarNav({ mode, onNavigate, onToggleCollapse, home, context, contextIcon, groups, footer, badges = {} }: Props) {
  const { signOut } = useApp()

  // Words show in full mode, and from the desktop breakpoint in responsive mode. They stay readable to screen readers.
  const words = mode === 'full' ? '' : mode === 'rail' ? 'sr-only' : 'sr-only lg:not-sr-only'
  const onlyFull = mode === 'full' ? '' : mode === 'rail' ? 'hidden' : 'hidden lg:block'
  const onlyRail = mode === 'full' ? 'hidden' : mode === 'rail' ? '' : 'lg:hidden'
  const center = mode === 'full' ? '' : mode === 'rail' ? 'justify-center' : 'justify-center lg:justify-start'

  const item = (entry: NavEntry) => {
    const badge = entry.badge ? badges[entry.badge] : undefined
    const count = badge?.count ?? 0
    const badgeTone = badge?.tone === 'waiting' ? 'bg-sun-400 text-ink' : 'bg-care-red text-white'
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
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${badgeTone} ${onlyFull}`} aria-hidden>
                {count}
              </span>
              <span className={`absolute right-2 top-2 h-2 w-2 rounded-full ${badgeTone} ${onlyRail}`} aria-hidden />
              <span className="sr-only">
                , {count} {badge?.label}
              </span>
            </>
          )}
        </NavLink>
      </li>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className={`flex h-16 shrink-0 items-center px-4 ${center}`}>
        <Link to={home.to} onClick={onNavigate} className={`inline-flex items-center gap-2.5 rounded-lg ${focusRing}`} aria-label={home.label}>
          <img src={logoMark} alt="" className="h-8 w-8" width={32} height={32} />
          <span className={`font-heading text-[17px] font-extrabold tracking-[-0.02em] whitespace-nowrap text-rc-navy ${onlyFull}`}>
            Relay <span className="text-rc-blue">Collective</span>
          </span>
        </Link>
      </div>

      <div className="px-3 pb-3">
        <div className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-rc-canvas p-2.5 ${center}`}>
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-heading text-sm font-bold ${context.className}`} aria-hidden>
            {contextIcon ?? context.initials}
          </span>
          <span className={`min-w-0 ${words}`}>
            <span className="block truncate text-sm font-bold text-rc-navy">{context.title}</span>
            <span className="block truncate text-xs text-slate-500">{context.subtitle}</span>
          </span>
        </div>
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 pb-4">
        {groups.map((group, i) => (
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
        {footer.length > 0 && <ul>{footer.map(item)}</ul>}
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
