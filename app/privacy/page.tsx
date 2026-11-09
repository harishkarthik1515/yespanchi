import type { Metadata } from 'next';
import { Container, PageHero } from '@/components/ui';
import { SITE } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How YesPanchi collects, uses and protects personal data.', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Privacy policy', href: '/privacy' }]} eyebrow="Legal" title="Privacy policy" lead="Sample policy text — have your legal team review and replace before launch." />
      <Container className="py-16">
        <div className="flex max-w-3xl flex-col gap-6 text-muted [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-cream">
          <h2>What we collect</h2>
          <p>Details you share through our forms — name, email, phone, organisation and your message — and basic, anonymised analytics about site usage.</p>
          <h2>How we use it</h2>
          <p>To respond to enquiries, deliver services and training you request, and send briefings you subscribe to. We do not sell personal data.</p>
          <h2>Your rights</h2>
          <p>You can request access, correction or deletion of your data, or unsubscribe at any time, in line with India’s Digital Personal Data Protection Act, 2023.</p>
          <h2>Contact</h2>
          <p>Email <a href={`mailto:${SITE.email}`} className="!text-accent">{SITE.email}</a> for privacy requests.</p>
        </div>
      </Container>
    </>
  );
}
