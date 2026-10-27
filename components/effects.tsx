'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------
 * Plexus network — interactive canvas background (gold nodes that
 * connect to each other and lean toward the cursor).
 * ------------------------------------------------------------------ */
export function Plexus({ density = 0.00009, className = '' }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let pts: P[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(28, Math.min(110, Math.round(w * h * density)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const LINK = 140;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(181,173,162,${(1 - d / LINK) * 0.22})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 200) {
          ctx.strokeStyle = `rgba(226,201,163,${(1 - md / 200) * 0.55})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = md < 200 ? '#E2C9A3' : 'rgba(176,141,99,0.75)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const step = () => {
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      draw();
      if (visible) raf = requestAnimationFrame(step);
    };

    resize();
    const still = reducedMotion();
    if (still) draw(); else raf = requestAnimationFrame(step);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (still) draw();
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !still) { cancelAnimationFrame(raf); raf = requestAnimationFrame(step); }
    });
    io.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

/* ------------------------------------------------------------------
 * Tilt card — 3D perspective tilt + moving glare. Used for the
 * QSecura launch banner.
 * ------------------------------------------------------------------ */
export function TiltBanner({ src, alt, href }: { src: string; alt: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = (e: React.PointerEvent) => {
    if (reducedMotion() || e.pointerType !== 'mouse') return;
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 10, ry: (px - 0.5) * 12, gx: px * 100, gy: py * 100, on: true });
  };

  return (
    <div className="[perspective:1200px]">
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={onMove}
        onPointerLeave={() => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false })}
        className="group relative block overflow-hidden rounded-[22px] border border-bronze/50 shadow-[0_30px_80px_-20px_rgba(176,141,99,0.35)] transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
        aria-label="QSecura PQ-SSL — launching our new product. Visit qsecura.com"
      >
        <Image src={src} alt={alt} width={1024} height={644} priority sizes="(min-width: 1024px) 560px, 100vw" className="h-auto w-full" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ opacity: t.on ? 1 : 0, background: `radial-gradient(420px circle at ${t.gx}% ${t.gy}%, rgba(255,236,200,0.18), transparent 45%)` }}
        />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Count-up number, triggered when scrolled into view.
 * ------------------------------------------------------------------ */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? parseInt(m[1], 10) : 0;
  const suffix = m ? m[2] : value;
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!m || reducedMotion()) return;
    setN(0);
    const el = ref.current!;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1400;
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / dur);
        setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>{m ? n : ''}{suffix}</span>;
}

/* ------------------------------------------------------------------
 * Global UI chrome: scroll progress, reveal-on-scroll, card spotlight,
 * back-to-top. Mounted once in the root layout.
 * ------------------------------------------------------------------ */
export function SiteEffects() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShowTop(window.scrollY > 900);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    const observeAll = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    // Spotlight on cards
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.spotlight');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointermove', onMove);
      io.disconnect(); mo.disconnect();
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-bronze" style={{ transform: `scaleX(${progress})` }} />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' })}
        className={`fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line2 bg-surface/90 text-bronze-light backdrop-blur transition-all duration-300 hover:border-bronze ${showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19 V5 M6 11 L12 5 L18 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </>
  );
}

/* ------------------------------------------------------------------
 * Cookie consent (DPDP-friendly), remembered per browser.
 * ------------------------------------------------------------------ */
export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem('yp-consent')) setShow(true); } catch { /* storage blocked */ }
  }, []);
  const choose = (v: 'all' | 'essential') => {
    try { localStorage.setItem('yp-consent', v); } catch { /* ignore */ }
    setShow(false);
  };
  if (!show) return null;
  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed bottom-24 right-4 z-[65] w-[min(420px,calc(100vw-32px))] rounded-2xl border border-line2 bg-surface/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur">
      <p className="text-sm text-muted">We use essential cookies to run this site and optional analytics to improve it. See our <a href="/privacy" className="!text-bronze-light underline">privacy policy</a>.</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => choose('all')} className="min-h-[44px] flex-1 rounded-full bg-bronze px-4 text-sm font-semibold text-ink">Accept all</button>
        <button onClick={() => choose('essential')} className="min-h-[44px] flex-1 rounded-full border border-line3 px-4 text-sm font-semibold">Essential only</button>
      </div>
    </div>
  );
}
