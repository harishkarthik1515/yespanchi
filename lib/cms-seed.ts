// The website's built-in content. Served whenever Firebase is not configured or a collection is still empty,
// and offered in the console as "Import current website content" so editing starts from what is live today.
import { insightItems } from '@/lib/mock/insights';
import { highlights, talks } from '@/lib/talks';
import { roles } from '@/lib/mock/careers';
import { gallery } from '@/lib/gallery';
import { collaborations } from '@/lib/data';
import type { CmsRole, CmsTalk, Collaboration, GalleryItem, Insight, UpcomingEvent } from '@/lib/cms-schema';

const HOME_PICKS = ['technology-outlook-2026', 'dpdp-act-ai-agents', 'pqc-readiness-bfsi'];

export const seed = {
  insights: insightItems.map((i): Insight => ({ ...i, featured: HOME_PICKS.includes(i.slug) })),
  talks: [...highlights.map((t) => ({ ...t, highlight: true })), ...talks].map((t, n): CmsTalk => ({ ...t, order: n })),
  events: [] as UpcomingEvent[],
  roles: roles.map((r, n): CmsRole => ({ ...r, order: n })),
  gallery: gallery.map((g, n): GalleryItem => ({ ...g, order: n })),
  collaborations: collaborations.map((c, n): Collaboration => ({ ...c, order: n }))
};
