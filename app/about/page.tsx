import type { Metadata } from 'next';
import { awards, stats, values } from '@/lib/data';
import { certifications, culture, leadership, milestones, testimonials } from '@/lib/mock/about';
import { Container, CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { SectionNav } from '@/components/SectionNav';
import { Icon } from '@/components/Icon';
import { Avatar } from '@/components/about/Avatar';

export const metadata: Metadata = {
  title: 'About Us — Enterprise AI, Quantum Security & Digital Trust',
  description: 'YesPanchi Tech Services is an innovation-driven technology enterprise headquartered at IIT Madras Research Park, Chennai, founded in 2021.',
  alternates: { canonical: '/about' }
};

const subnav = [
  { id: 'mission', label: 'Mission' },
  { id: 'journey', label: 'Journey' },
  { id: 'team', label: 'Leadership' },
  { id: 'values', label: 'Values' },
  { id: 'voices', label: 'Clients' },
  { id: 'awards', label: 'Recognition' }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About Us', href: '/about' }]}
        eyebrow="Innovation & digital trust"
        title="Architecting the future of enterprise AI,"
        accent="quantum security & digital trust."
        lead="YesPanchi Tech Services Pvt. Ltd. is an innovation-driven technology enterprise headquartered at IIT Madras Research Park, Chennai — specialising in AI platforms, cybersecurity, post-quantum cryptography and corporate governance."
      >
        <dl className="mt-4 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 bg-ink/80 p-5 backdrop-blur">
              <dt className="order-2 text-sm text-muted">{s.label}</dt>
              <dd className="order-1 text-3xl font-extrabold text-bronze">{s.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <SectionNav items={subnav} />

      {/* Mission — light band, bento */}
      <section aria-labelledby="mission" className="theme-light scroll-mt-16 bg-ink py-24 text-cream">
        <Container className="flex flex-col gap-12">
          <SectionHeading id="mission" eyebrow="Why we exist" title="Trust is infrastructure." accent="We build it." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {[
              { icon: 'eye' as const, title: 'Our Vision', text: 'To become a global leader in intelligent, secure and trusted digital technologies — empowering enterprises with cutting-edge AI, robust cybersecurity and post-quantum innovation.', span: 'sm:col-span-2 lg:col-span-6' },
              { icon: 'target' as const, title: 'Our Mission', text: 'To build intelligent, secure and future-ready digital ecosystems that let enterprises innovate confidently on secure AI and quantum-safe infrastructure.', span: 'sm:col-span-2 lg:col-span-6' }
            ].map((c) => (
              <article key={c.title} className={`flex flex-col gap-5 rounded-3xl border border-line bg-surface p-8 shadow-sm md:p-10 ${c.span}`}>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bronze/15 text-bronze"><Icon name={c.icon} size={26} /></span>
                <h3 className="text-3xl font-extrabold tracking-[-0.03em]">{c.title}</h3>
                <p className="text-lg text-muted">{c.text}</p>
              </article>
            ))}
            {culture.map((c) => (
              <div key={c.label} className="flex flex-col gap-1 rounded-3xl border border-line bg-raised p-6 lg:col-span-3">
                <span className="text-5xl font-extrabold leading-none tracking-tight text-bronze">{c.value}</span>
                <span className="mt-2 font-semibold">{c.label}</span>
                <span className="text-sm text-muted">{c.note}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-dim">Team and retention figures are sample content.</p>
        </Container>
      </section>

      {/* Journey — dark */}
      <section aria-labelledby="journey" className="scroll-mt-16 py-24">
        <Container className="flex flex-col gap-14">
          <SectionHeading id="journey" eyebrow="Our journey" title="From a Chennai start-up to" accent="quantum-ready products." />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative flex flex-col gap-3 rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-bronze">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-dim">0{i + 1}</span>
                  <span className="rounded-full border border-line2 px-3 py-1 text-xs font-semibold text-bronze-light">{m.metric}</span>
                </div>
                <p className="text-4xl font-extrabold tracking-tight text-bronze">{m.year}</p>
                <h3 className="text-xl font-bold">{m.title}</h3>
                <p className="text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-dim">Timeline milestones are sample content.</p>
        </Container>
      </section>

      {/* Leadership — light */}
      <section aria-labelledby="team" className="theme-light scroll-mt-16 bg-ink py-24 text-cream">
        <Container className="flex flex-col gap-12">
          <SectionHeading id="team" eyebrow="Leadership" title="The people behind" accent="the platform." lead="Practitioners first — auditors, red-teamers, cryptographers and educators." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((p) => (
              <li key={p.name} className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-7 shadow-sm">
                <div className="flex items-center gap-4">
                  <Avatar initials={p.initials} />
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="text-sm font-semibold text-bronze">{p.role}</p>
                  </div>
                </div>
                <p className="text-muted">{p.focus}</p>
                <p className="mt-auto border-t border-line pt-4 text-xs uppercase tracking-[0.14em] text-dim">With YesPanchi since {p.since}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dim">Team profiles are sample content.</p>
        </Container>
      </section>

      {/* Values — dark */}
      <section aria-labelledby="values" className="scroll-mt-16 py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading id="values" eyebrow="What drives us" title="Core values" lead="Four principles that shape every engagement, product and classroom." />
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.title} className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bronze font-bold text-ink">{i + 1}</span>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="text-muted">{v.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Testimonials — light */}
      <section aria-labelledby="voices" className="theme-light scroll-mt-16 bg-ink py-24 text-cream">
        <Container className="flex flex-col gap-12">
          <SectionHeading id="voices" eyebrow="Client voices" title="What our clients" accent="say." />
          <ul className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name}>
                <figure className="flex h-full flex-col gap-6 rounded-3xl border border-line bg-surface p-8 shadow-sm">
                  <span aria-hidden="true" className="text-6xl font-extrabold leading-none text-bronze">“</span>
                  <blockquote className="-mt-6 text-lg">{t.quote}</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <Avatar initials={t.initials} size="sm" />
                    <span className="flex flex-col"><span className="font-semibold">{t.name}</span><span className="text-sm text-muted">{t.role}</span></span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="text-sm text-dim">Testimonials are sample content.</p>
        </Container>
      </section>

      {/* Recognition & certifications — dark */}
      <section aria-labelledby="awards" className="scroll-mt-16 py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading id="awards" eyebrow="Recognition" title="Awards, certifications" accent="& partners." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((a) => (
              <li key={a.title + a.year} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-6">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-raised text-bronze"><Icon name="shield" size={22} /></span>
                <span className="flex flex-col gap-1"><span className="font-semibold">{a.title}</span><span className="text-sm text-dim">{a.by} · {a.year}</span></span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Certifications & memberships</h3>
            <ul className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-center gap-2 rounded-full border border-line2 bg-surface px-4 py-2 text-sm font-medium">
                  <span className="text-bronze"><Icon name="check" size={16} /></span>{c}
                </li>
              ))}
            </ul>
            <p className="text-sm text-dim">Certification list is sample content.</p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
