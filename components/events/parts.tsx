import Link from 'next/link';
import type { MockEvent } from '@/lib/mock/events';
import { Icon } from '@/components/Icon';

export const todayIso = () => new Date().toISOString().slice(0, 10);

export function isUpcoming(e: MockEvent) {
  return (e.endDate ?? e.date) >= todayIso();
}

export function priceLabel(p: number) {
  return p === 0 ? 'Free' : `₹${p.toLocaleString('en-IN')}`;
}

export function initials(name: string) {
  return name.replace(/^(Dr\.|Mr\.|Ms\.)\s*/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

export function DateBadge({ iso, size = 'md' }: { iso: string; size?: 'md' | 'lg' }) {
  const d = new Date(iso + 'T00:00:00');
  const mon = d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  const wk = d.toLocaleDateString('en-IN', { weekday: 'short' });
  const lg = size === 'lg';
  return (
    <time dateTime={iso} className={`flex flex-none flex-col overflow-hidden rounded-2xl border border-line2 bg-surface text-center ${lg ? 'w-24' : 'w-[68px]'}`}>
      <span className={`bg-bronze font-bold tracking-[0.15em] text-ink ${lg ? 'py-1.5 text-sm' : 'py-1 text-[11px]'}`}>{mon}</span>
      <span className={`font-extrabold leading-none tracking-[-0.04em] text-cream ${lg ? 'pt-3 text-5xl' : 'pt-2 text-3xl'}`}>{day}</span>
      <span className={`pb-2 pt-1 text-dim ${lg ? 'text-sm' : 'text-xs'}`}>{wk}</span>
    </time>
  );
}

export function Avatar({ name, size = 48 }: { name: string; size?: number }) {
  // deterministic crimson hue per name
  const h = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 20;
  return (
    <span aria-hidden="true" className="flex flex-none items-center justify-center rounded-full font-bold text-white" style={{ width: size, height: size, fontSize: size * 0.36, background: `linear-gradient(135deg, hsl(${345 + h} 68% 62%), hsl(${340 + h} 60% 42%))` }}>
      {initials(name)}
    </span>
  );
}

export function SeatsBar({ seats, registered }: { seats: number; registered: number }) {
  const left = Math.max(0, seats - registered);
  const pct = Math.min(100, Math.round((registered / seats) * 100));
  const low = left > 0 && left / seats < 0.2;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-sm">
        <span className={low ? 'font-semibold text-bronze-light' : 'text-muted'}>{left === 0 ? 'Sold out — waitlist open' : `${left} seats left`}</span>
        <span className="text-dim">{pct}% full</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-raised" role="progressbar" aria-label="Seats filled" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-bronze" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function EventCard({ e }: { e: MockEvent }) {
  return (
    <Link href={`/events/${e.slug}`} className="spotlight group flex h-full flex-col gap-5 rounded-3xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-bronze">
      <div className="flex items-start gap-4">
        <DateBadge iso={e.date} />
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="w-fit rounded-full bg-raised px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-bronze">{e.type}</span>
          <h3 className="text-xl font-bold leading-snug text-cream">{e.title}</h3>
        </div>
      </div>
      <p className="text-[15px] text-muted">{e.summary}</p>
      <ul className="mt-auto flex flex-col gap-1.5 text-sm text-muted">
        <li className="flex items-center gap-2"><Icon name="clock" size={15} className="text-bronze" />{e.start}–{e.end} IST</li>
        <li className="flex items-center gap-2"><Icon name="pin" size={15} className="text-bronze" /><span className="truncate">{e.city === 'Online' ? e.venue : `${e.venue}, ${e.city}`}</span></li>
      </ul>
      <div className="flex flex-col gap-4 border-t border-line pt-4">
        <SeatsBar seats={e.seats} registered={e.registered} />
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{priceLabel(e.price)}</span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-bronze-light">Details <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" /></span>
        </div>
      </div>
    </Link>
  );
}

export function RecapCard({ e }: { e: MockEvent }) {
  const r = e.recap;
  return (
    <Link href={`/events/${e.slug}`} className="group flex h-full flex-col gap-4 rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-line3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold uppercase tracking-wider text-dim">{e.type} · {e.city}</span>
        <time dateTime={e.date} className="text-dim">{new Date(e.date + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</time>
      </div>
      <h3 className="text-xl font-bold leading-snug">{e.title}</h3>
      {r && (
        <>
          <dl className="grid grid-cols-3 gap-2 rounded-2xl bg-raised p-4 text-center">
            <div><dt className="text-xs text-dim">Attendees</dt><dd className="text-2xl font-extrabold text-bronze">{r.attendees.toLocaleString('en-IN')}</dd></div>
            <div><dt className="text-xs text-dim">Sessions</dt><dd className="text-2xl font-extrabold text-bronze">{r.sessions}</dd></div>
            <div><dt className="text-xs text-dim">Rating</dt><dd className="text-2xl font-extrabold text-bronze">{r.rating}<span className="text-sm text-dim">/5</span></dd></div>
          </dl>
          <p className="text-[15px] text-muted">{r.highlight}</p>
        </>
      )}
      <span className="mt-auto flex items-center gap-1.5 pt-1 text-sm font-semibold text-bronze-light">Read recap <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}
