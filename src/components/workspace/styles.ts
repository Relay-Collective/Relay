// Shared class names for the organization workspace. Builds on ../ui.ts; the tokens it uses are
// remapped to the public site's palette inside .workspace (see index.css).

export const focusRing = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-rc-blue focus-visible:ring-offset-2'

// A section of a page: an edge, no shadow
export const panel = 'rounded-xl border border-slate-200 bg-white'

// The heading row inside a panel
export const panelHead = 'flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-slate-100 px-5 py-4'
export const panelTitle = 'font-heading text-base font-bold text-rc-navy'

// A link in a panel's heading row, e.g. "View all"
export const panelLink = `inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-rc-blue hover:bg-brand-50 ${focusRing}`

// Compact buttons for headers and toolbars. Still 44px tall: the minimum touch target.
export const compactButton = 'min-h-11 px-4 text-sm'
