import Link from 'next/link';
import { caseStudies, insights, testimonials } from '@/lib/mock/home';
import { Container, formatDate, SectionHeading } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { Avatar } from '@/components/events/parts';

export function CaseStudies() {
  return (
    <section aria-labelledby="cases" className="theme-light py-24 md:py-28">
      <Container className="flex flex-col gap-12">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="cases" eyebrow="Results" title="Outcomes, not" accent="just reports." lead="A few recent engagements — anonymised, with the numbers our clients care about." />
          <Link href="/contact?topic=assessment" className="border-b border-bronze py-3 font-semibold">Discuss your project →</Link>
        </div>
        <ul className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((c, i) => (
            <li key={c.title} data-reveal style={{ ['--d' as string]: `${i * 100}ms` }} className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-7 shadow-[0_24px_60px_-40px_rgba(60,40,20,.45)]">
              <span className="w-fit rounded-full bg-raised px-3 py-1 text-xs font-semibold uppercase tracking-wider text-bronze">{c.sector}</span>
              <h3 className="text-[22px] font-bold leading-snug">{c.title}</h3>
              <p className="text-muted">{c.summary}</p>
              <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-line pt-5">
                {c.metrics.map((m) => (
                  <div key={m.l} className="flex min-w-0 flex-col gap-1">
                    <dd className="text-2xl font-extrabold leading-none tracking-[-0.03em] text-bronze">{m.v}</dd>
                    <dt className="text-xs leading-snug text-dim">{m.l}</dt>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        <p className="text-sm text-dim">Case studies are illustrative samples.</p>
      </Container>
    </section>
  );
}

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section aria-labelledby="voices" className="py-24 md:py-28">
      <Container className="flex flex-col gap-12">
        <div data-reveal><SectionHeading id="voices" eyebrow="Client voices" title="Trusted by teams who" accent="can’t afford to guess." /></div>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <figure data-reveal className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[28px] border border-line2 bg-gradient-to-br from-raised to-surface p-8 md:p-10">
            <span aria-hidden="true" className="absolute -right-2 -top-10 font-serif text-[200px] leading-none text-bronze/15">“</span>
            <blockquote className="relative text-[clamp(1.35rem,2.2vw,1.8rem)] font-semibold leading-snug tracking-[-0.01em]">“{lead.quote}”</blockquote>
            <Person t={lead} />
          </figure>
          <ul className="flex flex-col gap-5">
            {rest.map((t, i) => (
              <li key={t.name} data-reveal style={{ ['--d' as string]: `${i * 100}ms` }}>
                <figure className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-6">
                  <blockquote className="text-muted">“{t.quote}”</blockquote>
                  <Person t={t} small />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function Person({ t, small }: { t: (typeof testimonials)[number]; small?: boolean }) {
  return (
    <figcaption className="flex items-center gap-3">
      <Avatar name={t.name} size={small ? 40 : 52} />
      <span className="flex flex-col">
        <span className="font-semibold text-cream">{t.name}</span>
        <span className="text-sm text-dim">{t.role}, {t.org}</span>
      </span>
    </figcaption>
  );
}

const TILE = [
  'radial-gradient(circle at 80% 20%, rgba(176,141,99,.55), transparent 55%), linear-gradient(135deg,#2a231c,#121010)',
  'repeating-linear-gradient(135deg, rgba(176,141,99,.22) 0 2px, transparent 2px 12px), linear-gradient(160deg,#3a2c1e,#14110e)',
  'radial-gradient(rgba(226,201,163,.3) 1.2px, transparent 1.3px) 0 0/14px 14px, linear-gradient(200deg,#4a3a28,#171410)'
];

export function Insights() {
  return (
    <section aria-labelledby="insights" className="theme-light py-24 md:py-28">
      <Container className="flex flex-col gap-12">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="insights" eyebrow="Latest insights" title="Field notes from" accent="our team." />
          <Link href="/contact?topic=newsletter" className="border-b border-bronze py-3 font-semibold">Get these by email →</Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {insights.map((a, i) => (
            <li key={a.slug} data-reveal style={{ ['--d' as string]: `${i * 100}ms` }}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-shadow hover:shadow-[0_24px_60px_-35px_rgba(60,40,20,.5)]">
                <div aria-hidden="true" className="relative aspect-[16/9]" style={{ background: TILE[i % TILE.length] }}>
                  <span className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-[#e2c9a3] backdrop-blur">{a.tag}</span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="flex items-center gap-2 text-sm text-dim"><time dateTime={a.date}>{formatDate(a.date)}</time><span aria-hidden="true">·</span>{a.read} min read</p>
                  <h3 className="text-xl font-bold leading-snug">{a.title}</h3>
                  <p className="text-[15px] text-muted">{a.excerpt}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-semibold text-bronze">Coming soon <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" /></span>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="text-sm text-dim">Articles are sample placeholders.</p>
      </Container>
    </section>
  );
}
