import Image from 'next/image';
import Link from 'next/link';
import { products, services } from '@/lib/data';
import { SITE } from '@/lib/site';
import { Container } from './ui';
import { Icon } from './Icon';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--c-accent) / .7), transparent)' }}
      />

      <Container className="relative flex flex-col gap-14 pb-10 pt-20">
        <div className="flex flex-wrap justify-between gap-14">
          <div className="flex max-w-sm flex-1 basis-72 flex-col gap-5">
            <Image src="/logo.png" alt="YesPanchi — Group of Companies" width={1107} height={345} className="h-14 w-auto self-start" />
            <p className="text-muted">
              {SITE.tagline}. {SITE.legalName} — IIT Madras Research Park, Chennai, India.
            </p>
            <div className="flex gap-2.5">
              <a
                href={SITE.social.x}
                aria-label="YesPanchi on X"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name="x" size={16} />
              </a>
              <a
                href={SITE.social.linkedin}
                aria-label="YesPanchi on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-sm font-bold text-muted transition-colors hover:border-accent hover:text-accent"
              >
                in
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-16 gap-y-10">
            <FooterCol
              title="Company"
              links={[['About Us', '/about'], ['Training', '/training'], ['Events', '/events'], ['MoUs', '/events/mous'], ['Gallery', '/events/gallery'], ['Contact', '/contact']]}
            />
            <FooterCol title="Services" links={services.slice(4).map((s) => [s.name, `/services/${s.slug}`] as [string, string])} />
            <FooterCol title="Products" links={products.map((p) => [p.name, `/products/${p.slug}`] as [string, string])} />
            <address className="flex flex-col gap-3 not-italic">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dim">Reach us</span>
              <span className="max-w-[220px] text-muted">{SITE.address}</span>
              <a href={`mailto:${SITE.email}`} className="text-muted hover:text-accent">{SITE.email}</a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-muted hover:text-accent">{SITE.phone}</a>
            </address>
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-7 text-sm text-dim">
          <span>© {year} {SITE.legalName}. All rights reserved.</span>
          <span className="flex gap-6">
            <Link href="/privacy" className="text-muted hover:text-accent">Privacy policy</Link>
            <Link href="/terms" className="text-muted hover:text-accent">Terms</Link>
            <a href="/sitemap.xml" className="text-muted hover:text-accent">Sitemap</a>
          </span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dim">{title}</span>
      {links.map(([name, href]) => (
        <Link key={href} href={href} className="text-muted transition-colors hover:text-accent">{name}</Link>
      ))}
    </div>
  );
}
