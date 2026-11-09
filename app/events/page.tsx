import type { Metadata } from 'next';
import Link from 'next/link';
import { mockEvents } from '@/lib/mock/events';
import { Button, Container, CtaBand, PageHero } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { DateBadge, EventCard, isUpcoming, priceLabel, RecapCard, SeatsBar } from '@/components/events/parts';
import { EventTabs } from '@/components/events/client';

export const metadata: Metadata = {
  title: 'Events & Conferences',
  description: 'Upcoming and past YesPanchi summits, webinars and workshops on cybersecurity, post-quantum security and AI governance.',
  alternates: { canonical: '/events' }
};

export default function EventsPage() {
  const upcoming = mockEvents.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date));
  const past = mockEvents.filter((e) => !isUpcoming(e)).sort((a, b) => b.date.localeCompare(a.date));
  const featured = upcoming.find((e) => e.featured) ?? upcoming[0];
  const totalAttendees = past.reduce((s, e) => s + (e.recap?.attendees ?? 0), 0);
  return (
    <>
      <PageHero crumbs={[{ name: 'Events', href: '/events' }]} eyebrow="Events & highlights" title="Conferences, workshops" accent="& community." lead="Join our sessions on cybersecurity, post-quantum readiness and responsible AI — in Chennai, Bengaluru and online.">
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          <Link href="/events/mous" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line2 px-4 hover:border-accent"><Icon name="hands" size={16} className="text-accent" />MoUs &amp; Collaborations</Link>
          <Link href="/events/gallery" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line2 px-4 hover:border-accent"><Icon name="photo" size={16} className="text-accent" />Photo Gallery</Link>
        </div>
      </PageHero>

      {featured && (
        <section aria-labelledby="featured" className="theme-light py-16 md:py-20">
          <Container>
            <article className="relative grid overflow-hidden rounded-[32px] border border-line bg-surface lg:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-5 p-7 md:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#faf7f2]">Featured</span>
                  <span className="text-sm font-semibold uppercase tracking-wider text-accent">{featured.type}</span>
                </div>
                <h2 id="featured" className="text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.04]">{featured.title}</h2>
                <p className="max-w-xl text-lg text-muted">{featured.summary}</p>
                <ul className="flex flex-wrap gap-2 text-sm">{featured.tags.map((t) => <li key={t} className="rounded-full border border-line2 px-3 py-1 text-muted">{t}</li>)}</ul>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Button href={`/events/${featured.slug}`}>View agenda &amp; register</Button>
                </div>
              </div>
              <div className="flex flex-col gap-6 border-t border-line bg-raised p-7 md:p-10 lg:border-l lg:border-t-0">
                <div className="flex items-center gap-5">
                  <DateBadge iso={featured.date} size="lg" />
                  <ul className="flex min-w-0 flex-col gap-2 text-[15px]">
                    <li className="flex items-center gap-2"><Icon name="clock" size={16} className="text-accent" />{featured.start}–{featured.end} IST</li>
                    <li className="flex items-start gap-2"><Icon name="pin" size={16} className="mt-1 flex-none text-accent" />{featured.venue}</li>
                  </ul>
                </div>
                <SeatsBar seats={featured.seats} registered={featured.registered} />
                <div className="flex items-baseline justify-between border-t border-line2 pt-5">
                  <span className="text-sm text-dim">Delegate pass</span>
                  <span className="text-3xl font-medium">{priceLabel(featured.price)}</span>
                </div>
              </div>
            </article>
          </Container>
        </section>
      )}

      <section aria-labelledby="all-events" className="py-20">
        <Container className="flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="all-events" className="text-3xl font-medium">All events</h2>
            <p className="text-sm text-dim">{totalAttendees.toLocaleString('en-IN')}+ people attended our recent events</p>
          </div>
          <EventTabs
            upcomingCount={upcoming.length}
            pastCount={past.length}
            upcoming={upcoming.length === 0 ? <p className="text-muted">No upcoming events right now — check back soon.</p> : (
              <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{upcoming.map((e) => <li key={e.slug} className="min-w-0"><EventCard e={e} /></li>)}</ul>
            )}
            past={<ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{past.map((e) => <li key={e.slug} className="min-w-0"><RecapCard e={e} /></li>)}</ul>}
          />
          <p className="text-sm text-dim">Events, speakers and figures shown are sample content.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

// Re-evaluate upcoming/past daily
export const revalidate = 86400;
