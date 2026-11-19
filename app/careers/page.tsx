import type { Metadata } from 'next';
import { getRoles } from '@/lib/cms';
import { Button, Container, PageHero, SectionHeading } from '@/components/ui';
import { ApplyButton, RoleList } from '@/components/careers/client';

export const metadata: Metadata = {
  title: { absolute: 'Careers | YesPanchi' },
  description: 'Join YesPanchi at IIT Madras Research Park: engineering, research, audit and consulting roles across security, enterprise AI and post-quantum products.',
  alternates: { canonical: '/careers' }
};

const band = 'scroll-mt-20 py-20 md:py-24';

export default async function CareersPage() {
  const roles = await getRoles();
  return (
    <>
      <PageHero
        image="/media/team-office.jpg"
        crumbs={[{ name: 'Careers', href: '/careers' }]}
        eyebrow="Careers · Chennai & Bengaluru"
        title="Build the future of"
        accent="digital trust with us"
        lead="We recruit engineers, researchers and consultants to work on security, enterprise AI and post-quantum products that protect real organisations."
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href="#roles">View open roles</Button>
          <ApplyButton roles={roles} variant="outline">Join our talent pool</ApplyButton>
        </div>
      </PageHero>

      <section id="roles" aria-labelledby="roles-title" className={`theme-light ${band}`}>
        <Container className="flex flex-col gap-10">
          <SectionHeading id="roles-title" eyebrow="Open roles" title="Find your" accent="place" lead="Roles listed here are placeholders until the hiring plan is confirmed." />
          <RoleList roles={roles} />
        </Container>
      </section>
    </>
  );
}
