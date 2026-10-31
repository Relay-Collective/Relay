// Shared class names for the public website. The signed-in app uses ../ui.ts instead.

// One frame for every section, header and footer, so left edges line up down the page
export const container = 'mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10'

export const sectionY = 'py-24 sm:py-28 lg:py-36'

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-midnight'
export const focusRingOnLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-ink focus-visible:ring-offset-2 focus-visible:ring-offset-porcelain'
const focusRingOnBlue =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight focus-visible:ring-offset-2 focus-visible:ring-offset-electric'

const cta =
  'group inline-flex min-h-12 select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 font-dm text-[15px] font-semibold transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-[0.98]'

// On midnight: a white pill that warms to cantaloupe, and a hairline outline
export const ctaPrimary = `${cta} ${focusRing} bg-white text-midnight hover:bg-cantaloupe`
export const ctaGhost = `${cta} ${focusRing} border border-white/25 text-white hover:border-white/70 hover:bg-white/[0.04]`

// On electric blue (the closing call to action)
export const ctaOnBlue = `${cta} ${focusRingOnBlue} bg-midnight text-white hover:bg-white hover:text-midnight`
export const ctaGhostOnBlue = `${cta} ${focusRingOnBlue} border border-midnight/40 text-midnight hover:border-midnight hover:bg-midnight/[0.06]`

// Arrow that slips forward when its link is hovered
export const ctaArrow = 'h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1'

export const eyebrow = 'font-dm text-xs font-semibold uppercase tracking-[0.22em]'

// Section titles: Space Grotesk, tight, with an Instrument Serif accent set in <Accent>
export const display = 'font-grotesk font-semibold tracking-[-0.045em] text-balance'
export const h2 = `${display} text-[44px] leading-[0.98] sm:text-[60px] lg:text-[76px]`
