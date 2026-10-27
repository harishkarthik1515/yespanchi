'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/lib/data';
import { productCategories, productMock, type ProductCategory } from '@/lib/mock/products';
import { IconTile } from '@/components/Icon';

type Filter = 'All' | ProductCategory;

export function ProductExplorer() {
  const [filter, setFilter] = useState<Filter>('All');
  const list = products.filter((p) => filter === 'All' || productMock[p.slug]?.category === filter);
  const filters: Filter[] = ['All', ...productCategories];

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === 'All' ? products.length : products.filter((p) => productMock[p.slug]?.category === f).length;
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

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {list.map((p, i) => {
          const m = productMock[p.slug];
          const big = filter === 'All' && i < 2;
          return (
            <li key={p.slug} className={big ? 'lg:col-span-3' : 'lg:col-span-2'}>
              <Link
                href={`/products/${p.slug}`}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-line bg-surface p-7 !text-cream transition-all hover:-translate-y-0.5 hover:border-bronze/60 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]"
              >
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-bronze/10 blur-3xl transition-opacity group-hover:opacity-100 md:opacity-0" />
                <div className="relative flex items-start justify-between gap-3">
                  {p.logo ? <Image src={p.logo} alt="" width={56} height={56} className="h-14 w-14 rounded-2xl object-cover" /> : <IconTile name={p.icon} size="lg" />}
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {p.isNew && <span className="rounded-full bg-bronze px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">New</span>}
                    {m && <span className="rounded-full border border-line2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{m.status}</span>}
                  </div>
                </div>
                <span className="relative text-xs font-semibold uppercase tracking-[0.14em] text-bronze">{m?.category ?? p.tag}</span>
                <h2 className="relative text-[26px] font-extrabold tracking-[-0.025em]">{p.name}</h2>
                <p className="relative text-muted">{p.description}</p>
                {big && m && (
                  <div className="relative grid grid-cols-3 gap-2" aria-hidden="true">
                    {m.preview.kpis.map((k) => (
                      <div key={k.label} className="rounded-xl border border-line bg-ink/40 p-3">
                        <p className="truncate text-[10px] uppercase tracking-wider text-dim">{k.label}</p>
                        <p className="mt-1 font-mono text-sm font-semibold">{k.value}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
                  {m && <span className="text-muted">From <span className="font-semibold text-cream">{m.startingAt}</span></span>}
                  <span className="font-semibold text-bronze group-hover:underline">Explore →</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
