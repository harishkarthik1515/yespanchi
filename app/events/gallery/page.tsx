import type { Metadata } from 'next';
import { mockGallery } from '@/lib/mock/events';
import { Container, CtaBand, PageHero } from '@/components/ui';
import { MasonryGallery } from '@/components/events/client';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Snapshots from YesPanchi events, trainings, MoU signings and community meetups.',
  alternates: { canonical: '/events/gallery' }
};

export default function GalleryPage() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Events', href: '/events' }, { name: 'Photo Gallery', href: '/events/gallery' }]} eyebrow="Community" title="Moments from" accent="the field." lead="Summits, labs, MoU signings and graduation days. Select any tile to view it larger — arrow keys move between them." />
      <section aria-label="Gallery" className="theme-light py-16 md:py-20">
        <Container>
          <MasonryGallery items={mockGallery} />
          <p className="mt-6 text-sm text-dim">Tiles are illustrative placeholders — add real photos in <code className="font-mono">public/gallery</code>.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
