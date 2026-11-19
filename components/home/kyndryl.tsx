'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/components/motion';
import { Icon } from '@/components/Icon';

/* ------------------------------------------------------------------
 * Home-page sections modelled on large enterprise sites: a sticky pill
 * sub-nav, a recognition accordion, a customer-story carousel and an
 * expert-voices carousel.
 * ------------------------------------------------------------------ */

/* Sticky pill nav that tracks the section in view. Sits under the header (reads --hdr-offset). */
export function PillNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0].id);
  useEffect(() => {
    // active = the last section whose top has scrolled above 35% of the screen
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let cur = items[0].id;
      for (const i of items) {
        const el = document.getElementById(i.id);
        if (el && el.getBoundingClientRect().top <= line) cur = i.id;
      }
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [items]);
  return (
    <nav aria-label="On this page" className="pointer-events-none sticky z-40 flex h-0 items-start justify-center transition-[top] duration-300" style={{ top: 'var(--hdr-offset, 88px)' }}>
      <ul className="pointer-events-auto mx-3 mt-6 flex max-w-[calc(100vw-24px)] gap-1 overflow-x-auto rounded-full border border-line bg-ink/95 p-1.5 shadow-lg backdrop-blur [scrollbar-width:none]">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? 'true' : undefined}
              className={`flex min-h-[40px] items-center whitespace-nowrap rounded-full px-4 text-sm transition-colors ${active === i.id ? 'bg-cream font-semibold text-ink' : 'text-muted hover:text-cream'}`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* "We are YesPanchi" panel: brand colour block that plays the film on Watch. */
export function BrandFilm() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div className="theme-dark relative isolate flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-[#1F4E79]">
      {playing ? (
        <video ref={ref} src="/media/hero-defence.mp4" poster="/media/hero-defence.jpg" autoPlay controls playsInline className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <p className="text-[clamp(2.5rem,5.5vw,5rem)] font-light tracking-[-0.02em] text-white">We are YesPanchi</p>
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute bottom-8 left-8 min-h-[52px] border-2 border-white px-6 font-semibold text-white transition-colors hover:bg-white hover:text-[#1F4E79]"
          >
            Watch
          </button>
        </>
      )}
    </div>
  );
}

/* Industry recognition: one wide panel open, the rest as numbered strips. */
export function Recognition({ items }: { items: { title: string; by: string; year: string }[] }) {
  const [i, setI] = useState(0);
  const shades = ['#1F4E79', '#1a4369', '#143657', '#0e2a45'];
  const go = (d: number) => setI((i + d + items.length) % items.length);
  return (
    <div className="grid overflow-hidden rounded-2xl md:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)]">
      <div className="flex flex-col justify-between gap-10 bg-surface p-10 md:p-12">
        <h2 className="text-[clamp(2.25rem,3.6vw,3.5rem)] font-light leading-[1.05]">
          Industry recognition.<br /><span className="text-accent">Customer trust.</span>
        </h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous award" className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-cream hover:bg-raised">‹</button>
          <button type="button" onClick={() => go(1)} aria-label="Next award" className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-cream hover:bg-raised">›</button>
        </div>
      </div>
      <ul className="flex min-h-[380px] flex-col md:flex-row">
        {items.map((a, n) => (
          <li key={a.title} style={{ background: shades[n % shades.length] }} className={`theme-dark relative transition-[flex-grow] duration-500 ${n === i ? 'grow-[8]' : 'grow'} basis-0`}>
            <button type="button" onClick={() => setI(n)} aria-expanded={n === i} aria-label={`${String(n + 1).padStart(2, '0')}: ${a.title}`} className="flex h-full w-full flex-col items-start p-5 text-left">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">{String(n + 1).padStart(2, '0')}</span>
              {n === i && (
                <span className="mt-6 flex flex-1 animate-[heroIn_.6s_ease-out] flex-col justify-between gap-8 px-2 md:px-12">
                  <span className="max-w-[18ch] text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-tight text-white">{a.title}</span>
                  <span className="text-lg text-white/80">{a.by} · {a.year}</span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Customer stories: full-width image slides with a Highlights overlay and progress bars. */
type Story = { sector: string; title: string; summary: string; image: string; href: string; metrics: { v: string; l: string }[] };
const STORY_MS = 8000;
export function Stories({ items }: { items: Story[] }) {
  const [i, setI] = useState(0);
  const [hl, setHl] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (prefersReducedMotion()) setPaused(true); }, []);
  useEffect(() => {
    if (paused || hl) return;
    const t = setTimeout(() => setI((n) => (n + 1) % items.length), STORY_MS);
    return () => clearTimeout(t);
  }, [i, paused, hl, items.length]);
  const s = items[i];
  return (
    <div className="flex flex-col gap-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(prefersReducedMotion())}>
      <div className="theme-dark relative isolate flex min-h-[560px] items-center overflow-hidden md:min-h-[680px]">
        {items.map((x, n) => (
          <Image key={x.title} src={x.image} alt="" fill sizes="100vw" className={`-z-10 object-cover transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1424]/90 via-[#0b1424]/55 to-transparent" />
        <div className="mx-auto w-full max-w-wide px-6 md:px-16">
          {hl ? (
            <div className="flex max-w-xl animate-[heroIn_.5s_ease-out] flex-col gap-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Highlights</p>
              <dl className="grid gap-6 sm:grid-cols-3">
                {s.metrics.map((m) => (
                  <div key={m.l} className="border-t-2 border-white/70 pt-3">
                    <dd className="text-4xl font-light text-white">{m.v}</dd>
                    <dt className="mt-1 text-sm text-white/75">{m.l}</dt>
                  </div>
                ))}
              </dl>
              <button type="button" onClick={() => setHl(false)} className="min-h-[48px] self-start border border-white px-5 font-semibold text-white hover:bg-white hover:text-black">Back to story</button>
            </div>
          ) : (
            <div key={i} className="flex max-w-xl animate-[heroIn_.6s_ease-out] flex-col gap-6">
              <p className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">{s.sector}<span aria-hidden="true" className="h-[3px] w-5 bg-[#7DB8E8]" /></p>
              <h3 className="text-[clamp(1.9rem,3vw,2.75rem)] font-light leading-tight text-white">{s.title}</h3>
              <div className="flex flex-wrap gap-4">
                <button type="button" onClick={() => setHl(true)} className="min-h-[48px] border border-white px-5 font-semibold text-white transition-colors hover:bg-white hover:text-black">Highlights</button>
                <Link href={s.href} className="inline-flex min-h-[48px] items-center border border-white px-5 font-semibold text-white transition-colors hover:bg-white hover:text-black">Read full story</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-wide items-center gap-3 px-6 md:px-16" role="group" aria-label="Choose a story">
        {items.map((x, n) => (
          <button key={x.title} type="button" onClick={() => { setI(n); setHl(false); }} aria-label={`Story ${n + 1}: ${x.title}`} aria-current={n === i} className="group flex h-8 w-24 items-center">
            <span className="relative h-[3px] w-full overflow-hidden bg-line2">
              <span
                key={`${i}-${paused}`}
                className={`absolute inset-y-0 left-0 bg-accent ${n < i ? 'w-full' : n === i ? (paused || hl ? 'w-full' : 'w-0 animate-[grow_8s_linear_forwards]') : 'w-0'}`}
              />
            </span>
          </button>
        ))}
        <span className="ml-auto font-mono text-sm text-muted" aria-live="polite">
          {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        {[
          { d: -1, label: 'Previous story', icon: 'rotate-180' },
          { d: 1, label: 'Next story', icon: '' }
        ].map((b) => (
          <button
            key={b.d}
            type="button"
            onClick={() => { setI((i + b.d + items.length) % items.length); setHl(false); }}
            aria-label={b.label}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-line2 text-cream transition-colors hover:border-accent hover:bg-accent hover:text-accent-contrast"
          >
            <Icon name="arrow" size={18} className={b.icon} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* Expert voices: big portrait on the left, article on the right. */
type Voice = { title: string; text: string; by: string; role: string; image: string; href: string };
export function Voices({ items }: { items: Voice[] }) {
  const [i, setI] = useState(0);
  const v = items[i];
  const go = (d: number) => setI((i + d + items.length) % items.length);
  return (
    <div className="grid bg-surface lg:grid-cols-[1.6fr_1fr]">
      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[620px]">
        {items.map((x, n) => (
          <Image key={x.title} src={x.image} alt="" fill sizes="(min-width:1024px) 60vw, 100vw" className={`object-cover transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </div>
      <div className="relative flex flex-col gap-5 p-8 md:p-12">
        <div className="absolute right-6 top-6 flex flex-col gap-1">
          <button type="button" onClick={() => go(1)} aria-label="Next article" className="flex h-11 w-11 items-center justify-center bg-ink text-xl text-cream hover:text-accent">›</button>
          <button type="button" onClick={() => go(-1)} aria-label="Previous article" className="flex h-11 w-11 items-center justify-center bg-ink text-xl text-cream hover:text-accent">‹</button>
        </div>
        <div key={i} className="flex animate-[heroIn_.6s_ease-out] flex-col gap-5 pr-14">
          <h3 className="text-[1.75rem] font-light leading-snug">{v.title}</h3>
          <p className="text-muted">{v.text}</p>
          <p className="text-sm text-dim">Article by<br /><span className="text-cream">{v.by}</span><br />{v.role}</p>
          <Link href={v.href} className="inline-flex min-h-[46px] items-center self-start border border-cream px-5 text-sm font-semibold text-cream transition-colors hover:border-accent hover:text-accent">Read article</Link>
        </div>
        <p className="mt-auto text-sm text-dim" aria-live="polite">{i + 1} / {items.length}</p>
      </div>
    </div>
  );
}
