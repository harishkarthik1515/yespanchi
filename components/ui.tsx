import Link from 'next/link';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/lib/site';
import { ThreatField } from './ThreatField';
import { Icon } from './Icon';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-wide px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode; light?: boolean }) {
  return <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">{children}</p>;
}

export function SectionHeading({
  eyebrow, title, accent, lead, id, as: Tag = 'h2'
}: { eyebrow?: string; title: string; accent?: string; lead?: string; id?: string; light?: boolean; as?: 'h1' | 'h2' }) {
  return (
    <div className="flex max-w-[68ch] flex-col gap-4">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag id={id} className="max-w-[22ch] text-d2 font-medium">
        {title} {accent && <span className="text-accent">{accent}</span>}
      </Tag>
      {lead && <p className="text-lead text-muted">{lead}</p>}
    </div>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: 'primary' | 'outline' | 'dark' | 'ghost'; className?: string; external?: boolean };
export function Button({ href, children, variant = 'primary', className = '', external }: BtnProps) {
  const styles = {
    primary: 'bg-accent text-accent-contrast hover:text-accent-contrast hover:shadow-[0_0_40px_-8px_rgb(var(--c-accent)/.75)]',
    outline: 'border border-line2 text-cream hover:border-cream',
    dark: 'bg-cream text-ink hover:bg-cream/90 hover:text-ink',
    ghost: 'border border-line2 text-cream hover:border-cream'
  }[variant];
  const cls = `group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-semibold transition-all duration-300 ${styles} ${className}`;
  const inner = (
    <>
      {children}
      <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  if (external) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return <Link href={href} className={cls}>{inner}</Link>;
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-dim">
        <ol className="flex flex-wrap items-center gap-2">
          {all.map((it, i) => (
            <li key={it.href} className="flex items-center gap-2">
              {i < all.length - 1 ? <Link href={it.href} className="hover:text-accent">{it.name}</Link> : <span aria-current="page" className="text-muted">{it.name}</span>}
              {i < all.length - 1 && <span aria-hidden="true" className="text-line3">/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.href) }))
        }}
      />
    </>
  );
}

export function PageHero({
  eyebrow, title, accent, lead, crumbs, children
}: { eyebrow: string; title: string; accent?: string; lead?: string; crumbs: { name: string; href: string }[]; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <ThreatField intensity={0.6} />
      <div aria-hidden="true" className="dotgrid pointer-events-none absolute inset-0 opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-24 h-[460px] w-[460px] rounded-full bg-accent/[0.12] blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
      <Container className="relative flex flex-col gap-6 pb-24 pt-28 md:pb-28 md:pt-32">
        <div data-reveal><Breadcrumbs items={crumbs} /></div>
        <div data-reveal style={{ ['--d' as string]: '80ms' }}><Eyebrow>{eyebrow}</Eyebrow></div>
        <h1 data-reveal style={{ ['--d' as string]: '140ms' }} className="max-w-[20ch] text-d1 font-medium">
          {title} {accent && <span className="text-accent">{accent}</span>}
        </h1>
        {lead && (
          <p data-reveal style={{ ['--d' as string]: '220ms' }} className="max-w-[62ch] text-lead text-muted">{lead}</p>
        )}
        {children}
      </Container>
    </section>
  );
}

export function NetworkBg() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice">
      <g stroke="rgb(var(--c-line3))" strokeWidth="0.8" fill="none">
        <path d="M40 120 L220 60 L380 180 L560 90 L720 210 L900 120 L1080 230 L1260 110 L1420 200" />
        <path d="M80 360 L220 60 M220 60 L300 420 L380 180 L520 380 L560 90 M720 210 L640 460 L520 380 M900 120 L860 420 L720 210 M1080 230 L1000 480 L860 420 M1260 110 L1180 400 L1080 230 M1420 200 L1340 460 L1180 400" />
        <path d="M80 360 L300 420 L520 380 L640 460 L860 420 L1000 480 L1180 400 L1340 460 M120 680 L300 420 M300 420 L420 640 L640 460 L760 700 L1000 480 L1120 690 L1340 460" />
      </g>
      <g fill="rgb(var(--c-accent))">
        {[[220, 60], [380, 180], [560, 90], [720, 210], [900, 120], [1080, 230], [1260, 110], [300, 420], [640, 460], [1000, 480], [1340, 460]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
        ))}
      </g>
    </svg>
  );
}

export function CtaBand() {
  return (
    <section aria-labelledby="cta-band" className="py-24">
      <Container>
        <div data-reveal className="relative flex flex-wrap items-end justify-between gap-10 overflow-hidden rounded-[32px] border border-line bg-surface/60 p-8 md:p-16">
          <div aria-hidden="true" className="hatch pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(80% 90% at 85% 20%, rgb(var(--c-accent) / .18), transparent 60%)' }}
          />
          <div className="relative flex max-w-2xl flex-col gap-5">
            <h2 id="cta-band" className="text-d2 font-medium">Ready to secure your digital future?</h2>
            <p className="text-lead text-muted">
              Partner with YesPanchi to strengthen cybersecurity, streamline compliance and accelerate
              innovation with AI security and quantum-ready solutions.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Button href="/contact?topic=assessment">Schedule a free assessment</Button>
            <Button href="/about" variant="outline">Discover YesPanchi</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
