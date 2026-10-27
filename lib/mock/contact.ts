// SAMPLE contact data — replace with real details before going live
export const departments = [
  { icon: 'chart', team: 'Sales & partnerships', person: 'Priya Raghavan', role: 'Head of Business Development', email: 'sales@yespanchi.com', phone: '+91 98765 43211', sla: 'Replies in ~4 hours' },
  { icon: 'shield', team: 'Incident response', person: '24×7 SOC desk', role: 'For active breaches only', email: 'ir@yespanchi.com', phone: '+91 98765 43299', sla: 'Answered in < 15 min', urgent: true },
  { icon: 'graduation', team: 'Training & cohorts', person: 'Karthik Subramanian', role: 'Programme Manager', email: 'training@yespanchi.com', phone: '+91 98765 43212', sla: 'Replies same day' },
  { icon: 'mic', team: 'Press & media', person: 'Ananya Iyer', role: 'Communications Lead', email: 'press@yespanchi.com', phone: '+91 98765 43213', sla: 'Replies in 1 business day' },
  { icon: 'hands', team: 'Careers', person: 'Talent team', role: 'Internships & full-time roles', email: 'careers@yespanchi.com', phone: '', sla: 'We read every application' }
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
  { q: 'We’re under attack right now. What do we do?', a: 'Call the 24×7 incident response line above. Do not power off affected machines — isolate them from the network and wait for our team’s instructions.' }
];
