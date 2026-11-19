import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInsights } from '@/lib/cms';
import { insightTypes, typeOf } from '@/lib/mock/insights';
import { Button, Container, PageHero, formatDate } from '@/components/ui';
import { Markdown } from '@/components/Markdown';
import { DownloadGate } from '@/components/insights/DownloadGate';
import { InsightCard, SaveButton } from '@/components/insights/experiences';

type Props = { params: { type: string; slug: string } };

// New articles added in the console render on first visit.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getInsights()).map((i) => ({ type: i.type, slug: i.slug }));
}

async function find(params: Props['params']) {
  if (!insightTypes.some((t) => t.slug === params.type)) return undefined;
  return (await getInsights()).find((i) => i.type === params.type && i.slug === params.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = await find(params);
  if (!i) return {};
  return {
    title: { absolute: `${i.title} | YesPanchi` },
    description: i.excerpt,
    alternates: { canonical: `/insights/${i.type}/${i.slug}` },
    openGraph: { title: i.title, description: i.excerpt, images: [i.image], type: 'article' }
  };
}

export default async function ArticlePage({ params }: Props) {
  const item = await find(params);
  if (!item) notFound();
  const t = typeOf(item.type);
  const related = (await getInsights()).filter((i) => i.type === item.type && i.slug !== item.slug).slice(0, 3);
  const gated = item.type === 'white-papers';

  return (
    <>
      <PageHero
        image={item.image}
        crumbs={[{ name: 'Insights', href: '/insights' }, { name: t.title, href: `/insights/${t.slug}` }, { name: item.title, href: `/insights/${t.slug}/${item.slug}` }]}
        eyebrow={`${t.title} · ${item.topic}`}
        title={item.title}
        lead={item.excerpt}
      >
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
          <span>{item.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{item.read} min read</span>
        </p>
      </PageHero>

      <article className="py-16 md:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="flex justify-end"><SaveButton slug={item.slug} /></div>
          {item.body ? <Markdown text={item.body} /> : <p className="text-lg leading-relaxed text-muted">{item.excerpt}</p>}
          {item.file && (gated ? <DownloadGate title={item.title} file={item.file} /> : (
            <div><Button href={item.file} external>Download PDF</Button></div>
          ))}
          {!item.body && !item.file && (
            <div className="flex flex-wrap gap-3">
              <Button href={`/contact?topic=other&item=${encodeURIComponent(item.title)}`}>Request a copy</Button>
              <Button href={`/insights/${t.slug}`} variant="outline">More {t.title.toLowerCase()}</Button>
            </div>
          )}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-h" className="border-t border-line bg-surface py-16 md:py-20">
          <Container className="flex flex-col gap-10">
            <h2 id="related-h" className="text-d3 font-light">More {t.title.toLowerCase()}</h2>
            <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3">
              {related.map((i) => <li key={i.slug}><InsightCard item={i} /></li>)}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
