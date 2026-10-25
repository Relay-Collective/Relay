import { ArrowRight, CalendarClock, Car, Lock, ShieldOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DetailList } from '../../components/admin/controls'
import { VerificationBadge } from '../../components/admin/VerificationBadge'
import { DriverVehicleFields } from '../../components/DriverFields'
import type { DriverDraft } from '../../components/driverDraft'
import { SaveBar } from '../../components/volunteer/SaveBar'
import { SettingsSection } from '../../components/volunteer/SettingsSection'
import { RestrictedState } from '../../components/volunteer/states'
import { VerificationSummary } from '../../components/volunteer/VerificationSummary'
import { PageHeader } from '../../components/workspace/PageHeader'
import { SkeletonRows } from '../../components/workspace/states'
import { panel, panelHead, panelLink, panelTitle } from '../../components/workspace/styles'
import { useApp } from '../../hooks/useApp'
import { useCurrentOrg } from '../../hooks/useCurrent'
import { useDriverEdits } from '../../hooks/useDriverEdits'
import { useVolunteer } from '../../hooks/useVolunteer'
import { initials } from '../../logic/initials'
import { describeRequestHours } from '../../logic/requestHours'
import { MAX_NAME, tooLong } from '../../logic/validate'
import type { Driver, User } from '../../types'
import { DRIVER_KIND_LABELS, serviceRoles } from '../../volunteer/participation'
import { volunteerPaths } from '../../volunteer/paths'

// Who the volunteer is, how they take part, and their driver details. Only vehicle details are editable here:
// contact details and approval are changed by the Relay Collective team, and the backend refuses anything else.
export function Profile() {
  const { currentUser } = useApp()
  const { driver, driverLoaded } = useVolunteer()
  if (!currentUser) return null
  if (!driverLoaded) return <SkeletonRows rows={4} label="Loading your profile" />

  return (
    <div className="space-y-6 pb-28">
      <PageHeader title="My profile" description="Your details, how you take part in Relay Collective, and your transportation information." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <PersonalInfo user={currentUser} />
          <Participation user={currentUser} driver={driver} />
        </div>
        <div className="space-y-6">
          {driver ? (
            <>
              <TransportationDetails driver={driver} />
              <VerificationSummary driver={driver} />
            </>
          ) : (
            <RestrictedState icon={<ShieldOff className="h-6 w-6" />} title="No transportation profile">
              <p>This account isn't set up to drive, so there are no transportation details to show.</p>
            </RestrictedState>
          )}
        </div>
      </div>
    </div>
  )
}

function PersonalInfo({ user }: { user: User }) {
  return (
    <section aria-labelledby="personal-title" className={panel}>
      <div className={panelHead}>
        <h2 id="personal-title" className={panelTitle}>
          Personal information
        </h2>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
          <Lock className="h-3.5 w-3.5" aria-hidden /> Managed by Relay Collective
        </span>
      </div>
      <div className="flex items-center gap-4 px-5 pt-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rc-teal font-heading text-lg font-bold text-white" aria-hidden>
          {initials(user.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-heading text-lg font-bold text-rc-navy">{user.name}</p>
          <p className="truncate text-sm text-slate-600">{user.email ?? 'No sign-in email on file'}</p>
        </div>
      </div>
      <div className="mt-3">
        <DetailList
          rows={[
            ['Display name', user.name],
            ['Email', user.email ?? '—'],
            ['Mobile phone', user.phone || '—'],
          ]}
        />
      </div>
      <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
        Your first name and phone number are shared only with the organization whose ride you accept. To change your name or phone number, contact the Relay
        Collective team.
      </p>
    </section>
  )
}

function Participation({ user, driver }: { user: User; driver: Driver | undefined }) {
  const roles = serviceRoles(user, driver)
  const org = useCurrentOrg()
  return (
    <section aria-labelledby="participation-title" className={panel}>
      <div className={panelHead}>
        <h2 id="participation-title" className={panelTitle}>
          Participation
        </h2>
      </div>
      {roles.length === 0 ? (
        <p className="px-5 py-4 text-sm text-slate-600">You don't hold any service roles yet.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {roles.map((r) => (
            <li key={r.service} className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
              <span>
                <span className="block font-semibold text-rc-navy">Transportation</span>
                <span className="block text-sm text-slate-600">{DRIVER_KIND_LABELS[r.kind]}</span>
              </span>
              <VerificationBadge status={r.status} />
            </li>
          ))}
        </ul>
      )}
      {org && <DetailList rows={[['Organization', org.name]]} />}
      <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">Service roles are granted by the Relay Collective team after review.</p>
    </section>
  )
}

function TransportationDetails({ driver }: { driver: Driver }) {
  const approved = driver.status === 'APPROVED'
  const edits = useDriverEdits(driver, ['vehicle', 'seats', 'wheelchairAccessible'], (s) => ({
    vehicle: s.vehicle.trim() ? tooLong(s.vehicle, MAX_NAME) : 'Describe your vehicle so passengers can find it.',
  }))
  // DriverVehicleFields works on a whole driver draft; only the vehicle fields are read back
  const draft = { ...driver, ...edits.current, name: '', phone: '' } as DriverDraft

  return (
    <>
      <SettingsSection
        id="vehicle-title"
        icon={<Car className="h-5 w-5" />}
        title="Transportation details"
        description="Your vehicle, and who it can carry. We only send you rides it can take."
      >
        <DriverVehicleFields
          value={draft}
          onChange={({ vehicle, seats, wheelchairAccessible }) => {
            const patch: Partial<Pick<Driver, 'vehicle' | 'seats' | 'wheelchairAccessible'>> = {}
            if (vehicle !== edits.current.vehicle) patch.vehicle = vehicle
            if (seats !== edits.current.seats) patch.seats = seats
            if (wheelchairAccessible !== edits.current.wheelchairAccessible) patch.wheelchairAccessible = wheelchairAccessible
            edits.change(patch)
          }}
          errors={edits.errors}
          lockCapacity={approved}
          showCities={false}
        />
      </SettingsSection>

      <section aria-labelledby="area-summary-title" className={panel}>
        <div className={panelHead}>
          <h2 id="area-summary-title" className={`${panelTitle} flex items-center gap-2`}>
            <CalendarClock className="h-4 w-4 text-rc-teal-ink" aria-hidden /> Availability and area
          </h2>
          <Link to={volunteerPaths.availability} className={panelLink}>
            Change <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <DetailList
          rows={[
            ['Operating area', driver.serviceCities.join(', ') || 'None chosen'],
            ['Request hours', describeRequestHours(driver.requestHours)],
          ]}
        />
      </section>

      <SaveBar dirty={edits.dirty} state={edits.state} onSave={edits.save} onCancel={edits.discard} />
    </>
  )
}
