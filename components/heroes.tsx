import { heroStats } from '@/lib/data';
import { Button, Container } from '@/components/ui';
import { Plexus } from '@/components/effects';
import { Icon } from '@/components/Icon';

/* 1 — Classic (current) */
export function HeroClassic() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Plexus />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-bronze/10 blur-[120px]" />
      <Container className="relative grid items-center gap-14 pb-24 pt-16 md:pt-24 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex min-w-0 flex-col gap-6">
          <p data-reveal className="inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-ink/60 py-1.5 pl-2 pr-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze backdrop-blur">
            <span className="rounded-full bg-bronze px-2 py-0.5 text-[11px] tracking-[0.08em] text-ink">IITM Research Park</span>
            Innovation &amp; Digital Trust
          </p>
          <h1 id="hero-title" data-reveal style={{ ['--d' as string]: '80ms' }} className="text-[clamp(2.9rem,6.4vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            Turning Cyber Threats into <br className="hidden sm:block" />
            <span className="sheen">Cyber Confidence.</span>
          </h1>
          <p data-reveal style={{ ['--d' as string]: '160ms' }} className="max-w-[560px] text-xl font-light text-muted">
            Next-generation cybersecurity, AI security, quantum solutions, automated enterprise security compliance, and resilience consulting for businesses that cannot afford to fail.
          </p>
          <div data-reveal style={{ ['--d' as string]: '240ms' }} className="mt-1 flex flex-wrap gap-3">
            <Button href="/products">Explore Products →</Button>
            <Button href="/contact?topic=assessment" variant="outline">Schedule a Free Security Assessment</Button>
          </div>
          <ul data-reveal style={{ ['--d' as string]: '320ms' }} className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            {[['shield', 'Enterprise-grade security'], ['key', 'Post-quantum ready'], ['eye', 'Global clientele']].map(([i, t]) => (
              <li key={t} className="flex items-center gap-2"><Icon name={i as 'shield'} size={16} className="text-bronze" />{t}</li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ ['--d' as string]: '200ms' }} className="relative min-w-0">
          <span aria-hidden="true" className="absolute -left-5 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-bronze/60 to-transparent lg:block" />
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {heroStats.map((s) => (
              <div key={s.label} className="rounded-3xl border border-line bg-surface/70 p-6 text-center backdrop-blur lg:text-left">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-4xl font-extrabold tracking-tight text-bronze">{s.value}</span>
                  <span className="text-sm text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink" />
    </section>
  );
}
