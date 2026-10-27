'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { DotField } from '@/components/heroFx';
import { events, products } from '@/lib/data';

function useCountdown(iso: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, new Date(`${iso}T09:00:00+05:30`).getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  if (left === null) return null;
  const s = Math.floor(left / 1000);
  return [['Days', Math.floor(s / 86400)], ['Hrs', Math.floor(s / 3600) % 24], ['Min', Math.floor(s / 60) % 60], ['Sec', s % 60]] as const;
}

export function HeroEcosystem() {
  const next = [...events].filter((e) => new Date(e.date) >= new Date(new Date().toDateString())).sort((a, b) => a.date.localeCompare(b.date))[0]
    ?? [...events].sort((a, b) => b.date.localeCompare(a.date))[0];
  const cd = useCountdown(next.date);
  const [hover, setHover] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setHover((x) => (x + 1) % products.length), 3000);
    return () => clearTimeout(id);
  }, [hover, paused]);
  const p = products[hover];

  return (
    <section aria-labelledby="hero3-title" className="relative overflow-hidden">
      <DotField />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-bronze/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-site gap-10 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex min-w-0 flex-col">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-bronze">YesPanchi Group of Companies</p>
          <h1 id="hero3-title" className="mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            Six products.<br />One mission: <span className="sheen">digital trust.</span>
          </h1>
          <p className="mt-6 max-w-[500px] text-lg text-muted">
            Quantum-safe encryption, AI governance, voice AI and unified security — built in-house at IITM Research Park, Chennai.
          </p>

          <Link href={`/events/${next.slug}`} className="spotlight group mt-10 block rounded-3xl border border-bronze/40 bg-gradient-to-br from-bronze/15 to-transparent p-6 hover:border-bronze hover:text-cream">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-bronze">
              <Icon name="cal" size={14} /> Next up · {next.type} · {next.city}
            </span>
            <span className="mt-2 block text-2xl font-bold">{next.title}</span>
            <div className="mt-5 flex gap-3" aria-label="Time until event">
              {(cd ?? [['Days', '–'], ['Hrs', '–'], ['Min', '–'], ['Sec', '–']]).map(([l, v]) => (
                <span key={l} className="flex w-16 flex-col items-center rounded-xl bg-ink/70 py-2">
                  <span className="font-mono text-2xl font-bold tabular-nums text-cream">{String(v).padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase tracking-wider text-dim">{l}</span>
                </span>
              ))}
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-bronze-light">Reserve your seat <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" /></span>
          </Link>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {products.map((x, k) => (
              <Link
                key={x.slug} href={`/products/${x.slug}`}
                onMouseEnter={() => setHover(k)} onFocus={() => setHover(k)}
                className={`spotlight relative flex aspect-square flex-col justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:text-cream ${k === hover ? 'border-bronze bg-bronze/10 shadow-[0_20px_50px_-20px_rgba(176,141,99,0.6)]' : 'border-line bg-surface/60'}`}
              >
                <span className="flex items-start justify-between">
                  {x.logo
                    ? <Image src={x.logo} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
                    : <span className="grid h-10 w-10 place-items-center rounded-xl bg-bronze/15 text-bronze"><Icon name={x.icon} size={20} /></span>}
                  {x.isNew && <span className="rounded-full bg-bronze px-2 py-0.5 text-[10px] font-bold uppercase text-ink">New</span>}
                </span>
                <span>
                  <span className="block font-bold leading-tight">{x.name}</span>
                  <span className="text-xs text-dim">{x.tag}</span>
                </span>
              </Link>
            ))}
          </div>
          <div key={p.slug} className="mt-4 rounded-2xl border border-line bg-surface/60 p-5">
            <p className="text-muted"><span className="font-semibold text-cream">{p.name}:</span> {p.description}</p>
          </div>
        </div>
      </div>

    </section>
  );
}
