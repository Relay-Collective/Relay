import { ArrowRight } from 'lucide-react'
import { NetworkVisual } from '../NetworkVisual'
import { StatusPill } from '../primitives'
import { container, ctaArrow, ctaPrimary, ctaSecondary, eyebrow, textLink } from '../styles'

// 01: the vision in one look. Words on the left, the network they describe on the right.
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative scroll-mt-24 overflow-hidden bg-white">
      {/* A faint wash behind the network, so the visual sits in its own light */}
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[640px] w-[820px] bg-[radial-gradient(closest-side,rgba(24,185,207,0.12),transparent)] max-lg:-right-80 max-lg:top-auto max-lg:bottom-0"
        aria-hidden
      />

      <div className={`${container} relative grid items-center gap-10 pb-20 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-16 xl:pt-20`}>
        <div className="lg:col-span-7 lg:pr-6">
          <p className={`${eyebrow} flex animate-fade-up items-center gap-3`}>
            <span className="h-px w-8 bg-rc-teal" aria-hidden />
            Built for nonprofits. Powered by community.
          </p>

          <h1
            id="hero-heading"
            className="mt-6 animate-fade-up font-heading text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] text-rc-navy [animation-delay:80ms] min-[400px]:text-[46px] sm:text-[60px] xl:text-[74px]"
          >
            <span className="block">Better connected.</span>
            <span className="block text-rc-blue">Greater impact.</span>
          </h1>

          <p className="mt-6 max-w-[34rem] animate-fade-up text-lg leading-relaxed text-slate-600 [animation-delay:160ms] sm:text-[19px]">
            Nonprofits do extraordinary work. We’re building the shared technology that helps them work together.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] min-[440px]:flex-row">
            <a href="#platform" className={`${ctaPrimary} min-h-14 px-7 text-[17px]`}>
              Explore the platform <ArrowRight className={ctaArrow} aria-hidden />
            </a>
            <a href="#mission" className={`${ctaSecondary} min-h-14 px-7 text-[17px]`}>
              Our mission
            </a>
          </div>

          {/* Grounds the vision in what exists today */}
          <p className="mt-10 flex max-w-[34rem] animate-fade-up flex-wrap items-center gap-x-3 gap-y-2 border-t border-rc-line pt-6 text-[15px] text-slate-600 [animation-delay:320ms]">
            <StatusPill availability="live">Live today</StatusPill>
            <span>
              Our first application, transportation coordination, is up and running.{' '}
              <a href="#story" className={textLink}>
                How it started
              </a>
            </span>
          </p>
        </div>

        <div className="animate-fade-up [animation-delay:200ms] lg:col-span-5">
          <NetworkVisual />
        </div>
      </div>
    </section>
  )
}
