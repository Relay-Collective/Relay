import { Navigate } from 'react-router-dom'
import { NAV } from '../../components/landing/content'
import { useActiveSection } from '../../components/landing/hooks'
import { Audiences } from '../../components/landing/sections/Audiences'
import { FinalCta } from '../../components/landing/sections/FinalCta'
import { Hero } from '../../components/landing/sections/Hero'
import { Partners } from '../../components/landing/sections/Partners'
import { Platform } from '../../components/landing/sections/Platform'
import { Principles } from '../../components/landing/sections/Principles'
import { Problem } from '../../components/landing/sections/Problem'
import { SiteFooter } from '../../components/landing/sections/SiteFooter'
import { Solution } from '../../components/landing/sections/Solution'
import { Story } from '../../components/landing/sections/Story'
import { SiteHeader } from '../../components/landing/SiteHeader'
import { useApp } from '../../hooks/useApp'
import { HOME_FOR } from '../../logic/homeFor'

const SECTION_IDS = NAV.map((n) => n.id)

// The public website: what Relay Collective is building, and the way into the app.
// Signed-in people skip it and land on their dashboard.
export function Landing() {
  const { ready, currentUser } = useApp()

  // Wait until we know who's signed in, so someone returning to their dashboard never sees a flash of this page
  if (!ready) return null
  if (currentUser) return <Navigate to={HOME_FOR[currentUser.role]} replace />

  return <PublicSite />
}

function PublicSite() {
  const active = useActiveSection(SECTION_IDS)
  return (
    <div className="overflow-x-clip bg-white font-sans text-slate-800">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-rc-navy px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader active={active} />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <Platform />
        <Story />
        <Partners />
        <Audiences />
        <Principles />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
