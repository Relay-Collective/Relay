import { ArrowRight, Building2, CalendarPlus, CircleAlert, CircleCheck, Clock, History, Inbox, MapPin, PartyPopper, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionRequiredList } from '../../components/workspace/ActionRequiredList'
import { MetricCard } from '../../components/workspace/MetricCard'
import { PageHeader } from '../../components/workspace/PageHeader'
import { QuickActions, type QuickAction } from '../../components/workspace/QuickActions'
import { RecentActivityList } from '../../components/workspace/RecentActivityList'
import { PlannedModuleCard, ServiceModuleCard } from '../../components/workspace/ServiceModuleCard'
import { EmptyState, SectionError, Skeleton, SkeletonRows } from '../../components/workspace/states'
import { panel, panelHead, panelLink, panelTitle } from '../../components/workspace/styles'
import { primaryButton } from '../../components/ui'
import { useApp } from '../../hooks/useApp'
import { useNow } from '../../hooks/useNow'
import { useWorkspace } from '../../hooks/useWorkspace'
import { actionItems, COMPLETED_WINDOW_DAYS, recentActivity, requestMetrics } from '../../logic/requestSummary'
import { greetingFor } from '../../logic/rideInsights'
import type { House, Organization, User } from '../../types'
import { LIVE_MODULES, PLANNED_MODULES } from '../../workspace/modules'
import { paths } from '../../workspace/paths'

const ACTION_LIMIT = 5
const ACTIVITY_LIMIT = 8

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

// A partner organization's account is shared and often named after the organization or its house.
// Greet a person by first name, but don't greet "Belkin House" as "Belkin".
function greetingName(user: User, org?: Organization, house?: House): string | undefined {
  const name = user.name.trim()
  const shared = [org?.name, house?.name].some((n) => n && n.trim().toLowerCase() === name.toLowerCase())
  return name && !shared ? name.split(/\s+/)[0] : undefined
}

// The organization's home: what needs attention, how requests are going, and the services it can use.
export function Overview() {
  const { currentUser } = useApp()
  const { org, house, rides } = useWorkspace()
  const now = useNow()
  if (!currentUser) return null

  const nowDate = new Date(now)
  const all = rides.data
  const metrics = all && requestMetrics(all, nowDate)
  const actions = all ? actionItems(all, nowDate) : []
  const activity = all ? recentActivity(all, ACTIVITY_LIMIT) : []
  const loading = !all && !rides.error
  const failed = !all && !!rides.error

  const name = greetingName(currentUser, org, house)
  const greeting = greetingFor(nowDate.getHours())
  const date = nowDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  const quickActions: QuickAction[] = [
    { to: paths.newRide, label: 'Request a ride', detail: 'Book transportation for someone you support', icon: CalendarPlus },
    { to: paths.requests, label: 'View requests', detail: metrics ? plural(metrics.open, 'open request', 'open requests') : 'Every request in one list', icon: Inbox },
    { to: paths.destinations, label: 'Saved destinations', detail: 'Places your clients often go', icon: MapPin },
    { to: paths.organization, label: 'Organization profile', detail: 'Details, location, and access', icon: Building2 },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={date}
        title={name ? `${greeting}, ${name}.` : `${greeting}.`}
        description={org ? `Here's what's happening at ${org.name}.` : "Here's what's happening in your workspace."}
      />

      {!currentUser.houseId && (
        <p role="note" className="flex items-start gap-2 rounded-xl border border-amber-200 bg-sun-50 p-4 text-sm text-amber-900">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          This account has no pickup location yet, so it can't request rides. Ask the Relay Collective team to add one.
        </p>
      )}

      <section aria-labelledby="metrics-title">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="metrics-title" className={panelTitle}>
            Transportation requests
          </h2>
          {failed && <p className="text-sm text-red-700">Couldn't load these numbers.</p>}
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            label="Need attention"
            value={metrics?.attention}
            hint={metrics?.attention ? 'Open them to resolve' : 'Nothing waiting on you'}
            icon={CircleAlert}
            to={`${paths.requests}?view=attention`}
            alert
          />
          <MetricCard label="Awaiting a driver" value={metrics?.waiting} hint="Drivers are being asked" icon={Clock} to={`${paths.requests}?view=waiting`} />
          <MetricCard
            label="Confirmed or under way"
            value={metrics?.confirmed}
            hint="A driver has accepted"
            icon={Route}
            to={`${paths.requests}?view=confirmed`}
          />
          <MetricCard
            label="Completed"
            value={metrics?.completedRecently}
            hint={`In the last ${COMPLETED_WINDOW_DAYS} days`}
            icon={CircleCheck}
            to={`${paths.requests}?view=past`}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
        <div className="space-y-6 lg:col-span-2">
          <section aria-labelledby="action-title" className={panel}>
            <div className={panelHead}>
              <h2 id="action-title" className={`${panelTitle} flex items-center gap-2`}>
                Action required
                {actions.length > 0 && (
                  <span className="rounded-full bg-care-red px-2 py-0.5 text-xs font-bold tabular-nums text-white">{actions.length}</span>
                )}
              </h2>
              {actions.length > ACTION_LIMIT && (
                <Link to={`${paths.requests}?view=attention`} className={panelLink}>
                  View all <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </div>
            {loading ? (
              <SkeletonRows rows={2} label="Loading requests that need attention" />
            ) : failed ? (
              <SectionError />
            ) : actions.length === 0 ? (
              <EmptyState
                icon={<PartyPopper className="h-6 w-6" />}
                title="You're all caught up."
                text="There are no active transportation requests requiring attention."
              />
            ) : (
              <ActionRequiredList items={actions} now={now} limit={ACTION_LIMIT} />
            )}
          </section>

          <section aria-labelledby="activity-title" className={panel}>
            <div className={panelHead}>
              <div>
                <h2 id="activity-title" className={panelTitle}>
                  Recent activity
                </h2>
                <p className="text-sm text-slate-500">Transportation requests, as each ride last changed</p>
              </div>
              {activity.length > 0 && (
                <Link to={paths.requests} className={panelLink}>
                  All requests <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </div>
            {loading ? (
              <SkeletonRows rows={4} label="Loading recent activity" />
            ) : failed ? (
              <SectionError />
            ) : activity.length === 0 ? (
              <EmptyState
                icon={<History className="h-6 w-6" />}
                title="No transportation activity yet"
                text="Your organization hasn't created any transportation requests yet."
                action={
                  currentUser.houseId && (
                    <Link to={paths.newRide} className={primaryButton}>
                      <CalendarPlus className="h-5 w-5" aria-hidden /> Request a ride
                    </Link>
                  )
                }
              />
            ) : (
              <RecentActivityList items={activity} now={now} />
            )}
          </section>
        </div>

        <section aria-labelledby="quick-title" className={panel}>
          <div className={panelHead}>
            <h2 id="quick-title" className={panelTitle}>
              Quick actions
            </h2>
          </div>
          <QuickActions actions={quickActions} />
        </section>
      </div>

      <section aria-labelledby="services-title">
        <div className="mb-3">
          <h2 id="services-title" className={panelTitle}>
            Your services
          </h2>
          <p className="text-sm text-slate-500">The modules your organization can use in this workspace.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
          {LIVE_MODULES.map((m) => (
            <ServiceModuleCard
              key={m.id}
              module={m}
              status={
                metrics ? (
                  <span>
                    <strong className="font-semibold text-rc-navy">{plural(metrics.open, 'open request', 'open requests')}</strong>
                    {metrics.attention > 0 && <span className="font-semibold text-red-700"> · {metrics.attention} need attention</span>}
                  </span>
                ) : loading ? (
                  <Skeleton className="h-4 w-40" />
                ) : undefined
              }
            />
          ))}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <h3 className="font-sans text-sm font-semibold text-rc-navy">On the roadmap</h3>
            <p className="mt-0.5 text-sm text-slate-500">Planned modules aren't available yet. They'll appear here when they are.</p>
            <div className="mt-3 grid gap-3">
              {PLANNED_MODULES.map((m) => (
                <PlannedModuleCard key={m.id} module={m} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
