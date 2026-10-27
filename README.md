# YesPanchi — Website (Next.js 14)

Multi-page, SEO-optimised website for **YesPanchi Tech Services Pvt. Ltd.** — bronze-on-black brand theme, floating "tube" navigation with mega menus, and working forms.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, sitemap, Open Graph).

## Pages (all statically generated)

| Route | Page |
|---|---|
| `/` | Home — hero, client marquee, stats, service tabs, product switcher, readiness self-check, awards, training, FAQ, newsletter |
| `/about` | Vision, mission, values, timeline, awards |
| `/products`, `/products/[slug]` | 6 products: QSecura PQ-SSL, Quantik, BoardMind, Alexi Voice, AI Guardrails, UNIFAI |
| `/services`, `/services/[slug]` | 9 services across General & Audit divisions |
| `/training`, `/training/[slug]` | Filterable programme catalogue + detail pages |
| `/events`, `/events/[slug]` | Upcoming/past events (auto-split by date) |
| `/events/mous`, `/events/gallery` | Collaborations; gallery with lightbox |
| `/contact` | Validated contact form, pre-filled from `?topic=&item=` links |
| `/privacy`, `/terms`, 404 | Legal + not-found |
| `/api/contact`, `/api/newsletter` | POST endpoints (prototype: validate + log) |

## Where to edit

- **All content:** `lib/data.ts` — items marked `SAMPLE` are dummy data; replace before launch.
- **Company details (email, phone, address, socials):** `lib/site.ts` — currently sample values.
- **Theme colours & fonts:** `tailwind.config.ts`.
- **Logo:** `public/logo.png` · favicon: `app/icon.png` · social card: `app/opengraph-image.tsx`.
- **Forms:** connect email/CRM in `app/api/contact/route.ts` and `app/api/newsletter/route.ts`.

## SEO built in

- Per-page `title`, `description`, canonical URL, Open Graph & Twitter cards
- Structured data: Organization, WebSite, FAQPage, BreadcrumbList, SoftwareApplication, Service, Course, Event
- Auto `sitemap.xml` and `robots.txt`, dynamic OG image
- Server-rendered/static HTML, semantic landmarks, one `h1` per page, self-hosted fonts
- Security headers (HSTS, nosniff, frame options, referrer & permissions policy)
- Accessible: keyboard menus (Esc closes), skip link, focus rings, ARIA on tabs/accordions, reduced-motion support

## Deploy

Works on Vercel out of the box, or any Node host (`npm run build && npm start`).

On Vercel, set `NEXT_PUBLIC_SITE_URL` to the production domain under Project → Settings → Environment Variables. Every push to `main` redeploys.
