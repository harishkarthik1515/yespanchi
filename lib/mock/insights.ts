// YesPanchi Insights — the 12 content types are from the site documentation.
// SAMPLE: every item below is a placeholder; line up at least one real item per type before launch.
import type { IconName } from '@/components/Icon';
import { insights as blogPosts } from './home';

export type InsightType = {
  slug: string;
  title: string;
  icon: IconName;
  desc: string;
  topics: string;
  format: string;
  button: string;
};

export const insightTypes: InsightType[] = [
  { slug: 'white-papers', title: 'White Papers', icon: 'doc', desc: 'In-depth papers that explain a problem and YesPanchi’s approach to it.', topics: 'Post-quantum migration, AI governance, payment security, Zero Trust', format: 'Gated PDF (name and email to download), 10–20 pages', button: 'Download white paper' },
  { slug: 'newsletters', title: 'Newsletters', icon: 'mail', desc: 'The monthly “Security briefings” email, with an archive of past issues.', topics: 'Threat round-up, regulatory updates, product news, upcoming events', format: 'Web archive of each issue plus a subscribe form', button: 'Read past issues' },
  { slug: 'journals', title: 'Journals', icon: 'graduation', desc: 'Academic and peer-reviewed papers by the team and research partners at IIT Madras Research Park.', topics: 'Lattice cryptography, applied AI security, digital forensics methods', format: 'Abstract, authors, publication and link or PDF', button: 'Read paper' },
  { slug: 'research-reports', title: 'Research Reports', icon: 'search', desc: 'Original research from YesPanchi’s own data, labs and engagements.', topics: 'PQC readiness of Indian BFSI, state of VAPT findings', format: 'Report PDF with a summary page and key charts', button: 'Read report' },
  { slug: 'industry-reports', title: 'Industry Reports', icon: 'chart', desc: 'Sector-focused analysis for the industries YesPanchi serves.', topics: 'Banking & financial services, FinTech, government, healthcare, manufacturing', format: 'Sector risks, regulations and recommended controls', button: 'View industry report' },
  { slug: 'technology-briefs', title: 'Technology Briefs', icon: 'key', desc: 'Short 2–4 page explainers of one technology for decision makers.', topics: 'ML-KEM and ML-DSA in plain language, what an AI gateway does, MCP explained', format: 'One-page web article with a downloadable PDF', button: 'Read brief' },
  { slug: 'technical-perspectives', title: 'Technical Perspectives', icon: 'ai', desc: 'Engineering deep dives and expert opinion from YesPanchi’s architects and researchers.', topics: 'Hybrid PQ-TLS performance, self-healing AI agents, crypto-agility patterns', format: 'Long-form article with diagrams and code snippets', button: 'Read perspective' },
  { slug: 'blogs', title: 'Blogs', icon: 'list', desc: 'Regular, easy-to-read posts on security news, tips and company updates.', topics: 'Security news, practical tips, company updates', format: 'Article with author, date, read time and tags', button: 'Read blog' },
  { slug: 'case-studies', title: 'Case Studies', icon: 'target', desc: 'Client stories that show the problem, what YesPanchi did, and measurable results.', topics: 'Banking, government, manufacturing', format: 'Challenge, solution, 3 result figures, client quote; anonymised where required', button: 'Read case study' },
  { slug: 'annual-reports', title: 'Annual Technology Reports', icon: 'cal', desc: 'A yearly flagship report on cybersecurity, AI and quantum trends, with YesPanchi’s outlook for the year ahead.', topics: 'Cybersecurity, AI and quantum trends', format: 'One edition per year, gated PDF plus a web summary', button: 'Download the annual report' },
  { slug: 'security-compliance', title: 'Security & Compliance Reports', icon: 'shield', desc: 'YesPanchi’s own trust documents and guidance on standards.', topics: 'ISO/IEC 27001, PCI DSS, DPDP Act, RBI and CERT-In', format: 'Public summaries; detailed reports on request under NDA', button: 'Request full report' },
  { slug: 'release-notes', title: 'Release Notes', icon: 'clock', desc: 'Version history and change logs for YesPanchi’s products.', topics: 'YP-PRAKAAR, YP-RAKSHA, QSecura PQ-SSL', format: 'One log per product, newest first: version, date, new features, improvements, fixes', button: 'View release notes' }
];

export type InsightItem = { type: string; title: string; date: string; excerpt: string };

// SAMPLE
export const insightItems: InsightItem[] = [
  { type: 'annual-reports', title: 'Technology Outlook — 2026 edition', date: '2026-11-03', excerpt: 'Our yearly view of cybersecurity, AI and quantum trends, and what to prepare for next.' },
  { type: 'white-papers', title: 'Planning a post-quantum migration for payment infrastructure', date: '2026-10-28', excerpt: 'Inventory, prioritisation and a hybrid rollout path for regulated financial systems.' },
  { type: 'release-notes', title: 'YP-RAKSHA — latest release', date: '2026-10-21', excerpt: 'New features, improvements and fixes in the current version.' },
  ...blogPosts.map((b) => ({ type: 'blogs', title: b.title, date: b.date, excerpt: b.excerpt })),
  { type: 'technology-briefs', title: 'ML-KEM and ML-DSA in plain language', date: '2026-10-07', excerpt: 'What the two NIST post-quantum standards do, and where each one fits.' },
  { type: 'technical-perspectives', title: 'Designing self-healing AI agents', date: '2026-09-30', excerpt: 'Failure detection, state reconstruction and recovery patterns from our platform team.' },
  { type: 'research-reports', title: 'PQC readiness of Indian BFSI', date: '2026-09-22', excerpt: 'Where banks and insurers stand on crypto-inventory and migration planning.' },
  { type: 'industry-reports', title: 'Banking & financial services: risks and controls', date: '2026-09-15', excerpt: 'Sector risks, the regulations that apply, and the controls we recommend.' },
  { type: 'newsletters', title: 'Security briefings — latest issue', date: '2026-09-02', excerpt: 'Threat round-up, regulatory updates, product news and upcoming events.' },
  { type: 'case-studies', title: 'Cooperative bank hardens its UPI stack before audit', date: '2026-08-26', excerpt: 'The challenge, what we did, and the results at re-test.' },
  { type: 'security-compliance', title: 'Our security practices — public summary', date: '2026-08-12', excerpt: 'How YesPanchi protects client data, with detailed reports available under NDA.' },
  { type: 'journals', title: 'Applied lattice cryptography for transaction signing', date: '2026-07-30', excerpt: 'Abstract and publication details for work with research partners.' }
].sort((a, b) => b.date.localeCompare(a.date));
