import { Blocks, Building2, CircleHelp, Inbox, LayoutDashboard, type LucideIcon } from 'lucide-react'
import { LIVE_MODULES } from './modules'
import { paths } from './paths'

export interface NavEntry {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean // active only on this exact address, not the pages under it
  badge?: 'attention' // filled in by the sidebar from live data
}

export interface NavGroup {
  label?: string
  items: NavEntry[]
}

// The workspace sidebar. Only working destinations belong here: planned modules stay off it.
export const WORKSPACE_NAV: NavGroup[] = [
  {
    items: [
      { to: paths.overview, label: 'Overview', icon: LayoutDashboard, end: true },
      { to: paths.requests, label: 'Requests', icon: Inbox, badge: 'attention' },
      { to: paths.services, label: 'Services', icon: Blocks, end: true },
    ],
  },
  {
    label: 'Services',
    items: LIVE_MODULES.map((m) => ({ to: m.to, label: m.name, icon: m.icon })),
  },
  {
    label: 'Organization',
    items: [{ to: paths.organization, label: 'Organization profile', icon: Building2 }],
  },
]

export const HELP_NAV: NavEntry = { to: paths.help, label: 'Help and support', icon: CircleHelp }

// The page name shown in the workspace header, from the most specific matching address
const TITLES: [prefix: string, title: string][] = [
  [paths.newRide, 'Transportation'],
  [paths.destinations, 'Transportation'],
  [paths.transport, 'Transportation'],
  [paths.requests, 'Requests'],
  [paths.services, 'Services'],
  [paths.organization, 'Organization profile'],
  [paths.help, 'Help and support'],
  [paths.overview, 'Overview'],
]

export function workspaceTitle(pathname: string): string {
  return TITLES.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.[1] ?? 'Workspace'
}
