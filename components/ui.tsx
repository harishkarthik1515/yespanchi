import Link from 'next/link';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/lib/site';
import { Plexus } from './effects';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${light ? 'text-bronze-dark' : 'text-bronze'}`}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow, title, accent, lead, id, light = false, as: Tag = 'h2'
}: { eyebrow?: string; title: string; accent?: string; lead?: string; id?: string; light?: boolean; as?: 'h1' | 'h2' }) {
  return (
    <div className="flex max-w-[680px] flex-col gap-3.5">
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <Tag id={id} className="text-[clamp(2.1rem,4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
        {title} {accent && <span className={light ? 'text-bronze-dark' : 'text-bronze'}>{accent}</span>}
      </Tag>
      {lead && <p className={`text-lg font-light ${light ? 'text-taupe' : 'text-muted'}`}>{lead}</p>}
    </div>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: 'primary' | 'outline' | 'dark' | 'ghost'; className?: string; external?: boolean };
export function Button({ href, children, variant = 'primary', className = '', external }: BtnProps) {
  const styles = {
    primary: 'bg-bronze text-ink hover:bg-bronze-light hover:text-ink',
    outline: 'border border-line3 text-cream hover:border-bronze hover:text-bronze-light',
    dark: 'bg-ink text-cream hover:bg-raised hover:text-cream',
    ghost: 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-cream'
  }[variant];
  const cls = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-colors ${styles} ${className}`;
  if (external) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link href={href} className={cls}>{children}</Link>;
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
              {i < all.length - 1 ? <Link href={it.href} className="hover:text-bronze-light">{it.name}</Link> : <span aria-current="page" className="text-muted">{it.name}</span>}
              {i < all.length - 1 && <span aria-hidden="true">/</span>}
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
    <section className="relative overflow-hidden border-b border-raised">
      <Plexus density={0.00006} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-20 h-[420px] w-[420px] rounded-full bg-bronze/10 blur-[110px]" />
      <Container className="relative flex flex-col gap-6 pb-20 pt-16 md:pb-24 md:pt-20">
        <Breadcrumbs items={crumbs} />
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-[clamp(2.6rem,6vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
          {title} {accent && <span className="text-bronze">{accent}</span>}
        </h1>
        {lead && <p className="max-w-2xl text-xl font-light text-muted">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}

export function NetworkBg() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice">
      <g stroke="#6E6265" strokeWidth="0.8" fill="none">
        <path d="M40 120 L220 60 L380 180 L560 90 L720 210 L900 120 L1080 230 L1260 110 L1420 200" />
        <path d="M80 360 L220 60 M220 60 L300 420 L380 180 L520 380 L560 90 M720 210 L640 460 L520 380 M900 120 L860 420 L720 210 M1080 230 L1000 480 L860 420 M1260 110 L1180 400 L1080 230 M1420 200 L1340 460 L1180 400" />
        <path d="M80 360 L300 420 L520 380 L640 460 L860 420 L1000 480 L1180 400 L1340 460 M120 680 L300 420 M300 420 L420 640 L640 460 L760 700 L1000 480 L1120 690 L1340 460" />
      </g>
      <g fill="#C81E3A">
        {[[220, 60], [380, 180], [560, 90], [720, 210], [900, 120], [1080, 230], [1260, 110], [300, 420], [640, 460], [1000, 480], [1340, 460]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
        ))}
      </g>
    </svg>
  );
}

export function CtaBand() {
  return (
    <section aria-labelledby="cta-band" className="py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8 rounded-[32px] bg-bronze p-8 text-ink md:p-16">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 id="cta-band" className="text-[clamp(2rem,4.2vw,3.5rem)] font-extrabold leading-none tracking-[-0.04em]">Ready to Secure Your Digital Future?</h2>
            <p className="text-lg">Partner with YesPanchi to strengthen cybersecurity, streamline compliance, and accelerate innovation with AI security, quantum-ready solutions, and enterprise resilience.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact?topic=assessment" variant="dark">Schedule a Free Security Assessment</Button>
            <Button href="/about" variant="ghost">Discover YesPanchi</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
