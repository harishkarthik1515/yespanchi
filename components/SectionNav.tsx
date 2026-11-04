'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui';

/* "On this page" nav: an inline chip row under the hero, plus (desktop) a
 * floating dot rail on the right edge that tracks the section in view. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    items.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    const first = document.getElementById(items[0]?.id);
    const onScroll = () => setShow(!!first && first.getBoundingClientRect().top < window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [items]);

  return (
    <>
      <nav aria-label="On this page" className="border-b border-line">
        <Container>
          <ul className="-mx-2 flex gap-1 overflow-x-auto py-3 text-sm font-semibold [scrollbar-width:none]">
            {items.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="block whitespace-nowrap rounded-full px-4 py-2 text-muted transition-colors hover:bg-raised hover:text-cream">{n.label}</a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <nav
        aria-label="Section progress"
        className={`group fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-500 xl:block ${show ? 'opacity-100' : 'pointer-events-none translate-x-4 opacity-0'}`}
      >
        <ul className="flex flex-col items-end gap-1 rounded-full border border-white/10 bg-[#141210]/90 px-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] py-3 backdrop-blur-xl transition-all group-hover:rounded-2xl group-hover:px-3">
          {items.map((n) => {
            const on = active === n.id;
            return (
              <li key={n.id}>
                <a href={`#${n.id}`} aria-current={on ? 'true' : undefined} className="flex items-center justify-end gap-3 py-1.5 text-[13px] font-semibold">
                  <span className={`max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[140px] ${on ? 'text-[#FF6B81]' : 'text-[#A79DA0]'}`}>{n.label}</span>
                  <span className={`block rounded-full transition-all duration-300 ${on ? 'h-5 w-1.5 bg-[#C81E3A]' : 'h-1.5 w-1.5 bg-[#6E6265]'}`} />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
