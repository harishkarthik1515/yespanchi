'use client';

import Link from 'next/link';
import { useState } from 'react';
import { programs } from '@/lib/data';
import { courseMock, formatINR, formatShortDate } from '@/lib/mock/training';
import { SeatsBadge } from './bits';

const uniq = (xs: string[]) => ['All', ...Array.from(new Set(xs))];

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="flex min-w-0 flex-1 basis-40 flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-dim">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="min-h-[44px] w-full rounded-xl border border-line2 bg-surface px-3 text-sm font-medium normal-case tracking-normal text-cream focus:border-accent">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function CourseCatalogue() {
  const [track, setTrack] = useState('All');
  const [level, setLevel] = useState('All');
  const [mode, setMode] = useState('All');
  const list = programs.filter((p) => (track === 'All' || p.track === track) && (level === 'All' || p.level === level) && (mode === 'All' || p.mode === mode));
  const reset = () => { setTrack('All'); setLevel('All'); setMode('All'); };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end gap-3 rounded-3xl border border-line bg-surface/60 p-4 sm:p-5">
        <Select label="Track" value={track} options={uniq(programs.map((p) => p.track))} onChange={setTrack} />
        <Select label="Level" value={level} options={['All', 'Beginner', 'Intermediate', 'Advanced']} onChange={setLevel} />
        <Select label="Mode" value={mode} options={uniq(programs.map((p) => p.mode))} onChange={setMode} />
        <button type="button" onClick={reset} className="min-h-[44px] rounded-xl px-4 text-sm font-semibold text-accent hover:underline">Reset</button>
      </div>
      <p aria-live="polite" className="text-sm text-dim">{list.length} of {programs.length} programmes</p>

      {list.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-line2 p-10 text-center text-muted">No programmes match these filters. <button type="button" onClick={reset} className="font-semibold text-accent underline">Clear filters</button></p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const c = courseMock[p.slug];
            const next = c?.cohorts[0];
            return (
              <li key={p.slug}>
                <Link href={`/training/${p.slug}`} className="group flex h-full flex-col gap-4 rounded-3xl border border-line bg-surface p-7 !text-cream transition-all hover:-translate-y-0.5 hover:border-accent/60">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-accent/15 px-2.5 py-1 text-accent">{p.track}</span>
                    <span className="rounded-full border border-line2 px-2.5 py-1 text-muted">{p.level}</span>
                  </div>
                  <h3 className="text-2xl font-medium">{p.title}</h3>
                  <p className="text-muted">{p.summary}</p>
                  <dl className="grid grid-cols-3 gap-2 text-sm">
                    <div><dt className="text-xs text-dim">Duration</dt><dd className="font-semibold">{p.duration}</dd></div>
                    <div><dt className="text-xs text-dim">Mode</dt><dd className="font-semibold">{p.mode}</dd></div>
                    {c && <div><dt className="text-xs text-dim">Rating</dt><dd className="font-semibold"><span className="text-accent" aria-hidden="true">★ </span>{c.rating}</dd></div>}
                  </dl>
                  {c && next && (
                    <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="text-muted">Next: <span className="font-semibold text-cream">{formatShortDate(next.start)}</span></span>
                        <SeatsBadge left={next.seatsLeft} />
                      </div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xl font-medium">{formatINR(c.earlyBird ?? c.fee)}{c.earlyBird && <span className="ml-2 text-sm font-normal text-dim line-through">{formatINR(c.fee)}</span>}</span>
                        <span className="text-sm font-semibold text-accent group-hover:underline">Details →</span>
                      </div>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
