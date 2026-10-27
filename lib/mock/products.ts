// SAMPLE — illustrative mock data for product pages. All prices, customers, quotes and metrics are fictional.

export type ProductCategory = 'Quantum security' | 'AI governance' | 'Voice AI';

export type Tier = { name: 'Starter' | 'Business' | 'Enterprise'; price: string; unit: string; blurb: string; features: string[]; featured?: boolean };

export type ProductMock = {
  category: ProductCategory;
  status: 'GA' | 'Beta' | 'Early access';
  startingAt: string;
  deployment: string;
  compliance: string;
  rating: number;
  customers: string;
  preview: {
    title: string;
    kpis: { label: string; value: string; delta: string; good: boolean }[];
    bars: number[];
    rows: { name: string; meta: string; state: 'ok' | 'warn' | 'risk' }[];
  };
  tiers: Tier[];
  integrations: string[];
  quote: { text: string; name: string; role: string; org: string };
  specs: [string, string][];
  faqs: { q: string; a: string }[];
};

const defaultTiers = (s: string, b: string, unit: string, starter: string[], business: string[], ent: string[]): Tier[] => [
  { name: 'Starter', price: s, unit, blurb: 'For teams piloting on one workload.', features: starter },
  { name: 'Business', price: b, unit, blurb: 'For growing organisations in production.', features: business, featured: true },
  { name: 'Enterprise', price: 'Custom', unit: 'annual contract', blurb: 'For regulated, multi-site estates.', features: ent }
];

export const productMock: Record<string, ProductMock> = {
  // SAMPLE
  'qsecura-pq-ssl': {
    category: 'Quantum security',
    status: 'GA',
    startingAt: '₹4,999/mo',
    deployment: 'On-prem, cloud, hybrid',
    compliance: 'NIST FIPS 203/204, CERT-In',
    rating: 4.8,
    customers: '40+ pilots',
    preview: {
      title: 'Certificate estate · Production',
      kpis: [
        { label: 'PQ-protected endpoints', value: '1,284', delta: '+12.4%', good: true },
        { label: 'Legacy RSA-2048', value: '87', delta: '−31', good: true },
        { label: 'Handshake p95', value: '41 ms', delta: '+3 ms', good: false }
      ],
      bars: [32, 41, 38, 52, 60, 58, 71, 76, 82, 88, 91, 96],
      rows: [
        { name: 'netbanking.example.in', meta: 'ML-KEM-768 + X25519', state: 'ok' },
        { name: 'api.payments.example.in', meta: 'ML-KEM-768 + X25519', state: 'ok' },
        { name: 'legacy-hr.example.in', meta: 'RSA-2048 · expires 14 Dec', state: 'warn' },
        { name: 'vpn-gw-02', meta: 'TLS 1.2 · no PQ', state: 'risk' }
      ]
    },
    tiers: defaultTiers('₹4,999', '₹24,999', 'per month', ['Up to 10 domains', 'Hybrid PQ certificates', 'Email support'], ['Up to 250 domains', 'Crypto inventory scanner', 'Auto-renewal & alerts', '8×5 phone support'], ['Unlimited domains', 'HSM & on-prem CA', 'Dedicated TAM', '24×7 SLA, 99.95% uptime']),
    integrations: ['NGINX', 'Apache', 'F5 BIG-IP', 'AWS ALB', 'Azure App Gateway', 'HashiCorp Vault', 'Thales Luna HSM', 'Kubernetes Ingress'],
    quote: { text: 'We moved our customer-facing portals to hybrid PQ TLS in three weeks without touching application code. The inventory report alone justified the pilot.', name: 'Ramesh Venkataraman', role: 'CISO', org: 'a mid-sized cooperative bank (sample)' },
    specs: [['Key exchange', 'ML-KEM-768 hybrid with X25519'], ['Signatures', 'ML-DSA-65, ECDSA P-256 fallback'], ['Protocols', 'TLS 1.3, TLS 1.2 (classical)'], ['Deployment', 'Docker, RPM, Helm chart'], ['Data residency', 'India (Chennai, Mumbai regions)'], ['Uptime SLA', '99.95% (Enterprise)']],
    faqs: [
      { q: 'Will older browsers still connect?', a: 'Yes. The hybrid handshake negotiates down to classical TLS for clients that do not yet support post-quantum key exchange.' },
      { q: 'How long does a pilot take?', a: 'A typical pilot on 5–10 domains runs two to three weeks including inventory, deployment and a performance report.' },
      { q: 'Do you support on-prem HSMs?', a: 'Enterprise plans integrate with common network HSMs for key storage.' }
    ]
  },
  quantik: {
    category: 'Quantum security',
    status: 'Beta',
    startingAt: '₹9,999/mo',
    deployment: 'SaaS, on-prem agent',
    compliance: 'RBI CSF, ISO 27001',
    rating: 4.6,
    customers: '18 enterprises',
    preview: {
      title: 'Crypto inventory · Group IT',
      kpis: [
        { label: 'Assets scanned', value: '6,912', delta: '+842', good: true },
        { label: 'Quantum-vulnerable', value: '1,103', delta: '−9.8%', good: true },
        { label: 'Migration ready', value: '64%', delta: '+6 pts', good: true }
      ],
      bars: [20, 24, 30, 34, 41, 45, 47, 52, 55, 59, 62, 64],
      rows: [
        { name: 'Core banking DB', meta: 'AES-256 · safe', state: 'ok' },
        { name: 'SFTP partner links', meta: 'RSA-2048 key exchange', state: 'risk' },
        { name: 'Internal PKI', meta: 'SHA-256 / RSA-3072', state: 'warn' },
        { name: 'Mobile app API', meta: 'Hybrid PQ enabled', state: 'ok' }
      ]
    },
    tiers: defaultTiers('₹9,999', '₹39,999', 'per month', ['Up to 500 assets', 'Agentless scan', 'Quarterly report'], ['Up to 10,000 assets', 'Continuous discovery', 'Migration planner', 'Jira & ServiceNow sync'], ['Unlimited assets', 'Air-gapped deployment', 'Board-level reporting', 'Named crypto architect']),
    integrations: ['ServiceNow', 'Jira', 'Splunk', 'Microsoft Sentinel', 'AWS KMS', 'Azure Key Vault', 'Venafi', 'GitHub'],
    quote: { text: 'Quantik found crypto in places our CMDB did not know existed. We now have a board-approved PQC roadmap with real numbers behind it.', name: 'Priya Natarajan', role: 'Head of IT Risk', org: 'a Chennai-based NBFC (sample)' },
    specs: [['Discovery', 'Network, code, certificates, cloud KMS'], ['Agents', 'Linux, Windows, Kubernetes DaemonSet'], ['Reporting', 'PDF, CSV, REST API'], ['Standards', 'NIST PQC, CNSA 2.0 mapping'], ['Data residency', 'India'], ['SSO', 'SAML 2.0, OIDC']],
    faqs: [
      { q: 'Does scanning affect production?', a: 'Scans are rate-limited and can be scheduled in maintenance windows; agentless mode only reads handshakes and configs.' },
      { q: 'Can it scan source code?', a: 'Yes, the Business tier connects to GitHub and GitLab to flag vulnerable crypto libraries and calls.' },
      { q: 'Is Quantik the same as QSecura?', a: 'Quantik finds and prioritises risk; QSecura PQ-SSL fixes transport-layer exposure. They work well together.' }
    ]
  },
  boardmind: {
    category: 'AI governance',
    status: 'GA',
    startingAt: '₹14,999/mo',
    deployment: 'SaaS (India region)',
    compliance: 'Companies Act, SEBI LODR',
    rating: 4.7,
    customers: '25 boards',
    preview: {
      title: 'Board pack · Q3 FY27',
      kpis: [
        { label: 'Open action items', value: '14', delta: '−5', good: true },
        { label: 'Risk score', value: '62/100', delta: '−4', good: true },
        { label: 'Pack read rate', value: '92%', delta: '+8 pts', good: true }
      ],
      bars: [55, 60, 58, 66, 70, 68, 74, 79, 81, 85, 88, 92],
      rows: [
        { name: 'Audit committee minutes', meta: 'AI summary ready', state: 'ok' },
        { name: 'Cyber risk register', meta: '3 items overdue', state: 'warn' },
        { name: 'Related-party disclosure', meta: 'Needs CS review', state: 'risk' },
        { name: 'CEO strategy memo', meta: 'Read by 7/8 directors', state: 'ok' }
      ]
    },
    tiers: defaultTiers('₹14,999', '₹49,999', 'per month', ['1 board, 10 members', 'AI pack summaries', 'Secure reader app'], ['Up to 5 committees', 'Risk & action tracking', 'Minutes drafting', 'Audit trail export'], ['Group-wide boards', 'Private LLM deployment', 'Custom compliance packs', 'Dedicated CS success manager']),
    integrations: ['Microsoft 365', 'Google Workspace', 'DocuSign', 'Zoom', 'Microsoft Teams', 'SharePoint', 'Tally', 'Okta'],
    quote: { text: 'Directors now arrive having actually read the pack. The AI summaries and action tracker cut our company secretary’s prep time roughly in half.', name: 'Anjali Iyer', role: 'Company Secretary', org: 'a listed manufacturing firm (sample)' },
    specs: [['AI model', 'Private, tenant-isolated LLM'], ['Encryption', 'AES-256 at rest, TLS 1.3 in transit'], ['Access', 'Role-based, per-document watermarking'], ['Apps', 'Web, iPad, Android tablet'], ['Data residency', 'India'], ['Retention', 'Configurable, legal hold']],
    faqs: [
      { q: 'Is our board data used to train models?', a: 'No. Each tenant runs on an isolated model and data is never used for training.' },
      { q: 'Can directors read offline?', a: 'Yes, encrypted offline access is available on tablets with remote wipe.' },
      { q: 'Does it draft minutes?', a: 'BoardMind produces a first draft from the agenda and notes, which the company secretary reviews and approves.' }
    ]
  },
  'alexi-voice': {
    category: 'Voice AI',
    status: 'GA',
    startingAt: '₹2.40/min',
    deployment: 'Cloud, telephony SIP',
    compliance: 'DPDP Act 2023, TRAI',
    rating: 4.5,
    customers: '1.2M calls/mo',
    preview: {
      title: 'Voice agents · Live',
      kpis: [
        { label: 'Calls today', value: '38,420', delta: '+6.1%', good: true },
        { label: 'Self-serve rate', value: '71%', delta: '+4 pts', good: true },
        { label: 'Avg handle time', value: '2m 08s', delta: '−14s', good: true }
      ],
      bars: [40, 46, 52, 61, 70, 82, 90, 86, 74, 66, 58, 49],
      rows: [
        { name: 'Collections · Tamil', meta: '9,812 calls · 4.6★ CSAT', state: 'ok' },
        { name: 'Order status · Hindi', meta: '12,077 calls · 4.4★', state: 'ok' },
        { name: 'KYC reminder · Telugu', meta: 'Latency 1.4s', state: 'warn' },
        { name: 'Claims intake · English', meta: 'Escalations 18%', state: 'risk' }
      ]
    },
    tiers: defaultTiers('₹2.40', '₹1.60', 'per connected minute', ['1 voice agent', '3 Indian languages', 'Web dashboard'], ['10 voice agents', '11 Indian languages', 'CRM integration', 'Call analytics'], ['Unlimited agents', 'Custom voice cloning', 'On-prem telephony', 'Volume pricing below ₹1/min']),
    integrations: ['Exotel', 'Knowlarity', 'Twilio', 'Salesforce', 'Zoho CRM', 'Freshdesk', 'LeadSquared', 'WhatsApp Business'],
    quote: { text: 'Alexi handles our first-level Tamil and Telugu collections calls end to end. Agents now spend their time on the conversations that actually need a human.', name: 'Karthik Subramanian', role: 'VP Operations', org: 'a two-wheeler finance company (sample)' },
    specs: [['Languages', 'English + 10 Indian languages, code-mixed'], ['Latency', '<900 ms median response'], ['Channels', 'PSTN, SIP, WebRTC, WhatsApp'], ['Recording', 'Encrypted, PII redaction'], ['Data residency', 'India'], ['Concurrency', 'Up to 2,000 calls (Enterprise)']],
    faqs: [
      { q: 'Does it handle Hinglish and Tanglish?', a: 'Yes, the speech models are trained for code-mixed speech common in Indian customer calls.' },
      { q: 'How fast can we go live?', a: 'A standard use case such as order status goes live in about two weeks including telephony setup.' },
      { q: 'Can calls be handed to a human?', a: 'Yes, warm transfer with full context to your existing contact-centre queues.' }
    ]
  },
  'ai-guardrails': {
    category: 'AI governance',
    status: 'Early access',
    startingAt: '₹7,999/mo',
    deployment: 'Gateway, SDK, sidecar',
    compliance: 'DPDP Act, EU AI Act mapping',
    rating: 4.6,
    customers: '12 design partners',
    preview: {
      title: 'LLM gateway · Last 24h',
      kpis: [
        { label: 'Prompts inspected', value: '214K', delta: '+18%', good: true },
        { label: 'Blocked (PII / jailbreak)', value: '1,906', delta: '+212', good: false },
        { label: 'Added latency p95', value: '28 ms', delta: '−4 ms', good: true }
      ],
      bars: [12, 18, 15, 22, 30, 26, 34, 29, 38, 33, 41, 36],
      rows: [
        { name: 'HR assistant', meta: 'Aadhaar redacted ×42', state: 'warn' },
        { name: 'Support copilot', meta: 'Policy pass 99.6%', state: 'ok' },
        { name: 'Code assistant', meta: 'Secrets leak blocked ×3', state: 'risk' },
        { name: 'Sales email drafter', meta: 'Policy pass 99.9%', state: 'ok' }
      ]
    },
    tiers: defaultTiers('₹7,999', '₹29,999', 'per month', ['1M tokens inspected', 'PII redaction (Indian IDs)', 'Basic policy packs'], ['50M tokens', 'Jailbreak & injection detection', 'Custom policies', 'SIEM export'], ['Unlimited tokens', 'Self-hosted gateway', 'Red-team assessments', 'Model risk reporting']),
    integrations: ['OpenAI', 'Azure OpenAI', 'Anthropic', 'AWS Bedrock', 'Google Vertex AI', 'LangChain', 'Splunk', 'Microsoft Sentinel'],
    quote: { text: 'Legal signed off on our internal copilot only after Guardrails was in the path. Aadhaar and PAN numbers simply never reach the model now.', name: 'Deepa Raghavan', role: 'Data Protection Officer', org: 'a health-insurance TPA (sample)' },
    specs: [['Detectors', 'PII (Aadhaar, PAN, UPI), secrets, toxicity, prompt injection'], ['Modes', 'Block, redact, log-only'], ['Latency', '<30 ms p95 overhead'], ['Deployment', 'Reverse proxy, Python/Node SDK'], ['Audit', 'Immutable logs, 1-year retention'], ['Data residency', 'India or self-hosted']],
    faqs: [
      { q: 'Which models are supported?', a: 'Any HTTP-based LLM API, including major cloud providers and self-hosted open models.' },
      { q: 'Will it slow down responses?', a: 'Typical overhead is under 30 ms at p95, and streaming responses are inspected incrementally.' },
      { q: 'Can we write our own rules?', a: 'Yes, Business and Enterprise tiers include a policy editor with test cases.' }
    ]
  },
  unifai: {
    category: 'AI governance',
    status: 'GA',
    startingAt: '₹999/user/mo',
    deployment: 'SaaS, private cloud',
    compliance: 'ISO 27001, SOC 2 (in progress)',
    rating: 4.7,
    customers: '3,400 seats',
    preview: {
      title: 'Workspace · Knowledge assistant',
      kpis: [
        { label: 'Active users', value: '2,861', delta: '+9.2%', good: true },
        { label: 'Answers with citations', value: '96%', delta: '+2 pts', good: true },
        { label: 'Hours saved / week', value: '1,140', delta: '+120', good: true }
      ],
      bars: [30, 34, 39, 45, 48, 55, 60, 63, 69, 72, 78, 84],
      rows: [
        { name: 'Policy Q&A', meta: '1,920 queries · 4.7★', state: 'ok' },
        { name: 'Contract review', meta: '312 docs this week', state: 'ok' },
        { name: 'SharePoint connector', meta: 'Sync lag 3h', state: 'warn' },
        { name: 'Finance analyst bot', meta: 'Low-confidence 11%', state: 'risk' }
      ]
    },
    tiers: defaultTiers('₹999', '₹1,799', 'per user / month', ['Up to 25 users', '3 data connectors', 'Chat with documents'], ['Unlimited connectors', 'Custom assistants', 'Admin analytics', 'SSO & SCIM'], ['Private model hosting', 'Fine-tuning on your data', 'Guardrails included', 'Volume seat pricing']),
    integrations: ['SharePoint', 'Google Drive', 'Confluence', 'Slack', 'Microsoft Teams', 'Salesforce', 'SAP', 'PostgreSQL'],
    quote: { text: 'UNIFAI became the one place our 600 staff ask questions about policies and contracts. Every answer comes with the source document, which is what won over compliance.', name: 'Suresh Krishnamurthy', role: 'CIO', org: 'an engineering services group (sample)' },
    specs: [['Models', 'Choice of hosted or private LLMs'], ['Retrieval', 'Hybrid search with citations'], ['Permissions', 'Inherits source ACLs'], ['Apps', 'Web, Teams, Slack, API'], ['Data residency', 'India'], ['SSO', 'SAML, OIDC, SCIM']],
    faqs: [
      { q: 'Do users see documents they should not?', a: 'No. UNIFAI respects the access controls of each connected source.' },
      { q: 'Can we bring our own model?', a: 'Yes, Enterprise customers can host an approved model in their own cloud.' },
      { q: 'Is there a free trial?', a: 'A 30-day pilot for up to 25 users is available on request.' }
    ]
  }
};

export const productCategories: ProductCategory[] = ['Quantum security', 'AI governance', 'Voice AI'];
