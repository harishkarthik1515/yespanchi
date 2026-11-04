'use client';

import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/lib/data';
import { IconTile } from '@/components/Icon';

type Filter = 'All' | string;

export function ProductExplorer() {
  const [filter, setFilter] = useState<Filter>('All');
  const categories = Array.from(new Set(products.map((p) => p.tag)));
  const list = products.filter((p) => filter === 'All' || p.tag === filter);
  const filters: Filter[] = ['All', ...categories];

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === 'All' ? products.length : products.filter((p) => p.tag === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors ${active ? 'border-bronze bg-bronze text-ink' : 'border-line2 text-muted hover:border-bronze hover:text-cream'}`}
            >
              {f}
              <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-ink/15' : 'bg-raised'}`}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} products shown</p>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/products/${p.slug}`}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-line bg-surface p-7 !text-cream transition-all hover:-translate-y-0.5 hover:border-bronze/60 hover:shadow-[0_24px_60px_-20px_rgba(26,21,23,0.16)]"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-bronze/10 blur-3xl transition-opacity group-hover:opacity-100 md:opacity-0" />
              <div className="relative flex items-start justify-between gap-3">
                <IconTile name={p.icon} size="lg" />
              </div>
              <span className="relative text-xs font-semibold uppercase tracking-[0.14em] text-bronze">{p.tag}</span>
              <h2 className="relative text-[26px] font-extrabold tracking-[-0.025em]">{p.name}</h2>
              <p className="relative text-muted">{p.description}</p>
              <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
                <span className="text-muted">{p.short}</span>
                <span className="font-semibold text-bronze group-hover:underline">Explore →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
