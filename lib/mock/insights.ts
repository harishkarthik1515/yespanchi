// YesPanchi Insights: Ideas · Intelligence · Innovation.
// Four subsections, each with its own reading experiences, plus shared experiences on the landing page.
// SAMPLE: every item below is a placeholder; replace with real publications before launch.
import type { IconName } from '@/components/Icon';
import { caseStudies } from './home';

export type InsightType = {
  slug: 'white-papers' | 'newsletters' | 'blogs' | 'case-studies'; // newsletters/case-studies kept for type compat but not shown in nav
  title: string;
  icon: IconName;
  desc: string;
  image: string;
  experiences: { id: string; title: string; desc: string }[];
};

// Per content doc: Insights has White Papers and Blogs only. Newsletters + Case Studies kept for type compat.
export const insightTypes: InsightType[] = [
  {
    slug: 'white-papers', title: 'White Papers', icon: 'doc', image: '/media/white-papers.jpg',
    desc: 'In-depth research on post-quantum security, AI governance and payment infrastructure, readable as a flipbook.',
    experiences: [
      { id: 'flipbook', title: 'Flipbook', desc: 'Turn the pages of the paper right in your browser.' },
      { id: 'all-white-papers', title: 'All white papers', desc: 'Every white paper in one place. Search, or filter by topic and year.' }
    ]
  },
  {
    slug: 'blogs', title: 'Blogs', icon: 'list', image: '/media/analyst.jpg',
    desc: 'Practical, plain-language posts from our engineers, auditors and researchers.',
    experiences: [
      { id: 'all-blogs', title: 'All blogs', desc: 'Every post in one place. Filter by the topics you care about.' }
    ]
  },
  // kept for routing/type compat:not shown in Insights nav
  {
    slug: 'newsletters', title: 'Newsletters', icon: 'mail', image: '/media/viz-lines.jpg',
    desc: 'Security Briefings, our monthly digital magazine on threats, regulation and product news.',
    experiences: [
      { id: 'digital-magazine', title: 'Digital Magazine', desc: 'Each issue laid out like a magazine.' },
      { id: 'storytelling', title: 'Storytelling', desc: 'The months big story, told in chapters.' }
    ]
  },
  {
    slug: 'case-studies', title: 'Case Studies', icon: 'target', image: '/media/team-meeting.jpg',
    desc: 'Client stories from banking, government and manufacturing, the problem, the build and the results.',
    experiences: [
      { id: 'solution-journey', title: 'Solution Journey', desc: 'Follow an engagement from first call to results.' },
      { id: 'architecture-explorer', title: 'Architecture Explorer', desc: 'Click through the architecture we deployed.' }
    ]
  }
];

export const topics = ['Post-quantum', 'AI governance', 'Payments security', 'VAPT & testing', 'Compliance', 'Data privacy'] as const;
export type Topic = (typeof topics)[number];

export type InsightItem = {
  slug: string;
  type: InsightType['slug'];
  title: string;
  date: string;
  excerpt: string;
  image: string;
  topic: Topic;
  read: number;
  author: string;
};

// SAMPLE
export const insightItems: InsightItem[] = ([
  { slug: 'technology-outlook-2026', type: 'white-papers', title: 'Technology Outlook 2026: security, AI and the quantum clock', date: '2026-11-03', excerpt: 'Our yearly view of cybersecurity, AI and quantum trends, and what Indian enterprises should prepare for next.', image: '/media/insights.jpg', topic: 'Post-quantum', read: 18, author: 'YesPanchi Research' },
  { slug: 'security-briefings-nov-2026', type: 'newsletters', title: 'Security Briefings: November 2026', date: '2026-11-01', excerpt: 'Harvest-now-decrypt-later goes mainstream, CERT-In new reporting window, and YP-PRAKAAR latest release.', image: '/media/viz-lines.jpg', topic: 'Post-quantum', read: 9, author: 'Editorial team' },
  { slug: 'pqc-payment-infrastructure', type: 'white-papers', title: 'Planning a post-quantum migration for payment infrastructure', date: '2026-10-28', excerpt: 'Inventory, prioritisation and a hybrid rollout path for regulated financial systems.', image: '/media/hero-quantum.jpg', topic: 'Payments security', read: 22, author: 'Post-quantum lab' },
  { slug: 'pqc-migration-checklist-2027', type: 'blogs', title: 'A practical PQC migration checklist for Indian banks in 2027', date: '2026-10-14', excerpt: 'Inventory, prioritise, go hybrid, and the three mistakes we see most often in early pilots.', image: '/media/viz-cube.jpg', topic: 'Post-quantum', read: 8, author: 'Meera Raman' },
  { slug: 'ml-kem-ml-dsa-plain-language', type: 'blogs', title: 'ML-KEM and ML-DSA in plain language', date: '2026-10-07', excerpt: 'What the two NIST post-quantum standards do, and where each one fits in your stack.', image: '/media/data-transfer.jpg', topic: 'Post-quantum', read: 6, author: 'Meera Raman' },
  { slug: 'security-briefings-oct-2026', type: 'newsletters', title: 'Security Briefings: October 2026', date: '2026-10-01', excerpt: 'UPI fraud patterns, DPDP rules in force, and what boards are asking about AI risk.', image: '/media/tablet-shield.jpg', topic: 'Data privacy', read: 8, author: 'Editorial team' },
  { slug: 'dpdp-act-ai-agents', type: 'blogs', title: 'What the DPDP Act means for your AI agents', date: '2026-09-29', excerpt: 'Consent, purpose limitation and logging, translated into controls your engineering team can build.', image: '/media/hero-ai.jpg', topic: 'Data privacy', read: 6, author: 'Farhan Ali' },
  { slug: 'pqc-readiness-bfsi', type: 'white-papers', title: 'PQC readiness of Indian BFSI', date: '2026-09-22', excerpt: 'Where banks and insurers stand on crypto-inventory and migration planning, from 40 interviews.', image: '/media/viz-chip.jpg', topic: 'Post-quantum', read: 16, author: 'YesPanchi Research' },
  { slug: 'vapt-reports-boards-read', type: 'blogs', title: 'Writing VAPT reports that boards actually read', date: '2026-09-08', excerpt: 'Risk in rupees, not CVSS scores: how we restructured our reporting after 200+ engagements.', image: '/media/analyst.jpg', topic: 'VAPT & testing', read: 5, author: 'Arvind Kumar' },
  { slug: 'security-briefings-sep-2026', type: 'newsletters', title: 'Security Briefings: September 2026', date: '2026-09-01', excerpt: 'Ransomware in manufacturing, PCI DSS 4.0 deadlines, and a new MoU for skilling.', image: '/media/viz-chip.jpg', topic: 'Compliance', read: 7, author: 'Editorial team' },
  { slug: 'harvest-now-decrypt-later', type: 'blogs', title: 'Harvest now, decrypt later explained', date: '2026-09-15', excerpt: 'Why attackers are recording encrypted data today and what organisations can do to stay ahead of future decryption.', image: '/media/viz-chip.jpg', topic: 'Post-quantum', read: 7, author: 'YesPanchi Research' },
  { slug: 'how-to-prepare-vapt', type: 'blogs', title: 'How to prepare for a VAPT', date: '2026-09-05', excerpt: 'What to expect from a vulnerability assessment and penetration test, and how to get the most useful report from it.', image: '/media/tablet-shield.jpg', topic: 'VAPT & testing', read: 6, author: 'Arvind Kumar' },
  { slug: 'iso-27001-10-steps', type: 'blogs', title: 'ISO 27001 in 10 simple steps', date: '2026-08-20', excerpt: 'A plain-language walkthrough of what ISO 27001 certification involves and where most organisations get stuck.', image: '/media/team-office.jpg', topic: 'Compliance', read: 8, author: 'Compliance practice' },
  { slug: 'five-signs-payment-stack-not-quantum-ready', type: 'blogs', title: 'Five signs your payment stack is not quantum-ready', date: '2026-08-10', excerpt: 'Practical indicators that your cryptographic infrastructure needs attention before the post-quantum transition.', image: '/media/data-transfer.jpg', topic: 'Post-quantum', read: 5, author: 'Post-quantum lab' },
  { slug: 'upi-security-what-auditors-check', type: 'blogs', title: 'UPI security: what auditors check first', date: '2026-07-28', excerpt: 'The controls and evidence that security auditors focus on when reviewing a UPI-connected system.', image: '/media/analyst.jpg', topic: 'Payments security', read: 6, author: 'Arvind Kumar' },
  { slug: 'ai-agents-data-protection', type: 'blogs', title: 'AI agents and data protection: a plain-language guide', date: '2026-07-15', excerpt: 'How the DPDP Act applies to organisations deploying AI agents, in plain terms for technology and compliance teams.', image: '/media/hero-ai.jpg', topic: 'Data privacy', read: 7, author: 'Farhan Ali' },
  { slug: 'pci-dss-4-what-changed', type: 'blogs', title: 'PCI DSS 4.x: what changed and what to do', date: '2026-07-02', excerpt: 'The key requirements that shifted in PCI DSS 4.0 and 4.0.1, and a practical action list for payment-handling organisations.', image: '/media/viz-lines.jpg', topic: 'Compliance', read: 9, author: 'Compliance practice' },
  { slug: 'cryptographic-agility', type: 'blogs', title: 'Why cryptographic agility matters', date: '2026-06-18', excerpt: 'What it means to build systems that can swap cryptographic algorithms without a rewrite, and why that is now a business requirement.', image: '/media/viz-cube.jpg', topic: 'Post-quantum', read: 7, author: 'Post-quantum lab' },
  { slug: 'cyber-insurance-2026', type: 'blogs', title: 'Cyber insurance: what insurers ask for in 2026', date: '2026-06-05', excerpt: 'The technical evidence and security controls that underwriters and brokers now require before quoting a cyber policy.', image: '/media/consultant.jpg', topic: 'Compliance', read: 6, author: 'YesPanchi Research' },
  { slug: 'self-healing-ai-agents', type: 'blogs', title: 'Designing self-healing AI agents', date: '2026-08-30', excerpt: 'Failure detection, state reconstruction and recovery patterns from our platform team.', image: '/media/viz-chip.jpg', topic: 'AI governance', read: 9, author: 'Platform team' },
  { slug: 'ai-governance-dpdp', type: 'white-papers', title: 'Governing enterprise AI under the DPDP Act', date: '2026-08-18', excerpt: 'A control framework for consent, model risk and auditability that maps to Indian regulation.', image: '/media/consultant.jpg', topic: 'AI governance', read: 20, author: 'Governance practice' },
  ...caseStudies.map((c, i) => ({
    slug: ['upi-stack-rbi-audit', 'citizen-portal-pq-tls', 'textile-iso-27001'][i],
    type: 'case-studies' as const,
    title: c.title,
    date: ['2026-08-26', '2026-07-14', '2026-06-02'][i],
    excerpt: c.summary,
    image: ['/media/team-meeting.jpg', '/media/hero-defence.jpg', '/media/story-textile.jpg'][i],
    topic: (['Payments security', 'Post-quantum', 'Compliance'] as const)[i],
    read: 7,
    author: `${c.sector} practice`
  }))
] as InsightItem[]).sort((a, b) => b.date.localeCompare(a.date));

export const typeOf = (slug: string) => insightTypes.find((t) => t.slug === slug)!;

/* ---------- Experience content (SAMPLE) ---------- */

/* White paper rendered in the Flipbook: one entry per page (left/right pages pair into spreads). */
type FlipPage =
  | { kind: 'cover'; heading: string; body: string; image: string }
  | { kind: 'text'; heading: string; lede: string; body: string[]; pull?: string }
  | { kind: 'stat'; heading: string; body: string; image: string }
  | { kind: 'back'; heading: string; body: string };

export const flipbook: { title: string; pages: FlipPage[] } = {
  title: 'Planning a post-quantum migration for payment infrastructure',
  pages: [
    { kind: 'cover', heading: 'Post-Quantum Payments', body: 'A migration playbook for regulated financial systems · YesPanchi Research · 2026', image: '/media/hero-quantum.jpg' },
    { kind: 'text', heading: 'Why now', lede: 'Data captured today can be decrypted tomorrow.', body: ['Once a large quantum computer exists, today’s RSA and elliptic-curve key exchanges can be broken. Attackers do not need to wait: traffic recorded now can be stored and decrypted later, "harvest now, decrypt later".', 'For payment systems that keep settlement and customer records for ten years or more, the migration window has already opened. NIST finalised ML-KEM and ML-DSA in 2024, and regulators are now asking banks for crypto-inventories and timelines.'], pull: 'The migration window has already opened.' },
    { kind: 'stat', heading: '81%', body: 'of the Indian BFSI organisations we interviewed have no written post-quantum migration plan.', image: '/media/data-transfer.jpg' },
    { kind: 'text', heading: 'Step 1: Inventory', lede: 'You cannot migrate what you cannot see.', body: ['Map every place cryptography lives: TLS endpoints, HSMs, card tokenisation, signing services, VPNs and partner APIs. Record the algorithm, key length, owner and data lifetime for each.', 'Most banks we work with find three to five times more endpoints than their CMDB lists. Automated discovery across network scans, certificate stores and code repositories closes the gap.'] },
    { kind: 'text', heading: 'Step 2: Prioritise', lede: 'Rank by data lifetime and exposure.', body: ['Long-lived, internet-facing data moves first: customer PII, settlement records and signed documents. Short-lived session data can follow later.', 'Score each system on how long its data must stay confidential, how exposed it is, and how hard it is to change. The result is a sequenced roadmap your board can approve.'], pull: 'Long-lived, internet-facing data moves first.' },
    { kind: 'text', heading: 'Step 3: Go hybrid', lede: 'Classical and post-quantum, side by side.', body: ['Hybrid TLS combines a classical key exchange (X25519) with ML-KEM. Every client keeps working, and the connection is protected even if one of the two algorithms is later broken.', 'In our production tests on payment gateways, hybrid handshakes added a median of under 4 ms, well inside existing latency budgets.'] },
    { kind: 'stat', heading: '< 4 ms', body: 'median added handshake latency with hybrid ML-KEM + X25519 on production payment gateways.', image: '/media/viz-chip.jpg' },
    { kind: 'text', heading: 'What good looks like', lede: 'Crypto-agility is the real goal.', body: ['A living crypto-inventory, crypto-agile libraries that swap algorithms without rewrites, hybrid TLS on all external endpoints, and a board-approved roadmap with dates.', 'QSecura PQ-SSL brings quantum-safe TLS to websites and mobile apps, covering the last mile of the migration. YP-RAKSHA keeps continuous watch over your exposure and audit readiness as you transition.'] },
    { kind: 'back', heading: 'YesPanchi Research', body: 'IIT Madras Research Park, Chennai · hello@yespanchi.com · Request the full paper and a 30-minute briefing with our post-quantum lab.' }
  ]
};


export const magazine = {
  issue: 'Issue 12 · November 2026',
  cover: { title: 'The quantum clock is ticking', image: '/media/hero-quantum.jpg' },
  features: [
    { kicker: 'Threat round-up', title: 'Harvest now, decrypt later goes mainstream', text: 'Why attackers are stockpiling encrypted traffic, and which data is worth protecting first.' },
    { kicker: 'Regulation', title: 'CERT-In’s six-hour window, one year on', text: 'What incident reporting looks like in practice and how to stay inside the window.' },
    { kicker: 'Product news', title: 'YP-PRAKAAR adds MCP connectors', text: 'Bring compatible AI tools into your governed enterprise workspace.' },
    { kicker: 'Events', title: 'Quantum-Safe India Summit, 4 December', text: 'Leaders from banking and government on preparing for post-quantum security.' }
  ]
};

export const story = {
  title: 'Anatomy of a UPI fraud, and how it was stopped',
  chapters: [
    { title: '02:14 · The first signal', text: 'A spike of small collect requests from newly registered handles hits a co-operative bank’s gateway.', image: '/media/hero-defence.jpg' },
    { title: '02:31 · Pattern found', text: 'Behavioural rules link 38 handles to the same device fingerprints. The SOC escalates.', image: '/media/analyst.jpg' },
    { title: '03:05 · Contained', text: 'Handles are frozen and the gateway tightens velocity limits. Customer loss: zero.', image: '/media/data-transfer.jpg' },
    { title: 'Next day · Lessons', text: 'The bank adds device binding and runs a targeted awareness drive in Tamil and English.', image: '/media/team-meeting.jpg' }
  ]
};


/* Solution Journey: one engagement, step by step. */
export const journey = {
  title: 'Cooperative bank hardens its UPI stack ahead of an RBI audit',
  steps: [
    { phase: 'Challenge', text: 'Nine microservices, Android and iOS apps and a core-banking bridge, with an RBI audit in five weeks.' },
    { phase: 'Discover', text: 'A 30-minute call, then scoping workshops with the bank’s IT and compliance teams.' },
    { phase: 'Assess', text: 'Black-box and grey-box VAPT across mobile, API gateway and core integration: 47 findings, 6 critical.' },
    { phase: 'Harden', text: 'Fixes paired with developers sprint by sprint; device binding and velocity limits added on the gateway.' },
    { phase: 'Assure', text: 'Re-test with zero criticals and an evidence pack mapped to RBI controls.' }
  ],
  results: caseStudies[0].metrics
};

/* Architecture Explorer: components of the hybrid PQ-TLS rollout. */
export const architecture = [
  { id: 'users', label: 'Citizens & apps', x: 8, y: 50, text: '2.3M monthly users on browsers and mobile apps. No client changes required, hybrid TLS negotiates down safely.' },
  { id: 'edge', label: 'QSecura PQ-SSL edge', x: 32, y: 50, text: 'Terminates hybrid ML-KEM + X25519 TLS. Certificates and keys are managed centrally with automatic rotation.' },
  { id: 'gateway', label: 'API gateway', x: 56, y: 28, text: 'Routes traffic to 160+ internal endpoints; mutual TLS between services, with crypto-agile libraries.' },
  { id: 'inventory', label: 'Crypto-inventory', x: 56, y: 74, text: 'A live map of every certificate, algorithm and key, used to plan and verify the staged rollout.' },
  { id: 'services', label: 'Portal services', x: 80, y: 28, text: 'Citizen-service microservices. Migrated in four waves with 99.98% uptime.' },
  { id: 'hsm', label: 'HSM & signing', x: 80, y: 74, text: 'Hardware security modules hold the keys; ML-DSA signing for documents issued by the portal.' }
];
export const architectureLinks = [['users', 'edge'], ['edge', 'gateway'], ['edge', 'inventory'], ['gateway', 'services'], ['inventory', 'hsm'], ['services', 'hsm']] as const;

/* Technology Radar: where we stand on each technology. */
export const radar = [
  { name: 'Hybrid PQ-TLS', ring: 'Adopt', quad: 0 }, { name: 'ML-KEM', ring: 'Adopt', quad: 0 }, { name: 'ML-DSA signing', ring: 'Trial', quad: 0 }, { name: 'QKD networks', ring: 'Hold', quad: 0 },
  { name: 'Private LLMs', ring: 'Adopt', quad: 1 }, { name: 'RAG with guardrails', ring: 'Adopt', quad: 1 }, { name: 'Agentic workflows', ring: 'Trial', quad: 1 }, { name: 'Autonomous agents in prod', ring: 'Assess', quad: 1 },
  { name: 'Zero Trust access', ring: 'Adopt', quad: 2 }, { name: 'Continuous VAPT', ring: 'Trial', quad: 2 }, { name: 'Passkeys', ring: 'Trial', quad: 2 }, { name: 'SMS OTP only', ring: 'Hold', quad: 2 },
  { name: 'DPDP consent logs', ring: 'Adopt', quad: 3 }, { name: 'Compliance as code', ring: 'Trial', quad: 3 }, { name: 'AI model registry', ring: 'Assess', quad: 3 }, { name: 'Annual-only audits', ring: 'Hold', quad: 3 }
] as const;
export const radarQuads = ['Cryptography', 'Enterprise AI', 'Security operations', 'Governance & compliance'];
export const radarRings = ['Adopt', 'Trial', 'Assess', 'Hold'] as const;
