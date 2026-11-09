import Link from 'next/link';
import { awards, clients, faqs, stats, trainingTopics, whyUs } from '@/lib/data';
import { JsonLd } from '@/components/ui';
import { Faq, Newsletter, ReadinessCheck } from '@/components/interactive';
import { Icon } from '@/components/Icon';
import { Hero } from '@/components/Hero';
import { ArrowLink, MaskLines, StickyNav, Ticker } from '@/components/motion';
import { PlatformTabs, ProofBand, ServiceGrid, ThreatPanel } from '@/components/home/panels';
import { CaseStudies, Insights, Testimonials } from '@/components/home/sections';

const SECTIONS = [
  { id: 'threat', label: 'Why YesPanchi?' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'services', label: 'Services' },
  { id: 'proven', label: 'Proven Success' },
  { id: 'engage', label: 'Engage with Us' }
];

const engagement = [
  { step: 'Discover', text: 'A 30-minute call to understand your systems, regulators and risk appetite.' },
  { step: 'Assess', text: 'VAPT, configuration and compliance review against ISO 27001, PCI DSS and your policies.' },
  { step: 'Harden', text: 'Prioritised fixes with your team — from quick wins to post-quantum migration.' },
  { step: 'Assure', text: 'Re-tests, audit evidence and ongoing monitoring so posture doesn’t drift.' }
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <StickyNav sections={SECTIONS} cta={{ href: '/contact?topic=assessment', label: 'Free assessment' }} />

      {/* Clients ticker */}
      <section aria-labelledby="trusted" className="border-b border-line py-10">
        <h2 id="trusted" className="mb-7 text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-dim">
          Trusted by government, enterprise &amp; startups
        </h2>
        <Ticker items={[...clients]} />
      </section>

      <ThreatPanel />

      <PlatformTabs />

      <ServiceGrid />

      <ProofBand stats={[...stats]} />

      {/* Engagement process */}
      <section id="engage" aria-labelledby="process" className="border-b border-line py-24 md:py-32">
        <div className="mx-auto w-full max-w-wide px-6">
          <div className="mb-16 flex max-w-[32ch] flex-col gap-5">
            <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">How we engage</p>
            <MaskLines as="h2" id="process" className="text-d2 font-medium" lines={[<>From first call to</>, <>lasting assurance.</>]} />
          </div>
          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
            <span aria-hidden="true" className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-accent via-line2 to-transparent md:block" />
            {engagement.map((e, i) => (
              <li key={e.step} data-reveal style={{ ['--d' as string]: `${i * 110}ms` }} className="relative flex flex-col gap-3.5">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-ink font-mono text-sm text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-2xl font-medium">{e.step}</h3>
                <p className="text-muted">{e.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div id="proven">
        <CaseStudies />
        <Testimonials />
      </div>

      {/* Why us + awards */}
      <section aria-labelledby="why" className="theme-light border-b border-line py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-wide flex-col gap-16 px-6">
          <div className="flex flex-wrap gap-12">
            <div className="flex min-w-0 flex-1 basis-80 flex-col gap-5">
              <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Why us</p>
              <MaskLines as="h2" id="why" className="text-d2 font-medium" lines={[<>Judged on the</>, <>incidents that</>, <>never happen.</>]} />
              <p data-reveal style={{ ['--d' as string]: '260ms' }} className="max-w-[46ch] text-lead text-muted">
                Security partners earn trust quietly. Here is how we do it.
              </p>
            </div>
            <div className="grid min-w-0 flex-[999_1_600px] gap-4 sm:grid-cols-3">
              {whyUs.map((w, i) => (
                <article
                  key={w.title}
                  data-reveal
                  style={{ ['--d' as string]: `${i * 100}ms` }}
                  className="spotlight edge-glow flex flex-col gap-3.5 rounded-[22px] border border-line bg-surface/60 p-7 transition-colors hover:border-line2"
                >
                  <span className="font-mono text-[13px] text-accent">0{i + 1}</span>
                  <h3 className="text-[21px] font-medium">{w.title}</h3>
                  <p className="text-[15px] text-muted">{w.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div data-reveal className="flex flex-col gap-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-dim">Awards &amp; recognition</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {awards.map((a) => (
                <li key={a.title + a.year} className="spotlight flex flex-col gap-1.5 rounded-2xl border border-line p-5 transition-colors hover:border-line3">
                  <span className="font-mono text-xs text-accent">{a.year}</span>
                  <span className="font-medium">{a.title}</span>
                  <span className="text-sm text-dim">{a.by}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Readiness check */}
      <section aria-labelledby="check" className="border-b border-line py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-wide flex-wrap items-start gap-14 px-6">
          <div className="flex min-w-0 flex-1 basis-[360px] flex-col gap-5 lg:sticky lg:top-32">
            <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">60-second self-check</p>
            <MaskLines as="h2" id="check" className="text-d2 font-medium" lines={[<>How ready is your</>, <>organisation?</>]} />
            <p data-reveal style={{ ['--d' as string]: '240ms' }} className="max-w-[44ch] text-lead text-muted">
              Tick what’s already in place for an instant readiness score — then let our team turn the gaps into a roadmap.
            </p>
          </div>
          <ReadinessCheck />
        </div>
      </section>

      {/* Training band */}
      <section aria-labelledby="training" className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-[8%] top-0 h-[36vw] max-h-[460px] w-[36vw] max-w-[460px] rounded-full bg-accent/[0.1] blur-[110px]" />
        <div className="relative mx-auto flex w-full max-w-wide flex-wrap items-center justify-between gap-10 px-6 py-24">
          <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-5">
            <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">
              Training for students, professionals &amp; enterprises
            </p>
            <MaskLines as="h2" id="training" className="text-d2 font-medium" lines={[<>Learning. Innovation.</>, <>Workforce transformation.</>]} />
            <ul data-reveal style={{ ['--d' as string]: '260ms' }} className="mt-3 flex flex-wrap gap-2.5 text-[15px]">
              {trainingTopics.map((t) => (
                <li key={t} className="rounded-full border border-line2 px-4 py-2 text-muted">{t}</li>
              ))}
            </ul>
          </div>
          <Link
            href="/training"
            className="group inline-flex min-h-[54px] items-center gap-2.5 rounded-full bg-accent px-7 font-semibold text-accent-contrast transition-all duration-300 hover:text-accent-contrast hover:shadow-[0_0_40px_-8px_rgb(var(--c-accent)/.75)]"
          >
            Explore training programs
            <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Insights />

      {/* FAQ */}
      <section aria-labelledby="faq" className="border-b border-line py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-wide flex-wrap gap-14 px-6">
          <div className="flex min-w-0 flex-1 basis-80 flex-col gap-5">
            <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">FAQ</p>
            <MaskLines as="h2" id="faq" className="text-d2 font-medium" lines={[<>Questions,</>, <>answered.</>]} />
            <p data-reveal style={{ ['--d' as string]: '240ms' }} className="mt-2 text-lead text-muted">
              Can&apos;t find what you need?{' '}
              <Link href="/contact" className="text-accent underline underline-offset-[3px]">Talk to our team</Link> — or press{' '}
              <kbd className="rounded border border-line2 px-1.5 font-mono text-sm">⌘K</kbd> to search.
            </p>
          </div>
          <Faq />
        </div>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
          }}
        />
      </section>

      {/* CTA + newsletter */}
      <section aria-labelledby="cta" className="py-24 md:py-28">
        <div className="mx-auto w-full max-w-wide px-6">
          <div data-reveal className="relative flex flex-wrap items-end justify-between gap-12 overflow-hidden rounded-[32px] border border-line bg-surface/60 p-8 md:p-16">
            <div aria-hidden="true" className="hatch pointer-events-none absolute inset-0 opacity-60" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(80% 90% at 85% 20%, rgb(var(--c-accent) / .18), transparent 60%)' }}
            />
            <div className="relative flex min-w-0 flex-[999_1_480px] flex-col gap-5">
              <MaskLines as="h2" id="cta" className="max-w-[18ch] text-d2 font-medium" lines={[<>Ready to secure your</>, <>digital future?</>]} />
              <p className="max-w-xl text-lead text-muted">
                Partner with YesPanchi to strengthen cybersecurity, streamline compliance and accelerate
                innovation with AI security and quantum-ready solutions.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact?topic=assessment"
                  className="group inline-flex min-h-[54px] items-center gap-2.5 rounded-full bg-accent px-7 font-semibold text-accent-contrast transition-all duration-300 hover:text-accent-contrast hover:shadow-[0_0_44px_-6px_rgb(var(--c-accent)/.75)]"
                >
                  Schedule a free assessment
                  <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <ArrowLink href="/about" className="text-cream">Discover YesPanchi</ArrowLink>
              </div>
            </div>
            <div className="relative flex min-w-0 flex-1 basis-[340px]">
              <Newsletter />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
