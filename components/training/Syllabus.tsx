'use client';

import { useState } from 'react';
import type { Week } from '@/lib/mock/training';

export function Syllabus({ weeks, unit = 'Week' }: { weeks: Week[]; unit?: string }) {
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
  const all = open.length === weeks.length;
  return (
    <div className="flex flex-col gap-3">
      <button type="button" onClick={() => setOpen(all ? [] : weeks.map((_, i) => i))} className="min-h-[44px] self-end text-sm font-semibold text-accent hover:underline">
        {all ? 'Collapse all' : 'Expand all'}
      </button>
      {weeks.map((w, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={w.title} className={`rounded-2xl border bg-surface transition-colors ${isOpen ? 'border-accent/50' : 'border-line'}`}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`wk-${i}`} onClick={() => toggle(i)} className="flex min-h-[56px] w-full items-center gap-4 px-5 py-4 text-left">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-raised font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs uppercase tracking-[0.14em] text-dim">{unit} {i + 1}</span>
                  <span className="block font-semibold sm:text-lg">{w.title}</span>
                </span>
                <span aria-hidden="true" className={`text-xl text-accent transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
            </h3>
            <div id={`wk-${i}`} hidden={!isOpen} className="border-t border-line px-5 pb-5 pt-4">
              <ul className="flex flex-col gap-2 text-muted">
                {w.topics.map((t) => <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />{t}</li>)}
              </ul>
              <p className="mt-4 rounded-xl bg-raised px-4 py-3 text-sm"><span className="font-semibold text-accent">Lab · </span>{w.lab}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
