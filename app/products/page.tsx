import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/data';
import { productMock } from '@/lib/mock/products';
import { Container, CtaBand, PageHero, SectionHeading, Button } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { ProductExplorer } from '@/components/products/ProductExplorer';

export const metadata: Metadata = {
  title: 'Products — Post-Quantum Security, AI Governance & Voice AI',
  description: 'QSecura PQ-SSL, Quantik, BoardMind, Alexi Voice, AI Guardrails and UNIFAI — enterprise security and AI products from YesPanchi.',
  alternates: { canonical: '/products' }
};

const heroStats = [ // SAMPLE
  ['6', 'products in market'],
  ['100%', 'India data residency'],
  ['99.95%', 'uptime SLA (Enterprise)']
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Products', href: '/products' }]}
        eyebrow="Innovation"
        title="Our technology"
        accent="products."
        lead="Experience the next generation of cryptographic security, AI-powered corporate governance and natural voice interfaces."
      >
        <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
          {heroStats.map(([v, l]) => (
            <div key={l}><dt className="sr-only">{l}</dt><dd><span className="block text-3xl font-extrabold tracking-tight text-cream">{v}</span><span className="text-sm text-dim">{l}</span></dd></div>
          ))}
        </dl>
      </PageHero>

      <section aria-labelledby="catalogue" className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="catalogue" eyebrow="Catalogue" title="Find the right" accent="product." lead="Filter by what you need to protect — your cryptography, your AI, or your customer conversations." />
          <ProductExplorer />
        </Container>
      </section>

      <section aria-labelledby="compare" className="theme-light bg-ink py-20 text-cream md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="compare" eyebrow="Side by side" title="Compare at a" accent="glance." light />
          <div className="overflow-x-auto rounded-3xl border border-line bg-surface">
            <table className="w-full min-w-[760px] text-left text-sm">
              <caption className="sr-only">Product comparison (sample data)</caption>
              <thead className="bg-raised text-xs uppercase tracking-[0.12em] text-dim">
                <tr>
                  {['Product', 'Category', 'Status', 'Deployment', 'Compliance', 'From'].map((h) => <th key={h} scope="col" className="px-5 py-4 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {products.map((p) => {
                  const m = productMock[p.slug];
                  if (!m) return null;
                  return (
                    <tr key={p.slug} className="hover:bg-raised/60">
                      <th scope="row" className="px-5 py-4 font-semibold"><Link href={`/products/${p.slug}`} className="hover:text-bronze-dark hover:underline">{p.name}</Link></th>
                      <td className="px-5 py-4 text-muted">{m.category}</td>
                      <td className="px-5 py-4"><span className="rounded-full border border-line2 px-2.5 py-0.5 text-xs font-semibold">{m.status}</span></td>
                      <td className="px-5 py-4 text-muted">{m.deployment}</td>
                      <td className="px-5 py-4 text-muted">{m.compliance}</td>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold">{m.startingAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-dim">Prices exclude 18% GST. All figures are sample content.</p>
        </Container>
      </section>

      <section aria-labelledby="why" className="py-20 md:py-24">
        <Container className="grid gap-5 md:grid-cols-3">
          <h2 id="why" className="sr-only">Why YesPanchi products</h2>
          {[
            { icon: 'lock' as const, t: 'Built in India, hosted in India', d: 'Data stays in Indian regions by default — aligned with DPDP Act and sector regulators.' },
            { icon: 'shield' as const, t: 'Security-first engineering', d: 'Developed at IIT Madras Research Park by a team that also runs VAPT and forensics engagements.' },
            { icon: 'hands' as const, t: 'Pilot before you commit', d: 'Most products offer a 2–4 week guided pilot with a written outcomes report.' }
          ].map((x) => (
            <article key={x.t} className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bronze/15 text-bronze"><Icon name={x.icon} size={22} /></span>
              <h3 className="text-xl font-bold">{x.t}</h3>
              <p className="text-muted">{x.d}</p>
            </article>
          ))}
          <div className="md:col-span-3"><Button href="/contact?topic=product">Book a product walkthrough</Button></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
