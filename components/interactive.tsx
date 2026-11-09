'use client';

import Link from 'next/link';
import { useState } from 'react';
import { faqs, readinessChecks } from '@/lib/data';
import { Icon } from './Icon';

/* ---------- Readiness self-check ---------- */
export function ReadinessCheck() {
  const [checks, setChecks] = useState<boolean[]>(readinessChecks.map(() => false));
  const n = checks.filter(Boolean).length;
  const score = Math.round((n / checks.length) * 100);
  const verdict =
    n <= 1 ? 'High exposure. A professional assessment should be your first step.'
    : n <= 3 ? 'Solid foundations, with gaps attackers look for. Let us map them.'
    : n === 4 ? 'Strong posture. A VAPT and PQ review will close the last mile.'
    : 'Excellent. Keep it that way with periodic audits and PQ-ready encryption.';

  return (
    <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-2.5 rounded-[26px] border border-line bg-surface/60 p-6 md:p-9">
      {readinessChecks.map((label, idx) => {
        const on = checks[idx];
        return (
          <button
            key={label}
            type="button"
            aria-pressed={on}
            onClick={() => setChecks((c) => c.map((v, j) => (j === idx ? !v : v)))}
            className={`flex min-h-[44px] items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
              on ? 'border-accent/50 bg-accent/[0.07]' : 'border-line bg-ink/50 hover:border-line2'
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-6 w-6 flex-none items-center justify-center rounded-[7px] border-2 transition-colors duration-300 ${
                on ? 'border-accent bg-accent text-accent-contrast' : 'border-line3'
              }`}
            >
              {on && <Icon name="check" size={14} strokeWidth={3} />}
            </span>
            <span className="font-medium">{label}</span>
          </button>
        );
      })}

      <div className="mt-4 flex flex-col gap-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-medium">Readiness score</span>
          <span className="text-[2.5rem] font-semibold leading-none tabular-nums text-accent">{score}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Readiness score"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={score}
          className="h-2.5 overflow-hidden rounded-full bg-cream/[0.07]"
        >
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${score}%`, background: 'linear-gradient(90deg, rgb(var(--c-accent) / .4), rgb(var(--c-accent)))' }}
          />
        </div>
        <p className="text-muted" aria-live="polite">{verdict}</p>
        <Link
          href={`/contact?topic=assessment&score=${score}`}
          className="group mt-2 inline-flex min-h-[52px] w-fit items-center gap-2.5 rounded-full bg-accent px-7 font-semibold text-accent-contrast transition-all duration-300 hover:text-accent-contrast hover:shadow-[0_0_40px_-8px_rgb(var(--c-accent)/.75)]"
        >
          Get my free assessment
          <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

/* ---------- FAQ accordion ---------- */
export function Faq({ items = faqs }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex min-w-0 flex-[999_1_600px] flex-col">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-t border-line last:border-b">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex min-h-[44px] w-full items-center justify-between gap-6 py-6 text-left text-xl font-medium transition-colors hover:text-accent"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen ? 'rotate-45 border-accent text-accent' : 'border-line2 text-dim group-hover:border-line3'
                  }`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-${i}`}
              className="grid transition-[grid-template-rows] duration-400 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="mb-6 max-w-[70ch] text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Newsletter ---------- */
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('No spam. Unsubscribe anytime.');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setState('done');
      setMsg('Thanks — you’re on the list.');
      setEmail('');
    } catch (err) {
      setState('error');
      setMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <form onSubmit={submit} className="flex min-w-0 flex-1 basis-[340px] flex-col gap-3">
      <label htmlFor="nl-email" className="font-medium">Security briefings, monthly</label>
      <div className="flex w-full items-center gap-1.5 rounded-full border border-line2 bg-ink/70 p-1.5 backdrop-blur transition-colors focus-within:border-accent">
        <input
          id="nl-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full min-w-0 flex-1 bg-transparent px-4 py-3 text-cream placeholder:text-dim focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="min-h-[44px] flex-none whitespace-nowrap rounded-full bg-accent px-5 font-semibold text-accent-contrast transition-opacity disabled:opacity-60"
        >
          {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <span role="status" className={`text-sm ${state === 'error' ? 'text-accent' : 'text-dim'}`}>{msg}</span>
    </form>
  );
}
