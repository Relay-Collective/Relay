import { LINKS, MISSION, PARTNER, TAGLINE, TEAM } from '../content'
import { SmartLink, Wordmark } from '../primitives'
import { container, focusRing } from '../styles'

const COLUMNS: { title: string; id?: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Log in', href: LINKS.signIn },
      { label: 'Create an account', href: LINKS.register },
      { label: 'Register your organization', href: LINKS.registerOrg },
      { label: 'Volunteer as a driver', href: LINKS.registerDriver },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Platform', href: '#platform' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'The workspace', href: '#showcase' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Impact', href: '#impact' },
    ],
  },
  {
    title: 'Resources',
    id: 'resources',
    links: [
      { label: 'Transportation app tour', href: LINKS.transportTour },
      { label: 'GitHub', href: LINKS.github },
      { label: 'Source code', href: LINKS.repo },
      { label: 'MIT License', href: LINKS.license },
    ],
  },
]

const link = `inline-flex min-h-10 items-center rounded font-dm text-[15px] text-white/65 transition-colors duration-200 hover:text-white ${focusRing}`

// 08: who we are, every way in, and the fine print, kept factual
export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden bg-midnight text-white">
      <div className={`${container} grid gap-14 pb-16 pt-20 sm:pt-24 lg:grid-cols-12 lg:gap-8`}>
        <div className="lg:col-span-4">
          <Wordmark />
          <p className="mt-8 font-grotesk text-2xl font-medium tracking-[-0.03em]">{TAGLINE}</p>
          <p className="mt-4 max-w-sm font-dm text-[15px] leading-relaxed text-white/60">{MISSION}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {COLUMNS.map((col) => (
            <nav key={col.title} id={col.id} aria-label={`Footer: ${col.title}`} className={col.id ? 'scroll-mt-24' : undefined}>
              <p className="font-dm text-xs font-semibold uppercase tracking-[0.18em] text-fog">{col.title}</p>
              <ul className="mt-5 space-y-1">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href} className={link}>
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={container}>
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 font-dm text-sm leading-relaxed text-white/55 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <p className="shrink-0">
            © {new Date().getFullYear()} Relay Collective · Built by{' '}
            {TEAM.map((m, i) => (
              <span key={m.handle}>
                <a
                  href={`https://github.com/${m.handle}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded text-white/75 underline-offset-4 hover:text-white hover:underline ${focusRing}`}
                >
                  {m.name}
                  <span className="sr-only"> on GitHub (opens in a new tab)</span>
                </a>
                {i < TEAM.length - 2 ? ', ' : i === TEAM.length - 2 ? ' and ' : ''}
              </span>
            ))}
          </p>
          <p className="max-w-2xl lg:text-right">
            Born at FaithTech HACKVAN 2026 and developed in partnership with {PARTNER.name} – {PARTNER.program}. Relay Collective is an
            independent platform. It is not an emergency service: in an emergency, call 911.
          </p>
        </div>
      </div>

      {/* The name, once more, as architecture */}
      <p
        className="pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-center font-grotesk text-[12.6vw] font-semibold leading-none tracking-[-0.06em] text-white/[0.045]"
        aria-hidden
      >
        Relay Collective
      </p>
    </footer>
  )
}
