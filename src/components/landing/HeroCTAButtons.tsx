import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LINKS } from './content'
import { ctaArrowDownIn, ctaArrowDownOut, ctaArrowIn, ctaArrowOut, ctaQuiet, ctaQuietChamber, ctaSignature, ctaSignatureChamber } from './styles'

// The hero's two ways forward. Get Started leads; Explore stays on the page and scrolls to the platform.
// Stacked full width on phones, side by side from sm.
export function HeroCTAButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 ${className}`}>
      <Link to={LINKS.register} className={ctaSignature}>
        Get Started
        <span className={ctaSignatureChamber} aria-hidden>
          <ArrowRight className={ctaArrowOut} strokeWidth={2.25} />
          <ArrowRight className={ctaArrowIn} strokeWidth={2.25} />
        </span>
      </Link>
      <a href="#platform" className={ctaQuiet}>
        Explore the Platform
        <span className={ctaQuietChamber} aria-hidden>
          <ArrowDown className={ctaArrowDownOut} strokeWidth={2.25} />
          <ArrowDown className={ctaArrowDownIn} strokeWidth={2.25} />
        </span>
      </a>
    </div>
  )
}
