import { useEffect, useState } from 'react'
import { NETWORK_HUB, NETWORK_NODES, NETWORK_PEERS, type NetworkNode } from './content'
import { usePrefersReducedMotion } from './hooks'
import { StatusPill } from './primitives'
import { focusRing } from './styles'

const W = 600
const H = 560

// A gentle curve from the hub out to a node, bowed to one side so the links read as a web, not spokes
function linkPath(node: NetworkNode): string {
  const { x: hx, y: hy } = NETWORK_HUB
  const mx = (hx + node.x) / 2
  const my = (hy + node.y) / 2
  const dx = node.x - hx
  const dy = node.y - hy
  const len = Math.hypot(dx, dy)
  const bow = 0.16 * len
  return `M${hx},${hy} Q${mx - (dy / len) * bow},${my + (dx / len) * bow} ${node.x},${node.y}`
}

const byId = new Map(NETWORK_NODES.map((n) => [n.id, n]))

// Hero visual: organizations, volunteers, resources, and services, all meeting at one shared layer.
// The nodes are real buttons (hover, focus, or tap to learn about each); the drawing behind them is decorative.
export function NetworkVisual() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(NETWORK_NODES[0].id)
  const [paused, setPaused] = useState(false)

  // Walk around the network on its own until someone takes over
  useEffect(() => {
    if (reduced || paused) return
    const timer = window.setInterval(() => {
      setActive((id) => {
        const i = NETWORK_NODES.findIndex((n) => n.id === id)
        return NETWORK_NODES[(i + 1) % NETWORK_NODES.length].id
      })
    }, 3200)
    return () => window.clearInterval(timer)
  }, [reduced, paused])

  const current = byId.get(active) ?? NETWORK_NODES[0]
  const CurrentIcon = current.icon

  return (
    <figure
      className="relative mx-auto w-full max-w-[600px]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
    >
      <div className="relative aspect-[600/560] w-full">
        {/* Soft dot field, fading out at the edges */}
        <div
          className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,var(--color-rc-line)_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(closest-side,black,transparent)]"
          aria-hidden
        />

        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden focusable="false">
          <defs>
            <radialGradient id="rc-hub-glow">
              <stop offset="0%" stopColor="#18b9cf" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#18b9cf" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={NETWORK_HUB.x} cy={NETWORK_HUB.y} r="170" fill="url(#rc-hub-glow)" />
          <g className="rc-spin">
            <circle cx={NETWORK_HUB.x} cy={NETWORK_HUB.y} r="228" fill="none" stroke="#dbe3f3" strokeWidth="1.2" strokeDasharray="2 9" />
          </g>
          <circle cx={NETWORK_HUB.x} cy={NETWORK_HUB.y} r="128" fill="none" stroke="#e3e8f2" strokeWidth="1.2" />

          {/* Organizations working with each other directly, not only through the hub */}
          {NETWORK_PEERS.map(([a, b]) => {
            const na = byId.get(a)!
            const nb = byId.get(b)!
            const lit = active === a || active === b
            return (
              <line
                key={`${a}-${b}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke={lit ? '#008d82' : '#dbe3f3'}
                strokeOpacity={lit ? 0.55 : 1}
                strokeWidth="1.5"
                strokeDasharray="1 6"
                strokeLinecap="round"
                className="transition-[stroke] duration-500"
              />
            )
          })}

          {NETWORK_NODES.map((node, i) => {
            const d = linkPath(node)
            const lit = node.id === active
            return (
              <g key={node.id}>
                <path d={d} fill="none" stroke={lit ? '#2251e8' : '#d5ddef'} strokeWidth={lit ? 2.5 : 2} className="transition-[stroke] duration-500" />
                <path d={d} fill="none" stroke={lit ? '#18b9cf' : '#8fa3d6'} strokeOpacity={lit ? 1 : 0.5} strokeWidth="2" strokeLinecap="round" className="rc-flow" />
                {/* Traffic both ways. A negative begin starts each packet mid-journey, so none waits at the drawing's corner */}
                {!reduced && (
                  <circle r={lit ? 5 : 3.5} fill={lit ? '#2251e8' : '#18b9cf'}>
                    <animateMotion dur="3.6s" begin={`-${i * 0.6}s`} repeatCount="indefinite" path={d} keyPoints={i % 2 ? '0;1' : '1;0'} keyTimes="0;1" calcMode="linear" />
                  </circle>
                )}
                {lit && <circle cx={node.x} cy={node.y} r="38" fill="none" stroke="#2251e8" strokeWidth="1.5" className="rc-pulse" />}
              </g>
            )
          })}

          {/* The shared layer everything meets at */}
          <circle cx={NETWORK_HUB.x} cy={NETWORK_HUB.y} r="64" fill="none" stroke="#18b9cf" strokeWidth="2" className="rc-pulse" />
          <circle cx={NETWORK_HUB.x} cy={NETWORK_HUB.y} r="80" fill="none" stroke="#2251e8" strokeOpacity="0.14" strokeWidth="10" />
          <circle cx={NETWORK_HUB.x} cy={NETWORK_HUB.y} r="64" fill="#101b52" />
          <circle cx={NETWORK_HUB.x} cy={NETWORK_HUB.y} r="52" fill="none" stroke="#18b9cf" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 5" />
          <text x={NETWORK_HUB.x} y={NETWORK_HUB.y - 3} textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="'Plus Jakarta Sans', Inter, sans-serif" letterSpacing="-0.4">
            Relay
          </text>
          <text x={NETWORK_HUB.x} y={NETWORK_HUB.y + 18} textAnchor="middle" fill="#8fe3ee" fontSize="13" fontWeight="700" fontFamily="'Plus Jakarta Sans', Inter, sans-serif" letterSpacing="0.6">
            COLLECTIVE
          </text>
        </svg>

        <ul className="absolute inset-0" aria-label="Who Relay Collective connects">
          {NETWORK_NODES.map((node) => {
            const Icon = node.icon
            const lit = node.id === active
            return (
              // The icon circle sits exactly on the node's point, where its links and pulse ring meet. The label hangs below it.
              <li key={node.id} className="absolute h-0 w-0" style={{ left: `${(node.x / W) * 100}%`, top: `${(node.y / H) * 100}%` }}>
                <button
                  type="button"
                  aria-pressed={lit}
                  aria-label={`${node.label}: ${node.description}`}
                  onMouseEnter={() => setActive(node.id)}
                  onFocus={() => setActive(node.id)}
                  onClick={() => setActive(node.id)}
                  className={`group absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${focusRing}`}
                >
                  <span
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 sm:h-14 sm:w-14 ${
                      lit
                        ? 'scale-110 border-rc-blue bg-rc-blue text-white shadow-[0_10px_30px_-10px_rgba(34,81,232,0.8)]'
                        : 'border-rc-line bg-white text-rc-navy shadow-[0_6px_20px_-12px_rgba(16,27,82,0.35)] group-hover:border-rc-blue/40'
                    }`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                    {node.availability === 'live' && (
                      <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-white bg-rc-teal" aria-hidden />
                    )}
                  </span>
                  <span
                    className={`absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors sm:mt-2 sm:text-[13px] ${
                      lit ? 'bg-rc-navy text-white' : 'bg-white/85 text-rc-navy'
                    }`}
                  >
                    {node.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* What the highlighted node is. Hidden from screen readers: each button already says this. */}
      <figcaption className="mx-auto mt-2 flex min-h-18 max-w-md items-start gap-3 rounded-2xl border border-rc-line bg-white/80 p-3.5 backdrop-blur sm:mt-0" aria-hidden>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rc-canvas text-rc-blue">
          <CurrentIcon className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-heading text-[15px] font-bold text-rc-navy">{current.label}</span>
            {current.availability === 'live' && <StatusPill availability="live">Live today</StatusPill>}
          </span>
          <span className="mt-0.5 block text-sm leading-snug text-slate-600">{current.description}</span>
        </span>
      </figcaption>
    </figure>
  )
}
