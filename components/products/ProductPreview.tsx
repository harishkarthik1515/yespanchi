import type { ProductMock } from '@/lib/mock/products';

const stateStyle = {
  ok: { dot: 'bg-emerald-400', label: 'Healthy' },
  warn: { dot: 'bg-amber-400', label: 'Attention' },
  risk: { dot: 'bg-rose-400', label: 'At risk' }
} as const;

/** Mock product UI, built from divs. Decorative sample data. */
export function ProductPreview({ name, preview }: { name: string; preview: ProductMock['preview'] }) {
  const max = Math.max(...preview.bars);
  return (
    <figure className="overflow-hidden rounded-3xl border border-line2 bg-surface shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 border-b border-line bg-raised px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-rose-400/80" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" aria-hidden="true" />
        <span className="ml-3 min-w-0 truncate rounded-md bg-ink/50 px-3 py-1 font-mono text-xs text-dim">app.yespanchi.com / {name.toLowerCase().replace(/\s+/g, '-')}</span>
      </div>
      <div className="flex">
        <div aria-hidden="true" className="hidden w-14 flex-none flex-col items-center gap-3 border-r border-line py-5 sm:flex">
          {[0, 1, 2, 3, 4].map((i) => <span key={i} className={`h-8 w-8 rounded-lg ${i === 0 ? 'bg-bronze/25 ring-1 ring-bronze/50' : 'bg-raised'}`} />)}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold">{preview.title}</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" /> Live
            </span>
          </div>
          <dl className="grid gap-3 sm:grid-cols-3">
            {preview.kpis.map((k) => (
              <div key={k.label} className="rounded-2xl border border-line bg-ink/40 p-4">
                <dt className="text-xs text-dim">{k.label}</dt>
                <dd className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-semibold">{k.value}</span>
                  <span className={`text-xs font-semibold ${k.good ? 'text-emerald-400' : 'text-amber-400'}`}>{k.delta}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="rounded-2xl border border-line bg-ink/40 p-4">
            <p className="mb-3 text-xs text-dim">Last 12 weeks</p>
            <div className="flex h-28 items-end gap-1.5" aria-hidden="true">
              {preview.bars.map((b, i) => (
                <span key={i} className={`flex-1 rounded-t ${i === preview.bars.length - 1 ? 'bg-bronze' : 'bg-bronze/35'}`} style={{ height: `${(b / max) * 100}%` }} />
              ))}
            </div>
          </div>
          <ul className="flex flex-col divide-y divide-line rounded-2xl border border-line">
            {preview.rows.map((r) => (
              <li key={r.name} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="flex min-w-0 items-center gap-3">
                  <span className={`h-2 w-2 flex-none rounded-full ${stateStyle[r.state].dot}`} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{r.name}</span>
                    <span className="block truncate text-xs text-dim">{r.meta}</span>
                  </span>
                </span>
                <span className="flex-none text-xs text-muted">{stateStyle[r.state].label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="border-t border-line px-4 py-2 text-xs text-dim">Illustrative product interface with sample data.</figcaption>
    </figure>
  );
}
