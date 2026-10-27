import Image from 'next/image';
import Link from 'next/link';
import { products, services } from '@/lib/data';
import { SITE } from '@/lib/site';
import { Container } from './ui';
import { Icon } from './Icon';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-raised">
      <Container className="flex flex-col gap-12 pb-8 pt-16">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="flex max-w-sm flex-1 basis-72 flex-col gap-4">
            <Image src="/logo.png" alt="YesPanchi — Group of Companies" width={1107} height={345} className="h-16 w-auto self-start" />
            <p className="text-muted">{SITE.tagline}. {SITE.legalName} — IIT Madras Research Park, Chennai, India.</p>
            <div className="flex gap-2.5">
              <a href={SITE.social.x} aria-label="YesPanchi on X" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-bronze">
                <Icon name="x" size={16} />
              </a>
              <a href={SITE.social.linkedin} aria-label="YesPanchi on LinkedIn" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-sm font-bold hover:border-bronze">
                in
              </a>
            </div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-16 gap-y-10">
            <FooterCol title="Company" links={[['About Us', '/about'], ['Training', '/training'], ['Events', '/events'], ['MoUs', '/events/mous'], ['Gallery', '/events/gallery'], ['Contact', '/contact']]} />
            <FooterCol title="Services" links={services.slice(4).map((s) => [s.name, `/services/${s.slug}`] as [string, string])} />
            <FooterCol title="Products" links={products.map((p) => [p.name, `/products/${p.slug}`] as [string, string])} />
            <address className="flex flex-col gap-2.5 not-italic">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-dim">Reach us</span>
              <span className="max-w-[220px] text-muted">{SITE.address}</span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
            </address>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-raised pt-6 text-sm text-dim">
          <span>© {year} {SITE.legalName}. All rights reserved.</span>
          <span className="flex gap-5">
            <Link href="/privacy" className="text-muted">Privacy policy</Link>
            <Link href="/terms" className="text-muted">Terms</Link>
            <a href="/sitemap.xml" className="text-muted">Sitemap</a>
          </span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-dim">{title}</span>
      {links.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}
    </div>
  );
}
