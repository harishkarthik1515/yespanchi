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
  builtFor: string[];
  /** External product — links out to its own site instead of an in-site detail page (e.g. QSecura PQ-SSL at qsecura.com). */
  externalUrl?: string;
  logo?: string;
  coreTechnologies?: string[];
  overview?: string[];
  challenge?: { title: string; lead: string; body: string };
  pillars?: { title: string; text: string }[];
  workflow?: { title: string; text: string }[];
  keyFeatures?: { title: string; text: string }[];
  businessValue?: { title: string; text: string }[];
  useCases?: { industry: string; text: string }[];
  techStack?: string;
  comparisonTable?: { headers: [string, string, string]; rows: [string, string, string][] };
  ctaLine?: string;
};

export const products: Product[] = [
  {
    slug: 'yp-prakaar',
    name: 'YP-PRAKAAR',
    tag: 'Post-Quantum Security',
    short: 'Quantum-safe security & cryptography',
    description:
      'Quantum-secure payment infrastructure powered by post-quantum cryptography (PQC), protecting financial transactions, payment gateways, and enterprise ledgers against evolving quantum threats with cryptographic agility.',
    icon: 'shield',
    builtFor: ['Payment gateways & FinTech platforms', 'Banking & digital infrastructure', 'Regulated financial enterprises'],
    coreTechnologies: [
      'NIST FIPS 204 — ML-DSA-65 digital signatures',
      'NIST FIPS 203 — ML-KEM key encapsulation',
      'Module Learning With Errors (MLWE) lattice-based cryptography',
      'High-performance C++ and Rust cryptographic core'
    ],
    overview: [
      'YP-PRAKAAR is a quantum-ready security layer designed to strengthen payment gateways, digital banking infrastructure, and enterprise financial transactions. It combines post-quantum cryptographic mechanisms with automated key management, transaction signing, signature verification, and cryptographic audit trails.',
      'By supporting standardized post-quantum algorithms alongside existing payment infrastructure, YP-PRAKAAR aims to simplify the transition toward quantum-resistant security without requiring a complete redesign of established payment workflows.'
    ],
    challenge: {
      title: 'The Emerging Quantum Threat',
      lead: 'Prepare Today for Tomorrow’s Cryptographic Risks',
      body: 'Advances in quantum computing could eventually undermine widely deployed public-key cryptographic algorithms, including RSA and elliptic-curve cryptography. Meanwhile, Harvest Now, Decrypt Later attacks create risks for sensitive information that must remain confidential for years. YP-PRAKAAR addresses these emerging risks through post-quantum cryptographic protection, crypto-agility, and forward-looking security architecture designed to support long-term data protection.'
    },
    pillars: [
      { title: 'Intelligent Key Management', text: 'Automated cryptographic key generation, lifecycle management, scheduled rotation, and controlled deactivation to support secure and reliable key operations.' },
      { title: 'Post-Quantum Transaction Signing', text: 'Applies ML-DSA digital signatures to transaction payloads to help establish authenticity and detect unauthorized modifications.' },
      { title: 'Signature Verification', text: 'Validates post-quantum digital signatures before transaction processing or gateway dispatch, helping prevent tampered or improperly signed requests.' },
      { title: 'Cryptographic Audit Trails', text: 'Maintains verifiable transaction records with cryptographic metadata to support traceability, integrity checks, and security investigations.' }
    ],
    keyFeatures: [
      { title: 'NIST-standardized Post-Quantum Cryptography', text: 'Support for ML-DSA digital signatures and ML-KEM key establishment.' },
      { title: 'Payment Gateway Integration', text: 'Designed to integrate with existing payment workflows through gateway-specific connectors and API wrappers.' },
      { title: 'Automated Key Rotation', text: 'Configurable key lifecycles and rotation workflows designed to minimize service disruption.' },
      { title: 'Transaction Integrity', text: 'Cryptographic signing and verification to detect unauthorized transaction modifications.' },
      { title: 'Crypto-Agility', text: 'An architecture designed to support cryptographic transitions as algorithms, standards, and security requirements evolve.' },
      { title: 'Compliance Support', text: 'Security controls and technical capabilities intended to support relevant assessments and evolving regulatory requirements.' }
    ],
    businessValue: [
      { title: 'Quantum-Ready Protection', text: 'Prepare your cryptographic infrastructure for emerging quantum threats with standardized post-quantum algorithms.' },
      { title: 'Integration-Focused Architecture', text: 'Modernize payment security while minimizing disruption to existing systems through appropriate gateway integrations.' },
      { title: 'Operational Resilience', text: 'Support continuity through automated key lifecycle workflows, verification controls, and structured cryptographic operations.' },
      { title: 'Auditability and Traceability', text: 'Strengthen transaction oversight through cryptographic evidence and detailed security records.' }
    ],
    comparisonTable: {
      headers: ['Security capability', 'Conventional approach', 'YP-PRAKAAR approach'],
      rows: [
        ['Key establishment', 'RSA or elliptic-curve mechanisms', 'ML-KEM support'],
        ['Digital signatures', 'RSA or ECDSA', 'ML-DSA-65 support'],
        ['Key lifecycle', 'Implementation-dependent', 'Automated rotation capabilities'],
        ['Cryptographic migration', 'Often requires coordinated upgrades', 'Crypto-agile transition architecture'],
        ['Transaction integrity', 'Conventional signing and verification', 'Post-quantum signing and verification'],
        ['Auditability', 'Application-dependent logging', 'Cryptographic audit-trail capabilities']
      ]
    },
    useCases: [
      { industry: 'FinTech & Payments', text: 'Digital payment gateways and FinTech platforms.' },
      { industry: 'Banking', text: 'Banking and cross-border payment infrastructure.' },
      { industry: 'Government', text: 'Central Bank Digital Currency (CBDC) initiatives.' },
      { industry: 'Blockchain', text: 'Enterprise blockchain and digital asset platforms.' },
      { industry: 'E-Commerce', text: 'E-commerce payment and merchant checkout systems.' },
      { industry: 'Treasury', text: 'Treasury operations and high-value transaction authorization.' }
    ],
    techStack: 'NIST FIPS 203 (ML-KEM) · NIST FIPS 204 (ML-DSA) · Module-LWE lattice cryptography · C++ · Rust · Payment API integrations · OpenSSL-based cryptographic infrastructure',
    ctaLine: 'Prepare your payment infrastructure for the next era of cryptographic security with YP-PRAKAAR.'
  },
  {
    slug: 'yp-raksha',
    name: 'YP-RAKSHA',
    tag: 'Enterprise AI',
    short: 'Unified Enterprise AI Platform',
    description:
      'YP-RAKSHA is the unified operating layer for enterprise AI, integrating 23+ LLM providers with intelligent routing, agent management, self-healing failover, MCP support, edge deployment, and centralized AI governance.',
    icon: 'ai',
    builtFor: ['Enterprise IT & platform engineering teams', 'Security & governance teams', 'Multi-agent AI operations'],
    coreTechnologies: [
      'OpenAI-compatible AI gateway',
      'Model Context Protocol (MCP) integration',
      'Distributed worker-pool architecture',
      'OpenTelemetry (OTLP) observability',
      'Grafana, New Relic, and Honeycomb integrations'
    ],
    overview: [
      'YP-RAKSHA is a centralized operating layer for managing enterprise AI models, autonomous agents, tools, and workflows. It helps organizations reduce fragmented AI deployments by providing a common control plane for model access, agent coordination, usage policies, operational monitoring, and governance.',
      'Designed for enterprise IT, security, and platform engineering teams, YP-RAKSHA supports AI adoption across departments while improving visibility, cost accountability, and operational resilience.'
    ],
    challenge: {
      title: 'The Enterprise AI Challenge',
      lead: 'From Fragmented AI to Unified Intelligence',
      body: 'Organizations increasingly deploy AI across customer support, finance, healthcare, legal, human resources, operations, and cybersecurity. Without centralized oversight, these deployments can create disconnected systems, inconsistent access controls, unpredictable costs, limited visibility, and operational dependencies. YP-RAKSHA addresses these challenges through a unified AI gateway and governance layer that brings models, agents, and enterprise workflows under centralized management.'
    },
    pillars: [
      { title: 'CONNECT — Unified AI Access', text: 'Integrate multiple LLM providers, manage AI agents, and connect enterprise tools through a common API and centralized routing layer.' },
      { title: 'CONTROL — Access and Cost Management', text: 'Apply virtual API keys, team-level budgets, usage policies, identity integration, and token consumption tracking to improve governance and financial accountability.' },
      { title: 'GOVERN — Visibility and Policy Enforcement', text: 'Centralize audit logging, access policies, distributed tracing, and AI traffic oversight to support enterprise governance and responsible AI adoption.' },
      { title: 'RECOVER — Operational Resilience', text: 'Use automated failure detection, execution-state analysis, dependency mapping, and recovery workflows to improve AI service continuity when agents or model providers fail.' }
    ],
    workflow: [
      { title: 'Detect Failures', text: 'Monitor system telemetry and execution status to identify failed or unresponsive agents.' },
      { title: 'Analyze Execution History', text: 'Review available logs, task context, and execution state to understand the failure.' },
      { title: 'Map Dependencies', text: 'Identify connected tools, APIs, databases, and workflow dependencies.' },
      { title: 'Reconstruct Task State', text: 'Determine completed actions, pending steps, and available recovery context.' },
      { title: 'Initiate Recovery', text: 'Route work to a suitable replacement agent or recovery workflow, subject to configured policies and safeguards.' }
    ],
    keyFeatures: [
      { title: 'Unified AI Gateway', text: 'Centralized access to 23+ LLM providers through an OpenAI-compatible API.' },
      { title: 'Multi-Agent Orchestration', text: 'Manage AI agents, tools, and enterprise workflows through a shared operating layer.' },
      { title: 'MCP Integration', text: 'Support Model Context Protocol connectivity for integrating compatible AI tools and services.' },
      { title: 'Agent Recovery', text: 'Structured failure detection and recovery workflows to improve service resilience.' },
      { title: 'Enterprise Governance', text: 'Centralized access controls, audit logging, policy enforcement, and usage oversight.' },
      { title: 'AI Cost Optimization', text: 'Virtual keys, budget controls, token analytics, and usage monitoring.' },
      { title: 'Observability and Tracing', text: 'Integrations with OpenTelemetry-based monitoring and observability platforms.' },
      { title: 'YP-RAKSHA Edge', text: 'A desktop routing approach designed to bring supported AI application traffic under centralized enterprise oversight.' },
      { title: 'Scalable Architecture', text: 'Worker-pool processing, load balancing, and caching capabilities designed for enterprise workloads.' }
    ],
    businessValue: [
      { title: 'Simplify Enterprise AI', text: 'Reduce the complexity of managing multiple AI providers, models, agents, and integrations.' },
      { title: 'Strengthen AI Governance', text: 'Improve visibility into AI usage and apply consistent access, cost, and operational policies.' },
      { title: 'Improve Business Continuity', text: 'Support recovery from model-provider disruptions and agent execution failures through configurable resilience mechanisms.' },
      { title: 'Control AI Expenditure', text: 'Track consumption and allocate budgets across teams, applications, and business units.' },
      { title: 'Support Responsible AI Adoption', text: 'Establish a stronger foundation for security, accountability, and centralized AI oversight across the organization.' }
    ],
    useCases: [
      { industry: 'Banking & Financial Services', text: 'AI-assisted loan processing, fraud investigation, risk analysis, and regulatory reporting.' },
      { industry: 'FinTech & Digital Payments', text: 'Digital lending workflows, payment operations, merchant risk analysis, and customer support automation.' },
      { industry: 'Healthcare', text: 'Clinical workflow assistance, patient scheduling, healthcare documentation, and research support.' },
      { industry: 'Cybersecurity & Security Operations', text: 'Threat intelligence analysis, SIEM investigation, incident response assistance, and security workflow automation.' },
      { industry: 'Manufacturing & Industry 4.0', text: 'Predictive maintenance, production planning, quality inspection, and smart-factory workflows.' },
      { industry: 'Insurance & InsurTech', text: 'Claims processing, underwriting assistance, fraud analysis, and policy servicing.' },
      { industry: 'Government & Public Sector', text: 'Citizen service automation, document processing, application workflows, and administrative support.' },
      { industry: 'Logistics & Supply Chain', text: 'Fleet coordination, route optimization, shipment tracking, and warehouse workflow automation.' }
    ],
    techStack: 'OpenAI-compatible APIs · Large Language Models (LLMs) · Model Context Protocol (MCP) · Agent Orchestration · OpenTelemetry (OTLP) · Grafana · New Relic · Honeycomb · Worker-Pool Architecture',
    ctaLine: 'Bring AI models, agents, tools, and workflows into one governed operating environment with YP-RAKSHA.'
  },
  {
    slug: 'qsecura-pq-ssl',
    name: 'QSecura PQ-SSL',
    tag: 'Post-Quantum Security',
    short: 'Quantum-safe security for digital infrastructure',
    description:
      'Quantum-safe security readiness for websites, web applications and mobile platforms — built on post-quantum cryptography to keep digital infrastructure protected against emerging quantum computing threats.',
    icon: 'shield',
    logo: '/qsecura-shield.png',
    externalUrl: 'https://qsecura.com',
    builtFor: ['Websites & web applications', 'Mobile platforms', 'Enterprises preparing for quantum-era threats']
  }
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
  { slug: 'quantum-safe-india-summit-2026', title: 'Quantum-Safe India Summit 2026', date: '2026-12-04', city: 'Chennai', venue: 'IITM Research Park', type: 'Summit', summary: 'Leaders from banking, government and tech on preparing India for post-quantum security.', agenda: ['Keynote: the quantum clock', 'Panel: PQC in payments', 'Live demo: YP-PRAKAAR', 'Networking'] },
  { slug: 'vapt-masterclass-nov-2026', title: 'VAPT Masterclass', date: '2026-11-20', city: 'Online', venue: 'Zoom', type: 'Webinar', summary: 'A practical walkthrough of a real-world penetration test, from scope to report.', agenda: ['Scoping a test', 'Live exploitation', 'Writing a great report', 'Q&A'] },
  { slug: 'ai-governance-roundtable-2026', title: 'AI Governance Roundtable', date: '2026-11-12', city: 'Bengaluru', venue: 'Partner venue', type: 'Workshop', summary: 'Board members and CXOs on governing AI responsibly.', agenda: ['AI risk landscape', 'AI Guardrails walkthrough', 'Roundtable discussion'] },
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
/* Client logos — from the clientele strip on yespanchi.com. */
export const clients = [
  { name: 'Tamil Nadu Government', logo: '/clients/tn-government.png' },
  { name: 'Tamil Nadu Police', logo: '/clients/tn-police.png' },
  { name: 'Nasscom Foundation', logo: '/clients/nasscom-foundation.png' },
  { name: 'NPST', logo: '/clients/npst.png' },
  { name: 'REC', logo: '/clients/rec.png' },
  { name: 'Odyssey', logo: '/clients/odyssey.png' },
  { name: 'Global Software Solutions', logo: '/clients/global-software-solutions.png' },
  { name: 'Innoventory Solutions', logo: '/clients/innoventory-solutions.png' },
  { name: 'Muthu Softlabs', logo: '/clients/muthu-softlabs.png' },
  { name: 'CPS', logo: '/clients/cps.png' },
  { name: 'Skills Da', logo: '/clients/skills-da.png' },
  { name: 'SysMan', logo: '/clients/sysman.png' },
  { name: 'V Connect Management Services', logo: '/clients/v-connect.png' },
  { name: 'Voltech', logo: '/clients/voltech.png' }
];

/* Stats band used further down the home page and on the About page */
export const stats = [
  { value: '2021', label: 'Founded at IIT Madras Research Park', note: 'Chennai, India' },
  { value: '3', label: 'Proprietary platforms', note: 'YP-PRAKAAR, YP-RAKSHA, QSecura PQ-SSL' },
  { value: '14+', label: 'Clients across government & enterprise', note: 'Logos in the clientele strip on the home page' },
  { value: '12', label: 'Industries served', note: 'Government, enterprise & startups' }
];

export const awards = [
  { title: 'FICCI Start-Up STARS', by: 'FICCI', year: '2022', image: '/gallery/ficci-start-up-stars-awards-2022.jpg' },
  { title: 'Visionary Woman Leader', by: 'Redington, Microsoft & Check Point', year: '2023', image: '/gallery/visionary-woman-leader-award-from-redington-microsoft-and-check-point-software.jpg' },
  { title: 'Best Speaker of the Year', by: 'ISACA Chennai', year: '2022', image: '/gallery/best-speaker-of-the-year-award-2022-by-isaca-chennai.jpg' },
  { title: 'Professional of the Year', by: 'MSME India', year: '2021', image: '/gallery/professional-of-the-year-2021-by-msme-india-business-awards.jpg' },
  { title: 'Promising Start-Up of the Year', by: 'Indian Achievers’ Award', year: '2021', image: '/gallery/promising-start-up-for-the-year-2021-by-indian-achievers-award.jpg' },
  { title: 'Woman Business Leader of the Year', by: 'Women Entrepreneur India', year: '2021', image: '/gallery/woman-business-leader-of-the-year-2021-by-women-entrepreneur-india-magazine.jpg' }
];

/* Partners — from the 2025 company brochure and supplied material. */
export const groupCompanies = [
  { name: 'Kriscon Global', logo: '/partners/kriscon-global.png' },
  { name: 'PaRiSu Charitable and Educational Trust', logo: '/partners/parisu-trust.png' },
  { name: 'C-Suite Academy', logo: '/partners/c-suite-academy.png' }
];
export const associates = ['DigiAlert', 'CISOGenie', 'Certus Software', 'OS-SCi', 'Odyssey', 'iTuring.ai', 'TeejLab', 'Skitre'];
export const collaborations = [
  { partner: 'CyberFIT', text: 'YesPanchi and CyberFIT join hands to provide secure data erasure services.', image: '/gallery/yespanchi-and-cyberfit-join-hands-to-provide-secure-data-erasure-services.jpg' }
];

export const values = [
  { title: 'Security First', text: 'We prioritize the security and protection of our clients above everything else.' },
  { title: 'Excellence', text: 'We strive for excellence in every project and deliver the highest quality solutions.' },
  { title: 'Client Focus', text: 'Our clients are at the heart of everything we do, ensuring their success is our success.' },
  { title: 'Innovation', text: 'We continuously innovate and adapt to the latest cybersecurity threats and technologies.' }
];

export const whyUs = [
  { title: 'Proven Expertise', text: 'Delivering cybersecurity, enterprise technology, and digital transformation solutions tailored to evolving business needs across industries.' },
  { title: 'Innovation-Driven', text: 'Advancing AI security, intelligent automation, and quantum-ready solutions to address emerging threats and future-proof enterprise operations.' },
  { title: 'A Partner You Can Trust', text: 'Supporting government organizations, enterprises, and startups with security-first strategies, ethical innovation, and a commitment to accountability.' }
];

export const readinessChecks = [
  'Multi-factor authentication on all critical systems',
  'VAPT completed in the last 12 months',
  'Documented, tested incident response plan',
  'ISO 27001 / PCI-DSS compliance in place',
  'Post-quantum readiness plan for encryption'
];

export const faqs = [
  { q: 'What does YesPanchi do?', a: 'YesPanchi is a Chennai-based technology company at IIT Madras Research Park, delivering cybersecurity, security audits, AI and automation and enterprise products for post-quantum security and governed AI.' },
  { q: 'What is VAPT and why do we need it?', a: 'Vulnerability Assessment and Penetration Testing finds and safely exploits weaknesses in your applications, networks and cloud before attackers do, and gives you a prioritised remediation plan.' },
  { q: 'Do you conduct ISO 27001 and PCI-DSS audits?', a: 'Yes. We run ISO 27001 and PCI-DSS compliance audits and help you close the gaps they reveal.' },
  { q: 'What is YP-PRAKAAR?', a: 'YP-PRAKAAR is our post-quantum security platform, designed to protect payment gateways and financial infrastructure against future quantum-computing attacks.' },
  { q: 'How does the free security assessment work?', a: 'Book a slot through our contact page. Our team reviews your current posture and shares the key risks and next steps — no obligation.' }
];

/* ---------------- Navigation ---------------- */
export const nav = {
  products: products.map((p) => ({ name: p.name, sub: p.short, href: p.externalUrl ?? `/products/${p.slug}`, icon: p.icon, external: !!p.externalUrl })),
  events: [
    { name: 'Events & Conferences', sub: 'Upcoming & past sessions', href: '/events', icon: 'cal' as IconName },
    { name: 'MoUs & Collaborations', sub: 'Institutional & research tie-ups', href: '/events/mous', icon: 'hands' as IconName },
    { name: 'Photo Gallery', sub: 'Event snapshots & community', href: '/events/gallery', icon: 'photo' as IconName }
  ]
};
