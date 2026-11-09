import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/data';
import { serviceDetails } from '@/lib/mock/services';
import { Container, CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { Icon, IconTile } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Services — VAPT, ISO 27001, PCI DSS, Cyber Forensics & Digital',
  description: 'General and audit services from YesPanchi: VAPT, ISO 27001, PCI DSS, IAAP and forensic audits, cyber forensics, cyber insurance advisory, digital marketing and AI video.',
  alternates: { canonical: '/services' }
};

const engagement = [ // SAMPLE
  { title: 'Discovery call', text: '30-minute scoping call — free, no obligation.', time: 'Day 1' },
  { title: 'Fixed-fee proposal', text: 'Clear scope, timeline and price band in writing.', time: 'Day 3' },
  { title: 'Delivery', text: 'Named lead, weekly status updates, shared tracker.', time: 'Weeks 1–12' },
  { title: 'Report & re-test', text: 'Board-ready report plus one included re-test.', time: 'Close-out' }
];

export default function ServicesPage() {
  const divisions = [
    { name: 'Audit services', id: 'audit', blurb: 'Independent assurance against standards and regulators — tested, evidenced, certified.' },
    { name: 'General services', id: 'general', blurb: 'Investigation, risk transfer and growth services that sit around your security programme.' }
  ] as const;
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Services', href: '/services' }]}
        eyebrow="Our service divisions"
        title="Technology delivery &"
        accent="cybersecurity audit expertise."
        lead="Two divisions, one partner — from penetration testing and compliance audits to forensic investigations and AI-powered marketing."
      >
        <ul className="mt-2 flex flex-wrap gap-2" aria-label="Jump to division">
          {divisions.map((d) => (
            <li key={d.id}><a href={`#${d.id}`} className="inline-flex items-center gap-2 rounded-full border border-line3 px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent">{d.name} <Icon name="arrow" size={16} /></a></li>
          ))}
        </ul>
      </PageHero>

      {divisions.map((d, idx) => {
        const list = services.filter((s) => s.division === d.name);
        const isFirst = idx === 0;
        return (
          <section key={d.id} aria-labelledby={d.id} className={`scroll-mt-4 py-24 ${isFirst ? 'theme-light' : ''}`}>
            <Container className="flex flex-col gap-12">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading id={d.id} eyebrow={`${list.length} services`} title={d.name} lead={d.blurb} />
              </div>
              <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {list.map((s, i) => {
                  const det = serviceDetails[s.slug];
                  const featured = i === 0;
                  return (
                    <li key={s.slug} className={featured ? 'md:col-span-2 lg:row-span-2 lg:col-span-1' : ''}>
                      <Link href={`/services/${s.slug}`} className={`group flex h-full flex-col gap-4 rounded-3xl border border-line p-7 transition-all hover:-translate-y-0.5 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${featured ? 'bg-raised' : 'bg-surface'}`}>
                        <div className="flex items-start justify-between gap-4">
                          <IconTile name={s.icon} size="lg" />
                          {det && <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">From {det.priceFrom}</span>}
                        </div>
                        <h3 className="text-2xl font-semibold">{s.name}</h3>
                        <p className="text-muted">{s.summary}</p>
                        {featured && det && (
                          <div className="mt-2 rounded-2xl border border-line bg-surface p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dim">Recent result · {det.caseStudy.industry}</p>
                            <dl className="mt-3 grid grid-cols-3 gap-3">
                              {det.caseStudy.metrics.map((m) => (
                                <div key={m.label} className="flex flex-col"><dt className="order-2 text-xs text-muted">{m.label}</dt><dd className="order-1 text-xl font-medium text-accent">{m.value}</dd></div>
                              ))}
                            </dl>
                          </div>
                        )}
                        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm">
                          {det && <span className="flex items-center gap-1.5 text-muted"><Icon name="clock" size={16} />{det.duration}</span>}
                          <span className="font-semibold text-accent group-hover:underline">Details →</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </section>
        );
      })}

      <section aria-labelledby="engage" className="theme-light bg-ink py-24 text-cream">
        <Container className="flex flex-col gap-12">
          <SectionHeading id="engage" eyebrow="How engagements work" title="Simple, fixed-fee," accent="no surprises." />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engagement.map((e, i) => (
              <li key={e.title} className="relative flex flex-col gap-3 rounded-3xl border border-line bg-surface p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-semibold text-ink">{i + 1}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-dim">{e.time}</span>
                </div>
                <h3 className="text-xl font-semibold">{e.title}</h3>
                <p className="text-muted">{e.text}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-dim">Prices, timelines and results shown are sample content.</p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
