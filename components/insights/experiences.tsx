'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { formatDate } from '@/components/ui';
import {
  architecture, architectureLinks, radar, radarQuads, radarRings, story, topics, typeOf,
  type InsightItem, type InsightType, type Topic
} from '@/lib/mock/insights';

/* React 18 only emits `inert` when given a string, but its types want a boolean. */
const INERT = { inert: '' } as object;
/* round SVG coordinates so server and client render identical strings */
const rd = (v: number) => Math.round(v * 100) / 100;
const chip = (on: boolean) =>
  `min-h-[40px] whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${on ? 'border-accent bg-accent text-accent-contrast' : 'border-line2 text-muted hover:border-accent hover:text-accent'}`;

/* ---------------- Reading Desk: saved items, per browser ---------------- */
const KEY = 'yp-reading-desk';
const readSaved = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setSaved(readSaved());
    sync();
    window.addEventListener('yp-saved', sync);
    return () => window.removeEventListener('yp-saved', sync);
  }, []);
  const toggle = (slug: string) => {
    const next = readSaved().includes(slug) ? readSaved().filter((s) => s !== slug) : [...readSaved(), slug];
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    window.dispatchEvent(new Event('yp-saved'));
  };
  return { saved, toggle };
}

export function SaveButton({ slug }: { slug: string }) {
  const { saved, toggle } = useSaved();
  const on = saved.includes(slug);
  return (
    <button type="button" onClick={() => toggle(slug)} aria-pressed={on} aria-label={on ? 'Remove from Reading Desk' : 'Save to Reading Desk'}
      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-colors ${on ? 'border-accent bg-accent text-accent-contrast' : 'border-line2 text-muted hover:border-accent hover:text-accent'}`}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z" /></svg>
    </button>
  );
}

/* ---------------- Card ---------------- */
export function InsightCard({ item, size = 'md' }: { item: InsightItem; size?: 'md' | 'lg' }) {
  const t = typeOf(item.type);
  return (
    <article className="group flex h-full flex-col gap-4">
      <Link href={`/insights/${item.type}/${item.slug}`} className={`relative block overflow-hidden rounded-lg bg-raised ${size === 'lg' ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}>
        <Image src={item.image} alt="" fill sizes={size === 'lg' ? '(min-width:1024px) 60vw, 100vw' : '(min-width:1024px) 30vw, 100vw'} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col gap-2.5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{t.title} · {item.topic}</p>
        <h3 className={`${size === 'lg' ? 'text-[clamp(1.6rem,2.4vw,2.2rem)]' : 'text-xl'} font-medium leading-snug`}>
          <Link href={`/insights/${item.type}/${item.slug}`} className="text-cream hover:text-accent">{item.title}</Link>
        </h3>
        <p className="text-[15px] text-muted">{item.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs uppercase tracking-[0.1em] text-dim">
          <span><time dateTime={item.date}>{formatDate(item.date)}</time> · {item.read} min read</span>
          <SaveButton slug={item.slug} />
        </div>
      </div>
    </article>
  );
}

/* ---------------- Explore by topic + Research Library ---------------- */
export function Library({ type, items }: { type?: InsightType['slug']; items: InsightItem[] }) {
  const [q, setQ] = useState('');
  const [topic, setTopic] = useState<Topic | ''>('');
  const [year, setYear] = useState('');
  const pool = type ? items.filter((i) => i.type === type) : items;
  const years = Array.from(new Set(pool.map((i) => i.date.slice(0, 4))));
  const terms = q.toLowerCase().trim();
  const list = pool.filter((i) =>
    (!topic || i.topic === topic) && (!year || i.date.startsWith(year)) &&
    (!terms || `${i.title} ${i.excerpt} ${i.topic} ${typeOf(i.type).title}`.toLowerCase().includes(terms))
  );
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-w-0 flex-1 basis-80 items-center gap-3 rounded-full border border-line2 bg-ink px-5 focus-within:border-accent">
          <Icon name="search" size={20} className="flex-none text-dim" />
          <span className="sr-only">Search the library</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={type ? `Search ${typeOf(type).title.toLowerCase()}…` : "Search papers, issues, posts and case studies…"} className="min-h-[50px] w-full bg-transparent text-cream placeholder:text-dim focus:outline-none" />
        </label>
        {years.length > 1 && (
          <label className="flex items-center gap-2 text-sm text-muted">
            Year
            <select value={year} onChange={(e) => setYear(e.target.value)} className="min-h-[50px] rounded-full border border-line2 bg-ink px-4 text-cream">
              <option value="">All</option>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </label>
        )}
      </div>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!topic} onClick={() => setTopic('')} className={chip(!topic)}>All topics</button>
        {topics.map((t) => {
          const n = pool.filter((i) => i.topic === t).length;
          return n ? <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)} className={chip(topic === t)}>{t} <span className="opacity-70">({n})</span></button> : null;
        })}
      </div>
      <p className="text-sm text-dim" aria-live="polite">{list.length} result{list.length === 1 ? '' : 's'}</p>
      {list.length ? (
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {list.map((i) => <li key={i.slug}><InsightCard item={i} /></li>)}
        </ul>
      ) : (
        <p className="rounded-xl border border-line p-6 text-muted">Nothing matches yet. Try another word, topic or year.</p>
      )}
    </div>
  );
}

/* ---------------- Reading Desk ---------------- */
export function ReadingDesk({ items: all }: { items: InsightItem[] }) {
  const { saved, toggle } = useSaved();
  const items = all.filter((i) => saved.includes(i.slug));
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-line bg-surface p-7">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent"><Icon name="list" size={16} /> Reading Desk</p>
      <h3 className="text-2xl font-medium">Your saved reading</h3>
      {items.length ? (
        <ul className="flex flex-col divide-y divide-line">
          {items.map((i) => (
            <li key={i.slug} className="flex items-center justify-between gap-4 py-3">
              <Link href={`/insights/${i.type}/${i.slug}`} className="min-w-0 text-[15px] text-cream hover:text-accent">
                <span className="block truncate">{i.title}</span>
                <span className="text-xs text-dim">{typeOf(i.type).title} · {i.read} min</span>
              </Link>
              <button type="button" onClick={() => toggle(i.slug)} className="flex-none text-sm text-dim hover:text-accent">Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Tap the bookmark on any article to keep it here. Saved items stay in this browser.</p>
      )}
    </div>
  );
}

/* ---------------- Ask Insights: keyword search phrased as a question ---------------- */
const SUGGESTIONS = ['How do I start a PQC migration?', 'What does DPDP mean for AI?', 'How should VAPT findings be reported?'];
export function AskInsights({ items }: { items: InsightItem[] }) {
  const [q, setQ] = useState('');
  const [asked, setAsked] = useState('');
  const results = useMemo(() => {
    // shortcut: keyword scoring, not an AI model; swap for a real retrieval endpoint when content is live
    const words = asked.toLowerCase().split(/\W+/).filter((w) => w.length > 2 && !['how', 'what', 'the', 'does', 'should', 'for', 'and', 'mean'].includes(w));
    if (!words.length) return [];
    return items
      .map((i) => ({ i, score: words.filter((w) => `${i.title} ${i.excerpt} ${i.topic}`.toLowerCase().includes(w)).length }))
      .filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map((r) => r.i);
  }, [asked, items]);
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-line bg-surface p-7">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent"><Icon name="search" size={16} /> Ask Insights</p>
      <h3 className="text-2xl font-medium">Ask a question, get our best reading</h3>
      <form onSubmit={(e) => { e.preventDefault(); setAsked(q); }} className="flex gap-2">
        <label className="sr-only" htmlFor="ask">Your question</label>
        <input id="ask" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. How do I start a PQC migration?" className="min-h-[48px] min-w-0 flex-1 rounded-full border border-line2 bg-ink px-5 text-cream placeholder:text-dim focus:border-accent focus:outline-none" />
        <button type="submit" className="min-h-[48px] rounded-full bg-accent px-5 font-semibold text-accent-contrast">Ask</button>
      </form>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => <button key={s} type="button" onClick={() => { setQ(s); setAsked(s); }} className="rounded-full bg-raised px-3 py-1.5 text-xs text-muted hover:text-accent">{s}</button>)}
      </div>
      <div aria-live="polite">
        {asked && (results.length ? (
          <ul className="flex flex-col gap-2">
            {results.map((i) => (
              <li key={i.slug}><Link href={`/insights/${i.type}/${i.slug}`} className="flex items-center justify-between gap-3 rounded-lg border border-line p-3 text-[15px] hover:border-accent"><span>{i.title}</span><Icon name="arrow" size={16} className="flex-none text-accent" /></Link></li>
            ))}
          </ul>
        ) : <p className="text-muted">No direct match yet, <Link href="/contact?topic=other" className="text-accent underline">ask our experts</Link>.</p>)}
      </div>
    </div>
  );
}

/* ---------------- Technology Radar ---------------- */
export function TechRadar() {
  const [sel, setSel] = useState<string>('Hybrid PQ-TLS');
  const R = 200;
  const ringR = (ring: string) => ((radarRings.indexOf(ring as never) + 0.5) / radarRings.length) * R;
  const pts = radar.map((b, n) => {
    const same = radar.filter((x) => x.quad === b.quad && x.ring === b.ring);
    const k = same.indexOf(b as never);
    const a = (b.quad * 90 + 18 + ((k + 1) * 54) / (same.length + 1)) * (Math.PI / 180);
    const r = ringR(b.ring);
    return { ...b, n, x: rd(R + r * Math.cos(a)), y: rd(R - r * Math.sin(a)) };
  });
  const cur = pts.find((p) => p.name === sel)!;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,460px)_1fr]">
      <svg viewBox={`-10 -10 ${2 * R + 20} ${2 * R + 20}`} className="w-full" role="img" aria-label="Technology radar">
        {radarRings.map((r, k) => (
          <circle key={r} cx={R} cy={R} r={((k + 1) / radarRings.length) * R} fill={`rgb(var(--c-accent) / ${0.1 - k * 0.022})`} stroke="rgb(var(--c-line2))" />
        ))}
        <line x1={0} y1={R} x2={2 * R} y2={R} stroke="rgb(var(--c-line2))" />
        <line x1={R} y1={0} x2={R} y2={2 * R} stroke="rgb(var(--c-line2))" />
        {radarRings.map((r, k) => (
          <text key={r} x={R + 4} y={R - ((k + 0.5) / radarRings.length) * R + 4} fontSize="9" fill="rgb(var(--c-dim))">{r}</text>
        ))}
        {pts.map((p) => (
          <g key={p.name} role="button" tabIndex={0} aria-label={`${p.name}: ${p.ring}`} onClick={() => setSel(p.name)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(p.name)} className="cursor-pointer focus:outline-none">
            <circle cx={p.x} cy={p.y} r={p.name === sel ? 9 : 6} fill={p.name === sel ? 'rgb(var(--c-accent))' : 'rgb(var(--c-cream))'} stroke="rgb(var(--c-ink))" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-line bg-surface p-6" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{radarQuads[cur.quad]} · {cur.ring}</p>
          <p className="mt-2 text-2xl font-medium">{cur.name}</p>
          <p className="mt-2 text-muted">
            {cur.ring === 'Adopt' && 'Proven in our client work, we recommend it as the default today.'}
            {cur.ring === 'Trial' && 'Worth pursuing on a real project with clear success criteria.'}
            {cur.ring === 'Assess' && 'Promising; explore it to understand the impact on your organisation.'}
            {cur.ring === 'Hold' && 'Proceed with caution, better options exist or the risk is too high.'}
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {radarQuads.map((q, k) => (
            <div key={q}>
              <p className="mb-2 text-sm font-semibold text-cream">{q}</p>
              <ul className="flex flex-wrap gap-1.5">
                {pts.filter((p) => p.quad === k).map((p) => (
                  <li key={p.name}><button type="button" onClick={() => setSel(p.name)} className={`rounded-full px-3 py-1 text-xs ${p.name === sel ? 'bg-accent text-accent-contrast' : 'bg-raised text-muted hover:text-accent'}`}>{p.name}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Storytelling (newsletter) ---------------- */
export function Storytelling() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(refs.current.indexOf(e.target as HTMLLIElement))), { rootMargin: '-45% 0px -45% 0px' });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <div className="sticky top-28 aspect-[4/3] overflow-hidden rounded-xl">
          {story.chapters.map((c, n) => (
            <Image key={c.title} src={c.image} alt="" fill sizes="50vw" className={`object-cover transition-opacity duration-700 ${n === active ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">Chapter {active + 1} / {story.chapters.length}</span>
        </div>
      </div>
      <ol className="flex flex-col">
        {story.chapters.map((c, n) => (
          <li key={c.title} ref={(el) => { refs.current[n] = el; }} className={`flex min-h-[46vh] flex-col justify-center gap-3 border-l-2 pl-8 transition-colors ${n === active ? 'border-accent' : 'border-line'}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{c.title}</p>
            <p className={`text-2xl leading-snug transition-colors ${n === active ? 'text-cream' : 'text-dim'}`}>{c.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------- Topic Discovery (blogs) ---------------- */
/* All blogs in one grid, filterable by topic (defaults to every post). */
export function TopicDiscovery({ items }: { items: InsightItem[] }) {
  const posts = items.filter((i) => i.type === 'blogs');
  const used = topics.filter((t) => posts.some((p) => p.topic === t));
  const [t, setT] = useState<Topic | 'All'>('All');
  const shown = t === 'All' ? posts : posts.filter((p) => p.topic === t);
  return (
    <div className="flex flex-col gap-10">
      <div role="group" aria-label="Filter blogs by topic" className="flex flex-wrap gap-2">
        {(['All', ...used] as const).map((x) => (
          <button key={x} type="button" aria-pressed={t === x} onClick={() => setT(x)}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors ${t === x ? 'border-accent bg-accent text-accent-contrast' : 'border-line2 text-cream hover:border-accent hover:text-accent'}`}>
            {x === 'All' ? 'All topics' : x}
            <span className={`rounded-full px-2 py-0.5 text-xs ${t === x ? 'bg-white/20' : 'bg-raised text-muted'}`}>
              {x === 'All' ? posts.length : posts.filter((p) => p.topic === x).length}
            </span>
          </button>
        ))}
      </div>
      <ul aria-live="polite" className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => <li key={p.slug}><InsightCard item={p} /></li>)}
      </ul>
    </div>
  );
}

/* ---------------- Architecture Explorer (case studies) ---------------- */
export function ArchitectureExplorer() {
  const [sel, setSel] = useState(architecture[1].id);
  const cur = architecture.find((a) => a.id === sel)!;
  const at = (id: string) => architecture.find((a) => a.id === id)!;
  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="relative aspect-[16/9] rounded-xl border border-line bg-surface" style={{ backgroundImage: 'radial-gradient(rgb(var(--c-line2)) 1px, transparent 1px)', backgroundSize: '22px 22px' }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {architectureLinks.map(([a, b]) => (
            <line key={a + b} x1={at(a).x} y1={at(a).y} x2={at(b).x} y2={at(b).y} stroke={sel === a || sel === b ? 'rgb(var(--c-accent))' : 'rgb(var(--c-line3))'} strokeWidth={sel === a || sel === b ? 0.6 : 0.3} strokeDasharray="1.2 0.8" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {architecture.map((a) => (
          <button key={a.id} type="button" onClick={() => setSel(a.id)} aria-pressed={sel === a.id}
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-semibold shadow-md transition-colors sm:text-sm ${sel === a.id ? 'border-accent bg-accent text-accent-contrast' : 'border-line2 bg-ink text-cream hover:border-accent'}`}>
            {a.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-xl border border-line p-6" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Component</p>
        <p className="text-2xl font-medium">{cur.label}</p>
        <p className="text-muted">{cur.text}</p>
        <p className="mt-auto pt-4 text-sm text-dim">From: State department moves citizen portal to hybrid PQ-TLS (sample).</p>
      </div>
    </div>
  );
}
