'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { events } from '@/lib/data';
import { prefersReducedMotion } from './motion';

/* ------------------------------------------------------------------
 * Hero — full-bleed video carousel (3 slides) under the floating header,
 * then a strip of three timely highlights.
 * ------------------------------------------------------------------ */
const SLIDES = [
  {
    media: 'hero-quantum',
    title: 'Quantum-safe, starting today',
    text: 'YP-PRAKAAR and QSecura PQ-SSL protect payment and digital infrastructure with NIST-standard post-quantum cryptography.',
    cta: 'Explore YP-PRAKAAR',
    href: '/products/yp-prakaar'
  },
  {
    media: 'hero-defence',
    title: 'Turning cyber threats into cyber confidence',
    text: 'Security-first technology from IIT Madras Research Park — VAPT, compliance and cyber defence for organisations that cannot afford to fail.',
    cta: 'Book a free assessment',
    href: '/contact?topic=assessment'
  },
  {
    media: 'hero-ai',
    title: 'Enterprise AI, governed',
    text: 'YP-RAKSHA brings private LLMs, agents and retrieval into one secure, auditable platform for regulated enterprises.',
    cta: 'Discover YP-RAKSHA',
    href: '/products/yp-raksha'
  }
];

const DURATION = 9000;

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused]);

  const s = SLIDES[i];
  const upcoming = [...events].filter((e) => e.date >= new Date().toISOString().slice(0, 10)).sort((a, b) => a.date.localeCompare(b.date))[0] ?? events[0];
  const highlights = [
    { label: 'Events', title: `${new Date(upcoming.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}: ${upcoming.title}, ${upcoming.city}`, cta: 'Learn more', href: `/events/${upcoming.slug}` },
    { label: 'Launch', title: 'QSecura PQ-SSL brings quantum-safe security to websites and mobile platforms', cta: 'Learn more', href: 'https://qsecura.com' },
    { label: 'White paper', title: 'Planning a post-quantum migration for payment infrastructure', cta: 'Read the flipbook', href: '/insights/white-papers#flipbook' }
  ];

  return (
    <>
      <section
        aria-roledescription="carousel"
        aria-label="Highlights"
        className="theme-dark relative isolate -mt-[76px] flex h-[max(620px,min(100svh,1000px))] items-end overflow-hidden bg-black"
      >
        {SLIDES.map((sl, n) => (
          <div key={sl.media} aria-hidden={n !== i} className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${n === i ? 'opacity-100' : 'opacity-0'}`}>
            <Image src={`/media/${sl.media}.jpg`} alt="" fill priority={n === 0} sizes="100vw" className="object-cover" />
            {/* only the visible slide streams its video */}
            {n === i && (
              <video
                key={sl.media}
                className="absolute inset-0 h-full w-full object-cover"
                src={`/media/${sl.media}.mp4`}
                poster={`/media/${sl.media}.jpg`}
                autoPlay={!paused}
                muted
                loop
                playsInline
                preload="auto"
              />
            )}
          </div>
        ))}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="mx-auto w-full max-w-wide px-6 pb-28 md:px-16">
          <div key={i} aria-live={paused ? 'polite' : 'off'} className="flex max-w-[640px] animate-[heroIn_.9s_ease-out] flex-col gap-6">
            <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-[1.05] tracking-[-0.02em] text-white">{s.title}</h1>
            <p className="max-w-[52ch] text-lg leading-relaxed text-white/85">{s.text}</p>
            <Link
              href={s.href}
              className="mt-2 inline-flex min-h-[52px] items-center self-start border border-white px-6 font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              {s.cta}
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-3">
          {SLIDES.map((sl, n) => (
            <button
              key={sl.media}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Slide ${n + 1} of ${SLIDES.length}: ${sl.title}`}
              aria-current={n === i}
              className="flex h-8 w-8 items-center justify-center"
            >
              <span className={`h-3.5 w-3.5 rounded-full border border-white/80 transition-colors ${n === i ? 'bg-white' : 'bg-white/20 hover:bg-white/60'}`} />
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setPaused((p) => !p);
              document.querySelectorAll<HTMLVideoElement>('section[aria-roledescription] video').forEach((v) => (paused ? v.play() : v.pause()));
            }}
            aria-label={paused ? 'Play carousel' : 'Pause carousel'}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 text-[10px] text-white hover:bg-white/20"
          >
            {paused ? '▶' : '❚❚'}
          </button>
        </div>
      </section>

      <section aria-label="Latest from YesPanchi" className="border-b border-line bg-ink">
        <ul className="mx-auto grid w-full max-w-wide gap-10 px-6 py-12 md:grid-cols-3 md:px-16">
          {highlights.map((h) => (
            <li key={h.label} className="flex flex-col gap-4">
              <p className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream">
                {h.label}
                <span aria-hidden="true" className="h-[3px] w-6 bg-accent" />
              </p>
              <h2 className="text-[1.6rem] font-light leading-snug text-cream">{h.title}</h2>
              <Link
                href={h.href}
                target={h.href.startsWith('http') ? '_blank' : undefined}
                rel={h.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="mt-auto inline-flex min-h-[44px] items-center self-start border border-cream/70 px-5 text-sm font-semibold text-cream transition-colors hover:border-accent hover:text-accent"
              >
                {h.cta} →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
