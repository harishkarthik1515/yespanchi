import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { insightItems, insightTypes, typeOf } from '@/lib/mock/insights';
import { Container, PageHero, formatDate } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { Newsletter } from '@/components/interactive';
import { PillNav } from '@/components/home/kyndryl';
import { AskInsights, InsightCard, Library, ReadingDesk, SaveButton, TechRadar } from '@/components/insights/experiences';

export const metadata: Metadata = {
  title: 'YesPanchi Insights — Ideas · Intelligence · Innovation',
  description: 'White papers, newsletters, blogs and case studies on post-quantum security, enterprise AI, payments security and compliance from the YesPanchi team.',
  alternates: { canonical: '/insights' }
};

const SECTIONS = [
  { id: 'featured', label: 'Featured research' },
  { id: 'collections', label: 'Collections' },
  { id: 'month', label: 'Insight of the Month' },
  { id: 'library', label: 'Explore by topic' },
  { id: 'radar', label: 'Technology Radar' },
  { id: 'timeline', label: 'Research timeline' },
  { id: 'desk', label: 'Ask & Reading Desk' }
];

const eyebrow = 'text-[13px] font-semibold uppercase tracking-[0.2em] text-accent';
const band = 'scroll-mt-24 border-b border-line py-20 md:py-24';

export default function InsightsPage() {
  const featured = insightItems.find((i) => i.type === 'white-papers')!;
  const secondary = insightItems.filter((i) => i !== featured && i.type !== 'newsletters').slice(0, 2);
  const latest = insightItems.slice(0, 6);
  const month = insightItems.find((i) => i.slug === 'pqc-payment-infrastructure')!;
  const byMonth = insightItems.reduce<Record<string, typeof insightItems>>((acc, i) => {
    const k = i.date.slice(0, 7);
    (acc[k] ||= []).push(i);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        image="/media/insights.jpg"
        crumbs={[{ name: 'Insights', href: '/insights' }]}
        eyebrow="Ideas · Intelligence · Innovation"
        title="YesPanchi Insights"
        lead="Our digital knowledge and research platform: white papers, newsletters, blogs and case studies on post-quantum security, enterprise AI and digital trust."
      >
        <ul className="mt-2 flex flex-wrap gap-2">
          {insightTypes.map((t) => (
            <li key={t.slug}>
              <Link href={`/insights/${t.slug}`} className="inline-flex min-h-[44px] items-center gap-2 border border-white/60 px-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black">
                <Icon name={t.icon} size={16} /> {t.title}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      <PillNav items={SECTIONS} />

      {/* Featured research + latest publications (editorial lead grid with a right rail) */}
      <section id="featured" aria-labelledby="featured-h" className={band}>
        <Container className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col gap-10">
            <h2 id="featured-h" className={eyebrow}>Featured research</h2>
            <InsightCard item={featured} size="lg" />
            <ul className="grid gap-10 border-t border-line pt-10 md:grid-cols-2">
              {secondary.map((i) => <li key={i.slug}><InsightCard item={i} /></li>)}
            </ul>
          </div>
          <aside aria-labelledby="latest-h" className="flex flex-col gap-6 lg:border-l lg:border-line lg:pl-10">
            <h2 id="latest-h" className={eyebrow}>Latest publications</h2>
            <ol className="flex flex-col divide-y divide-line">
              {latest.map((i, n) => (
                <li key={i.slug} className="flex gap-4 py-4">
                  <span className="font-mono text-2xl font-light text-line3">{String(n + 1).padStart(2, '0')}</span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dim">{typeOf(i.type).title}</span>
                    <Link href={`/insights/${i.type}`} className="font-medium leading-snug text-cream hover:text-accent">{i.title}</Link>
                    <span className="text-xs text-dim">{formatDate(i.date)} · {i.read} min</span>
                  </div>
                  <SaveButton slug={i.slug} />
                </li>
              ))}
            </ol>
          </aside>
        </Container>
      </section>

      {/* The four collections */}
      <section id="collections" aria-labelledby="collections-h" className={`${band} theme-light`}>
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className={eyebrow}>Collections</p>
            <h2 id="collections-h" className="text-d2 font-light">Four ways to go deeper</h2>
          </div>
          <ul className="grid gap-6 md:grid-cols-2">
            {insightTypes.map((t) => (
              <li key={t.slug}>
                <Link href={`/insights/${t.slug}`} className="group grid h-full overflow-hidden rounded-xl border border-line bg-ink transition-colors hover:border-accent sm:grid-cols-[200px_1fr]">
                  <span className="relative block aspect-[16/9] sm:aspect-auto">
                    <Image src={t.image} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </span>
                  <span className="flex flex-col gap-3 p-6">
                    <span className="flex items-center gap-2 text-xl font-medium text-cream"><Icon name={t.icon} size={20} className="text-accent" />{t.title}</span>
                    <span className="text-[15px] text-muted">{t.desc}</span>
                    <span className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {t.experiences.map((e) => <span key={e.id} className="rounded-full bg-raised px-3 py-1 text-xs font-medium text-muted">{e.title}</span>)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Insight of the Month */}
      <section id="month" aria-labelledby="month-h" className="theme-dark relative isolate scroll-mt-24 overflow-hidden bg-black">
        <Image src={month.image} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <Container className="flex min-h-[520px] flex-col justify-center gap-6 py-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#7DB8E8]">Insight of the Month · {new Date(month.date + 'T00:00:00').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          <h2 id="month-h" className="max-w-[22ch] text-d2 font-light text-white">{month.title}</h2>
          <p className="max-w-[56ch] text-lead text-white/80">{month.excerpt}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/insights/white-papers#flipbook" className="inline-flex min-h-[52px] items-center border border-white px-6 font-semibold text-white transition-colors hover:bg-white hover:text-black">Read the flipbook</Link>
            <Link href="/insights/white-papers#briefing-room" className="inline-flex min-h-[52px] items-center px-6 font-semibold text-white underline-offset-4 hover:underline">5-minute briefing →</Link>
          </div>
        </Container>
      </section>

      {/* Explore by topic + Research Library */}
      <section id="library" aria-labelledby="library-h" className={band}>
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className={eyebrow}>Explore by topic · Research Library</p>
            <h2 id="library-h" className="text-d2 font-light">Everything we have published</h2>
          </div>
          <Library />
        </Container>
      </section>

      {/* Technology Radar */}
      <section id="radar" aria-labelledby="radar-h" className={`${band} theme-light`}>
        <Container className="flex flex-col gap-10">
          <div className="flex max-w-3xl flex-col gap-3">
            <p className={eyebrow}>Technology Radar</p>
            <h2 id="radar-h" className="text-d2 font-light">Where we stand on the technologies that matter</h2>
            <p className="text-lead text-muted">Our view from client engagements: what to adopt now, trial, assess, or hold. Updated every quarter.</p>
          </div>
          <TechRadar />
        </Container>
      </section>

      {/* Research timeline */}
      <section id="timeline" aria-labelledby="timeline-h" className={band}>
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className={eyebrow}>Research timeline</p>
            <h2 id="timeline-h" className="text-d2 font-light">Month by month</h2>
          </div>
          <ol className="relative flex flex-col gap-10 border-l border-line2 pl-8 md:pl-12">
            {Object.entries(byMonth).map(([m, items]) => (
              <li key={m} className="relative">
                <span aria-hidden="true" className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-ink md:-left-[53px]" />
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-accent">{new Date(m + '-01T00:00:00').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                <ul className="grid gap-3 md:grid-cols-2">
                  {items.map((i) => (
                    <li key={i.slug}>
                      <Link href={`/insights/${i.type}`} className="flex items-center gap-4 rounded-lg border border-line p-3 transition-colors hover:border-accent">
                        <span className="relative h-14 w-20 flex-none overflow-hidden rounded"><Image src={i.image} alt="" fill sizes="80px" className="object-cover" /></span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dim">{typeOf(i.type).title}</span>
                          <span className="truncate font-medium text-cream">{i.title}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Ask Insights + Reading Desk + newsletter */}
      <section id="desk" aria-label="Ask Insights and Reading Desk" className={`${band} theme-light`}>
        <Container className="grid gap-6 lg:grid-cols-3">
          <AskInsights />
          <ReadingDesk />
          <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-7">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent"><Icon name="mail" size={16} /> Subscribe</p>
            <h3 className="text-2xl font-medium">Security Briefings, monthly</h3>
            <p className="text-muted">Threat round-up, regulatory updates, product news and upcoming events.</p>
            <Newsletter />
          </div>
        </Container>
      </section>

      <p className="py-6 text-center text-sm text-dim">All publications shown are sample placeholders until the first pieces are published.</p>
    </>
  );
}
