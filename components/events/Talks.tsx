'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { talkKinds, type Talk, type TalkKind } from '@/lib/talks';

/* One shared lightbox for highlights and archive: native <dialog>, arrow keys step through photos. */
function useLightbox() {
  const ref = useRef<HTMLDialogElement>(null);
  const [cur, setCur] = useState<{ t: Talk; i: number } | null>(null);
  const open = (t: Talk, i = 0) => { setCur({ t, i }); ref.current?.showModal(); };
  const step = (d: number) => setCur((c) => (c ? { t: c.t, i: (c.i + d + c.t.images.length) % c.t.images.length } : c));
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!ref.current?.open) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const dialog = (
    <dialog
      ref={ref}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-label={cur ? cur.t.title : 'Photo'}
      className="w-[min(1100px,calc(100vw-24px))] overflow-hidden rounded-2xl bg-[#0b1424] p-0 text-white shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {cur && (
        <div className="flex flex-col">
          <div className="relative h-[min(72vh,720px)] bg-black">
            <Image key={cur.t.images[cur.i]} src={cur.t.images[cur.i]} alt={`${cur.t.title}, photo ${cur.i + 1}`} fill sizes="1100px" className="object-contain" />
            {cur.t.images.length > 1 && (['prev', 'next'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => step(d === 'next' ? 1 : -1)}
                aria-label={d === 'next' ? 'Next photo' : 'Previous photo'}
                className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0F1F38] shadow-lg transition hover:bg-white ${d === 'next' ? 'right-4' : 'left-4'}`}
              >
                <Icon name="arrow" size={20} className={d === 'prev' ? 'rotate-180' : ''} />
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7DB8E8]">{cur.t.kind}{cur.t.year ? ` · ${cur.t.year}` : ''}</p>
              <p className="truncate text-lg font-medium">{cur.t.title}</p>
              <p className="text-sm text-white/70">{cur.t.host}</p>
            </div>
            <div className="flex items-center gap-4">
              {cur.t.images.length > 1 && <span className="font-mono text-sm text-white/70">{cur.i + 1} / {cur.t.images.length}</span>}
              <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 hover:bg-white/10">
                <Icon name="close" size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
  return { open, dialog };
}

export function Highlights({ items: highlights }: { items: Talk[] }) {
  const { open, dialog } = useLightbox();
  return (
    <>
      <ul className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px]">
        {highlights.map((t, n) => (
          <li key={t.title} className={n === 0 ? 'sm:col-span-2 sm:row-span-2' : n === 1 || n === 4 ? 'lg:col-span-2' : ''}>
            <button type="button" onClick={() => open(t)} className="theme-dark group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-xl bg-[#0F1F38] p-5 text-left">
              <Image src={t.images[0]} alt="" fill sizes={n === 0 ? '(min-width:1024px) 50vw, 100vw' : '(min-width:1024px) 25vw, 50vw'} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1424] via-[#0b1424]/50 to-transparent" />
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <Icon name="photo" size={14} /> {t.images.length}
              </span>
              <span className="relative flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7DB8E8]">{t.kind}{t.year ? ` · ${t.year}` : ''}</span>
                <span className={`font-medium leading-snug text-white ${n === 0 ? 'text-3xl' : 'text-lg'}`}>{t.title}</span>
                <span className="text-sm text-white/75">{t.host}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {dialog}
    </>
  );
}

export function TalkArchive({ items: talks }: { items: Talk[] }) {
  const { open, dialog } = useLightbox();
  const [kind, setKind] = useState<TalkKind | 'All'>('All');
  const [q, setQ] = useState('');
  const terms = q.toLowerCase().trim();
  const shown = talks.filter((t) => (kind === 'All' || t.kind === kind) && (!terms || `${t.title} ${t.host}`.toLowerCase().includes(terms)));
  const count = (k: TalkKind) => talks.filter((t) => t.kind === k).length;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label className="flex max-w-xl items-center gap-3 rounded-full border border-line2 bg-ink px-5 focus-within:border-accent">
          <Icon name="search" size={20} className="flex-none text-dim" />
          <span className="sr-only">Search talks</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by topic, institution or channel…" className="min-h-[50px] w-full bg-transparent text-cream placeholder:text-dim focus:outline-none" />
        </label>
        <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
          {(['All', ...talkKinds] as const).map((k) => (
            <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors ${kind === k ? 'border-accent bg-accent text-accent-contrast' : 'border-line2 text-cream hover:border-accent hover:text-accent'}`}>
              {k === 'All' ? 'All' : k}
              <span className={`rounded-full px-2 py-0.5 text-xs ${kind === k ? 'bg-white/20' : 'bg-raised text-muted'}`}>{k === 'All' ? talks.length : count(k)}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-dim" aria-live="polite">{shown.length} session{shown.length === 1 ? '' : 's'}</p>
      {shown.length ? (
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((t) => (
            <li key={t.title + t.host}>
              <button type="button" onClick={() => open(t)} className="group flex w-full flex-col gap-4 text-left">
                <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-raised ring-1 ring-line">
                  <Image src={t.images[0]} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span aria-hidden="true" className="absolute bottom-3 left-3 flex translate-y-1 items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View <Icon name="arrow" size={14} />
                  </span>
                </span>
                <span className="flex flex-col gap-1.5 border-l-[3px] border-accent pl-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{t.kind}{t.year ? ` · ${t.year}` : ''}</span>
                  <span className="text-lg font-medium leading-snug text-cream transition-colors group-hover:text-accent">{t.title}</span>
                  <span className="text-sm text-muted">{t.host}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-line p-6 text-muted">No sessions match yet. Try another word or type.</p>
      )}
      {dialog}
    </div>
  );
}
