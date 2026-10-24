import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LINKS, NAV } from './content'
import { useScrolledPast } from './hooks'
import { Wordmark } from './primitives'
import { ctaArrow, ctaPrimary, ctaSecondary, focusRing } from './styles'

// Public website header. Jump links to each part of the page, and one clear way into the app.
export function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolledPast(8)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // While the drawer is open: Escape closes it, the page behind stays still, and focus moves inside
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key !== 'Tab' || !drawerRef.current) return
      // Keep Tab inside the drawer and its close button
      const items = [toggle, ...drawerRef.current.querySelectorAll<HTMLElement>('a, button')].filter(Boolean) as HTMLElement[]
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    drawerRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      toggle?.focus()
    }
  }, [open])

  // The drawer only exists below the desktop breakpoint; widening the window closes it
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = () => query.matches && setOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ${
        // No blur while the drawer is open: backdrop-filter would turn the header into the drawer's containing block
        open ? 'border-b border-rc-line bg-white' : scrolled ? 'border-b border-rc-line bg-white/90 backdrop-blur-md' : 'border-b border-transparent bg-white'
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Wordmark onClick={close} />

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const current = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={current ? 'location' : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold transition-colors ${focusRing} ${
                      current ? 'text-rc-navy' : 'text-slate-600 hover:text-rc-navy'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rc-teal transition-opacity duration-300 ${current ? 'opacity-100' : 'opacity-0'}`}
                      aria-hidden
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* The shared button class sets inline-flex, so a wrapper does the hiding on phones */}
          <span className="hidden sm:block">
            <Link to={LINKS.signIn} className={`${ctaPrimary} min-h-11 px-5 text-[15px]`}>
              Launch Platform <ArrowRight className={ctaArrow} aria-hidden />
            </Link>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-full text-rc-navy transition hover:bg-rc-canvas lg:hidden ${focusRing}`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="site-menu"
          ref={drawerRef}
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 flex animate-fade-up flex-col overflow-y-auto bg-white px-4 pb-[max(1.5rem,var(--safe-bottom))] pt-4 [animation-duration:280ms] sm:px-6 lg:hidden"
        >
          <nav aria-label="Main">
            <ul className="divide-y divide-rc-line border-y border-rc-line">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={close}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`flex min-h-16 items-center justify-between rounded-lg px-1 font-heading text-2xl font-bold tracking-tight text-rc-navy ${focusRing}`}
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 text-rc-teal" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pt-8">
            <Link to={LINKS.signIn} onClick={close} className={`${ctaPrimary} w-full`}>
              Launch Platform <ArrowRight className={ctaArrow} aria-hidden />
            </Link>
            <Link to={LINKS.register} onClick={close} className={`${ctaSecondary} w-full`}>
              Create an account
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
