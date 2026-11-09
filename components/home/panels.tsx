'use client';

import Link from 'next/link';
import { products, serviceAreas } from '@/lib/data';
import { Icon } from '@/components/Icon';
import { ArrowLink, Counter, GhostFigure, MaskLines, Meter, ScrollTabs } from '@/components/motion';

/* ==================================================================
 * ThreatPanel — "the bad news". Animated meters counting up against a
 * dark field, mirroring Palo Alto's threat-statistics beat.
 * ================================================================== */
const THREATS = [
  { label: 'Increase in ransomware attacks on Indian enterprises (YoY)', value: 73 },
  { label: 'Breaches that begin with an unpatched, internet-facing asset', value: 56 },
  { label: 'Organisations with no post-quantum migration plan', value: 81 }
];

export function ThreatPanel() {
  return (
    <section id="threat" aria-labelledby="threat-title" className="relative overflow-hidden border-b border-line bg-ink py-24 md:py-32">
      <div aria-hidden="true" className="hatch pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-[10%] top-1/4 h-[40vw] max-h-[520px] w-[40vw] max-w-[520px] rounded-full bg-accent/[0.11] blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-wide items-center gap-16 px-6 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-10 lg:order-1">
          {THREATS.map((t, i) => (
            <Meter key={t.label} label={t.label} value={t.value} delay={i * 180} />
          ))}
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">The bad news</p>
          <MaskLines
            as="h2"
            id="threat-title"
            className="text-d2 font-medium"
            lines={[<>Attackers are</>, <>supercharging their</>, <>speed and scale.</>]}
          />
          <p data-reveal style={{ ['--d' as string]: '240ms' }} className="max-w-[52ch] text-lead text-muted">
            Automation has collapsed the gap between a vulnerability going public and it being
            exploited at scale. Annual audits and perimeter tools were not designed for that pace.
          </p>
          <div data-reveal style={{ ['--d' as string]: '320ms' }} className="mt-2">
            <ArrowLink href="/services/vapt" className="text-accent">See how we close that gap</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================================
 * PlatformTabs — the signature scroll-driven section. Scrolling moves
 * through the platforms; each one retints the whole panel.
 * ================================================================== */
const ACCENTS = ['accent-crimson', 'accent-emerald', 'accent-cyan', 'accent-amber'];

export function PlatformTabs() {
  const items = products.map((p, i) => ({
    id: p.slug,
    label: p.name,
    accent: ACCENTS[i % ACCENTS.length]
  }));

  return (
    <section id="platforms" aria-labelledby="platforms-title" className="relative border-b border-line">
      <div className="mx-auto w-full max-w-wide px-6 pb-14 pt-24 md:pt-32">
        <p data-reveal className="mb-5 text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Our platforms</p>
        <MaskLines
          as="h2"
          id="platforms-title"
          className="max-w-[18ch] text-d2 font-medium"
          lines={[<>Introducing the platforms</>, <>built for what comes next</>]}
        />
      </div>

      <ScrollTabs items={items} stickyTop={120}>
        {(active) => {
          const p = products[active];
          return (
            <div className="relative flex min-h-[78vh] items-center overflow-hidden border-b border-line bg-ink">
              <div aria-hidden="true" className="hatch pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-700" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-colors duration-700"
                style={{ background: 'radial-gradient(90% 70% at 72% 50%, rgb(var(--c-accent) / .13), transparent 62%)' }}
              />
              <GhostFigure value={['13x', '4x', '99.9%'][active % 3]} caption={p.tag} />

              <div className="relative mx-auto grid w-full max-w-wide gap-12 px-6 py-16 lg:grid-cols-[1.05fr_.95fr]">
                <div key={p.slug} className="flex min-w-0 animate-[fadeIn_.6s_ease-out] flex-col gap-6">
                  <h3 className="text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold uppercase leading-[1.04] tracking-[0.03em] text-accent">
                    {p.name}
                  </h3>
                  <p className="max-w-[56ch] text-lead text-muted">{p.description}</p>

                  <dl className="mt-2 flex flex-wrap gap-x-12 gap-y-6">
                    {p.builtFor.slice(0, 2).map((f) => (
                      <div key={f} className="flex max-w-[22ch] flex-col gap-1.5">
                        <dt className="flex items-center gap-2 text-sm font-medium text-cream">
                          <Icon name="check" size={16} className="text-accent" />
                          Built for
                        </dt>
                        <dd className="text-sm text-dim">{f}</dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    href={p.externalUrl ?? `/products/${p.slug}`}
                    target={p.externalUrl ? '_blank' : undefined}
                    rel={p.externalUrl ? 'noopener noreferrer' : undefined}
                    className="group mt-4 inline-flex min-h-[52px] w-fit items-center gap-2.5 rounded-full bg-accent px-7 font-semibold text-accent-contrast transition-all duration-300 hover:text-accent-contrast hover:shadow-[0_0_40px_-8px_rgb(var(--c-accent)/.75)]"
                  >
                    {p.externalUrl ? 'Visit' : 'Explore'} {p.name}
                    <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="flex min-w-0 items-center">
                  <ul className="w-full divide-y divide-line overflow-hidden rounded-3xl border border-line bg-ink/80 backdrop-blur-sm">
                    {(p.coreTechnologies ?? p.builtFor).slice(0, 4).map((c) => (
                      <li key={c} className="flex items-start gap-3.5 px-6 py-5 text-[15px]">
                        <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-none rotate-45 bg-accent" />
                        <span className="text-muted">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        }}
      </ScrollTabs>
    </section>
  );
}

/* ==================================================================
 * ServiceGrid — editorial cards with hover-lit edges.
 * ================================================================== */
export function ServiceGrid() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-b border-line py-24 md:py-32">
      <div className="mx-auto w-full max-w-wide px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-[34ch] flex-col gap-5">
            <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">What we do</p>
            <MaskLines as="h2" id="services-title" className="text-d2 font-medium" lines={[<>Turn cyber risk into</>, <>business confidence.</>]} />
          </div>
          <ArrowLink href="/services" className="pb-2 text-cream">View all services</ArrowLink>
        </div>

        <ul className="grid gap-5 md:grid-cols-2">
          {serviceAreas.map((a, i) => (
            <li key={a.name} data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
              <Link
                href={a.href}
                className={`spotlight edge-glow group flex h-full flex-col gap-5 rounded-[26px] border border-line bg-surface/70 p-8 transition-colors duration-300 hover:border-line2 md:p-10 ${ACCENTS[i % ACCENTS.length]}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-[13px] text-accent">0{i + 1}</span>
                  <Icon name="arrow" size={20} className="-rotate-45 text-dim transition-all duration-300 group-hover:rotate-0 group-hover:text-accent" />
                </div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">{a.tag}</p>
                <h3 className="text-d3 font-medium">{a.name}</h3>
                <p className="text-muted">{a.desc}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                  {a.points.map((pt) => (
                    <li key={pt} className="rounded-full border border-line2 px-3.5 py-1.5 text-[13px] text-dim">{pt}</li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ==================================================================
 * ProofBand — large counters on a tinted band.
 * ================================================================== */
export function ProofBand({ stats }: { stats: { value: string; label: string; note: string }[] }) {
  return (
    <section id="proof" aria-label="YesPanchi in numbers" className="relative overflow-hidden border-b border-line py-20 md:py-24">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-wide gap-px overflow-hidden bg-line px-0 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} data-reveal style={{ ['--d' as string]: `${i * 90}ms` }} className="flex flex-col gap-2.5 bg-ink px-7 py-10">
            <Counter value={s.value} className="text-[clamp(2.75rem,5vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-accent" />
            <span className="text-[15px] font-medium">{s.label}</span>
            <span className="text-sm text-dim">{s.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
