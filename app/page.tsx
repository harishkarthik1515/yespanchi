import Link from 'next/link';
import { awards, clients, faqs, stats, trainingTopics, whyUs } from '@/lib/data';
import { Button, Container, Eyebrow, JsonLd, SectionHeading } from '@/components/ui';
import { Faq, Newsletter, ProductShowcase, ReadinessCheck, ServicesTabs } from '@/components/interactive';
import { CountUp, Plexus } from '@/components/effects';
import { Icon } from '@/components/Icon';
import { HeroSwitch } from '@/components/HeroSwitch';
import { HeroClassic } from '@/components/heroes';
import { HeroPersona } from '@/components/HeroPersona';
import { HeroEcosystem } from '@/components/HeroEcosystem';
import { CaseStudies, Insights, Testimonials } from '@/components/home/sections';

const engagement = [
  { step: 'Discover', text: 'A 30-minute call to understand your systems, regulators and risk appetite.' },
  { step: 'Assess', text: 'VAPT, configuration and compliance review against ISO 27001, PCI DSS and your policies.' },
  { step: 'Harden', text: 'Prioritised fixes with your team — from quick wins to post-quantum migration.' },
  { step: 'Assure', text: 'Re-tests, audit evidence and ongoing monitoring so posture doesn’t drift.' }
];

export default function HomePage() {
  return (
    <>
      <HeroSwitch heroes={[<HeroClassic key="1" />, <HeroPersona key="2" />, <HeroEcosystem key="3" />]} />

      {/* Clients marquee */}
      <section aria-labelledby="trusted" className="relative border-y border-raised py-9">
        <h2 id="trusted" className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-dim">Trusted by government, enterprise &amp; startups</h2>
        <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="flex w-max animate-marquee gap-14 whitespace-nowrap text-xl font-semibold text-muted">
            {clients.map((c) => <li key={c} className="transition-colors hover:text-bronze-light">{c}</li>)}
            {clients.map((c) => <li key={`dup-${c}`} aria-hidden="true">{c}</li>)}
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="YesPanchi in numbers" className="py-16">
        <Container>
          <div className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ ['--d' as string]: `${i * 90}ms` }} className={`flex flex-col gap-2 border-line px-6 py-8 ${i < 3 ? 'lg:border-r' : ''}`}>
                <CountUp value={s.value} className="text-6xl font-extrabold leading-none tracking-[-0.04em] text-bronze" />
                <span className="font-semibold">{s.label}</span>
                <span className="text-sm text-dim">{s.note}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section aria-labelledby="services" className="pb-28 pt-8">
        <Container className="flex flex-col gap-12">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="services" eyebrow="What we do" title="End-to-end cyber protection," accent="one partner." lead="From threat assessment to digital transformation — we secure, innovate and scale with you." />
            <Link href="/services" className="border-b border-bronze py-3 font-semibold">View all services →</Link>
          </div>
          <div data-reveal><ServicesTabs /></div>
        </Container>
      </section>

      {/* Products */}
      <section aria-labelledby="products" className="bg-paper text-ink">
        <Container className="flex flex-col gap-11 py-28">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading light id="products" eyebrow="Innovation stack" title="Our technology" accent="products." lead="Cryptographic security, AI-powered corporate governance and natural voice interfaces — built for the enterprise." />
            <Link href="/products" className="border-b border-ink py-3 font-semibold !text-ink">Explore all products →</Link>
          </div>
          <div data-reveal><ProductShowcase /></div>
        </Container>
      </section>

      {/* Engagement process */}
      <section aria-labelledby="process" className="py-28">
        <Container className="flex flex-col gap-14">
          <div data-reveal><SectionHeading id="process" eyebrow="How we engage" title="From first call to" accent="lasting assurance." /></div>
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-bronze via-line2 to-transparent md:block" />
            {engagement.map((e, i) => (
              <li key={e.step} data-reveal style={{ ['--d' as string]: `${i * 120}ms` }} className="relative flex flex-col gap-3">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-bronze bg-ink font-mono text-sm text-bronze-light">0{i + 1}</span>
                <h3 className="mt-2 text-2xl font-bold">{e.step}</h3>
                <p className="text-muted">{e.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CaseStudies />

      <Testimonials />

      {/* Why us + awards */}
      <section aria-labelledby="why" className="theme-light py-24 md:py-28">
        <Container className="flex flex-col gap-14">
          <div className="flex flex-wrap gap-12">
            <div data-reveal className="min-w-0 flex-1 basis-80">
              <SectionHeading id="why" eyebrow="Why us" title="Why YesPanchi?" lead="Security partners are judged on the incidents that never happen. Here's how we earn that trust." />
            </div>
            <div className="grid min-w-0 flex-[999_1_600px] gap-4 sm:grid-cols-3">
              {whyUs.map((w, i) => (
                <article key={w.title} data-reveal style={{ ['--d' as string]: `${i * 100}ms` }} className="spotlight flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-7 transition-colors hover:border-line3">
                  <span className="font-mono text-[13px] text-bronze">0{i + 1}</span>
                  <h3 className="text-[22px] font-bold">{w.title}</h3>
                  <p className="text-base text-muted">{w.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div data-reveal className="flex flex-col gap-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-dim">Awards &amp; recognition</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {awards.map((a) => (
                <li key={a.title + a.year} className="spotlight flex flex-col gap-1.5 rounded-2xl border border-line p-5 transition-colors hover:border-line3">
                  <span className="font-mono text-xs text-bronze">{a.year}</span>
                  <span className="font-semibold">{a.title}</span>
                  <span className="text-sm text-dim">{a.by}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Readiness check */}
      <section aria-labelledby="check" className="py-24 md:py-28">
        <Container className="flex flex-wrap items-start gap-12">
          <div data-reveal className="min-w-0 flex-1 basis-[360px] lg:sticky lg:top-32">
            <SectionHeading id="check" eyebrow="60-second self-check" title="How ready is your organisation?" lead="Tick what's already in place. You'll get an instant readiness score — then let our team turn the gaps into a roadmap." />
          </div>
          <ReadinessCheck />
        </Container>
      </section>

      {/* Training band */}
      <section aria-labelledby="training" className="relative overflow-hidden border-y border-raised bg-surface">
        <Plexus density={0.00005} className="opacity-60" />
        <Container className="relative flex flex-wrap items-center justify-between gap-10 py-20">
          <div data-reveal className="flex min-w-0 flex-[999_1_520px] flex-col gap-4">
            <Eyebrow>Training for students, professionals &amp; enterprises</Eyebrow>
            <h2 id="training" className="text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">Learning. Innovation. Workforce transformation.</h2>
            <ul className="mt-2 flex flex-wrap gap-2.5 text-[15px]">
              {trainingTopics.map((t) => <li key={t} className="rounded-full border border-line2 bg-ink/50 px-4 py-2">{t}</li>)}
            </ul>
          </div>
          <Button href="/training">Explore training programs →</Button>
        </Container>
      </section>

      <Insights />

      {/* FAQ */}
      <section aria-labelledby="faq" className="py-28">
        <Container className="flex flex-wrap gap-12">
          <div data-reveal className="min-w-0 flex-1 basis-80">
            <SectionHeading id="faq" eyebrow="FAQ" title="Questions, answered." />
            <p className="mt-4 text-lg font-light text-muted">Can&apos;t find what you need? <Link href="/contact" className="!text-bronze-light underline underline-offset-[3px]">Talk to our team</Link> — or press <kbd className="rounded border border-line2 px-1.5 font-mono text-sm">⌘K</kbd> to search.</p>
          </div>
          <Faq />
        </Container>
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
      </section>

      {/* CTA + newsletter */}
      <section aria-labelledby="cta" className="pb-28">
        <Container>
          <div data-reveal className="relative flex flex-wrap items-end justify-between gap-10 overflow-hidden rounded-[32px] bg-bronze p-8 text-ink md:p-20">
            <svg aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 text-ink/10" viewBox="0 0 24 24" fill="none"><path d="M12 3 L19 6 V11.5 C19 16 16 19.5 12 21 C8 19.5 5 16 5 11.5 V6 Z" stroke="currentColor" strokeWidth="0.6" /></svg>
            <div className="relative flex min-w-0 flex-[999_1_480px] flex-col gap-4">
              <h2 id="cta" className="text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold leading-none tracking-[-0.04em]">Ready to secure your digital future?</h2>
              <p className="max-w-xl text-lg">Join the organisations that trust YesPanchi to protect their infrastructure, stay compliant and innovate securely.</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button href="/contact?topic=assessment" variant="dark">Book a Free Assessment</Button>
                <Button href="/about" variant="ghost">Learn About Us</Button>
              </div>
            </div>
            <div className="relative flex min-w-0 flex-1 basis-[340px]"><Newsletter /></div>
          </div>
        </Container>
      </section>
    </>
  );
}
