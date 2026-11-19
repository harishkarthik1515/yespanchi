import type { Metadata } from 'next';
import Image from 'next/image';
import { associates, groupCompanies } from '@/lib/data';
import { getCollaborations } from '@/lib/cms';
import { Container, CtaBand, PageHero, SectionHeading } from '@/components/ui';

export const metadata: Metadata = {
  title: 'MoUs & Collaborations',
  description: 'YesPanchi group companies, technology associates and collaborations.',
  alternates: { canonical: '/events/mous' }
};

export default async function MousPage() {
  const collaborations = await getCollaborations();
  return (
    <>
      <PageHero image="/gallery/yespanchi-and-cyberfit-join-hands-to-provide-secure-data-erasure-services.jpg" crumbs={[{ name: 'Events', href: '/events' }, { name: 'MoUs & Collaborations', href: '/events/mous' }]} eyebrow="Partnerships" title="MoUs &" accent="collaborations." lead="The group companies, technology associates and collaborations that extend what YesPanchi delivers.">
        <dl className="mt-2 flex flex-wrap gap-3">
          {[{ k: 'Group companies', n: groupCompanies.length }, { k: 'Associates', n: associates.length }, { k: 'Collaborations', n: collaborations.length }].map((c) => (
            <div key={c.k} className="flex items-baseline gap-2 rounded-full border border-line2 px-4 py-2">
              <dd className="text-xl font-medium text-accent">{c.n}</dd><dt className="text-sm text-muted">{c.k}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <section aria-labelledby="collab" className="py-16 md:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="collab" eyebrow="Collaborations" title="Working" accent="together." />
          <ul className="grid gap-5 md:grid-cols-2">
            {collaborations.map((c) => (
              <li key={c.partner} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="relative aspect-[16/9]"><Image src={c.image} alt="" fill unoptimized className="object-cover" /></div>
                <div className="flex flex-col gap-2 p-6">
                  <h3>{c.partner}</h3>
                  <p className="text-muted">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="group" className="theme-light py-16 md:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="group" eyebrow="Group companies" title="The YesPanchi" accent="group." />
          <ul className="grid gap-5 sm:grid-cols-3">
            {groupCompanies.map((g) => (
              <li key={g.name} className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-7 text-center">
                {/* Logos are supplied on dark artwork, so they sit on a navy tile in both themes. */}
                <span className="theme-dark relative block h-28 w-full overflow-hidden rounded-xl bg-ink"><Image src={g.logo} alt="" fill unoptimized className="object-contain p-3" /></span>
                <h3 className="text-lg">{g.name}</h3>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="assoc" className="py-16 md:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="assoc" eyebrow="In association with" title="Technology" accent="associates." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {associates.map((a) => <li key={a} className="rounded-2xl border border-line bg-surface p-6 text-lg font-semibold text-heading">{a}</li>)}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
