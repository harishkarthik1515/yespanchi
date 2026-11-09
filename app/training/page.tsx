import type { Metadata } from 'next';
import Link from 'next/link';
import { programs, trainingTopics } from '@/lib/data';
import { courseMock, formatShortDate, instructors, outcomeStats, testimonials } from '@/lib/mock/training';
import { Container, CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { CourseCatalogue } from '@/components/training/CourseCatalogue';
import { Avatar, InstructorCard, SeatsBadge } from '@/components/training/bits';

export const metadata: Metadata = {
  title: 'Training — AI, Cybersecurity, Quantum & Blockchain Programmes',
  description: 'Practical training for students, professionals and enterprises in AI, cybersecurity, quantum technologies, blockchain, digital investigation and secure development.',
  alternates: { canonical: '/training' }
};

export default function TrainingPage() {
  const upcoming = programs
    .flatMap((p) => (courseMock[p.slug]?.cohorts ?? []).map((c) => ({ ...c, p })))
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 6);

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Training', href: '/training' }]}
        eyebrow="Learning for students, professionals & enterprises"
        title="Learning. Innovation."
        accent="Workforce transformation."
        lead="A unified training ecosystem with practical skills in AI, cybersecurity, quantum technologies, blockchain and digital innovation."
      >
        <dl className="mt-2 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {outcomeStats.map((s) => (
            <div key={s.label} className="flex flex-col rounded-2xl border border-line bg-surface/70 p-4 backdrop-blur">
              <dt className="order-2 text-xs text-dim">{s.label}</dt>
              <dd className="text-2xl font-medium text-cream">{s.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>
      <div className="overflow-hidden border-b border-raised py-5">
        <ul className="marquee flex w-max animate-marquee gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          {[...trainingTopics, ...trainingTopics].map((t, i) => <li key={i} aria-hidden={i >= trainingTopics.length}>{t} <span className="ml-10 text-accent">•</span></li>)}
        </ul>
      </div>

      <section aria-labelledby="catalogue" className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="catalogue" eyebrow="Course catalogue" title="Find your next" accent="programme." lead="Live, instructor-led cohorts with hands-on labs. Filter by track, level and mode." />
          <CourseCatalogue />
        </Container>
      </section>

      <section aria-labelledby="cohorts" className="theme-light bg-ink py-20 text-cream md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="cohorts" eyebrow="Calendar" title="Upcoming" accent="cohorts." lead="Seats are capped so every learner gets lab time and instructor attention." />
          <ul className="flex flex-col divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
            {upcoming.map((c) => {
              const d = new Date(c.start + 'T00:00:00');
              return (
                <li key={c.p.slug + c.start}>
                  <Link href={`/training/${c.p.slug}`} className="flex flex-wrap items-center gap-x-6 gap-y-3 p-5 !text-cream hover:bg-raised/60 sm:p-6">
                    <span className="flex w-16 flex-none flex-col items-center rounded-2xl bg-ink py-2 text-center">
                      <span className="text-xs font-semibold uppercase text-accent">{d.toLocaleDateString('en-IN', { month: 'short' })}</span>
                      <span className="text-2xl font-medium leading-none">{d.getDate()}</span>
                      <span className="text-[10px] text-dim">{d.getFullYear()}</span>
                    </span>
                    <span className="min-w-0 flex-1 basis-56">
                      <span className="block font-semibold sm:text-lg">{c.p.title}</span>
                      <span className="block text-sm text-muted">{c.schedule} · {c.location}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <SeatsBadge left={c.seatsLeft} />
                      <span className="hidden text-sm text-dim md:inline">until {formatShortDate(c.end)}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="faculty" className="py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="faculty" eyebrow="Faculty" title="Learn from" accent="practitioners." lead="Every instructor still does the work — pentests, forensics cases, crypto migrations and board advisory." />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {instructors.map((i) => <li key={i.id}><InstructorCard i={i} /></li>)}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="voices" className="theme-light bg-ink py-20 text-cream md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="voices" eyebrow="Learner stories" title="What alumni" accent="say." />
          <ul className="grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <li key={t.name}>
                <figure className="flex h-full flex-col gap-6 rounded-3xl border border-line bg-surface p-7">
                  <p aria-label="Rated 5 out of 5" className="text-accent">★★★★★</p>
                  <blockquote className="text-lg leading-relaxed">“{t.text}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <Avatar name={t.name} />
                    <span className="min-w-0"><span className="block font-semibold">{t.name}</span><span className="block text-sm text-dim">{t.role} · {t.course}</span></span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dim">Names, outcomes and figures on this page are sample content.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
