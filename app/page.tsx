import Image from 'next/image';
import Link from 'next/link';
import { awards, faqs } from '@/lib/data';
import { caseStudies } from '@/lib/mock/home';
import { typeOf } from '@/lib/mock/insights';
import { getClientSectors, getInsights } from '@/lib/cms';
import { JsonLd } from '@/components/ui';
import { Faq } from '@/components/interactive';
import { Hero } from '@/components/Hero';
import { ClientSectors } from '@/components/motion';
import { BrandFilm, PillNav, Recognition, Stories, Voices } from '@/components/home/kyndryl';

const SECTIONS = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'customer-stories', label: 'Customer stories' },
  { id: 'insights', label: 'Trends and insights' },
  { id: 'our-expertise', label: 'Our expertise' },
  { id: 'faq', label: 'FAQ' }
];

const STORY_IMAGES = ['/media/team-meeting.jpg', '/media/hero-defence.jpg', '/media/story-textile.jpg'];

function Watermark({ children, tone = 'ink' }: { children: string; tone?: 'ink' | 'surface' }) {
  return (
    <div aria-hidden="true" className={`select-none overflow-hidden whitespace-nowrap ${tone === 'surface' ? 'bg-ink' : ''}`}>
      <p className="-mb-[0.1em] text-center text-[clamp(2.5rem,10.8vw,14rem)] font-bold leading-none tracking-[-0.04em] text-raised">{children}</p>
    </div>
  );
}

const label = 'flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream';
const bar = <span aria-hidden="true" className="h-[3px] w-5 bg-accent" />;

export default async function HomePage() {
  const [insightItems, clientSectors] = await Promise.all([getInsights(), getClientSectors()]);
  // Home picks are the entries ticked "Show on the home page" in the console (latest first), topped up with the newest.
  const ideas = [...insightItems.filter((i) => i.featured), ...insightItems.filter((i) => !i.featured && i.type !== 'newsletters')].slice(0, 3);
  const voices = [
    { slug: 'pqc-migration-checklist-2027', role: 'Lead, Post-quantum lab', image: '/media/consultant.jpg' },
    { slug: 'vapt-reports-boards-read', role: 'Head of offensive security', image: '/media/team-office.jpg' },
    { slug: 'dpdp-act-ai-agents', role: 'AI governance practice', image: '/media/analyst.jpg' }
  ].flatMap(({ slug, role, image }) => {
    const item = insightItems.find((i) => i.slug === slug);
    return item ? [{ title: item.title, text: item.excerpt, by: item.author, role, image, href: `/insights/${item.type}/${item.slug}` }] : [];
  });

  return (
    <>
      <Hero />

      <div className="relative">
        <PillNav items={SECTIONS} />

        {/* Who we are */}
        <section id="who-we-are" aria-labelledby="who-h" className="scroll-mt-32 pt-28">
          <div className="mx-auto grid max-w-[1920px] items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex flex-col gap-6 px-6 md:pl-16 lg:pl-[max(4rem,calc((100vw-1480px)/2+1.5rem))]">
              <p className={label}>Who we are{bar}</p>
              <h2 id="who-h" className="max-w-[24ch] text-[clamp(1.6rem,2.2vw,2rem)] font-normal leading-snug">Where security-first innovation meets digital trust</h2>
              <p className="max-w-[52ch] text-muted">
                YesPanchi Group of Companies, a Chennai-based technology and innovation-driven organization focused on
                cybersecurity, digital forensics, AI, fintech, governance platforms, and emerging quantum-safe solutions.
              </p>
              <ul className="mt-6 flex flex-wrap divide-x divide-line2 text-[15px]">
                {[['Our story', '/about#mission'], ['Awards and recognition', '/about#awards'], ['Leadership', '/about#team']].map(([t, h]) => (
                  <li key={h} className="px-4 first:pl-0"><Link href={h} className="text-muted hover:text-accent">{t}</Link></li>
                ))}
              </ul>
            </div>
            <BrandFilm />
          </div>
        </section>

        {/* Industry recognition */}
        <section aria-label="Industry recognition" className="py-24">
          <div className="mx-auto w-full max-w-wide px-6"><Recognition items={awards.slice(0, 4)} /></div>
        </section>

        {/* Customer stories */}
        <section id="customer-stories" aria-labelledby="stories-h" className="scroll-mt-32 bg-surface pb-24">
          <Watermark tone="surface">stories that inspire</Watermark>
          <div className="mx-auto flex w-full max-w-wide flex-col gap-4 px-6 py-20">
            <h2 id="stories-h" className="text-[clamp(2rem,3vw,3rem)] font-light">Progress, one customer at a time</h2>
            <p className="max-w-[60ch] text-lg text-muted">Real security improvements, measured in audits passed, gaps closed and risks removed.</p>
          </div>
          <Stories items={caseStudies.map((c, n) => ({ ...c, image: STORY_IMAGES[n], href: '/insights/case-studies#solution-journey' }))} />
          <p className="mx-auto mt-6 w-full max-w-wide px-6 text-sm text-dim">Client stories are anonymised samples.</p>
        </section>

        {/* Trends and insights: three equal cards */}
        <section id="insights" aria-labelledby="insights-h" className="scroll-mt-32">
          <div className="mx-auto flex w-full max-w-wide flex-col gap-10 px-6 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className={label}>Trends and insights{bar}</p>
                <h2 id="insights-h" className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-light text-accent">Discover ideas that drive transformation</h2>
              </div>
              <Link href="/insights" className="text-sm font-semibold text-cream hover:text-accent">View all insights ›</Link>
            </div>
            <ul className="grid gap-8 md:grid-cols-3">
              {ideas.map((i) => (
                <li key={i.slug} className="group flex flex-col gap-4">
                  <Link href={`/insights/${i.type}/${i.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                    <Image src={i.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </Link>
                  <p className={label}>{typeOf(i.type).title}{bar}</p>
                  <h3 className="text-xl font-normal leading-snug">{i.title}</h3>
                  <p className="line-clamp-3 text-[15px] text-muted">{i.excerpt}</p>
                  <Link href={`/insights/${i.type}/${i.slug}`} className="mt-auto text-sm font-medium text-cream hover:text-accent">Read the {typeOf(i.type).title.toLowerCase().replace(/s$/, '')} ›</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Callout */}
          <div className="bg-surface">
            <div className="mx-auto flex w-full max-w-wide flex-col gap-5 px-6 py-16 md:flex-row md:items-center md:gap-16">
              <div className="flex flex-col gap-3 flex-1">
                <p className="text-2xl font-medium text-accent">Unlock quantum-safe confidence</p>
                <p className="max-w-[70ch] text-muted">Attackers are already collecting encrypted data to unlock later. Start with a free cryptography readiness conversation and know exactly where you stand.</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link href="/contact?topic=pqc" className="inline-flex min-h-[44px] items-center border border-accent px-5 text-sm font-semibold text-accent hover:bg-accent hover:text-accent-contrast">Book a PQC readiness call</Link>
                <Link href="/insights/white-papers#flipbook" className="inline-flex min-h-[44px] items-center border border-line2 px-5 text-sm font-semibold text-muted hover:border-cream hover:text-cream">Download the migration checklist</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our expertise */}
        <section id="our-expertise" aria-labelledby="expertise-h" className="scroll-mt-32 bg-surface">
          <Watermark tone="surface">yespanchi expertise</Watermark>
          <div className="mx-auto flex w-full max-w-wide flex-col gap-3 px-6 py-20">
            <h2 id="expertise-h" className="text-[clamp(2rem,3vw,3rem)] font-light">Trusted. Experienced. Skilled.</h2>
            <p className="max-w-[60ch] text-lg text-muted">People are YesPanchi’s strength. Our engineers, auditors and researchers bring deep domain knowledge and relentless curiosity to every engagement.</p>
          </div>
          <Voices items={voices} />
        </section>

        {/* Trusted by */}
        <section aria-labelledby="trusted-h" className="theme-dark bg-ink py-20 text-cream">
          <div className="mx-auto mb-10 flex w-full max-w-wide flex-col gap-3 px-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-bronze">Our clients</p>
            <h2 id="trusted-h" className="text-d2 font-medium">Trusted across sectors</h2>
            <Link href="/about#awards" className="text-sm text-accent hover:underline">Learn more about our partners ›</Link>
          </div>
          <ClientSectors sectors={clientSectors} />
        </section>

        {/* B8 Let’s get there together */}
        <section aria-labelledby="together-h" className="pb-24">
          <div className="mx-auto flex w-full max-w-wide flex-col gap-3 px-6 py-16">
            <h2 id="together-h" className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-light">
              Whether you are preparing for an audit, planning your quantum migration or building responsible AI, we would like to be part of the journey.
            </h2>
          </div>
          <div className="mx-auto grid w-full max-w-wide gap-6 px-6 pb-10 md:grid-cols-2">
            <div className="flex flex-col gap-4 border border-line p-8">
              <h3 className="text-xl font-normal text-accent">Recognised for innovation</h3>
              <p className="text-muted">Recognised by FICCI, MSME India and the Government of India as a promising startup.</p>
              <Link href="/about#awards" className="mt-auto inline-flex min-h-[44px] items-center self-start border border-cream px-4 text-sm font-semibold hover:border-accent hover:text-accent">Read about our awards</Link>
            </div>
            <div className="flex flex-col gap-4 border border-line p-8">
              <h3 className="text-xl font-normal text-accent">Careers</h3>
              <p className="text-muted">Join a team building the next generation of security. Open roles in cybersecurity, AI engineering and consulting.</p>
              <Link href="/careers" className="mt-auto inline-flex min-h-[44px] items-center self-start border border-cream px-4 text-sm font-semibold hover:border-accent hover:text-accent">View careers</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-h" className="scroll-mt-32 pb-24">
          <div className="mx-auto grid w-full max-w-site gap-10 border-t border-line px-6 pt-12 lg:grid-cols-[300px_1fr]">
            <h2 id="faq-h" className="text-xl font-normal">Answers to questions about<br /><span className="text-accent">YesPanchi</span></h2>
            <Faq />
          </div>
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
            }}
          />
        </section>
      </div>

      {/* Connect with us */}
      <section aria-labelledby="connect-h" className="relative overflow-hidden bg-surface">
        <svg aria-hidden="true" className="absolute inset-y-0 right-[8%] hidden h-full w-[40%] md:block" viewBox="0 0 480 240" preserveAspectRatio="none">
          {Array.from({ length: 18 }, (_, k) => (
            <path key={k} d={`M${k * 26} 120 L${k * 26 + 26} 0 M${k * 26} 120 L${k * 26 + 26} 240`} stroke="rgb(var(--c-accent))" strokeOpacity=".45" strokeWidth="1" fill="none" />
          ))}
        </svg>
        <div className="relative mx-auto flex w-full max-w-wide flex-col items-start gap-4 px-6 py-20">
          <h2 id="connect-h" className="text-[2rem] font-normal">Connect with us</h2>
          <p className="max-w-[46ch] text-muted">Tell us what you are working on. We usually reply within one business day.</p>
          <Link href="/contact" className="mt-2 inline-flex min-h-[44px] items-center rounded-full border border-cream px-5 text-sm font-semibold hover:border-accent hover:text-accent">Let’s talk</Link>
        </div>
      </section>
    </>
  );
}
