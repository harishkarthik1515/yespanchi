import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { benefits, hiringSteps, roles } from '@/lib/mock/careers';
import { absoluteUrl } from '@/lib/site';
import { Button, Container, PageHero } from '@/components/ui';
import { Icon } from '@/components/Icon';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const r = roles.find((x) => x.slug === params.slug);
  if (!r) return {};
  return { title: `${r.title} — Careers`, description: r.about, alternates: { canonical: `/careers/${r.slug}` } };
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-d3">{title}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3">
            <Icon name="check" size={18} className="mt-1 flex-none text-accent" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RolePage({ params }: Props) {
  const r = roles.find((x) => x.slug === params.slug);
  if (!r) notFound();
  const others = roles.filter((x) => x.slug !== r.slug).slice(0, 3);
  const apply = `/careers?role=${r.slug}#apply`;
  const share = `mailto:?subject=${encodeURIComponent(`${r.title} at YesPanchi`)}&body=${encodeURIComponent(absoluteUrl(`/careers/${r.slug}`))}`;

  return (
    <>
      <PageHero crumbs={[{ name: 'Careers', href: '/careers' }, { name: r.title, href: `/careers/${r.slug}` }]} eyebrow={r.team} title={r.title} lead={r.about}>
        <ul className="flex flex-wrap gap-2 text-sm" aria-label="Role details">
          {[r.location, r.type, r.experience].map((t) => <li key={t} className="rounded-full border border-line3 px-4 py-1.5">{t}</li>)}
        </ul>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href={apply}>Apply for this role</Button>
          <Button href={share} variant="outline" external>Share this role</Button>
        </div>
      </PageHero>

      <section className="py-20 md:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.4fr_.6fr]">
          <div className="flex flex-col gap-12">
            <List title="What you’ll do" items={r.doing} />
            <List title="What we’re looking for" items={r.lookingFor} />
            <List title="Nice to have" items={r.niceToHave} />
            <List title="What we offer" items={benefits} />
            <p className="text-sm text-dim">This role description is sample content.</p>
          </div>
          <aside className="flex h-fit flex-col gap-5 rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-xl">Hiring process</h2>
            <ol className="flex flex-col gap-4">
              {hiringSteps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-contrast">{i + 1}</span>
                  <span><span className="block font-semibold">{s.title}</span><span className="text-sm text-muted">{s.text}</span></span>
                </li>
              ))}
            </ol>
            <Button href={apply}>Apply now</Button>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="others" className="theme-light py-20 md:py-24">
        <Container className="flex flex-col gap-8">
          <h2 id="others" className="text-d3">Other open roles</h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/careers/${o.slug}`} className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-accent">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{o.team}</span>
                  <span className="text-xl font-semibold text-heading">{o.title}</span>
                  <span className="mt-auto text-sm text-muted">{o.location} · {o.type}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
