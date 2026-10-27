// SAMPLE — fictional placeholder content for service pages. Figures are illustrative only.
export type CaseStudy = { industry: string; problem: string; outcome: string; metrics: { value: string; label: string }[] };
export type ServiceDetail = {
  priceFrom: string;
  duration: string;
  tools: string[];
  caseStudy: CaseStudy;
  faqs: { q: string; a: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = { // SAMPLE
  vapt: {
    priceFrom: '₹1.5L', duration: '2–4 weeks',
    tools: ['OWASP ASVS', 'OWASP MASVS', 'Burp Suite Pro', 'Nessus', 'Nmap', 'Metasploit', 'CERT-In guidelines', 'CVSS v3.1'],
    caseStudy: { industry: 'Fintech · UPI payments', problem: 'A payments app needed a CERT-In aligned VAPT before an RBI audit, with 9 microservices and Android/iOS apps in scope.', outcome: 'Found 3 critical issues (IDOR, broken JWT validation, exposed S3 bucket); all fixed and re-tested in 11 days.', metrics: [{ value: '47', label: 'Findings' }, { value: '3', label: 'Critical' }, { value: '11 days', label: 'Fix to re-test' }] },
    faqs: [
      { q: 'Will testing disrupt production?', a: 'We agree test windows, rate limits and exclusions up front. Destructive tests run only on staging unless you approve otherwise.' },
      { q: 'Do you provide a re-test certificate?', a: 'Yes. One re-test within 60 days is included, followed by a signed certificate suitable for regulators and customers.' },
      { q: 'Black-box or grey-box?', a: 'Both. Most clients pick grey-box with test credentials for the best coverage per rupee.' }
    ]
  },
  'iso-27001': {
    priceFrom: '₹3L', duration: '12–16 weeks',
    tools: ['ISO/IEC 27001:2022', 'ISO/IEC 27002', 'Annex A controls', 'Risk register', 'SoA templates', 'DPDP Act 2023'],
    caseStudy: { industry: 'Manufacturing · 450 staff', problem: 'An auto-components exporter needed ISO 27001 to retain a European OEM contract, with no existing ISMS.', outcome: 'ISMS designed and implemented; certified at first attempt with zero major non-conformities.', metrics: [{ value: '14 wks', label: 'To certification' }, { value: '0', label: 'Major NCs' }, { value: '93', label: 'Controls mapped' }] },
    faqs: [
      { q: 'Do you issue the certificate?', a: 'No — an accredited certification body does. We prepare you, run the internal audit and support you through stage 1 and 2.' },
      { q: 'We were certified on the 2013 version. What changes?', a: 'We run a 2022 transition gap check covering the 11 new Annex A controls and update your SoA.' },
      { q: 'How much staff time does it need?', a: 'Typically 4–6 hours a week from an internal owner, plus short workshops with each department.' }
    ]
  },
  'pci-dss': {
    priceFrom: '₹2.5L', duration: '6–10 weeks',
    tools: ['PCI DSS v4.0', 'SAQ A / A-EP / D', 'ASV scanning', 'Segmentation testing', 'Tokenisation review'],
    caseStudy: { industry: 'E-commerce · D2C brand', problem: 'Card data was touching app servers, putting the whole network in scope.', outcome: 'Re-architected to hosted fields and tokenisation, shrinking scope to SAQ A-EP.', metrics: [{ value: '82%', label: 'Scope reduced' }, { value: '8 wks', label: 'To compliance' }, { value: '0', label: 'Open gaps' }] },
    faqs: [
      { q: 'Are you a QSA?', a: 'We deliver readiness and remediation and partner with a QSA firm for the formal Report on Compliance.' },
      { q: 'What changed in v4.0?', a: 'Targeted risk analysis, stronger MFA and new e-commerce script controls (6.4.3, 11.6.1) — all covered in our gap check.' }
    ]
  },
  'iaap-audit': {
    priceFrom: '₹1.8L', duration: '3–6 weeks',
    tools: ['NIST CSF 2.0', 'CIS Controls v8', 'RBI / SEBI circulars', 'Control matrix', 'Evidence tracker'],
    caseStudy: { industry: 'Co-operative bank', problem: 'Regulator observations from the previous inspection were still open after a year.', outcome: 'Structured audit closed every observation with evidence ahead of the next inspection.', metrics: [{ value: '28', label: 'Observations closed' }, { value: '5 wks', label: 'Fieldwork' }, { value: '100%', label: 'Evidence mapped' }] },
    faqs: [
      { q: 'Which frameworks do you audit against?', a: 'Your internal policies plus any regulator baseline — RBI, SEBI, IRDAI or CERT-In — mapped into one control matrix.' },
      { q: 'Is remote fieldwork possible?', a: 'Yes, most evidence review is remote. We typically need 2–3 on-site days.' }
    ]
  },
  'forensic-audit': {
    priceFrom: '₹2L', duration: '4–8 weeks',
    tools: ['ACL / IDEA analytics', 'Benford analysis', 'Tally & SAP log review', 'Email review', 'Chain of custody'],
    caseStudy: { industry: 'Logistics · mid-market', problem: 'Unexplained vendor payments had been leaking for 18 months.', outcome: 'Identified a ghost-vendor scheme and quantified loss for recovery proceedings.', metrics: [{ value: '₹1.4 Cr', label: 'Loss quantified' }, { value: '3', label: 'Ghost vendors' }, { value: '6 wks', label: 'Engagement' }] },
    faqs: [
      { q: 'Is the report usable in court?', a: 'Reports follow chain-of-custody practices and our analysts can depose as expert witnesses.' },
      { q: 'Is the engagement confidential?', a: 'Yes — we work under NDA and usually report directly to the board or audit committee.' }
    ]
  },
  'cyber-forensics': {
    priceFrom: '₹1.2L', duration: '1–4 weeks',
    tools: ['FTK Imager', 'Autopsy', 'Volatility', 'Magnet AXIOM', 'KAPE', 'Section 65B certification'],
    caseStudy: { industry: 'IT services · 1,200 staff', problem: 'Ransomware encrypted 140 endpoints over a weekend; leadership needed scope and root cause.', outcome: 'Traced entry to an exposed RDP host, contained in 36 hours and produced an insurer-ready report.', metrics: [{ value: '36 hrs', label: 'To containment' }, { value: '140', label: 'Endpoints triaged' }, { value: '1', label: 'Root cause' }] },
    faqs: [
      { q: 'Do you offer 24×7 incident response?', a: 'Yes, for retainer clients. Others can call our hotline; we aim to mobilise within 4 business hours.' },
      { q: 'Will you preserve evidence for police?', a: 'Yes. We image with write-blockers and provide Section 65B certificates for Indian courts.' }
    ]
  },
  'cyber-insurance': {
    priceFrom: '₹75K', duration: '2–3 weeks',
    tools: ['Insurer questionnaires', 'MFA & backup attestations', 'External attack-surface scan', 'Control gap report'],
    caseStudy: { industry: 'Healthcare · hospital chain', problem: 'Renewal was declined after the insurer flagged weak backups and no MFA on email.', outcome: 'Closed key gaps and re-submitted; cover renewed with a lower premium.', metrics: [{ value: '22%', label: 'Lower premium' }, { value: '₹10 Cr', label: 'Cover secured' }, { value: '3 wks', label: 'Turnaround' }] },
    faqs: [
      { q: 'Are you an insurance broker?', a: 'No. We are independent advisors — we help you qualify and negotiate; your broker places the policy.' },
      { q: 'Do you help during a claim?', a: 'Yes. Our forensics team documents the incident in the format insurers expect.' }
    ]
  },
  'digital-marketing': {
    priceFrom: '₹60K/mo', duration: '3-month minimum',
    tools: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'GA4', 'Search Console', 'Ahrefs', 'HubSpot'],
    caseStudy: { industry: 'B2B SaaS · HR tech', problem: 'Organic traffic had plateaued and paid leads cost too much.', outcome: 'Technical SEO fixes plus a content cluster strategy and tighter paid targeting.', metrics: [{ value: '3.1×', label: 'Organic traffic' }, { value: '−41%', label: 'Cost per lead' }, { value: '6 mo', label: 'Timeframe' }] },
    faqs: [
      { q: 'Do you lock us into long contracts?', a: 'Three months minimum, then month-to-month.' },
      { q: 'Who owns the ad accounts?', a: 'You do. We work inside your accounts with delegated access.' }
    ]
  },
  'ai-movie-clips': {
    priceFrom: '₹40K/clip', duration: '5–10 days',
    tools: ['Generative video models', 'AI voice-over (EN/TA/HI)', 'DaVinci Resolve', 'Brand style guides'],
    caseStudy: { industry: 'EdTech · course launch', problem: 'Needed 12 promo clips in 3 languages on a tight launch budget.', outcome: 'Produced all clips with AI scenes and multilingual voice-over at a fraction of studio cost.', metrics: [{ value: '12', label: 'Clips' }, { value: '3', label: 'Languages' }, { value: '−65%', label: 'vs studio cost' }] },
    faqs: [
      { q: 'Who owns the output?', a: 'You receive full usage rights to the final clips; we disclose any model licence terms.' },
      { q: 'Can you match our brand?', a: 'Yes — we build a style frame from your guidelines before generating.' }
    ]
  }
};
