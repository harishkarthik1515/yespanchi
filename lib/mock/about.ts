export type Leader = { name: string; role: string; initials: string };

/* Real leadership — the source document lists only two names and two roles
   ("Panchi S | Paraman Pachaimuthu | CTO | CBO") with no further detail, so
   no focus area, tenure or bio is included here. Paired in the order given. */
export const leadership: Leader[] = [
  { name: 'Panchi S', role: 'CTO', initials: 'PS' },
  { name: 'Paraman Pachaimuthu', role: 'CBO', initials: 'PP' }
];

/* "Our Core Expertise" — About page */
export const coreExpertise = [
  { title: 'Artificial Intelligence & Agentic AI', text: 'Designing autonomous AI agents, multi-agent LLM systems, intelligent workflow orchestration, and generative AI solutions that streamline complex enterprise operations.' },
  { title: 'Enterprise AI Platforms', text: 'Building production-ready enterprise AI infrastructure with private LLM integration, retrieval-augmented generation (RAG), vector search, and scalable AI deployment.' },
  { title: 'AI Governance & Responsible AI', text: 'Enabling responsible AI adoption through auditable governance frameworks, model risk management, bias monitoring, data privacy controls, and regulatory compliance.' },
  { title: 'Quantum Computing & Post-Quantum Security', text: 'Preparing enterprises for the quantum era with post-quantum cryptography (PQC), NIST-standard ML-KEM and ML-DSA implementations, and cryptographic migration strategies designed to mitigate future quantum threats.' },
  { title: 'Cybersecurity & Digital Trust', text: 'Strengthening enterprise security through threat intelligence, Zero Trust architecture, vulnerability assessment and penetration testing (VAPT), security operations, and incident response.' },
  { title: 'Banking & FinTech Solutions', text: 'Modernizing financial technology with secure payment processing, ISO 20022 integration, fraud detection, payment security, and core banking transformation.' },
  { title: 'Enterprise Digital Transformation', text: 'Accelerating business modernization through cloud migration, microservices architecture, legacy system modernization, and intelligent business process automation.' },
  { title: 'Corporate Governance Platforms', text: 'Streamlining corporate governance with board meeting automation, regulatory compliance tracking, audit management, and centralized governance workflows.' },
  { title: 'Technology Consulting & Training', text: 'Empowering organizations through strategic technology advisory, executive cybersecurity programs, AI upskilling, and specialized engineering training across emerging technologies.' }
];

/* "Industries We Empower" — About page */
export const industries = [
  'Banking & Financial Services', 'FinTech & Digital Payments', 'Government & Public Sector',
  'Healthcare & Medical Technology', 'Manufacturing & Industry 4.0', 'Insurance & InsurTech',
  'Telecommunications & Connectivity', 'Retail & E-Commerce', 'Logistics & Supply Chain',
  'Enterprise IT & AIOps', 'Energy & Utilities', 'Education & Research'
];

/* "What Sets Our Innovation and Engineering Apart" — About page */
export const differentiators = [
  { title: 'Integrated Technology Expertise', text: 'A comprehensive portfolio spanning Enterprise AI, Agentic AI, Post-Quantum Cryptography, Cybersecurity, and Digital Transformation.' },
  { title: 'Security-First Engineering', text: 'Enterprise-grade platforms built with security, governance, regulatory compliance, and operational resilience embedded by design.' },
  { title: 'Deep Industry Understanding', text: 'Specialized technology capabilities aligned with the complex security, compliance, and operational demands of banking, financial services, and regulated industries.' },
  { title: 'End-to-End Technology Partnership', text: 'Full-lifecycle capabilities spanning strategic consulting, product engineering, implementation, managed services, and executive technology training.' },
  { title: 'Collaborative Innovation', text: 'A commitment to advancing technology through strategic collaborations, research partnerships, and engagement with academia, technology innovators, and industry ecosystems.' }
];

export const milestones = [ // SAMPLE
  { year: '2021', title: 'Founded in Chennai', text: 'Incorporated with a 4-person team; first VAPT engagements for two Chennai fintechs.', metric: '6 clients' },
  { year: '2022', title: 'FICCI Start-Up STAR', text: 'Corporate training practice launched; 1,200+ professionals trained in year one.', metric: '1.2k trained' },
  { year: '2023', title: 'Audit practice scales', text: 'ISO 27001, PCI DSS and forensic audits added. Moved into IIT Madras Research Park.', metric: '40+ audits' },
  { year: '2024', title: 'Product R&D', text: 'BoardMind, Alexi Voice and UNIFAI enter pilot with three enterprise design partners.', metric: '3 pilots' },
  { year: '2025', title: 'Quantum & AI governance', text: 'Quantik and AI Guardrails introduced; PQC readiness assessments for BFSI.', metric: '12 BFSI orgs' },
  { year: '2026', title: 'QSecura PQ-SSL', text: 'Post-quantum SSL launched for the enterprise; team crosses 60 people.', metric: '60+ people' }
];

export const culture = [ // SAMPLE
  { value: '62', label: 'Team members', note: 'across Chennai & Bengaluru' },
  { value: '38%', label: 'Women in tech roles', note: 'incl. 3 of 6 leaders' },
  { value: '140+', label: 'Certifications held', note: 'OSCP, CISA, CISSP, ISO LA' },
  { value: '96%', label: 'Client retention', note: 'FY 2025–26' }
];

export const certifications = [ // SAMPLE
  'ISO/IEC 27001:2022', 'DPIIT Recognised Startup', 'MSME Udyam', 'IIT Madras Research Park', 'Microsoft Partner', 'AWS Partner Network', 'NASSCOM Member', 'ISACA Chennai Chapter'
];

export const testimonials = [ // SAMPLE
  { quote: 'They found a critical IDOR in our UPI flow two weeks before go-live. The re-test certificate went straight into our RBI submission.', name: 'Sanjay Menon', role: 'CISO, Chennai payments startup', initials: 'SM' },
  { quote: 'Our ISO 27001 certification came through in 14 weeks with zero major non-conformities. Practical, not paperwork-heavy.', name: 'Lakshmi Prabhu', role: 'Head of IT, Coimbatore manufacturer', initials: 'LP' },
  { quote: 'The AI and cyber training for our cadre was hands-on and in Tamil where it mattered. Attendance stayed full all week.', name: 'R. Selvakumar', role: 'Training coordinator, state department', initials: 'RS' }
];
