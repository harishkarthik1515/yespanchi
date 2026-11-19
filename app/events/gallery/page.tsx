import type { Metadata } from 'next';
import { getGallery } from '@/lib/cms';
import { Container, CtaBand, PageHero } from '@/components/ui';
import { MasonryGallery } from '@/components/events/client';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Photos from YesPanchi talks, conferences, media appearances, campus sessions and awards.',
  alternates: { canonical: '/events/gallery' }
};

export default async function GalleryPage() {
  const gallery = await getGallery();
  return (
    <>
      <PageHero image="/gallery/isaca-conference-2025-2.jpg" crumbs={[{ name: 'Events', href: '/events' }, { name: 'Photo Gallery', href: '/events/gallery' }]} eyebrow="Community" title="Moments from" accent="the field." lead="Talks, conferences, media appearances, campus sessions and award evenings. Select any photo to view it larger, arrow keys move between them." />
      <section aria-label="Gallery" className="theme-light py-16 md:py-20">
        <Container>
          <MasonryGallery items={gallery} />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
