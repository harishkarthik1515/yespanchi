'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav } from '@/lib/data';
import { Icon, IconTile } from './Icon';
import { useCommandPalette } from './CommandPalette';

type MenuKey = 'products' | 'events' | null;

const links = [
  { name: 'Overview', href: '/' },
  { name: 'Who We Are', href: '/about' },
  { name: 'What We Build', href: '/products', menu: 'products' as const },
  /* Services and Training live inside the "What We Build" menu on desktop; the mobile drawer lists them directly. */
  { name: 'Services', href: '/services', mobileOnly: true },
  { name: 'Training', href: '/training', mobileOnly: true },
  { name: 'Insights', href: '/insights' },
  { name: 'Newsroom', href: '/events', menu: 'events' as const },
  { name: 'Careers', href: '/careers' },
  { name: 'Connect', href: '/contact' }
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const palette = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <header className="sticky top-0 z-50">
      <nav
        ref={navRef}
        aria-label="Primary"
        onMouseLeave={() => setMenu(null)}
        onKeyDown={(e) => e.key === 'Escape' && setMenu(null)}
        className={`relative border-b border-line bg-ink/95 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
      >
        <div className={`mx-auto flex w-full max-w-wide items-center justify-between gap-4 px-6 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
          <Link href="/" aria-label="YesPanchi — Group of Companies, home" className="flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="YesPanchi — Group of Companies"
              width={1107}
              height={345}
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-9' : 'h-12'}`}
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 text-[15px] font-medium xl:flex">
            {links.filter((l) => !l.mobileOnly).map((l) =>
              l.menu ? (
                <li key={l.name}>
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={menu === l.menu}
                    aria-controls={`menu-${l.menu}`}
                    onClick={() => setMenu(menu === l.menu ? null : l.menu)}
                    onMouseEnter={() => setMenu(l.menu)}
                    className={`relative flex min-h-[44px] items-center gap-1.5 px-3.5 py-2.5 transition-colors ${
                      isActive(l.href) || menu === l.menu ? 'text-accent' : 'text-cream hover:text-accent'
                    }`}
                  >
                    {l.name}
                    <Icon name="chevron" size={13} className={`transition-transform duration-300 ${menu === l.menu ? 'rotate-180' : ''}`} />
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-accent transition-transform duration-300 ease-out ${
                        isActive(l.href) ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                </li>
              ) : (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    onMouseEnter={() => setMenu(null)}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={`relative block px-3.5 py-2.5 transition-colors ${isActive(l.href) ? 'text-accent' : 'text-cream hover:text-accent'}`}
                  >
                    {l.name}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-accent transition-transform duration-300 ease-out ${
                        isActive(l.href) ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
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
              className="flex h-11 items-center gap-2 rounded-full border border-line2 px-3.5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="search" size={18} />
              <kbd className="hidden rounded border border-line2 px-1.5 text-[10px] 2xl:inline">⌘K</kbd>
            </button>
            <button
              type="button"
              aria-label="Switch between light and dark theme"
              onClick={() => {
                const dark = document.documentElement.classList.toggle('dark');
                try { localStorage.theme = dark ? 'dark' : 'light'; } catch {}
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line2 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="moon" size={18} className="dark:hidden" />
              <Icon name="sun" size={18} className="hidden dark:block" />
            </button>
            <Link
              href="/contact"
              className="hidden min-h-[44px] items-center rounded-full bg-accent px-5 text-[15px] font-semibold text-accent-contrast transition-all duration-300 hover:text-accent-contrast hover:brightness-110 sm:inline-flex"
            >
              Get Started
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line2 xl:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {/* Mega menus */}
        {menu === 'products' && (
          <Panel id="menu-products" width="w-[min(900px,calc(100vw-32px))]" title="Products & services" sub="Platforms, audits, security services & training" allHref="/products" allLabel="All products">
            <ul className="grid gap-1 p-3 sm:grid-cols-3">
              {nav.products.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    target={p.external ? '_blank' : undefined}
                    rel={p.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-raised"
                  >
                    <IconTile name={p.icon} />
                    <span className="flex min-w-0 flex-col">
                      <span className="font-medium text-cream">{p.name}</span>
                      <span className="text-[13px] text-dim">{p.sub}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="grid gap-3 p-3.5 sm:grid-cols-2">
              {nav.services.map((g) => (
                <div key={g.title} className="rounded-2xl border border-line bg-ink px-2.5 pb-2 pt-3.5">
                  <p className="mx-2.5 mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-accent" />
                    {g.title}
                  </p>
                  <ul>
                    {g.items.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-raised">
                          <IconTile name={s.icon} size="sm" />
                          <span className="flex flex-col">
                            <span className="text-[15px] font-medium text-cream">{s.name}</span>
                            <span className="text-[13px] text-dim">View details ›</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-line px-6 py-4 text-sm font-medium">
              <Link href="/services" className="text-accent">All services →</Link>
              <Link href="/training" className="text-accent">Training programmes →</Link>
            </div>
          </Panel>
        )}
        {menu === 'events' && (
          <Panel id="menu-events" width="w-[min(420px,calc(100vw-32px))]" title="Newsroom" sub="Conferences, MoUs & photo galleries">
            <ul className="p-3">
              {nav.events.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="flex items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-raised">
                    <IconTile name={e.icon} />
                    <span className="flex flex-col">
                      <span className="font-medium text-cream">{e.name}</span>
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
        <div className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-ink px-6 pb-10 pt-4 xl:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.name} className="border-b border-line">
                <Link href={l.href} className={`block py-4 text-xl font-medium ${isActive(l.href) ? 'text-accent' : ''}`}>{l.name}</Link>
                {l.menu === 'products' && (
                  <ul className="mb-3 grid grid-cols-2 gap-2">
                    {nav.products.map((p) => <li key={p.href}><Link href={p.href} className="block py-1.5 text-muted">{p.name}</Link></li>)}
                  </ul>
                )}
                {l.href === '/services' && (
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
          <Link href="/contact" className="mt-6 flex min-h-[52px] items-center justify-center rounded-full bg-accent font-semibold text-accent-contrast hover:text-accent-contrast">Get Started</Link>
        </div>
      )}
    </header>
  );
}

function Panel({ id, width, title, sub, allHref, allLabel, children }: { id: string; width: string; title: string; sub: string; allHref?: string; allLabel?: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      className={`absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 animate-fadeDown rounded-2xl border border-line bg-ink shadow-2xl ${width}`}
    >
      {/* invisible bridge over the gap so the pointer doesn't "leave" the nav on the way down */}
      <span aria-hidden="true" className="absolute inset-x-0 -top-[12px] h-[12px]" />
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{title}</p>
          <p className="text-sm text-dim">{sub}</p>
        </div>
        {allHref && <Link href={allHref} className="text-sm font-medium text-accent">{allLabel} →</Link>}
      </div>
      {children}
    </div>
  );
}
