// Shared class names for the public website. The signed-in app uses ../ui.ts instead.

// One frame for every section, header and footer, so left edges line up down the page
export const container = 'mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8'

export const sectionY = 'py-24 sm:py-28 lg:py-36'

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-rc-blue focus-visible:ring-offset-2'
const focusRingOnDark =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-rc-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-rc-navy'

const cta = 'group inline-flex min-h-12 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-base font-semibold transition duration-200 active:scale-[0.98]'

export const ctaPrimary = `${cta} ${focusRing} bg-rc-blue text-white shadow-[0_8px_24px_-12px_rgba(34,81,232,0.7)] hover:bg-rc-blue-dark`
export const ctaSecondary = `${cta} ${focusRing} border border-rc-line bg-white text-rc-navy hover:border-rc-navy/30 hover:bg-rc-canvas`
export const ctaOnDark = `${cta} ${focusRingOnDark} bg-white text-rc-navy hover:bg-rc-mint`
export const ctaOutlineOnDark = `${cta} ${focusRingOnDark} border border-white/30 text-white hover:border-white/60 hover:bg-white/5`

// Arrow that nudges forward when its link is hovered
export const ctaArrow = 'h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5'

export const eyebrow = 'font-heading text-xs font-bold uppercase tracking-[0.16em] text-rc-teal-ink sm:text-[13px]'

export const h2 = 'font-heading text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance text-rc-navy sm:text-[44px] lg:text-[50px]'

export const lead = 'text-[17px] leading-relaxed text-slate-600 sm:text-lg lg:text-[19px]'

export const textLink = `rounded font-semibold text-rc-blue underline-offset-4 hover:underline ${focusRing}`
