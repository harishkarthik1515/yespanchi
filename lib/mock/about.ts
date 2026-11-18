export type Leader = { name: string; role: string; photo: string; linkedin: string; bio: string; highlights: string[] };

/* "Our Board" — from the About page and profile pages on yespanchi.com. */
export const leadership: Leader[] = [
  {
    name: 'Panchi S',
    role: 'Director',
    photo: '/leadership/panchi-s.jpg',
    linkedin: 'https://www.linkedin.com/in/yespanchi/',
    bio: 'Ms. Panchi S has over two decades of experience in technology and financial services. She has been instrumental in driving one of the public sector bank’s most successful digital transformations, leading internet banking, mobile banking, and payment gateway operations. With postgraduate degrees in engineering and management, and credentials as a Certified Information Systems Auditor (CISA) and Cyber Law professional, she brings both technical and governance expertise. She also contributes regularly as an IT columnist and keynote speaker, and serves as a Qualified Independent Director recognized by the Ministry of Corporate Affairs, India.',
    highlights: ['Led the digital transformation of a major PSU bank’s internet, mobile, and payment systems.', 'Certified Information Systems Auditor (CISA) and Cyber Law professional.', 'Qualified Independent Director recognized by the Ministry of Corporate Affairs, India.', 'Writes for leading IT publications and speaks regularly on digital finance, cybersecurity, and innovation.']
  },
  {
    name: 'Paraman Pachaimuthu',
    role: 'Director',
    photo: '/leadership/paraman-pachaimuthu.png',
    linkedin: 'https://www.linkedin.com/in/paraman-pachaimuthu-971aaa237/',
    bio: 'Mr. Paraman Pachaimuthu is a life-transforming speaker, writer, and founder of Malarchi, an initiative dedicated to uplifting lives within the Tamil-speaking community. Through coaching, programs, and his monthly magazine Valarchi, he has guided countless individuals toward personal growth and purpose.',
    highlights: ['Founder of Malarchi, focused on community empowerment and growth.', 'Publisher of Valarchi, a monthly magazine for Tamil-speaking audiences.', 'Conducts personal growth coaching and transformative programs.']
  }
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
  { title: 'Corporate Governance Platforms', text: 'Streamlining corporate governance with board meeting automation, regulatory compliance tracking, audit management, and centralized governance workflows.' }
];

/* "Industries We Empower" — About page */
export const industries = [
  'Banking & Financial Services', 'FinTech & Digital Payments', 'Government & Public Sector',
  'Healthcare & Medical Technology', 'Manufacturing & Industry 4.0', 'Insurance & InsurTech',
  'Telecommunications & Connectivity', 'Retail & E-Commerce', 'Logistics & Supply Chain',
  'Enterprise IT & AIOps', 'Energy & Utilities', 'Education & Research'
];

export const culture = [ // SAMPLE
  { value: '62', label: 'Team members', note: 'across Chennai & Bengaluru' },
  { value: '38%', label: 'Women in tech roles', note: 'incl. 3 of 6 leaders' },
  { value: '140+', label: 'Certifications held', note: 'OSCP, CISA, CISSP, ISO LA' },
  { value: '96%', label: 'Client retention', note: 'FY 2025–26' }
];

/* Only what the supplied certificates and photos evidence. */
export const certifications = [
  'Govt. of India DPIIT Recognised Startup (June 2021)', 'Member, Women Entrepreneurship Platform', 'IIT Madras Research Park'
];

