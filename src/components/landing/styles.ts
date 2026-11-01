// Shared class names for the public website. The signed-in app uses ../ui.ts instead.

// One frame for every section, header and footer, so left edges line up down the page
export const container = 'mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10'

export const sectionY = 'py-24 sm:py-28 lg:py-36'

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-electric-ink focus-visible:ring-offset-2 focus-visible:ring-offset-porcelain'
const focusRingOnBlue =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-midnight focus-visible:ring-offset-2 focus-visible:ring-offset-electric'

const cta =
  'group inline-flex min-h-12 select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 font-dm text-[15px] font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out active:scale-[0.98]'

// On porcelain: a midnight pill that warms to electric ink, and a midnight outline
export const ctaPrimary = `${cta} ${focusRing} bg-midnight text-white hover:bg-electric-ink`
export const ctaGhost = `${cta} ${focusRing} border border-midnight/80 bg-white/60 text-midnight hover:border-midnight hover:bg-white`

// On electric blue (the closing call to action)
export const ctaOnBlue = `${cta} ${focusRingOnBlue} bg-midnight text-white hover:bg-white hover:text-midnight`
export const ctaGhostOnBlue = `${cta} ${focusRingOnBlue} border border-midnight text-midnight hover:bg-white/20`

// The signature pair for a page's main decision (the hero): two 60px pills, each carrying its arrow in a round
// chamber set 6px inside the edge. On hover the arrow hands off: one slides out as the next slides in, a small relay.
// Full width on phones with the label left and the chamber right; content width from sm.
// Focus draws an outline, not a ring, so it survives the raised shadow.
const focusOutline = 'focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-electric-ink'
const signature =
  'group relative inline-flex h-[60px] w-full select-none items-center justify-between gap-8 rounded-full py-1.5 pl-7 pr-1.5 font-dm text-[17px] font-semibold tracking-[-0.01em] transition-[background-color,border-color,box-shadow,translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px active:duration-75 motion-reduce:transition-colors sm:w-auto'
export const ctaChamber =
  'relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full transition-[background-color,color,border-color,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-active:scale-95 motion-reduce:transition-none'
// The two arrows inside a chamber: the resting one leaves, the next arrives
const handoff = 'absolute h-5 w-5 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none'
export const ctaArrowOut = `${handoff} group-hover:translate-x-[180%] group-hover:opacity-0`
export const ctaArrowIn = `${handoff} -translate-x-[180%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100`
export const ctaArrowDownOut = `${handoff} group-hover:translate-y-[180%] group-hover:opacity-0`
export const ctaArrowDownIn = `${handoff} -translate-y-[180%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100`

// Electric ink (5.3:1 with white), a white chamber, a tactile top light. Lifts a pixel on hover, presses back down.
export const ctaSignature = `${signature} ${focusOutline} rcl-cta-raised bg-electric-ink text-white hover:-translate-y-px hover:bg-brand-700`
export const ctaSignatureChamber = `${ctaChamber} bg-white text-electric-ink`

// White, a quiet hairline, midnight text, a porcelain chamber that turns midnight on hover. Clearly second.
export const ctaQuiet = `${signature} ${focusOutline} rcl-cta-quiet border border-midnight/15 bg-white text-midnight hover:border-midnight/30 active:bg-porcelain`
export const ctaQuietChamber = `${ctaChamber} border border-hairline bg-porcelain text-midnight group-hover:border-midnight group-hover:bg-midnight group-hover:text-white`

// Arrow that slips forward when its link is hovered
export const ctaArrow = 'h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1'
export const ctaArrowDown = 'h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5'

// A plain text link with an arrow: for secondary destinations inside a section
export const textLink = `group inline-flex min-h-11 items-center gap-2 rounded-md font-dm text-[15px] font-semibold text-midnight underline-offset-[5px] decoration-electric decoration-2 hover:underline ${focusRing}`

// Section titles: Space Grotesk, tight, with an Instrument Serif accent set in <Accent>
export const display = 'font-grotesk font-semibold tracking-[-0.04em] text-balance text-midnight'
export const h2 = `${display} text-[clamp(40px,6vw,76px)] leading-[0.98]`
export const h2Small = `${display} text-[clamp(36px,4.6vw,60px)] leading-[1]`

export const lede = 'font-dm text-[18px] leading-[1.6] text-midnight-soft sm:text-[19px]'
