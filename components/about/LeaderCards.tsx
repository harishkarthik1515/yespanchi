'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Leader } from '@/lib/mock/about';
import { Icon } from '@/components/Icon';

/* Portrait cards; "View profile" opens the full biography in a native <dialog>. */
export function LeaderCards({ leaders }: { leaders: Leader[] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [cur, setCur] = useState<Leader | null>(null);
  const open = (l: Leader) => { setCur(l); dlg.current?.showModal(); };

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),420px))] gap-6">
        {leaders.map((l) => (
          <li key={l.name}>
            <button type="button" onClick={() => open(l)} className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left transition-shadow hover:shadow-xl">
              <span className="relative block aspect-[4/5] overflow-hidden bg-raised">
                <Image src={l.photo} alt={l.name} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
                  <span className="text-2xl font-medium text-white">{l.name}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7DB8E8]">{l.role}</span>
                </span>
              </span>
              <span className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="line-clamp-2 text-sm text-muted">{l.bio}</span>
                <span className="flex flex-none items-center gap-1.5 text-sm font-semibold text-accent">
                  View profile <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
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
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-full">
              <Image src={cur.photo} alt={cur.name} fill sizes="320px" className="object-cover object-top" />
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
              <a href={cur.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border border-line2 px-5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent">
                <span className="font-bold">in</span> LinkedIn profile
              </a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
