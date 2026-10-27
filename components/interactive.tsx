'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { faqs, products, programs, readinessChecks, serviceAreas, gallery } from '@/lib/data';
import { Icon } from './Icon';

/* ---------- Services tabs (home) ---------- */
export function ServicesTabs() {
  const [i, setI] = useState(0);
  const s = serviceAreas[i];
  return (
    <div className="flex flex-wrap gap-6">
      <div role="tablist" aria-label="Service areas" className="flex min-w-0 flex-1 basis-[300px] flex-col gap-2.5">
        {serviceAreas.map((a, idx) => {
          const on = idx === i;
          return (
            <button
              key={a.name}
              role="tab"
              id={`svc-tab-${idx}`}
              aria-selected={on}
              aria-controls="svc-panel"
              onClick={() => setI(idx)}
              className={`flex min-h-[44px] items-center gap-4 rounded-2xl border px-5 py-5 text-left transition-colors ${on ? 'border-bronze bg-raised' : 'border-line hover:border-line3'}`}
            >
              <span className={`font-mono text-[13px] ${on ? 'text-bronze' : 'text-dim'}`}>0{idx + 1}</span>
              <span className="flex-1 text-xl font-semibold">{a.name}</span>
              <Icon name="arrow" size={18} className={on ? 'text-bronze' : 'text-dim'} />
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id="svc-panel" aria-labelledby={`svc-tab-${i}`} className="flex min-w-0 flex-[999_1_520px] flex-col gap-5 rounded-3xl border border-line bg-surface p-7 md:p-12">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze">{s.tag}</p>
        <h3 className="text-4xl font-bold leading-tight tracking-[-0.03em]">{s.name}</h3>
        <p className="max-w-xl text-lg text-muted">{s.desc}</p>
        <ul className="mt-2 grid gap-3 sm:grid-cols-2">
          {s.points.map((p) => (
            <li key={p} className="flex items-center gap-3 rounded-xl border border-line bg-ink px-4 py-3.5 font-medium">
              <Icon name="check" size={18} className="text-bronze" />
              {p}
            </li>
          ))}
        </ul>
        <Link href={s.href} className="mt-2 inline-flex self-start rounded-full bg-bronze px-6 py-3.5 font-semibold text-ink hover:bg-bronze-light hover:text-ink">Explore {s.name} →</Link>
      </div>
    </div>
  );
}

/* ---------- Product showcase (home) ---------- */
export function ProductShowcase() {
  const [i, setI] = useState(0);
  const p = products[i];
  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Products" className="flex flex-wrap gap-2">
        {products.map((x, idx) => (
          <button
            key={x.slug}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setI(idx)}
            className={`min-h-[44px] rounded-full border px-5 py-3 text-[15px] font-semibold transition-colors ${idx === i ? 'border-ink bg-ink text-cream' : 'border-[#D8CFC1] bg-white text-ink hover:border-ink'}`}
          >
            {x.name}
          </button>
        ))}
      </div>
      <article role="tabpanel" className="flex flex-wrap items-center gap-10 rounded-[28px] bg-ink p-7 text-cream md:p-14">
        <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-4">
          <span className="self-start rounded-full bg-bronze px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">{p.tag}</span>
          <h3 className="text-[clamp(2.2rem,4vw,3.25rem)] font-extrabold leading-none tracking-[-0.035em]">{p.name}</h3>
          <p className="max-w-xl text-lg font-light text-muted">{p.description}</p>
          <Link href={`/products/${p.slug}`} className="mt-2 inline-flex self-start rounded-full bg-bronze px-6 py-3.5 font-semibold text-ink hover:bg-bronze-light hover:text-ink">Explore {p.name} →</Link>
        </div>
        <div className="flex min-w-0 flex-1 basis-[300px] flex-col gap-1 rounded-2xl border border-line bg-surface p-6">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-dim">Built for</span>
          {p.builtFor.map((f) => (
            <div key={f} className="flex items-center gap-3 border-t border-line py-3 font-medium">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-bronze" />
              {f}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

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
    <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-3 rounded-3xl border border-line bg-surface p-6 md:p-10">
      {readinessChecks.map((label, idx) => {
        const on = checks[idx];
        return (
          <button
            key={label}
            aria-pressed={on}
            onClick={() => setChecks((c) => c.map((v, j) => (j === idx ? !v : v)))}
            className={`flex min-h-[44px] items-center gap-4 rounded-2xl border bg-ink px-4 py-4 text-left transition-colors ${on ? 'border-line3' : 'border-line hover:border-line2'}`}
          >
            <span aria-hidden="true" className={`flex h-6 w-6 flex-none items-center justify-center rounded-[7px] border-2 ${on ? 'border-bronze bg-bronze text-ink' : 'border-line3'}`}>
              {on && <Icon name="check" size={14} strokeWidth={3} />}
            </span>
            <span className="font-medium">{label}</span>
          </button>
        );
      })}
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-semibold">Readiness score</span>
          <span className="text-3xl font-extrabold text-bronze">{score}%</span>
        </div>
        <div role="progressbar" aria-label="Readiness score" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score} className="h-2.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-bronze transition-[width] duration-500" style={{ width: `${score}%` }} />
        </div>
        <p className="text-muted" aria-live="polite">{verdict}</p>
        <Link href={`/contact?topic=assessment&score=${score}`} className="mt-1 inline-flex self-start rounded-full bg-bronze px-6 py-3.5 font-semibold text-ink hover:bg-bronze-light hover:text-ink">Get my free assessment →</Link>
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
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-[44px] w-full items-center justify-between gap-4 py-6 text-left text-xl font-semibold"
              >
                <span>{f.q}</span>
                <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line2 text-xl text-bronze">{isOpen ? '−' : '+'}</span>
              </button>
            </h3>
            <div id={`faq-${i}`} hidden={!isOpen}>
              <p className="mb-6 max-w-2xl text-muted">{f.a}</p>
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
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
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
    <form onSubmit={submit} className="flex min-w-0 flex-1 basis-[340px] flex-col gap-2.5">
      <label htmlFor="nl-email" className="font-semibold">Security briefings, monthly</label>
      <div className="flex w-full items-center gap-1.5 rounded-full bg-ink p-1.5">
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
        <button type="submit" disabled={state === 'loading'} className="min-h-[44px] flex-none whitespace-nowrap rounded-full bg-cream px-5 py-3 font-semibold text-ink disabled:opacity-60">
          {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <span role="status" className="text-sm">{msg}</span>
    </form>
  );
}

/* ---------- Training catalogue with filters ---------- */
export function ProgramCatalogue() {
  const tracks = ['All', ...Array.from(new Set(programs.map((p) => p.track)))];
  const [track, setTrack] = useState('All');
  const [level, setLevel] = useState('All');
  const list = useMemo(() => programs.filter((p) => (track === 'All' || p.track === track) && (level === 'All' || p.level === level)), [track, level]);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by track">
        {tracks.map((t) => (
          <button key={t} aria-pressed={track === t} onClick={() => setTrack(t)} className={`min-h-[44px] rounded-full border px-4 py-2.5 text-sm font-semibold ${track === t ? 'border-bronze bg-bronze text-ink' : 'border-line2 hover:border-bronze'}`}>{t}</button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm text-muted">
          Level
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="min-h-[44px] rounded-full border border-line2 bg-surface px-4 text-cream">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((l) => <option key={l}>{l}</option>)}
          </select>
        </label>
      </div>
      <p className="text-sm text-dim" aria-live="polite">{list.length} programme{list.length === 1 ? '' : 's'}</p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={`/training/${p.slug}`} className="spotlight flex h-full flex-col gap-4 rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-bronze">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">{p.track}</span>
              <span className="text-2xl font-bold leading-tight tracking-[-0.02em] text-cream">{p.title}</span>
              <span className="text-muted">{p.summary}</span>
              <span className="mt-auto flex flex-wrap gap-2 pt-2 text-xs text-muted">
                <Chip>{p.level}</Chip><Chip>{p.duration}</Chip><Chip>{p.mode}</Chip>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line2 px-3 py-1">{children}</span>;
}

/* ---------- Gallery with lightbox ---------- */
export function GalleryGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const tones = ['#1F1C19', '#2A2622', '#3A332B', '#141210'];
  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {gallery.map((cap, i) => (
          <li key={cap}>
            <button onClick={() => setOpen(i)} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line text-left" style={{ background: tones[i % tones.length] }} aria-label={`Open photo: ${cap}`}>
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-bronze/60 transition-transform group-hover:scale-110"><Icon name="photo" size={44} /></span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 text-sm font-medium">{cap}</span>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={gallery[open]} className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6" onClick={() => setOpen(null)}>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex aspect-[16/10] items-center justify-center rounded-3xl border border-line2 bg-surface text-bronze/60"><Icon name="photo" size={72} /></div>
            <p className="mt-4 text-center text-lg">{gallery[open]} <span className="text-dim">— sample image placeholder</span></p>
            <div className="mt-4 flex justify-center gap-3">
              <button className="min-h-[44px] rounded-full border border-line2 px-5" onClick={() => setOpen((o) => (o! - 1 + gallery.length) % gallery.length)}>← Prev</button>
              <button className="min-h-[44px] rounded-full border border-line2 px-5" onClick={() => setOpen(null)}>Close</button>
              <button className="min-h-[44px] rounded-full border border-line2 px-5" onClick={() => setOpen((o) => (o! + 1) % gallery.length)}>Next →</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
