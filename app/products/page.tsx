import type { Metadata } from 'next';
import { Container, CtaBand, PageHero, SectionHeading, Button } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { ProductExplorer } from '@/components/products/ProductExplorer';
import { ProductBook } from '@/components/products/ProductBook';

export const metadata: Metadata = {
  title: { absolute: 'Platforms | YesPanchi' },
  description: 'YP-RAKSHA, YP-PRAKAAR and QSecura PQ-SSL: three platforms for continuous protection, enterprise AI governance and quantum-safe security from YesPanchi.',
  alternates: { canonical: '/products' }
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        image="/media/viz-cube.jpg"
        crumbs={[{ name: 'Products', href: '/products' }]}
        eyebrow="Our platforms"
        title="Platforms built for"
        accent="digital trust."
        lead="Three platforms, one mission: secure, governed and future-ready technology."
      />

      <section aria-labelledby="catalogue" className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="catalogue" eyebrow="Catalogue" title="Find the right" accent="product." lead="Next-generation cybersecurity, AI security, and quantum-ready platforms designed to protect, empower, and future-proof modern enterprises." />
          <div className="hidden lg:block"><ProductBook /></div>
          <div className="lg:hidden"><ProductExplorer /></div>
        </Container>
      </section>

      <section aria-labelledby="why" className="py-20 md:py-24">
        <Container className="grid gap-5 md:grid-cols-3">
          <h2 id="why" className="sr-only">Why YesPanchi products</h2>
          {[
            { icon: 'lock' as const, t: 'Built in India, hosted in India', d: 'Data residency aligned with the DPDP Act and sector regulators.' },
            { icon: 'shield' as const, t: 'Security-first engineering', d: 'Developed at IIT Madras Research Park by a team that also runs VAPT and forensics engagements.' },
            { icon: 'hands' as const, t: 'Built for integration', d: 'Designed to work alongside your existing infrastructure, not replace it overnight.' }
          ].map((x) => (
            <article key={x.t} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent"><Icon name={x.icon} size={22} /></span>
              <h3 className="text-xl">{x.t}</h3>
              <p className="text-muted">{x.d}</p>
            </article>
          ))}
          <div className="md:col-span-3"><Button href="/contact?topic=product">Request a Consultation</Button></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
