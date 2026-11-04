export const SITE = {
  name: 'YesPanchi',
  legalName: 'YesPanchi Tech Services Pvt. Ltd.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yespanchi.com',
  tagline: 'Turning Cyber Threats into Cyber Confidence',
  description:
    'YesPanchi Tech Services, IITM Research Park, Chennai: cybersecurity, VAPT, ISO 27001 & PCI-DSS audits, post-quantum security (YP-PRAKAAR), enterprise AI (YP-RAKSHA), AI Guardrails and corporate training.',
  founded: '2021',
  locality: 'Chennai',
  region: 'Tamil Nadu',
  country: 'IN',
  address: 'IITM Research Park, Kanagam Road, Tharamani, Chennai',
  email: 'hello@yespanchi.com',
  phone: '+91 98401 02079',
  whatsapp: '917305062079',
  hours: 'Mon - Sat, 9:30 AM – 6:30 PM IST',
  social: {
    x: 'https://x.com/YesPanchi',
    linkedin: 'https://www.linkedin.com/company/yespanchi'
  }
} as const;

export const absoluteUrl = (path = '/') => new URL(path, SITE.url).toString();
