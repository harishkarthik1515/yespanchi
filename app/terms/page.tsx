import type { Metadata } from 'next';
import { Container, PageHero } from '@/components/ui';
import { SITE } from '@/lib/site';

export const metadata: Metadata = { title: 'Terms of Use', description: 'Terms governing the use of the YesPanchi website.', alternates: { canonical: '/terms' } };

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Terms', href: '/terms' }]} eyebrow="Legal" title="Terms of use" lead="Sample terms — have your legal team review and replace before launch." />
      <Container className="py-16">
        <div className="flex max-w-3xl flex-col gap-6 text-muted [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-cream">
          <h2>Use of this site</h2>
          <p>Content on this website is provided for general information about {SITE.legalName} and its services. It is not professional advice for your specific situation.</p>
          <h2>Intellectual property</h2>
          <p>Product names, logos and content are the property of {SITE.legalName} unless stated otherwise.</p>
          <h2>Liability</h2>
          <p>We work to keep information accurate but make no warranties about completeness. Engagements are governed by separate written agreements.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India, with courts in Chennai having jurisdiction.</p>
        </div>
      </Container>
    </>
  );
}
