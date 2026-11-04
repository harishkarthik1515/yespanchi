'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav } from '@/lib/data';
import { Icon, IconTile } from './Icon';
import { useCommandPalette } from './CommandPalette';

type MenuKey = 'products' | 'services' | 'events' | null;

const links = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products', menu: 'products' as const },
  { name: 'Services', href: '/services', menu: 'services' as const },
  { name: 'Training', href: '/training' },
  { name: 'Events', href: '/events', menu: 'events' as const },
  { name: 'Contact', href: '/contact' }
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const palette = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const tube = scrolled;

  return (
    <header className={`sticky top-0 z-50 transition-[padding] duration-300 ${tube ? 'px-4 pt-3' : ''}`}>
      <nav
        ref={navRef}
        aria-label="Primary"
        onMouseLeave={() => setMenu(null)}
        onKeyDown={(e) => e.key === 'Escape' && setMenu(null)}
        className={`relative mx-auto flex items-center justify-between gap-3 backdrop-blur-xl transition-all duration-300 ${
          tube
            ? 'max-w-[1120px] rounded-full border border-line2 bg-surface/95 py-2 pl-5 pr-2.5 shadow-[0_16px_44px_rgba(26,21,23,0.16)]'
            : 'max-w-full border-b border-transparent bg-ink px-6 py-3.5 xl:px-[max(24px,calc((100%-1232px)/2))]'
        }`}
      >
        <Link href="/" aria-label="YesPanchi — Group of Companies, home" className="flex items-center">
          <Image src="/logo.png" alt="YesPanchi — Group of Companies" width={1107} height={345} priority className={`w-auto transition-all duration-300 ${tube ? 'h-10' : 'h-[52px]'}`} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 text-[15px] font-medium lg:flex">
          {links.map((l) =>
            l.menu ? (
              <li key={l.name}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={menu === l.menu}
                  aria-controls={`menu-${l.menu}`}
                  onClick={() => setMenu(menu === l.menu ? null : l.menu)}
                  onMouseEnter={() => setMenu(l.menu)}
                  className={`flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 py-2.5 transition-colors ${
                    isActive(l.href) ? 'bg-bronze font-semibold text-ink' : menu === l.menu ? 'text-bronze-light' : 'text-cream hover:text-bronze-light'
                  }`}
                >
                  {l.name}
                  <Icon name="chevron" size={14} className={`transition-transform ${menu === l.menu ? 'rotate-180' : ''}`} />
                </button>
              </li>
            ) : (
              <li key={l.name}>
                <Link
                  href={l.href}
                  onMouseEnter={() => setMenu(null)}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={`block rounded-full px-3.5 py-2.5 transition-colors ${isActive(l.href) ? 'bg-bronze font-semibold text-ink hover:text-ink' : ''}`}
                >
                  {l.name}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={palette.open}
            aria-label="Search the site (Ctrl K)"
            className="group flex h-11 items-center gap-2 rounded-full border border-line2 px-3.5 text-dim transition-colors hover:border-bronze hover:text-bronze-light"
          >
            <Icon name="search" size={18} />
            <kbd className="hidden rounded border border-line2 px-1.5 font-mono text-[10px] xl:inline">⌘K</kbd>
          </button>
          <Link href="/contact" className="hidden rounded-full bg-bronze px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-bronze-light hover:text-ink sm:inline-flex">
            Get Started
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line2 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} />
          </button>
        </div>

        {/* Mega menus */}
        {menu === 'products' && (
          <Panel id="menu-products" width="w-[min(680px,calc(100vw-32px))]" title="Explore our products" sub="Next-gen security, AI voice & governance platforms" allHref="/products" allLabel="All products">
            <ul className="grid gap-1 p-3 sm:grid-cols-2">
              {nav.products.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} target={p.external ? '_blank' : undefined} rel={p.external ? 'noopener noreferrer' : undefined} className="flex items-center gap-3.5 rounded-2xl p-3 hover:bg-raised">
                    <IconTile name={p.icon} />
                    <span className="flex min-w-0 flex-col">
                      <span className="font-semibold text-cream">{p.name}</span>
                      <span className="text-[13px] text-dim">{p.sub}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        )}
        {menu === 'services' && (
          <Panel id="menu-services" width="w-[min(780px,calc(100vw-32px))]" title="Our service divisions" sub="Technology delivery & cybersecurity audit expertise" allHref="/services" allLabel="All services">
            <div className="grid gap-3 p-3.5 sm:grid-cols-2">
              {nav.services.map((g) => (
                <div key={g.title} className="rounded-2xl border border-line bg-ink px-2.5 pb-2 pt-3.5">
                  <p className="mx-2.5 mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-bronze">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-bronze" />
                    {g.title}
                  </p>
                  <ul>
                    {g.items.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-raised">
                          <IconTile name={s.icon} size="sm" />
                          <span className="flex flex-col">
                            <span className="text-[15px] font-semibold text-cream">{s.name}</span>
                            <span className="text-[13px] text-dim">View details ›</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>
        )}
        {menu === 'events' && (
          <Panel id="menu-events" width="w-[min(400px,calc(100vw-32px))]" title="Events & highlights" sub="Conferences, MoUs & photo galleries">
            <ul className="p-3">
              {nav.events.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="flex items-center gap-3.5 rounded-2xl p-3 hover:bg-raised">
                    <IconTile name={e.icon} />
                    <span className="flex flex-col">
                      <span className="font-semibold text-cream">{e.name}</span>
                      <span className="text-[13px] text-dim">{e.sub}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        )}
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-80px)] overflow-y-auto border-t border-raised bg-ink px-6 pb-10 pt-4 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.name} className="border-b border-line">
                <Link href={l.href} className={`block py-4 text-xl font-semibold ${isActive(l.href) ? 'text-bronze' : ''}`}>{l.name}</Link>
                {l.menu === 'products' && (
                  <ul className="mb-3 grid grid-cols-2 gap-2">
                    {nav.products.map((p) => <li key={p.href}><Link href={p.href} className="block py-1.5 text-muted">{p.name}</Link></li>)}
                  </ul>
                )}
                {l.menu === 'services' && (
                  <ul className="mb-3 grid grid-cols-2 gap-2">
                    {nav.services.flatMap((g) => g.items).map((s) => <li key={s.href}><Link href={s.href} className="block py-1.5 text-muted">{s.name}</Link></li>)}
                  </ul>
                )}
                {l.menu === 'events' && (
                  <ul className="mb-3 grid grid-cols-2 gap-2">
                    {nav.events.map((e) => <li key={e.href}><Link href={e.href} className="block py-1.5 text-muted">{e.name}</Link></li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="mt-6 flex min-h-[52px] items-center justify-center rounded-full bg-bronze font-semibold text-ink">Get Started</Link>
        </div>
      )}
    </header>
  );
}

function Panel({ id, width, title, sub, allHref, allLabel, children }: { id: string; width: string; title: string; sub: string; allHref?: string; allLabel?: string; children: React.ReactNode }) {
  return (
    <div id={id} className={`absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 animate-fadeDown rounded-[22px] border border-line bg-surface shadow-[0_24px_60px_rgba(26,21,23,0.16)] ${width}`}>
      {/* invisible bridge over the gap so the pointer doesn't "leave" the nav on the way down */}
      <span aria-hidden="true" className="absolute inset-x-0 -top-[14px] h-[14px]" />
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-bronze">{title}</p>
          <p className="text-sm text-dim">{sub}</p>
        </div>
        {allHref && <Link href={allHref} className="text-sm font-semibold text-bronze-light">{allLabel} →</Link>}
      </div>
      {children}
    </div>
  );
}
