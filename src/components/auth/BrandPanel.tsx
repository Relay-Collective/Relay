import { Building2, Car, Package, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logoMark from '../../assets/logo-mark.svg'
import { focusRing } from './styles'

interface Props {
  title: string
  body: string
}

// The left half of the sign-in and sign-up screens: who Relay Collective is, and a quiet picture
// of organizations, people, and services meeting on one shared layer.
export function BrandPanel({ title, body }: Props) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-rc-navy px-10 py-10 text-white xl:px-14">
      {/* Soft depth behind the network, kept to brand colours */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rc-blue/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-rc-teal/20 blur-3xl" aria-hidden />

      <Link to="/" className={`relative inline-flex items-center gap-2 self-start rounded-lg ${focusRing} focus-visible:ring-offset-rc-navy`} aria-label="Relay Collective home">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
          <img src={logoMark} alt="" className="h-8 w-8" />
        </span>
        <span className="font-heading text-xl font-extrabold tracking-[-0.02em]">Relay Collective</span>
      </Link>

      <div className="relative my-auto py-10">
        <NetworkMark />
        <h2 className="mt-10 max-w-md font-heading text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-balance text-white xl:text-[40px]">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/75">{body}</p>
      </div>

      <p className="relative flex items-center gap-2 text-sm text-white/60">
        <span className="h-2 w-2 rounded-full bg-rc-cyan" aria-hidden />
        Transportation coordination is live. Volunteer coordination and resource sharing are planned.
      </p>
    </div>
  )
}

const NODES: { x: number; y: number; icon: ReactNode; label: string }[] = [
  { x: 95, y: 60, icon: <Building2 className="h-5 w-5" />, label: 'Organizations' },
  { x: 290, y: 45, icon: <Users className="h-5 w-5" />, label: 'Staff and volunteers' },
  { x: 300, y: 230, icon: <Car className="h-5 w-5" />, label: 'Transportation' },
  { x: 95, y: 235, icon: <Package className="h-5 w-5" />, label: 'Shared resources' },
]
const HUB = { x: 190, y: 145 }

// Four kinds of participant joined at one hub. Decorative: the words beside it say the same thing.
function NetworkMark() {
  return (
    <div className="relative h-[280px] w-full max-w-[380px]" aria-hidden>
      <svg viewBox="0 0 380 280" className="absolute inset-0 h-full w-full">
        {NODES.map((n) => (
          <path
            key={n.label}
            d={`M${HUB.x},${HUB.y} Q${(HUB.x + n.x) / 2 + (n.y - HUB.y) * 0.18},${(HUB.y + n.y) / 2 - (n.x - HUB.x) * 0.18} ${n.x},${n.y}`}
            fill="none"
            stroke="currentColor"
            className="rc-flow text-rc-cyan/60"
            strokeWidth="1.5"
          />
        ))}
        <circle cx={HUB.x} cy={HUB.y} r="44" className="rc-pulse fill-rc-cyan/20" />
        <circle cx={HUB.x} cy={HUB.y} r="74" fill="none" stroke="currentColor" strokeDasharray="2 8" className="rc-spin text-white/20" />
      </svg>
      <span
        className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-[0_12px_40px_-12px_rgba(24,185,207,0.6)]"
        style={{ left: `${(HUB.x / 380) * 100}%`, top: `${(HUB.y / 280) * 100}%` }}
      >
        <img src={logoMark} alt="" className="h-10 w-10" />
      </span>
      {NODES.map((n) => (
        <span
          key={n.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1.5 pl-1.5 pr-3 text-xs font-semibold text-white backdrop-blur-sm"
          style={{ left: `${(n.x / 380) * 100}%`, top: `${(n.y / 280) * 100}%` }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-rc-navy">{n.icon}</span>
          <span className="hidden whitespace-nowrap xl:inline">{n.label}</span>
        </span>
      ))}
    </div>
  )
}
