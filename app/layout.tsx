import type { Metadata, Viewport } from 'next';
// Self-hosted fonts (no runtime request to Google — faster & privacy-friendly)
import '@fontsource-variable/outfit';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './globals.css';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { JsonLd } from '@/components/ui';
import { CommandPaletteProvider } from '@/components/CommandPalette';
import { CookieConsent, SiteEffects } from '@/components/effects';
import WhatsAppButton from '@/components/WhatsAppButton';
import { SITE } from '@/lib/site';


export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'YesPanchi | Cybersecurity, Post-Quantum Security & Enterprise AI — Chennai',
    template: '%s | YesPanchi'
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ['cybersecurity Chennai', 'VAPT', 'ISO 27001 audit', 'PCI DSS audit', 'post-quantum cryptography', 'PQ-SSL', 'cyber forensics', 'enterprise AI', 'corporate training', 'IITM Research Park'],
  authors: [{ name: SITE.legalName }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: SITE.name,
    title: 'YesPanchi — Cybersecurity with a Conscience',
    description: SITE.description
  },
  twitter: { card: 'summary_large_image', site: '@YesPanchi', title: 'YesPanchi — Cybersecurity with a Conscience', description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  formatDetection: { telephone: false }
};

export const viewport: Viewport = { themeColor: '#FFFFFF', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs — content stays visible to crawlers & no-JS users */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bronze focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
        <CommandPaletteProvider>
          <SiteEffects />
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
        </CommandPaletteProvider>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${SITE.url}/#org`,
                name: SITE.legalName,
                alternateName: SITE.name,
                url: SITE.url,
                logo: `${SITE.url}/logo.png`,
                foundingDate: SITE.founded,
                slogan: SITE.tagline,
                email: SITE.email,
                telephone: SITE.phone,
                address: { '@type': 'PostalAddress', streetAddress: SITE.address, addressLocality: SITE.locality, addressRegion: SITE.region, addressCountry: SITE.country },
                sameAs: [SITE.social.x, SITE.social.linkedin]
              },
              { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, publisher: { '@id': `${SITE.url}/#org` }, inLanguage: 'en-IN' }
            ]
          }}
        />
      </body>
    </html>
  );
}
