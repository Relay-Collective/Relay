import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Layout } from './components/Layout'
import { RequireAuth, RequireRole } from './components/RequireAuth'
import { VersionBadge } from './components/VersionBadge'
import { WorkspaceShell } from './components/workspace/WorkspaceShell'
import { useApp } from './hooks/useApp'
import { HOME_FOR } from './logic/homeFor'
import { NativeBridge } from './native/NativeBridge'
import { isNative } from './native/platform'
import { Accounts } from './pages/admin/Accounts'
import { Approvals } from './pages/admin/Approvals'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { Landing } from './pages/auth/Landing'
import { Register } from './pages/auth/register/Register'
import { ResetPassword } from './pages/auth/ResetPassword'
import { SignIn } from './pages/auth/SignIn'
import { Demo } from './pages/demo/Demo'
import { DriverHome } from './pages/driver/DriverHome'
import { Settings } from './pages/driver/Settings'
import { Bookings } from './pages/org/Bookings'
import { Destinations } from './pages/org/Destinations'
import { Drivers } from './pages/org/Drivers'
import { OrgHome } from './pages/org/OrgHome'
import { Dashboard } from './pages/partner/Dashboard'
import { RequestRide } from './pages/partner/RequestRide'
import { RideDetail } from './pages/partner/RideDetail'
import { Help } from './pages/workspace/Help'
import { OrganizationProfile } from './pages/workspace/Organization'
import { Overview } from './pages/workspace/Overview'
import { Requests } from './pages/workspace/Requests'
import { Services } from './pages/workspace/Services'
import { TransportLayout } from './pages/workspace/TransportLayout'
import { paths } from './workspace/paths'

// "/home" always lands on the right main page for whoever is signed in.
function RoleHome() {
  const { currentUser } = useApp()
  return <Navigate to={currentUser ? HOME_FOR[currentUser.role] : '/signin'} replace />
}

// The website keeps the marketing page at "/". The app skips it: signed-in people
// go to their role home, everyone else to sign-in. Native RequireAuth also uses
// /signin so unsigned users are not bounced back to "/" and into a redirect loop.
function NativeEntry() {
  const { ready, currentUser } = useApp()
  if (!ready) return null
  return <Navigate to={currentUser ? '/home' : '/signin'} replace />
}

// Partner pages used to live under /partner. Old links and bookmarks still land on the same page.
function MovedTo({ to }: { to: string }) {
  const { search } = useLocation()
  return <Navigate to={`${to}${search}`} replace />
}

function MovedRide() {
  const { id = '' } = useParams()
  return <Navigate to={paths.ride(id)} replace />
}

export default function App() {
  // The demo is a full-screen walkthrough, so the badge stays out of it.
  const { pathname } = useLocation()

  return (
    <>
      <NativeBridge />
      {pathname !== '/demo' && <VersionBadge />}
      <Routes>
        <Route path="/" element={isNative ? <NativeEntry /> : <Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/demo" element={<Demo />} />

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<RoleHome />} />
          {/* Partner organizations: the organization workspace, with transportation as its first service */}
          <Route element={<RequireRole roles={['PARTNER']} />}>
            <Route element={<WorkspaceShell />}>
              <Route path={paths.overview} element={<Overview />} />
              <Route path={paths.requests} element={<Requests />} />
              <Route path={paths.services} element={<Services />} />
              <Route path={paths.organization} element={<OrganizationProfile />} />
              <Route path={paths.help} element={<Help />} />
              <Route path={paths.transport} element={<TransportLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="new" element={<RequestRide />} />
                <Route path="rides/:id" element={<RideDetail />} />
                <Route path="destinations" element={<Destinations />} />
              </Route>
            </Route>
            <Route path="/partner" element={<MovedTo to={paths.transport} />} />
            <Route path="/partner/request" element={<MovedTo to={paths.newRide} />} />
            <Route path="/partner/ride/:id" element={<MovedRide />} />
            <Route path="/partner/destinations" element={<MovedTo to={paths.destinations} />} />
            <Route path="/partner/*" element={<MovedTo to={paths.overview} />} />
          </Route>

          <Route element={<Layout />}>
            <Route element={<RequireRole roles={['PLATFORM_ADMIN']} />}>
              <Route path="/admin" element={<Approvals />} />
              <Route path="/admin/accounts" element={<Accounts />} />
            </Route>
            {/* Transport providers: hidden from sign-up for now, but existing ones still work */}
            <Route element={<RequireRole roles={['ORG_ADMIN']} />}>
              <Route path="/org" element={<OrgHome />} />
              <Route path="/org/drivers" element={<Drivers />} />
              <Route path="/org/bookings" element={<Bookings />} />
            </Route>
            <Route element={<RequireRole roles={['DRIVER']} />}>
              <Route path="/driver" element={<DriverHome />} />
              <Route path="/driver/my-rides" element={<Navigate to="/driver" replace />} />
              <Route path="/driver/settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
