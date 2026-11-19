'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Leader } from '@/lib/mock/about';
import { Icon } from '@/components/Icon';

const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

/* Portrait (or monogram until a photo is supplied), toned to one look so mixed-quality photos sit together. */
function Portrait({ l, sizes, hover }: { l: Leader; sizes: string; hover?: boolean }) {
  if (!l.photo) {
    return (
      <span className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(120%_90%_at_30%_10%,#2A5A8C,#0F1F38_70%)]">
        <span aria-hidden="true" className="dotgrid absolute inset-0 opacity-20" />
        <span aria-hidden="true" className="relative text-[clamp(3.5rem,6vw,5rem)] font-extralight tracking-[0.08em] text-white/90">{initials(l.name)}</span>
      </span>
    );
  }
  return (
    <Image
      src={l.photo}
      alt={l.name}
      fill
      sizes={sizes}
      className={`object-cover object-top ${hover ? 'transition-transform duration-700 group-hover:scale-[1.04]' : ''}`}
    />
  );
}

/* Board cards; "View profile" opens the full biography in a native <dialog>. */
export function LeaderCards({ leaders }: { leaders: Leader[] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [cur, setCur] = useState<Leader | null>(null);
  const open = (l: Leader) => { setCur(l); dlg.current?.showModal(); };

  return (
    <>
      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {leaders.map((l, n) => (
          <li key={l.name}>
            <button type="button" onClick={() => open(l)} aria-label={`${l.name}, ${l.role}. View profile`} className="group flex w-full flex-col text-left">
              {/* studio portraits on white: keep the frame light in both themes so the background blends */}
              <span className="relative block aspect-[1000/1028] overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-xl">
                <Portrait l={l} hover sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 100vw" />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                <span aria-hidden="true" className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[11px] text-[#0F1F38] backdrop-blur">{String(n + 1).padStart(2, '0')}</span>
                <span aria-hidden="true" className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-[#0F1F38] text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <Icon name="arrow" size={18} />
                </span>
              </span>
              <span className="mt-5 flex flex-col gap-2 border-l-[3px] border-accent pl-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{l.role}</span>
                <span className="text-xl font-medium leading-tight text-cream transition-colors group-hover:text-accent">{l.name}</span>
                <span className="line-clamp-2 text-sm leading-relaxed text-muted">{l.bio}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dlg}
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
        className="w-[min(920px,calc(100vw-32px))] max-h-[calc(100dvh-48px)] overflow-hidden rounded-2xl border border-line bg-ink p-0 text-cream shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {cur && (
          <div className="grid max-h-[calc(100dvh-48px)] overflow-y-auto md:grid-cols-[320px_1fr]">
            <div className="relative aspect-[4/5] bg-white md:aspect-auto md:min-h-full">
              <Portrait l={cur} sizes="320px" />
            </div>
            <div className="relative flex flex-col gap-5 p-8 md:p-10">
              <button type="button" onClick={() => dlg.current?.close()} aria-label="Close profile" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-raised">
                <Icon name="close" size={20} />
              </button>
              <div className="flex flex-col gap-1 pr-10">
                <h3 className="text-3xl font-medium">{cur.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{cur.role}</p>
              </div>
              <p className="leading-relaxed text-muted">{cur.bio}</p>
              {cur.highlights.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">Highlights</p>
                  <ul className="flex flex-col gap-2.5">
                    {cur.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px]">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {cur.linkedin && (
                <a href={cur.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border border-line2 px-5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent">
                  <span className="font-bold">in</span> LinkedIn profile
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
