import type { Metadata } from 'next';
import { mockMous } from '@/lib/mock/events';
import { Container, CtaBand, formatDate, PageHero } from '@/components/ui';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'MoUs & Collaborations',
  description: 'Institutional, academic and research partnerships between YesPanchi and leading organisations.',
  alternates: { canonical: '/events/mous' }
};

export default function MousPage() {
  const counts = (['Academic', 'Research', 'Industry'] as const).map((k) => ({ k, n: mockMous.filter((m) => m.kind === k).length }));
  return (
    <>
      <PageHero crumbs={[{ name: 'Events', href: '/events' }, { name: 'MoUs & Collaborations', href: '/events/mous' }]} eyebrow="Partnerships" title="MoUs &" accent="collaborations." lead="Institutional and research tie-ups that build talent and advance secure technology across Tamil Nadu and beyond.">
        <dl className="mt-2 flex flex-wrap gap-3">
          {counts.map((c) => (
            <div key={c.k} className="flex items-baseline gap-2 rounded-full border border-line2 px-4 py-2">
              <dd className="text-xl font-medium text-accent">{c.n}</dd><dt className="text-sm text-muted">{c.k}</dt>
            </div>
          ))}
        </dl>
      </PageHero>
      <section aria-label="Partner list" className="theme-light py-16 md:py-20">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {mockMous.map((m) => (
              <li key={m.partner} className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-raised font-mono text-sm font-semibold text-accent">{m.short}</span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{m.kind} partner</span>
                    <h2 className="text-xl font-semibold leading-snug">{m.partner}</h2>
                    <span className="flex items-center gap-1.5 text-sm text-muted"><Icon name="pin" size={14} />{m.city}</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2 border-t border-line pt-4">
                  {m.scope.map((s) => <li key={s} className="flex items-start gap-2 text-[15px] text-muted"><Icon name="check" size={16} className="mt-1 flex-none text-accent" />{s}</li>)}
                </ul>
                <div className="mt-auto flex items-center justify-between text-sm">
                  <span className="text-dim">Signed <time dateTime={m.date}>{formatDate(m.date)}</time></span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${m.status === 'Active' ? 'bg-raised text-accent' : 'border border-line2 text-muted'}`}>{m.status}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-dim">Partner institutions shown are fictional sample placeholders.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
