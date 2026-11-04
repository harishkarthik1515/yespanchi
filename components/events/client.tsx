'use client';

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
            className={`min-h-[44px] rounded-full px-5 text-sm font-semibold transition-colors ${tab === t.id ? 'bg-bronze text-ink' : 'text-muted hover:text-cream'}`}
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
    <a href={href ?? '#'} download={`${slug}.ics`} aria-disabled={!href} className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line3 px-6 py-3 font-semibold text-cream transition-colors hover:border-bronze hover:text-bronze-light ${className}`}>
      <Icon name="cal" size={18} /> Add to calendar
    </a>
  );
}

/* ---------- Masonry gallery with lightbox ---------- */
type Tile = { caption: string; event: string; date: string; tall?: boolean };

const PATTERNS = [
  'radial-gradient(circle at 20% 20%, rgba(230,57,80,.35), transparent 55%), linear-gradient(135deg,#3a2c1e,#14110e)',
  'repeating-linear-gradient(45deg, rgba(200,30,58,.16) 0 2px, transparent 2px 14px), linear-gradient(160deg,#2a231c,#0f0d0b)',
  'radial-gradient(circle at 80% 30%, rgba(200,30,58,.45), transparent 50%), radial-gradient(circle at 10% 90%, rgba(90,110,120,.35), transparent 50%), #17140f',
  'linear-gradient(120deg,#6b4f31 0%,#2b2119 45%,#121010 100%)',
  'radial-gradient(rgba(230,57,80,.22) 1.2px, transparent 1.3px) 0 0/16px 16px, linear-gradient(200deg,#2e2a26,#121110)',
  'conic-gradient(from 210deg at 70% 40%, #4a3a28, #1b1714, #3b3024, #1b1714)'
];

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
  const fmt = (iso: string) => new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((t, i) => (
          <li key={t.caption} className="mb-4 break-inside-avoid">
            <button onClick={() => setOpen(i)} aria-label={`Open: ${t.caption}`} className={`group relative block w-full overflow-hidden rounded-3xl border border-line text-left ${t.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
              <span aria-hidden="true" className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ background: PATTERNS[i % PATTERNS.length] }} />
              <span aria-hidden="true" className="absolute right-4 top-4 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[11px] text-[#FF6B81] backdrop-blur">{String(i + 1).padStart(2, '0')}</span>
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-12">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF6B81]">{t.event}</span>
                <span className="font-semibold leading-snug text-[#f2ede4]">{t.caption}</span>
                <span className="text-xs text-[#b5ada2]">{fmt(t.date)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={items[open].caption} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-6" onClick={() => setOpen(null)}>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[16/10] rounded-3xl border border-white/10" style={{ background: PATTERNS[open % PATTERNS.length] }} />
            <p className="mt-4 text-center text-lg text-[#f2ede4]">{items[open].caption} <span className="block text-sm text-[#b5ada2]">{items[open].event} · {fmt(items[open].date)} · sample placeholder</span></p>
            <div className="mt-4 flex justify-center gap-3 text-[#f2ede4]">
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
