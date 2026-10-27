'use client';

import { ReactNode, useEffect, useState } from 'react';

/* ------------------------------------------------------------------
 * Hidden hero switcher (internal preview only — nothing visible).
 * - URL:      ?hero=1 | 2 | 3   (remembered in this browser)
 * - Keyboard: Ctrl + Alt + H    cycles 1 → 2 → 3
 * - Reset:    ?hero=0
 * Visitors who never do either always see hero 1.
 * ------------------------------------------------------------------ */
const KEY = 'yp-hero';

export function HeroSwitch({ heroes }: { heroes: ReactNode[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const set = (i: number) => {
      setActive(i);
      try { i ? localStorage.setItem(KEY, String(i)) : localStorage.removeItem(KEY); } catch {}
    };
    const q = new URLSearchParams(location.search).get('hero');
    if (q !== null) {
      const n = Number(q) - 1;
      set(n >= 0 && n < heroes.length ? n : 0);
    } else {
      try {
        const n = Number(localStorage.getItem(KEY));
        if (n > 0 && n < heroes.length) setActive(n);
      } catch {}
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setActive((a) => {
          const n = (a + 1) % heroes.length;
          try { n ? localStorage.setItem(KEY, String(n)) : localStorage.removeItem(KEY); } catch {}
          return n;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [heroes.length]);

  return <>{heroes.map((h, i) => <div key={i} hidden={i !== active}>{h}</div>)}</>;
}
