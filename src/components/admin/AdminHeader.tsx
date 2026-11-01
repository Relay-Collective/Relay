import { Menu, Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { adminTitle } from '../../admin/navigation'
import { adminPaths } from '../../admin/paths'
import { AccountMenu } from '../AccountMenu'
import { input } from '../ui'
import { DRAWER_ID } from '../shell/SidebarShell'
import { focusRing } from '../workspace/styles'

// Where you are, a search across organizations and people, and who's signed in
export function AdminHeader({ onOpenMenu, menuOpen }: { onOpenMenu: () => void; menuOpen: boolean }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const onSearchPage = pathname === adminPaths.search
  const [query, setQuery] = useState(onSearchPage ? (params.get('q') ?? '') : '')

  function submit(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) navigate(`${adminPaths.search}?q=${encodeURIComponent(q)}`)
  }

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
          <p className="truncate text-xs font-medium text-slate-500">
            <span className="mr-1.5 inline-block rounded bg-ink px-1.5 py-px font-semibold text-white">Admin</span>
            Platform administration
          </p>
          <p className="truncate font-heading text-base font-bold text-rc-navy sm:text-lg">{adminTitle(pathname)}</p>
        </div>

        <form role="search" onSubmit={submit} className="relative hidden w-72 lg:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search organizations and people"
            aria-label="Search organizations and people"
            className={`${input} min-h-11 pl-10 text-sm`}
          />
        </form>
        <Link
          to={adminPaths.search}
          aria-label="Search"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-rc-navy hover:bg-slate-100 lg:hidden ${focusRing}`}
        >
          <Search className="h-5 w-5" aria-hidden />
        </Link>
        <AccountMenu />
      </div>
    </header>
  )
}
