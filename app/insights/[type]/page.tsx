import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { flipbook, insightTypes, journey, magazine, typeOf, type InsightType } from '@/lib/mock/insights';
import { getInsights } from '@/lib/cms';
import { Button, Container, CtaBand, PageHero } from '@/components/ui';
import {
  ArchitectureExplorer, InsightCard, Library, Storytelling, TopicDiscovery
} from '@/components/insights/experiences';
import { Flipbook } from '@/components/insights/MacFlipbook';

type Props = { params: { type: string } };

export function generateStaticParams() {
  return insightTypes.map((t) => ({ type: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const t = insightTypes.find((x) => x.slug === params.type);
  if (!t) return {};
  return { title: `${t.title} | Insights`, description: t.desc, alternates: { canonical: `/insights/${t.slug}` } };
}

const eyebrow = 'text-[13px] font-semibold uppercase tracking-[0.2em] text-accent';

function Experience({ id, t, children, light }: { id: string; t: InsightType; children: React.ReactNode; light?: boolean }) {
  const e = t.experiences.find((x) => x.id === id)!;
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-24 border-b border-line py-20 md:py-24 ${light ? 'theme-light' : ''}`}>
      <Container className="flex flex-col gap-10">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className={eyebrow}>{t.title}</p>
          <h2 id={`${id}-h`} className="text-d2 font-light">{e.title}</h2>
          <p className="text-lead text-muted">{e.desc}</p>
        </div>
        {children}
      </Container>
    </section>
  );
}

export default async function InsightTypePage({ params }: Props) {
  const t = insightTypes.find((x) => x.slug === params.type);
  if (!t) notFound();
  const all = await getInsights();
  const items = all.filter((i) => i.type === t.slug);

  return (
    <>
      <PageHero image={t.image} crumbs={[{ name: 'Insights', href: '/insights' }, { name: t.title, href: `/insights/${t.slug}` }]} eyebrow="YesPanchi Insights" title={t.title} lead={t.desc}>
        {t.experiences.length > 1 && <ul className="mt-2 flex flex-wrap gap-2">
          {t.experiences.map((e) => (
            <li key={e.id}>
              <a href={`#${e.id}`} className="inline-flex min-h-[44px] items-center border border-white/60 px-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black">{e.title}</a>
            </li>
          ))}
        </ul>}
      </PageHero>

      {t.slug === 'white-papers' && (
        <>
          <Experience id="flipbook" t={t}><Flipbook /></Experience>
          <Experience id="all-white-papers" t={t}><Library type="white-papers" items={all} /></Experience>
        </>
      )}

      {t.slug === 'newsletters' && (
        <>
          <Experience id="digital-magazine" t={t}>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div className="theme-dark relative isolate flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-xl bg-black p-8 shadow-2xl">
                <Image src={magazine.cover.image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="-z-10 object-cover opacity-70" />
                <div className="flex items-center justify-between text-white">
                  <span className="text-2xl font-semibold tracking-tight">Security Briefings</span>
                  <span className="text-xs uppercase tracking-[0.14em] text-white/70">{magazine.issue}</span>
                </div>
                <h3 className="max-w-[12ch] text-5xl font-light leading-[1.05] text-white">{magazine.cover.title}</h3>
              </div>
              <ol className="flex flex-col divide-y divide-line">
                {magazine.features.map((f, n) => (
                  <li key={f.title} className="grid grid-cols-[48px_1fr] gap-4 py-6">
                    <span className="font-mono text-3xl font-light text-line3">{n + 1}</span>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{f.kicker}</p>
                      <p className="text-2xl font-medium leading-snug">{f.title}</p>
                      <p className="text-muted">{f.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Experience>
          <Experience id="storytelling" t={t} light><Storytelling /></Experience>
        </>
      )}

      {t.slug === 'blogs' && <Experience id="all-blogs" t={t}><TopicDiscovery items={all} /></Experience>}

      {t.slug === 'case-studies' && (
        <>
          <Experience id="solution-journey" t={t}>
            <p className="text-2xl font-medium">{journey.title}</p>
            <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-5">
              {journey.steps.map((s, n) => (
                <li key={s.phase} className="flex flex-col gap-3 bg-ink p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent font-mono text-sm text-accent">0{n + 1}</span>
                  <span className="text-lg font-semibold">{s.phase}</span>
                  <span className="text-[15px] text-muted">{s.text}</span>
                </li>
              ))}
            </ol>
            <dl className="grid gap-6 sm:grid-cols-3">
              {journey.results.map((m) => (
                <div key={m.l} className="border-t-2 border-accent pt-4">
                  <dd className="text-5xl font-light text-accent">{m.v}</dd>
                  <dt className="mt-1 text-muted">{m.l}</dt>
                </div>
              ))}
            </dl>
          </Experience>
          <Experience id="architecture-explorer" t={t} light><ArchitectureExplorer /></Experience>
        </>
      )}

      {/* blogs and white papers already list every item above */}
      {t.slug !== "blogs" && t.slug !== "white-papers" && (
      <section aria-labelledby="more-h" className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="more-h" className="text-d2 font-light">All {t.title.toLowerCase()}</h2>
            <div className="flex flex-wrap gap-3">
              {insightTypes.filter((x) => x.slug !== t.slug).map((x) => (
                <Link key={x.slug} href={`/insights/${x.slug}`} className="text-sm font-semibold text-accent hover:underline">{typeOf(x.slug).title} →</Link>
              ))}
            </div>
          </div>
          <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {items.map((i) => <li key={i.slug}><InsightCard item={i} /></li>)}
          </ul>
          <p className="text-sm text-dim">Items are sample placeholders, nothing is published here yet.</p>
          <div className="flex flex-wrap gap-3">
            <Button href={`/contact?topic=other&item=${encodeURIComponent(t.title)}`}>Request a copy</Button>
            <Button href="/insights" variant="outline">All insights</Button>
          </div>
        </Container>
      </section>
      )}

      <CtaBand />
    </>
  );
}
