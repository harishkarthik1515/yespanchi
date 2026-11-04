export default function AnnouncementBar() {
  return (
    <div role="region" aria-label="Announcement" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-bronze px-6 py-2.5 text-sm font-medium text-ink">
      <span className="rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-bronze-light">New</span>
      <span>YP-PRAKAAR is here — quantum-secure payment infrastructure for the enterprise.</span>
      <a href="/products/yp-prakaar" className="font-bold text-ink underline underline-offset-[3px] hover:text-ink">Explore YP-PRAKAAR →</a>
    </div>
  );
}
