'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from './motion';

/* ------------------------------------------------------------------
 * Global UI chrome: scroll progress, reveal-on-scroll, card spotlight,
 * back-to-top. Mounted once in the root layout.
 * ------------------------------------------------------------------ */
export function SiteEffects() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
        setShowTop(window.scrollY > 900);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Reveal on scroll — re-scans on DOM changes so client-rendered
    // sections (tabs, filters) animate too.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    const observeAll = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    // Spotlight follow on cards
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
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
        className={`fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line2 bg-surface/90 text-accent backdrop-blur transition-all duration-300 hover:border-accent ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 19 V5 M6 11 L12 5 L18 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-24 right-4 z-[65] w-[min(420px,calc(100vw-32px))] rounded-2xl border border-line2 bg-surface/95 p-5 shadow-[0_24px_70px_rgba(0,0,0,.6)] backdrop-blur-xl"
    >
      <p className="text-sm text-muted">
        We use essential cookies to run this site and optional analytics to improve it. See our{' '}
        <a href="/privacy" className="text-accent underline">privacy policy</a>.
      </p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => choose('all')} className="min-h-[44px] flex-1 rounded-full bg-accent px-4 text-sm font-semibold text-accent-contrast">Accept all</button>
        <button onClick={() => choose('essential')} className="min-h-[44px] flex-1 rounded-full border border-line2 px-4 text-sm font-medium">Essential only</button>
      </div>
    </div>
  );
}
