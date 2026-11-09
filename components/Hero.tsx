'use client';

import Link from 'next/link';
import { heroStats } from '@/lib/data';
import { Icon } from './Icon';
import { ThreatField } from './ThreatField';
import { Counter, Magnetic, MaskLines, useScrollProgress } from './motion';

/* ------------------------------------------------------------------
 * Hero — full-bleed dark stage, oversized medium-weight headline that
 * reveals line by line, and a scroll-linked fade/lift so the hero
 * recedes as the page moves under it (the Palo Alto opening beat).
 * ------------------------------------------------------------------ */
export function Hero() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const k = Math.max(0, (progress - 0.5) * 2); // 0 until the hero starts leaving

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[clamp(620px,92vh,980px)] items-center overflow-hidden border-b border-line"
    >
      <ThreatField />
      <div aria-hidden="true" className="dotgrid pointer-events-none absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[12%] top-[-10%] h-[62vw] max-h-[760px] w-[62vw] max-w-[760px] rounded-full bg-accent/[0.13] blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-ink" />

      <div
        className="relative mx-auto w-full max-w-wide px-6 py-24"
        style={{ opacity: 1 - k * 0.9, transform: `translate3d(0, ${k * -56}px, 0)` }}
      >
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_.85fr]">
          <div className="flex min-w-0 flex-col gap-7">
            <p data-reveal className="inline-flex items-center gap-3 self-start rounded-full border border-line2 bg-surface/60 py-1.5 pl-1.5 pr-4 text-[13px] font-medium backdrop-blur-md">
              <span className="relative flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-contrast">
                IITM Research Park
              </span>
              <span className="text-muted">Innovation &amp; Digital Trust</span>
            </p>

            <MaskLines
              as="h1"
              id="hero-title"
              className="text-d1 font-medium"
              lines={[
                <>Turning cyber threats</>,
                <>into <span className="sheen">cyber confidence.</span></>
              ]}
            />

            <p data-reveal style={{ ['--d' as string]: '220ms' }} className="max-w-[58ch] text-lead text-muted">
              Next-generation cybersecurity, AI security, post-quantum cryptography and
              automated compliance for organisations that cannot afford to fail.
            </p>

            <div data-reveal style={{ ['--d' as string]: '320ms' }} className="mt-2 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/contact?topic=assessment"
                  className="group inline-flex min-h-[54px] items-center gap-2.5 rounded-full bg-accent px-7 text-[15px] font-semibold text-accent-contrast transition-all duration-300 hover:text-accent-contrast hover:shadow-[0_0_44px_-6px_rgb(var(--c-accent)/.7)]"
                >
                  Book a free security assessment
                  <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Link
                href="/products"
                className="group inline-flex min-h-[54px] items-center gap-2.5 rounded-full border border-line2 px-7 text-[15px] font-medium transition-colors hover:border-cream"
              >
                Explore our platforms
                <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <ul data-reveal style={{ ['--d' as string]: '400ms' }} className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-dim">
              {([['shield', 'Enterprise-grade defence'], ['key', 'NIST post-quantum ready'], ['eye', 'ISO 27001 & PCI DSS']] as const).map(([i, t]) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Icon name={i} size={16} className="text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Stat rail */}
          <div data-reveal="right" style={{ ['--d' as string]: '300ms' }} className="relative min-w-0">
            <span aria-hidden="true" className="absolute -left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent lg:block" />
            <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-1">
              {heroStats.map((s, i) => (
                <div key={s.label} className="spotlight flex flex-col gap-1.5 bg-ink/80 p-7 backdrop-blur-sm" style={{ ['--d' as string]: `${360 + i * 90}ms` }}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="contents">
                    <Counter value={s.value} className="text-[clamp(2.25rem,3.4vw,3rem)] font-semibold leading-none text-accent" />
                    <span className="text-sm text-muted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center"
        style={{ opacity: 1 - k * 2.4 }}
      >
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-line3 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-accent" />
        </span>
      </div>
    </section>
  );
}
