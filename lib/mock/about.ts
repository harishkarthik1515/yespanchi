// SAMPLE — fictional placeholder content for the About page. Replace with verified data before launch.
export type Leader = { name: string; role: string; focus: string; initials: string; since: string };

export const leadership: Leader[] = [ // SAMPLE
  { name: 'Meenakshi Raghavan', role: 'Founder & CEO', focus: 'Cyber governance, board advisory', initials: 'MR', since: '2021' },
  { name: 'Arvind Subramanian', role: 'Chief Technology Officer', focus: 'Post-quantum cryptography, PKI', initials: 'AS', since: '2021' },
  { name: 'Priya Venkatesh', role: 'Head of Audit & Compliance', focus: 'ISO 27001 Lead Auditor, PCI DSS', initials: 'PV', since: '2022' },
  { name: 'Karthik Narayanan', role: 'Lead, Offensive Security', focus: 'OSCP, red teaming, cloud VAPT', initials: 'KN', since: '2022' },
  { name: 'Divya Krishnamurthy', role: 'Head of AI Products', focus: 'LLM guardrails, voice AI', initials: 'DK', since: '2023' },
  { name: 'Rahul Iyer', role: 'Director, Training & Partnerships', focus: 'Academic MoUs, corporate L&D', initials: 'RI', since: '2023' }
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
