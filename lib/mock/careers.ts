// SAMPLE — placeholder roles and copy for the Careers page. Confirm the real open roles before launch.

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
    slug: 'post-quantum-cryptography-engineer', title: 'Post-Quantum Cryptography Engineer (C++/Rust)', team: 'YP-PRAKAAR', location: 'Chennai', type: 'Full-time', experience: '3–6 years', level: 'Experienced',
    about: 'Build the cryptographic core of YP-PRAKAAR, our post-quantum security layer for payment infrastructure.',
    doing: ['Implement and harden ML-KEM and ML-DSA code paths in C++ and Rust', 'Design key lifecycle, signing and verification services for payment gateways', 'Benchmark, test and review cryptographic code for side-channel safety'],
    lookingFor: ['Strong systems programming in C++ or Rust', 'Working knowledge of public-key cryptography and TLS', 'A habit of writing tests before trusting code'],
    niceToHave: ['Exposure to lattice-based cryptography or NIST PQC standards', 'Experience with payment or banking integrations']
  },
  {
    slug: 'ai-platform-engineer', title: 'AI Platform Engineer', team: 'YP-RAKSHA', location: 'Chennai / Bengaluru', type: 'Full-time', experience: '2–5 years', level: 'Experienced',
    about: 'Work on YP-RAKSHA, the control plane that routes, governs and recovers enterprise AI workloads.',
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
    slug: 'business-development-manager', title: 'Business Development Manager — Enterprise', team: 'Sales', location: 'Chennai', type: 'Full-time', experience: '4–8 years', level: 'Experienced',
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

export const reasons = [
  { icon: 'key', title: 'Real products', text: 'Work on shipping post-quantum and enterprise AI products, not slideware.' },
  { icon: 'graduation', title: 'Learn beside researchers', text: 'Our office sits in IIT Madras Research Park, close to research groups and startups.' },
  { icon: 'check', title: 'Certifications paid for', text: 'We fund the certifications that help you grow in your role.' },
  { icon: 'shield', title: 'Clients that matter', text: 'Engagements across BFSI, government and enterprise.' }
] as const;

export const benefits = ['Health insurance', 'Learning budget', 'Certification support', 'Hybrid work', 'Flexible hours', 'Internal training seats'];

export const hiringSteps = [
  { title: 'Apply', text: 'Send your profile through the form below.' },
  { title: '30-minute intro call', text: 'A conversation about your experience and what you want next.' },
  { title: 'Technical or case round', text: 'A practical exercise matched to the role.' },
  { title: 'Final conversation & offer', text: 'Meet the team lead and agree the details.' }
];

export const employeeQuotes = [ // SAMPLE
  { quote: 'I joined as an analyst and was leading client tests within a year. The certification support is real.', name: 'Team member', role: 'Audit services (sample)' },
  { quote: 'Being inside the Research Park means the hard problems are a short walk away.', name: 'Team member', role: 'Product engineering (sample)' }
];

export const careersFaqs = [
  { q: 'Can I work remotely?', a: 'Most roles are hybrid, based in Chennai or Bengaluru. Each role lists its location; ask us about flexibility during the intro call.' },
  { q: 'Do you hire freshers?', a: 'Yes. Internships and early-career roles are open to students and recent graduates.' },
  { q: 'What is the interview format?', a: 'An intro call, one technical or case round matched to the role, and a final conversation with the team lead.' },
  { q: 'How long does hiring take?', a: 'We aim to reply within 7 working days of your application and keep you informed at every step.' },
  { q: 'Can I apply to more than one role?', a: 'Yes. Submit one application per role, or tell us in your cover note which roles interest you.' }
];
