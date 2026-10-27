// SAMPLE — fictional testimonials, case studies and articles for the home page.

// SAMPLE
export const testimonials = [
  { quote: 'Their VAPT report was the first one our board actually read. Every finding came with a fix our developers could ship that sprint.', name: 'Ramesh Chandrasekar', role: 'CTO', org: 'Pallava Payments (sample)' },
  { quote: 'We went from a spreadsheet of certificates to a full crypto-inventory and a PQC migration plan in six weeks.', name: 'Kavitha Sundaram', role: 'Head of Information Security', org: 'Cauvery Co-operative Bank (sample)' },
  { quote: 'The SOC analyst programme gave our students real lab hours, not slides. Eleven of them were hired before graduation.', name: 'Dr. Senthil Kumar', role: 'Dean, Industry Relations', org: 'Partner Engineering College (sample)' },
  { quote: 'BoardMind turned our AI policy from a PDF into something we can actually monitor at every board meeting.', name: 'Anjali Deshpande', role: 'Independent Director', org: 'Konkan Agro Ltd (sample)' }
];

// SAMPLE
export const caseStudies = [
  {
    sector: 'Banking',
    title: 'Cooperative bank hardens UPI stack ahead of RBI audit',
    summary: 'Black-box and grey-box VAPT across mobile, API gateway and core banking integration, followed by a fix-verify cycle.',
    metrics: [{ v: '47', l: 'findings closed' }, { v: '21 days', l: 'to audit-ready' }, { v: '0', l: 'critical at re-test' }]
  },
  {
    sector: 'Government',
    title: 'State department moves citizen portal to hybrid PQ-TLS',
    summary: 'Crypto-inventory of 160+ endpoints and a staged rollout of QSecura PQ-SSL without downtime for 2.3M monthly users.',
    metrics: [{ v: '160+', l: 'endpoints mapped' }, { v: '99.98%', l: 'uptime in rollout' }, { v: '<4 ms', l: 'handshake overhead' }]
  },
  {
    sector: 'Manufacturing',
    title: 'Textile exporter achieves ISO 27001 in one cycle',
    summary: 'Gap assessment, policy set, staff training in Tamil and English, and internal audit support across three plants.',
    metrics: [{ v: '1st', l: 'attempt certification' }, { v: '640', l: 'staff trained' }, { v: '−62%', l: 'phishing click rate' }]
  }
];

// SAMPLE
export const insights = [
  { slug: 'pqc-migration-checklist-2027', tag: 'Post-quantum', title: 'A practical PQC migration checklist for Indian banks in 2027', date: '2026-10-14', read: 8, excerpt: 'Inventory, prioritise, go hybrid — and the three mistakes we see most often in early pilots.' },
  { slug: 'dpdp-act-ai-agents', tag: 'AI governance', title: 'What the DPDP Act means for your AI agents', date: '2026-09-29', read: 6, excerpt: 'Consent, purpose limitation and logging, translated into controls your engineering team can build.' },
  { slug: 'vapt-reports-boards-read', tag: 'VAPT', title: 'Writing VAPT reports that boards actually read', date: '2026-09-08', read: 5, excerpt: 'Risk in rupees, not CVSS scores: how we restructured our reporting after 200+ engagements.' }
];
