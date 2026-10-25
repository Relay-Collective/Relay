import { Clock, Info, Link2, Mail, UserPlus, Users } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useApp } from '../../hooks/useApp'
import { useLoadable } from '../../hooks/useLoadable'
import { initials } from '../../logic/initials'
import { EMAIL } from '../../logic/validate'
import { onboardingPaths } from '../../onboarding/routing'
import { dataService } from '../../services'
import type { Invitation, Organization } from '../../types'
import { ConfirmButton } from '../ConfirmButton'
import { CopyButton } from '../CopyButton'
import { TextField } from '../form/TextField'
import { dangerButton, primaryButton } from '../ui'
import { SectionError } from './states'
import { compactButton, focusRing, panel, panelHead, panelTitle } from './styles'

const DAY = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' })

type InviteStatus = 'open' | 'expired' | 'accepted' | 'withdrawn'

function statusOf(i: Invitation): InviteStatus {
  if (i.acceptedAt) return 'accepted'
  if (i.revokedAt) return 'withdrawn'
  return new Date(i.expiresAt).getTime() <= Date.now() ? 'expired' : 'open'
}

const STATUS_PILL: Record<InviteStatus, string> = {
  open: 'bg-sun-100 text-amber-900',
  expired: 'bg-slate-100 text-slate-600',
  accepted: 'bg-emerald-50 text-emerald-800',
  withdrawn: 'bg-slate-100 text-slate-600',
}

// Who's on the team, and invitations for colleagues. Each person gets their own sign-in;
// the backend picks the organization and role, and checks the invitation again when it's used.
export function TeamInvitations({ org }: { org: Organization | undefined }) {
  const { users, currentUser, refresh } = useApp()
  const approved = org?.status === 'APPROVED'
  const invitations = useLoadable(() => (approved ? dataService.listInvitations() : Promise.resolve([])), approved ? org.id : '')
  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState<string>()
  const [error, setError] = useState<string>()
  const [busy, setBusy] = useState(false)
  // The link exists only here, once: the backend keeps a hash, so it can't be shown again later
  const [created, setCreated] = useState<{ email: string; link: string }>()

  const members = users.filter((u) => u.orgId === org?.id && u.role === 'PARTNER')
  const shown = (invitations.data ?? []).filter((i) => statusOf(i) !== 'accepted').slice(0, 8)

  async function invite(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    if (!EMAIL.test(email.trim())) {
      setFieldError('Enter your colleague’s email address.')
      document.getElementById('invite-email')?.focus()
      return
    }
    setBusy(true)
    setError(undefined)
    try {
      const { invitation, token } = await dataService.createInvitation(email)
      setCreated({ email: invitation.email, link: `${window.location.origin}${onboardingPaths.invite(token)}` })
      setEmail('')
      refresh()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function revoke(id: string) {
    try {
      await dataService.revokeInvitation(id)
      refresh()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <section aria-labelledby="team-title" className={`${panel} lg:col-span-2`}>
      <div className={panelHead}>
        <h2 id="team-title" className={`${panelTitle} flex items-center gap-2`}>
          <Users className="h-4 w-4 text-rc-blue" aria-hidden /> Team
        </h2>
        <span className="text-sm text-slate-500">
          {members.length} {members.length === 1 ? 'member' : 'members'}
        </span>
      </div>

      <div className="grid gap-6 px-5 py-5 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-rc-navy">Members</h3>
          <ul className="mt-3 space-y-2">
            {members.map((m) => (
              <li key={m.id} className="flex items-center gap-3 rounded-lg bg-rc-canvas px-3 py-2.5 text-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rc-navy text-xs font-bold text-white" aria-hidden>
                  {initials(m.name)}
                </span>
                <span className="min-w-0 flex-1 truncate font-semibold text-rc-navy">{m.name}</span>
                {m.id === currentUser?.id && <span className="text-xs font-medium text-slate-500">You</span>}
                <span className="text-xs font-medium text-slate-500">Staff</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-start gap-2 text-sm text-slate-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Every member can request and manage your organization's rides, and invite colleagues. Older shared sign-ins keep working.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-rc-navy">Invite a colleague</h3>
          {!approved ? (
            <p className="mt-3 flex items-start gap-2 rounded-lg bg-rc-canvas p-3 text-sm text-slate-600">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              You can invite colleagues once Relay Collective approves your organization.
            </p>
          ) : (
            <>
              <form onSubmit={invite} noValidate className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start">
                <TextField
                  id="invite-email"
                  label="Colleague's email"
                  type="email"
                  inputMode="email"
                  autoComplete="off"
                  className="flex-1 [&_label]:sr-only"
                  placeholder="colleague@organization.org"
                  icon={<Mail className="h-5 w-5" />}
                  value={email}
                  error={fieldError}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setFieldError(undefined)
                    setError(undefined)
                  }}
                />
                <button type="submit" className={`${primaryButton} ${compactButton} min-h-12`} disabled={busy}>
                  <UserPlus className="h-4 w-4" aria-hidden /> {busy ? 'Creating…' : 'Create invitation'}
                </button>
              </form>
              {error && (
                <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}
              {created && (
                <div className="mt-4 rounded-xl border border-rc-line bg-rc-mint/60 p-4" role="status">
                  <p className="flex items-center gap-2 text-sm font-semibold text-rc-navy">
                    <Link2 className="h-4 w-4 text-rc-teal-ink" aria-hidden /> Invitation ready for {created.email}
                  </p>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-rc-line bg-white px-3 py-2">
                    <code className="min-w-0 flex-1 truncate text-xs text-slate-700">{created.link}</code>
                    <CopyButton text={created.link} label="invitation link" />
                  </div>
                  <p className="mt-2 text-xs text-slate-600">
                    Send this link to {created.email} yourself; it isn't emailed automatically. It works once, only for that email address, and expires
                    in 7 days. For safety it won't be shown again.
                  </p>
                </div>
              )}

              {invitations.error ? (
                <SectionError message="We couldn't load your invitations." />
              ) : (
                shown.length > 0 && (
                  <ul className="mt-5 divide-y divide-rc-line rounded-xl border border-rc-line">
                    {shown.map((i) => {
                      const status = statusOf(i)
                      return (
                        <li key={i.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2.5 text-sm">
                          <span className="min-w-0 flex-1 truncate text-rc-navy">{i.email}</span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_PILL[status]}`}>
                            {status === 'open' ? `Expires ${DAY.format(new Date(i.expiresAt))}` : status === 'expired' ? 'Expired' : 'Withdrawn'}
                          </span>
                          {status === 'open' && (
                            <ConfirmButton
                              className={`rounded-lg px-2 py-1 text-sm font-semibold text-red-700 hover:bg-red-50 ${focusRing}`}
                              label={`Withdraw invitation for ${i.email}`}
                              title="Withdraw this invitation?"
                              body={`The link sent to ${i.email} will stop working.`}
                              confirmLabel="Withdraw invitation"
                              confirmClassName={dangerButton}
                              onConfirm={() => void revoke(i.id)}
                            >
                              Withdraw
                            </ConfirmButton>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
