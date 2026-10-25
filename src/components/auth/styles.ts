// Shared class names for sign-in, sign-up, and onboarding. Builds on ../ui.ts; inside .rc-brand
// the app tokens (ink, brand, display font) are remapped to the public site's palette (see index.css).

export const focusRing = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-rc-blue focus-visible:ring-offset-2'

// The big question at the top of a screen
export const authTitle = 'font-heading text-[28px] font-extrabold leading-[1.15] tracking-[-0.025em] text-balance text-rc-navy sm:text-[34px]'
export const authLead = 'mt-3 text-base leading-relaxed text-slate-600 sm:text-[17px]'
export const eyebrow = 'font-heading text-xs font-bold uppercase tracking-[0.14em] text-rc-teal-ink'

export const textLink = `rounded font-semibold text-rc-blue underline-offset-4 hover:underline ${focusRing}`

// A quiet edge for summaries and notes inside a form
export const softPanel = 'rounded-xl border border-rc-line bg-rc-canvas p-4'
