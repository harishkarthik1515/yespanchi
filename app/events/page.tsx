import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getEvents, getTalks } from '@/lib/cms';
import { Button, Container, PageHero } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { PillNav } from '@/components/home/kyndryl';
import { Highlights, TalkArchive } from '@/components/events/Talks';

export const metadata: Metadata = {
  title: { absolute: 'Events and Webinars | YesPanchi' },
  description: 'Conferences, campus talks, banking forums, webinars and TV appearances by the YesPanchi team on cybersecurity, payments, AI and digital safety.',
  alternates: { canonical: '/events' }
};

const SECTIONS = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'sessions', label: 'All sessions' },
  { id: 'speak', label: 'Invite us' }
];

const eyebrow = 'flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream';
const bar = <span aria-hidden="true" className="h-[3px] w-5 bg-accent" />;
const h2 = 'text-[clamp(2rem,3.2vw,3rem)] font-light leading-tight';

export default async function EventsPage() {
  const allTalks = await getTalks();
  const highlights = allTalks.filter((t) => t.highlight);
  const talks = allTalks.filter((t) => !t.highlight);
  const upcoming = await getEvents();
  const by = (k: string) => allTalks.filter((t) => t.kind === k).length;
  const stats = [
    { v: `${allTalks.length}+`, l: 'Talks, sessions and appearances' },
    { v: `${by('Campus')}+`, l: 'Universities and colleges' },
    { v: `${by('TV & media')}+`, l: 'TV, radio and press features' },
    { v: `${by('BFSI & industry') + by('Conferences')}+`, l: 'Industry forums and conferences' }
  ];
  return (
    <>
      <PageHero
        image="/gallery/isaca-conference-2025.jpg"
        crumbs={[{ name: 'Events', href: '/events' }]}
        eyebrow="Events & appearances"
        title="Sharing what we know,"
        accent="where it matters."
        lead="Conferences, campus talks, banking forums, webinars and TV appearances on cybersecurity, payment security, AI and digital safety, from Chennai to classrooms and living rooms across India."
      >
        <dl className="mt-6 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="flex flex-col gap-1.5 border-t border-white/30 pt-4">
              <dt className="order-2 text-sm text-white/75">{s.l}</dt>
              <dd className="order-1 text-[2.75rem] font-light leading-none text-white">{s.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <div className="relative">
        <PillNav items={upcoming.length ? [{ id: 'upcoming', label: 'Upcoming' }, ...SECTIONS] : SECTIONS} />

        {upcoming.length > 0 && (
          <section id="upcoming" aria-labelledby="upcoming-h" className="scroll-mt-32 pb-4 pt-28">
            <Container className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <p className={eyebrow}>Upcoming{bar}</p>
                <h2 id="upcoming-h" className={h2}>Join us <span className="text-accent">next</span></h2>
              </div>
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((e) => {
                  const d = new Date(e.date + 'T00:00:00');
                  return (
                    <li key={e.id ?? e.title} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                      {e.image && <span className="relative block aspect-[16/9]"><Image src={e.image} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" /></span>}
                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <p className="flex items-center gap-3 text-sm font-semibold text-accent">
                          <Icon name="cal" size={16} />
                          {d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}{e.time ? ` · ${e.time}` : ''}
                        </p>
                        <h3 className="text-xl font-medium leading-snug">{e.title}</h3>
                        <p className="flex items-center gap-2 text-sm text-muted"><Icon name="pin" size={14} className="text-accent" />{e.venue}</p>
                        <p className="text-[15px] text-muted">{e.summary}</p>
                        {e.link && <div className="mt-auto pt-2"><Button href={e.link} external>Register</Button></div>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </section>
        )}

        <section id="highlights" aria-labelledby="highlights-h" className="scroll-mt-32 pb-20 pt-28">
          <Container className="flex flex-col gap-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex flex-col gap-5">
                <p className={eyebrow}>Highlights{bar}</p>
                <h2 id="highlights-h" className={h2}>Moments on <span className="text-accent">the big stage</span></h2>
              </div>
              <p className="max-w-[42ch] text-muted">Open any event to browse its photos.</p>
            </div>
            <Highlights items={highlights} />
          </Container>
        </section>

        <section id="sessions" aria-labelledby="sessions-h" className="scroll-mt-32 bg-surface py-24">
          <Container className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <p className={eyebrow}>All sessions{bar}</p>
              <h2 id="sessions-h" className={h2}>Talks, webinars <span className="text-accent">&amp; media</span></h2>
              <p className="max-w-[60ch] text-muted">{talks.length} more sessions across campuses, banking and industry forums, webinars, television and community events.</p>
            </div>
            <TalkArchive items={talks} />
          </Container>
        </section>

        <section id="speak" aria-labelledby="speak-h" className="scroll-mt-32 py-24">
          <Container className="grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="theme-dark relative flex flex-col justify-end gap-5 overflow-hidden rounded-2xl bg-[#0F1F38] p-8 md:p-12">
              <Image src="/gallery/digital-security-emerging-trends-and-increasing-threats-anna-university-6-jan-2024.jpg" alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover opacity-30" />
              <div className="relative flex flex-col gap-5">
                <h2 id="speak-h" className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-light leading-tight text-white">Invite our team to speak</h2>
                <p className="max-w-[46ch] text-white/80">Keynotes, panels, faculty programmes and awareness sessions on cybersecurity, payments, post-quantum security and responsible AI.</p>
                <div><Button href={`/contact?topic=other&item=${encodeURIComponent('Speaking request')}`}>Send a speaking request</Button></div>
              </div>
            </div>
            {[
              { href: '/events/mous', icon: 'hands' as const, t: 'MoUs & collaborations', d: 'Partnerships that move technology forward.', img: '/gallery/yespanchi-and-cyberfit-join-hands-to-provide-secure-data-erasure-services.jpg' },
              { href: '/events/gallery', icon: 'photo' as const, t: 'Photo gallery', d: 'Events, signings, awards and the people behind YesPanchi.', img: '/gallery/isaca-conference-2025-2.jpg' }
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-xl">
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <Image src={c.img} alt="" fill sizes="(min-width:1024px) 25vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 flex-col gap-2 p-6">
                  <span className="flex items-center gap-2 text-xl font-medium text-cream group-hover:text-accent"><Icon name={c.icon} size={20} className="text-accent" />{c.t}</span>
                  <span className="text-sm text-muted">{c.d}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-semibold text-cream group-hover:text-accent">Explore <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" /></span>
                </span>
              </Link>
            ))}
          </Container>
        </section>
      </div>
    </>
  );
}
