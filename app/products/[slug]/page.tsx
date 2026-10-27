import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { productMock } from '@/lib/mock/products';
import { absoluteUrl } from '@/lib/site';
import { Button, Container, CtaBand, JsonLd, PageHero, SectionHeading } from '@/components/ui';
import { Icon, IconTile } from '@/components/Icon';
import { TiltBanner } from '@/components/effects';
import { Faq } from '@/components/interactive';
import { ProductPreview } from '@/components/products/ProductPreview';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = products.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tag}`,
    description: p.description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name} | YesPanchi`, description: p.description, url: `/products/${p.slug}` }
  };
}

const initials = (n: string) => n.split(' ').map((s) => s[0]).slice(0, 2).join('');

export default function ProductPage({ params }: Props) {
  const p = products.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const m = productMock[p.slug];
  const sameCat = (slug: string) => Number(productMock[slug]?.category === m?.category);
  const related = products.filter((x) => x.slug !== p.slug).sort((a, b) => sameCat(b.slug) - sameCat(a.slug)).slice(0, 3);
  const demo = `/contact?topic=product&item=${encodeURIComponent(p.name)}`;

  return (
    <>
      <PageHero crumbs={[{ name: 'Products', href: '/products' }, { name: p.name, href: `/products/${p.slug}` }]} eyebrow={p.tag} title={p.name} lead={p.description}>
        {m && (
          <ul className="flex flex-wrap gap-2 text-sm" aria-label="Key facts">
            <li className="rounded-full border border-line2 px-3 py-1 text-muted"><span className="text-cream">{m.status}</span> release</li>
            <li className="rounded-full border border-line2 px-3 py-1 text-muted">From <span className="text-cream">{m.startingAt}</span></li>
            <li className="rounded-full border border-line2 px-3 py-1 text-muted"><span className="text-bronze" aria-hidden="true">★</span> <span className="text-cream">{m.rating}</span>/5 · {m.customers}</li>
          </ul>
        )}
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href={demo}>Request a demo</Button>
          {p.externalUrl && <Button href={p.externalUrl} variant="outline" external>Visit {new URL(p.externalUrl).host} ↗</Button>}
        </div>
      </PageHero>

      {p.slug === 'qsecura-pq-ssl' && (
        <section aria-label="QSecura PQ-SSL launch" className="pt-20">
          <Container className="max-w-4xl"><TiltBanner src="/qsecura-launch.jpg" alt="Launching our new product: QSecura PQ-SSL — www.qsecura.com" href="https://qsecura.com" /></Container>
        </section>
      )}

      <section aria-labelledby="features" className="py-20 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex min-w-0 flex-col gap-8">
            <SectionHeading id="features" eyebrow="Capabilities" title="What you" accent="get." />
            <div className="grid gap-4 sm:grid-cols-2">
              {p.features.map((f, i) => (
                <article key={f.title} className="flex flex-col gap-2 rounded-[20px] border border-line bg-surface p-6">
                  <span className="font-mono text-xs text-bronze">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <p className="text-sm text-muted">{f.text}</p>
                </article>
              ))}
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="Built for">
              {p.builtFor.map((b) => <li key={b} className="rounded-full bg-raised px-3 py-1.5 text-sm text-muted">{b}</li>)}
            </ul>
          </div>
          {m && <div className="min-w-0 lg:sticky lg:top-28"><ProductPreview name={p.name} preview={m.preview} /></div>}
        </Container>
      </section>

      {m && (
        <section aria-labelledby="pricing" className="theme-light bg-ink py-20 text-cream md:py-24">
          <Container className="flex flex-col gap-12">
            <SectionHeading id="pricing" eyebrow="Pricing" title="Simple, transparent" accent="plans." lead="Start small with a pilot and scale when you are ready. Prices in INR, exclusive of GST." light />
            <ul className="grid gap-5 lg:grid-cols-3">
              {m.tiers.map((t) => (
                <li key={t.name} className={`relative flex flex-col gap-5 rounded-3xl border bg-surface p-8 ${t.featured ? 'border-bronze shadow-[0_30px_70px_-30px_rgba(143,109,71,0.45)]' : 'border-line'}`}>
                  {t.featured && <span className="absolute -top-3 left-8 rounded-full bg-bronze px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">Most popular</span>}
                  <div>
                    <h3 className="text-xl font-bold">{t.name}</h3>
                    <p className="mt-1 text-sm text-muted">{t.blurb}</p>
                  </div>
                  <p><span className="text-4xl font-extrabold tracking-tight">{t.price}</span> <span className="text-sm text-dim">{t.unit}</span></p>
                  <ul className="flex flex-col gap-2.5 text-sm">
                    {t.features.map((f) => <li key={f} className="flex gap-2.5"><span className="mt-0.5 flex-none text-bronze-dark"><Icon name="check" size={16} /></span>{f}</li>)}
                  </ul>
                  <Button href={`${demo}&plan=${t.name}`} variant={t.featured ? 'primary' : 'ghost'} className="mt-auto">{t.price === 'Custom' ? 'Talk to sales' : 'Start pilot'}</Button>
                </li>
              ))}
            </ul>
            <p className="text-sm text-dim">Sample pricing for illustration. Annual billing saves two months.</p>
          </Container>
        </section>
      )}

      {m && (
        <section aria-labelledby="integrations" className="py-20 md:py-24">
          <Container className="grid gap-12 lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-8">
              <SectionHeading id="integrations" eyebrow="Ecosystem" title="Plays well with your" accent="stack." />
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {m.integrations.map((n) => (
                  <li key={n} className="flex min-h-[72px] items-center justify-center rounded-2xl border border-line bg-surface px-3 text-center text-sm font-semibold text-muted">{n}</li>
                ))}
              </ul>
            </div>
            <figure className="flex min-w-0 flex-col justify-between gap-8 rounded-3xl border border-line bg-gradient-to-br from-raised to-surface p-8 md:p-10">
              <span aria-hidden="true" className="font-serif text-6xl leading-none text-bronze">“</span>
              <blockquote className="text-xl font-light leading-relaxed md:text-2xl">{m.quote.text}</blockquote>
              <figcaption className="flex items-center gap-4">
                <span aria-hidden="true" className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-bronze font-bold text-ink">{initials(m.quote.name)}</span>
                <span><span className="block font-semibold">{m.quote.name}</span><span className="text-sm text-dim">{m.quote.role}, {m.quote.org}</span></span>
              </figcaption>
            </figure>
          </Container>
        </section>
      )}

      {m && (
        <section aria-labelledby="specs" className="theme-light bg-ink py-20 text-cream md:py-24">
          <Container className="flex flex-wrap gap-12">
            <div className="flex min-w-0 flex-1 basis-80 flex-col gap-6">
              <SectionHeading id="specs" eyebrow="Technical" title="Specifications" light />
              <dl className="divide-y divide-line rounded-3xl border border-line bg-surface">
                {m.specs.map(([k, v]) => (
                  <div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[150px_1fr]">
                    <dt className="text-sm font-semibold text-dim">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-dim">Typical deployments</p>
                <ul className="flex flex-col gap-2">{p.useCases.map((u) => <li key={u} className="flex items-center gap-3"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-bronze" />{u}</li>)}</ul>
              </div>
            </div>
            <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-2">
              <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Frequently asked</h2>
              <Faq items={m.faqs} />
            </div>
          </Container>
        </section>
      )}

      <section aria-labelledby="more" className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <h2 id="more" className="text-3xl font-extrabold tracking-[-0.03em]">Related products</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {related.map((o) => (
              <li key={o.slug}>
                <Link href={`/products/${o.slug}`} className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-6 hover:border-bronze">
                  <span className="flex items-center gap-4">
                    <IconTile name={o.icon} />
                    <span className="flex flex-col"><span className="font-semibold">{o.name}</span><span className="text-sm text-dim">{o.tag}</span></span>
                  </span>
                  <span className="text-sm text-muted">{o.short}</span>
                  <span className="mt-auto text-sm font-semibold text-bronze group-hover:underline">View product →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: p.name, applicationCategory: 'SecurityApplication', operatingSystem: 'Web', description: p.description, url: absoluteUrl(`/products/${p.slug}`), publisher: { '@type': 'Organization', name: 'YesPanchi Tech Services Pvt. Ltd.' } }} />
    </>
  );
}
