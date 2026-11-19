// Real talks, sessions and media appearances, built from the client's event photos ("Yespanchi - datas/Event-IMAGES").
// Titles and hosts come from the photo file names; a year is given only where the file name states one.

export const talkKinds = ['Conferences', 'Campus', 'BFSI & industry', 'Webinars', 'TV & media', 'Community', 'Training'] as const;
export type TalkKind = (typeof talkKinds)[number];

export type Talk = { title: string; host: string; kind: TalkKind; year?: string; images: string[] };

const g = (...names: string[]) => names.map((n) => `/gallery/${n}.jpg`);

/* Multi-photo highlights, shown as large cards. */
export const highlights: Talk[] = [
  { title: 'ISACA Chennai Conference 2025', host: 'ISACA Chennai Chapter', kind: 'Conferences', year: '2025', images: g('isaca-conference-2025', 'isaca-conference-2025-1', 'isaca-conference-2025-2', 'isaca-conference-2025-3', 'isaca-conference-2025-4') },
  { title: 'IDPS 2025', host: 'IDPS', kind: 'Conferences', year: '2025', images: g('idps-2025', 'idps-2025-2', 'idps-1', 'idps-2', 'idps-3') },
  { title: 'Session at VIT', host: 'VIT', kind: 'Campus', images: g('vit1', 'vit2', 'vit3', 'vit4', 'vit5', 'vit6', 'vit7', 'vit8', 'vit9') },
  { title: 'Session at SSN', host: 'SSN', kind: 'Campus', images: g('ssn', 'ssn-2', 'ssn-3', 'ssn-4', 'ssn-5', 'ssn-6', 'ssn-7', 'ssn-8', 'ssn-9') },
  { title: 'Programme for internal auditors', host: 'Internal auditors forum', kind: 'BFSI & industry', images: g('internal-auditors-invitation', 'internal-auditors-1', 'internal-auditors-2', 'internal-auditors-3', 'internal-auditors-4', 'internal-auditors-5', 'internal-auditors-6') },
  { title: 'AI for CMA', host: 'Cost and management accountants', kind: 'BFSI & industry', images: g('ai-for-cma', 'ai-for-cma-1', 'ai-for-cma-2', 'ai-for-cma-3', 'ai-for-cma-4') },
  { title: 'Session at IIMV', host: 'IIMV', kind: 'Campus', images: g('iimv-thumbnail', 'iimv-1', 'iimv-2') },
  { title: 'Cyberthon', host: 'Cyberthon', kind: 'Community', images: g('cyberthon-1', 'cyberthon-2', 'cyberthon-3') },
  { title: 'Industry 4.0', host: 'Rotary Vapi', kind: 'Community', images: g('rotaryvapi-industry4-0-1', 'rotaryvapi-industry4-0-2') }
];

/* Single talks and appearances. */
export const talks: Talk[] = [
  { title: 'Digitization: managing innovation vs risk', host: 'ICC 2021, ISACA', kind: 'Conferences', year: '2021', images: g('digitization-how-to-manage-innovation-vs-risk-management-icc-2021-isaca') },
  { title: 'Securing India in cyber space', host: 'MMA Conclave, Chennai', kind: 'Conferences', images: g('securing-india-in-cyber-space-mma-conclave-chennai') },
  { title: 'Data privacy panel discussion', host: 'SkillsDA IAPP launch, Ramada Plaza Chennai', kind: 'Conferences', images: g('data-privacy-panel-discussion-skillsda-iapp-launch-ramada-plaza-chennai') },
  { title: 'Model for sustainable human development', host: 'World Congress paper', kind: 'Conferences', images: g('world-congress-paper-model-for-sustainable-development-of-human') },

  { title: 'Digital security: emerging trends and increasing threats', host: 'Anna University', kind: 'Campus', year: '2024', images: g('digital-security-emerging-trends-and-increasing-threats-anna-university-6-jan-2024') },
  { title: 'Techastra ’22', host: 'Dr. M.G.R. Educational and Research Institute', kind: 'Campus', year: '2022', images: g('techastra-22-dr-m-g-r-educational-and-research-institute') },
  { title: 'Security threats in the metaverse and drones', host: 'Amrita Vishwa Vidyapeetham, Chennai', kind: 'Campus', images: g('security-threats-in-metaverse-and-drones-amrita-vishwa-vidyapeetam-chennai') },
  { title: 'Blockchain and its applications', host: 'SRMIST', kind: 'Campus', images: g('blockchain-and-its-applications-srmist') },
  { title: 'Impact of IoT on human life', host: 'SRM University', kind: 'Campus', images: g('impact-of-iot-on-human-life-srm-university') },
  { title: 'Digital space: is it safe and secure?', host: 'Srimad Andavan Arts and Science College, Srirangam', kind: 'Campus', images: g('digital-space-is-it-safe-and-secure-srimad-andavan-arts-and-science-college-srirangam') },
  { title: 'UPI safety', host: 'Cyber Jagrookta Diwas, Avinashilingam University', kind: 'Campus', images: g('upi-safety-cyber-jagrookta-diwas-avinashilingam-university') },
  { title: 'Cyber Security Club inaugural talk', host: 'Cyber Security Club', kind: 'Campus', images: g('cyber-security-club-inaugural-talk') },

  { title: 'Cyber security in banks', host: 'Knowledge Forum of Co-operative Bankers', kind: 'BFSI & industry', images: g('cyber-security-in-banks-knowledge-forum-of-co-operative-bankers') },
  { title: 'Payment systems: India and abroad', host: 'PDM, ISACA Chennai Chapter', kind: 'BFSI & industry', images: g('payment-systems-india-and-abroad-pdm-isaca-chennai-chapter') },
  { title: 'Leveraging existing payment systems and their security', host: 'Payments session', kind: 'BFSI & industry', images: g('leverage-existing-payment-systems-and-its-security') },
  { title: 'Money in the metaverse world', host: 'Digital Security Association of India', kind: 'BFSI & industry', images: g('money-in-the-metaverse-world-digital-security-association-of-india') },
  { title: 'Cyber security for women', host: 'Hindustan Chamber of Commerce', kind: 'BFSI & industry', images: g('cyber-security-for-women-hindustan-chamber-of-commerce') },
  { title: 'IOD presentation', host: 'LIC', kind: 'BFSI & industry', images: g('eka-pillai-iod-presentation-lic-1') },
  { title: 'AI and cyber security', host: 'Industry session', kind: 'BFSI & industry', images: g('ai-and-cyber-security') },

  { title: 'Cyber crimes in banking', host: 'Indian Institute of Banking and Finance', kind: 'Webinars', images: g('cyber-crimes-in-banking-webinar-indian-institute-of-banking-and-finance') },
  { title: 'Credit card and payment systems: threats and mitigations', host: 'Cyber Jagrookta Diwas, SkillsDA & CERT-In', kind: 'Webinars', images: g('credit-card-and-payment-systems-threats-and-mitigations-cyber-jagrookta-diwas-skillsda-cert-in') },
  { title: 'Financial fraud investigation', host: 'Cyber Jaagrookta Divas', kind: 'Webinars', images: g('financial-fraud-investigation-webinar-cyber-jaagrookta-divas') },
  { title: '60 tips in 60 minutes: cyber safety', host: 'MSubbu Academy', kind: 'Webinars', images: g('60-tips-in-60-minutes-cyber-safety-msubbu-academy') },
  { title: 'Blockchain for non-IT professionals', host: 'Srinivas Mahankali', kind: 'Webinars', images: g('blockchain-for-non-it-professionals-by-srinivas-mahankali') },
  { title: 'Blockchain and the healthcare supply chain', host: 'Srinivas Mahankali', kind: 'Webinars', images: g('blockchain-healthcare-supply-chain-srinivas-mahankali') },
  { title: 'SMS frauds (in Tamil)', host: 'AIM TN', kind: 'Webinars', images: g('sms-frauds-in-tamil-aim-tn') },

  { title: 'Banking, payment systems and security (live interview)', host: 'DD Pothigai TV', kind: 'TV & media', images: g('banking-payments-systems-and-security-live-interview-dd-pothigai-tv') },
  { title: 'Makkal Medai on cyber crime', host: 'Doordarshan Pothigai TV', kind: 'TV & media', images: g('makkal-medai-on-cyber-crime-doordarshan-pothigai-tv') },
  { title: 'Cyber crime talk', host: 'News7', kind: 'TV & media', images: g('news7-cyber-crime-talk') },
  { title: 'Internet frauds: how to prevent them', host: 'Jaya Plus TV', kind: 'TV & media', images: g('internet-frauds-how-to-prevent-jaya-plus-tv-channel') },
  { title: 'Cyber crime and online banking', host: 'Puthiya Thalaimurai Digital', kind: 'TV & media', images: g('cyber-crime-and-online-banking-puthia-thalaimurai-digital') },
  { title: 'Cyber security: Tamil expert talks (live)', host: 'Live broadcast', kind: 'TV & media', images: g('live-cyber-security-tamil-expert-talks') },
  { title: 'Cyber crimes and prevention', host: 'Kalki Magazine', kind: 'TV & media', images: g('cyber-crimes-and-prevention-kalki-magazine') },
  { title: 'Beware: card fraud on international transactions', host: 'Awareness feature', kind: 'TV & media', images: g('beware-cards-fraud-on-international-transactions') },
  { title: 'GPay scratch-card scam', host: 'NewsGlitz', kind: 'TV & media', images: g('gpay-scratch-scam-newsglitz') },
  { title: 'Journal article', host: 'Hindustan Chamber of Commerce', kind: 'TV & media', images: g('hcc-journal-article') },
  { title: 'Interview', host: 'Radio Blacksheep Tamil FM', kind: 'TV & media', images: g('radioblacksheep-tamil-fm') },
  { title: 'Idu Namma Tech-u: building her empire', host: 'Panchi’s guide to being a successful entrepreneur', kind: 'TV & media', images: g('idu-namma-tech-u-building-her-s-empire-panchi-s-guide-to-be-a-successful-entrepreneur') },
  { title: 'Blockchain for persistence', host: 'OverRated channel, Srinivas Mahankali', kind: 'TV & media', images: g('srinivas-mahankali-blockchain-for-persistance-overrated-channel') },

  { title: 'My journey from programmer to entrepreneur', host: 'Google Developer Group, IITM Research Park', kind: 'Community', year: '2023', images: g('my-journey-from-programmer-to-entrepreneur-google-developer-group-iitm-reserach-park-23-sep-23') },
  { title: 'Women Techmakers Pitchathon', host: 'GDG DevFest Chennai', kind: 'Community', images: g('women-techmakers-wtm-pitchathon-at-google-developers-group-devfest-chennai') },
  { title: 'What’s next: career guidance programme', host: 'Tiruvannamalai', kind: 'Community', year: '2023', images: g('whats-next-career-guidance-program-tiruvannamalai-27-may-2023') },
  { title: 'Cyber safety awareness', host: 'Lions Club Chennai Pattinam', kind: 'Community', images: g('cyber-safety-awareness-speech-lions-club-chennai-pattinam') },
  { title: 'Meet and greet', host: 'Startup Ignition, Chennai Chapter', kind: 'Community', images: g('startup-ignition-team-chennai-chapter-conducts-meet-and-greet-session-at-besant-nagar') },
  { title: 'Nellai Talks', host: 'Tirunelveli', kind: 'Community', images: g('nellai-talks') },
  { title: 'Education awareness lecture', host: 'Tirunelveli', kind: 'Community', images: g('education-awareness-lecture-tirunelveli') },

  { title: 'Secure Vision 2026: innovations in cyber defence', host: 'Five-day faculty development programme (online)', kind: 'Training', images: g('five-day-faculty-development-programme-online-on-secure-vision-2026-innovations-in-cyber-defence') },
  { title: 'In-house training programme', host: 'VOC Port', kind: 'Training', images: g('in-house-training-program-at-voc-port') }
];

