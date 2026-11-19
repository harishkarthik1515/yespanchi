'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { flipbook } from '@/lib/mock/insights';
import { prefersReducedMotion } from '@/components/motion';

/* ------------------------------------------------------------------
 * White-paper flipbook shown inside a laptop. Scrolling into the
 * section opens the lid; the reader inside has a full toolbar
 * (thumbnails, contents, search, download, share, full screen, zoom,
 * first/last, page slider). Pages turn with the CSS 3D .book-* rules.
 * ------------------------------------------------------------------ */
type Page = (typeof flipbook.pages)[number];
const INERT = { inert: '' } as object; // React 18 only emits `inert` for a string value
const pages = flipbook.pages;
const LEAVES = Math.ceil((pages.length - 1) / 2);
const SPREADS = LEAVES + 1;
const hl = 'box-decoration-clone bg-[#7DB8E8] px-1.5 py-0.5 font-extrabold uppercase leading-[1.35] text-[#0F1F38]';

/* pages[0] is the left page of spread 0; spread s shows pages 2s and 2s+1 */
const spreadOf = (page: number) => Math.floor(page / 2);
const textOf = (p: Page) => [p.heading, 'body' in p ? (Array.isArray(p.body) ? p.body.join(' ') : p.body) : '', 'lede' in p ? p.lede : ''].join(' ');

function PageFace({ n, side }: { n: number; side: 'l' | 'r' }) {
  const p = pages[n];
  const round = `${side === 'l' ? 'rounded-l-[3px]' : 'rounded-r-[3px]'} shadow-[0_20px_50px_rgba(0,0,0,.5)]`;
  if (!p) return null;
  const folio = (
    <span className={`absolute bottom-3 text-[9px] text-[#6b7785] ${side === 'l' ? 'left-5' : 'right-5'}`}>{n + 1}</span>
  );

  if (p.kind === 'cover' || p.kind === 'stat') {
    return (
      <div className={`relative h-full overflow-hidden bg-[#0F1F38] ${round}`}>
        <Image src={p.image} alt="" fill sizes="460px" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F38] via-[#0F1F38]/40 to-transparent" />
        <div className="relative flex h-full flex-col justify-end gap-3 p-8 text-white">
          {p.kind === 'cover' ? (
            <>
              <span className="self-start bg-[#7DB8E8] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0F1F38]">White paper</span>
              <h3 className="text-[34px] font-bold leading-[1.05] text-white">{p.heading}</h3>
              <p className="text-[12px] text-white/80">{p.body}</p>
            </>
          ) : (
            <>
              <span className="text-[64px] font-bold leading-none"><span className={`${hl} normal-case`}>{p.heading}</span></span>
              <p className="max-w-[26ch] text-[15px] font-semibold leading-snug text-white">{p.body}</p>
            </>
          )}
        </div>
        {p.kind === 'stat' && folio}
      </div>
    );
  }

  if (p.kind === 'back') {
    return (
      <div className={`flex h-full flex-col items-start justify-center gap-4 bg-[#0F1F38] p-10 text-white ${round}`}>
        <Image src="/logo.png" alt="YesPanchi" width={1107} height={345} className="h-auto w-40 brightness-0 invert" />
        <p className="text-[20px] font-semibold"><span className={hl}>{p.heading}</span></p>
        <p className="text-[12px] leading-relaxed text-white/80">{p.body}</p>
      </div>
    );
  }

  return (
    <div className={`relative flex h-full flex-col gap-4 bg-white px-7 pb-8 pt-6 text-[#1b2430] ${round}`}>
      <span className="text-[9px] uppercase tracking-[0.14em] text-[#6b7785]">YesPanchi Research · Post-Quantum Payments</span>
      <h3 className="text-[22px] leading-tight"><span className={hl}>{p.heading}</span></h3>
      <p className="text-[13px] font-bold leading-snug">{p.lede}</p>
      <div className="columns-2 gap-5 text-[10.5px] leading-[1.6] text-[#2c3846]">
        {p.body.map((t) => <p key={t.slice(0, 16)} className="mb-2">{t}</p>)}
      </div>
      {p.pull && <p className="mt-auto border-l-4 border-[#7DB8E8] pl-3 text-[14px] font-bold leading-snug text-[#1F4E79]">"{p.pull}"</p>}
      {folio}
    </div>
  );
}

const ICONS: Record<string, string> = {
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  toc: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  search: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-4-4',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  share: 'M14 5l6 6-6 6M20 11H9a5 5 0 0 0-5 5v2',
  full: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  prev: 'M15 6l-6 6 6 6',
  next: 'M9 6l6 6-6 6',
  first: 'M17 6l-6 6 6 6M7 6v12',
  last: 'M7 6l6 6-6 6M17 6v12',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14'
};
const Svg = ({ d, s = 18 }: { d: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

function Reader() {
  const [i, setI] = useState(0); // spread index = turned leaves
  const [zoom, setZoom] = useState(1);
  const [panel, setPanel] = useState<'grid' | 'toc' | 'search' | null>(null);
  const [q, setQ] = useState('');
  const [note, setNote] = useState('');
  const screen = useRef<HTMLDivElement>(null);
  const go = (s: number) => { setI(Math.max(0, Math.min(SPREADS - 1, s))); setPanel(null); };
  const tool = 'flex h-9 w-9 items-center justify-center rounded text-white/90 transition-colors hover:bg-white/15 hover:text-white';
  const side = 'flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70 disabled:opacity-30';
  const hits = q.trim().length > 1 ? pages.map((p, n) => ({ p, n })).filter(({ p }) => textOf(p).toLowerCase().includes(q.toLowerCase())) : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!screen.current?.contains(document.activeElement) && document.fullscreenElement !== screen.current) return;
      if (e.key === 'ArrowRight') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const share = async () => {
    const url = `${location.origin}/insights/white-papers#flipbook`;
    try {
      if (navigator.share) await navigator.share({ title: flipbook.title, url });
      else { await navigator.clipboard.writeText(url); setNote('Link copied'); setTimeout(() => setNote(''), 1800); }
    } catch {}
  };

  return (
    <div ref={screen} tabIndex={-1} role="region" aria-label={`Flipbook: ${flipbook.title}`} className="relative h-full w-full overflow-hidden bg-[#0b1220] focus:outline-none">
      <Image src="/media/white-papers.jpg" alt="" fill sizes="1100px" className="scale-105 object-cover opacity-60 blur-[3px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />

      {/* toolbar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 bg-black/35 px-3 py-1.5 backdrop-blur">
        <p className="truncate text-[12px] font-medium text-white/85">{flipbook.title}</p>
        <div className="flex items-center">
          <button type="button" className={tool} aria-label="Thumbnails" aria-pressed={panel === 'grid'} onClick={() => setPanel(panel === 'grid' ? null : 'grid')}><Svg d={ICONS.grid} /></button>
          <button type="button" className={tool} aria-label="Contents" aria-pressed={panel === 'toc'} onClick={() => setPanel(panel === 'toc' ? null : 'toc')}><Svg d={ICONS.toc} /></button>
          <button type="button" className={tool} aria-label="Search" aria-pressed={panel === 'search'} onClick={() => setPanel(panel === 'search' ? null : 'search')}><Svg d={ICONS.search} /></button>
          <Link href={`/contact?topic=other&item=${encodeURIComponent('White paper PDF: ' + flipbook.title)}`} className={tool} aria-label="Request the PDF"><Svg d={ICONS.download} /></Link>
          <button type="button" className={tool} aria-label="Share" onClick={share}><Svg d={ICONS.share} /></button>
          <button type="button" className={tool} aria-label="Full screen" onClick={() => (document.fullscreenElement ? document.exitFullscreen() : screen.current?.requestFullscreen())}><Svg d={ICONS.full} /></button>
        </div>
      </div>
      {note && <p role="status" className="absolute right-3 top-12 z-30 rounded bg-black/75 px-3 py-1.5 text-xs text-white">{note}</p>}

      {/* panels */}
      {panel && (
        <div className="absolute right-3 top-12 z-30 max-h-[70%] w-72 overflow-y-auto rounded-lg bg-white p-3 text-[#1b2430] shadow-2xl">
          {panel === 'grid' && (
            <ul className="grid grid-cols-2 gap-2">
              {Array.from({ length: SPREADS }, (_, s) => (
                <li key={s}>
                  <button type="button" onClick={() => go(s)} className={`flex w-full flex-col items-center gap-1 rounded border p-1.5 text-[10px] ${s === i ? 'border-[#1F4E79] bg-[#eef4fa]' : 'border-[#dde5ee] hover:border-[#1F4E79]'}`}>
                    <span className="flex aspect-[2/1.3] w-full gap-px overflow-hidden rounded-sm bg-[#dde5ee]">
                      {[2 * s, 2 * s + 1].map((n) => <span key={n} className={`flex-1 p-1 text-left text-[7px] font-bold leading-tight ${pages[n] && pages[n].kind !== 'text' ? 'bg-[#0F1F38] text-white' : 'bg-white'}`}>{pages[n]?.heading}</span>)}
                    </span>
                    {pages[2 * s + 1] ? `Pages ${2 * s + 1}–${2 * s + 2}` : `Page ${2 * s + 1}`}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {panel === 'toc' && (
            <ol className="flex flex-col">
              {pages.map((p, n) => (
                <li key={n}><button type="button" onClick={() => go(spreadOf(n))} className="flex w-full justify-between gap-3 rounded px-2 py-2 text-left text-sm hover:bg-[#eef4fa]"><span>{p.heading}</span><span className="text-[#6b7785]">{n + 1}</span></button></li>
              ))}
            </ol>
          )}
          {panel === 'search' && (
            <div className="flex flex-col gap-2">
              <label className="sr-only" htmlFor="fb-search">Search this paper</label>
              <input id="fb-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search this paper…" className="rounded border border-[#c4d0de] px-3 py-2 text-sm focus:border-[#1F4E79] focus:outline-none" />
              <ul aria-live="polite">
                {q.trim().length > 1 && !hits.length && <li className="px-2 py-2 text-sm text-[#6b7785]">No matches</li>}
                {hits.map(({ p, n }) => (
                  <li key={n}><button type="button" onClick={() => go(spreadOf(n))} className="flex w-full justify-between rounded px-2 py-2 text-left text-sm hover:bg-[#eef4fa]"><span>{p.heading}</span><span className="text-[#6b7785]">p. {n + 1}</span></button></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* side controls */}
      <div className="absolute left-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2">
        <button type="button" className={side} onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous pages"><Svg d={ICONS.prev} /></button>
        <button type="button" className={side} onClick={() => go(0)} disabled={i === 0} aria-label="First page"><Svg d={ICONS.first} s={16} /></button>
      </div>
      <div className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2">
        <button type="button" className={side} onClick={() => go(i + 1)} disabled={i === SPREADS - 1} aria-label="Next pages"><Svg d={ICONS.next} /></button>
        <button type="button" className={side} onClick={() => go(SPREADS - 1)} disabled={i === SPREADS - 1} aria-label="Last page"><Svg d={ICONS.last} s={16} /></button>
      </div>
      <div className="absolute bottom-12 right-3 z-20 flex flex-col gap-2">
        <button type="button" className={side} onClick={() => setZoom(Math.min(1.6, zoom + 0.2))} aria-label="Zoom in"><Svg d={ICONS.plus} s={16} /></button>
        <button type="button" className={side} onClick={() => setZoom(Math.max(1, zoom - 0.2))} aria-label="Zoom out"><Svg d={ICONS.minus} s={16} /></button>
      </div>

      {/* book */}
      <div className={`absolute inset-x-0 bottom-11 top-12 ${zoom > 1 ? 'overflow-auto' : 'overflow-hidden'}`}>
        <div className="flex h-full items-center justify-center px-14 py-3 transition-transform duration-300" style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}>
          <div className="book relative aspect-[1.42] h-full max-w-full">
            <div className="absolute inset-y-0 left-0 w-1/2"><PageFace n={0} side="l" /></div>
            {Array.from({ length: LEAVES }, (_, k) => (
              <div key={k} className={`book-leaf ${k < i ? 'is-flipped' : ''}`} style={{ zIndex: k < i ? k + 1 : LEAVES - k }}>
                <div className="book-face" {...(k === i ? {} : INERT)}><PageFace n={2 * k + 1} side="r" /></div>
                <div className="book-face back" {...(k === i - 1 ? {} : INERT)}><PageFace n={2 * k + 2} side="l" /></div>
              </div>
            ))}
            {pages[2 * i + 1] && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-50 w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent" />}
          </div>
        </div>
      </div>

      {/* slider */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 bg-black/35 px-14 py-2.5 backdrop-blur">
        <label htmlFor="fb-slider" className="sr-only">Go to spread</label>
        <input id="fb-slider" type="range" min={0} max={SPREADS - 1} value={i} onChange={(e) => go(Number(e.target.value))} className="h-1 w-full cursor-pointer accent-[#7DB8E8]" />
        <span className="whitespace-nowrap text-[11px] text-white/80" aria-live="polite">{2 * i + 1}{pages[2 * i + 1] ? `–${2 * i + 2}` : ''} / {pages.length}</span>
      </div>
    </div>
  );
}

/* Laptop whose lid opens as the section scrolls into view. */
export function Flipbook() {
  const wrap = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) { setOpen(1); return; }
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section top reaches the bottom of the screen, 1 once it has scrolled 45% of a screen past the top
      const p = (vh - r.top) / (vh * 1.45);
      setOpen(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const ease = 1 - Math.pow(1 - open, 3);
  const angle = -90 * (1 - ease); // lid lies flat at -90°, upright at 0°
  const ready = ease > 0.9; // looks open from here, so it is usable from here

  return (
    <>
      {/* Desktop: laptop + spread */}
      <div ref={wrap} className="relative hidden h-[190vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="w-[min(1120px,88vw,calc((100vh-140px)*1.5))]" style={{ transform: `scale(${0.82 + 0.18 * ease})`, transition: 'transform 80ms linear' }}>
            <div style={{ perspective: '2600px', perspectiveOrigin: '50% 115%' }}>
              {/* lid */}
              <div className="relative mx-auto w-full" style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 100%', transform: `rotateX(${angle}deg)` }}>
                {/* screen side */}
                <div className="relative rounded-t-[22px] border-[3px] border-[#2a2a2e] bg-[#0b0b0d] p-[1.6%] pb-[2.2%] shadow-[0_0_0_1px_#5a5a60_inset]" style={{ backfaceVisibility: 'hidden' }}>
                  <span aria-hidden="true" className="absolute left-1/2 top-[0.6%] h-[1.1%] w-[1.1%] -translate-x-1/2 rounded-full bg-[#1d1d22] ring-1 ring-[#333]" />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-black" {...(ready ? {} : INERT)}>
                    <Reader />
                    {!ready && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: Math.max(0, 0.85 - ease) }} />}
                  </div>
                </div>
                {/* aluminium back of the lid */}
                <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center rounded-t-[22px] bg-gradient-to-b from-[#d9dadf] to-[#a9abb2]" style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}>
                  <Image src="/logo.png" alt="" width={1107} height={345} className="h-auto w-[18%] opacity-60 grayscale" />
                </div>
              </div>
            </div>
            {/* base */}
            <div aria-hidden="true" className="relative -mx-[6%] h-[18px] rounded-b-[18px] rounded-t-[2px] bg-gradient-to-b from-[#e3e4e8] via-[#b9bbc1] to-[#7d7f86] shadow-[0_24px_40px_-12px_rgba(0,0,0,.45)]">
              <span className="absolute left-1/2 top-0 h-[7px] w-[14%] -translate-x-1/2 rounded-b-[10px] bg-[#9a9ca3]" />
            </div>
            <p className={`mt-6 text-center text-sm text-dim transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}>Use the arrows, slider or toolbar to turn pages · ← → keys work too</p>
          </div>
        </div>
      </div>

      {/* Phones and tablets: the reader on its own */}
      <div className="aspect-[3/4] overflow-hidden rounded-xl sm:aspect-[4/3] lg:hidden"><Reader /></div>
    </>
  );
}
