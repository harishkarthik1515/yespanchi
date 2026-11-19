import type { SiteSettings } from '@/lib/cms-schema';

/** Top announcement strip; text, link and visibility are edited in the admin console (Announcement bar). */
export default function AnnouncementBar({ s }: { s: SiteSettings }) {
  if (!s.announcementOn || !s.announcementText) return null;
  const external = /^https?:\/\//.test(s.announcementLink);
  return (
    <div
      role="region"
      aria-label="Announcement"
      className="theme-dark relative flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-ink px-6 py-2 text-sm text-muted"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--c-accent) / .1), transparent)' }}
      />
      <span className="relative flex items-center gap-2 rounded-full border border-accent/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
          <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        New
      </span>
      <span className="relative">{s.announcementText}</span>
      {s.announcementLink && s.announcementLabel && (
        <a href={s.announcementLink} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="group relative font-medium text-cream">
          <span className="relative">
            {s.announcementLabel}
            <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
          </span>
          <span aria-hidden="true"> →</span>
        </a>
      )}
    </div>
  );
}
