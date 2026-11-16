import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { insightItems, insightTypes } from '@/lib/mock/insights';
import { Button, Container, CtaBand, PageHero } from '@/components/ui';
import { InsightCard } from '@/components/insights/InsightsExplorer';

type Props = { params: { type: string } };

export function generateStaticParams() {
  return insightTypes.map((t) => ({ type: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const t = insightTypes.find((x) => x.slug === params.type);
  if (!t) return {};
  return { title: `${t.title} — YesPanchi Insights`, description: t.desc, alternates: { canonical: `/insights/${t.slug}` } };
}

export default function InsightTypePage({ params }: Props) {
  const t = insightTypes.find((x) => x.slug === params.type);
  if (!t) notFound();
  const items = insightItems.filter((i) => i.type === t.slug);

  return (
    <>
      <PageHero crumbs={[{ name: 'Insights', href: '/insights' }, { name: t.title, href: `/insights/${t.slug}` }]} eyebrow="YesPanchi Insights" title={t.title} lead={t.desc}>
        <dl className="grid max-w-3xl gap-4 text-[15px] sm:grid-cols-2">
          <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-dim">Topics</dt><dd>{t.topics}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-dim">Format</dt><dd>{t.format}</dd></div>
        </dl>
      </PageHero>

      <section aria-label={t.title} className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((i) => <li key={i.title}><InsightCard item={i} /></li>)}
          </ul>
          <p className="text-sm text-dim">Items are sample placeholders — nothing is published here yet.</p>
          {/* Until the pieces exist, the type's button asks for it by email instead of linking to a missing file. */}
          <div className="flex flex-wrap gap-3">
            <Button href={`/contact?topic=other&item=${encodeURIComponent(t.title)}`}>{t.button}</Button>
            <Button href="/insights" variant="outline">All insights</Button>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
