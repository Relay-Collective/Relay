import type { ReactNode } from 'react'

interface Props {
  eyebrow?: ReactNode // e.g. today's date, or the module a page belongs to
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}

// The top of a workspace page. It sits on the canvas, not in a card, so the panels below read as the content.
export function PageHeader({ eyebrow, title, description, actions }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="text-sm font-semibold text-slate-500">{eyebrow}</p>}
        <h1 className="mt-1 font-heading text-[28px] font-bold leading-tight tracking-[-0.02em] text-balance text-rc-navy sm:text-[32px]">{title}</h1>
        {description && <div className="mt-1.5 max-w-2xl text-base text-slate-600">{description}</div>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
