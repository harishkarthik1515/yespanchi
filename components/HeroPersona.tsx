'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CipherField } from '@/components/heroFx';
import { Icon } from '@/components/Icon';

type IconName = Parameters<typeof Icon>[0]['name'];

const personas: {
  id: string; label: string; icon: IconName; headline: string; accent: string; risk: string;
  fixes: { name: string; href: string; icon: IconName }[]; cta: string; topic: string;
}[] = [
  {
    id: 'bank', label: 'Bank & Fintech', icon: 'card',
    headline: 'Your customers’ money moves on trust.', accent: 'Keep it unbreakable.',
    risk: 'Card data, payment APIs and RBI audits — and encrypted traffic that can be harvested today and decrypted by quantum computers tomorrow.',
    fixes: [
      { name: 'PCI DSS compliance', href: '/services/pci-dss', icon: 'card' },
      { name: 'QSecura PQ-SSL', href: '/products/qsecura-pq-ssl', icon: 'shield' },
      { name: 'VAPT for apps & APIs', href: '/services/vapt', icon: 'target' }
    ],
    cta: 'Get a PCI & PQ readiness review', topic: 'pci-dss'
  },
  {
    id: 'gov', label: 'Government', icon: 'board',
    headline: 'Citizen services can’t go dark.', accent: 'We keep them standing.',
    risk: 'Public portals are prime targets for defacement, data leaks and ransomware — and every incident becomes a headline.',
    fixes: [
      { name: 'IAAP audit', href: '/services/iaap-audit', icon: 'list' },
      { name: 'Cyber forensics', href: '/services/cyber-forensics', icon: 'search' },
      { name: 'Officer training', href: '/training', icon: 'graduation' }
    ],
    cta: 'Talk to our public-sector team', topic: 'government'
  },
  {
    id: 'ent', label: 'Enterprise', icon: 'chart',
    headline: 'Audits every quarter. Threats every minute.', accent: 'Automate both.',
    risk: 'ISO 27001 evidence, cloud misconfigurations and board-level questions about AI risk — handled by a stretched security team.',
    fixes: [
      { name: 'ISO 27001', href: '/services/iso-27001', icon: 'lock' },
      { name: 'BoardMind', href: '/products/boardmind', icon: 'board' },
      { name: 'AI Guardrails', href: '/products/ai-guardrails', icon: 'ai' }
    ],
    cta: 'Book a compliance gap assessment', topic: 'iso-27001'
  },
  {
    id: 'startup', label: 'Startup', icon: 'target',
    headline: 'Enterprise deals ask one question first:', accent: '“Are you secure?”',
    risk: 'Security questionnaires stall sales. One pentest report and a clear posture story can close the deal.',
    fixes: [
      { name: 'VAPT + re-test certificate', href: '/services/vapt', icon: 'target' },
      { name: 'Cyber insurance advisory', href: '/services/cyber-insurance', icon: 'umbrella' },
      { name: 'Secure dev training', href: '/training', icon: 'graduation' }
    ],
    cta: 'Get startup-friendly pricing', topic: 'startup'
  }
];

export function HeroPersona() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const p = personas[i];

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setTimeout(() => setI((x) => (x + 1) % personas.length), 6000);
    return () => clearTimeout(id);
  }, [i, auto]);

  return (
    <section aria-labelledby="hero2-title" className="relative overflow-hidden">
      <CipherField />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-bronze/10 blur-[130px]" />
      <div className="relative mx-auto max-w-site px-4 pb-24 pt-16 sm:px-6 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-bronze">Cybersecurity with a conscience — built for</p>
        <div role="tablist" aria-label="Choose your organisation" className="mt-5 flex flex-wrap gap-2">
          {personas.map((x, k) => (
            <button
              key={x.id} role="tab" aria-selected={k === i} onClick={() => { setI(k); setAuto(false); }}
              className={`relative inline-flex min-h-[44px] items-center gap-2 overflow-hidden rounded-full border px-5 text-sm font-semibold transition-colors ${k === i ? 'border-bronze bg-bronze text-ink' : 'border-line2 text-muted hover:border-bronze hover:text-cream'}`}
            >
              <Icon name={x.icon} size={16} /> {x.label}
              {k === i && auto && <span key={i} aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] bg-ink/40 [animation:grow_6s_linear_forwards]" />}
            </button>
          ))}
        </div>

        <div key={p.id} className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="min-w-0">
            <h1 id="hero2-title" className="text-[clamp(2.5rem,5.6vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
              {p.headline} <span className="sheen">{p.accent}</span>
            </h1>
            <p className="mt-6 max-w-[580px] text-lg text-muted">{p.risk}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/contact?topic=${p.topic}`} className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-bronze px-7 font-semibold text-ink hover:bg-bronze-light hover:text-ink">
                {p.cta} <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>

          <div className="spotlight min-w-0 rounded-3xl border border-line2 bg-surface/70 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-dim">What we’d do for you</p>
            <ol className="mt-4 flex flex-col gap-3">
              {p.fixes.map((f, k) => (
                <li key={f.name}>
                  <Link href={f.href} className="spotlight group flex items-center gap-4 rounded-2xl border border-line bg-ink/60 p-4 transition-transform hover:-translate-y-0.5 hover:border-bronze hover:text-cream">
                    <span className="font-mono text-xs text-bronze">0{k + 1}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-bronze/15 text-bronze"><Icon name={f.icon} size={20} /></span>
                    <span className="font-semibold">{f.name}</span>
                    <Icon name="arrow" size={16} className="ml-auto text-dim transition-transform group-hover:translate-x-1 group-hover:text-bronze" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink" />
    </section>
  );
}
