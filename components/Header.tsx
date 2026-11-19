'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { products } from '@/lib/data';
import { insightItems, insightTypes } from '@/lib/mock/insights';
import { Icon, type IconName } from './Icon';
import { useCommandPalette } from './CommandPalette';
import { useSaved } from './insights/experiences';

/* ------------------------------------------------------------------
 * Header: floating rounded bar with click-to-open mega panels:
 * text-link columns under accent headings, plus a spotlight carousel.
 * ------------------------------------------------------------------ */
type Col = { title: string; href: string; links: [string, string][]; desc?: string; icon?: IconName; image?: string };
type Spot = { eyebrow: string; title: string; text: string; href: string; image: string };
type Menu = { key: string; label: string; href?: string; cols: Col[]; spots: Spot[] };

const MENUS: Menu[] = [
  {
    // Desktop renders this menu via PANELS/CardPanel; the cols feed the mobile drawer.
    key: 'what',
    label: 'Platforms',
    cols: [
      { title: 'Platforms', href: '/products', links: [...products.map((p) => [p.name, p.externalUrl ?? `/products/${p.slug}`] as [string, string]), ['All products', '/products']] }
    ],
    spots: []
  },
  // plain link, no dropdown
  { key: 'who', label: 'Who we are', href: '/about', cols: [], spots: [] },
  {
    key: 'insights',
    label: 'Insights',
    cols: insightTypes.map((t) => ({
      title: t.title,
      href: `/insights/${t.slug}`,
      links: [],
      desc: t.desc,
      icon: t.icon,
      image: t.image
    })),
    spots: insightItems.slice(0, 3).map((i) => ({
      eyebrow: insightTypes.find((t) => t.slug === i.type)!.title,
      title: i.title,
      text: i.excerpt,
      href: `/insights/${i.type}`,
      image: i.image
    }))
  },
  {
    key: 'events',
    label: 'Events',
    cols: [
      { title: 'Events & conferences', href: '/events', links: [], icon: 'cal', image: '/gallery/isaca-conference-2025.jpg', desc: 'Upcoming sessions, webinars and the conferences where we speak.' },
      { title: 'MoUs & collaborations', href: '/events/mous', links: [], icon: 'hands', image: '/gallery/yespanchi-and-cyberfit-join-hands-to-provide-secure-data-erasure-services.jpg', desc: 'Partnerships that move technology forward.' },
      { title: 'Photo gallery', href: '/events/gallery', links: [], icon: 'photo', image: '/gallery/isaca-conference-2025-2.jpg', desc: 'Events, signings, awards and the people behind YesPanchi.' }
    ],
    spots: []
  }
];

const LINKS = [
  { name: 'Careers', href: '/careers' }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { saved } = useSaved();
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const palette = useCommandPalette();
  const menu = MENUS.find((m) => m.key === open);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // hide while scrolling down, reveal on scroll up; in-page sticky bars read --hdr-offset
      const hide = y > 400 && y > last;
      if (Math.abs(y - last) > 6) setHidden(hide);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const close = () => {
    if (open) triggers.current[open]?.focus();
    setOpen(null);
  };

  const isActive = (href: string) => pathname.startsWith(href.split('#')[0]);
  const solid = scrolled || open || mobileOpen;
  const tucked = hidden && !open && !mobileOpen;

  useEffect(() => {
    document.documentElement.style.setProperty('--hdr-offset', tucked ? '12px' : '88px');
  }, [tucked]);

  return (
    <header className={`sticky top-0 z-50 px-3 pt-3 transition-transform duration-300 sm:px-4 ${tucked ? '-translate-y-[120%]' : ''}`} onKeyDown={(e) => e.key === 'Escape' && close()}>
      {open && <div aria-hidden="true" onClick={close} className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-[3px]" />}

      <div className="relative mx-auto max-w-wide">
        <nav
          aria-label="Primary"
          className={`flex h-16 items-center gap-6 rounded-xl border px-4 transition-[background-color,border-color,box-shadow] duration-300 sm:px-6 ${
            solid ? 'border-line bg-ink shadow-lg' : 'theme-dark border-white/10 bg-[#0b1424]/55 backdrop-blur-xl'
          }`}
        >
          <Link href="/" aria-label="YesPanchi, Group of Companies, home" className="flex shrink-0 items-center">
            <Image src="/logo.png" alt="YesPanchi, Group of Companies" width={1107} height={345} priority className="h-8 w-auto sm:h-10" />
          </Link>

          <ul className="hidden items-center gap-1 text-[15px] font-medium xl:flex">
            {MENUS.map((m) => (
              <li key={m.key}>
                {m.href ? (
                  <Link
                    href={m.href}
                    aria-current={isActive(m.href) ? 'page' : undefined}
                    className={`flex min-h-[40px] items-center rounded-md px-3 transition-colors hover:bg-raised/60 ${isActive(m.href) ? 'text-accent' : 'text-cream'}`}
                  >
                    {m.label}
                  </Link>
                ) : (
                <button
                  ref={(el) => { triggers.current[m.key] = el; }}
                  type="button"
                  aria-expanded={open === m.key}
                  aria-controls={`menu-${m.key}`}
                  onClick={() => setOpen(open === m.key ? null : m.key)}
                  className={`flex min-h-[40px] items-center gap-2 rounded-md px-3 transition-colors ${
                    open === m.key ? 'bg-raised text-cream' : 'text-cream hover:bg-raised/60'
                  }`}
                >
                  {m.label}
                  <span aria-hidden="true" className={`text-[9px] transition-transform duration-200 ${open === m.key ? 'rotate-180 text-accent' : ''}`}>▼</span>
                </button>
                )}
              </li>
            ))}
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={`flex min-h-[40px] items-center rounded-md px-3 transition-colors hover:bg-raised/60 ${isActive(l.href) ? 'text-accent' : 'text-cream'}`}
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <Link href="/contact" className="hidden px-2 text-[13px] font-medium text-muted transition-colors hover:text-accent lg:block">
              Contact us
            </Link>
            <span aria-hidden="true" className="hidden h-4 w-px bg-line2 lg:block" />
            <button
              type="button"
              aria-label="Switch between light and dark theme"
              onClick={() => {
                const dark = document.documentElement.classList.toggle('dark');
                try { localStorage.theme = dark ? 'dark' : 'light'; } catch {}
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-raised hover:text-accent"
            >
              <Icon name="moon" size={18} className="dark:hidden" />
              <Icon name="sun" size={18} className="hidden dark:block" />
            </button>
            <Link
              href="/insights#desk"
              aria-label={`Reading Desk, ${saved.length} saved`}
              className="hidden h-11 items-center gap-2 rounded-full border border-line2 px-3.5 text-cream transition-colors hover:border-accent hover:text-accent sm:flex"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z" /></svg>
              <span className="min-w-[1.25rem] rounded-full bg-raised px-1.5 text-center text-xs font-semibold">{saved.length}</span>
            </Link>
            <button
              type="button"
              onClick={palette.open}
              aria-label="Search the site (Ctrl K)"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line2 text-cream transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="search" size={18} />
            </button>
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
        </nav>

        {menu && (
          <div
            id={`menu-${menu.key}`}
            role="region"
            aria-label={menu.label}
            className="absolute left-1/2 top-[calc(100%+6px)] hidden max-h-[calc(100dvh-100px)] w-full -translate-x-1/2 animate-fadeDown overflow-y-auto rounded-xl border border-line bg-ink shadow-2xl xl:block"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-cream transition-colors hover:bg-raised"
            >
              <Icon name="close" size={20} />
            </button>
            {PANELS[menu.key] ? <CardPanel p={PANELS[menu.key]} /> : (
            <div className={`grid gap-10 px-12 pb-10 pt-12 ${menu.spots.length ? "grid-cols-[minmax(0,1fr)_340px]" : "grid-cols-1"}`}>
              <ul className={`grid gap-4 self-start ${menu.spots.length ? "grid-cols-2" : "grid-cols-3"}`}>
                {menu.cols.map((c) => (
                  <li key={c.title}>
                    {/* full-bleed photo tile: text sits on a gradient so it reads over any image */}
                    <Link href={c.href} className="theme-dark group relative flex aspect-[16/8] flex-col justify-end overflow-hidden rounded-xl bg-[#0F1F38] p-6">
                      {c.image && <Image src={c.image} alt="" fill loading="eager" sizes="(min-width:1280px) 420px, 50vw" className="-z-0 object-cover transition-transform duration-700 group-hover:scale-110" />}
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1424] via-[#0b1424]/70 to-[#0b1424]/10 transition-opacity duration-500 group-hover:from-[#0b1424] group-hover:via-[#0b1424]/80" />
                      {c.icon && (
                        <span aria-hidden="true" className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[#0F1F38]">
                          <Icon name={c.icon} size={18} />
                        </span>
                      )}
                      <span className="relative flex flex-col gap-1.5">
                        <span className="flex items-center gap-2 text-xl font-medium text-white">
                          {c.title}
                          <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                        {c.desc && <span className="line-clamp-2 text-sm leading-relaxed text-white/75">{c.desc}</span>}
                      </span>
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#7DB8E8] transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
              {menu.spots.length > 0 && <Spotlight key={menu.key} spots={menu.spots} />}
            </div>
            )}
          </div>
        )}

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="absolute inset-x-0 top-[calc(100%+6px)] h-[calc(100dvh-100px)] overflow-y-auto rounded-xl border border-line bg-ink px-6 pb-10 pt-2 shadow-2xl xl:hidden">
            <ul className="flex flex-col">
              {MENUS.map((m) => (
                <li key={m.key} className="border-b border-line">
                  {m.href ? (
                    <Link href={m.href} className={`block py-4 text-xl font-medium ${isActive(m.href) ? 'text-accent' : ''}`}>{m.label}</Link>
                  ) : (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-medium [&::-webkit-details-marker]:hidden">
                      {m.label}
                      <Icon name="chevron" size={18} className="transition-transform group-open:rotate-180" />
                    </summary>
                    {m.cols.map((c) => (
                      <div key={c.title} className={c.links.length ? "mb-5" : "mb-3"}>
                        <Link href={c.href} className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{c.title}</Link>
                        {c.links.length > 0 && <ul className="mt-2 grid grid-cols-2 gap-x-4">
                          {c.links.map(([name, href]) => (
                            <li key={name}><Link href={href} className="block py-1.5 text-muted">{name}</Link></li>
                          ))}
                        </ul>}
                      </div>
                    ))}
                  </details>
                  )}
                </li>
              ))}
              {[...LINKS, { name: 'Contact us', href: '/contact' }].map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link href={l.href} className={`block py-4 text-xl font-medium ${isActive(l.href) ? 'text-accent' : ''}`}>{l.name}</Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-6 flex min-h-[52px] items-center justify-center rounded-full bg-accent font-semibold text-accent-contrast hover:text-accent-contrast">
              Contact us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

const PLATFORM_IMAGES: Record<string, string> = {
  'yp-raksha': '/media/tablet-shield.jpg',
  'yp-prakaar': '/media/hero-ai.jpg',
  'qsecura-pq-ssl': '/media/hero-quantum.jpg'
};

type Card = { href: string; image: string; icon: IconName; tag: string; title: string; short: string; text: string; cta: string; external?: boolean };
type Panel = { eyebrow: string; title: string; text: string; all: [string, string]; cards: Card[] };

const PANELS: Record<string, Panel> = {
  what: {
    eyebrow: 'Our platforms',
    title: 'Platforms built for digital trust',
    text: 'Three platforms, one mission: secure, governed and future-ready technology.',
    all: ['All products', '/products'],
    cards: products.map((p) => ({
      href: p.externalUrl ?? `/products/${p.slug}`,
      external: !!p.externalUrl,
      image: PLATFORM_IMAGES[p.slug] ?? '/media/viz-cube.jpg',
      icon: p.icon,
      tag: p.tag,
      title: p.name,
      short: p.short,
      text: p.description,
      cta: p.externalUrl ? 'Visit qsecura.com' : 'Explore platform'
    }))
  },
  events: {
    eyebrow: 'Events & community',
    title: 'Where you will find us',
    text: 'Conferences, campus talks, partnerships and the moments in between.',
    all: ['All events', '/events'],
    cards: [
      { href: '/events', image: '/gallery/isaca-conference-2025.jpg', icon: 'cal', tag: 'Events', title: 'Events & conferences', short: 'Talks, conferences and appearances', text: 'Conferences, campus talks, banking forums, webinars and TV appearances by our team.', cta: 'Explore events' },
      { href: '/events/mous', image: '/gallery/yespanchi-and-cyberfit-join-hands-to-provide-secure-data-erasure-services.jpg', icon: 'hands', tag: 'Partnerships', title: 'MoUs & collaborations', short: 'Partnerships that move technology forward', text: 'Agreements with institutions and industry partners to build, research and skill together.', cta: 'View MoUs' },
      { href: '/events/gallery', image: '/gallery/isaca-conference-2025-2.jpg', icon: 'photo', tag: 'Gallery', title: 'Photo gallery', short: 'Moments from our journey', text: 'Events, signings, awards and the people behind YesPanchi.', cta: 'Open gallery' }
    ]
  }
};

/* Mega panel: intro column plus one image card per item (Platforms, Events). */
function CardPanel({ p }: { p: Panel }) {
  return (
    <div className="grid gap-8 px-12 pb-10 pt-12 lg:grid-cols-[260px_1fr]">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{p.eyebrow}</p>
        <p className="text-2xl font-medium leading-snug text-cream">{p.title}</p>
        <p className="text-[15px] leading-relaxed text-muted">{p.text}</p>
        <Link href={p.all[1]} className="group mt-auto inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border border-line2 px-5 text-sm font-semibold text-cream transition-colors hover:border-accent hover:text-accent">
          {p.all[0]} <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ul className="grid grid-cols-3 gap-5">
        {p.cards.map((c) => (
          <li key={c.title}>
            <Link
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noopener noreferrer' : undefined}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-accent/60 hover:shadow-xl"
            >
              <span className="relative block aspect-[16/9] overflow-hidden bg-[#0F1F38]">
                <Image src={c.image} alt="" fill loading="eager" sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0F1F38]/80 via-[#0F1F38]/20 to-transparent" />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-[#0F1F38] backdrop-blur">
                  <Icon name={c.icon} size={20} />
                </span>
                <span className="absolute bottom-3 left-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">{c.tag}</span>
              </span>
              <span className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-lg font-semibold text-cream">{c.title}</span>
                <span className="text-sm font-medium text-accent">{c.short}</span>
                <span className="line-clamp-3 text-sm leading-relaxed text-muted">{c.text}</span>
                <span className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-semibold text-cream transition-colors group-hover:text-accent">
                  {c.cta}
                  <Icon name="arrow" size={16} className={`transition-transform group-hover:translate-x-1 ${c.external ? '-rotate-45' : ''}`} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Spotlight({ spots }: { spots: Spot[] }) {
  const [i, setI] = useState(0);
  const s = spots[i];
  const go = (d: number) => setI((i + d + spots.length) % spots.length);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">Spotlight</p>
      <Link href={s.href} className="theme-dark group flex flex-col overflow-hidden rounded-xl bg-[#0F1F38]">
        <span className="relative aspect-[16/9] overflow-hidden">
          <Image src={s.image} alt="" fill sizes="340px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </span>
        <span className="flex min-h-[200px] flex-col gap-3 p-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{s.eyebrow}</span>
          <span className="text-lg font-medium leading-snug text-white">{s.title}</span>
          <span className="text-sm leading-relaxed text-white/85">{s.text}</span>
        </span>
      </Link>
      <div className="flex items-center justify-center gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Previous spotlight" className="flex h-8 w-8 items-center justify-center text-[10px] text-cream">◀</button>
        {spots.map((_, n) => (
          <button
            key={n}
            type="button"
            onClick={() => setI(n)}
            aria-label={`Spotlight ${n + 1} of ${spots.length}`}
            aria-current={n === i}
            className="flex h-6 w-4 items-center justify-center"
          >
            <span className={`h-1.5 w-1.5 rounded-full transition-colors ${n === i ? 'bg-accent' : 'bg-line3'}`} />
          </button>
        ))}
        <button type="button" onClick={() => go(1)} aria-label="Next spotlight" className="flex h-8 w-8 items-center justify-center text-[10px] text-cream">▶</button>
      </div>
    </div>
  );
}
