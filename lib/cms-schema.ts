// What the admin console can edit. Forms are generated from these definitions, so adding a field here
// is all it takes to make it editable. Shared by the server (reads) and the console (forms).
import type { InsightItem } from '@/lib/mock/insights';
import { insightTypes, topics } from '@/lib/mock/insights';
import type { Talk } from '@/lib/talks';
import { talkKinds } from '@/lib/talks';
import type { Role } from '@/lib/mock/careers';
import { clientSectorNames } from '@/lib/data';

/* ---------- Content types ---------- */
export type Insight = InsightItem & { id?: string; body?: string; file?: string; featured?: boolean };
export type CmsTalk = Talk & { id?: string; highlight?: boolean; order?: number };
export type UpcomingEvent = { id?: string; title: string; date: string; time?: string; venue: string; summary: string; link?: string; image?: string };
export type CmsRole = Role & { id?: string; order?: number };
export type GalleryItem = { id?: string; src: string; caption: string; event?: string; order?: number };
export type Collaboration = { id?: string; partner: string; text: string; image: string; order?: number };
export type Client = { id?: string; name: string; sector: string; logo: string; order?: number };
export type SiteSettings = { announcementOn: boolean; announcementText: string; announcementLabel: string; announcementLink: string };

export const defaultSettings: SiteSettings = {
  announcementOn: true,
  announcementText: 'QSecura PQ-SSL is live. Quantum-safe security for websites, web apps and mobile platforms.',
  announcementLabel: 'Explore QSecura PQ-SSL',
  announcementLink: 'https://qsecura.com'
};

/* ---------- Form definitions ---------- */
export type FieldType = 'text' | 'url' | 'textarea' | 'markdown' | 'date' | 'number' | 'select' | 'bool' | 'image' | 'images' | 'file' | 'list';
export type Field = { key: string; label: string; type: FieldType; options?: readonly string[]; required?: boolean; help?: string };
export type CollectionId = 'insights' | 'talks' | 'events' | 'roles' | 'gallery' | 'collaborations' | 'clients';

export type Section = {
  key: string;
  label: string;
  group: string;
  collection: CollectionId;
  /** Fixed values applied on save and used to filter the list (e.g. Blogs = insights with type "blogs"). */
  fixed?: Record<string, string>;
  /** Field whose slugified value becomes the document id for new entries. */
  slugFrom?: string;
  titleField: string;
  subtitle?: (d: Record<string, unknown>) => string;
  sort: { field: string; dir: 'asc' | 'desc' };
  fields: Field[];
};

const insightFields: Field[] = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'slug', label: 'URL slug', type: 'text', help: 'Lowercase words joined by hyphens. Left empty, it is made from the title.' },
  { key: 'date', label: 'Publish date', type: 'date', required: true },
  { key: 'topic', label: 'Topic', type: 'select', options: topics, required: true },
  { key: 'author', label: 'Author', type: 'text', required: true },
  { key: 'read', label: 'Reading time (minutes)', type: 'number' },
  { key: 'excerpt', label: 'Short summary', type: 'textarea', required: true, help: 'Shown on cards and in search results.' },
  { key: 'image', label: 'Cover image', type: 'image', required: true },
  { key: 'body', label: 'Article text', type: 'markdown', help: 'Blank line = new paragraph. "## " starts a heading, "- " starts a bullet.' },
  { key: 'file', label: 'PDF download', type: 'file', help: 'Optional. White papers ask for name and work email before download.' },
  { key: 'featured', label: 'Show on the home page (Trends and insights)', type: 'bool' }
];

const insightSection = (slug: InsightItem['type']): Section => ({
  key: slug,
  label: insightTypes.find((t) => t.slug === slug)!.title,
  group: 'Insights',
  collection: 'insights',
  fixed: { type: slug },
  slugFrom: 'title',
  titleField: 'title',
  subtitle: (d) => `${d.date ?? ''} · ${d.topic ?? ''}`,
  sort: { field: 'date', dir: 'desc' },
  fields: insightFields
});

export const sections: Section[] = [
  insightSection('newsletters'),
  insightSection('blogs'),
  insightSection('white-papers'),
  insightSection('case-studies'),
  {
    key: 'upcoming', label: 'Upcoming events', group: 'Events', collection: 'events', titleField: 'title',
    subtitle: (d) => `${d.date ?? ''} · ${d.venue ?? ''}`, sort: { field: 'date', dir: 'asc' },
    fields: [
      { key: 'title', label: 'Event title', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'time', label: 'Time', type: 'text', help: 'For example 10:00 to 13:00 IST' },
      { key: 'venue', label: 'Venue or "Online"', type: 'text', required: true },
      { key: 'summary', label: 'Summary', type: 'textarea', required: true },
      { key: 'link', label: 'Registration link', type: 'url' },
      { key: 'image', label: 'Image', type: 'image' }
    ]
  },
  {
    key: 'talks', label: 'Talks & appearances', group: 'Events', collection: 'talks', titleField: 'title',
    subtitle: (d) => `${d.kind ?? ''} · ${d.host ?? ''}`, sort: { field: 'order', dir: 'asc' },
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'host', label: 'Host, venue or channel', type: 'text', required: true },
      { key: 'kind', label: 'Type', type: 'select', options: talkKinds, required: true },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'images', label: 'Photos', type: 'images', required: true, help: 'The first photo is the cover.' },
      { key: 'highlight', label: 'Show in Highlights (large cards)', type: 'bool' },
      { key: 'order', label: 'Order (smaller shows first)', type: 'number' }
    ]
  },
  {
    key: 'mous', label: 'MoUs & collaborations', group: 'Events', collection: 'collaborations', titleField: 'partner',
    subtitle: (d) => String(d.text ?? '').slice(0, 80), sort: { field: 'order', dir: 'asc' },
    fields: [
      { key: 'partner', label: 'Partner', type: 'text', required: true },
      { key: 'text', label: 'Description', type: 'textarea', required: true },
      { key: 'image', label: 'Image', type: 'image', required: true },
      { key: 'order', label: 'Order (smaller shows first)', type: 'number' }
    ]
  },
  {
    key: 'gallery', label: 'Photo gallery', group: 'Events', collection: 'gallery', titleField: 'caption',
    subtitle: (d) => String(d.event ?? ''), sort: { field: 'order', dir: 'asc' },
    fields: [
      { key: 'src', label: 'Photo', type: 'image', required: true },
      { key: 'caption', label: 'Caption', type: 'text', required: true },
      { key: 'event', label: 'Event (groups photos)', type: 'text' },
      { key: 'order', label: 'Order (smaller shows first)', type: 'number' }
    ]
  },
  {
    key: 'roles', label: 'Open roles', group: 'Careers', collection: 'roles', slugFrom: 'title', titleField: 'title',
    subtitle: (d) => `${d.team ?? ''} · ${d.location ?? ''}`, sort: { field: 'order', dir: 'asc' },
    fields: [
      { key: 'title', label: 'Role title', type: 'text', required: true },
      { key: 'slug', label: 'URL slug', type: 'text', help: 'Left empty, it is made from the title.' },
      { key: 'team', label: 'Team', type: 'text', required: true },
      { key: 'location', label: 'Location', type: 'text', required: true },
      { key: 'type', label: 'Employment type', type: 'text', required: true },
      { key: 'experience', label: 'Experience', type: 'text', required: true },
      { key: 'level', label: 'Level', type: 'select', options: ['Student', 'Early career', 'Experienced'], required: true },
      { key: 'about', label: 'About the role', type: 'textarea', required: true },
      { key: 'doing', label: 'What you will do (one per line)', type: 'list' },
      { key: 'lookingFor', label: 'What we look for (one per line)', type: 'list' },
      { key: 'niceToHave', label: 'Nice to have (one per line)', type: 'list' },
      { key: 'order', label: 'Order (smaller shows first)', type: 'number' }
    ]
  },
  {
    key: 'clients', label: 'Client logos', group: 'Website', collection: 'clients', titleField: 'name',
    subtitle: (d) => String(d.sector ?? ''), sort: { field: 'order', dir: 'asc' },
    fields: [
      { key: 'name', label: 'Client name', type: 'text', required: true, help: 'Used as the logo alt text.' },
      { key: 'sector', label: 'Sector (row on the website)', type: 'select', options: clientSectorNames, required: true },
      { key: 'logo', label: 'Logo', type: 'image', required: true, help: 'PNG or SVG with a transparent or white background works best.' },
      { key: 'order', label: 'Order (smaller shows first)', type: 'number' }
    ]
  }
];

export const settingsFields: Field[] = [
  { key: 'announcementOn', label: 'Show the announcement bar', type: 'bool' },
  { key: 'announcementText', label: 'Announcement text', type: 'text' },
  { key: 'announcementLabel', label: 'Link label', type: 'text' },
  { key: 'announcementLink', label: 'Link', type: 'url' }
];

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 80);
