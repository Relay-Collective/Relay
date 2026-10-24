import { ArrowUpRight } from 'lucide-react'
import { useRef, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logoMark from '../../assets/logo-mark.svg'
import type { Availability } from './content'
import { useInView } from './hooks'
import { focusRing } from './styles'

// Fades its children up the first time they scroll into view. Stagger siblings with delay.
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const shown = useInView(ref)
  return (
    <div
      ref={ref}
      data-revealed={shown || undefined}
      className={`rc-reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

interface SmartLinkProps {
  href: string
  className?: string
  children: ReactNode
  onClick?: () => void
}

// One link for every destination: in-page anchors, app routes, and outside sites (new tab, announced)
export function SmartLink({ href, className, children, onClick }: SmartLinkProps) {
  if (href.startsWith('#')) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
  if (/^https?:/.test(href)) {
    return (
      <a href={href} className={className} onClick={onClick} target="_blank" rel="noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }
  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

export function ExternalIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return <ArrowUpRight className={className} aria-hidden />
}

// Live work and planned work never look the same: a solid dot versus a dashed ring
export function StatusPill({ availability, children, onDark = false }: { availability: Availability; children?: ReactNode; onDark?: boolean }) {
  const live = availability === 'live'
  const tone = live
    ? onDark
      ? 'bg-rc-teal/20 text-rc-mint'
      : 'bg-rc-mint text-rc-teal-ink'
    : onDark
      ? 'border border-dashed border-white/30 text-white/75'
      : 'border border-dashed border-slate-300 text-slate-600'
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-rc-teal' : `border ${onDark ? 'border-white/60' : 'border-slate-400'}`}`}
        aria-hidden
      />
      {children ?? (live ? 'Working MVP' : 'Planned')}
    </span>
  )
}

export function Wordmark({ to = '/', onClick }: { to?: string; onClick?: () => void }) {
  return (
    <Link to={to} onClick={onClick} className={`inline-flex items-center gap-2.5 rounded-lg ${focusRing}`} aria-label="Relay Collective home">
      <img src={logoMark} alt="" className="h-9 w-9" width={36} height={36} />
      <span className="font-heading text-[19px] font-extrabold tracking-[-0.02em] whitespace-nowrap text-rc-navy">
        Relay <span className="text-rc-blue">Collective</span>
      </span>
    </Link>
  )
}
