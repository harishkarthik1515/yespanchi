import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import { Container, PageHero, SectionHeading } from '@/components/ui';
import { Faq } from '@/components/interactive';
import { Icon } from '@/components/Icon';
import { OpenNow } from '@/components/contact/OpenNow';
import { SITE } from '@/lib/site';
import { contactFaqs, contactInfo, nextSteps } from '@/lib/mock/contact';

export const metadata: Metadata = {
  title: 'Contact Us — Book a Free Security Assessment',
  description: 'Talk to YesPanchi about a free security assessment, product demo, audit or training programme. IIT Madras Research Park, Chennai.',
  alternates: { canonical: '/contact' }
};

const quick = [
  { icon: 'cal' as const, title: 'Book a 30-min call', text: 'Pick a slot that suits you', href: '/contact?topic=assessment#form' },
  { icon: 'phone' as const, title: 'WhatsApp us', text: 'Fastest during office hours', href: `https://wa.me/${SITE.whatsapp}`, external: true },
  { icon: 'mail' as const, title: SITE.email, text: 'For anything, anytime', href: `mailto:${SITE.email}` }
];

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Contact', href: '/contact' }]} eyebrow="Get started" title="Let's secure" accent="what matters." lead="Tell us what you need. A senior consultant replies within one business day.">
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {quick.map((q) => (
            <a
              key={q.title}
              href={q.href}
              {...(q.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="spotlight group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-4 backdrop-blur transition-colors hover:border-accent hover:text-cream"
            >
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-accent/15 text-accent"><Icon name={q.icon} size={20} /></span>
              <span className="min-w-0">
                <span className="block truncate font-semibold">{q.title}</span>
                <span className="text-sm text-dim">{q.text}</span>
              </span>
              <Icon name="arrow" size={16} className="ml-auto flex-none text-dim transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </a>
          ))}
        </div>
      </PageHero>

      {/* Form + what happens next */}
      <section id="form" className="theme-light scroll-mt-24 py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <Suspense fallback={<div className="h-[600px] rounded-3xl border border-line bg-surface" />}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="flex min-w-0 flex-col gap-6">
            <div className="rounded-3xl border border-line bg-surface p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-dim">Office hours</p>
                <OpenNow />
              </div>
              <p className="mt-2 text-lg font-semibold">{SITE.hours}</p>
              <p className="mt-1 text-sm text-muted">Incident response is available 24×7, 365 days.</p>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-dim">What happens next</p>
              <ol className="mt-5 flex flex-col gap-6">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="relative flex gap-4">
                    {i < nextSteps.length - 1 && <span aria-hidden="true" className="absolute left-[15px] top-9 h-[calc(100%-4px)] w-px bg-line2" />}
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-accent text-sm font-semibold text-ink">{i + 1}</span>
                    <span>
                      <span className="block font-semibold">{s.title}</span>
                      <span className="text-sm text-muted">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-center gap-4 rounded-3xl border border-line bg-raised p-6">
              <Icon name="lock" size={22} className="flex-none text-accent" />
              <p className="text-sm text-muted">Your details are encrypted in transit and never shared. We’re happy to sign an NDA before you tell us anything sensitive.</p>
            </div>
          </aside>
        </Container>
      </section>

      {/* Contact information */}
      <section aria-labelledby="teams" className="py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="teams" eyebrow="Get In Touch" title="Contact" accent="Information." lead="Reach us anytime and get the support you need." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((d) => (
              <div key={d.title} className="spotlight flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent"><Icon name={d.icon as 'phone'} size={20} /></span>
                <div>
                  <h3 className="text-lg font-semibold">{d.title}</h3>
                  {d.lines.map((l) => <p key={l} className="text-sm text-muted">{l}</p>)}
                </div>
                <a href={d.action.href} {...(d.action.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="mt-auto inline-flex items-center gap-2 border-t border-line pt-4 text-sm font-semibold text-accent hover:underline">
                  {d.action.label} <Icon name="arrow" size={14} />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Visit */}
      <section aria-labelledby="visit" className="theme-light py-20">
        <Container className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-8">
            <SectionHeading id="visit" eyebrow="Visit us" title="Come say" accent="hello." />
            <p className="flex items-start gap-3 text-lg"><Icon name="pin" size={20} className="mt-1 flex-none text-accent" />{SITE.address}</p>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              <li className="flex gap-3"><Icon name="rail" size={16} className="mt-0.5 flex-none text-accent" />Taramani MRTS station — 6 min walk</li>
              <li className="flex gap-3"><Icon name="pin" size={16} className="mt-0.5 flex-none text-accent" />Visitor parking at Gate 2; collect a pass at reception</li>
              <li className="flex gap-3"><Icon name="clock" size={16} className="mt-0.5 flex-none text-accent" />Visits by appointment, Mon–Fri</li>
            </ul>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=IIT+Madras+Research+Park,+Taramani,+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-[48px] items-center gap-2 self-start rounded-full bg-accent px-6 font-semibold text-ink hover:bg-accent hover:text-ink"
            >
              <Icon name="pin" size={16} /> Get directions
            </a>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-line">
            <iframe
              title="Map: YesPanchi at IIT Madras Research Park, Chennai"
              src="https://maps.google.com/maps?q=IIT+Madras+Research+Park,+Kanagam+Road,+Taramani,+Chennai+600113&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
            />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section aria-labelledby="contact-faq" className="py-20">
        <Container className="flex flex-wrap gap-12">
          <div className="flex-[1_1_320px]">
            <SectionHeading id="contact-faq" eyebrow="Before you write" title="Quick" accent="answers." />
          </div>
          <Faq items={contactFaqs} />
        </Container>
      </section>
    </>
  );
}
