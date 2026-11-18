'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { products } from '@/lib/data';
import { coreExpertise, industries } from '@/lib/mock/about';
import { insightItems, insightTypes } from '@/lib/mock/insights';
import { Icon } from './Icon';
import { useCommandPalette } from './CommandPalette';
import { useSaved } from './insights/experiences';

/* ------------------------------------------------------------------
 * Header — floating rounded bar with click-to-open mega panels:
 * text-link columns under accent headings, plus a spotlight carousel.
 * ------------------------------------------------------------------ */
type Col = { title: string; href: string; links: [string, string][] };
type Spot = { eyebrow: string; title: string; text: string; href: string; image: string };
type Menu = { key: string; label: string; cols: Col[]; spots: Spot[] };

const MENUS: Menu[] = [
  {
    key: 'what',
    label: 'What we do',
    cols: [
      { title: 'Platforms', href: '/products', links: [...products.map((p) => [p.name, p.externalUrl ?? `/products/${p.slug}`] as [string, string]), ['All products', '/products']] },
      // shortcut: expertise and industries share one About anchor each; give them their own pages if they grow content
      { title: 'Expertise', href: '/about#expertise', links: coreExpertise.map((e) => [e.title, '/about#expertise']) },
      { title: 'Industries', href: '/about#industries', links: industries.map((i) => [i, '/about#industries']) }
    ],
    spots: [
      { eyebrow: 'Launch', title: 'QSecura PQ-SSL is live', text: 'Quantum-safe security for websites, web apps and mobile platforms — built on NIST post-quantum cryptography.', href: 'https://qsecura.com', image: '/qsecura-launch.jpg' },
      { eyebrow: 'Platform', title: 'YP-PRAKAAR', text: 'Quantum-secure payment infrastructure for banks, gateways and fintechs preparing for the post-quantum era.', href: '/products/yp-prakaar', image: '/media/hero-quantum.jpg' },
      { eyebrow: 'Free offer', title: 'Book a security assessment', text: 'A no-obligation review of your posture with the key risks and next steps from our team.', href: '/contact?topic=assessment', image: '/media/analyst.jpg' }
    ]
  },
  {
    key: 'who',
    label: 'Who we are',
    cols: [
      { title: 'About YesPanchi', href: '/about', links: [['Our story', '/about#mission'], ['Our journey', '/about#journey'], ['Leadership', '/about#team'], ['Core values', '/about#values'], ['Awards & partners', '/about#awards']] },
      { title: 'Newsroom', href: '/events', links: [['Events & conferences', '/events'], ['MoUs & collaborations', '/events/mous'], ['Photo gallery', '/events/gallery']] },
      { title: 'Work with us', href: '/careers', links: [['Careers', '/careers'], ['Contact us', '/contact'], ['Request a product demo', '/contact?topic=product']] }
    ],
    spots: [
      { eyebrow: 'Recognition', title: 'FICCI Start-Up Stars', text: 'Recognised by FICCI among India’s promising technology start-ups.', href: '/about#awards', image: '/gallery/ficci-start-up-stars-awards-2022.jpg' },
      { eyebrow: 'Collaboration', title: 'YesPanchi × CyberFIT', text: 'Joining hands to provide secure data erasure services.', href: '/events/mous', image: '/gallery/yespanchi-and-cyberfit-join-hands-to-provide-secure-data-erasure-services.jpg' },
      { eyebrow: 'Careers', title: 'Build what keeps India secure', text: 'Open roles across post-quantum engineering, AI platforms and audit.', href: '/careers', image: '/media/team-office.jpg' }
    ]
  },
  {
    key: 'insights',
    label: 'Insights',
    cols: insightTypes.map((t) => ({
      title: t.title,
      href: `/insights/${t.slug}`,
      links: t.experiences.map((e) => [e.title, `/insights/${t.slug}#${e.id}`] as [string, string])
    })),
    spots: insightItems.slice(0, 3).map((i) => ({
      eyebrow: insightTypes.find((t) => t.slug === i.type)!.title,
      title: i.title,
      text: i.excerpt,
      href: `/insights/${i.type}`,
      image: i.image
    }))
  }
];

const LINKS = [
  { name: 'News', href: '/events' },
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
          <Link href="/" aria-label="YesPanchi — Group of Companies, home" className="flex shrink-0 items-center">
            <Image src="/logo.png" alt="YesPanchi — Group of Companies" width={1107} height={345} priority className="h-8 w-auto sm:h-10" />
          </Link>

          <ul className="hidden items-center gap-1 text-[15px] font-medium xl:flex">
            {MENUS.map((m) => (
              <li key={m.key}>
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
            <div className="grid gap-10 px-12 pb-10 pt-12" style={{ gridTemplateColumns: `repeat(${menu.cols.length}, minmax(0,1fr)) 340px` }}>
              {menu.cols.map((c) => (
                <div key={c.title} className="flex flex-col gap-6">
                  <Link href={c.href} className="group flex items-center gap-2 text-xl font-medium text-accent">
                    {c.title}
                    <span aria-hidden="true" className="text-[10px] transition-transform group-hover:translate-x-1">▶</span>
                  </Link>
                  <ul className="flex flex-col gap-3">
                    {c.links.map(([name, href]) => (
                      <li key={name}>
                        <Link href={href} className="text-[15px] text-muted transition-colors hover:text-cream hover:underline hover:underline-offset-4">
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Spotlight key={menu.key} spots={menu.spots} />
            </div>
          </div>
        )}

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="absolute inset-x-0 top-[calc(100%+6px)] h-[calc(100dvh-100px)] overflow-y-auto rounded-xl border border-line bg-ink px-6 pb-10 pt-2 shadow-2xl xl:hidden">
            <ul className="flex flex-col">
              {MENUS.map((m) => (
                <li key={m.key} className="border-b border-line">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-medium [&::-webkit-details-marker]:hidden">
                      {m.label}
                      <Icon name="chevron" size={18} className="transition-transform group-open:rotate-180" />
                    </summary>
                    {m.cols.map((c) => (
                      <div key={c.title} className="mb-5">
                        <Link href={c.href} className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{c.title}</Link>
                        <ul className="mt-2 grid grid-cols-2 gap-x-4">
                          {c.links.map(([name, href]) => (
                            <li key={name}><Link href={href} className="block py-1.5 text-muted">{name}</Link></li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </details>
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
