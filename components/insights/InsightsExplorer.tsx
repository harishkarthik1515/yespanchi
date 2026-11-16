'use client';

import { useState } from 'react';
import { insightItems, insightTypes, type InsightItem } from '@/lib/mock/insights';
import { formatDate } from '@/components/ui';
import { Icon } from '@/components/Icon';

const typeOf = (slug: string) => insightTypes.find((t) => t.slug === slug)!;

export function InsightCard({ item }: { item: InsightItem }) {
  const t = typeOf(item.type);
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-6">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        <Icon name={t.icon} size={16} />
        {t.title}
      </p>
      <h3 className="text-xl leading-snug">{item.title}</h3>
      <p className="text-[15px] text-muted">{item.excerpt}</p>
      <p className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
        <time dateTime={item.date} className="text-dim">{formatDate(item.date)}</time>
        <span className="font-medium text-accent">Coming soon</span>
      </p>
    </article>
  );
}

/* Search + type filter over every item. With nothing typed or picked it shows the 6 most recent. */
export function InsightsExplorer() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const terms = q.toLowerCase().trim();
  const filtered = insightItems.filter((i) =>
    (!type || i.type === type) && (!terms || `${i.title} ${i.excerpt} ${typeOf(i.type).title}`.toLowerCase().includes(terms))
  );
  const list = terms || type ? filtered : filtered.slice(0, 6);
  const chip = (on: boolean) => `min-h-[44px] whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors ${on ? 'border-accent bg-accent text-accent-contrast' : 'border-line2 text-muted hover:border-accent hover:text-accent'}`;

  return (
    <div className="flex flex-col gap-8">
      <label className="flex max-w-2xl items-center gap-3 rounded-full border border-line2 bg-ink px-5 focus-within:border-accent">
        <Icon name="search" size={20} className="flex-none text-dim" />
        <span className="sr-only">Search insights</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search white papers, reports, blogs…" className="min-h-[52px] w-full bg-transparent text-cream placeholder:text-dim focus:outline-none" />
      </label>
      <div role="group" aria-label="Filter by content type" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!type} onClick={() => setType('')} className={chip(!type)}>All</button>
        {insightTypes.map((t) => (
          <button key={t.slug} type="button" aria-pressed={type === t.slug} onClick={() => setType(t.slug)} className={chip(type === t.slug)}>{t.title}</button>
        ))}
      </div>
      <p className="text-sm text-dim" aria-live="polite">
        {terms || type ? `${list.length} result${list.length === 1 ? '' : 's'}` : 'Latest from Insights'}
      </p>
      {list.length ? (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((i) => <li key={i.title}><InsightCard item={i} /></li>)}
        </ul>
      ) : (
        <p className="rounded-2xl border border-line p-6 text-muted">Nothing matches that yet. Try another word or content type.</p>
      )}
    </div>
  );
}
