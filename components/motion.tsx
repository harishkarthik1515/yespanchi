'use client';

/* ------------------------------------------------------------------
 * Scroll-motion primitives, built on IntersectionObserver + sticky
 * positioning only — no animation library. These mirror the mechanics
 * the reference sites use (Palo Alto builds its own too).
 * ------------------------------------------------------------------ */

import Link from 'next/link';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type CSSProperties, type ReactNode
} from 'react';
import { Icon } from './Icon';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==================================================================
 * useInView — fires once when an element enters the viewport.
 * ================================================================== */
export function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px', ...opts });
    io.observe(el);
    return () => io.disconnect();
  }, [opts.threshold, opts.rootMargin]); // eslint-disable-line react-hooks/exhaustive-deps
  return { ref, inView };
}

/* ==================================================================
 * Headline that reveals line by line behind a mask.
 * Pass each line as a separate child.
 * ================================================================== */
export function MaskLines({
  lines, className = '', as: Tag = 'h2', id, stagger = 90
}: { lines: ReactNode[]; className?: string; as?: 'h1' | 'h2' | 'p' | 'div'; id?: string; stagger?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <Tag id={id} className={className} ref={ref as never}>
      {lines.map((l, i) => (
        <span key={i} className={`line-mask ${inView ? 'is-in' : ''}`} style={{ ['--d' as string]: `${i * stagger}ms` }}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ==================================================================
 * Scroll progress for a single element: 0 as it enters the viewport,
 * 1 as it leaves. Drives parallax and scrubbed effects.
 * ================================================================== */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0, active = false;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const next = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      // Quantise so sub-pixel scrolling doesn't re-render the subtree every frame.
      setP((prev) => (Math.abs(prev - next) > 0.002 ? next : prev));
    };
    const onScroll = () => { if (!raf && active) raf = requestAnimationFrame(measure); };
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; if (active) onScroll(); });
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, progress: p };
}

/* ==================================================================
 * Parallax — drifts its children against the scroll.
 * ================================================================== */
export function Parallax({
  children, speed = 40, className = '', style
}: { children: ReactNode; speed?: number; className?: string; style?: CSSProperties }) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transform: `translate3d(0, ${(progress - 0.5) * speed * -2}px, 0)`, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

/* ==================================================================
 * Ghost numeral — the oversized watermark figure Palo Alto parks
 * behind its platform panels ("13x NETWORK SECURITY LEADER").
 * ================================================================== */
export function GhostFigure({
  value, caption, className = ''
}: { value: string; caption?: string; className?: string }) {
  return (
    /* Anchored to the bottom-right so it fills empty space rather than
       sitting behind the content cards, which would slice it in half. */
    <Parallax
      speed={18}
      className={`pointer-events-none absolute bottom-10 right-8 flex select-none flex-col items-end ${className}`}
    >
      <span aria-hidden="true" className="ghost-figure ghost-fill whitespace-nowrap text-[clamp(3.5rem,10vw,9rem)]">{value}</span>
      {caption && (
        /* tracking adds a trailing space after the last letter, so pad the
           right by the same amount to keep the block flush with the edge. */
        <span
          aria-hidden="true"
          className="mt-1.5 whitespace-nowrap pr-[0.28em] text-[clamp(.55rem,.95vw,.9rem)] font-medium uppercase tracking-[0.28em] text-cream/[0.07]"
        >
          {caption}
        </span>
      )}
    </Parallax>
  );
}

/* ==================================================================
 * Counter — counts up when scrolled into view. Handles "250+", "99.9%",
 * "24/7" and other mixed strings by animating only the leading number.
 * ================================================================== */
export function Counter({ value, className = '' }: { value: string; className?: string }) {
  /* Parsed once per `value`. Deriving this inline would hand the effect a
     fresh match array on every render, restarting the count each time the
     parent re-renders (which it does constantly during scroll). */
  const parsed = useMemo(() => {
    const m = value.match(/^(\D*)([\d.]+)([\s\S]*)$/);
    if (!m) return null;
    return {
      prefix: m[1],
      target: parseFloat(m[2]),
      decimals: m[2].includes('.') ? m[2].split('.')[1].length : 0,
      suffix: m[3]
    };
  }, [value]);

  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!parsed || !inView) return;
    if (prefersReducedMotion()) { setN(parsed.target); return; }
    const { target } = parsed;
    const start = performance.now(), dur = 1500;
    let raf = requestAnimationFrame(function tick(now) {
      const k = Math.min(1, (now - start) / dur);
      setN(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      {parsed ? <>{parsed.prefix}{n.toFixed(parsed.decimals)}{parsed.suffix}</> : value}
    </span>
  );
}

/* ==================================================================
 * Meter — the animated gradient bar + counting percentage used in
 * Palo Alto's "attackers are supercharging" panel.
 * ================================================================== */
export function Meter({
  label, value, max = 100, delay = 0
}: { label: string; value: number; max?: number; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div ref={ref} className="flex flex-col gap-2.5">
      <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">{label}</span>
      <div className="flex items-center gap-4">
        <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-cream/[0.06]">
          <div
            className="h-full rounded-full transition-[width] duration-[1600ms] ease-out"
            style={{
              width: inView ? `${pct}%` : '0%',
              transitionDelay: `${delay}ms`,
              background: 'linear-gradient(90deg, rgb(var(--c-accent) / .35), rgb(var(--c-accent)))'
            }}
          />
        </div>
        <Counter value={`${value}%`} className="min-w-[4ch] text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-none" />
      </div>
    </div>
  );
}

/* ==================================================================
 * StickyNav — the secondary section bar that pins beneath the header
 * and underlines whichever section you are currently in
 * (Palo Alto's `waypoint-sticky`).
 * ================================================================== */
export function StickyNav({
  sections, cta
}: { sections: { id: string; label: string }[]; cta?: { href: string; label: string } }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [stuck, setStuck] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.6] }
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [sections]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { rootMargin: '-81px 0px 0px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" />
      <div
        className={`sticky top-[64px] z-40 border-b transition-colors duration-300 ${
          stuck ? 'border-line bg-ink/95 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-wide items-center gap-1 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={`relative whitespace-nowrap px-4 py-4 text-[15px] font-medium transition-colors ${
                active === s.id ? 'text-cream' : 'text-dim hover:text-cream'
              }`}
            >
              {s.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-3 bottom-0 h-[2px] origin-left rounded-full bg-accent transition-transform duration-300 ease-out ${
                  active === s.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
          {cta && (
            <Link
              href={cta.href}
              className="ml-auto hidden shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90 hover:text-accent-contrast sm:inline-flex"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

/* ==================================================================
 * ScrollTabs — Palo Alto's signature move. A tall section whose panel
 * is sticky; as you scroll through it the active tab advances, the
 * section's accent colour retints everything, and panels crossfade.
 * Clicking a tab scrolls to that tab's slice of the section.
 * ================================================================== */
type ScrollTabsCtx = { active: number };
const TabsCtx = createContext<ScrollTabsCtx>({ active: 0 });
export const useScrollTab = () => useContext(TabsCtx);

export function ScrollTabs({
  items, children, className = '', stickyTop = 128
}: {
  items: { id: string; label: string; accent: string; icon?: ReactNode }[];
  children: (active: number) => ReactNode;
  className?: string;
  stickyTop?: number;
}) {
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const slices = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = slices.current.findIndex((s) => s === e.target);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    slices.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, [items.length]);

  const goTo = useCallback((i: number) => {
    const el = slices.current[i];
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - stickyTop - 40;
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [stickyTop]);

  const ctx = useMemo(() => ({ active }), [active]);

  return (
    <div ref={wrap} className={`${items[active]?.accent ?? ''} relative transition-colors duration-700 ${className}`}>
      {/* Tab bar — pins below the section nav */}
      <div className="sticky z-30 border-b border-line bg-ink/95 backdrop-blur-xl transition-colors duration-700" style={{ top: stickyTop }}>
        <div
          role="tablist"
          aria-label="Platforms"
          className="mx-auto flex w-full max-w-wide gap-2 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => goTo(i)}
              className={`relative flex shrink-0 items-center gap-2.5 whitespace-nowrap px-4 py-5 text-left text-[15px] transition-colors md:text-base ${
                i === active ? 'font-semibold text-cream' : 'font-medium text-dim hover:text-cream'
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 rounded-sm transition-all duration-500 ${i === active ? 'rotate-45 bg-accent' : 'bg-line3'}`}
              />
              {t.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-3 bottom-0 h-[2px] origin-left rounded-full bg-accent transition-transform duration-500 ease-out ${
                  i === active ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Sticky stage + the scroll slices that drive it */}
      <TabsCtx.Provider value={ctx}>
        <div className="relative">
          <div className="sticky" style={{ top: stickyTop + 72 }}>
            {children(active)}
          </div>
          <div aria-hidden="true" className="relative -mt-[100vh]">
            {items.map((t, i) => (
              <div key={t.id} ref={(el) => { slices.current[i] = el; }} className="h-[88vh]" />
            ))}
          </div>
        </div>
      </TabsCtx.Provider>
    </div>
  );
}

/* ==================================================================
 * Magnetic button — pulls gently toward the cursor.
 * ================================================================== */
export function Magnetic({ children, className = '', strength = 0.28 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      style={{ transform: `translate3d(${t.x}px, ${t.y}px, 0)`, transition: t.x || t.y ? 'none' : 'transform .45s cubic-bezier(.22,.7,.2,1)' }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || prefersReducedMotion()) return;
        const r = ref.current!.getBoundingClientRect();
        setT({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
      }}
      onPointerLeave={() => setT({ x: 0, y: 0 })}
    >
      {children}
    </span>
  );
}

/* ==================================================================
 * Marquee row — infinite logo/word ticker.
 * ================================================================== */
export function Ticker({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <div className={`marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}>
      <ul className="flex w-max animate-marquee items-center gap-14 whitespace-nowrap">
        {[...items, ...items].map((c, i) => (
          <li
            key={`${c}-${i}`}
            aria-hidden={i >= items.length ? 'true' : undefined}
            className="text-lg font-medium text-muted transition-colors hover:text-cream md:text-xl"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==================================================================
 * Arrow link — underline grows on hover, arrow slides.
 * ================================================================== */
export function ArrowLink({
  href, children, className = '', external
}: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  const inner = (
    <span className="group inline-flex items-center gap-2 font-medium">
      <span className="relative">
        {children}
        <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
      </span>
      <Icon name="arrow" size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>;
  return <Link href={href} className={className}>{inner}</Link>;
}
