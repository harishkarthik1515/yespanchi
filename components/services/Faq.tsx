import { Icon } from '@/components/Icon';

/** Accessible FAQ list built on native <details> — no client JS needed. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <ul className="flex flex-col divide-y divide-line rounded-3xl border border-line bg-surface">
      {items.map((f) => (
        <li key={f.q}>
          <details className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="flex-none text-accent transition-transform group-open:rotate-90"><Icon name="chevron" size={18} /></span>
            </summary>
            <p className="mt-3 text-muted">{f.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
