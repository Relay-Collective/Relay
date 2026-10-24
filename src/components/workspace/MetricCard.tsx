import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Skeleton } from './states'
import { focusRing } from './styles'

interface Props {
  label: string
  value: number | undefined // undefined while loading; never shown as 0
  hint: string
  icon: LucideIcon
  to: string
  alert?: boolean | 'amber' // red: something's wrong; amber: work is waiting
}

// One headline number that opens the list behind it.
export function MetricCard({ label, value, hint, icon: Icon, to, alert }: Props) {
  const loading = value === undefined
  const raised = alert && !!value
  const look = alert === 'amber'
    ? { card: 'border-amber-300 bg-sun-50', icon: 'bg-sun-100 text-amber-900', hint: 'font-semibold text-amber-900' }
    : { card: 'border-red-300 bg-red-50/40', icon: 'bg-red-100 text-red-700', hint: 'font-semibold text-red-700' }
  return (
    <Link
      to={to}
      aria-label={loading ? `${label}: loading` : `${label}: ${value}. ${hint}`}
      className={`group flex h-full flex-col rounded-xl border bg-white p-4 transition hover:border-slate-400 sm:p-5 ${focusRing} ${
        raised ? look.card : 'border-slate-200'
      }`}
    >
      <span className="flex items-start justify-between gap-2">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${raised ? look.icon : 'bg-brand-50 text-rc-blue'}`} aria-hidden>
          <Icon className="h-5 w-5" />
        </span>
        <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-rc-navy" aria-hidden />
      </span>
      <span className="mt-4 block font-heading text-3xl font-extrabold tabular-nums tracking-tight text-rc-navy" aria-hidden>
        {loading ? <Skeleton className="h-8 w-12" /> : value}
      </span>
      <span className="mt-1 block text-sm font-semibold text-slate-700" aria-hidden>
        {label}
      </span>
      <span className={`mt-0.5 block text-xs ${raised ? look.hint : 'text-slate-500'}`} aria-hidden>
        {hint}
      </span>
    </Link>
  )
}
