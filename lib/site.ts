export const SITE = {
  name: 'YesPanchi',
  legalName: 'YesPanchi Tech Services Pvt. Ltd.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yespanchi.com',
  tagline: 'Cybersecurity with a Conscience',
  description:
    'YesPanchi Tech Services, IITM Research Park, Chennai: cybersecurity, VAPT, ISO 27001 & PCI-DSS audits, post-quantum SSL (QSecura PQ-SSL), enterprise AI products and corporate training.',
  founded: '2021',
  locality: 'Chennai',
  region: 'Tamil Nadu',
  country: 'IN',
  address: 'IIT Madras Research Park, Kanagam Road, Taramani, Chennai 600113',
  // SAMPLE contact details — replace before going live
  email: 'contact@yespanchi.com',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  hours: 'Mon–Fri, 9:30 AM – 6:30 PM IST',
  social: {
    x: 'https://x.com/YesPanchi',
    linkedin: 'https://www.linkedin.com/company/yespanchi'
  }
} as const;

export const absoluteUrl = (path = '/') => new URL(path, SITE.url).toString();
