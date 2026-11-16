import type { Metadata } from 'next';
import Link from 'next/link';
import { insightItems, insightTypes } from '@/lib/mock/insights';
import { Container, CtaBand, PageHero, SectionHeading, formatDate } from '@/components/ui';
import { IconTile } from '@/components/Icon';
import { Newsletter } from '@/components/interactive';
import { InsightsExplorer } from '@/components/insights/InsightsExplorer';

export const metadata: Metadata = {
  title: 'YesPanchi Insights — Research, Reports & Updates',
  description: 'White papers, research and industry reports, technology briefs, blogs, case studies and release notes from the YesPanchi team.',
  alternates: { canonical: '/insights' }
};

export default function InsightsPage() {
  const featured = insightItems[0];
  const featuredType = insightTypes.find((t) => t.slug === featured.type)!;
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Insights', href: '/insights' }]}
        eyebrow="YesPanchi Insights"
        title="Research, perspectives and updates"
        accent="from our team."
      />

      <section aria-label="Search and latest insights" className="py-20 md:py-24">
        <Container className="flex flex-col gap-14">
          <InsightsExplorer />

          <article className="theme-dark grid gap-8 rounded-2xl bg-ink p-8 md:grid-cols-[1.4fr_.6fr] md:p-14">
            <div className="flex flex-col gap-4">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Featured · {featuredType.title}</p>
              <h2>{featured.title}</h2>
              <p className="text-lead text-muted">{featured.excerpt}</p>
            </div>
            <p className="flex flex-col justify-end gap-1 text-sm text-muted md:items-end">
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              <span className="font-semibold text-accent">Coming soon</span>
            </p>
          </article>
        </Container>
      </section>

      <section aria-labelledby="blocks" className="theme-light py-20 md:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading id="blocks" eyebrow="Browse by type" title="Twelve ways to" accent="go deeper." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {insightTypes.map((t) => {
              const count = insightItems.filter((i) => i.type === t.slug).length;
              return (
                <li key={t.slug}>
                  <Link href={`/insights/${t.slug}`} className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-accent">
                    <span className="flex items-start justify-between gap-4">
                      <IconTile name={t.icon} size="lg" />
                      <span className="rounded-full bg-raised px-3 py-1 text-xs font-semibold text-muted">{count} item{count === 1 ? '' : 's'}</span>
                    </span>
                    <span className="text-xl font-semibold text-heading">{t.title}</span>
                    <span className="text-muted">{t.desc}</span>
                    <span className="mt-auto border-t border-line pt-4 text-sm font-semibold text-accent group-hover:underline">View all →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="text-sm text-dim">All items are sample placeholders until the first pieces are published.</p>
        </Container>
      </section>

      <section aria-labelledby="signup" className="py-20 md:py-24">
        <Container className="flex flex-wrap items-end justify-between gap-10">
          <SectionHeading id="signup" eyebrow="Newsletter" title="Security briefings," accent="monthly." lead="Threat round-up, regulatory updates, product news and upcoming events." />
          <Newsletter />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
