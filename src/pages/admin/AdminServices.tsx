import { ArrowRight, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { adminPaths } from '../../admin/paths'
import { PageHeader } from '../../components/workspace/PageHeader'
import { AvailabilityPill, PlannedModuleCard } from '../../components/workspace/ServiceModuleCard'
import { panel, panelTitle } from '../../components/workspace/styles'
import { PLANNED_MODULES } from '../../workspace/modules'

// The platform's service modules. Modules aren't switched on or off per organization yet, so there are no toggles here.
export function AdminServices() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Services"
        description="Relay Collective is built as service modules on one shared foundation of organizations, accounts, and requests."
      />

      <section aria-labelledby="live-title">
        <h2 id="live-title" className={`${panelTitle} mb-3`}>
          In use
        </h2>
        <article className={`${panel} max-w-xl p-5`}>
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rc-mint text-rc-teal-ink" aria-hidden>
              <Truck className="h-6 w-6" />
            </span>
            <AvailabilityPill availability="live" />
          </div>
          <h3 className="mt-4 font-heading text-lg font-bold text-rc-navy">Transportation coordination</h3>
          <p className="mt-1 text-sm text-slate-600">
            The existing MVP foundation. Partner organizations request rides for the people they support, verified drivers accept them, and
            staff follow each trip to drop-off. Every partner organization can use it once registered.
          </p>
          <Link to={adminPaths.transportation} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rc-blue hover:underline">
            Manage transportation <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </article>
      </section>

      <section aria-labelledby="planned-title">
        <h2 id="planned-title" className={panelTitle}>
          Planned
        </h2>
        <p className="mb-3 mt-0.5 text-sm text-slate-500">Not built yet. Listed so the roadmap is visible, not as something to configure.</p>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {PLANNED_MODULES.map((m) => (
            <PlannedModuleCard key={m.id} module={m} />
          ))}
        </div>
      </section>
    </div>
  )
}
