import { ArrowRight, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { FormAlert } from '../../components/auth/FormAlert'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { authLead, authTitle, textLink } from '../../components/auth/styles'
import { PasswordField } from '../../components/form/PasswordField'
import { TextField } from '../../components/form/TextField'
import { useApp } from '../../hooks/useApp'
import { returnPath } from '../../logic/returnPath'
import { EMAIL } from '../../logic/validate'
import { onboardingPaths } from '../../onboarding/routing'
import { dataService, isDemoBackend } from '../../services'
import { UnconfirmedEmailError, type Session } from '../../services/dataService'
import type { User } from '../../types'
import { DemoAccounts } from './DemoAccounts'

const SIGN_IN_BRAND = {
  title: 'Welcome back to the collective.',
  body: 'The people, services, and resources your community depends on—all connected.',
}

// Remembers who last signed in on this device, so returning staff only type a password.
// Just the email: the session itself is kept by the auth provider, as configured.
const LAST_EMAIL_KEY = 'careride:last-email'

function readLastEmail(): string {
  try {
    return localStorage.getItem(LAST_EMAIL_KEY) ?? ''
  } catch {
    return '' // storage blocked, e.g. a private window
  }
}

function saveLastEmail(email: string) {
  try {
    localStorage.setItem(LAST_EMAIL_KEY, email)
  } catch {
    // Nothing to do: the next visit just starts with an empty email.
  }
}

function focusField(id: string) {
  const el = document.getElementById(id) as HTMLInputElement | null
  el?.focus()
  el?.select()
}

// Where to go once signed in: back to the page that asked, else onboarding (no role yet) or home.
// /home works out the right place from the account the backend returned.
function nextPath(session: Session, from: string | undefined): string {
  if (from) return from
  return session.user ? '/home' : onboardingPaths.start
}

export function SignIn() {
  const { users, identity, currentUser, sessionExpired, signIn } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const from = returnPath((location.state as { from?: string } | null)?.from) ?? returnPath(params.get('next'))
  const notice = (location.state as { notice?: string } | null)?.notice

  const [rememberedEmail] = useState(readLastEmail)
  const [email, setEmail] = useState(rememberedEmail)
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [error, setError] = useState<string>()
  const [attempts, setAttempts] = useState(0) // replays the shake on each failed try
  const [busy, setBusy] = useState<string>() // which button is working
  const [unconfirmed, setUnconfirmed] = useState(false)
  const [resent, setResent] = useState<string>()

  async function attempt(key: string, emailValue: string, passwordValue: string) {
    if (busy) return
    setBusy(key)
    setError(undefined)
    setUnconfirmed(false)
    setResent(undefined)
    try {
      const session = await signIn(emailValue, passwordValue)
      if (key === 'form') saveLastEmail(emailValue)
      navigate(nextPath(session, from), { replace: true })
    } catch (err) {
      setError((err as Error).message)
      setUnconfirmed(err instanceof UnconfirmedEmailError)
      setAttempts((n) => n + 1)
      setBusy(undefined)
      if (key === 'form') requestAnimationFrame(() => focusField('password'))
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const found: typeof fieldErrors = {}
    if (!email.trim()) found.email = 'Enter your email.'
    else if (!EMAIL.test(email.trim())) found.email = "That doesn't look like an email. Check for typos."
    if (!password) found.password = 'Enter your password.'
    setFieldErrors(found)
    if (found.email) return focusField('email')
    if (found.password) return focusField('password')
    attempt('form', email.trim(), password)
  }

  const signedInAs = currentUser?.name ?? identity?.name

  return (
    <AuthLayout
      brand={SIGN_IN_BRAND}
      aside={
        <>
          <span className="hidden sm:inline">New to Relay Collective? </span>
          <Link to="/register" className={textLink}>
            Create an account
          </Link>
        </>
      }
    >
      {signedInAs && (
        <div className="mb-8 flex items-center justify-between gap-3 rounded-xl border border-rc-line bg-rc-canvas p-4">
          <p className="text-sm text-slate-700">
            You're signed in as <strong className="text-rc-navy">{signedInAs}</strong>.
          </p>
          <Link to={from ?? (currentUser ? '/home' : onboardingPaths.start)} className={`inline-flex shrink-0 items-center gap-1 text-sm ${textLink}`}>
            Continue <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}

      <h1 className={authTitle}>
        <span className="lg:hidden">{SIGN_IN_BRAND.title}</span>
        <span className="hidden lg:inline">Sign in to your account</span>
      </h1>
      <p className={authLead}>One account for every organization and service you're part of on Relay Collective.</p>

      {sessionExpired && !signedInAs && (
        <FormAlert tone="info" className="mt-6">
          Your session ended, so we signed you out. Sign in again to pick up where you left off.
        </FormAlert>
      )}
      {notice && (
        <FormAlert tone="info" className="mt-6">
          {notice}
        </FormAlert>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <div className="space-y-5">
          <TextField
            id="email"
            label="Email address"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus={!rememberedEmail}
            placeholder="you@organization.org"
            icon={<Mail className="h-5 w-5" />}
            value={email}
            error={fieldErrors.email}
            onChange={(e) => {
              setEmail(e.target.value)
              setFieldErrors((f) => ({ ...f, email: undefined }))
              setError(undefined)
            }}
          />
          <div>
            <PasswordField
              id="password"
              label="Password"
              autoComplete="current-password"
              autoFocus={!!rememberedEmail}
              value={password}
              error={fieldErrors.password}
              onChange={(e) => {
                setPassword(e.target.value)
                setFieldErrors((f) => ({ ...f, password: undefined }))
                setError(undefined)
              }}
            />
            <p className="mt-2 text-right text-sm">
              {isDemoBackend ? (
                <span className="text-slate-500">Forgot your password? Ask your organization's admin to reset it.</span>
              ) : (
                <Link to="/forgot-password" className={textLink}>
                  Forgot your password?
                </Link>
              )}
            </p>
          </div>
        </div>

        {error && (
          <FormAlert key={attempts} shake className="mt-5">
            {error}
            {unconfirmed && (
              <button
                type="button"
                className={`mt-1 block text-left ${textLink}`}
                onClick={() =>
                  dataService.resendVerification(email.trim()).then(
                    () => setResent('If a confirmation is waiting for this address, we sent a new link.'),
                    (err: Error) => setResent(err.message),
                  )
                }
              >
                Send a new confirmation link
              </button>
            )}
          </FormAlert>
        )}
        {resent && (
          <FormAlert tone="info" className="mt-3">
            {resent}
          </FormAlert>
        )}

        <SubmitButton busy={busy === 'form'} busyLabel="Signing in…" className="mt-6 w-full">
          Sign in
        </SubmitButton>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        New to Relay Collective?{' '}
        <Link to="/register" className={textLink}>
          Create an account
        </Link>
      </p>

      {isDemoBackend && (
        <DemoAccounts
          users={users}
          busyId={busy}
          disabled={!!busy}
          defaultOpen={params.has('demo')}
          onPick={(u: User, demoPassword) => attempt(u.id, u.email!, demoPassword)}
        />
      )}
    </AuthLayout>
  )
}
