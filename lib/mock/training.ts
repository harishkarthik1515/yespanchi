// SAMPLE — illustrative mock data for training pages. Names, fees, dates and outcomes are fictional.

export type Instructor = { id: string; name: string; role: string; bio: string; years: number; focus: string[] };
export type Cohort = { start: string; end: string; schedule: string; location: string; seatsLeft: number; seats: number };
export type Week = { title: string; topics: string[]; lab: string };
export type CourseMock = {
  fee: number;
  earlyBird?: number;
  emi: string;
  rating: number;
  learners: number;
  hours: number;
  certificate: string;
  instructors: string[];
  cohorts: Cohort[];
  weeks: Week[];
  outcomes: string[];
  prerequisites: string[];
};

// SAMPLE
export const instructors: Instructor[] = [
  { id: 'arvind', name: 'Arvind Raghunathan', role: 'Lead, Offensive Security', bio: 'OSCP, OSCE. Has led 200+ penetration tests for banks and PSUs.', years: 14, focus: ['Red teaming', 'Web exploitation'] },
  { id: 'meera', name: 'Dr. Meera Krishnan', role: 'Principal Cryptographer', bio: 'PhD in lattice cryptography; advises on PQC migration for regulated sectors.', years: 12, focus: ['PQC', 'Applied crypto'] },
  { id: 'farhan', name: 'Farhan Siddiqui', role: 'AI Strategy Advisor', bio: 'Former analytics head at a large private bank; helps boards frame AI risk.', years: 16, focus: ['AI strategy', 'Governance'] },
  { id: 'lakshmi', name: 'Lakshmi Sundaram', role: 'Digital Forensics Examiner', bio: 'Certified examiner who has assisted law enforcement on 80+ cases.', years: 11, focus: ['Memory forensics', 'Mobile'] },
  { id: 'rohit', name: 'Rohit Menon', role: 'Blockchain Engineer', bio: 'Built settlement systems on Hyperledger and Ethereum L2s.', years: 8, focus: ['Solidity', 'Smart-contract audits'] },
  { id: 'kavya', name: 'Kavya Balaji', role: 'DevSecOps Architect', bio: 'Rolled out secure SDLC programmes for three Indian SaaS unicorns.', years: 10, focus: ['CI/CD security', 'Threat modelling'] }
];

const w = (title: string, topics: string[], lab: string): Week => ({ title, topics, lab });

export const courseMock: Record<string, CourseMock> = {
  // SAMPLE
  'certified-ethical-hacking-bootcamp': {
    fee: 54000, earlyBird: 46500, emi: '₹9,000/mo × 6 (no-cost EMI)', rating: 4.8, learners: 1240, hours: 96,
    certificate: 'Certified Ethical Hacking Practitioner', instructors: ['arvind', 'kavya'],
    cohorts: [
      { start: '2026-11-16', end: '2026-12-27', schedule: 'Sat–Sun, 10:00–14:00', location: 'IITM Research Park, Chennai + online', seatsLeft: 4, seats: 30 },
      { start: '2027-01-11', end: '2027-02-21', schedule: 'Mon/Wed/Fri, 19:00–21:30', location: 'Online (live)', seatsLeft: 17, seats: 40 },
      { start: '2027-03-06', end: '2027-04-17', schedule: 'Sat–Sun, 10:00–14:00', location: 'Bengaluru + online', seatsLeft: 26, seats: 30 }
    ],
    weeks: [
      w('Recon & OSINT', ['Attack surface mapping', 'Subdomain & cloud asset discovery', 'Google dorking, Shodan'], 'Map a fictional fintech’s external footprint'),
      w('Web application attacks', ['OWASP Top 10 in depth', 'Auth & session flaws', 'SSRF, IDOR, SQLi'], 'Exploit a deliberately vulnerable UPI-style app'),
      w('Network exploitation', ['Scanning & service enumeration', 'Active Directory attacks', 'Pivoting'], 'Compromise a segmented lab network'),
      w('Privilege escalation', ['Linux & Windows privesc', 'Credential harvesting', 'Persistence'], 'Root three hardened hosts'),
      w('Cloud & API testing', ['AWS/Azure misconfigurations', 'API security testing', 'Container escapes'], 'Attack a mis-configured cloud tenant'),
      w('Reporting & capstone', ['Risk rating with CVSS', 'Writing executive summaries', 'Re-test process'], '48-hour capstone engagement + report review')
    ],
    outcomes: ['Run a scoped VAPT end to end', 'Write client-ready findings reports', 'Prepare for OSCP / CEH-style exams'],
    prerequisites: ['Comfort with Linux command line', 'Basic networking (TCP/IP, HTTP)']
  },
  'ai-for-business-leaders': {
    fee: 38000, emi: 'Corporate invoicing available', rating: 4.7, learners: 420, hours: 14,
    certificate: 'AI Leadership Programme — Certificate of Completion', instructors: ['farhan'],
    cohorts: [
      { start: '2026-11-27', end: '2026-11-28', schedule: 'Fri–Sat, 09:30–17:00', location: 'IITM Research Park, Chennai', seatsLeft: 3, seats: 24 },
      { start: '2027-01-22', end: '2027-01-23', schedule: 'Fri–Sat, 09:30–17:00', location: 'Mumbai (BKC)', seatsLeft: 12, seats: 24 },
      { start: '2027-02-19', end: '2027-02-20', schedule: 'Fri–Sat, 09:30–17:00', location: 'Bengaluru', seatsLeft: 20, seats: 24 }
    ],
    weeks: [
      w('Day 1 · Morning — AI fundamentals', ['What GenAI can and cannot do', 'Cost and data realities', 'Indian case studies'], 'Live demo teardown'),
      w('Day 1 · Afternoon — Use-case discovery', ['Value vs feasibility mapping', 'Build vs buy vs partner'], 'Workshop: score 10 use cases for your firm'),
      w('Day 2 · Morning — Governance & risk', ['DPDP Act implications', 'Model risk & hallucination', 'Board oversight'], 'Draft an AI acceptable-use policy'),
      w('Day 2 · Afternoon — Roadmapping', ['90-day pilot plans', 'Talent & operating model', 'Measuring ROI'], 'Present your roadmap to the cohort')
    ],
    outcomes: ['A prioritised AI use-case portfolio', 'A draft AI governance policy', 'A 90-day pilot roadmap'],
    prerequisites: ['Senior manager or above', 'No technical background needed']
  },
  'post-quantum-cryptography-essentials': {
    fee: 42000, earlyBird: 36000, emi: '₹7,000/mo × 6', rating: 4.9, learners: 310, hours: 36,
    certificate: 'PQC Migration Specialist', instructors: ['meera'],
    cohorts: [
      { start: '2026-12-01', end: '2026-12-19', schedule: 'Tue/Thu, 18:30–21:00 + Sat lab', location: 'Online (live)', seatsLeft: 9, seats: 35 },
      { start: '2027-02-02', end: '2027-02-20', schedule: 'Tue/Thu, 18:30–21:00 + Sat lab', location: 'Online (live)', seatsLeft: 28, seats: 35 }
    ],
    weeks: [
      w('Quantum threat model', ['Shor & Grover in practice', 'Harvest-now-decrypt-later', 'Timelines & Mosca’s theorem'], 'Estimate exposure for a sample data inventory'),
      w('PQC algorithms & hybrid TLS', ['ML-KEM, ML-DSA, SLH-DSA', 'Hybrid key exchange', 'Performance trade-offs'], 'Stand up a hybrid PQ TLS server'),
      w('Inventory & migration planning', ['Crypto-agility', 'Discovering crypto in code & infra', 'Roadmaps for regulators'], 'Build a migration plan for a fictional bank')
    ],
    outcomes: ['Explain quantum risk to leadership', 'Deploy hybrid PQ TLS', 'Produce a crypto inventory & migration roadmap'],
    prerequisites: ['Working knowledge of TLS/PKI', 'Basic Python']
  },
  'blockchain-developer-foundations': {
    fee: 24000, earlyBird: 19500, emi: '₹4,000/mo × 6', rating: 4.6, learners: 860, hours: 48,
    certificate: 'Blockchain Developer — Foundations', instructors: ['rohit'],
    cohorts: [
      { start: '2026-11-23', end: '2026-12-18', schedule: 'Mon–Thu, 19:00–21:00', location: 'Online (live)', seatsLeft: 6, seats: 60 },
      { start: '2027-01-18', end: '2027-02-12', schedule: 'Mon–Thu, 19:00–21:00', location: 'Online (live)', seatsLeft: 41, seats: 60 }
    ],
    weeks: [
      w('Ledgers & consensus', ['Hashing, Merkle trees', 'PoW vs PoS', 'Permissioned chains'], 'Build a toy blockchain in Python'),
      w('Solidity basics', ['Types, storage, events', 'ERC-20 & ERC-721', 'Testing with Foundry'], 'Deploy a token to a testnet'),
      w('Wallets, keys & dApps', ['Key management', 'Frontend with ethers.js', 'Indexing'], 'Ship a simple dApp'),
      w('Security pitfalls & project', ['Re-entrancy, oracle attacks', 'Audit checklists'], 'Capstone dApp + peer audit')
    ],
    outcomes: ['Write and test smart contracts', 'Build a working dApp', 'Spot common contract vulnerabilities'],
    prerequisites: ['Basic programming in any language']
  },
  'digital-forensics-investigation': {
    fee: 48000, earlyBird: 42000, emi: '₹8,000/mo × 6', rating: 4.8, learners: 530, hours: 70,
    certificate: 'Digital Forensics Investigator', instructors: ['lakshmi', 'arvind'],
    cohorts: [
      { start: '2026-11-30', end: '2027-01-03', schedule: 'Sat–Sun, 10:00–15:00', location: 'IITM Research Park, Chennai + online', seatsLeft: 2, seats: 25 },
      { start: '2027-02-08', end: '2027-03-14', schedule: 'Sat–Sun, 10:00–15:00', location: 'Hyderabad + online', seatsLeft: 19, seats: 25 }
    ],
    weeks: [
      w('Evidence handling', ['Chain of custody', 'Section 65B certificates', 'Write-blocking & imaging'], 'Acquire a disk image with full documentation'),
      w('Disk & memory forensics', ['File systems & artefacts', 'Volatility framework', 'Timeline analysis'], 'Investigate a ransomware intrusion'),
      w('Mobile forensics', ['Android & iOS acquisition', 'WhatsApp & UPI artefacts'], 'Recover evidence from a seized phone image'),
      w('Log & network analysis', ['Windows event logs', 'PCAP analysis', 'Cloud audit logs'], 'Trace an insider data exfiltration'),
      w('Expert reporting', ['Writing defensible reports', 'Courtroom testimony'], 'Mock deposition with feedback')
    ],
    outcomes: ['Handle evidence to legal standards', 'Run disk, memory and mobile investigations', 'Write and defend expert reports'],
    prerequisites: ['IT or law-enforcement background', 'Windows & Linux familiarity']
  },
  'secure-enterprise-development': {
    fee: 32000, emi: '₹5,500/mo × 6', rating: 4.7, learners: 690, hours: 40,
    certificate: 'Secure Software Engineer', instructors: ['kavya'],
    cohorts: [
      { start: '2026-12-07', end: '2027-01-01', schedule: 'Mon/Wed, 19:00–21:30 + Sat lab', location: 'Online (live)', seatsLeft: 11, seats: 50 },
      { start: '2027-02-15', end: '2027-03-12', schedule: 'Mon/Wed, 19:00–21:30 + Sat lab', location: 'Online (live)', seatsLeft: 37, seats: 50 }
    ],
    weeks: [
      w('Threat modelling', ['STRIDE', 'Data-flow diagrams', 'Abuse cases'], 'Threat-model a payments microservice'),
      w('OWASP Top 10 for developers', ['Injection & XSS fixes', 'AuthN/AuthZ patterns'], 'Fix 12 bugs in a sample Node/Java app'),
      w('Secure CI/CD', ['SAST, DAST, SCA', 'Supply-chain security', 'Signed builds'], 'Harden a GitHub Actions pipeline'),
      w('Secrets & code review', ['Vaults & rotation', 'Security code review'], 'Capstone: secure a full repo')
    ],
    outcomes: ['Threat-model new features', 'Ship a secured CI/CD pipeline', 'Lead security code reviews'],
    prerequisites: ['1+ year professional development experience']
  }
};

// SAMPLE
export const testimonials = [
  { text: 'The labs felt like real client work. Two months after the bootcamp I moved from IT support into a VAPT analyst role.', name: 'Nandhini Ravi', role: 'Security Analyst, Chennai', course: 'Ethical Hacking Bootcamp' },
  { text: 'Dr. Meera explained lattice crypto without drowning us in maths. I walked out with a migration plan my CTO approved.', name: 'Vignesh Kumar', role: 'Solutions Architect, Bengaluru', course: 'Post-Quantum Cryptography Essentials' },
  { text: 'Our entire leadership team attended. We now have an AI policy and three pilots running instead of endless debates.', name: 'Shalini Agarwal', role: 'COO, logistics firm', course: 'AI for Business Leaders' },
  { text: 'The mobile forensics module was gold. The mock deposition was terrifying and exactly what I needed.', name: 'Inspector R. Senthil', role: 'Cyber Crime Wing (sample)', course: 'Digital Forensics & Investigation' }
];

// SAMPLE
export const outcomeStats = [
  { value: '4,050+', label: 'Learners trained since 2022' },
  { value: '87%', label: 'Placed or promoted within 6 months' },
  { value: '₹6.8 LPA', label: 'Median post-course CTC (career switchers)' },
  { value: '4.8/5', label: 'Average course rating' }
];

export const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');
export const formatShortDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
