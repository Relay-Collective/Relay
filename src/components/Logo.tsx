import { Link } from 'react-router-dom'
import logoMark from '../assets/logo-mark.svg'

interface Props {
  to?: string
  size?: 'sm' | 'md'
}

// The Relay Collective mark (two arcs passing a link through the centre) with the wordmark, as on the public site.
export function Logo({ to = '/', size = 'md' }: Props) {
  const mark = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const text = size === 'sm' ? 'text-xl' : 'text-2xl'
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
      aria-label="Relay Collective home"
    >
      <img src={logoMark} alt="" className={mark} />
      <span className={`font-heading font-extrabold tracking-[-0.02em] whitespace-nowrap ${text}`}>
        <span className="text-rc-navy">Relay</span>{' '}
        <span className="text-rc-blue">Collective</span>
      </span>
    </Link>
  )
}
