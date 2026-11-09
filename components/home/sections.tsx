import Link from 'next/link';
import { caseStudies, insights, testimonials } from '@/lib/mock/home';
import { Container, formatDate } from '@/components/ui';
import { ArrowLink, Counter, MaskLines } from '@/components/motion';
import { Icon } from '@/components/Icon';
import { Avatar } from '@/components/events/parts';

export function CaseStudies() {
  return (
    <section aria-labelledby="cases" className="theme-light border-b border-line py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-[32ch] flex-col gap-5">
            <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Results</p>
            <MaskLines as="h2" id="cases" className="text-d2 font-medium" lines={[<>Outcomes,</>, <>not just reports.</>]} />
          </div>
          <ArrowLink href="/contact?topic=assessment" className="pb-2 text-cream">Discuss your project</ArrowLink>
        </div>

        <ul className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((c, i) => (
            <li key={c.title} data-reveal style={{ ['--d' as string]: `${i * 100}ms` }}>
              <article className="spotlight edge-glow flex h-full flex-col gap-5 rounded-[26px] border border-line bg-surface/70 p-7 transition-colors hover:border-line2">
                <span className="w-fit rounded-full border border-line2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {c.sector}
                </span>
                <h3 className="text-[21px] font-medium leading-snug">{c.title}</h3>
                <p className="text-muted">{c.summary}</p>
                <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-line pt-5">
                  {c.metrics.map((m) => (
                    <div key={m.l} className="flex min-w-0 flex-col gap-1.5">
                      <dd className="text-2xl font-semibold leading-none tracking-[-0.02em] text-accent">
                        <Counter value={m.v} />
                      </dd>
                      <dt className="text-xs leading-snug text-dim">{m.l}</dt>
                    </div>
                  ))}
                </dl>
              </article>
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
    <section aria-labelledby="voices" className="border-b border-line py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <div className="flex max-w-[34ch] flex-col gap-5">
          <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Client voices</p>
          <MaskLines as="h2" id="voices" className="text-d2 font-medium" lines={[<>Trusted by teams who</>, <>can’t afford to guess.</>]} />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <figure
            data-reveal
            className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[28px] border border-line bg-surface/70 p-8 md:p-11"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(70% 80% at 85% 10%, rgb(var(--c-accent) / .14), transparent 62%)' }}
            />
            <span aria-hidden="true" className="absolute -right-3 -top-12 font-serif text-[210px] leading-none text-accent/15">“</span>
            <blockquote className="relative text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-snug">
              “{lead.quote}”
            </blockquote>
            <Person t={lead} />
          </figure>

          <ul className="flex flex-col gap-5">
            {rest.map((t, i) => (
              <li key={t.name} data-reveal style={{ ['--d' as string]: `${i * 100}ms` }}>
                <figure className="spotlight flex flex-col gap-5 rounded-3xl border border-line bg-surface/60 p-6 transition-colors hover:border-line2">
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
    <figcaption className="relative flex items-center gap-3.5">
      <Avatar name={t.name} size={small ? 40 : 52} />
      <span className="flex flex-col">
        <span className="font-medium text-cream">{t.name}</span>
        <span className="text-sm text-dim">{t.role}, {t.org}</span>
      </span>
    </figcaption>
  );
}

/* Abstract cover art per insight — tinted to the live accent. */
const TILE = [
  'radial-gradient(circle at 78% 22%, rgb(var(--c-accent) / .5), transparent 56%), linear-gradient(140deg, #26181b, #121113)',
  'repeating-linear-gradient(135deg, rgb(var(--c-accent) / .2) 0 2px, transparent 2px 13px), linear-gradient(160deg, #221a1c, #111012)',
  'radial-gradient(rgb(var(--c-accent) / .32) 1.2px, transparent 1.4px) 0 0/15px 15px, linear-gradient(200deg, #2a1d20, #121012)'
];

export function Insights() {
  return (
    <section aria-labelledby="insights" className="theme-light border-b border-line py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-[30ch] flex-col gap-5">
            <p data-reveal className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Latest insights</p>
            <MaskLines as="h2" id="insights" className="text-d2 font-medium" lines={[<>Field notes</>, <>from our team.</>]} />
          </div>
          <ArrowLink href="/contact?topic=newsletter" className="pb-2 text-cream">Get these by email</ArrowLink>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {insights.map((a, i) => (
            <li key={a.slug} data-reveal style={{ ['--d' as string]: `${i * 100}ms` }}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-surface/70 transition-colors hover:border-line2">
                <div aria-hidden="true" className="relative aspect-[16/9] overflow-hidden" style={{ background: TILE[i % TILE.length] }}>
                  <span className="absolute left-5 top-5 rounded-full border border-cream/20 bg-ink/50 px-3 py-1 text-xs font-medium text-accent backdrop-blur">
                    {a.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="flex items-center gap-2 text-sm text-dim">
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                    <span aria-hidden="true">·</span>
                    {a.read} min read
                  </p>
                  <h3 className="text-xl font-medium leading-snug">{a.title}</h3>
                  <p className="text-[15px] text-muted">{a.excerpt}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-medium text-accent">
                    Coming soon
                    <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
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
