import type { Metadata } from 'next';
import { Suspense } from 'react';
import { values } from '@/lib/data';
import { culture } from '@/lib/mock/about';
import { benefits, careersFaqs, employeeQuotes, hiringSteps, reasons } from '@/lib/mock/careers';
import { SITE } from '@/lib/site';
import { Button, Container, PageHero, SectionHeading } from '@/components/ui';
import { IconTile } from '@/components/Icon';
import { Faq } from '@/components/services/Faq';
import { ApplyForm, RoleList } from '@/components/careers/client';

export const metadata: Metadata = {
  title: 'Careers — Build the Future of Digital Trust',
  description: 'Join YesPanchi at IIT Madras Research Park: engineering, research, audit and consulting roles across security, enterprise AI and post-quantum products.',
  alternates: { canonical: '/careers' }
};

const band = 'scroll-mt-20 py-20 md:py-24';

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Careers', href: '/careers' }]}
        eyebrow="Careers · Chennai & Bengaluru"
        title="Build the future of"
        accent="digital trust with us."
        lead="We recruit engineers, researchers and consultants to work on security, enterprise AI and post-quantum products that protect real organisations."
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href="#roles">View open roles</Button>
          <Button href="#apply" variant="outline">Join our talent pool</Button>
        </div>
      </PageHero>

      <section aria-labelledby="why" className={band}>
        <Container className="flex flex-col gap-12">
          <SectionHeading id="why" eyebrow="Why YesPanchi" title="Work that" accent="matters." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <li key={r.title} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
                <IconTile name={r.icon} />
                <h3>{r.title}</h3>
                <p className="text-muted">{r.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="life" className={`theme-light ${band}`}>
        <Container className="flex flex-col gap-12">
          <SectionHeading id="life" eyebrow="Life at YesPanchi" title="A team that" accent="grows together." />
          <dl className="grid gap-4 sm:grid-cols-3">
            {culture.slice(0, 3).map((s) => (
              <div key={s.label} className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-7">
                <dd className="order-1 text-[2.5rem] font-semibold leading-none text-accent">{s.value}</dd>
                <dt className="order-2 font-semibold">{s.label}</dt>
                <span className="order-3 text-sm text-dim">{s.note}</span>
              </div>
            ))}
          </dl>
          <ul className="grid gap-5 md:grid-cols-2">
            {employeeQuotes.map((q) => (
              <li key={q.quote}>
                <figure className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-7">
                  <blockquote className="text-lg">“{q.quote}”</blockquote>
                  <figcaption className="mt-auto text-sm text-muted">{q.name} · {q.role}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dim">Team figures and quotes are sample content.</p>
        </Container>
      </section>

      <section aria-labelledby="values" className={band}>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <SectionHeading id="values" eyebrow="Our values" title="What guides" accent="every decision." />
            <ul className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <li key={v.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-6">
                  <h3>{v.title}</h3>
                  <p className="text-[15px] text-muted">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow="Benefits" title="Looked after," accent="so you can focus." />
            <ul className="flex flex-wrap gap-2.5">
              {benefits.map((b) => <li key={b} className="rounded-full border border-line2 px-5 py-2.5 font-medium">{b}</li>)}
            </ul>
          </div>
        </Container>
      </section>

      <section id="roles" aria-labelledby="roles-title" className={`theme-light ${band}`}>
        <Container className="flex flex-col gap-10">
          <SectionHeading id="roles-title" eyebrow="Open roles" title="Find your" accent="place." lead="Roles listed here are placeholders until the hiring plan is confirmed." />
          <RoleList />
        </Container>
      </section>

      <section aria-labelledby="campus" className={band}>
        <Container className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading id="campus" eyebrow="Internships & campus" title="Start your career at" accent="IITM Research Park." lead="Our internship programme gives students six months of project work beside our engineers. We also hire from campuses through the year." />
          <Button href="/careers/security-research-intern">Apply for internship</Button>
        </Container>
      </section>

      <section aria-labelledby="process" className={`theme-light ${band}`}>
        <Container className="flex flex-col gap-12">
          <SectionHeading id="process" eyebrow="Hiring process" title="Four steps," accent="no surprises." lead="We aim to reply within 7 working days." />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-semibold text-accent-contrast">{i + 1}</span>
                <h3>{s.title}</h3>
                <p className="text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="apply" aria-labelledby="apply-title" className={band}>
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading id="apply-title" eyebrow="Application form" title="Send us your" accent="profile." lead="Pick a role or join the talent pool. We only use your details to assess your application." />
          <Suspense fallback={<div className="h-[600px] rounded-2xl border border-line bg-surface" />}>
            <ApplyForm />
          </Suspense>
        </Container>
      </section>

      <section aria-labelledby="faq" className={`theme-light ${band}`}>
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading id="faq" eyebrow="FAQ" title="Before you" accent="apply." />
          <Faq items={careersFaqs} />
        </Container>
      </section>

      <section aria-labelledby="closing" className="py-24">
        <Container>
          <div className="theme-dark flex flex-wrap items-end justify-between gap-8 rounded-2xl bg-ink p-8 md:p-16">
            <div className="flex max-w-2xl flex-col gap-4">
              <h2 id="closing">Don’t see your role? Send us your profile.</h2>
              <p className="text-lead text-muted">We are always glad to hear from people who care about security and trust.</p>
            </div>
            <Button href={`mailto:${SITE.email}?subject=Careers%20at%20YesPanchi`} external>Email careers team</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
