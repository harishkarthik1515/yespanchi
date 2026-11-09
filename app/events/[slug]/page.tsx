import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockEvents } from '@/lib/mock/events';
import { absoluteUrl, SITE } from '@/lib/site';
import { Button, Container, CtaBand, formatDate, JsonLd, PageHero, SectionHeading } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { Avatar, DateBadge, EventCard, isUpcoming, priceLabel, SeatsBar } from '@/components/events/parts';
import { AddToCalendar } from '@/components/events/client';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return mockEvents.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const e = mockEvents.find((x) => x.slug === params.slug);
  if (!e) return {};
  return { title: `${e.title} — ${e.city}`, description: e.summary, alternates: { canonical: `/events/${e.slug}` } };
}

const kindStyle: Record<string, string> = {
  talk: 'Talk', panel: 'Panel', demo: 'Live demo', break: 'Break', workshop: 'Hands-on'
};

export default function EventPage({ params }: Props) {
  const e = mockEvents.find((x) => x.slug === params.slug);
  if (!e) notFound();
  const upcoming = isUpcoming(e);
  const online = e.city === 'Online';
  const soldOut = e.registered >= e.seats;
  const more = mockEvents.filter((x) => x.slug !== e.slug && isUpcoming(x)).slice(0, 3);
  return (
    <>
      <PageHero crumbs={[{ name: 'Events', href: '/events' }, { name: e.title, href: `/events/${e.slug}` }]} eyebrow={e.type} title={e.title} lead={e.summary}>
        <div className="mt-2 flex flex-wrap items-center gap-5">
          <DateBadge iso={e.date} size="lg" />
          <ul className="flex flex-col gap-2 text-muted">
            <li className="flex items-center gap-2"><Icon name="cal" size={16} className="text-accent" />{formatDate(e.date)}{e.endDate && ` – ${formatDate(e.endDate)}`}</li>
            <li className="flex items-center gap-2"><Icon name="clock" size={16} className="text-accent" />{e.start}–{e.end} IST</li>
            <li className="flex items-center gap-2"><Icon name="pin" size={16} className="text-accent" />{e.venue}{online ? '' : `, ${e.city}`}</li>
          </ul>
        </div>
      </PageHero>

      <section aria-labelledby="about-event" className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="flex min-w-0 flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h2 id="about-event" className="text-3xl font-medium">About this event</h2>
              <p className="text-lg text-muted">{e.description}</p>
              <ul className="flex flex-wrap gap-2 text-sm">{e.tags.map((t) => <li key={t} className="rounded-full border border-line2 px-3 py-1 text-muted">{t}</li>)}</ul>
            </div>

            {e.recap && (
              <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6"><dl className="grid grid-cols-3 gap-3 text-center">
                <div><dt className="text-sm text-dim">Attendees</dt><dd className="text-3xl font-medium text-accent">{e.recap.attendees.toLocaleString('en-IN')}</dd></div>
                <div><dt className="text-sm text-dim">Sessions</dt><dd className="text-3xl font-medium text-accent">{e.recap.sessions}</dd></div>
                <div><dt className="text-sm text-dim">Avg. rating</dt><dd className="text-3xl font-medium text-accent">{e.recap.rating}</dd></div>
              </dl><p className="border-t border-line pt-4 text-muted">{e.recap.highlight}</p></div>
            )}

            <div className="flex flex-col gap-8">
              <SectionHeading id="agenda" eyebrow="Programme" title="Agenda" />
              <ol className="relative flex flex-col gap-1 border-l border-line2 pl-6 sm:pl-8">
                {e.agenda.map((a, i) => (
                  <li key={a.time + a.title + i} className="relative grid gap-1 py-4 sm:grid-cols-[80px_1fr] sm:gap-6">
                    <span aria-hidden="true" className={`absolute -left-[31px] top-6 h-3 w-3 rounded-full border-2 sm:-left-[39px] ${a.kind === 'break' ? 'border-line3 bg-ink' : 'border-accent bg-accent'}`} />
                    <time className="font-mono text-sm text-accent">{a.time}</time>
                    <div className={`flex flex-col gap-1 ${a.kind === 'break' ? 'text-dim' : ''}`}>
                      <span className="flex flex-wrap items-center gap-2">
                        <span className={`text-lg font-semibold ${a.kind === 'break' ? 'text-muted' : 'text-cream'}`}>{a.title}</span>
                        {a.kind && a.kind !== 'break' && <span className="rounded-full bg-raised px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">{kindStyle[a.kind]}</span>}
                      </span>
                      {a.speaker && <span className="text-sm text-muted">{a.speaker}</span>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside aria-label="Tickets and venue" className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-5 rounded-3xl border border-line2 bg-surface p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-dim">{e.price === 0 ? 'Entry' : 'Delegate pass'}</span>
                <span className="text-3xl font-medium">{priceLabel(e.price)}</span>
              </div>
              {e.price > 0 && <p className="-mt-3 text-xs text-dim">Incl. GST · student passes at 50% with valid ID</p>}
              {upcoming ? (
                <>
                  <SeatsBar seats={e.seats} registered={e.registered} />
                  <Button href={`/contact?topic=event&item=${encodeURIComponent(e.title)}`} className="w-full">{soldOut ? 'Join waitlist' : 'Register now'}</Button>
                  <AddToCalendar className="w-full" title={e.title} date={e.date} endDate={e.endDate} start={e.start} end={e.end} location={`${e.venue}, ${e.address}`} description={e.summary} slug={e.slug} />
                </>
              ) : (
                <span className="rounded-full border border-line2 px-5 py-3 text-center text-muted">This event has ended</span>
              )}
            </div>
            <div className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-dim">{online ? 'Where' : 'Venue'}</h2>
              <p className="font-semibold">{e.venue}</p>
              <p className="text-sm text-muted">{e.address}</p>
              {!online && <a className="text-sm font-semibold !text-accent underline underline-offset-4" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${e.venue} ${e.address}`)}`} target="_blank" rel="noopener noreferrer">Open in Maps ↗</a>}
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="speakers" className="theme-light py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="speakers" eyebrow="Line-up" title="Speakers" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {e.speakers.map((s) => (
              <li key={s.name} className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6">
                <Avatar name={s.name} size={64} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-lg font-semibold">{s.name}</span>
                  <span className="text-sm text-muted">{s.role}</span>
                  <span className="text-sm font-semibold text-accent">{s.org}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dim">Speakers are fictional sample profiles.</p>
        </Container>
      </section>

      {more.length > 0 && (
        <section aria-labelledby="more" className="py-20">
          <Container className="flex flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more" className="text-3xl font-medium">More upcoming events</h2>
              <Link href="/events" className="border-b border-accent py-2 font-semibold">All events →</Link>
            </div>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{more.map((x) => <li key={x.slug} className="min-w-0"><EventCard e={x} /></li>)}</ul>
          </Container>
        </section>
      )}
      <CtaBand />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: e.title,
          startDate: `${e.date}T${e.start}:00+05:30`,
          endDate: `${e.endDate ?? e.date}T${e.end}:00+05:30`,
          description: e.summary,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: online ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
          location: online ? { '@type': 'VirtualLocation', url: absoluteUrl(`/events/${e.slug}`) } : { '@type': 'Place', name: e.venue, address: { '@type': 'PostalAddress', streetAddress: e.address, addressLocality: e.city, addressCountry: 'IN' } },
          offers: { '@type': 'Offer', price: e.price, priceCurrency: 'INR', availability: soldOut ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock', url: absoluteUrl(`/events/${e.slug}`) },
          performer: e.speakers.map((s) => ({ '@type': 'Person', name: s.name })),
          organizer: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
          url: absoluteUrl(`/events/${e.slug}`)
        }}
      />
    </>
  );
}

// Re-evaluate upcoming/past daily
export const revalidate = 86400;
