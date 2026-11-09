export default function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b border-line bg-ink px-6 py-2.5 text-sm text-muted"
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
      <span className="relative">YP-PRAKAAR is here — quantum-secure payment infrastructure for the enterprise.</span>
      <a href="/products/yp-prakaar" className="group relative font-medium text-cream">
        <span className="relative">
          Explore YP-PRAKAAR
          <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
        </span>
        <span aria-hidden="true"> →</span>
      </a>
    </div>
  );
}
