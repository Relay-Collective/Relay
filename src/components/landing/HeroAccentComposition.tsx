import { useEffect, useRef, type CSSProperties } from 'react'
import { usePrefersReducedMotion } from './hooks'

// The hero's signature: two heavy rings, linked. Electric is the shared foundation, cropped by the corner
// because it is bigger than any one view of it; cantaloupe is one organization threaded through it.
// They weave: blue passes over at one crossing, orange at the other, each crossing cut clean by a
// midnight gap, so neither simply sits on top. The holes let the dark ground into the forms.
// People, Purpose, Progress are small labels placed on the drawing, not copy set inside it.
//
// Drawn in a 1000 × 1000 square whose side is --d. The parent sets the box and crops it;
// --ct (top) and --cr (right) place the square against the box's top-right corner.

type Ring = { cx: number; cy: number; R: number; r: number }

// Each band passes through the other's hole, which needs the centres 260–370 apart; 330 keeps both holes open
const BLUE: Ring = { cx: 690, cy: 300, R: 400, r: 225 }
const ORANGE: Ring = { cx: 488, cy: 561, R: 265, r: 140 }
const GAP = 14 // the midnight cut where one ring passes over the other, in drawing units

// One ring as a single even-odd path: outer circle, then the hole
const ring = ({ cx, cy, R, r }: Ring) =>
  `M${cx - R} ${cy}a${R} ${R} 0 1 0 ${2 * R} 0a${R} ${R} 0 1 0 ${-2 * R} 0Z` +
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`

// Blue lies over orange at the upper-left crossing: where the two bands' centre lines meet on that side.
// The clip is a circle round that crossing alone, so its edge never runs along a seam between the colours.
const BLUE_OVER = (() => {
  const dx = ORANGE.cx - BLUE.cx
  const dy = ORANGE.cy - BLUE.cy
  const d = Math.hypot(dx, dy)
  const [mb, mo] = [(BLUE.R + BLUE.r) / 2, (ORANGE.R + ORANGE.r) / 2]
  const along = (d * d + mb * mb - mo * mo) / (2 * d)
  const across = Math.sqrt(mb * mb - along * along)
  return {
    cx: BLUE.cx + (dx * along - dy * across) / d,
    cy: BLUE.cy + (dy * along + dx * across) / d,
    r: (BLUE.R - BLUE.r + ORANGE.R - ORANGE.r) * 0.68,
  }
})()

const enter = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties

// How far each layer travels, in px, at the edge of the cursor's range and once the hero has scrolled away
const DEPTH: Record<'blue' | 'orange' | 'labels', CSSProperties> = {
  blue: { '--px': 8, '--sc': -40 } as CSSProperties,
  orange: { '--px': 16, '--sc': 24 } as CSSProperties,
  labels: { '--px': 5, '--sc': -12 } as CSSProperties,
}

const svg = 'absolute inset-0 h-full w-full overflow-visible'

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

  const label = 'rcl-enter absolute whitespace-nowrap font-grotesk font-medium leading-none tracking-[-0.02em]'

  return (
    <div ref={root} role="img" aria-label="People. Purpose. Progress." className={`rcl-hc pointer-events-none ${className}`}>
      <div
        className="absolute"
        style={{ width: 'var(--d)', height: 'var(--d)', top: 'var(--ct)', right: 'var(--cr)', fontSize: 'max(14px, calc(var(--d) * 0.028))' }}
      >
        {/* The foundation ring, under everything */}
        <div className="rcl-hc-move absolute inset-0" style={DEPTH.blue}>
          <svg viewBox="0 0 1000 1000" className={`rcl-hc-blue ${svg}`} aria-hidden focusable="false">
            <path d={ring(BLUE)} fillRule="evenodd" className="pointer-events-auto fill-electric" />
          </svg>
        </div>

        {/* The organization ring, over blue at the lower-right crossing */}
        <div className="rcl-hc-move absolute inset-0" style={DEPTH.orange}>
          <div className="rcl-hc-nudge absolute inset-0">
            <svg viewBox="0 0 1000 1000" className={`rcl-hc-orange ${svg}`} aria-hidden focusable="false">
              <path
                d={ring(ORANGE)}
                fillRule="evenodd"
                paintOrder="stroke"
                strokeWidth={GAP * 2}
                className="pointer-events-auto fill-cantaloupe stroke-midnight"
              />
            </svg>
          </div>
        </div>

        {/* Blue again, only on its side of the link, so it passes back over orange at the other crossing */}
        <div className="rcl-hc-move absolute inset-0" style={DEPTH.blue}>
          <svg viewBox="0 0 1000 1000" className={`rcl-hc-blue ${svg}`} aria-hidden focusable="false">
            {/* The gap is clipped to the crossing; the fill over it to a slightly wider circle, so the gap's
                clipped end is always under solid blue and never shows as a hairline */}
            <clipPath id="rcl-hc-gap">
              <circle cx={BLUE_OVER.cx} cy={BLUE_OVER.cy} r={BLUE_OVER.r} />
            </clipPath>
            <clipPath id="rcl-hc-fill">
              <circle cx={BLUE_OVER.cx} cy={BLUE_OVER.cy} r={BLUE_OVER.r + GAP * 2} />
            </clipPath>
            <path d={ring(BLUE)} fillRule="evenodd" fill="none" strokeWidth={GAP * 2} clipPath="url(#rcl-hc-gap)" className="stroke-midnight" />
            <path d={ring(BLUE)} fillRule="evenodd" clipPath="url(#rcl-hc-fill)" className="fill-electric" />
          </svg>
        </div>

        {/* Labels: one in the foundation's opening, one beside the lower crossing, one at orange's leading edge */}
        <div className="rcl-hc-move absolute inset-0 text-white" style={DEPTH.labels}>
          <span className={label} style={{ ...enter(900), left: '64%', top: '17%' }}>
            People.
          </span>
          <span className={label} style={{ ...enter(980), left: '73%', top: '72%' }}>
            Purpose.
          </span>
          <span className={`${label} text-cantaloupe`} style={{ ...enter(1060), left: '55%', top: '84.5%' }}>
            Progress.
          </span>
        </div>
      </div>
    </div>
  )
}
