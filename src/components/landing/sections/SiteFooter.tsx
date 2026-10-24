import { LINKS, MISSION, TAGLINE } from '../content'
import { SmartLink, Wordmark } from '../primitives'
import { container, focusRing } from '../styles'

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Launch Platform', href: LINKS.signIn },
      { label: 'Create an account', href: LINKS.register },
      { label: 'Transportation app tour', href: LINKS.transportTour },
      { label: 'Volunteer as a driver', href: LINKS.registerDriver },
    ],
  },
  {
    title: 'Organization',
    links: [
      { label: 'Our mission', href: '#mission' },
      { label: 'The platform', href: '#platform' },
      { label: 'Our story', href: '#story' },
      { label: 'Principles', href: '#principles' },
      { label: 'Get involved', href: '#get-involved' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: LINKS.github },
      { label: 'Source code', href: LINKS.repo },
      { label: 'MIT License', href: LINKS.license },
    ],
  },
]

// 09: who we are, every way in, and the fine print, kept factual
export function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className={`${container} grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-5">
          <Wordmark />
          <p className="mt-6 font-heading text-xl font-bold tracking-tight text-rc-navy">{TAGLINE}</p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">{MISSION}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={`Footer: ${col.title}`}>
              <p className="font-heading text-sm font-bold text-rc-navy">{col.title}</p>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <SmartLink
                      href={l.href}
                      className={`inline-flex min-h-10 items-center rounded text-[15px] text-slate-600 transition-colors hover:text-rc-blue ${focusRing}`}
                    >
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-rc-line">
        <div className={`${container} flex flex-col gap-3 py-8 text-sm leading-relaxed text-slate-500 lg:flex-row lg:items-start lg:justify-between lg:gap-10`}>
          <p className="shrink-0">© {new Date().getFullYear()} Relay Collective</p>
          <p className="max-w-3xl lg:text-right">
            Born at FaithTech HACKVAN 2026 and developed in collaboration with The Salvation Army – Belkin Communities of Hope. Naming an
            organization does not imply its endorsement. Relay Collective is not an emergency service: in an emergency, call 911.
          </p>
        </div>
      </div>
    </footer>
  )
}
