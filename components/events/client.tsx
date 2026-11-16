'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/* ---------- Upcoming / past tabs ---------- */
export function EventTabs({ upcoming, past, upcomingCount, pastCount }: { upcoming: ReactNode; past: ReactNode; upcomingCount: number; pastCount: number }) {
  const [tab, setTab] = useState<'up' | 'past'>('up');
  const tabs = [
    { id: 'up' as const, label: 'Upcoming', count: upcomingCount },
    { id: 'past' as const, label: 'Past events', count: pastCount }
  ];
  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Filter events" className="inline-flex w-fit gap-1 rounded-full border border-line2 bg-surface p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`min-h-[44px] rounded-full px-5 text-sm font-semibold transition-colors ${tab === t.id ? 'bg-accent text-accent-contrast' : 'text-muted hover:text-cream'}`}
          >
            {t.label} <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${tab === t.id ? 'bg-ink/15' : 'bg-raised'}`}>{t.count}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>{tab === 'up' ? upcoming : past}</div>
    </div>
  );
}

/* ---------- Add to calendar (.ics) ---------- */
export function AddToCalendar({ title, date, endDate, start, end, location, description, slug, className = '' }: { title: string; date: string; endDate?: string; start: string; end: string; location: string; description: string; slug: string; className?: string }) {
  const [href, setHref] = useState<string | null>(null);
  useEffect(() => {
    const stamp = (d: string, t: string) => `${d.replace(/-/g, '')}T${t.replace(':', '')}00`;
    const esc = (s: string) => s.replace(/[,;\\]/g, (m) => `\\${m}`).replace(/\n/g, '\\n');
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//YesPanchi//Events//EN', 'BEGIN:VEVENT',
      `UID:${slug}@yespanchi`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
      `DTSTART;TZID=Asia/Kolkata:${stamp(date, start)}`,
      `DTEND;TZID=Asia/Kolkata:${stamp(endDate ?? date, end)}`,
      `SUMMARY:${esc(title)}`, `LOCATION:${esc(location)}`, `DESCRIPTION:${esc(description)}`,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    setHref(url);
    return () => URL.revokeObjectURL(url);
  }, [title, date, endDate, start, end, location, description, slug]);
  return (
    <a href={href ?? '#'} download={`${slug}.ics`} aria-disabled={!href} className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line3 px-6 py-3 font-semibold text-cream transition-colors hover:border-accent hover:text-accent ${className}`}>
      <Icon name="cal" size={18} /> Add to calendar
    </a>
  );
}

/* ---------- Photo gallery with lightbox ---------- */
/* Photos are pre-sized (public/gallery = large, public/gallery/thumbs = small) and served as-is. */
type Tile = { src: string; caption: string; event?: string };

export function MasonryGallery({ items }: { items: Tile[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const n = items.length;
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + n) % n)), [n]);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, go]);
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <li key={t.src}>
            <button onClick={() => setOpen(i)} aria-label={`Open: ${t.caption}`} className="theme-dark group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-ink text-left">
              <Image src={t.src.replace("/gallery/", "/gallery/thumbs/")} alt="" fill unoptimized loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-12">
                {t.event && <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{t.event}</span>}
                <span className="font-semibold leading-snug text-cream">{t.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={items[open].caption} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-6" onClick={() => setOpen(null)}>
          <div className="theme-dark relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[16/10]">
              <Image src={items[open].src} alt={items[open].caption} fill unoptimized priority className="object-contain" />
            </div>
            <p className="mt-4 text-center text-lg text-cream">{items[open].caption}</p>
            <div className="mt-4 flex justify-center gap-3 text-cream">
              <button className="min-h-[44px] rounded-full border border-white/20 px-5" onClick={() => go(-1)}>← Prev</button>
              <button autoFocus className="min-h-[44px] rounded-full border border-white/20 px-5" onClick={() => setOpen(null)}>Close</button>
              <button className="min-h-[44px] rounded-full border border-white/20 px-5" onClick={() => go(1)}>Next →</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
