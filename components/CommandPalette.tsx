'use client';

import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { events, products, programs, services } from '@/lib/data';
import { Icon, type IconName } from './Icon';

type Item = { title: string; group: string; href: string; icon: IconName; keywords?: string };

const INDEX: Item[] = [
  { title: 'Home', group: 'Pages', href: '/', icon: 'arrow' },
  { title: 'About Us', group: 'Pages', href: '/about', icon: 'eye' },
  { title: 'All products', group: 'Pages', href: '/products', icon: 'ai' },
  { title: 'All services', group: 'Pages', href: '/services', icon: 'list' },
  { title: 'Training programmes', group: 'Pages', href: '/training', icon: 'graduation' },
  { title: 'Events & conferences', group: 'Pages', href: '/events', icon: 'cal' },
  { title: 'MoUs & collaborations', group: 'Pages', href: '/events/mous', icon: 'hands' },
  { title: 'Photo gallery', group: 'Pages', href: '/events/gallery', icon: 'photo' },
  { title: 'Contact us', group: 'Pages', href: '/contact', icon: 'mail' },
  { title: 'Book a free security assessment', group: 'Actions', href: '/contact?topic=assessment', icon: 'shield', keywords: 'audit consult' },
  { title: 'Request a product demo', group: 'Actions', href: '/contact?topic=product', icon: 'board' },
  ...products.map((p) => ({ title: p.name, group: 'Products', href: `/products/${p.slug}`, icon: p.icon, keywords: `${p.tag} ${p.description}` })),
  ...services.map((s) => ({ title: s.name, group: 'Services', href: `/services/${s.slug}`, icon: s.icon, keywords: `${s.division} ${s.summary}` })),
  ...programs.map((p) => ({ title: p.title, group: 'Training', href: `/training/${p.slug}`, icon: 'graduation' as IconName, keywords: `${p.track} ${p.level}` })),
  ...events.map((e) => ({ title: e.title, group: 'Events', href: `/events/${e.slug}`, icon: 'cal' as IconName, keywords: `${e.city} ${e.type}` }))
];

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useCommandPalette = () => useContext(Ctx);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === '/' && !(e.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {isOpen && <Palette onClose={() => setOpen(false)} />}
    </Ctx.Provider>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return INDEX.filter((i) => i.group === 'Actions' || i.group === 'Products').slice(0, 9);
    return INDEX.map((i) => {
      const hay = `${i.title} ${i.group} ${i.keywords ?? ''}`.toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return null;
      const score = i.title.toLowerCase().startsWith(terms[0]) ? 2 : i.title.toLowerCase().includes(terms[0]) ? 1 : 0;
      return { i, score };
    }).filter(Boolean).sort((a, b) => b!.score - a!.score).map((r) => r!.i).slice(0, 12);
  }, [q]);

  useEffect(() => { inputRef.current?.focus(); document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
  useEffect(() => setActive(0), [q]);
  useEffect(() => { listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' }); }, [active]);

  const go = (href: string) => { onClose(); router.push(href); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    if (e.key === 'Enter' && results[active]) { e.preventDefault(); go(results[active].href); }
    if (e.key === 'Escape') onClose();
  };

  let lastGroup = '';
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Search the site" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line2 bg-surface animate-[fadeIn_.15s_ease-out]">
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Icon name="search" className="text-accent" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, services, training, events…"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={results[active] ? `cmdk-${active}` : undefined}
            className="h-14 flex-1 bg-transparent text-[17px] text-cream placeholder:text-dim focus:outline-none"
          />
          <kbd className="rounded-md border border-line2 px-2 py-0.5 font-mono text-[11px] text-dim">ESC</kbd>
        </div>
        <ul id="cmdk-list" ref={listRef} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-4 py-10 text-center text-muted">No results for “{q}”. Try “VAPT” or “quantum”.</li>}
          {results.map((r, idx) => {
            const header = r.group !== lastGroup ? (lastGroup = r.group) : null;
            return (
              <li key={r.href + r.title} role="presentation">
                {header && <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-dim">{header}</p>}
                <button
                  id={`cmdk-${idx}`}
                  data-idx={idx}
                  role="option"
                  aria-selected={idx === active}
                  onMouseMove={() => setActive(idx)}
                  onClick={() => go(r.href)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${idx === active ? 'bg-raised text-cream' : 'text-muted'}`}
                >
                  <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg border ${idx === active ? 'border-accent/60 text-accent' : 'border-line2 text-accent'}`}><Icon name={r.icon} size={16} /></span>
                  <span className="flex-1 truncate font-medium">{r.title}</span>
                  {idx === active && <span className="font-mono text-[11px] text-dim">↵</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-line px-5 py-2.5 font-mono text-[11px] text-dim">
          <span>↑↓ navigate · ↵ open</span>
          <span>⌘K / Ctrl K</span>
        </div>
      </div>
    </div>
  );
}
