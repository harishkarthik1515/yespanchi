import Image from 'next/image';
import Link from 'next/link';
import { awards, clients, faqs } from '@/lib/data';
import { caseStudies } from '@/lib/mock/home';
import { insightItems, typeOf } from '@/lib/mock/insights';
import { JsonLd } from '@/components/ui';
import { Faq } from '@/components/interactive';
import { Hero } from '@/components/Hero';
import { Ticker } from '@/components/motion';
import { BrandFilm, PillNav, Recognition, Stories, Voices } from '@/components/home/kyndryl';

const SECTIONS = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'customer-stories', label: 'Customer stories' },
  { id: 'how-we-help', label: 'How we help' },
  { id: 'our-expertise', label: 'Our expertise' },
  { id: 'faq', label: 'FAQ' }
];

const HELP = [
  { title: 'Find the gaps first', text: 'VAPT, configuration reviews and red-team exercises that show you what an attacker would find — before they do.', cta: 'Book a free assessment', href: '/contact?topic=assessment' },
  { title: 'Stay audit-ready', text: 'ISO 27001, PCI DSS and DPDP readiness with evidence packs your regulators and auditors accept.', cta: 'Talk to our auditors', href: '/contact?topic=assessment' },
  { title: 'Go quantum-safe', text: 'Crypto-inventory, hybrid TLS and NIST post-quantum algorithms with YP-PRAKAAR and QSecura PQ-SSL.', cta: 'Discover YP-PRAKAAR', href: '/products/yp-prakaar' },
  { title: 'Govern enterprise AI', text: 'Private LLMs, agents and retrieval in one auditable platform with YP-RAKSHA — secure by design.', cta: 'Discover YP-RAKSHA', href: '/products/yp-raksha' }
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

export default function HomePage() {
  const ideas = [
    insightItems.find((i) => i.slug === 'technology-outlook-2026')!,
    insightItems.find((i) => i.slug === 'dpdp-act-ai-agents')!,
    insightItems.find((i) => i.slug === 'pqc-readiness-bfsi')!
  ];
  const voices = [
    { item: insightItems.find((i) => i.slug === 'pqc-migration-checklist-2027')!, role: 'Lead, Post-quantum lab', image: '/media/consultant.jpg' },
    { item: insightItems.find((i) => i.slug === 'vapt-reports-boards-read')!, role: 'Head of offensive security', image: '/media/team-office.jpg' },
    { item: insightItems.find((i) => i.slug === 'dpdp-act-ai-agents')!, role: 'AI governance practice', image: '/media/analyst.jpg' }
  ].map(({ item, role, image }) => ({ title: item.title, text: item.excerpt, by: item.author, role, image, href: `/insights/${item.type}` }));

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
                YesPanchi helps banks, government and enterprises keep their essential systems secure — from VAPT and
                compliance audits to post-quantum cryptography and governed enterprise AI. Headquartered at IIT Madras
                Research Park, Chennai, since 2021.
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
            <p className="max-w-[60ch] text-lg text-muted">We work hand-in-hand with banks, government departments and manufacturers to secure and modernise their essential systems.</p>
          </div>
          <Stories items={caseStudies.map((c, n) => ({ ...c, image: STORY_IMAGES[n], href: '/insights/case-studies#solution-journey' }))} />
          <p className="mx-auto mt-6 w-full max-w-wide px-6 text-sm text-dim">Client stories are anonymised samples.</p>
        </section>

        {/* How we help */}
        <section id="how-we-help" aria-labelledby="help-h" className="scroll-mt-32">
          <div className="bg-surface"><Watermark>how yespanchi helps</Watermark></div>
          <div className="mx-auto flex w-full max-w-wide flex-col gap-12 px-6 py-20">
            <h2 id="help-h" className="border-b border-line pb-10 text-[clamp(1.75rem,2.6vw,2.5rem)] font-light leading-tight text-accent">
              Continuous protection<br />+ operational trust
            </h2>
            <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {HELP.map((h, n) => (
                <li key={h.title} className="flex flex-col gap-5">
                  <span aria-hidden="true" className="text-[5rem] font-light leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(var(--c-accent))]">0{n + 1}</span>
                  <h3 className="text-2xl font-normal leading-snug">{h.title}</h3>
                  <p className="text-[15px] text-muted">{h.text}</p>
                  <Link href={h.href} className="mt-auto text-sm font-medium text-cream hover:text-accent">{h.cta} ›</Link>
                </li>
              ))}
            </ol>
          </div>

          {/* Promo strip */}
          <div className="bg-surface">
            <div className="mx-auto grid w-full max-w-wide items-center gap-8 px-6 py-10 md:grid-cols-[320px_1fr]">
              <div className="relative aspect-[16/10] overflow-hidden"><Image src="/media/team-office.jpg" alt="" fill sizes="320px" className="object-cover" /></div>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-medium text-accent">Unlock quantum-safe confidence</p>
                <p className="max-w-[70ch] text-muted">Harvest-now-decrypt-later attacks make today’s encrypted data tomorrow’s breach. Our playbook shows where to start.</p>
                <Link href="/insights/white-papers#flipbook" className="mt-2 text-sm font-medium text-cream hover:text-accent">Read the migration playbook ›</Link>
              </div>
            </div>
          </div>

          {/* Trends and insights */}
          <div className="mx-auto flex w-full max-w-wide flex-col gap-10 px-6 py-24">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">Trends and insights</p>
              <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-light text-accent">Discover ideas that drive transformation</h2>
            </div>
            <ul className="grid gap-8 lg:grid-cols-[2fr_1fr_1fr]">
              {ideas.map((i, n) => (
                <li key={i.slug} className="group flex flex-col gap-4">
                  <Link href={`/insights/${i.type}`} className={`relative block overflow-hidden ${n === 0 ? 'aspect-[16/9] lg:aspect-[2/1]' : 'aspect-[16/9] lg:aspect-square'}`}>
                    <Image src={i.image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </Link>
                  <p className={label}>{typeOf(i.type).title}{bar}</p>
                  <h3 className="text-xl font-normal leading-snug">{i.title}</h3>
                  <p className="text-[15px] text-muted">{i.excerpt}</p>
                  <Link href={`/insights/${i.type}`} className="text-sm font-medium text-cream hover:text-accent">Read the {typeOf(i.type).title.toLowerCase().replace(/s$/, '')} ›</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Split banner */}
          <div className="mx-auto grid w-full max-w-site px-6 pb-24 md:grid-cols-2">
            <p className="bg-surface p-8 text-[clamp(1.6rem,2.4vw,2.2rem)] font-light leading-snug text-accent md:p-10">Delivering resilient, outcome-focused security for regulated enterprises</p>
            <div className="theme-dark flex flex-col justify-center gap-4 bg-[#2b3440] p-8 md:p-10">
              <p className="text-lg text-white">YesPanchi recognised as a FICCI Start-Up STAR and a DPIIT-recognised start-up</p>
              <Link href="/about#awards" className="text-sm font-semibold text-white hover:underline">See our recognition</Link>
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
        <section aria-labelledby="trusted-h" className="py-20">
          <div className="mx-auto mb-10 flex w-full max-w-wide flex-col gap-2 px-6">
            <h2 id="trusted-h" className="text-2xl font-normal">Trusted by government, enterprise &amp; startups</h2>
            <Link href="/about#awards" className="text-sm text-accent hover:underline">Learn more about our partners ›</Link>
          </div>
          <Ticker items={clients} />
        </section>

        {/* Let's get there together */}
        <section aria-labelledby="together-h" className="pb-24">
          <h2 id="together-h" className="py-14 text-center text-[clamp(2rem,3.4vw,3.25rem)] font-light text-accent">Let’s get there together</h2>
          <div className="grid lg:grid-cols-2">
            <div className="grid grid-cols-2">
              <div className="relative aspect-square"><Image src="/media/team-meeting.jpg" alt="" fill sizes="25vw" className="object-cover" /></div>
              <div className="flex aspect-square items-center justify-center bg-[#1F4E79] p-8">
                <Image src="/logo.png" alt="YesPanchi" width={1107} height={345} className="h-auto w-full max-w-[220px] brightness-0 invert" />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-10 px-6 py-12 md:px-16">
              <div className="flex flex-col gap-3 border-b border-line pb-10">
                <h3 className="text-2xl font-normal text-accent">Recognised for innovation</h3>
                <p className="text-muted">FICCI Start-Up STARS, Indian Achievers’ Award and MSME India honours for our work in digital trust.</p>
                <Link href="/about#awards" className="inline-flex min-h-[44px] items-center self-start border border-cream px-4 text-sm font-semibold hover:border-accent hover:text-accent">Learn more</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-normal text-accent">Careers</h3>
                <p className="text-muted">Join our engineers, researchers and auditors building post-quantum and AI-security products in Chennai.</p>
                <Link href="/careers" className="inline-flex min-h-[44px] items-center self-start border border-cream px-4 text-sm font-semibold hover:border-accent hover:text-accent">Explore jobs</Link>
              </div>
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
          <p className="max-w-[46ch] text-muted">Do you have a specific security challenge, interest in a career at YesPanchi, or just want to get in touch?</p>
          <Link href="/contact" className="mt-2 inline-flex min-h-[44px] items-center rounded-full border border-cream px-5 text-sm font-semibold hover:border-accent hover:text-accent">Let’s talk ›</Link>
        </div>
      </section>
    </>
  );
}
