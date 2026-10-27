/**
 * Site content.
 * Items marked SAMPLE are placeholder/dummy content for the prototype —
 * replace with real copy before launch.
 */
import type { IconName } from '@/components/Icon';

/* ---------------- Products ---------------- */
export type Product = {
  slug: string;
  name: string;
  tag: string;
  short: string;
  description: string;
  icon: IconName;
  logo?: string;
  isNew?: boolean;
  externalUrl?: string;
  builtFor: string[];
  features: { title: string; text: string }[]; // SAMPLE
  useCases: string[]; // SAMPLE
};

export const products: Product[] = [
  {
    slug: 'qsecura-pq-ssl',
    name: 'QSecura PQ-SSL',
    tag: 'Post-quantum SSL',
    short: 'Post-quantum SSL',
    description:
      'Post-quantum SSL that keeps encrypted traffic safe against tomorrow’s quantum attacks — deployable on today’s infrastructure.',
    icon: 'shield',
    logo: '/qsecura-shield.png',
    isNew: true,
    externalUrl: 'https://qsecura.com',
    builtFor: ['Websites & APIs', 'Regulated enterprises', 'Long-lived sensitive data'],
    features: [
      { title: 'Hybrid handshake', text: 'Classical + post-quantum key exchange for safe, gradual migration.' },
      { title: 'Drop-in deployment', text: 'Works with common web servers and load balancers.' },
      { title: 'Crypto inventory', text: 'Discover where vulnerable algorithms live in your estate.' },
      { title: 'Compliance ready', text: 'Aligns with emerging PQC guidance from standards bodies.' }
    ],
    useCases: ['Banking & payments portals', 'Government citizen services', 'Healthcare data exchange']
  },
  {
    slug: 'quantik',
    name: 'Quantik',
    tag: 'Post-quantum security',
    short: 'Post-quantum security',
    description:
      'A cryptographic agility engine built on post-quantum cryptography (PQC) for securing payments and data.',
    icon: 'key',
    builtFor: ['Payments & fintech', 'Cryptographic agility', 'PQC migration'],
    features: [
      { title: 'Algorithm agility', text: 'Swap cryptographic primitives without rewriting applications.' },
      { title: 'PQC library', text: 'Standardised post-quantum algorithms, ready to integrate.' },
      { title: 'Key lifecycle', text: 'Generation, rotation and revocation from one console.' },
      { title: 'Audit trail', text: 'Tamper-evident logs for every cryptographic operation.' }
    ],
    useCases: ['Payment switches', 'Digital identity', 'Secure document signing']
  },
  {
    slug: 'boardmind',
    name: 'BoardMind',
    tag: 'AI governance & board intelligence',
    short: 'AI governance & board intelligence',
    description:
      'The AI governance platform for enterprise boards, executive directors and compliance teams.',
    icon: 'board',
    builtFor: ['Boards & directors', 'Compliance teams', 'Corporate governance'],
    features: [
      { title: 'Board packs, summarised', text: 'AI briefs that surface risks, decisions and open actions.' },
      { title: 'Policy tracking', text: 'Map board resolutions to policies and owners.' },
      { title: 'Risk radar', text: 'Continuous view of regulatory and cyber risk.' },
      { title: 'Secure by design', text: 'Role-based access and full audit history.' }
    ],
    useCases: ['Listed companies', 'Public sector boards', 'Audit committees']
  },
  {
    slug: 'alexi-voice',
    name: 'Alexi Voice',
    tag: 'Voice AI & automation',
    short: 'Voice AI & automation',
    description:
      'An autonomous, human-like voice AI agent for multilingual customer interactions, lead qualification and automated workflow triggers.',
    icon: 'mic',
    builtFor: ['Customer support', 'Lead qualification', 'Workflow automation'],
    features: [
      { title: 'Multilingual', text: 'Natural conversations in English and Indian languages.' },
      { title: 'Lead intelligence', text: 'Qualify, score and route leads automatically.' },
      { title: 'Workflow triggers', text: 'Create tickets, bookings and CRM updates from calls.' },
      { title: '24×7 availability', text: 'Answer every call, every time.' }
    ],
    useCases: ['Inbound support desks', 'Sales follow-ups', 'Appointment booking']
  },
  {
    slug: 'ai-guardrails',
    name: 'AI Guardrails',
    tag: 'AI runtime governance',
    short: 'AI runtime governance',
    description:
      'Runtime governance and policy enforcement for autonomous, multi-agent AI systems.',
    icon: 'rail',
    builtFor: ['AI platform teams', 'Risk & compliance', 'Regulated AI use'],
    features: [
      { title: 'Policy enforcement', text: 'Block unsafe prompts, outputs and tool calls in real time.' },
      { title: 'Agent oversight', text: 'Trace every step of multi-agent workflows.' },
      { title: 'Data protection', text: 'Detect and redact sensitive data before it leaves.' },
      { title: 'Evidence for audits', text: 'Exportable logs for regulators and auditors.' }
    ],
    useCases: ['Enterprise copilots', 'Customer-facing chatbots', 'Agentic automation']
  },
  {
    slug: 'unifai',
    name: 'UNIFAI',
    tag: 'Enterprise AI',
    short: 'Enterprise AI',
    description: 'A unified enterprise AI platform that brings your organisation’s AI under one roof.',
    icon: 'ai',
    builtFor: ['Enterprise AI teams', 'Unified AI operations', 'Secure adoption'],
    features: [
      { title: 'One workspace', text: 'Models, data and apps managed in one place.' },
      { title: 'Private by default', text: 'Deploy on your cloud or on-premise.' },
      { title: 'Connectors', text: 'Plug into ERP, CRM and document stores.' },
      { title: 'Usage insights', text: 'Track adoption, cost and value across teams.' }
    ],
    useCases: ['Knowledge assistants', 'Document automation', 'Analytics copilots']
  }
];

/* ---------------- Services ---------------- */
export type Service = {
  slug: string;
  name: string;
  division: 'General services' | 'Audit services';
  icon: IconName;
  summary: string;
  deliverables: string[]; // SAMPLE
  process: string[]; // SAMPLE
};

export const services: Service[] = [
  { slug: 'ai-movie-clips', name: 'AI Movie Clips', division: 'General services', icon: 'film', summary: 'AI-generated video and marketing clips for launches, campaigns and training.', deliverables: ['Script & storyboard', 'AI-generated scenes', 'Voice-over & captions', 'Social-ready cuts'], process: ['Brief', 'Storyboard', 'Generate', 'Review', 'Deliver'] },
  { slug: 'digital-marketing', name: 'Digital Marketing', division: 'General services', icon: 'chart', summary: 'Performance marketing, SEO and content that turns attention into pipeline.', deliverables: ['SEO audit & roadmap', 'Paid campaigns', 'Content calendar', 'Monthly reporting'], process: ['Audit', 'Strategy', 'Launch', 'Optimise', 'Report'] },
  { slug: 'cyber-forensics', name: 'Cyber Forensic Services', division: 'General services', icon: 'search', summary: 'Evidence-grade investigation of breaches, fraud and insider incidents.', deliverables: ['Evidence acquisition', 'Timeline reconstruction', 'Root-cause analysis', 'Expert report'], process: ['Contain', 'Acquire', 'Analyse', 'Report', 'Testify'] },
  { slug: 'cyber-insurance', name: 'Cyber Insurance', division: 'General services', icon: 'umbrella', summary: 'Risk assessment and advisory to get the right cyber cover at the right premium.', deliverables: ['Risk questionnaire support', 'Control gap report', 'Insurer readiness pack', 'Claims support'], process: ['Assess', 'Remediate', 'Submit', 'Renew'] },
  { slug: 'iaap-audit', name: 'IAAP Audit', division: 'Audit services', icon: 'list', summary: 'Structured information assurance audits against your policies and regulators.', deliverables: ['Scope & control matrix', 'Fieldwork', 'Findings report', 'Remediation plan'], process: ['Scope', 'Fieldwork', 'Report', 'Re-test'] },
  { slug: 'vapt', name: 'VAPT', division: 'Audit services', icon: 'target', summary: 'Vulnerability Assessment & Penetration Testing for apps, networks, cloud and mobile.', deliverables: ['Automated + manual testing', 'Exploit validation', 'Risk-rated findings', 'Re-test certificate'], process: ['Scope', 'Recon', 'Exploit', 'Report', 'Re-test'] },
  { slug: 'forensic-audit', name: 'Forensic Audit Services', division: 'Audit services', icon: 'doc', summary: 'Financial and digital forensic audits to uncover fraud and misconduct.', deliverables: ['Transaction analysis', 'Data analytics', 'Interviews support', 'Forensic report'], process: ['Plan', 'Collect', 'Analyse', 'Report'] },
  { slug: 'iso-27001', name: 'ISO 27001', division: 'Audit services', icon: 'lock', summary: 'Gap assessment, implementation support and internal audits for ISO/IEC 27001.', deliverables: ['Gap assessment', 'ISMS documentation', 'Internal audit', 'Certification support'], process: ['Gap', 'Implement', 'Audit', 'Certify'] },
  { slug: 'pci-dss', name: 'PCI DSS', division: 'Audit services', icon: 'card', summary: 'PCI DSS readiness, scoping and compliance audits for card-data environments.', deliverables: ['CDE scoping', 'Readiness assessment', 'Remediation guidance', 'Compliance reporting'], process: ['Scope', 'Assess', 'Remediate', 'Validate'] }
];

/* Home page service tabs */
export const serviceAreas = [
  { name: 'Cyber Defense', tag: 'Detect · Respond · Recover', href: '/services/cyber-forensics', desc: 'Advanced threat detection, incident response and enterprise-grade security operations that keep critical systems running.', points: ['Threat detection & monitoring', 'Incident response', 'Cloud security', 'Security operations'] },
  { name: 'Security Audits', tag: 'Audit · Assess · Comply', href: '/services/vapt', desc: 'VAPT, compliance audits and vulnerability assessments tailored to your industry and regulators.', points: ['VAPT', 'ISO 27001 audit', 'PCI-DSS audit', 'Vulnerability assessment'] },
  { name: 'AI & Automation', tag: 'Automate · Transform', href: '/services/ai-movie-clips', desc: 'Intelligent automation, AI-powered workflows and digital transformation consulting.', points: ['AI-powered workflows', 'Digital transformation', 'IT consulting', 'AI video marketing'] },
  { name: 'Corporate Training', tag: 'Upskill · Certify', href: '/training', desc: 'Upskill your workforce in AI, cybersecurity, blockchain and quantum technologies.', points: ['Artificial intelligence', 'Cyber security', 'Blockchain', 'Quantum technologies'] }
];

/* ---------------- Training (SAMPLE programs) ---------------- */
export type Program = {
  slug: string;
  title: string;
  track: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  mode: string;
  audience: string;
  summary: string;
  modules: string[];
};

export const programs: Program[] = [
  { slug: 'certified-ethical-hacking-bootcamp', title: 'Ethical Hacking Bootcamp', track: 'Cyber Security', level: 'Intermediate', duration: '6 weeks', mode: 'Hybrid', audience: 'Professionals', summary: 'Hands-on offensive security: recon, exploitation and reporting in live labs.', modules: ['Recon & OSINT', 'Web app attacks', 'Network exploitation', 'Privilege escalation', 'Reporting'] },
  { slug: 'ai-for-business-leaders', title: 'AI for Business Leaders', track: 'Artificial Intelligence', level: 'Beginner', duration: '2 days', mode: 'In-person', audience: 'Enterprises', summary: 'Strategy, risk and ROI of AI adoption for decision makers.', modules: ['AI fundamentals', 'Use-case discovery', 'Governance & risk', 'Build vs buy', 'Roadmapping'] },
  { slug: 'post-quantum-cryptography-essentials', title: 'Post-Quantum Cryptography Essentials', track: 'Quantum Technologies', level: 'Advanced', duration: '3 weeks', mode: 'Online', audience: 'Professionals', summary: 'Understand quantum threats and plan your migration to PQC.', modules: ['Quantum threat model', 'PQC algorithms', 'Crypto inventory', 'Hybrid TLS', 'Migration planning'] },
  { slug: 'blockchain-developer-foundations', title: 'Blockchain Developer Foundations', track: 'Blockchain', level: 'Beginner', duration: '4 weeks', mode: 'Online', audience: 'Students', summary: 'Smart contracts, wallets and dApps from first principles.', modules: ['Ledgers & consensus', 'Solidity basics', 'Wallets & keys', 'dApp project', 'Security pitfalls'] },
  { slug: 'digital-forensics-investigation', title: 'Digital Forensics & Investigation', track: 'Digital Investigation', level: 'Intermediate', duration: '5 weeks', mode: 'Hybrid', audience: 'Professionals', summary: 'Acquire, analyse and present digital evidence that stands up.', modules: ['Evidence handling', 'Disk & memory forensics', 'Mobile forensics', 'Log analysis', 'Expert reporting'] },
  { slug: 'secure-enterprise-development', title: 'Secure Enterprise Development', track: 'Enterprise Development', level: 'Intermediate', duration: '4 weeks', mode: 'Online', audience: 'Enterprises', summary: 'Build secure software with DevSecOps from day one.', modules: ['Threat modelling', 'OWASP Top 10', 'Secure CI/CD', 'Secrets management', 'Code review'] }
];

/* ---------------- Events (SAMPLE) ---------------- */
export type EventItem = {
  slug: string;
  title: string;
  date: string; // ISO
  city: string;
  venue: string;
  type: 'Conference' | 'Workshop' | 'Webinar' | 'Summit';
  summary: string;
  agenda: string[];
};

export const events: EventItem[] = [
  { slug: 'quantum-safe-india-summit-2026', title: 'Quantum-Safe India Summit 2026', date: '2026-12-04', city: 'Chennai', venue: 'IITM Research Park', type: 'Summit', summary: 'Leaders from banking, government and tech on preparing India for post-quantum security.', agenda: ['Keynote: the quantum clock', 'Panel: PQC in payments', 'Live demo: QSecura PQ-SSL', 'Networking'] },
  { slug: 'vapt-masterclass-nov-2026', title: 'VAPT Masterclass', date: '2026-11-20', city: 'Online', venue: 'Zoom', type: 'Webinar', summary: 'A practical walkthrough of a real-world penetration test, from scope to report.', agenda: ['Scoping a test', 'Live exploitation', 'Writing a great report', 'Q&A'] },
  { slug: 'ai-governance-roundtable-2026', title: 'AI Governance Roundtable', date: '2026-11-12', city: 'Bengaluru', venue: 'Partner venue', type: 'Workshop', summary: 'Board members and CXOs on governing AI responsibly.', agenda: ['AI risk landscape', 'BoardMind walkthrough', 'Roundtable discussion'] },
  { slug: 'cyber-resilience-conclave-2026', title: 'Cyber Resilience Conclave', date: '2026-08-22', city: 'Chennai', venue: 'Hotel venue', type: 'Conference', summary: 'Incident response, cyber insurance and resilience for growing enterprises.', agenda: ['Opening keynote', 'Incident tabletop', 'Insurer panel'] },
  { slug: 'women-in-cyber-meetup-2026', title: 'Women in Cyber Meetup', date: '2026-06-14', city: 'Chennai', venue: 'IITM Research Park', type: 'Workshop', summary: 'Mentoring and career conversations for women in security.', agenda: ['Fireside chat', 'Mentoring circles', 'Networking'] }
];

export const mous = [ // SAMPLE
  { partner: 'Partner University A', area: 'Cybersecurity curriculum & internships', year: '2025' },
  { partner: 'Partner Institute B', area: 'Post-quantum cryptography research', year: '2025' },
  { partner: 'Industry Association C', area: 'Skilling programmes for MSMEs', year: '2024' },
  { partner: 'Partner College D', area: 'AI & blockchain centre of excellence', year: '2024' }
];

export const gallery = [ // SAMPLE captions
  'Quantum-Safe Summit — keynote', 'VAPT lab session', 'MoU signing', 'Women in Cyber meetup', 'Student hackathon', 'Award ceremony', 'AI governance roundtable', 'Training graduation', 'Team at IITM Research Park'
];

/* ---------------- Shared ---------------- */
export const clients = ['Tamil Nadu Government', 'Tamil Nadu Police', 'Nasscom Foundation', 'NPST', 'REC', 'Odyssey', 'Global Software Solutions', 'Innoventory Solutions', 'Muthu Softlabs', 'CPS', 'SkillsDa', 'Sysman', 'V Connect', 'Voltech'];

export const stats = [
  { value: '5+', label: 'Years of excellence', note: 'Founded in 2021, Chennai' },
  { value: '10', label: 'Core service offerings', note: 'VAPT, ISO 27001, PCI-DSS, cloud security & more' },
  { value: '4', label: 'Proprietary products', note: 'UNIFAI, Quantik, BoardMind, Alexi Voice' },
  { value: '12', label: 'Industries served', note: 'Government, enterprise & startups' }
];

export const awards = [
  { title: 'FICCI Start-Up STARS', by: 'FICCI', year: '2022' },
  { title: 'Visionary Woman Leader', by: 'Redington, Microsoft & Check Point', year: '2023' },
  { title: 'Best Speaker of the Year', by: 'ISACA Chennai', year: '2022' },
  { title: 'Professional of the Year', by: 'MSME India', year: '2021' },
  { title: 'Woman Business Leader of the Year', by: 'Women Entrepreneur India', year: '2021' }
];

export const values = [
  { title: 'Security First', text: 'Every product and engagement starts with protecting what matters.' },
  { title: 'Excellence', text: 'Rigorous methods, measurable outcomes.' },
  { title: 'Client Focus', text: 'We succeed when our clients stay safe and grow.' },
  { title: 'Innovation', text: 'AI, quantum-ready security and R&D at the core.' }
];

export const whyUs = [
  { title: 'Proven expertise', text: '5+ years of enterprise cybersecurity and technology consulting with measurable results.' },
  { title: 'Innovation-first', text: 'AI-driven automation and quantum-ready security, backed by in-house R&D.' },
  { title: 'Trusted partner', text: 'Serving government bodies, enterprises and startups with integrity and accountability.' }
];

export const readinessChecks = [
  'Multi-factor authentication on all critical systems',
  'VAPT completed in the last 12 months',
  'Documented, tested incident response plan',
  'ISO 27001 / PCI-DSS compliance in place',
  'Post-quantum readiness plan for encryption'
];

export const faqs = [
  { q: 'What does YesPanchi do?', a: 'YesPanchi is a Chennai-based technology company at IIT Madras Research Park, delivering cybersecurity, security audits, AI and automation, enterprise products and corporate training.' },
  { q: 'What is VAPT and why do we need it?', a: 'Vulnerability Assessment and Penetration Testing finds and safely exploits weaknesses in your applications, networks and cloud before attackers do, and gives you a prioritised remediation plan.' },
  { q: 'Do you conduct ISO 27001 and PCI-DSS audits?', a: 'Yes. We run ISO 27001 and PCI-DSS compliance audits and help you close the gaps they reveal.' },
  { q: 'What is QSecura PQ-SSL?', a: 'QSecura PQ-SSL is our post-quantum SSL product, designed to protect encrypted communication against future quantum-computing attacks.' },
  { q: 'How does the free security assessment work?', a: 'Book a slot through our contact page. Our team reviews your current posture and shares the key risks and next steps — no obligation.' }
];

export const trainingTopics = ['Artificial Intelligence', 'Cyber Security', 'Quantum Technologies', 'Blockchain', 'Digital Investigation', 'Enterprise Development', 'Innovation Skills'];

/* ---------------- Navigation ---------------- */
export const nav = {
  products: products.map((p) => ({ name: p.name, sub: p.short, href: `/products/${p.slug}`, icon: p.icon, logo: p.logo, isNew: p.isNew })),
  services: (['General services', 'Audit services'] as const).map((division) => ({
    title: division,
    items: services.filter((s) => s.division === division).map((s) => ({ name: s.name, href: `/services/${s.slug}`, icon: s.icon }))
  })),
  events: [
    { name: 'Events & Conferences', sub: 'Upcoming & past sessions', href: '/events', icon: 'cal' as IconName },
    { name: 'MoUs & Collaborations', sub: 'Institutional & research tie-ups', href: '/events/mous', icon: 'hands' as IconName },
    { name: 'Photo Gallery', sub: 'Event snapshots & community', href: '/events/gallery', icon: 'photo' as IconName }
  ]
};
