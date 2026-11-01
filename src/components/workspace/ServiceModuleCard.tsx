import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LiveModule, PlannedModule } from '../../workspace/modules'
import { primaryButton } from '../ui'
import { compactButton } from './styles'

// A working module: what it does, how it's going, and the way in.
export function ServiceModuleCard({ module, status }: { module: LiveModule; status?: ReactNode }) {
  const Icon = module.icon
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rc-mint text-rc-teal-ink" aria-hidden>
          <Icon className="h-6 w-6" />
        </span>
        <AvailabilityPill availability="live" />
      </div>
      <h3 className="mt-4 font-heading text-lg font-bold text-rc-navy">{module.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{module.description}</p>
      {status && <div className="mt-3 text-sm text-slate-700">{status}</div>}
      <div className="mt-auto pt-5">
        <Link to={module.to} className={`${primaryButton} ${compactButton}`}>
          {module.actionLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  )
}

// A module on the roadmap. Dashed and without a link, so it never reads as something you can open.
export function PlannedModuleCard({ module }: { module: PlannedModule }) {
  const Icon = module.icon
  return (
    <article className="flex h-full gap-3 rounded-xl border border-dashed border-slate-300 bg-white/60 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500" aria-hidden>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-sans text-sm font-semibold text-rc-navy">{module.name}</h3>
          <AvailabilityPill availability="planned" />
        </div>
        <p className="mt-1 text-sm text-slate-600">{module.description}</p>
      </div>
    </article>
  )
}

// Same language as the public site: a solid dot for live, a dashed ring for planned
export function AvailabilityPill({ availability }: { availability: 'live' | 'planned' }) {
  const live = availability === 'live'
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        live ? 'bg-emerald-50 text-emerald-800' : 'border border-dashed border-slate-300 text-slate-600'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-emerald-600' : 'border border-slate-400'}`} aria-hidden />
      {live ? 'Active' : 'Planned'}
    </span>
  )
}
