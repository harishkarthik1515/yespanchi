// SAMPLE: placeholder roles and copy for the Careers page. Confirm the real open roles before launch.

export type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  experience: string;
  level: 'Student' | 'Early career' | 'Experienced';
  about: string;
  doing: string[];
  lookingFor: string[];
  niceToHave: string[];
};

export const roles: Role[] = [
  {
    slug: 'post-quantum-cryptography-engineer', title: 'Post-Quantum Cryptography Engineer (C++/Rust)', team: 'QSecura', location: 'Chennai', type: 'Full-time', experience: '3–6 years', level: 'Experienced',
    about: 'Build the cryptographic core of QSecura PQ-SSL, our quantum-safe security platform.',
    doing: ['Implement and harden ML-KEM and ML-DSA code paths in C++ and Rust', 'Design key lifecycle, signing and verification services for payment gateways', 'Benchmark, test and review cryptographic code for side-channel safety'],
    lookingFor: ['Strong systems programming in C++ or Rust', 'Working knowledge of public-key cryptography and TLS', 'A habit of writing tests before trusting code'],
    niceToHave: ['Exposure to lattice-based cryptography or NIST PQC standards', 'Experience with payment or banking integrations']
  },
  {
    slug: 'ai-platform-engineer', title: 'AI Platform Engineer', team: 'YP-PRAKAAR', location: 'Chennai / Bengaluru', type: 'Full-time', experience: '2–5 years', level: 'Experienced',
    about: 'Work on YP-PRAKAAR, the enterprise AI governance platform that brings AI agents, models and decisions under one auditable layer.',
    doing: ['Build gateway, routing and failover features across LLM providers', 'Add observability with OpenTelemetry and partner integrations', 'Ship agent-recovery workflows and policy controls'],
    lookingFor: ['Backend engineering experience with distributed services', 'Familiarity with LLM APIs and agent frameworks', 'Comfort owning a feature from design to production'],
    niceToHave: ['Experience with Model Context Protocol (MCP)', 'Background in platform or SRE teams']
  },
  {
    slug: 'vapt-security-analyst', title: 'VAPT Security Analyst', team: 'Audit services', location: 'Chennai', type: 'Full-time', experience: '1–4 years', level: 'Early career',
    about: 'Test client applications, networks and cloud environments, and turn findings into fixes teams can ship.',
    doing: ['Run web, API, mobile and network penetration tests', 'Validate exploits and rate risk clearly', 'Write reports and walk client teams through remediation'],
    lookingFor: ['Hands-on penetration testing experience or strong lab work', 'Solid grasp of the OWASP Top 10 and common network attacks', 'Clear written English'],
    niceToHave: ['OSCP, CEH or equivalent', 'Cloud security experience']
  },
  {
    slug: 'compliance-consultant', title: 'ISO 27001 / PCI DSS Compliance Consultant', team: 'Audit services', location: 'Chennai', type: 'Full-time', experience: '3–7 years', level: 'Experienced',
    about: 'Lead gap assessments and audits that take clients from first review to certification.',
    doing: ['Scope and run ISO 27001 and PCI DSS engagements', 'Draft policies, control matrices and audit evidence', 'Coach client teams through remediation and internal audit'],
    lookingFor: ['Experience delivering ISO 27001 or PCI DSS programmes', 'Confidence presenting to senior stakeholders', 'Structured, evidence-led working style'],
    niceToHave: ['ISO 27001 Lead Auditor or CISA', 'Knowledge of RBI, CERT-In and DPDP Act requirements']
  },
  {
    slug: 'frontend-developer', title: 'Frontend Developer (React/Next.js)', team: 'Engineering', location: 'Chennai / Hybrid', type: 'Full-time', experience: '1–3 years', level: 'Early career',
    about: 'Build the dashboards and web experiences for our security and AI products.',
    doing: ['Develop accessible interfaces in React and Next.js', 'Work with designers and backend engineers on product features', 'Keep performance, security and quality high'],
    lookingFor: ['Good React and TypeScript fundamentals', 'Care for accessibility and detail', 'A portfolio or repository we can look at'],
    niceToHave: ['Experience with data-heavy dashboards', 'Interest in security tooling']
  },
  {
    slug: 'business-development-manager', title: 'Business Development Manager, Enterprise', team: 'Sales', location: 'Chennai', type: 'Full-time', experience: '4–8 years', level: 'Experienced',
    about: 'Grow our enterprise relationships across BFSI, government and regulated industries.',
    doing: ['Own the pipeline for products and audit services', 'Run discovery calls and shape proposals with consultants', 'Build long-term relationships with security and technology leaders'],
    lookingFor: ['Enterprise B2B sales experience in technology or security', 'Ability to explain technical value simply', 'A track record of closing complex deals'],
    niceToHave: ['Network in BFSI or the public sector', 'Experience selling compliance or security services']
  },
  {
    slug: 'security-research-intern', title: 'Security Research Intern', team: 'Research', location: 'Chennai (IITM RP)', type: 'Internship, 6 months', experience: 'Students', level: 'Student',
    about: 'Spend six months on a real research project beside our engineers at IIT Madras Research Park.',
    doing: ['Contribute to a scoped project in security, AI or post-quantum cryptography', 'Document and present your findings', 'Learn how audits and product engineering work day to day'],
    lookingFor: ['Final-year or postgraduate students in a relevant field', 'Programming ability in at least one language', 'Curiosity and persistence'],
    niceToHave: ['CTF participation or personal security projects', 'Coursework in cryptography or machine learning']
  }
];

export const benefits = ['Health insurance', 'Learning budget', 'Certification support', 'Hybrid work', 'Flexible hours', 'Internal training seats'];

export const hiringSteps = [
  { title: 'Apply', text: 'Send your profile through the form below.' },
  { title: '30-minute intro call', text: 'A conversation about your experience and what you want next.' },
  { title: 'Technical or case round', text: 'A practical exercise matched to the role.' },
  { title: 'Final conversation & offer', text: 'Meet the team lead and agree the details.' }
];

