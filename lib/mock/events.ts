// SAMPLE — fictional event, speaker, partner and gallery data for layout/demo purposes only.

export type EventType = 'Summit' | 'Conference' | 'Workshop' | 'Webinar' | 'Bootcamp';

export type Speaker = { name: string; role: string; org: string };
export type AgendaItem = { time: string; title: string; speaker?: string; kind?: 'talk' | 'panel' | 'demo' | 'break' | 'workshop' };

export type MockEvent = {
  slug: string;
  title: string;
  type: EventType;
  date: string; // ISO yyyy-mm-dd (start)
  endDate?: string;
  start: string; // HH:mm IST
  end: string; // HH:mm IST
  city: string;
  venue: string;
  address: string;
  summary: string;
  description: string;
  tags: string[];
  price: number; // 0 = free, INR
  seats: number;
  registered: number;
  featured?: boolean;
  speakers: Speaker[];
  agenda: AgendaItem[];
  recap?: { attendees: number; sessions: number; rating: number; highlight: string };
};

// SAMPLE
export const mockEvents: MockEvent[] = [
  {
    slug: 'quantum-safe-india-summit-2026',
    title: 'Quantum-Safe India Summit 2026',
    type: 'Summit',
    date: '2026-12-04',
    start: '09:30',
    end: '17:30',
    city: 'Chennai',
    venue: 'IITM Research Park — Auditorium',
    address: 'Kanagam Road, Taramani, Chennai 600113',
    summary: 'Banking, government and technology leaders on preparing India’s critical systems for post-quantum cryptography.',
    description:
      'A full day of keynotes, panels and live demos on the migration to post-quantum cryptography. Expect practical guidance on crypto-inventory, hybrid TLS, HSM roadmaps and what regulators are likely to ask for in 2027–28.',
    tags: ['Post-quantum', 'BFSI', 'Policy'],
    price: 2499,
    seats: 320,
    registered: 268,
    featured: true,
    speakers: [
      { name: 'Dr. Meenakshi Raghavan', role: 'Professor, Computer Science', org: 'Partner Research Institute' },
      { name: 'Arvind Subramanian', role: 'CISO', org: 'Kaveri Cooperative Bank' },
      { name: 'Farah Siddiqui', role: 'Director, Cyber Policy', org: 'State e-Governance Agency' },
      { name: 'Karthik Venkatesan', role: 'Head of Cryptography', org: 'YesPanchi' }
    ],
    agenda: [
      { time: '09:30', title: 'Registration & filter coffee', kind: 'break' },
      { time: '10:00', title: 'Keynote: The quantum clock is already ticking', speaker: 'Dr. Meenakshi Raghavan', kind: 'talk' },
      { time: '10:45', title: 'Panel: PQC in payments and core banking', speaker: 'Arvind Subramanian, Farah Siddiqui', kind: 'panel' },
      { time: '12:00', title: 'Live demo: QSecura PQ-SSL hybrid handshake', speaker: 'Karthik Venkatesan', kind: 'demo' },
      { time: '13:00', title: 'Lunch & networking', kind: 'break' },
      { time: '14:00', title: 'Workshop: Building your crypto-inventory', kind: 'workshop' },
      { time: '16:00', title: 'Regulator fireside: what 2027 audits will ask', speaker: 'Farah Siddiqui', kind: 'panel' },
      { time: '17:00', title: 'Closing remarks & high tea', kind: 'break' }
    ]
  },
  {
    slug: 'vapt-masterclass-nov-2026',
    title: 'VAPT Masterclass: Scope to Report',
    type: 'Webinar',
    date: '2026-11-20',
    start: '16:00',
    end: '18:00',
    city: 'Online',
    venue: 'Live on Zoom',
    address: 'Joining link sent after registration',
    summary: 'A practical walkthrough of a real-world penetration test — scoping, exploitation and writing a report people actually read.',
    description:
      'Our red team replays an anonymised engagement end to end. Bring questions — the last 30 minutes are open Q&A. Recording available to registrants for 14 days.',
    tags: ['VAPT', 'Red team'],
    price: 0,
    seats: 500,
    registered: 412,
    speakers: [
      { name: 'Priya Natarajan', role: 'Lead Penetration Tester', org: 'YesPanchi' },
      { name: 'Rohit Menon', role: 'Security Engineer', org: 'YesPanchi' }
    ],
    agenda: [
      { time: '16:00', title: 'Scoping a test without surprises', speaker: 'Priya Natarajan', kind: 'talk' },
      { time: '16:30', title: 'Live exploitation of a staging web app', speaker: 'Rohit Menon', kind: 'demo' },
      { time: '17:10', title: 'Writing a report the board will read', speaker: 'Priya Natarajan', kind: 'talk' },
      { time: '17:30', title: 'Open Q&A', kind: 'panel' }
    ]
  },
  {
    slug: 'ai-governance-roundtable-2026',
    title: 'AI Governance Roundtable for Boards',
    type: 'Workshop',
    date: '2026-11-12',
    start: '15:00',
    end: '19:00',
    city: 'Bengaluru',
    venue: 'The Lalbagh Room, Residency Road',
    address: 'Residency Road, Bengaluru 560025',
    summary: 'Board members and CXOs on governing generative and agentic AI responsibly — invite-only, 40 seats.',
    description:
      'A closed-door, Chatham House roundtable for directors and CXOs. We cover AI risk registers, the DPDP Act, model accountability and how BoardMind supports board-level oversight.',
    tags: ['AI governance', 'Boards', 'DPDP'],
    price: 0,
    seats: 40,
    registered: 34,
    speakers: [
      { name: 'Lakshmi Iyer', role: 'Independent Director', org: 'Listed NBFC' },
      { name: 'Sanjay Kulkarni', role: 'Chief Digital Officer', org: 'Deccan Logistics' },
      { name: 'Ananya Krishnan', role: 'Product Lead, BoardMind', org: 'YesPanchi' }
    ],
    agenda: [
      { time: '15:00', title: 'The AI risk landscape for Indian boards', speaker: 'Lakshmi Iyer', kind: 'talk' },
      { time: '15:45', title: 'BoardMind walkthrough', speaker: 'Ananya Krishnan', kind: 'demo' },
      { time: '16:30', title: 'Tea break', kind: 'break' },
      { time: '16:45', title: 'Roundtable: who owns AI risk?', speaker: 'Sanjay Kulkarni', kind: 'panel' },
      { time: '18:30', title: 'Dinner', kind: 'break' }
    ]
  },
  {
    slug: 'student-ctf-bootcamp-jan-2027',
    title: 'Student CTF Bootcamp',
    type: 'Bootcamp',
    date: '2027-01-17',
    endDate: '2027-01-18',
    start: '09:00',
    end: '18:00',
    city: 'Chennai',
    venue: 'IITM Research Park — Lab 3',
    address: 'Kanagam Road, Taramani, Chennai 600113',
    summary: 'Two days of hands-on capture-the-flag training for engineering students, ending in a live team competition.',
    description:
      'Web, crypto, forensics and reversing challenges, mentored by our security team. Top three teams win internship interviews. Bring a laptop; we provide the lab.',
    tags: ['Students', 'CTF', 'Hands-on'],
    price: 499,
    seats: 120,
    registered: 57,
    speakers: [
      { name: 'Divya Shankar', role: 'Training Lead', org: 'YesPanchi Academy' },
      { name: 'Mohammed Irfan', role: 'Security Researcher', org: 'YesPanchi' }
    ],
    agenda: [
      { time: '09:00', title: 'Day 1 — Web & crypto fundamentals', speaker: 'Divya Shankar', kind: 'workshop' },
      { time: '13:00', title: 'Lunch', kind: 'break' },
      { time: '14:00', title: 'Forensics & reversing labs', speaker: 'Mohammed Irfan', kind: 'workshop' },
      { time: '09:00', title: 'Day 2 — Team CTF (6 hours)', kind: 'workshop' },
      { time: '16:30', title: 'Results & awards', kind: 'talk' }
    ]
  },
  {
    slug: 'cyber-resilience-conclave-2026',
    title: 'Cyber Resilience Conclave',
    type: 'Conference',
    date: '2026-08-22',
    start: '09:30',
    end: '17:00',
    city: 'Chennai',
    venue: 'Hotel Savera, Mylapore',
    address: 'Dr. Radhakrishnan Salai, Chennai 600004',
    summary: 'Incident response, cyber insurance and resilience for growing enterprises.',
    description: 'A conference for IT heads and founders on surviving — and recovering from — the incident you hope never comes.',
    tags: ['Incident response', 'Insurance'],
    price: 1499,
    seats: 250,
    registered: 250,
    speakers: [
      { name: 'Vikram Rao', role: 'Head of IT', org: 'Coromandel Textiles' },
      { name: 'Neha Agarwal', role: 'Cyber Underwriter', org: 'Insurance partner' },
      { name: 'Priya Natarajan', role: 'Lead Penetration Tester', org: 'YesPanchi' }
    ],
    agenda: [
      { time: '09:30', title: 'Opening keynote', kind: 'talk' },
      { time: '11:00', title: 'Ransomware tabletop exercise', kind: 'workshop' },
      { time: '14:00', title: 'Insurer panel: what gets paid out', speaker: 'Neha Agarwal', kind: 'panel' }
    ],
    recap: { attendees: 236, sessions: 9, rating: 4.7, highlight: 'A 90-minute ransomware tabletop run live with 18 enterprise teams.' }
  },
  {
    slug: 'women-in-cyber-meetup-2026',
    title: 'Women in Cyber Meetup',
    type: 'Workshop',
    date: '2026-06-14',
    start: '10:00',
    end: '14:00',
    city: 'Chennai',
    venue: 'IITM Research Park — Atrium',
    address: 'Kanagam Road, Taramani, Chennai 600113',
    summary: 'Mentoring and career conversations for women in security.',
    description: 'Fireside chats, mentoring circles and an open job board for women entering or growing in cybersecurity.',
    tags: ['Community', 'Careers'],
    price: 0,
    seats: 100,
    registered: 100,
    speakers: [
      { name: 'Divya Shankar', role: 'Training Lead', org: 'YesPanchi Academy' },
      { name: 'Farah Siddiqui', role: 'Director, Cyber Policy', org: 'State e-Governance Agency' }
    ],
    agenda: [
      { time: '10:00', title: 'Fireside chat', kind: 'talk' },
      { time: '11:00', title: 'Mentoring circles', kind: 'workshop' },
      { time: '13:00', title: 'Lunch & networking', kind: 'break' }
    ],
    recap: { attendees: 112, sessions: 4, rating: 4.9, highlight: '38 mentoring pairs formed; 6 hires through the job board.' }
  },
  {
    slug: 'pqc-for-developers-webinar-2026',
    title: 'PQC for Developers',
    type: 'Webinar',
    date: '2026-03-19',
    start: '17:00',
    end: '18:30',
    city: 'Online',
    venue: 'Live on YouTube',
    address: 'Recording available on request',
    summary: 'ML-KEM and ML-DSA explained for engineers — with code.',
    description: 'A developer-focused session on NIST’s new post-quantum standards and how to prototype hybrid key exchange today.',
    tags: ['Post-quantum', 'Developers'],
    price: 0,
    seats: 1000,
    registered: 864,
    speakers: [{ name: 'Karthik Venkatesan', role: 'Head of Cryptography', org: 'YesPanchi' }],
    agenda: [
      { time: '17:00', title: 'From RSA to ML-KEM', kind: 'talk' },
      { time: '17:40', title: 'Live coding a hybrid handshake', kind: 'demo' }
    ],
    recap: { attendees: 731, sessions: 2, rating: 4.6, highlight: '731 developers live, 2,400+ replay views in the first month.' }
  }
];

// SAMPLE
export const mockMous = [
  { partner: 'Sri Venkateswara College of Engineering', short: 'SVCE', city: 'Sriperumbudur', kind: 'Academic', date: '2026-09-18', scope: ['Cybersecurity minor curriculum', '30 paid internships / year', 'Faculty development'], status: 'Active' },
  { partner: 'Centre for Quantum Information Research', short: 'CQIR', city: 'Chennai', kind: 'Research', date: '2026-07-02', scope: ['Joint PQC benchmarking', 'Shared HSM test-bed', 'Co-authored papers'], status: 'Active' },
  { partner: 'Tamil Nadu MSME Technology Forum', short: 'TNMTF', city: 'Coimbatore', kind: 'Industry', date: '2026-04-11', scope: ['Subsidised VAPT for 200 MSMEs', 'Awareness workshops in Tamil'], status: 'Active' },
  { partner: 'Kongu Institute of Technology', short: 'KIT', city: 'Erode', kind: 'Academic', date: '2025-12-05', scope: ['AI & blockchain centre of excellence', 'Hackathon co-hosting'], status: 'Active' },
  { partner: 'Bharat Fintech Alliance', short: 'BFA', city: 'Mumbai', kind: 'Industry', date: '2025-08-27', scope: ['PQC readiness playbook for members', 'Quarterly threat briefings'], status: 'Renewal due' },
  { partner: 'Madurai Polytechnic Consortium', short: 'MPC', city: 'Madurai', kind: 'Academic', date: '2025-03-14', scope: ['Diploma-level SOC analyst track', 'Placement support'], status: 'Active' }
] as const;

// SAMPLE — gallery tiles render CSS patterns, not photos
export const mockGallery = [
  { caption: 'Keynote at the Quantum-Safe Summit', event: 'Quantum-Safe India Summit', date: '2025-12-05', tall: true },
  { caption: 'VAPT lab — students on live targets', event: 'VAPT Masterclass', date: '2026-02-08' },
  { caption: 'MoU signing with SVCE', event: 'Partnerships', date: '2026-09-18' },
  { caption: 'Mentoring circles', event: 'Women in Cyber Meetup', date: '2026-06-14', tall: true },
  { caption: 'Hour 5 of the student CTF', event: 'Student CTF Bootcamp', date: '2026-01-18' },
  { caption: 'Ransomware tabletop in progress', event: 'Cyber Resilience Conclave', date: '2026-08-22' },
  { caption: 'Directors at the AI governance roundtable', event: 'AI Governance Roundtable', date: '2025-11-13', tall: true },
  { caption: 'Graduation — SOC analyst cohort 4', event: 'YesPanchi Academy', date: '2026-05-30' },
  { caption: 'Team day at IITM Research Park', event: 'Team', date: '2026-07-25' },
  { caption: 'Award evening, Chennai', event: 'Recognition', date: '2026-02-21', tall: true },
  { caption: 'Live coding a hybrid handshake', event: 'PQC for Developers', date: '2026-03-19' },
  { caption: 'MSME awareness workshop in Coimbatore', event: 'Partnerships', date: '2026-05-09' }
];
