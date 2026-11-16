'use client';

import Link from 'next/link';
import { useState } from 'react';
import { products, type Product } from '@/lib/data';
import { Icon, IconTile } from '@/components/Icon';

/* ------------------------------------------------------------------
 * ProductBook — an open book that explains one product per spread.
 * Each leaf is a sheet hinged on the spine: its front is a product's
 * right-hand page, its back is the NEXT product's left-hand page, so
 * turning a leaf reveals the next spread. Pure CSS 3D (see .book-*
 * in globals.css). Shown on wide screens only; the card grid covers
 * small screens.
 * ------------------------------------------------------------------ */
/* React 18 only emits `inert` when given a string, but its types want a boolean. */
const INERT = { inert: '' } as object;
const page = 'flex h-full flex-col gap-5 border border-line bg-ink p-10';

function Left({ p, n }: { p: Product; n: number }) {
  return (
    <div className={`${page} rounded-l-2xl`}>
      <div className="flex items-center justify-between">
        <IconTile name={p.icon} size="lg" />
        <span className="text-sm text-dim">{n} / {products.length}</span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{p.tag}</p>
      <h3 className="text-d3">{p.name}</h3>
      <p className="text-muted">{p.description}</p>
      <Link
        href={p.externalUrl ?? `/products/${p.slug}`}
        target={p.externalUrl ? '_blank' : undefined}
        rel={p.externalUrl ? 'noopener noreferrer' : undefined}
        className="group mt-auto inline-flex min-h-[48px] w-fit items-center gap-2.5 rounded-full bg-accent px-6 font-semibold text-accent-contrast hover:text-accent-contrast hover:brightness-110"
      >
        {p.externalUrl ? 'Visit site' : `Explore ${p.name}`}
        <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function Right({ p }: { p: Product }) {
  return (
    <div className={`${page} rounded-r-2xl bg-surface`}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dim">{p.coreTechnologies ? 'Core technology' : 'Built for'}</p>
      <ul className="flex flex-col gap-3 text-[15px]">
        {(p.coreTechnologies ?? p.builtFor).slice(0, 4).map((c) => (
          <li key={c} className="flex items-start gap-3">
            <Icon name="check" size={17} className="mt-1 flex-none text-accent" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      {p.coreTechnologies && (
        <>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-dim">Built for</p>
          <ul className="flex flex-wrap gap-2 text-sm">
            {p.builtFor.map((b) => <li key={b} className="rounded-full border border-line2 px-3.5 py-1.5 text-muted">{b}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}

export function ProductBook() {
  const [i, setI] = useState(0); // index of the open spread = number of turned leaves
  const last = products.length - 1;
  const btn = 'flex h-12 w-12 items-center justify-center rounded-full border border-line2 text-cream transition-colors hover:border-accent hover:text-accent disabled:opacity-35 disabled:hover:border-line2 disabled:hover:text-cream';

  return (
    <div className="flex flex-col gap-6">
      <div className="book relative h-[520px] drop-shadow-xl">
        {/* Static left page of the first spread */}
        <div className="absolute inset-y-0 left-0 w-1/2"><Left p={products[0]} n={1} /></div>

        {products.map((p, k) => (
          <div
            key={p.slug}
            className={`book-leaf ${k < i ? 'is-flipped' : ''}`}
            /* Unturned leaves stack first-on-top; turned leaves stack last-on-top. */
            style={{ zIndex: k < i ? k + 1 : products.length - k }}
          >
            <div className="book-face" {...(k === i ? {} : INERT)}><Right p={p} /></div>
            <div className="book-face back" {...(k === i - 1 ? {} : INERT)}>
              {k < last && <Left p={products[k + 1]} n={k + 2} />}
            </div>
          </div>
        ))}
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px bg-line2" />
      </div>

      <div className="flex items-center justify-center gap-4">
        <button type="button" className={btn} onClick={() => setI(i - 1)} disabled={i === 0} aria-label="Previous product">
          <Icon name="arrow" className="rotate-180" />
        </button>
        <p className="min-w-[14ch] text-center font-semibold" aria-live="polite">{products[i].name}</p>
        <button type="button" className={btn} onClick={() => setI(i + 1)} disabled={i === last} aria-label="Next product">
          <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}
