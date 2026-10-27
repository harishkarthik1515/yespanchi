import type { Metadata } from 'next';
import { SectionNav } from '@/components/SectionNav';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services } from '@/lib/data';
import { serviceDetails } from '@/lib/mock/services';
import { absoluteUrl, SITE } from '@/lib/site';
import { Button, Container, CtaBand, JsonLd, PageHero, SectionHeading } from '@/components/ui';
import { Icon, IconTile } from '@/components/Icon';
import { Faq } from '@/components/services/Faq';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) return {};
  return {
    title: `${s.name} Services in Chennai`,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.name} | YesPanchi`, description: s.summary, url: `/services/${s.slug}` }
  };
}

export default function ServicePage({ params }: Props) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) notFound();
  const det = serviceDetails[s.slug];
  const related = [
    ...services.filter((x) => x.division === s.division && x.slug !== s.slug),
    ...services.filter((x) => x.division !== s.division)
  ].slice(0, 3);
  const subnav = [
    { id: 'deliverables', label: 'Scope' },
    { id: 'process', label: 'Process' },
    ...(det ? [{ id: 'case', label: 'Case study' }, { id: 'faq', label: 'FAQ' }] : []),
    { id: 'related', label: 'Related' }
  ];
  return (
    <>
      <PageHero crumbs={[{ name: 'Services', href: '/services' }, { name: s.name, href: `/services/${s.slug}` }]} eyebrow={s.division} title={s.name} lead={s.summary}>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href={`/contact?topic=service&item=${encodeURIComponent(s.name)}`}>Get a quote</Button>
          <Button href="/contact?topic=assessment" variant="outline">Free assessment</Button>
        </div>
        {det && (
          <dl className="mt-4 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[
              { k: 'Starting at', v: det.priceFrom, icon: 'card' as const },
              { k: 'Typical timeline', v: det.duration, icon: 'clock' as const },
              { k: 'Steps', v: `${s.process.length}-stage process`, icon: 'list' as const }
            ].map((x) => (
              <div key={x.k} className="flex items-center gap-3 bg-ink/80 p-4 backdrop-blur">
                <span className="text-bronze"><Icon name={x.icon} size={20} /></span>
                <div className="flex flex-col"><dt className="text-xs uppercase tracking-[0.14em] text-dim">{x.k}</dt><dd className="font-bold">{x.v}</dd></div>
              </div>
            ))}
          </dl>
        )}
      </PageHero>

      <SectionNav items={subnav} />

      {/* Scope + tools — light */}
      <section aria-labelledby="deliverables" className="theme-light scroll-mt-16 bg-ink py-24 text-cream">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-8">
            <SectionHeading id="deliverables" eyebrow="Scope" title="What's included" />
            {det && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Standards & tools we use</h3>
                <ul className="flex flex-wrap gap-2">
                  {det.tools.map((t) => <li key={t} className="rounded-full border border-line2 bg-surface px-3.5 py-1.5 text-sm font-medium">{t}</li>)}
                </ul>
              </div>
            )}
          </div>
          <ul className="grid min-w-0 gap-4 sm:grid-cols-2">
            {s.deliverables.map((d, i) => (
              <li key={d} className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bronze/15 text-bronze"><Icon name="check" size={20} /></span>
                <span className="text-lg font-semibold">{d}</span>
                <span className="mt-auto font-mono text-xs text-dim">Deliverable 0{i + 1}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process — dark, connected steps */}
      <section aria-labelledby="process" className="scroll-mt-16 py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading id="process" eyebrow="How we work" title="Our process" />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
            <span aria-hidden="true" className="absolute left-5 right-5 top-5 hidden h-px bg-line2 lg:block" />
            {s.process.map((step, i) => (
              <li key={step} className="relative flex flex-col gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-bronze font-bold text-ink ring-8 ring-ink">{i + 1}</span>
                <span className="text-xl font-bold">{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {det && (
        <section aria-labelledby="case" className="theme-light scroll-mt-16 bg-ink py-24 text-cream">
          <Container className="flex flex-col gap-10">
            <SectionHeading id="case" eyebrow={`Case study · ${det.caseStudy.industry}`} title="Real problem," accent="measurable outcome." />
            <article className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-6 bg-surface p-8 md:p-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-dim">The challenge</h3>
                  <p className="text-lg">{det.caseStudy.problem}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-dim">What we did</h3>
                  <p className="text-lg">{det.caseStudy.outcome}</p>
                </div>
              </div>
              <dl className="grid grid-cols-1 gap-px bg-line sm:grid-cols-3 lg:grid-cols-1">
                {det.caseStudy.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col justify-center bg-raised p-6">
                    <dt className="order-2 text-sm text-muted">{m.label}</dt>
                    <dd className="order-1 text-4xl font-extrabold tracking-tight text-bronze">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
            <p className="text-sm text-dim">Client anonymised. Case study, prices and timelines are sample content.</p>
          </Container>
        </section>
      )}

      {det && (
        <section aria-labelledby="faq" className="scroll-mt-16 py-24">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <SectionHeading id="faq" eyebrow="FAQ" title="Questions about" accent={s.name} />
            <Faq items={det.faqs} />
          </Container>
        </section>
      )}

      <section aria-labelledby="related" className="scroll-mt-16 border-t border-raised py-24">
        <Container className="flex flex-col gap-10">
          <h2 id="related" className="text-3xl font-extrabold tracking-[-0.03em]">Related services</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}`} className="group flex h-full flex-col gap-3 rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze">
                  <div className="flex items-center gap-4"><IconTile name={r.icon} size="sm" /><span className="font-semibold">{r.name}</span></div>
                  <p className="text-sm text-muted">{r.summary}</p>
                  <span className="mt-auto text-sm font-semibold text-bronze-light group-hover:underline">
                    {serviceDetails[r.slug] ? `From ${serviceDetails[r.slug].priceFrom} · ` : ''}View →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name, description: s.summary, url: absoluteUrl(`/services/${s.slug}`), areaServed: 'IN', provider: { '@type': 'Organization', name: SITE.legalName, url: SITE.url } }} />
      {det && <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: det.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />}
    </>
  );
}
