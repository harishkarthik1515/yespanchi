import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { awards, clients, stats, values } from '@/lib/data';
import { certifications, coreExpertise, industries, leadership } from '@/lib/mock/about';
import { Container, CtaBand, PageHero } from '@/components/ui';
import { Ticker } from '@/components/motion';
import { PillNav } from '@/components/home/kyndryl';
import { LeaderCards } from '@/components/about/LeaderCards';
import { Icon, type IconName } from '@/components/Icon';

export const metadata: Metadata = {
  title: { absolute: 'About YesPanchi | Cybersecurity, AI Governance and Post-Quantum Security' },
  description: 'Founded in 2021 in Chennai, YesPanchi Tech Services builds cybersecurity, AI governance and post-quantum security solutions for banks, governments and enterprises.',
  alternates: { canonical: '/about' }
};

const subnav = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'team', label: 'Leadership' },
  { id: 'industries', label: 'Industries' },
  { id: 'values', label: 'Values' },
  { id: 'awards', label: 'Recognition' }
];

const eyebrow = 'flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream';
const bar = <span aria-hidden="true" className="h-[3px] w-5 bg-accent" />;
const h2 = 'text-[clamp(2rem,3.2vw,3rem)] font-light leading-tight';

// Client asked to drop these four from the About "What we do" list (still shown in the nav's Expertise column).
const HIDDEN_EXPERTISE = ['Enterprise AI Platforms', 'Cybersecurity & Digital Trust', 'Corporate Governance Platforms', 'Enterprise Digital Transformation'];
const VALUE_ICONS: Record<string, IconName> = { Integrity: 'shield', Clarity: 'eye', Craftsmanship: 'badge', 'Continuous learning': 'graduation' };

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/media/about.jpg"
        crumbs={[{ name: 'About Us', href: '/about' }]}
        eyebrow="Revolution in Cyber Control"
        title="Architecting the future of AI Governance,"
        accent="quantum security & digital trust."
        lead="YesPanchi Group of Companies, a Chennai-based technology and innovation-driven organization focused on cybersecurity, digital forensics, AI, fintech, governance platforms, and emerging quantum-safe solutions. It works closely with BFSI & Fintech industry, and government ecosystems to build future-ready platforms, Centers of Excellence, and digital transformation initiatives across sectors."
      >
        <dl className="mt-6 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1.5 border-t border-white/30 pt-4">
              <dt className="order-2 text-sm text-white/75">{s.label}</dt>
              <dd className="order-1 text-[2.75rem] font-light leading-none text-white">{s.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <div className="relative">
        <PillNav items={subnav} />

        {/* Who we are: purpose statement, then vision & mission as plain columns */}
        <section id="who-we-are" aria-labelledby="who-h" className="pb-24 pt-32">
          <Container className="flex flex-col gap-16">
            <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
              <p className={eyebrow}>Who we are{bar}</p>
              <div className="flex max-w-[72ch] flex-col gap-6">
                <h2 id="who-h" className="max-w-[32ch] text-[clamp(1.75rem,2.8vw,2.6rem)] font-light leading-snug">
                  Founded in 2021, YesPanchi is a <span className="text-accent">women-led organisation</span> committed to advancing
                  intelligent security, automated compliance, and governance across enterprise ecosystems.
                </h2>
                <p className="text-lg leading-relaxed text-muted">
                  We empower organisations to navigate evolving digital complexities, strengthen their security posture, and
                  embrace innovation with confidence and responsibility. Through a strategic approach grounded in expertise,
                  integrity, and innovation, we enable enterprises to build resilient, compliant, and secure digital
                  foundations. At YesPanchi, we believe that responsible innovation and strong governance are fundamental to
                  sustainable growth and lasting trust.
                </p>
              </div>
            </div>
            <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-[300px_1fr_1fr]">
              <div className="relative hidden aspect-[3/4] overflow-hidden lg:block">
                <Image src="/media/team-office.jpg" alt="" fill sizes="300px" className="object-cover" />
              </div>
              {[
                { t: 'Our vision', d: 'To become a global leader in intelligent, secure, and trusted digital technologies by empowering enterprise organizations with cutting-edge AI, robust cybersecurity, post-quantum innovation, and transparent corporate governance.' },
                { t: 'Our mission', d: 'To build intelligent, secure, and future-ready digital ecosystems by developing world-class technology platforms that enable enterprises to innovate confidently through secure AI, quantum-safe infrastructure, intelligent automation, and responsible digital transformation.' }
              ].map((c) => (
                <div key={c.t} className="flex flex-col gap-4">
                  <h3 className="text-2xl font-normal text-accent">{c.t}</h3>
                  <p className="text-lg leading-relaxed text-muted">{c.d}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Expertise: numbered editorial list, no cards */}
        <section id="expertise" aria-labelledby="expertise-h" className="bg-surface py-24">
          <Container className="grid gap-12 lg:grid-cols-[300px_1fr]">
            <div className="flex flex-col gap-5 lg:sticky lg:top-40 lg:self-start">
              <p className={eyebrow}>What we do{bar}</p>
              <h2 id="expertise-h" className={h2}>Our core <span className="text-accent">expertise</span></h2>
              <p className="text-muted">Integrated capabilities across enterprise AI, AI security, quantum-ready cryptography, cybersecurity and FinTech.</p>
              <Link href="/products" className="text-sm font-semibold text-cream hover:text-accent">Explore our platforms ›</Link>
            </div>
            <ol className="grid gap-x-12 sm:grid-cols-2">
              {coreExpertise.filter((c) => !HIDDEN_EXPERTISE.includes(c.title)).map((c, i) => (
                <li key={c.title} className="flex gap-5 border-t border-line2 py-7">
                  <span aria-hidden="true" className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-normal">{c.title}</h3>
                    <p className="text-[15px] leading-relaxed text-muted">{c.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Leadership */}
        <section id="team" aria-labelledby="team-h" className="py-24">
          <Container className="flex flex-col gap-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex flex-col gap-5">
                <p className={eyebrow}>Leadership{bar}</p>
                <h2 id="team-h" className={h2}>Our <span className="text-accent">board</span></h2>
              </div>
              <Link href="/careers" className="text-sm font-semibold text-cream hover:text-accent">We’re hiring, see open roles ›</Link>
            </div>
            <LeaderCards leaders={leadership} />
          </Container>
        </section>

        {/* Industries: dark band, plain list */}
        <section id="industries" aria-labelledby="industries-h" className="theme-dark bg-[#0F1F38] py-24">
          <Container className="grid gap-12 lg:grid-cols-[300px_1fr]">
            <div className="flex flex-col gap-5">
              <p className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">Industry expertise<span aria-hidden="true" className="h-[3px] w-5 bg-[#7DB8E8]" /></p>
              <h2 id="industries-h" className={`${h2} text-white`}>Industries we <span className="text-[#7DB8E8]">empower</span></h2>
              <p className="text-white/70">Secure, intelligent technology for regulated industries, critical infrastructure and enterprises in transformation.</p>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
              {industries.slice(0, 6).map((name, i) => (
                <li key={name} className="flex items-baseline gap-4 border-t border-white/15 py-5 text-lg text-white">
                  <span aria-hidden="true" className="font-mono text-xs text-[#7DB8E8]">{String(i + 1).padStart(2, '0')}</span>
                  {name}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Values: outlined numerals */}
        <section id="values" aria-labelledby="values-h" className="py-24">
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col gap-5">
              <p className={eyebrow}>What Inspires Us{bar}</p>
              <h2 id="values-h" className={h2}>Our core <span className="text-accent">values</span></h2>
            </div>
            <ul className="grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <li key={v.title} className="group flex flex-col gap-4">
                  <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-contrast">
                    <Icon name={VALUE_ICONS[v.title] ?? 'check'} size={30} />
                  </span>
                  <h3 className="text-2xl font-normal">{v.title}</h3>
                  <p className="text-muted">{v.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Recognition: real award photos, then certifications */}
        <section id="awards" aria-labelledby="awards-h" className="bg-surface py-24">
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col gap-5">
              <p className={eyebrow}>Recognition{bar}</p>
              <h2 id="awards-h" className={h2}>A Reputation for Excellence, <span className="text-accent">A Legacy of Trust</span></h2>
            </div>
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {awards.map((a) => (
                <li key={a.title} className="group flex flex-col gap-4">
                  <span className="relative block aspect-[4/3] overflow-hidden bg-raised">
                    <Image src={a.image} alt={`${a.title} | ${a.by}, ${a.year}`} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </span>
                  <span className="flex flex-col gap-1 border-l-[3px] border-accent pl-4">
                    <span className="text-lg font-medium text-cream">{a.title}</span>
                    <span className="text-sm text-muted">{a.by} · {a.year}</span>
                  </span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-8 text-sm text-muted">
              {certifications.map((c) => (
                <li key={c} className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />{c}</li>
              ))}
            </ul>
          </Container>
        </section>

        <section aria-labelledby="clients-h" className="py-16">
          <h2 id="clients-h" className="mx-auto mb-8 w-full max-w-wide px-6 text-2xl font-normal">Trusted by government, enterprise &amp; startups</h2>
          <Ticker items={clients} />
        </section>
      </div>

      <CtaBand />
    </>
  );
}
