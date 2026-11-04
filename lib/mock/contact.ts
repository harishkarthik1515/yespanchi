/* Real contact details from the company's provided content — phone, email, office and hours. */
export const contactInfo = [
  { icon: 'phone', title: 'Phone', lines: ['+91 98401 02079', '+91 73050 62079'], note: 'Call us anytime', action: { label: 'Call Now', href: 'tel:+919840102079' } },
  { icon: 'mail', title: 'Email', lines: ['hello@yespanchi.com', 'panchi@yespanchi.com'], note: 'Send us a message', action: { label: 'Send Email', href: 'mailto:hello@yespanchi.com' } },
  { icon: 'pin', title: 'Office', lines: ['IITM Research Park, Kanagam Road, Tharamani, Chennai'], note: 'Visit our primary office', action: { label: 'Get Directions', href: 'https://www.google.com/maps/dir/?api=1&destination=IIT+Madras+Research+Park,+Taramani,+Chennai' } },
  { icon: 'clock', title: 'Working Hours', lines: ['Mon - Sat 9.30 - 18.30'], note: '', action: { label: 'Schedule Meeting', href: '/contact?topic=assessment#form' } }
] as const;

export const nextSteps = [
  { title: 'We read it', text: 'A senior consultant — not a bot — reviews your message within one business day.' },
  { title: '30-minute call', text: 'We understand your systems, regulators and timelines. No sales script.' },
  { title: 'Written proposal', text: 'Scope, timeline and a fixed price within 3 working days. No obligation.' }
];

export const contactFaqs = [
  { q: 'Is the free security assessment really free?', a: 'Yes. It is a 60–90 minute external review of your public attack surface plus a call to walk you through the findings. No contract needed.' },
  { q: 'Do you sign an NDA before we share details?', a: 'Always. We can sign your NDA or send our mutual NDA within the same day.' },
  { q: 'Do you work outside Chennai?', a: 'Yes — we work with clients across India, the Middle East and Southeast Asia. Most engagements are remote; on-site visits are available.' },
  { q: 'We’re under attack right now. What do we do?', a: 'Call us immediately on +91 98401 02079 or +91 73050 62079. Do not power off affected machines — isolate them from the network and wait for our team’s instructions.' }
];
