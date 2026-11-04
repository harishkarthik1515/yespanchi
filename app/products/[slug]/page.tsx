import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, type Product } from '@/lib/data';
import { absoluteUrl } from '@/lib/site';
import { Button, Container, CtaBand, JsonLd, PageHero, SectionHeading } from '@/components/ui';
import { IconTile } from '@/components/Icon';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.filter((p) => !p.externalUrl).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = products.find((x) => x.slug === params.slug && !x.externalUrl);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tag}`,
    description: p.description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name} | YesPanchi`, description: p.description, url: `/products/${p.slug}` }
  };
}

type FullProduct = Product & Required<Pick<Product, 'coreTechnologies' | 'overview' | 'challenge' | 'pillars' | 'keyFeatures' | 'businessValue' | 'useCases' | 'techStack' | 'ctaLine'>>;

export default function ProductPage({ params }: Props) {
  const found = products.find((x) => x.slug === params.slug);
  if (!found || found.externalUrl) notFound();
  const p = found as FullProduct;
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 2);
  const demo = `/contact?topic=product&item=${encodeURIComponent(p.name)}`;

  return (
    <>
      <PageHero crumbs={[{ name: 'Products', href: '/products' }, { name: p.name, href: `/products/${p.slug}` }]} eyebrow={p.tag} title={p.name} lead={p.description}>
        <ul className="flex flex-wrap gap-2 text-sm" aria-label="Core technologies">
          {p.coreTechnologies.slice(0, 3).map((t) => (
            <li key={t} className="rounded-full border border-line2 px-3 py-1 text-muted">{t}</li>
          ))}
        </ul>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href={demo}>Request a Consultation</Button>
        </div>
      </PageHero>

      {/* Product overview */}
      <section aria-labelledby="overview" className="py-20 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="flex min-w-0 flex-col gap-6">
            <SectionHeading id="overview" eyebrow="Product Overview" title="What" accent={`${p.name} does.`} />
            {p.overview.map((para, i) => <p key={i} className="text-muted">{para}</p>)}
            <ul className="flex flex-wrap gap-2" aria-label="Built for">
              {p.builtFor.map((b) => <li key={b} className="rounded-full bg-raised px-3 py-1.5 text-sm text-muted">{b}</li>)}
            </ul>
          </div>
          <div className="flex min-w-0 flex-col gap-3 rounded-[20px] border border-line bg-surface p-7">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-dim">Core Technologies</h3>
            <ul className="flex flex-col gap-3">
              {p.coreTechnologies.map((t) => (
                <li key={t} className="flex gap-3 text-sm"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-bronze" />{t}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* The challenge */}
      <section aria-labelledby="challenge" className="theme-light bg-ink py-20 text-cream md:py-24">
        <Container className="flex flex-col gap-6">
          <SectionHeading id="challenge" eyebrow={p.challenge.title} title={p.challenge.lead} light />
          <p className="max-w-3xl text-lg font-light text-muted">{p.challenge.body}</p>
        </Container>
      </section>

      {/* Pillars */}
      <section aria-labelledby="pillars" className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="pillars" eyebrow="Core Pillars" title="How it" accent="works." />
          <div className="grid gap-5 sm:grid-cols-2">
            {p.pillars.map((f, i) => (
              <article key={f.title} className="flex flex-col gap-2 rounded-[20px] border border-line bg-surface p-6">
                <span className="font-mono text-xs text-bronze">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="text-sm text-muted">{f.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Workflow (optional step-by-step process) */}
      {p.workflow && (
        <section aria-labelledby="workflow" className="theme-light bg-ink py-20 text-cream md:py-24">
          <Container className="flex flex-col gap-10">
            <SectionHeading id="workflow" eyebrow="Process" title="Step by" accent="step." light />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {p.workflow.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-bronze font-mono text-xs text-bronze-light">{i + 1}</span>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="text-sm text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {/* Key features */}
      <section aria-labelledby="features" className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="features" eyebrow="Capabilities" title="Key" accent="features." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.keyFeatures.map((f) => (
              <article key={f.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-bold">{f.title}</h3>
                <p className="text-sm text-muted">{f.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Business value */}
      <section aria-labelledby="value" className="theme-light bg-ink py-20 text-cream md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="value" eyebrow="Strategic Business Value" title="Why it" accent="matters." light />
          <div className="grid gap-5 sm:grid-cols-2">
            {p.businessValue.map((v) => (
              <article key={v.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-bold">{v.title}</h3>
                <p className="text-sm text-muted">{v.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison table (YP-PRAKAAR only) */}
      {p.comparisonTable && (
        <section aria-labelledby="compare" className="py-20 md:py-24">
          <Container className="flex flex-col gap-10">
            <SectionHeading id="compare" eyebrow="Side by side" title={`${p.name} vs.`} accent="conventional cryptography." />
            <div className="overflow-x-auto rounded-3xl border border-line bg-surface">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-raised text-xs uppercase tracking-[0.12em] text-dim">
                  <tr>{p.comparisonTable.headers.map((h) => <th key={h} scope="col" className="px-5 py-4 font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {p.comparisonTable.rows.map((row) => (
                    <tr key={row[0]}>
                      <th scope="row" className="px-5 py-4 font-semibold">{row[0]}</th>
                      <td className="px-5 py-4 text-muted">{row[1]}</td>
                      <td className="px-5 py-4 font-semibold text-bronze">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      )}

      {/* Use cases by industry */}
      <section aria-labelledby="use-cases" className="theme-light bg-ink py-20 text-cream md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="use-cases" eyebrow="Industry Applications" title="Enterprise use" accent="cases." light />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.useCases.map((u) => (
              <li key={u.industry} className="flex flex-col gap-1.5 rounded-2xl border border-line bg-surface p-5">
                <span className="font-semibold">{u.industry}</span>
                <span className="text-sm text-muted">{u.text}</span>
              </li>
            ))}
          </ul>
          <p className="max-w-3xl text-sm text-dim">Technology stack: {p.techStack}</p>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="more" className="py-20 md:py-24">
          <Container className="flex flex-col gap-10">
            <h2 id="more" className="text-3xl font-extrabold tracking-[-0.03em]">Related products</h2>
            <ul className="grid gap-4 md:grid-cols-2">
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
      )}

      <section aria-labelledby="product-cta" className="pb-8">
        <Container>
          <p className="max-w-2xl text-lg text-muted">{p.ctaLine}</p>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: p.name, applicationCategory: 'SecurityApplication', operatingSystem: 'Web', description: p.description, url: absoluteUrl(`/products/${p.slug}`), publisher: { '@type': 'Organization', name: 'YesPanchi Tech Services Pvt. Ltd.' } }} />
    </>
  );
}
