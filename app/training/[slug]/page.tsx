import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { programs } from '@/lib/data';
import { courseMock, formatINR, formatShortDate, instructors, testimonials } from '@/lib/mock/training';
import { absoluteUrl, SITE } from '@/lib/site';
import { Button, Container, CtaBand, JsonLd, PageHero, SectionHeading } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { Syllabus } from '@/components/training/Syllabus';
import { Avatar, CertificatePreview, InstructorCard, SeatsBadge } from '@/components/training/bits';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = programs.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: `${p.title} — ${p.track} Training`, description: p.summary, alternates: { canonical: `/training/${p.slug}` } };
}

export default function ProgramPage({ params }: Props) {
  const p = programs.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const c = courseMock[p.slug];
  const enrol = `/contact?topic=training&item=${encodeURIComponent(p.title)}`;
  const faculty = c ? instructors.filter((i) => c.instructors.includes(i.id)) : [];
  const story = testimonials.find((t) => t.course === p.title) ?? testimonials[0];
  const related = programs.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <PageHero crumbs={[{ name: 'Training', href: '/training' }, { name: p.title, href: `/training/${p.slug}` }]} eyebrow={p.track} title={p.title} lead={p.summary}>
        <dl className="mt-2 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[['Level', p.level], ['Duration', c ? `${p.duration} · ${c.hours} hrs` : p.duration], ['Mode', p.mode], ['For', p.audience]].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-line bg-surface p-4">
              <dt className="text-xs uppercase tracking-[0.14em] text-dim">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <Button href={enrol}>Enquire / enrol</Button>
          {c && <span className="text-sm text-muted"><span className="text-accent" aria-hidden="true">★</span> {c.rating}/5 from {c.learners.toLocaleString('en-IN')} learners</span>}
        </div>
      </PageHero>

      <section aria-labelledby="modules" className="py-20 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex min-w-0 flex-col gap-8">
            <SectionHeading id="modules" eyebrow="Curriculum" title="Syllabus" lead={c ? `${c.weeks.length} units, each ending in a hands-on lab.` : undefined} />
            {c ? (
              <Syllabus weeks={c.weeks} unit={p.duration.includes('day') ? 'Session' : 'Week'} />
            ) : (
              <ol className="flex flex-col">{p.modules.map((m, i) => <li key={m} className="flex gap-6 border-t border-line py-4"><span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>{m}</li>)}</ol>
            )}
          </div>

          {c && (
            <aside aria-labelledby="fees" className="flex min-w-0 flex-col gap-5 rounded-3xl border border-accent/40 bg-surface p-7 lg:sticky lg:top-28">
              <h2 id="fees" className="text-xs font-semibold uppercase tracking-[0.16em] text-dim">Programme fee</h2>
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-4xl font-medium">{formatINR(c.earlyBird ?? c.fee)}</span>
                {c.earlyBird && <span className="text-dim line-through">{formatINR(c.fee)}</span>}
              </p>
              {c.earlyBird && <p className="-mt-3 text-sm text-accent">Early-bird price · ends 15 days before start</p>}
              <p className="text-sm text-muted">+18% GST · {c.emi}</p>
              <ul className="flex flex-col gap-2 text-sm">
                {['Live instructor-led sessions', `${c.hours} hours incl. labs`, 'Recordings for 12 months', 'Verifiable digital certificate'].map((x) => (
                  <li key={x} className="flex gap-2.5"><span className="mt-0.5 text-accent"><Icon name="check" size={16} /></span>{x}</li>
                ))}
              </ul>
              <Button href={enrol}>Reserve a seat</Button>
              <p className="text-xs text-dim">Group discounts of 15% for 5+ learners from one organisation.</p>
            </aside>
          )}
        </Container>
      </section>

      {c && (
        <section aria-labelledby="dates" className="theme-light bg-ink py-20 text-cream md:py-24">
          <Container className="flex flex-col gap-10">
            <SectionHeading id="dates" eyebrow="Schedule" title="Upcoming" accent="cohorts." />
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {c.cohorts.map((k) => {
                const pct = Math.round(((k.seats - k.seatsLeft) / k.seats) * 100);
                return (
                  <li key={k.start} className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-semibold"><Icon name="cal" size={18} className="text-accent" />{formatShortDate(k.start)}</span>
                      <SeatsBadge left={k.seatsLeft} />
                    </div>
                    <p className="text-sm text-muted">to {formatShortDate(k.end)}</p>
                    <p className="flex gap-2 text-sm"><Icon name="clock" size={16} className="mt-0.5 flex-none text-dim" />{k.schedule}</p>
                    <p className="flex gap-2 text-sm"><Icon name="pin" size={16} className="mt-0.5 flex-none text-dim" />{k.location}</p>
                    <div>
                      <div className="h-2 overflow-hidden rounded-full bg-raised" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Seats filled">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-1.5 text-xs text-dim">{k.seats - k.seatsLeft} of {k.seats} seats filled</p>
                    </div>
                    <Button href={`${enrol}&cohort=${k.start}`} variant="outline" className="mt-auto">Book this cohort</Button>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      {c && (
        <section aria-labelledby="faculty" className="py-20 md:py-24">
          <Container className="grid gap-12 lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-8">
              <SectionHeading id="faculty" eyebrow="Your instructors" title="Taught by" accent="practitioners." />
              <ul className="grid gap-5">{faculty.map((i) => <li key={i.id}><InstructorCard i={i} /></li>)}</ul>
            </div>
            <div className="flex min-w-0 flex-col gap-8">
              <SectionHeading eyebrow="Outcomes" title="What you’ll be able to" accent="do." />
              <ul className="flex flex-col gap-3">
                {c.outcomes.map((o) => <li key={o} className="flex gap-3 rounded-2xl border border-line bg-surface p-4"><span className="text-accent"><Icon name="check" size={20} /></span>{o}</li>)}
              </ul>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-dim">Prerequisites</p>
                <ul className="flex flex-wrap gap-2">{c.prerequisites.map((x) => <li key={x} className="rounded-full bg-raised px-3 py-1.5 text-sm text-muted">{x}</li>)}</ul>
              </div>
              <figure className="flex flex-col gap-4 rounded-3xl border border-line bg-gradient-to-br from-raised to-surface p-7">
                <blockquote className="text-lg leading-relaxed">“{story.text}”</blockquote>
                <figcaption className="flex items-center gap-3"><Avatar name={story.name} /><span><span className="block font-semibold">{story.name}</span><span className="text-sm text-dim">{story.role}</span></span></figcaption>
              </figure>
            </div>
          </Container>
        </section>
      )}

      {c && (
        <section aria-labelledby="cert" className="theme-light bg-ink py-20 text-cream md:py-24">
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <SectionHeading id="cert" eyebrow="Credential" title="Earn a verifiable" accent="certificate." lead={`Complete the labs and capstone to earn “${c.certificate}”, with a QR-verifiable ID you can add to LinkedIn.`} />
            <CertificatePreview title={c.certificate} course={p.title} />
          </Container>
        </section>
      )}

      <section aria-labelledby="more" className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <h2 id="more" className="text-3xl font-medium">Other programmes</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {related.map((o) => (
              <li key={o.slug}>
                <Link href={`/training/${o.slug}`} className="group flex h-full flex-col gap-2 rounded-2xl border border-line bg-surface p-6 hover:border-accent">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{o.track}</span>
                  <span className="text-lg font-semibold">{o.title}</span>
                  <span className="text-sm text-dim">{o.level} · {o.duration} · {o.mode}</span>
                  {courseMock[o.slug] && <span className="mt-auto pt-2 text-sm font-semibold">{formatINR(courseMock[o.slug].fee)}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dim">Fees, dates, instructors and testimonials are sample content.</p>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Course', name: p.title, description: p.summary, url: absoluteUrl(`/training/${p.slug}`), provider: { '@type': 'Organization', name: SITE.legalName, sameAs: SITE.url } }} />
    </>
  );
}
