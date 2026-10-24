import { ArrowRight, BadgeCheck, CircleX, Clock, Info, KeyRound, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/workspace/PageHeader'
import { AvailabilityPill } from '../../components/workspace/ServiceModuleCard'
import { Skeleton } from '../../components/workspace/states'
import { panel, panelHead, panelLink, panelTitle } from '../../components/workspace/styles'
import { useApp } from '../../hooks/useApp'
import { useWorkspace } from '../../hooks/useWorkspace'
import { ROLE_LABELS } from '../../logic/homeFor'
import type { VerificationStatus } from '../../types'
import { LIVE_MODULES } from '../../workspace/modules'
import { paths } from '../../workspace/paths'

const VERIFICATION: Record<VerificationStatus, { text: string; icon: typeof BadgeCheck; className: string }> = {
  APPROVED: { text: 'Verified', icon: BadgeCheck, className: 'bg-emerald-50 text-emerald-800' },
  PENDING: { text: 'Waiting for approval', icon: Clock, className: 'bg-sun-100 text-amber-900' },
  REJECTED: { text: 'Not approved', icon: CircleX, className: 'bg-red-50 text-red-800' },
}

// Who the organization is, where its rides start, and who can use the workspace.
// Read-only: these details are set when the organization registers, and nothing here edits them yet.
export function OrganizationProfile() {
  const { currentUser } = useApp()
  const { org, house } = useWorkspace()
  if (!currentUser) return null

  const verification = org && VERIFICATION[org.status]

  return (
    <div className="space-y-6">
      <PageHeader title="Organization profile" description="Your organization's details on Relay Collective, as registered." />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <section aria-labelledby="profile-title" className={panel}>
          <div className={panelHead}>
            <h2 id="profile-title" className={panelTitle}>
              Profile
            </h2>
            {verification && (
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${verification.className}`}>
                <verification.icon className="h-3.5 w-3.5" aria-hidden />
                {verification.text}
              </span>
            )}
          </div>
          <Details
            rows={[
              ['Organization name', org?.name],
              ['Type', org && 'Partner organization'],
              ['Contact person', org?.contactName],
              ['Contact phone', org?.contactPhone],
              ['Hears about new bookings', org && (org.bookingNotifications || 'Not set')],
            ]}
            loading={!org}
          />
        </section>

        <section aria-labelledby="location-title" className={panel}>
          <div className={panelHead}>
            <h2 id="location-title" className={`${panelTitle} flex items-center gap-2`}>
              <MapPin className="h-4 w-4 text-rc-teal-ink" aria-hidden /> Service location
            </h2>
            <Link to={paths.destinations} className={panelLink}>
              Saved destinations <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          {currentUser.houseId ? (
            <Details
              rows={[
                ['Name', house?.name],
                ['Address', house && `${house.address}${house.city && !house.address.includes(house.city) ? `, ${house.city}` : ''}`],
                ['Phone', house?.phone],
              ]}
              loading={!house}
              note="Every ride your organization requests starts here."
            />
          ) : (
            <p className="px-5 py-4 text-sm text-slate-600">No location is set up yet. Ask the Relay Collective team to add one before you request rides.</p>
          )}
        </section>

        <section aria-labelledby="access-title" className={panel}>
          <div className={panelHead}>
            <h2 id="access-title" className={`${panelTitle} flex items-center gap-2`}>
              <KeyRound className="h-4 w-4 text-rc-blue" aria-hidden /> Team access
            </h2>
          </div>
          <div className="px-5 py-4">
            <p className="text-sm text-slate-700">Your organization uses one shared staff account.</p>
            <dl className="mt-3 rounded-lg bg-rc-canvas p-3 text-sm">
              <dt className="sr-only">Account</dt>
              <dd className="font-semibold text-rc-navy">{currentUser.name}</dd>
              {currentUser.email && <dd className="text-slate-600">{currentUser.email}</dd>}
              <dd className="mt-1 text-xs font-medium text-slate-500">{ROLE_LABELS[currentUser.role]} account</dd>
            </dl>
            <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              Anyone with this sign-in can request and manage your organization's rides, so share it only with staff who need it. Individual staff accounts and
              roles aren't available yet.
            </p>
          </div>
        </section>

        <section aria-labelledby="org-services-title" className={panel}>
          <div className={panelHead}>
            <h2 id="org-services-title" className={panelTitle}>
              Services
            </h2>
            <Link to={paths.services} className={panelLink}>
              All services <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {LIVE_MODULES.map((m) => (
              <li key={m.id} className="flex items-center gap-3 px-5 py-3">
                <m.icon className="h-5 w-5 text-rc-teal-ink" aria-hidden />
                <Link to={m.to} className="flex-1 font-semibold text-rc-navy hover:underline">
                  {m.name}
                </Link>
                <AvailabilityPill availability="live" />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="flex items-start gap-2 text-sm text-slate-500">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        Editing these details isn't available in the workspace yet. If something here is out of date, let the Relay Collective team know.
      </p>
    </div>
  )
}

function Details({ rows, loading, note }: { rows: [label: string, value: ReactNode][]; loading: boolean; note?: string }) {
  return (
    <div className="px-5 py-4">
      <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="font-medium text-slate-500">{label}</dt>
            <dd className="break-words text-rc-navy">{loading ? <Skeleton className="h-4 w-36" /> : value || '—'}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-4 text-sm text-slate-500">{note}</p>}
    </div>
  )
}
