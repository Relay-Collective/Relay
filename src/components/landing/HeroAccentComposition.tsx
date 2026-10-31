import { useEffect, useRef, type CSSProperties } from 'react'
import { usePrefersReducedMotion } from './hooks'

// The hero's signature: a handoff. One large electric disc (the collective, the shared foundation),
// crossed by a cantaloupe capsule (the baton) that carries out of it onto the dark.
// People and Purpose sit inside the disc; Progress rides the baton. All three share one left edge,
// so the words read as one column running through both forms.
//
// Everything is placed in units of --d, the disc's diameter, so the drawing keeps its proportions at any size.
// The parent sets the box; the disc is anchored to its bottom-right corner and cropped by it.

const enter = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties

// How far each form travels, in px, at the edge of the cursor's range and once the hero has scrolled away
const PARALLAX = { blue: 10, orange: 16 }
const SCROLL = { blue: -48, orange: 28 }

export function HeroAccentComposition({ className = '' }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  // Cursor and scroll write CSS variables straight onto the root, eased in one rAF loop; React never re-renders
  useEffect(() => {
    const el = root.current
    if (!el || reduced) return

    const finePointer = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const target = { x: 0, y: 0, s: 0 }
    const now = { x: 0, y: 0, s: 0 }
    let frame = 0

    const tick = () => {
      now.x += (target.x - now.x) * 0.08
      now.y += (target.y - now.y) * 0.08
      now.s += (target.s - now.s) * 0.2
      el.style.setProperty('--mx', now.x.toFixed(4))
      el.style.setProperty('--my', now.y.toFixed(4))
      el.style.setProperty('--sy', now.s.toFixed(4))
      const settled = Math.abs(target.x - now.x) + Math.abs(target.y - now.y) + Math.abs(target.s - now.s) < 0.001
      frame = settled ? 0 : requestAnimationFrame(tick)
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onPointer = (e: PointerEvent) => {
      if (!finePointer.matches || e.pointerType !== 'mouse') return
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
      wake()
    }
    const onLeave = () => {
      target.x = 0
      target.y = 0
      wake()
    }
    // 0 while the hero fills the screen, 1 once it has scrolled its own height away
    const onScroll = () => {
      const hero = el.closest('section') ?? el
      target.s = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.getBoundingClientRect().height)))
      wake()
    }

    onScroll()
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      for (const p of ['--mx', '--my', '--sy']) el.style.removeProperty(p)
    }
  }, [reduced])

  const word = 'absolute whitespace-nowrap font-grotesk font-semibold leading-none tracking-[-0.04em]'

  return (
    <div ref={root} role="img" aria-label="People. Purpose. Progress." className={`rcl-hc pointer-events-none ${className}`}>
      <div
        className="absolute"
        style={{
          width: 'var(--d)',
          height: 'var(--d)',
          right: 'calc(var(--d) * -0.22)',
          bottom: 'calc(var(--d) * -0.18)',
          fontSize: 'calc(var(--d) * 0.085)',
        }}
      >
        {/* A: the disc */}
        <div className="rcl-hc-move absolute inset-0" style={{ '--px': PARALLAX.blue, '--sc': SCROLL.blue } as CSSProperties}>
          <div className="rcl-hc-nudge-blue absolute inset-0">
            <div className="rcl-hc-disc pointer-events-auto absolute inset-0 rounded-full bg-electric text-white">
              <span className={`rcl-enter ${word} left-[16%] top-[22%]`} style={enter(760)}>
                People.
              </span>
              <span className={`rcl-enter ${word} left-[16%] top-[31.5%]`} style={enter(840)}>
                Purpose.
              </span>
            </div>
          </div>
        </div>

        {/* B: the baton, crossing the disc's lower edge and leaving it */}
        <div className="rcl-hc-move absolute inset-0" style={{ '--px': PARALLAX.orange, '--sc': SCROLL.orange } as CSSProperties}>
          <div className="rcl-hc-nudge-orange absolute" style={{ left: '-22%', top: '48.5%', width: '86%', height: '19%' }}>
            <div className="rcl-hc-baton pointer-events-auto absolute inset-0 rounded-full bg-cantaloupe text-midnight">
              {/* C: Progress, in the page's grotesk; hover hands it the headline's serif accent */}
              <span className={`rcl-enter ${word} top-1/2 -mt-[0.5em] left-[44.2%]`} style={enter(920)}>
                <span className="rcl-hc-plain block">Progress.</span>
                <span className="rcl-hc-accent absolute left-0 top-0 block font-editorial text-[1.12em] font-normal italic leading-[0.9] tracking-[-0.01em]">
                  Progress.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
