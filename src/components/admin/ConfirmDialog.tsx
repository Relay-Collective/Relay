import { LoaderCircle } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { dangerButton, primaryButton, secondaryButton } from '../ui'

interface Props {
  open: boolean
  title: string
  body: ReactNode // what will happen, in plain words
  confirmLabel: string
  tone?: 'primary' | 'danger'
  busy?: boolean // the action is running: both buttons wait, so it can't be sent twice
  onConfirm: () => void
  onCancel: () => void
}

// Asks once before a decision that matters. Stays open while the action runs, so the
// result (or an error) is seen in context, and Escape can't dismiss it mid-request.
export function ConfirmDialog({ open, title, body, confirmLabel, tone = 'primary', busy, onConfirm, onCancel }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      onCancel={(e) => {
        e.preventDefault() // Escape: close through state, and never while busy
        if (!busy) onCancel()
      }}
      className="m-auto w-[min(30rem,calc(100vw-2rem))] rounded-xl p-6 text-rc-navy shadow-xl backdrop:bg-rc-navy/40"
    >
      <h2 id="confirm-title" className="font-heading text-xl font-bold">
        {title}
      </h2>
      <div className="mt-2 space-y-2 text-sm text-slate-700">{body}</div>
      <div className="mt-6 grid gap-3 sm:flex sm:flex-row-reverse">
        <button type="button" className={tone === 'danger' ? dangerButton : primaryButton} disabled={busy} onClick={onConfirm}>
          {busy && <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden />}
          {busy ? 'Working…' : confirmLabel}
        </button>
        <button type="button" className={secondaryButton} disabled={busy} onClick={onCancel}>
          Go back
        </button>
      </div>
    </dialog>
  )
}
