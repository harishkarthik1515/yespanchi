import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { briefing, flipbook, insightTypes, itemsOf, journey, magazine, typeOf, type InsightType } from '@/lib/mock/insights';
import { Button, Container, CtaBand, PageHero, formatDate } from '@/components/ui';
import {
  ArchitectureExplorer, InsightCard, KnowledgeGraph, Library, Quiz, Storytelling, TopicDiscovery
} from '@/components/insights/experiences';
import { Flipbook } from '@/components/insights/MacFlipbook';

type Props = { params: { type: string } };

export function generateStaticParams() {
  return insightTypes.map((t) => ({ type: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const t = insightTypes.find((x) => x.slug === params.type);
  if (!t) return {};
  return { title: `${t.title} — YesPanchi Insights`, description: t.desc, alternates: { canonical: `/insights/${t.slug}` } };
}

const eyebrow = 'text-[13px] font-semibold uppercase tracking-[0.2em] text-accent';

function Experience({ id, n, t, children, light }: { id: string; n: number; t: InsightType; children: React.ReactNode; light?: boolean }) {
  const e = t.experiences.find((x) => x.id === id)!;
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-24 border-b border-line py-20 md:py-24 ${light ? 'theme-light' : ''}`}>
      <Container className="flex flex-col gap-10">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className={eyebrow}>0{n} · {t.title}</p>
          <h2 id={`${id}-h`} className="text-d2 font-light">{e.title}</h2>
          <p className="text-lead text-muted">{e.desc}</p>
        </div>
        {children}
      </Container>
    </section>
  );
}

export default function InsightTypePage({ params }: Props) {
  const t = insightTypes.find((x) => x.slug === params.type);
  if (!t) notFound();
  const items = itemsOf(t.slug);

  return (
    <>
      <PageHero image={t.image} crumbs={[{ name: 'Insights', href: '/insights' }, { name: t.title, href: `/insights/${t.slug}` }]} eyebrow="YesPanchi Insights" title={t.title} lead={t.desc}>
        <ul className="mt-2 flex flex-wrap gap-2">
          {t.experiences.map((e) => (
            <li key={e.id}>
              <a href={`#${e.id}`} className="inline-flex min-h-[44px] items-center border border-white/60 px-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black">{e.title}</a>
            </li>
          ))}
        </ul>
      </PageHero>

      {t.slug === 'white-papers' && (
        <>
          <Experience id="flipbook" n={1} t={t}><Flipbook /></Experience>
          <Experience id="briefing-room" n={2} t={t} light>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div className="flex flex-col gap-5">
                <p className="text-xl font-medium">{flipbook.title}</p>
                <ol className="flex flex-col gap-4">
                  {briefing.takeaways.map((k, n) => (
                    <li key={k} className="flex gap-4 border-t border-line pt-4">
                      <span className="font-mono text-accent">0{n + 1}</span>
                      <span className="text-lg">{k}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <dl className="grid content-start gap-px overflow-hidden rounded-xl border border-line bg-line">
                {briefing.stats.map((s) => (
                  <div key={s.l} className="flex flex-col gap-1 bg-ink p-7">
                    <dd className="text-5xl font-light text-accent">{s.v}</dd>
                    <dt className="text-muted">{s.l}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </Experience>
          <Experience id="research-explorer" n={3} t={t}><Library type="white-papers" /></Experience>
        </>
      )}

      {t.slug === 'newsletters' && (
        <>
          <Experience id="digital-magazine" n={1} t={t}>
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
          <Experience id="storytelling" n={2} t={t} light><Storytelling /></Experience>
          <Experience id="quiz" n={3} t={t}><div className="max-w-3xl"><Quiz /></div></Experience>
        </>
      )}

      {t.slug === 'blogs' && (
        <>
          <Experience id="editorial" n={1} t={t}>
            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
              <InsightCard item={items[0]} size="lg" />
              <ol className="flex flex-col divide-y divide-line">
                {items.slice(1).map((i) => (
                  <li key={i.slug} className="flex flex-col gap-1.5 py-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{i.topic}</span>
                    <Link href={`/insights/${i.type}`} className="text-xl font-medium leading-snug text-cream hover:text-accent">{i.title}</Link>
                    <span className="text-sm text-dim">{i.author} · {formatDate(i.date)} · {i.read} min read</span>
                  </li>
                ))}
              </ol>
            </div>
          </Experience>
          <Experience id="topic-discovery" n={2} t={t} light><TopicDiscovery /></Experience>
          <Experience id="knowledge-graph" n={3} t={t}><KnowledgeGraph /></Experience>
        </>
      )}

      {t.slug === 'case-studies' && (
        <>
          <Experience id="solution-journey" n={1} t={t}>
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
          <Experience id="architecture-explorer" n={2} t={t} light><ArchitectureExplorer /></Experience>
        </>
      )}

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
          <p className="text-sm text-dim">Items are sample placeholders — nothing is published here yet.</p>
          <div className="flex flex-wrap gap-3">
            <Button href={`/contact?topic=other&item=${encodeURIComponent(t.title)}`}>Request a copy</Button>
            <Button href="/insights" variant="outline">All insights</Button>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
